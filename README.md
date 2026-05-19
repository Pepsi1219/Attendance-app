# Attendance Project — Supabase Edition

ระบบเช็คชื่อและกรอกคะแนนนักเรียน — Frontend (static HTML/JS) + Supabase backend

---

## โครงสร้างโปรเจกต์

```
.
├── index.html                # หน้าเว็บหลัก (login + app)
├── supabase/
│   └── schema.sql            # สร้างตาราง + RLS — รันใน Supabase SQL Editor
├── scripts/
│   ├── migrate.js            # script import ข้อมูลจาก CSV
│   ├── package.json
│   ├── .env.example
│   └── (ใส่ P5.csv, P6.csv ที่นี่ก่อน migrate)
├── Code.gs                   # (เก่า) Apps Script — ไม่ใช้แล้ว
└── Index.old.html            # (เก่า) — ไม่ใช้แล้ว
```

---

## Step 1 — สร้างตารางใน Supabase

1. เปิด Supabase Dashboard → SQL Editor
2. Copy เนื้อหาจาก `supabase/schema.sql` ทั้งหมด → วาง → กด **Run**
3. ตรวจสอบที่ Table Editor ว่ามีตาราง `students`, `attendance`, `scores`

---

## Step 2 — สร้างบัญชีครู (Auth)

1. Supabase Dashboard → **Authentication → Users → Add user → Create new user**
2. ใส่อีเมล + รหัสผ่าน ของครู (ติ๊ก **Auto Confirm User** ด้วย ไม่ต้องยืนยันอีเมล)
3. ทำซ้ำสำหรับครูทุกคน

---

## Step 3 — Migrate ข้อมูลนักเรียนจาก Google Sheets

### 3.1 Export Google Sheets เป็น CSV
- เปิด Google Sheet → คลิก tab **P5** → File → Download → **Comma-separated values (.csv)**
- ทำซ้ำกับ tab **P6**
- ย้ายไฟล์ที่ได้ไปวางที่ `scripts/P5.csv` และ `scripts/P6.csv`

### 3.2 ติดตั้ง dependencies
```bash
cd scripts
npm install
```

### 3.3 ตั้งค่า env
```bash
cp .env.example .env
```
แล้วเปิด `.env` ใส่ **Service Role Key** (หาที่ Supabase Dashboard → Project Settings → API → `service_role` ใต้หัวข้อ "Project API keys")

> ⚠️ Service Role Key bypass RLS — เก็บเป็นความลับ ห้าม commit / share

### 3.4 รัน migration
```bash
npm run migrate
```

จะเห็น output ประมาณนี้:
```
🚀 เริ่ม migration...
---- P5.csv ----
📄 อ่าน P5.csv: 270 แถว
   👥 students to upsert: 270
   ✅ students imported
   📅 พบคอลัมน์วันที่: 16 พ.ค. 69, 17 พ.ค. 69
   📝 attendance rows: 540
   ✅ attendance imported
...
🎉 เสร็จสิ้น!
```

---

## Step 4 — รัน Frontend (local dev)

ใช้ VS Code Live Server เปิด `index.html` ได้เลย หรือ:
```bash
npx serve .
```

> หมายเหตุ: `google.script.run` ไม่ถูกใช้แล้ว — รัน local ก็เชื่อมกับ Supabase ได้จริง

---

## Step 5 — Deploy ขึ้น Vercel

1. Push โปรเจกต์ขึ้น GitHub
2. ไปที่ [vercel.com](https://vercel.com) → New Project → Import จาก GitHub
3. Vercel จะ detect ว่าเป็น static site อัตโนมัติ — กด **Deploy**
4. เสร็จ! จะได้ URL เช่น `https://attendance-xxx.vercel.app`

> ไม่ต้องใส่ environment variable เพราะ `SUPABASE_URL` และ **anon key** ปลอดภัยที่จะอยู่ใน frontend (ป้องกันด้วย RLS แล้ว)

---

## หมายเหตุด้านความปลอดภัย

- **anon key** = public, ใส่ใน frontend ได้ (ป้องกันด้วย RLS)
- **service_role key** = secret, ใช้แค่ใน script migrate.js ฝั่ง server เท่านั้น
- RLS policy ปัจจุบัน: ผู้ใช้ที่ login แล้ว (authenticated) อ่าน/เขียน ได้ทุก row
  - ถ้าต้องการแยกสิทธิ์ตามครู/ห้อง ค่อยปรับ policy ใน `schema.sql` ภายหลัง
