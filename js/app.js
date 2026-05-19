  // ============================================================
  // CONFIG  — แก้ชื่อโรงเรียนที่นี่
  // ============================================================
  const SCHOOL_NAME = 'อัสสัมชัญธนบุรี';
  const SUPABASE_URL = 'https://hmlghxlcbkqvectkcaok.supabase.co';
  const SUPABASE_ANON_KEY = 'sb_publishable_wz0zN3hV7p_w_1X1OpdvlA_qWqAHPcs';
  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: true, autoRefreshToken: true }
  });

  // ============================================================
  // i18n
  // ============================================================
  const i18n = {
    th: {
      app_title: 'ระบบเช็คชื่อ / กรอกคะแนน',
      login_title: 'เข้าสู่ระบบ', login_subtitle: 'ระบบเช็คชื่อและกรอกคะแนน',
      email: 'อีเมล', password: 'รหัสผ่าน',
      login_btn: 'เข้าสู่ระบบ', login_loading: 'กำลังเข้าสู่ระบบ...',
      login_failed: 'เข้าสู่ระบบไม่สำเร็จ', logout: 'ออกจากระบบ',
      year: 'ปีการศึกษา (พ.ศ.)', level: 'ระดับชั้น', room: 'ห้อง',
      mode: 'โหมดการทำงาน',
      mode_attendance: 'เช็คชื่อเข้าเรียน', mode_score: 'กรอกคะแนน',
      date: 'วันที่', score_title: 'ชิ้นงาน',
      score_pre: 'ก่อนกลางภาค', score_mid: 'กลางภาค', score_final: 'ปลายภาค',
      term: 'ภาคเรียน', term_1: 'ภาคต้น (พ.ค.-ก.ย.)', term_2: 'ภาคปลาย (พ.ย.-มี.ค.)', term_all: 'ทั้งปี',
      next: 'ถัดไป', save: 'บันทึกข้อมูล', saving: 'กำลังบันทึก...', back: 'ย้อนกลับ',
      present: 'มา', activity: 'กิจกรรม', score_input: 'คะแนน',
      no_students: 'ไม่พบข้อมูลนักเรียน กรุณาตรวจสอบ ปีการศึกษา ชั้น และห้อง',
      loading: 'กำลังโหลดข้อมูล...',
      save_success: 'บันทึกข้อมูลสำเร็จ!', save_failed: 'บันทึกไม่สำเร็จ', error: 'เกิดข้อผิดพลาด',
      tools: 'เครื่องมือเพิ่มเติม',
      activity_list_btn: '📋 รายชื่อนักเรียนในกิจกรรม',
      activity_list: 'รายชื่อนักเรียนในกิจกรรม',
      bring_back: 'นำกลับ',
      no_activity: 'ยังไม่มีนักเรียนในกิจกรรม',
      fill_required: 'กรุณากรอก ปีการศึกษา ระดับชั้น และห้อง ให้ครบ',
      confirm_bring_back: 'นำนักเรียนกลับเข้าห้องเรียน?',
      label_attendance: 'เช็คชื่อ', label_score: 'กรอกคะแนน',
      report_btn: '📄 สร้างรายงาน PDF', report_generating: 'กำลังสร้างรายงาน...',
      dashboard: 'แดชบอร์ด', all: 'ทั้งหมด', db_refresh: '🔄 อัปเดตข้อมูล',
      kpi_total_students: 'นักเรียนทั้งหมด', kpi_in_activity: 'นักเรียนในกิจกรรม',
      kpi_attendance_rate: '% การมาเรียน', kpi_days_recorded: 'จำนวนวันที่เช็ค',
      chart_status: 'สัดส่วนสถานะการเข้าเรียน',
      chart_per_class: 'จำนวนนักเรียนต่อห้อง',
      chart_trend: 'แนวโน้มการมาเรียนรายวัน',
      chart_scores: 'คะแนนเฉลี่ยแต่ละชิ้นงาน',
      report_title: 'รายงานนักเรียน',
      report_section_roster: 'รายชื่อนักเรียนและสรุปการเข้าเรียน',
      report_section_scores: 'ตารางคะแนน',
      report_section_daily: 'การเช็คชื่อรายวัน',
      report_section_stats: 'สถิติสรุป',
      th_no: 'เลขที่', th_name: 'ชื่อ-นามสกุล', th_code: 'รหัส',
      th_present: 'มา', th_absent: 'ขาด', th_activity: 'กิจกรรม', th_rate: 'อัตราการมา (%)',
      th_pre: 'ก่อนกลางภาค', th_mid: 'กลางภาค', th_final: 'ปลายภาค', th_avg: 'เฉลี่ย',
      th_total_students: 'นักเรียนทั้งหมด',
      th_top_absent: 'นักเรียนขาดมากที่สุด',
      th_best_attendance: 'นักเรียนมาเรียนสม่ำเสมอที่สุด',
      generated_on: 'ออกรายงานเมื่อ',
      scope_label: 'ห้อง {level}/{room} | ปี {year} | {term}'
    },
    en: {
      app_title: 'Attendance & Score System',
      login_title: 'Sign In', login_subtitle: 'Attendance & Score System',
      email: 'Email', password: 'Password',
      login_btn: 'Sign In', login_loading: 'Signing in...',
      login_failed: 'Sign in failed', logout: 'Sign Out',
      year: 'Academic Year (CE)', level: 'Grade', room: 'Class',
      mode: 'Mode',
      mode_attendance: 'Attendance Check', mode_score: 'Score Entry',
      date: 'Date', score_title: 'Assignment',
      score_pre: 'Pre-Midterm', score_mid: 'Midterm', score_final: 'Final',
      term: 'Term', term_1: 'Term 1 (May-Sep)', term_2: 'Term 2 (Nov-Mar)', term_all: 'Whole Year',
      next: 'Next', save: 'Save', saving: 'Saving...', back: 'Back',
      present: 'Present', activity: 'Activity', score_input: 'Score',
      no_students: 'No students found. Check year/grade/class.',
      loading: 'Loading...',
      save_success: 'Saved successfully!', save_failed: 'Save failed', error: 'Error',
      tools: 'Additional Tools',
      activity_list_btn: '📋 Students in Activity',
      activity_list: 'Students in Activity',
      bring_back: 'Bring Back',
      no_activity: 'No students in activity',
      fill_required: 'Please fill in Year, Grade, and Class',
      confirm_bring_back: 'Bring student back to class?',
      label_attendance: 'Attendance', label_score: 'Score Entry',
      report_btn: '📄 Generate PDF Report', report_generating: 'Generating report...',
      dashboard: 'Dashboard', all: 'All', db_refresh: '🔄 Refresh',
      kpi_total_students: 'Total Students', kpi_in_activity: 'In Activity',
      kpi_attendance_rate: 'Attendance %', kpi_days_recorded: 'Days Recorded',
      chart_status: 'Attendance Status Breakdown',
      chart_per_class: 'Students per Class',
      chart_trend: 'Daily Attendance Trend',
      chart_scores: 'Average Score per Assignment',
      report_title: 'Student Report',
      report_section_roster: 'Roster & Attendance Summary',
      report_section_scores: 'Scores Table',
      report_section_daily: 'Daily Attendance',
      report_section_stats: 'Statistics Summary',
      th_no: 'No.', th_name: 'Name', th_code: 'ID',
      th_present: 'Present', th_absent: 'Absent', th_activity: 'Activity', th_rate: 'Att. Rate (%)',
      th_pre: 'Pre-Midterm', th_mid: 'Midterm', th_final: 'Final', th_avg: 'Average',
      th_total_students: 'Total Students',
      th_top_absent: 'Top Absentees',
      th_best_attendance: 'Best Attendance',
      generated_on: 'Generated on',
      scope_label: 'Class {level}/{room} | Year {year} | {term}'
    }
  };
  let currentLang = localStorage.getItem('lang') || 'th';
  function t(key) { return (i18n[currentLang] && i18n[currentLang][key]) || key; }

  // ============================================================
  // STATE
  // ============================================================
  let currentUser = null;
  let currentStudents = [];
  let attendanceData = {};
  let currentMode = '';
  let currentRecordKey = '';
  let currentLevel = '';
  let currentRoom = '';
  let currentYearTH = null;
  let dashboardCharts = {};

  // ============================================================
  // THEME
  // ============================================================
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    const icon = theme === 'dark' ? '☀️' : '🌙';
    ['theme-btn','theme-btn-login'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = icon; });
  }
  function toggleTheme() {
    const cur = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(cur === 'dark' ? 'light' : 'dark');
  }
  applyTheme(localStorage.getItem('theme') || 'light');

  // ============================================================
  // LANGUAGE
  // ============================================================
  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    document.title = t('app_title');

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      el.textContent = t(k);
    });

    const otherLabel = lang === 'th' ? 'EN' : 'TH';
    ['lang-btn','lang-btn-login'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = otherLabel; });

    // Year inputs: convert displayed value to match new lang
    ['year','db-year'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      if (!el.dataset.touched) {
        el.value = getDefaultYearForUI();
      } else {
        const curVal = parseInt(el.value, 10);
        if (!isNaN(curVal)) {
          if (lang === 'th' && curVal < 2400) el.value = curVal + 543;
          else if (lang === 'en' && curVal >= 2400) el.value = curVal - 543;
        }
      }
    });

    // Re-render dynamic content
    if (document.getElementById('page-record').classList.contains('active-page')) {
      renderInfoBox();
      if (currentStudents.length > 0) renderTable(window._lastExisting || {});
    }
    if (document.getElementById('page-activity').classList.contains('active-page')) {
      loadActivityList();
    }
    if (document.getElementById('page-dashboard').classList.contains('active-page')) {
      loadDashboard();
    }
  }
  function toggleLang() { applyLang(currentLang === 'th' ? 'en' : 'th'); }

  // ============================================================
  // YEAR & DATE HELPERS
  // ============================================================
  function getCurrentThaiYear() { return new Date().getFullYear() + 543; }
  function getDefaultYearForUI() { return currentLang === 'th' ? getCurrentThaiYear() : new Date().getFullYear(); }
  function uiYearToThai(raw) {
    const n = parseInt(raw, 10);
    if (isNaN(n)) return NaN;
    return currentLang === 'th' ? n : n + 543;
  }
  function getThaiYearFromUI(id = 'year') { return uiYearToThai(document.getElementById(id).value); }
  function todayISO() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  }
  function formatDateForDisplay(isoDate) {
    if (!isoDate) return '';
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
    if (!m) return isoDate; // legacy
    const yy = currentLang === 'th' ? (parseInt(m[1],10) + 543) : parseInt(m[1],10);
    return `${m[3]}/${m[2]}/${yy}`;
  }

  // ============================================================
  // TERM LOGIC
  // ============================================================
  // ปีการศึกษาไทย พ.ศ. X = พ.ค. ค.ศ.(X-543) ถึง มี.ค. ค.ศ.(X-543+1)
  // Term 1: พ.ค.-ก.ย. ของ ค.ศ.(X-543)
  // Term 2: พ.ย.-ธ.ค. ของ ค.ศ.(X-543) + ม.ค.-มี.ค. ของ ค.ศ.(X-543+1)
  function isDateInTerm(isoDate, thaiYear, term) {
    if (term === 'all') {
      // ทั้งปี = พ.ค. ของ ce ถึง มี.ค. ของ ce+1
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
      if (!m) return false;
      const y = parseInt(m[1]); const mo = parseInt(m[2]);
      const ce = thaiYear - 543;
      if (y === ce && mo >= 5) return true;
      if (y === ce + 1 && mo <= 3) return true;
      return false;
    }
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
    if (!m) return false;
    const y = parseInt(m[1]); const mo = parseInt(m[2]);
    const ce = thaiYear - 543;
    if (term == 1 || term === '1') return y === ce && mo >= 5 && mo <= 9;
    if (term == 2 || term === '2') {
      if (y === ce && (mo === 11 || mo === 12)) return true;
      if (y === ce + 1 && mo >= 1 && mo <= 3) return true;
    }
    return false;
  }

  // ============================================================
  // ROOM dropdown
  // ============================================================
  const ROOM_OPTIONS = ['1','2','3','4','5','6','7','8','A','B','C'];
  function populateRoomDropdown(selectId, includeAll = false) {
    const el = document.getElementById(selectId);
    el.innerHTML = '';
    if (includeAll) {
      const o = document.createElement('option');
      o.value = 'all'; o.textContent = t('all'); o.setAttribute('data-i18n','all');
      el.appendChild(o);
    }
    ROOM_OPTIONS.forEach(v => {
      const o = document.createElement('option');
      o.value = v; o.textContent = v;
      el.appendChild(o);
    });
  }

  // ============================================================
  // BUTTON STATE
  // ============================================================
  function updateActionButtonsState() {
    const year = document.getElementById('year').value.trim();
    const level = document.getElementById('level').value.trim();
    const room = document.getElementById('room').value.trim();
    const complete = !!(year && level && room);
    document.getElementById('btn-activity-list').disabled = !complete;
    document.getElementById('btn-report').disabled = !complete;
  }

  // ============================================================
  // PAGE NAVIGATION
  // ============================================================
  function showPage(id) {
    ['page-login','page-app','page-record','page-activity','page-dashboard'].forEach(p => {
      document.getElementById(p).classList.remove('active-page');
    });
    document.getElementById(id).classList.add('active-page');
    document.getElementById('top-bar').style.display = (id === 'page-login') ? 'none' : 'flex';
  }
  function goToApp() { showPage('page-app'); }
  function goToLogin() { showPage('page-login'); }

  // ============================================================
  // AUTH
  // ============================================================
  async function init() {
    populateRoomDropdown('room');
    populateRoomDropdown('db-room', true);

    document.getElementById('year').value = getDefaultYearForUI();
    document.getElementById('db-year').value = getDefaultYearForUI();
    ['year','db-year'].forEach(id => {
      document.getElementById(id).addEventListener('input', e => e.target.dataset.touched = '1');
    });
    document.getElementById('recordDate').value = todayISO();

    // Hook up form state
    ['year','level','room'].forEach(id => {
      const el = document.getElementById(id);
      el.addEventListener('input', updateActionButtonsState);
      el.addEventListener('change', updateActionButtonsState);
    });

    applyLang(currentLang);
    updateActionButtonsState();

    const { data: { session } } = await sb.auth.getSession();
    if (session) { currentUser = session.user; updateUserInfo(); goToApp(); }
    else { goToLogin(); }
    sb.auth.onAuthStateChange((_e, session) => {
      currentUser = session?.user || null;
      if (currentUser) { updateUserInfo(); goToApp(); } else { goToLogin(); }
    });
  }

  function updateUserInfo() {
    // ไม่แสดงอีเมล — เก็บ element ไว้เพื่อรักษา layout (flex: 1 ดันปุ่มไปขวา)
    document.getElementById('user-info').textContent = '';
  }

  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    const btn = document.getElementById('login-submit');
    errEl.textContent = ''; btn.disabled = true; btn.textContent = t('login_loading');
    const { error } = await sb.auth.signInWithPassword({ email, password });
    btn.disabled = false; btn.textContent = t('login_btn');
    if (error) errEl.textContent = t('login_failed') + ': ' + error.message;
    else document.getElementById('login-password').value = '';
  }
  async function handleLogout() { await sb.auth.signOut(); }

  function onModeChange() {
    const mode = document.getElementById('mode').value;
    document.getElementById('group-date').style.display  = (mode === 'attendance') ? '' : 'none';
    document.getElementById('group-score').style.display = (mode === 'score')      ? '' : 'none';
  }

  function renderInfoBox() {
    if (!currentLevel) return;
    const recordLabel = currentMode === 'attendance'
      ? formatDateForDisplay(currentRecordKey)
      : (t(`score_${currentRecordKey}`) || currentRecordKey);
    const modeText = currentMode === 'attendance' ? t('label_attendance') : t('label_score');
    const yearShown = currentLang === 'th' ? currentYearTH : (currentYearTH - 543);
    const yearLabel = currentLang === 'th' ? 'พ.ศ.' : 'CE';
    document.getElementById('infoBox').innerHTML =
      `${currentLevel}/${currentRoom} | ${yearLabel} ${yearShown} <br> ${modeText} : ${recordLabel}`;
  }

  // ============================================================
  // ATTENDANCE / SCORE
  // ============================================================
  async function goToRecord() {
    const yearTH = getThaiYearFromUI();
    const level  = document.getElementById('level').value;
    const room   = document.getElementById('room').value.trim();
    const mode   = document.getElementById('mode').value;
    const recordKey = mode === 'attendance' ? document.getElementById('recordDate').value : document.getElementById('recordScoreType').value;
    if (!recordKey || !yearTH || !room) { alert(t('fill_required')); return; }

    currentMode = mode; currentRecordKey = recordKey;
    currentLevel = level; currentRoom = room; currentYearTH = yearTH;
    attendanceData = {};
    showPage('page-record'); renderInfoBox();
    document.getElementById('tableContainer').innerHTML = `<div class="loading-text">${t('loading')}</div>`;

    try {
      let q = sb.from('students')
        .select('id, student_code, number, prefix, first_name, last_name, in_activity')
        .eq('year', yearTH).eq('level', level).eq('room', room);
      if (mode === 'attendance') q = q.eq('in_activity', false);
      q = q.order('number', { ascending: true });
      const { data: students, error } = await q;
      if (error) throw error;

      currentStudents = (students || []).map(s => ({
        id: s.id, student_code: s.student_code, number: s.number,
        name: (s.prefix || '') + s.first_name + ' ' + s.last_name
      }));

      let existing = {};
      if (currentStudents.length > 0) {
        const ids = currentStudents.map(s => s.id);
        if (mode === 'attendance') {
          const { data: att } = await sb.from('attendance').select('student_id, status').eq('date', recordKey).in('student_id', ids);
          (att || []).forEach(r => existing[r.student_id] = r.status);
        } else {
          const { data: sc } = await sb.from('scores').select('student_id, score').eq('title', recordKey).in('student_id', ids);
          (sc || []).forEach(r => existing[r.student_id] = r.score);
        }
      }
      window._lastExisting = existing;
      renderTable(existing);
    } catch (err) {
      document.getElementById('tableContainer').innerHTML = `<div class="empty-text">${t('error')}: ${err.message || err}</div>`;
    }
  }

  function renderTable(existing) {
    if (currentStudents.length === 0) {
      document.getElementById('tableContainer').innerHTML = `<div class="empty-text">${t('no_students')}</div>`;
      return;
    }
    let html = '<div class="student-grid">';
    currentStudents.forEach(s => {
      html += `<div class="student-card">
        <div class="student-num">${s.number}</div>
        <div class="student-name">${s.name}</div>
        <div class="student-action">`;
      if (currentMode === 'attendance') {
        html += `<button class="btn-status" id="btn_present_${s.id}" onclick="setStatus(${s.id}, 'มา')">${t('present')}</button>
                 <button class="btn-status" id="btn_activity_${s.id}" onclick="setStatus(${s.id}, 'กิจกรรม')">${t('activity')}</button>`;
      } else {
        const v = existing[s.id] != null ? existing[s.id] : '';
        html += `<input type="number" class="score-input" id="score_${s.id}" placeholder="${t('score_input')}" value="${v}">`;
      }
      html += `</div></div>`;
    });
    html += '</div>';
    document.getElementById('tableContainer').innerHTML = html;

    if (currentMode === 'attendance') {
      attendanceData = {};
      Object.entries(existing).forEach(([sid, status]) => {
        if (status === 'มา' || status === 'กิจกรรม') {
          attendanceData[sid] = status;
          const btn = document.getElementById(status === 'มา' ? `btn_present_${sid}` : `btn_activity_${sid}`);
          if (btn) btn.classList.add(status === 'มา' ? 'active-present' : 'active-activity');
        }
      });
    }
  }

  function setStatus(studentId, status) {
    const btnP = document.getElementById(`btn_present_${studentId}`);
    const btnA = document.getElementById(`btn_activity_${studentId}`);
    btnP.classList.remove('active-present');
    btnA.classList.remove('active-activity');
    if (attendanceData[studentId] === status) delete attendanceData[studentId];
    else {
      attendanceData[studentId] = status;
      if (status === 'มา')      btnP.classList.add('active-present');
      if (status === 'กิจกรรม') btnA.classList.add('active-activity');
    }
  }

  async function saveData() {
    const saveBtn = document.getElementById('saveBtn');
    saveBtn.disabled = true; saveBtn.textContent = t('saving');
    try {
      if (currentMode === 'attendance') {
        const rows = currentStudents.map(s => ({
          student_id: s.id, date: currentRecordKey,
          status: attendanceData[s.id] || 'ขาด'
        }));
        const { error } = await sb.from('attendance').upsert(rows, { onConflict: 'student_id,date' });
        if (error) throw error;
        const activityIds = currentStudents.filter(s => attendanceData[s.id] === 'กิจกรรม').map(s => s.id);
        if (activityIds.length > 0) {
          const { error: uerr } = await sb.from('students').update({ in_activity: true }).in('id', activityIds);
          if (uerr) throw uerr;
        }
      } else {
        const rows = [];
        currentStudents.forEach(s => {
          const v = document.getElementById(`score_${s.id}`).value;
          if (v !== '') rows.push({ student_id: s.id, title: currentRecordKey, score: Number(v) });
        });
        if (rows.length > 0) {
          const { error } = await sb.from('scores').upsert(rows, { onConflict: 'student_id,title' });
          if (error) throw error;
        }
      }
      alert(t('save_success'));
      attendanceData = {};
      goToApp();
    } catch (err) {
      alert(t('save_failed') + ': ' + (err.message || err));
    } finally {
      saveBtn.disabled = false; saveBtn.textContent = t('save');
    }
  }

  // ============================================================
  // ACTIVITY LIST (filtered by current form selection)
  // ============================================================
  function onClickActivityList() {
    const yearTH = getThaiYearFromUI();
    const level  = document.getElementById('level').value;
    const room   = document.getElementById('room').value.trim();
    if (!yearTH || !level || !room) { alert(t('fill_required')); return; }
    showPage('page-activity');
    loadActivityList();
  }

  async function loadActivityList() {
    const cont = document.getElementById('activityContainer');
    const scopeEl = document.getElementById('activity-scope-text');
    const yearTH = getThaiYearFromUI();
    const level  = document.getElementById('level').value;
    const room   = document.getElementById('room').value.trim();
    const yearShown = currentLang === 'th' ? yearTH : (yearTH - 543);
    const yearLbl = currentLang === 'th' ? 'พ.ศ.' : 'CE';
    scopeEl.textContent = `${level}/${room} | ${yearLbl} ${yearShown}`;

    cont.innerHTML = `<div class="loading-text">${t('loading')}</div>`;
    try {
      const { data, error } = await sb.from('students')
        .select('id, student_code, level, room, number, prefix, first_name, last_name, year')
        .eq('in_activity', true)
        .eq('year', yearTH).eq('level', level).eq('room', room)
        .order('number');
      if (error) throw error;
      if (!data || data.length === 0) {
        cont.innerHTML = `<div class="info-text">${t('no_activity')}</div>`;
        return;
      }
      let html = '<div class="student-grid">';
      data.forEach(s => {
        const name = (s.prefix || '') + s.first_name + ' ' + s.last_name;
        const meta = `${s.level}/${s.room} · #${s.number}`;
        html += `<div class="student-card">
          <div class="student-num">${s.number}</div>
          <div style="flex:1; min-width:0;">
            <div class="student-name">${name}</div>
            <div class="student-meta">${meta}</div>
          </div>
          <button class="btn-bringback" onclick="bringBack(${s.id})">${t('bring_back')}</button>
        </div>`;
      });
      html += '</div>';
      cont.innerHTML = html;
    } catch (err) {
      cont.innerHTML = `<div class="empty-text">${t('error')}: ${err.message || err}</div>`;
    }
  }

  async function bringBack(studentId) {
    if (!confirm(t('confirm_bring_back'))) return;
    try {
      const { error } = await sb.from('students').update({ in_activity: false }).eq('id', studentId);
      if (error) throw error;
      await loadActivityList();
    } catch (err) {
      alert(t('error') + ': ' + (err.message || err));
    }
  }

  // ============================================================
  // PDF REPORT
  // ============================================================
  function termLabel(term) {
    if (term === '1' || term === 1) return t('term_1');
    if (term === '2' || term === 2) return t('term_2');
    return t('term_all');
  }

  async function generateReport() {
    const yearTH = getThaiYearFromUI();
    const level  = document.getElementById('level').value;
    const room   = document.getElementById('room').value.trim();
    const term   = document.getElementById('term').value;
    if (!yearTH || !level || !room) { alert(t('fill_required')); return; }

    const btn = document.getElementById('btn-report');
    const original = btn.textContent;
    btn.disabled = true; btn.textContent = t('report_generating');

    try {
      // Fetch students (paginated — ห้องเดียวไม่ถึง 1000 แต่กันเหนียวไว้)
      const students = await fetchAllPaginated(() =>
        sb.from('students')
          .select('id, student_code, number, prefix, first_name, last_name, in_activity')
          .eq('year', yearTH).eq('level', level).eq('room', room)
          .order('number')
      );

      const ids = students.map(s => s.id);
      let attendance = [], scores = [];
      if (ids.length > 0) {
        const allAtt = await fetchAttendanceByStudentIds(ids);
        attendance = allAtt.filter(a => isDateInTerm(a.date, yearTH, term));
        scores = await fetchScoresByStudentIds(ids);
      }

      await buildAndDownloadPDF({ students, attendance, scores, yearTH, level, room, term });
    } catch (err) {
      alert(t('error') + ': ' + (err.message || err));
    } finally {
      btn.disabled = false; btn.textContent = original;
      updateActionButtonsState();
    }
  }

  async function renderToPDF(pdf, element, orientation) {
    const canvas = await html2canvas(element, {
      scale: 2, backgroundColor: '#ffffff', useCORS: true, logging: false,
      windowWidth: element.scrollWidth, windowHeight: element.scrollHeight
    });
    const pageW = orientation === 'p' ? 210 : 297;
    const pageH = orientation === 'p' ? 297 : 210;
    const margin = 0;
    const maxW = pageW - 2*margin;
    const maxH = pageH - 2*margin;
    const ratio = canvas.width / canvas.height;
    let imgW = maxW, imgH = maxW / ratio;
    if (imgH > maxH) { imgH = maxH; imgW = maxH * ratio; }
    const x = (pageW - imgW) / 2;
    const y = (pageH - imgH) / 2;
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', x, y, imgW, imgH);
  }

  function chunk(arr, n) { const out=[]; for (let i=0; i<arr.length; i+=n) out.push(arr.slice(i,i+n)); return out; }

  // ดึงข้อมูลทั้งหมดทีละ page (เลี่ยง Supabase default limit 1000)
  // buildQuery: () => สร้าง query builder ใหม่ทุกครั้งที่เรียก (เพราะ range/limit ไม่ควรซ้อน)
  async function fetchAllPaginated(buildQuery, pageSize = 1000) {
    const all = []; let from = 0;
    while (true) {
      const { data, error } = await buildQuery().range(from, from + pageSize - 1);
      if (error) throw error;
      if (!data || data.length === 0) break;
      all.push(...data);
      if (data.length < pageSize) break;
      from += pageSize;
    }
    return all;
  }

  // ดึง attendance ของรายชื่อ student_id ที่กำหนด (chunk เพื่อกัน URL ยาวเกิน)
  async function fetchAttendanceByStudentIds(studentIds) {
    const all = [];
    for (const batch of chunk(studentIds, 400)) {
      const part = await fetchAllPaginated(() =>
        sb.from('attendance').select('*').in('student_id', batch).order('id')
      );
      all.push(...part);
    }
    return all;
  }

  async function fetchScoresByStudentIds(studentIds) {
    const all = [];
    for (const batch of chunk(studentIds, 400)) {
      const part = await fetchAllPaginated(() =>
        sb.from('scores').select('*').in('student_id', batch).order('id')
      );
      all.push(...part);
    }
    return all;
  }

  async function buildAndDownloadPDF({ students, attendance, scores, yearTH, level, room, term }) {
    const yearShown = currentLang === 'th' ? yearTH : (yearTH - 543);
    const yearLbl = currentLang === 'th' ? 'พ.ศ.' : 'CE';
    const today = new Date();
    const dateStr = `${today.getDate()}/${today.getMonth()+1}/${currentLang === 'th' ? today.getFullYear()+543 : today.getFullYear()}`;

    // Aggregate per student
    const perStudent = {};
    students.forEach(s => {
      perStudent[s.id] = { ...s, present:0, absent:0, activity:0, total:0, scores: { pre:null, mid:null, final:null } };
    });
    attendance.forEach(a => {
      const p = perStudent[a.student_id]; if (!p) return;
      p.total++;
      if (a.status === 'มา')      p.present++;
      else if (a.status === 'ขาด') p.absent++;
      else if (a.status === 'กิจกรรม') p.activity++;
    });
    scores.forEach(sc => {
      const p = perStudent[sc.student_id]; if (!p) return;
      if (sc.title === 'pre')   p.scores.pre   = sc.score;
      if (sc.title === 'mid')   p.scores.mid   = sc.score;
      if (sc.title === 'final') p.scores.final = sc.score;
    });
    const list = Object.values(perStudent).sort((a,b) => a.number - b.number);

    // Unique dates sorted
    const allDates = [...new Set(attendance.map(a => a.date))].filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();

    const container = document.getElementById('report-container');
    container.innerHTML = '';

    // -------- 1) COVER --------
    const cover = document.createElement('div');
    cover.className = 'report-page report-cover';
    cover.innerHTML = `
      <div class="badge">${t('report_title').toUpperCase()}</div>
      <h1>${t('report_title')}</h1>
      <div class="school">${SCHOOL_NAME}</div>
      <div class="info-grid">
        <div><div class="label">${t('level')}</div><div class="val">${level}</div></div>
        <div><div class="label">${t('room')}</div><div class="val">${room}</div></div>
        <div><div class="label">${t('year')}</div><div class="val">${yearLbl} ${yearShown}</div></div>
        <div><div class="label">${t('term')}</div><div class="val">${termLabel(term)}</div></div>
      </div>
      <div class="footer">${t('generated_on')}: ${dateStr}</div>
    `;
    container.appendChild(cover);

    // -------- 2) ROSTER + ATTENDANCE SUMMARY --------
    const rosterChunks = chunk(list, 28);
    rosterChunks.forEach((batch, idx) => {
      const page = document.createElement('div');
      page.className = 'report-page';
      const rows = batch.map(p => {
        const rate = p.total > 0 ? ((p.present / p.total) * 100).toFixed(1) : '-';
        return `<tr>
          <td class="num">${p.number}</td>
          <td>${(p.prefix||'') + p.first_name + ' ' + p.last_name}</td>
          <td class="center">${p.student_code}</td>
          <td class="center">${p.present}</td>
          <td class="center">${p.absent}</td>
          <td class="center">${p.activity}</td>
          <td class="center">${rate}</td>
        </tr>`;
      }).join('');
      page.innerHTML = `
        <h1>${t('report_title')}</h1>
        <div class="meta">${level}/${room} · ${yearLbl} ${yearShown} · ${termLabel(term)}</div>
        <h2>${t('report_section_roster')} ${rosterChunks.length>1 ? `(${idx+1}/${rosterChunks.length})` : ''}</h2>
        <table class="report-table">
          <thead><tr>
            <th class="num">${t('th_no')}</th>
            <th>${t('th_name')}</th>
            <th class="center">${t('th_code')}</th>
            <th class="center">${t('th_present')}</th>
            <th class="center">${t('th_absent')}</th>
            <th class="center">${t('th_activity')}</th>
            <th class="center">${t('th_rate')}</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
      container.appendChild(page);
    });

    // -------- 3) SCORES TABLE --------
    const scoreChunks = chunk(list, 28);
    scoreChunks.forEach((batch, idx) => {
      const page = document.createElement('div');
      page.className = 'report-page';
      const rows = batch.map(p => {
        const ss = [p.scores.pre, p.scores.mid, p.scores.final].filter(v => v != null);
        const avg = ss.length > 0 ? (ss.reduce((a,b)=>a+Number(b),0) / ss.length).toFixed(2) : '-';
        return `<tr>
          <td class="num">${p.number}</td>
          <td>${(p.prefix||'') + p.first_name + ' ' + p.last_name}</td>
          <td class="center">${p.scores.pre   ?? '-'}</td>
          <td class="center">${p.scores.mid   ?? '-'}</td>
          <td class="center">${p.scores.final ?? '-'}</td>
          <td class="center"><strong>${avg}</strong></td>
        </tr>`;
      }).join('');
      page.innerHTML = `
        <h1>${t('report_title')}</h1>
        <div class="meta">${level}/${room} · ${yearLbl} ${yearShown} · ${termLabel(term)}</div>
        <h2>${t('report_section_scores')} ${scoreChunks.length>1 ? `(${idx+1}/${scoreChunks.length})` : ''}</h2>
        <table class="report-table">
          <thead><tr>
            <th class="num">${t('th_no')}</th>
            <th>${t('th_name')}</th>
            <th class="center">${t('th_pre')}</th>
            <th class="center">${t('th_mid')}</th>
            <th class="center">${t('th_final')}</th>
            <th class="center">${t('th_avg')}</th>
          </tr></thead>
          <tbody>${rows}</tbody>
        </table>`;
      container.appendChild(page);
    });

    // -------- 4) DAILY ATTENDANCE (LANDSCAPE) --------
    let dailyPages = [];
    if (allDates.length > 0) {
      const DATES_PER_PAGE = 18;
      const STUDENTS_PER_PAGE = 32;
      const dateChunks = chunk(allDates, DATES_PER_PAGE);
      const studentChunks = chunk(list, STUDENTS_PER_PAGE);
      studentChunks.forEach((sBatch, si) => {
        dateChunks.forEach((dBatch, di) => {
          const page = document.createElement('div');
          page.className = 'report-page landscape';
          const headerCells = dBatch.map(d => `<th class="center">${formatDateForDisplay(d)}</th>`).join('');
          const rows = sBatch.map(p => {
            const cells = dBatch.map(d => {
              const rec = attendance.find(a => a.student_id === p.id && a.date === d);
              if (!rec) return `<td class="cell">-</td>`;
              const pill = rec.status === 'มา' ? 'present' : (rec.status === 'ขาด' ? 'absent' : 'activity');
              const sym = rec.status === 'มา' ? '✓' : (rec.status === 'ขาด' ? '✗' : '●');
              return `<td class="cell"><span class="pill ${pill}">${sym}</span></td>`;
            }).join('');
            return `<tr>
              <td class="num">${p.number}</td>
              <td>${(p.prefix||'') + p.first_name + ' ' + p.last_name}</td>
              ${cells}
            </tr>`;
          }).join('');
          page.innerHTML = `
            <h1>${t('report_title')}</h1>
            <div class="meta">${level}/${room} · ${yearLbl} ${yearShown} · ${termLabel(term)}</div>
            <h2>${t('report_section_daily')} (${si*STUDENTS_PER_PAGE+1}-${Math.min((si+1)*STUDENTS_PER_PAGE, list.length)} · ${di*DATES_PER_PAGE+1}-${Math.min((di+1)*DATES_PER_PAGE, allDates.length)})</h2>
            <table class="report-table report-table-grid">
              <thead><tr>
                <th class="num">${t('th_no')}</th>
                <th>${t('th_name')}</th>
                ${headerCells}
              </tr></thead>
              <tbody>${rows}</tbody>
            </table>`;
          container.appendChild(page);
          dailyPages.push(page);
        });
      });
    }

    // -------- 5) STATS --------
    const totalRecords = attendance.length;
    const overallPresent = attendance.filter(a => a.status === 'มา').length;
    const overallAbsent  = attendance.filter(a => a.status === 'ขาด').length;
    const overallActivity = attendance.filter(a => a.status === 'กิจกรรม').length;
    const overallRate = totalRecords > 0 ? ((overallPresent / totalRecords) * 100).toFixed(1) : '-';
    const topAbsent = [...list].sort((a,b)=>b.absent-a.absent).slice(0,5);
    const bestAtt   = [...list].filter(p=>p.total>0).sort((a,b)=>(b.present/b.total)-(a.present/a.total)).slice(0,5);

    const stats = document.createElement('div');
    stats.className = 'report-page';
    stats.innerHTML = `
      <h1>${t('report_title')}</h1>
      <div class="meta">${level}/${room} · ${yearLbl} ${yearShown} · ${termLabel(term)}</div>
      <h2>${t('report_section_stats')}</h2>
      <div class="stat-grid">
        <div class="stat-card"><div class="l">${t('th_total_students')}</div><div class="v">${list.length}</div></div>
        <div class="stat-card"><div class="l">${t('th_present')}</div><div class="v">${overallPresent}</div></div>
        <div class="stat-card"><div class="l">${t('th_absent')}</div><div class="v">${overallAbsent}</div></div>
        <div class="stat-card"><div class="l">${t('th_rate')}</div><div class="v">${overallRate}%</div></div>
      </div>
      <div class="report-section">
        <h3 style="font-size:14px; margin-bottom:8px; color:#1d1d1f;">${t('th_top_absent')}</h3>
        <table class="report-table">
          <thead><tr><th class="num">${t('th_no')}</th><th>${t('th_name')}</th><th class="center">${t('th_absent')}</th><th class="center">${t('th_present')}</th></tr></thead>
          <tbody>${topAbsent.map(p => `<tr><td class="num">${p.number}</td><td>${(p.prefix||'')+p.first_name+' '+p.last_name}</td><td class="center">${p.absent}</td><td class="center">${p.present}</td></tr>`).join('')}</tbody>
        </table>
      </div>
      <div class="report-section">
        <h3 style="font-size:14px; margin-bottom:8px; color:#1d1d1f;">${t('th_best_attendance')}</h3>
        <table class="report-table">
          <thead><tr><th class="num">${t('th_no')}</th><th>${t('th_name')}</th><th class="center">${t('th_present')}</th><th class="center">${t('th_rate')}</th></tr></thead>
          <tbody>${bestAtt.map(p => `<tr><td class="num">${p.number}</td><td>${(p.prefix||'')+p.first_name+' '+p.last_name}</td><td class="center">${p.present}</td><td class="center">${((p.present/p.total)*100).toFixed(1)}</td></tr>`).join('')}</tbody>
        </table>
      </div>
    `;
    container.appendChild(stats);

    // -------- BUILD PDF --------
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pages = container.querySelectorAll('.report-page');
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      const orient = page.classList.contains('landscape') ? 'l' : 'p';
      if (i > 0) pdf.addPage('a4', orient);
      await renderToPDF(pdf, page, orient);
    }
    pdf.save(`Report_${level}_${room}_${yearTH}_${termLabel(term)}.pdf`);

    container.innerHTML = '';
  }

  // ============================================================
  // DASHBOARD
  // ============================================================
  async function loadDashboard() {
    const yearTH = getThaiYearFromUI('db-year');
    const term   = document.getElementById('db-term').value;
    const level  = document.getElementById('db-level').value;
    const room   = document.getElementById('db-room').value;

    const content = document.getElementById('db-content');
    content.innerHTML = `<div class="loading-text">${t('loading')}</div>`;

    try {
      // ดึง students ครบทุก row (paginated)
      const students = await fetchAllPaginated(() => {
        let q = sb.from('students').select('*').eq('year', yearTH);
        if (level !== 'all') q = q.eq('level', level);
        if (room  !== 'all') q = q.eq('room', room);
        return q.order('id');
      });

      const ids = students.map(s => s.id);
      let attendance = [], scores = [];
      if (ids.length > 0) {
        const allAtt = await fetchAttendanceByStudentIds(ids);
        attendance = allAtt.filter(a => isDateInTerm(a.date, yearTH, term));
        scores = await fetchScoresByStudentIds(ids);
      }

      renderDashboard({ students, attendance, scores, yearTH, term, level, room });
    } catch (err) {
      content.innerHTML = `<div class="empty-text">${t('error')}: ${err.message || err}</div>`;
    }
  }

  function renderDashboard({ students, attendance, scores, level, room }) {
    // KPIs
    const totalStudents = students.length;
    const inActivity = students.filter(s => s.in_activity).length;
    const presentCount = attendance.filter(a => a.status === 'มา').length;
    const totalRecords = attendance.length;
    const attRate = totalRecords > 0 ? ((presentCount / totalRecords) * 100).toFixed(1) : '0.0';
    const uniqueDates = new Set(attendance.map(a => a.date)).size;

    // Status counts
    const statusCounts = { 'มา': 0, 'ขาด': 0, 'กิจกรรม': 0 };
    attendance.forEach(a => { if (statusCounts.hasOwnProperty(a.status)) statusCounts[a.status]++; });

    // Per-class breakdown (level/room)
    const perClass = {};
    students.forEach(s => {
      const k = `${s.level}/${s.room}`;
      perClass[k] = (perClass[k] || 0) + 1;
    });
    const perClassKeys = Object.keys(perClass).sort();

    // Daily trend
    const byDate = {};
    attendance.forEach(a => {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(a.date)) return;
      byDate[a.date] = byDate[a.date] || { present:0, absent:0, activity:0 };
      if (a.status === 'มา') byDate[a.date].present++;
      else if (a.status === 'ขาด') byDate[a.date].absent++;
      else if (a.status === 'กิจกรรม') byDate[a.date].activity++;
    });
    const trendDates = Object.keys(byDate).sort();
    const trendPresent = trendDates.map(d => byDate[d].present);

    // Score averages
    const scoreAgg = { pre:[], mid:[], final:[] };
    scores.forEach(s => { if (scoreAgg[s.title]) scoreAgg[s.title].push(Number(s.score)); });
    const scoreAvg = {
      pre:   scoreAgg.pre.length   ? (scoreAgg.pre.reduce((a,b)=>a+b,0)/scoreAgg.pre.length).toFixed(2)     : 0,
      mid:   scoreAgg.mid.length   ? (scoreAgg.mid.reduce((a,b)=>a+b,0)/scoreAgg.mid.length).toFixed(2)     : 0,
      final: scoreAgg.final.length ? (scoreAgg.final.reduce((a,b)=>a+b,0)/scoreAgg.final.length).toFixed(2) : 0
    };

    // Render HTML
    const html = `
      <div class="kpi-grid">
        <div class="kpi-card"><div class="kpi-label">${t('kpi_total_students')}</div><div class="kpi-value">${totalStudents}</div></div>
        <div class="kpi-card"><div class="kpi-label">${t('kpi_in_activity')}</div><div class="kpi-value">${inActivity}</div></div>
        <div class="kpi-card"><div class="kpi-label">${t('kpi_attendance_rate')}</div><div class="kpi-value">${attRate}%</div></div>
        <div class="kpi-card"><div class="kpi-label">${t('kpi_days_recorded')}</div><div class="kpi-value">${uniqueDates}</div></div>
      </div>
      <div class="chart-grid">
        <div class="chart-card"><h3>${t('chart_status')}</h3><div class="chart-wrap"><canvas id="ch-status"></canvas></div></div>
        <div class="chart-card"><h3>${t('chart_per_class')}</h3><div class="chart-wrap"><canvas id="ch-class"></canvas></div></div>
        <div class="chart-card"><h3>${t('chart_trend')}</h3><div class="chart-wrap"><canvas id="ch-trend"></canvas></div></div>
        <div class="chart-card"><h3>${t('chart_scores')}</h3><div class="chart-wrap"><canvas id="ch-scores"></canvas></div></div>
      </div>
    `;
    document.getElementById('db-content').innerHTML = html;

    // Destroy old charts
    Object.values(dashboardCharts).forEach(c => c.destroy && c.destroy());
    dashboardCharts = {};

    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#1d1d1f';
    const gridColor = currentTheme() === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    // Status pie
    dashboardCharts.status = new Chart(document.getElementById('ch-status'), {
      type: 'doughnut',
      data: {
        labels: [t('present'), t('th_absent'), t('activity')],
        datasets: [{
          data: [statusCounts['มา'], statusCounts['ขาด'], statusCounts['กิจกรรม']],
          backgroundColor: ['#34c759','#ff3b30','#ff9500'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: textColor, font: { family: 'Sarabun', size: 12 } } } }
      }
    });

    // Per class bar
    dashboardCharts.cls = new Chart(document.getElementById('ch-class'), {
      type: 'bar',
      data: {
        labels: perClassKeys,
        datasets: [{
          label: t('kpi_total_students'),
          data: perClassKeys.map(k => perClass[k]),
          backgroundColor: '#667eea', borderRadius: 8
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor, font: { family: 'Sarabun' } }, grid: { color: gridColor } },
          y: { ticks: { color: textColor, font: { family: 'Sarabun' } }, grid: { color: gridColor }, beginAtZero: true }
        }
      }
    });

    // Trend line
    dashboardCharts.trend = new Chart(document.getElementById('ch-trend'), {
      type: 'line',
      data: {
        labels: trendDates.map(d => formatDateForDisplay(d)),
        datasets: [{
          label: t('present'),
          data: trendPresent,
          borderColor: '#667eea', backgroundColor: 'rgba(102,126,234,0.15)',
          tension: 0.35, fill: true, pointRadius: 3
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor, font: { family: 'Sarabun' } }, grid: { color: gridColor } },
          y: { ticks: { color: textColor, font: { family: 'Sarabun' } }, grid: { color: gridColor }, beginAtZero: true }
        }
      }
    });

    // Score bar
    dashboardCharts.scores = new Chart(document.getElementById('ch-scores'), {
      type: 'bar',
      data: {
        labels: [t('th_pre'), t('th_mid'), t('th_final')],
        datasets: [{
          label: t('th_avg'),
          data: [scoreAvg.pre, scoreAvg.mid, scoreAvg.final],
          backgroundColor: ['#43e97b','#4facfe','#f093fb'],
          borderRadius: 8
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: textColor, font: { family: 'Sarabun' } }, grid: { color: gridColor } },
          y: { ticks: { color: textColor, font: { family: 'Sarabun' } }, grid: { color: gridColor }, beginAtZero: true }
        }
      }
    });
  }
  function currentTheme() { return document.documentElement.getAttribute('data-theme') || 'light'; }

  // ============================================================
  // START
  // ============================================================
  init();
