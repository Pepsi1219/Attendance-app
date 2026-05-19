  // ============ CONFIG ============
  const SUPABASE_URL = 'https://hmlghxlcbkqvectkcaok.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_wz0zN3hV7p_w_1X1OpdvlA_qWqAHPcs';
  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const VALID_STATUS = new Set(['มา','ขาด','กิจกรรม']);
  const FIXED_COLS = ['ระดับ','ห้อง','รหัสประจำตัว','เลขที่','คำนำหน้า','ชื่อ','นามสกุล','ปีการศึกษา'];

  // ============ NAVIGATION ============
  function showSection(id){
    ['section-login','section-migrate'].forEach(s=>document.getElementById(s).classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  async function init(){
    const {data:{session}} = await sb.auth.getSession();
    if(session){
      document.getElementById('me').textContent = session.user.email;
      showSection('section-migrate');
    }else{
      showSection('section-login');
    }
  }

  async function doLogin(e){
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errEl = document.getElementById('login-err');
    const btn = document.getElementById('login-btn');
    errEl.textContent=''; btn.disabled=true; btn.textContent='กำลังเข้าสู่ระบบ...';
    const {error,data} = await sb.auth.signInWithPassword({email,password});
    btn.disabled=false; btn.textContent='เข้าสู่ระบบ';
    if(error){ errEl.textContent='เข้าสู่ระบบไม่สำเร็จ: '+error.message; return; }
    document.getElementById('me').textContent = data.user.email;
    showSection('section-migrate');
  }

  async function doLogout(){
    await sb.auth.signOut();
    showSection('section-login');
  }

  // ============ LOGGING ============
  const logEl = ()=>document.getElementById('log');
  function log(msg,cls){
    const el=logEl(); el.style.display='block';
    const span=document.createElement('span');
    if(cls) span.className=cls;
    span.textContent=msg+'\n';
    el.appendChild(span);
    el.scrollTop=el.scrollHeight;
  }
  function clearLog(){ logEl().innerHTML=''; }

  // ============ FILE PICK ============
  function onFilePick(){
    const files = Array.from(document.getElementById('csv-files').files);
    const listEl = document.getElementById('file-list');
    const runBtn = document.getElementById('run-btn');
    if(files.length===0){
      listEl.style.display='none'; runBtn.disabled=true; return;
    }
    listEl.style.display='block';
    listEl.innerHTML = files.map(f=>`<div class="item">📄 ${f.name} (${(f.size/1024).toFixed(1)} KB)</div>`).join('');
    runBtn.disabled=false;
  }

  // ============ CSV PARSE ============
  function parseCsv(file){
    return new Promise((resolve,reject)=>{
      Papa.parse(file,{
        header:true, skipEmptyLines:true,
        complete: res => resolve(res.data),
        error: err => reject(err)
      });
    });
  }

  function chunk(arr,size=500){
    const out=[]; for(let i=0;i<arr.length;i+=size) out.push(arr.slice(i,i+size));
    return out;
  }

  // ============ MIGRATION ============
  async function runMigration(){
    const files = Array.from(document.getElementById('csv-files').files);
    if(files.length===0) return;
    const runBtn = document.getElementById('run-btn');
    runBtn.disabled=true; runBtn.textContent='กำลังประมวลผล...';
    clearLog();
    log('🚀 เริ่ม migration...');

    try{
      for(const file of files){
        log(`\n---- ${file.name} ----`,'info');
        const rows = await parseCsv(file);
        log(`📄 อ่าน ${rows.length} แถว`);
        if(rows.length===0){ log('   (ไม่มีข้อมูล ข้าม)','warn'); continue; }

        await importStudents(rows);
        await importAttendance(rows);
      }
      log('\n🎉 เสร็จสิ้น!','info');
    }catch(err){
      log('\n💥 ERROR: '+(err.message||err),'err');
      console.error(err);
    }finally{
      runBtn.disabled=false; runBtn.textContent='เริ่ม Migration';
    }
  }

  function isValidRow(r){
    const code = (r['รหัสประจำตัว']||'').trim();
    const room = (r['ห้อง']||'').trim();
    const num  = (r['เลขที่']||'').trim();
    const lvl  = (r['ระดับ']||'').trim();
    const yr   = (r['ปีการศึกษา']||'').trim();
    if(!code || !room || !num || !lvl || !yr) return false;
    // ข้าม header แถวที่ 2 (ค่าเป็นชื่อ header เอง)
    if(code==='รหัสประจำตัว' || lvl==='ระดับ') return false;
    // เลขที่ และ ปีการศึกษา ต้อง parse เป็นเลขได้ (ห้องเป็น text ได้: 1-8, A, B, C)
    if(isNaN(parseInt(num,10)) || isNaN(parseInt(yr,10))) return false;
    return true;
  }

  async function importStudents(rows){
    const skipped = rows.length - rows.filter(isValidRow).length;
    if(skipped>0) log(`   ⚠️  ข้าม ${skipped} แถวที่ข้อมูลไม่ครบ/เป็น header`,'warn');

    const students = rows
      .filter(isValidRow)
      .map(r => ({
        student_code: String(r['รหัสประจำตัว']).trim(),
        level:        String(r['ระดับ']).trim(),
        room:         String(r['ห้อง']).trim(),
        number:       parseInt(r['เลขที่'],10),
        prefix:       (r['คำนำหน้า']||'').trim() || null,
        first_name:   String(r['ชื่อ']).trim(),
        last_name:    String(r['นามสกุล']||'').trim(),
        year:         parseInt(r['ปีการศึกษา'],10)
      }));

    log(`   👥 เตรียม upsert students: ${students.length} คน`);
    let done=0;
    for(const part of chunk(students,400)){
      const {error} = await sb.from('students').upsert(part,{onConflict:'student_code'});
      if(error) throw new Error('students: '+error.message);
      done+=part.length; log(`      ...บันทึก ${done}/${students.length}`);
    }
    log('   ✅ students imported');
  }

  async function importAttendance(rows){
    rows = rows.filter(isValidRow);
    if(rows.length===0) return;
    const dateCols = Object.keys(rows[0]).filter(k => !FIXED_COLS.includes(k) && k.trim()!=='');
    if(dateCols.length===0){ log('   ℹ️  ไม่มีคอลัมน์วันที่ — ข้าม attendance'); return; }
    log(`   📅 คอลัมน์วันที่: ${dateCols.join(', ')}`);

    // build student_code -> id map
    const codes = [...new Set(rows.map(r=>String(r['รหัสประจำตัว']).trim()))].filter(Boolean);
    const codeToId = new Map();
    for(const part of chunk(codes,800)){
      const {data,error} = await sb.from('students').select('id,student_code').in('student_code',part);
      if(error) throw new Error('lookup: '+error.message);
      data.forEach(s=>codeToId.set(s.student_code,s.id));
    }

    const att=[];
    for(const r of rows){
      const sid = codeToId.get(String(r['รหัสประจำตัว']).trim());
      if(!sid) continue;
      for(const d of dateCols){
        const v=(r[d]||'').trim();
        if(VALID_STATUS.has(v)) att.push({student_id:sid,date:d,status:v});
      }
    }
    log(`   📝 attendance: ${att.length} แถว`);
    if(att.length===0) return;

    let done=0;
    for(const part of chunk(att,500)){
      const {error}=await sb.from('attendance').upsert(part,{onConflict:'student_id,date'});
      if(error) throw new Error('attendance: '+error.message);
      done+=part.length; log(`      ...บันทึก ${done}/${att.length}`);
    }
    log('   ✅ attendance imported');
  }

  init();
