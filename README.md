# Attendance & Score System

A modern web app for elementary school attendance tracking and score recording, built with vanilla JavaScript and Supabase.

> Originally built as a Google Apps Script tool, now migrated to a Supabase-backed static web app deployed on Vercel.

---

## ✨ Features

- 📋 **Attendance Check** — Mark students as Present / Absent / Activity (with date picker)
- 📝 **Score Entry** — Record scores for Pre-Midterm / Midterm / Final
- 🚫 **Activity Exclusion** — Students marked as "Activity" are automatically excluded from future attendance lists (with a "bring back" feature)
- 📄 **PDF Reports** — Generate beautiful multi-page reports per class (cover + roster + scores + daily grid + statistics)
- 📊 **Dashboard** — KPI cards + 4 charts (status pie, students per class, daily trend, average scores)
- 🌗 **Dark / Light mode** — System-style theme toggle
- 🌐 **Bilingual UI** — Thai / English toggle (UI text only; student data stays in original language)
- 🔐 **Authentication** — Teachers sign in via Supabase Auth (email/password)
- 📱 **Responsive** — Mobile-first design, scales beautifully on tablet and desktop

---

## 🗂️ Project Structure

```
.
├── index.html              # Main app entry point
├── migrate.html            # One-time browser-based migration tool
├── css/
│   ├── style.css           # Main app styles (theming, glass cards, responsive)
│   └── migrate.css         # Migration tool styles
├── js/
│   ├── app.js              # Main app logic (auth, attendance, scores, dashboard, PDF)
│   └── migrate.js          # CSV → Supabase migration logic
├── supabase/
│   └── schema.sql          # Database schema (tables, indexes, RLS, grants)
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vanilla HTML / CSS / JavaScript (no build step) |
| Backend | [Supabase](https://supabase.com) (PostgreSQL + Auth + REST API) |
| Charts | [Chart.js 4](https://www.chartjs.org/) |
| PDF | [jsPDF](https://github.com/parallax/jsPDF) + [html2canvas](https://html2canvas.hertzen.com/) |
| CSV Parsing | [Papa Parse](https://www.papaparse.com/) (migration tool only) |
| Hosting | [Vercel](https://vercel.com) (static site) |
| Fonts | [Sarabun](https://fonts.google.com/specimen/Sarabun) (Thai-friendly) |

---

## 🚀 Setup

### Prerequisites
- A [Supabase](https://supabase.com) project (free tier works fine)
- A modern browser

### 1. Create the database schema

1. Go to **Supabase Dashboard → SQL Editor → New Query**
2. Paste the entire contents of `supabase/schema.sql`
3. Click **Run**
4. Verify in **Table Editor** that `students`, `attendance`, and `scores` tables exist

### 2. Create teacher accounts

1. Go to **Authentication → Users → Add user → Create new user**
2. Enter email + password
3. **Important**: Tick **Auto Confirm User**
4. Repeat for each teacher

### 3. Configure the app

Open `js/app.js` and update these constants near the top:

```javascript
const SCHOOL_NAME = 'Your School Name';
const SUPABASE_URL = 'https://YOUR_PROJECT.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_xxxxxxxxxxxxx';
```

The anon key is safe to expose in client code — Row Level Security (RLS) policies enforce that only authenticated users can read/write.

### 4. Run locally

Open `index.html` in a browser. For development, use VS Code's **Live Server** extension or:

```bash
npx serve .
```

> Note: opening `index.html` directly via `file://` may break Supabase Auth — always serve over HTTP.

---

## 📥 Migrate Student Data

The repo includes a browser-based migration tool that imports students (and historical attendance) from CSV files.

### CSV format
Headers must match these Thai column names exactly:

```
ระดับ,ห้อง,รหัสประจำตัว,เลขที่,คำนำหน้า,ชื่อ,นามสกุล,ปีการศึกษา,[<date1>,<date2>,...]
```

The first 8 columns are required student fields. Any additional columns are treated as attendance dates (header = date label, cell value = `มา` / `ขาด` / `กิจกรรม`).

### Steps
1. Export your Google Sheets tabs as CSV (e.g., `P5.csv`, `P6.csv`)
2. Open `migrate.html` via Live Server (HTTP, not `file://`)
3. Sign in with your teacher account
4. Select the CSV files (Ctrl+click for multiple)
5. Click **Start Migration**
6. Watch the log — `🎉 Done!` means success

Re-running is safe: the tool uses **upsert** with `student_code` as the unique key.

---

## 🌐 Deploy to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New → Project**
3. Import your repository
4. Settings:
   - **Framework Preset**: Other
   - **Build Command**: (leave blank)
   - **Output Directory**: (leave blank)
   - **Environment Variables**: none required
5. Click **Deploy**

Your app will be live at `https://<project>.vercel.app` in ~30 seconds.

---

## 🔒 Security Notes

- **anon key** in `js/app.js`: safe to expose, protected by RLS policies
- **service_role key**: never used in frontend; not needed for normal app operation
- **RLS policies** (in `schema.sql`): all reads/writes require authentication
- **CSV files** with student PII (`scripts/*.csv`): excluded via `.gitignore`

If you need stricter access control (e.g., teachers can only see their own classes), extend the RLS policies in `schema.sql`.

---

## 🗄️ Database Schema

```
students          attendance              scores
─────────         ──────────              ──────
id (PK)           id (PK)                 id (PK)
student_code (U)  student_id (FK)         student_id (FK)
level             date                    title    (pre/mid/final)
room              status                  score
number            (มา/ขาด/กิจกรรม)
prefix            UNIQUE(student_id,date) UNIQUE(student_id,title)
first_name
last_name
year (พ.ศ.)
in_activity (bool)
```

- Dates stored as ISO `YYYY-MM-DD` (Western/Christian Era)
- Year stored as Thai Buddhist Era (พ.ศ.) — converted in UI based on language
- `in_activity = TRUE` excludes student from future attendance lists

---

## 🧭 Term Filtering

The Thai academic year runs:
- **Term 1**: May – September
- **Term 2**: November – March (of the following calendar year)

The dashboard and PDF reports filter attendance records by these date ranges.

---

## 📝 License

This project is provided as-is for educational use.

---

## 🙏 Credits

Built collaboratively with [Claude Code](https://claude.com/claude-code).
