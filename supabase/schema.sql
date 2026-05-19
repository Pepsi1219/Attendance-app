-- =====================================================
-- Attendance App - Database Schema
-- รันใน Supabase Dashboard > SQL Editor
-- =====================================================

-- =====================================================
-- 1. Tables
-- =====================================================

-- ตารางนักเรียน
CREATE TABLE IF NOT EXISTS public.students (
  id BIGSERIAL PRIMARY KEY,
  student_code TEXT NOT NULL UNIQUE,       -- รหัสประจำตัวนักเรียน
  level TEXT NOT NULL,                     -- ป.5, ป.6
  room TEXT NOT NULL,                      -- ห้อง (รองรับ 1-8, A, B, C ฯลฯ)
  number INTEGER NOT NULL,                 -- เลขที่ในห้อง
  prefix TEXT,                             -- คำนำหน้า (เด็กหญิง/เด็กชาย)
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  year INTEGER NOT NULL,                   -- ปีการศึกษา (พ.ศ.)
  in_activity BOOLEAN NOT NULL DEFAULT FALSE,  -- TRUE = ลงเรียนกิจกรรมถาวร, ตัดออกจากเช็คชื่อ
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_year_level_room
  ON public.students(year, level, room);

-- ตารางการเช็คชื่อ
CREATE TABLE IF NOT EXISTS public.attendance (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  date TEXT NOT NULL,                      -- เก็บเป็น text ตามที่ผู้ใช้พิมพ์ เช่น "16 พ.ค. 69" หรือ "15/08/2567"
  status TEXT NOT NULL CHECK (status IN ('มา', 'ขาด', 'กิจกรรม')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, date)                -- นักเรียนคนหนึ่งมี 1 status ต่อวัน
);

CREATE INDEX IF NOT EXISTS idx_attendance_student_date
  ON public.attendance(student_id, date);
CREATE INDEX IF NOT EXISTS idx_attendance_date
  ON public.attendance(date);

-- ตารางคะแนน
CREATE TABLE IF NOT EXISTS public.scores (
  id BIGSERIAL PRIMARY KEY,
  student_id BIGINT NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  title TEXT NOT NULL,                     -- ชื่อชิ้นงาน เช่น "สอบกลางภาค"
  score NUMERIC,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (student_id, title)
);

CREATE INDEX IF NOT EXISTS idx_scores_student_title
  ON public.scores(student_id, title);

-- =====================================================
-- 2. Trigger: auto-update updated_at
-- =====================================================
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_students_updated_at ON public.students;
CREATE TRIGGER trg_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_attendance_updated_at ON public.attendance;
CREATE TRIGGER trg_attendance_updated_at
  BEFORE UPDATE ON public.attendance
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_scores_updated_at ON public.scores;
CREATE TRIGGER trg_scores_updated_at
  BEFORE UPDATE ON public.scores
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =====================================================
-- 3. Row Level Security (RLS)
-- ผู้ใช้ที่ login แล้ว (authenticated) เท่านั้นจะเข้าถึงได้
-- =====================================================

ALTER TABLE public.students   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scores     ENABLE ROW LEVEL SECURITY;

-- Grants: role 'authenticated' ต้องมีสิทธิ์ระดับ table ก่อน RLS จะมีผล
GRANT SELECT, INSERT, UPDATE, DELETE ON public.students   TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.attendance TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.scores     TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- students: authenticated user อ่านได้ (เขียนผ่าน admin / migration script)
DROP POLICY IF EXISTS "auth can read students"  ON public.students;
DROP POLICY IF EXISTS "auth can write students" ON public.students;

CREATE POLICY "auth can read students"
  ON public.students FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "auth can write students"
  ON public.students FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- attendance: authenticated user เต็มสิทธิ์
DROP POLICY IF EXISTS "auth can manage attendance" ON public.attendance;
CREATE POLICY "auth can manage attendance"
  ON public.attendance FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);

-- scores: authenticated user เต็มสิทธิ์
DROP POLICY IF EXISTS "auth can manage scores" ON public.scores;
CREATE POLICY "auth can manage scores"
  ON public.scores FOR ALL
  TO authenticated
  USING (true) WITH CHECK (true);
