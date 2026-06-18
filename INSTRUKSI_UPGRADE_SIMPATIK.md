# INSTRUKSI UPGRADE & PENAMBAHAN FITUR SIMPATIK
> Dokumen ini adalah panduan teknis untuk memperbaiki dan melengkapi prototype SIMPATIK.
> Semua perubahan berbasis **frontend-only** menggunakan `localStorage` sebagai pengganti backend.

---

## 📋 DAFTAR PEKERJAAN (Prioritas Tinggi ke Rendah)

---

## 🔴 PRIORITAS 1 — PERBAIKAN KRITIS (HARUS DIKERJAKAN DULUAN)

---

### [FIX-01] Perbaiki Hardcode `childId` di Dashboard Orang Tua

**File:** `src/pages/orangtua/Dashboard.jsx`

**Masalah:**
```js
// SEKARANG — SALAH, selalu tampil data Andi walau login sebagai orang tua siapapun
const childId = 'S01';
const childName = 'Andi Wijaya';
```

**Yang Harus Dilakukan:**
- Ambil data `currentUser` dari `localStorage`
- Cari siswa yang `id_orangtua === currentUser.id` dari array `students`
- Tampilkan data siswa yang benar sesuai orang tua yang login
- Jika orang tua punya lebih dari 1 anak, tampilkan dropdown selector anak

**Contoh Logika:**
```js
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

// Cari semua anak dari orang tua ini
const myChildren = students.filter(s => s.id_orangtua === currentUser.id);

// State untuk memilih anak (jika lebih dari 1)
const [selectedChildId, setSelectedChildId] = useState(myChildren[0]?.id || null);
const selectedChild = myChildren.find(s => s.id === selectedChildId);
```

**Catatan Tambahan:**
- Tambahkan data orang tua yang lebih lengkap di `dummyData.js` (minimal U03, U04, U05 harus punya siswa terhubung)
- Pastikan setiap siswa di `students[]` memiliki `id_orangtua` yang valid dan terdaftar di `users[]`

---

### [FIX-02] Sambungkan Absen Harian Guru → Dashboard Orang Tua via localStorage

**File yang Terlibat:**
- `src/pages/guru/RekapNilai.jsx` (sisi input guru)
- `src/pages/orangtua/Dashboard.jsx` (sisi tampil orang tua)

**Masalah:**
Saat ini guru menyimpan absen ke React state lokal saja (`setAttendances`), sehingga orang tua tidak bisa melihat absen yang baru diinput hari itu.

**Yang Harus Dilakukan di `RekapNilai.jsx`:**
```js
// Saat handleSaveBulkAbsen dipanggil, TAMBAHKAN simpan ke localStorage
const handleSaveBulkAbsen = (e) => {
  e.preventDefault();

  const newAttendances = []; // ... logic yang sudah ada

  // Simpan ke localStorage agar orang tua bisa baca
  const existing = JSON.parse(localStorage.getItem('simpatik_attendance') || '[]');
  const updated = [...existing, ...newAttendances];
  localStorage.setItem('simpatik_attendance', JSON.stringify(updated));

  setAttendances([...attendances, ...newAttendances]);
  // ... sisa logic
};
```

**Yang Harus Dilakukan di `OrangTuaDashboard.jsx`:**
```js
useEffect(() => {
  // Baca absen dari localStorage (yang diinput guru)
  const savedAttendance = localStorage.getItem('simpatik_attendance');
  if (savedAttendance) {
    const parsed = JSON.parse(savedAttendance);
    // Gabungkan dengan dummy data
    setAllAttendance([...dummyAttendance, ...parsed]);
  }
}, []);
```

---

### [FIX-03] Sambungkan Nilai Guru → Dashboard Orang Tua via localStorage

**File yang Terlibat:**
- `src/pages/guru/RekapNilai.jsx`
- `src/pages/orangtua/Dashboard.jsx`

**Yang Harus Dilakukan di `RekapNilai.jsx`:**
```js
const handleSaveBulkNilai = (e) => {
  e.preventDefault();
  // ... logic validasi yang sudah ada

  // Tambahkan: simpan ke localStorage
  const existing = JSON.parse(localStorage.getItem('simpatik_grades') || '[]');
  const updated = [...existing, ...newGrades];
  localStorage.setItem('simpatik_grades', JSON.stringify(updated));

  setGrades([...grades, ...newGrades]);
};
```

**Yang Harus Dilakukan di `OrangTuaDashboard.jsx`:**
```js
useEffect(() => {
  const savedGrades = localStorage.getItem('simpatik_grades');
  if (savedGrades) {
    const parsed = JSON.parse(savedGrades);
    setAllGrades([...dummyGrades, ...parsed]);
  }
}, []);
```

---

### [FIX-04] Perbaiki Data Relasi di `dummyData.js`

**File:** `src/data/dummyData.js`

**Masalah:**
- User `U04`, `U05` terdaftar sebagai `ORANG_TUA` tapi tidak semua siswa punya `id_orangtua` yang valid
- Guru tidak punya data kelas yang diajar

**Yang Harus Dilakukan:**

**A. Lengkapi data `users` untuk orang tua:**
```js
export const users = [
  { id: "U01", nama: "Admin Sekolah", role: "ADMIN" },
  { id: "U02", nama: "Budi Santoso", role: "GURU", mapel: "Matematika", kelas_diajar: ["4","5","6"] },
  { id: "U02B", nama: "Siti Aminah", role: "GURU", mapel: "Bahasa Indonesia", kelas_diajar: ["1","2","3","4","5","6"] },
  { id: "U02C", nama: "Ahmad Dahlan", role: "GURU", mapel: "IPA", kelas_diajar: ["4","5","6"] },
  { id: "U02D", nama: "Dewi Rahayu", role: "GURU", mapel: "PJOK", kelas_diajar: ["1","2","3","4","5","6"] },
  { id: "U03", nama: "Bapak/Ibu Andi", role: "ORANG_TUA" },
  { id: "U04", nama: "Bapak/Ibu Budi", role: "ORANG_TUA" },
  { id: "U05", nama: "Bapak/Ibu Citra", role: "ORANG_TUA" },
  { id: "U06", nama: "Bapak/Ibu Dewi", role: "ORANG_TUA" },
  // tambah sesuai jumlah siswa
];
```

**B. Pastikan semua siswa punya `id_orangtua` valid:**
```js
export const students = [
  { id: "S01", nis: "1011", nama: "Andi Wijaya", kelas: "5", id_orangtua: "U03" },
  { id: "S02", nis: "1012", nama: "Budi Gunawan", kelas: "5", id_orangtua: "U04" },
  { id: "S03", nis: "1013", nama: "Citra Lestari", kelas: "4", id_orangtua: "U05" },
  { id: "S04", nis: "1014", nama: "Dewi Sartika", kelas: "4", id_orangtua: "U06" },
  // dst...
];
```

---

## 🟡 PRIORITAS 2 — FITUR TAMBAHAN PENTING

---

### [ADD-01] Tambahkan Timeline Absen Harian di Dashboard Orang Tua

**File:** `src/pages/orangtua/Dashboard.jsx`

**Deskripsi:**
Tambahkan section baru berupa tabel/list yang menampilkan riwayat absen per hari, bukan hanya grafik total.

**Tampilan yang Diinginkan:**
```
┌──────────────────────────────────────┐
│ 📅 Riwayat Kehadiran Harian          │
├────────────┬──────────┬──────────────┤
│ Tanggal    │ Hari     │ Status       │
├────────────┼──────────┼──────────────┤
│ 18/06/2026 │ Kamis    │ 🟢 Hadir    │
│ 17/06/2026 │ Rabu     │ 🟡 Sakit    │
│ 16/06/2026 │ Selasa   │ 🟢 Hadir    │
└────────────┴──────────┴──────────────┘
```

**Yang Harus Dilakukan:**
- Buat komponen tabel di bawah grafik kehadiran
- Filter data absen berdasarkan `childId` yang aktif
- Sort berdasarkan tanggal terbaru di atas
- Tampilkan badge warna sesuai status (Hadir=hijau, Sakit=kuning, Izin=biru, Alpa=merah)
- Batasi tampilan 10 data terbaru dengan tombol "Lihat Semua"

---

### [ADD-02] Tambahkan Tipe Nilai (PR/UH/UTS/UAS)

**File yang Terlibat:**
- `src/data/dummyData.js`
- `src/pages/guru/RekapNilai.jsx`
- `src/pages/orangtua/Dashboard.jsx`

**Yang Harus Dilakukan di `dummyData.js`:**
```js
// Tambah field tipe_nilai di setiap entry grades
{ id: "N01", id_siswa: "S01", mapel: "Matematika", nilai: 85, 
  kelas: "5", semester: "1", tipe: "UH" } // UH = Ulangan Harian
```

**Tipe nilai yang tersedia:**
- `PR` = Pekerjaan Rumah
- `UH` = Ulangan Harian
- `UTS` = Ujian Tengah Semester
- `UAS` = Ujian Akhir Semester

**Yang Harus Dilakukan di `RekapNilai.jsx`:**
- Tambahkan dropdown "Tipe Penilaian" di form input nilai bulk
- Simpan field `tipe` saat menyimpan nilai baru

**Yang Harus Dilakukan di `OrangTuaDashboard.jsx`:**
- Tampilkan tipe nilai di tabel/grafik
- Tambah filter berdasarkan tipe nilai

---

### [ADD-03] Tambahkan Notifikasi Badge di Navbar/Sidebar

**File yang Terlibat:**
- `src/components/Navbar.jsx`
- `src/components/Sidebar.jsx`

**Deskripsi:**
Tampilkan angka merah kecil (badge) di menu orang tua saat ada data baru (absen baru, nilai baru, catatan perilaku baru).

**Yang Harus Dilakukan:**

**A. Buat helper function di file baru `src/utils/notificationHelper.js`:**
```js
// Cek apakah ada absen/nilai/catatan yang dibuat hari ini
export const getTodayNotifCount = (childId) => {
  const today = new Date().toISOString().split('T')[0];
  
  const attendance = JSON.parse(localStorage.getItem('simpatik_attendance') || '[]');
  const grades = JSON.parse(localStorage.getItem('simpatik_grades') || '[]');
  const notes = JSON.parse(localStorage.getItem('simpatik_behavior_notes') || '[]');
  
  const newAbsen = attendance.filter(a => a.id_siswa === childId && a.tanggal === today).length;
  const newNilai = grades.filter(g => g.id_siswa === childId && g.tanggal === today).length;
  const newNotes = notes.filter(n => n.id_siswa === childId && n.tanggal_raw === today).length;
  
  return newAbsen + newNilai + newNotes;
};
```

**B. Tampilkan badge di Sidebar untuk role ORANG_TUA:**
```jsx
// Di Sidebar.jsx, tambahkan badge merah di menu "Dashboard Anak"
<NavLink to="/orang-tua" ...>
  <link.icon className="h-5 w-5 mr-3" />
  {link.label}
  {notifCount > 0 && (
    <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
      {notifCount}
    </span>
  )}
</NavLink>
```

---

### [ADD-04] Filter Input Nilai/Absen Guru Berdasarkan Kelas yang Diajar

**File:** `src/pages/guru/RekapNilai.jsx`

**Masalah:**
Saat ini dropdown kelas menampilkan Kelas 1-6 untuk semua guru, padahal guru mapel hanya mengajar kelas tertentu.

**Yang Harus Dilakukan:**
```js
// Ambil data guru yang sedang login
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
const guruData = users.find(u => u.id === currentUser.id);
const kelasDiajar = guruData?.kelas_diajar || ["1","2","3","4","5","6"];

// Gunakan kelasDiajar untuk mengisi dropdown kelas
<select value={bulkKelas} onChange={e => setBulkKelas(e.target.value)}>
  {kelasDiajar.map(k => (
    <option key={k} value={k}>Kelas {k}</option>
  ))}
</select>
```

---

### [ADD-05] Tampilkan Nilai Per Mapel Secara Detail di Dashboard Orang Tua

**File:** `src/pages/orangtua/Dashboard.jsx`

**Deskripsi:**
Selain grafik bar, tambahkan tabel detail nilai yang bisa di-expand per mata pelajaran.

**Tampilan yang Diinginkan:**
```
┌─────────────────────────────────────────────────┐
│ 📚 Detail Nilai — Kelas 5 | Semester 1           │
├──────────────────┬──────┬──────┬──────┬──────────┤
│ Mata Pelajaran   │  PR  │  UH  │ UTS  │   UAS    │
├──────────────────┼──────┼──────┼──────┼──────────┤
│ Matematika       │  85  │  90  │  88  │    -     │
│ Bahasa Indonesia │  78  │  82  │  80  │    -     │
│ IPA              │  92  │  88  │   -  │    -     │
└──────────────────┴──────┴──────┴──────┴──────────┘
```

---

## 🟢 PRIORITAS 3 — FITUR PELENGKAP (NICE TO HAVE)

---

### [ADD-06] Halaman Profil Siswa di Dashboard Guru

**File Baru:** `src/pages/guru/ProfilSiswa.jsx`

**Deskripsi:**
Saat guru klik "Lihat Detail" pada daftar siswa di Dashboard Guru, tampilkan halaman profil lengkap siswa tersebut.

**Konten Halaman:**
- Biodata singkat siswa (nama, NIS, kelas)
- Grafik nilai semua mapel
- Riwayat absen
- Catatan perilaku yang pernah dikirim

**Route yang Perlu Ditambahkan di `App.jsx`:**
```jsx
<Route path="/guru/siswa/:studentId" element={<ProfilSiswa />} />
```

---

### [ADD-07] Halaman Rekap Kelas di Dashboard Guru

**File Baru:** `src/pages/guru/RekapKelas.jsx`

**Deskripsi:**
Tampilan rekap statistik seluruh siswa di kelas tertentu dalam satu tampilan.

**Konten:**
- Rata-rata nilai kelas per mapel
- Grafik perbandingan nilai antar siswa
- Daftar siswa dengan absen terbanyak (perlu perhatian)
- Export ke format tabel (visual saja, tidak perlu download nyata)

---

### [ADD-08] Halaman Pengumuman Khusus untuk Orang Tua

**File Baru:** `src/pages/orangtua/Pengumuman.jsx`

**Deskripsi:**
Halaman terpisah yang menampilkan semua pengumuman (sekolah + kelas) dalam satu tempat, lengkap dengan tanggal dan bisa di-filter.

**Route yang Perlu Ditambahkan di `App.jsx`:**
```jsx
<Route path="/orang-tua/pengumuman" element={<PengumumanOrangTua />} />
```

**Tambahkan link di Sidebar untuk role ORANG_TUA:**
```js
{ to: '/orang-tua/pengumuman', icon: Bell, label: 'Pengumuman' }
```

---

### [ADD-09] Improve Chat — Tambahkan Konteks Siswa

**File:** `src/pages/Chat.jsx`

**Masalah:**
Chat tidak menunjukkan konteks siswa yang sedang dibahas.

**Yang Harus Dilakukan:**
- Saat orang tua membuka chat, otomatis tampilkan nama anak di header chat
- Tambahkan "template pesan cepat" seperti:
  - "Saya ingin menanyakan perkembangan [nama anak]"
  - "Anak saya hari ini tidak masuk karena sakit"
- Tampilkan informasi singkat siswa di panel kanan chat (nilai terakhir, absen terakhir)

---

### [ADD-10] Halaman Login — Perbaiki UX Pemilihan User

**File:** `src/pages/Login.jsx`

**Masalah:**
Semua orang tua yang login akan masuk sebagai `Bapak/Ibu Andi` (U03) karena `users.find()` hanya ambil data orang tua pertama.

**Yang Harus Dilakukan:**
- Untuk role ORANG_TUA dan GURU, tampilkan dropdown "Pilih Akun" agar bisa mensimulasikan login sebagai user yang berbeda
- Contoh: Dropdown berisi "Bapak/Ibu Andi", "Bapak/Ibu Budi", dst.

```jsx
// Saat role ORANG_TUA dipilih, tampilkan selector
const orangTuaList = users.filter(u => u.role === 'ORANG_TUA');

<select onChange={e => setSelectedUserId(e.target.value)}>
  <option value="">Pilih Akun Orang Tua</option>
  {orangTuaList.map(u => (
    <option key={u.id} value={u.id}>{u.nama}</option>
  ))}
</select>
```

---

## 📁 RINGKASAN FILE YANG PERLU DIUBAH/DIBUAT

### File yang Diubah:
| No | File | Perubahan |
|----|------|-----------|
| 1 | `src/data/dummyData.js` | Tambah `kelas_diajar` di guru, perbaiki `id_orangtua` di siswa |
| 2 | `src/pages/Login.jsx` | Tambah dropdown pilih akun per role |
| 3 | `src/pages/orangtua/Dashboard.jsx` | Fix childId dinamis, baca localStorage, tambah timeline absen, tabel nilai detail |
| 4 | `src/pages/guru/RekapNilai.jsx` | Simpan nilai & absen ke localStorage, tambah tipe nilai, filter kelas by guru |
| 5 | `src/components/Sidebar.jsx` | Tambah badge notifikasi untuk orang tua |
| 6 | `src/components/Navbar.jsx` | Opsional: tambah ikon notifikasi |
| 7 | `src/App.jsx` | Tambah route baru jika ada halaman baru |
| 8 | `src/pages/Chat.jsx` | Tambah konteks siswa di chat |

### File Baru yang Perlu Dibuat:
| No | File | Fungsi |
|----|------|--------|
| 1 | `src/utils/notificationHelper.js` | Helper fungsi cek notif baru |
| 2 | `src/pages/guru/ProfilSiswa.jsx` | Detail profil siswa untuk guru |
| 3 | `src/pages/guru/RekapKelas.jsx` | Rekap statistik kelas |
| 4 | `src/pages/orangtua/Pengumuman.jsx` | Halaman pengumuman orang tua |

---

## ⚠️ CATATAN PENTING

1. **localStorage sebagai "database"** — Semua data dinamis (nilai baru, absen baru, catatan baru) wajib disimpan ke localStorage dengan key yang konsisten:
   - `simpatik_attendance` → data absen dari guru
   - `simpatik_grades` → data nilai dari guru
   - `simpatik_behavior_notes` → catatan perilaku
   - `simpatik_announcements` → pengumuman sekolah
   - `simpatik_class_announcements` → pengumuman kelas

2. **Urutan Pengerjaan yang Disarankan:**
   ```
   FIX-04 (dummyData) → ADD-10 (Login) → FIX-01 (childId) 
   → FIX-02 (absen sync) → FIX-03 (nilai sync) → FIX-04 (filter guru)
   → ADD-01 (timeline absen) → ADD-02 (tipe nilai) → ADD-03 (notif badge)
   → ADD-05 (tabel nilai detail) → sisanya opsional
   ```

3. **Testing Scenario untuk Demo:**
   - Login sebagai Guru → Input absen kelas 5 hari ini → Logout
   - Login sebagai Orang Tua (Bapak/Ibu Andi) → Dashboard harus langsung tampil absen tadi
   - Login sebagai Guru → Input nilai Matematika kelas 5 → Logout
   - Login sebagai Orang Tua → Grafik nilai harus update

---

*Dokumen ini dibuat sebagai panduan upgrade prototype SIMPATIK — Frontend Only Version*
*Versi: 1.0 | Tanggal: Juni 2026*
