# INSTRUKSI UPGRADE & PENAMBAHAN FITUR SIMPATIK

> Dokumen ini adalah panduan teknis untuk memperbaiki dan melengkapi prototype SIMPATIK.
> Semua data menggunakan **dummy data statis** dari `dummyData.js` — tidak ada integrasi backend maupun localStorage sync.
> Tujuan: Tampilan UI yang lengkap dan realistis untuk keperluan screenshot/dokumentasi.

---

## 📋 DAFTAR PEKERJAAN (Prioritas Tinggi ke Rendah)

---

## 🔴 PRIORITAS 1 — PERBAIKAN KRITIS

---

### [FIX-01] Perbaiki Hardcode `childId` di Dashboard Orang Tua

**File:** `src/pages/orangtua/Dashboard.jsx`

**Masalah:**

```js
// SEKARANG — SALAH, selalu tampil data Andi walau login sebagai orang tua siapapun
const childId = "S01";
const childName = "Andi Wijaya";
```

**Yang Harus Dilakukan:**

- Ambil data `currentUser` dari `localStorage` (data login)
- Cari siswa yang `id_orangtua === currentUser.id` dari array `students` di `dummyData.js`
- Jika orang tua punya lebih dari 1 anak, tampilkan dropdown selector anak

**Contoh Logika:**

```js
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};

// Cari semua anak dari orang tua ini berdasarkan dummy data
const myChildren = students.filter((s) => s.id_orangtua === currentUser.id);

// State untuk memilih anak jika lebih dari 1
const [selectedChildId, setSelectedChildId] = useState(
  myChildren[0]?.id || null,
);
const selectedChild = myChildren.find((s) => s.id === selectedChildId);
```

---

### [FIX-02] Perbaiki & Lengkapi Data Relasi di `dummyData.js`

**File:** `src/data/dummyData.js`

**Masalah:**

- Beberapa siswa punya `id_orangtua` yang tidak terdaftar di `users[]`
- Guru tidak punya field `kelas_diajar`
- Data nilai dan absen hanya ada untuk siswa S01 (Andi), siswa lain datanya sangat sedikit

**Yang Harus Dilakukan:**

**A. Lengkapi data `users` — tambah field `kelas_diajar` untuk guru:**

```js
export const users = [
  { id: "U01", nama: "Admin Sekolah", role: "ADMIN" },
  {
    id: "U02",
    nama: "Budi Santoso",
    role: "GURU",
    mapel: "Matematika",
    kelas_diajar: ["4", "5", "6"],
  },
  {
    id: "U02B",
    nama: "Siti Aminah",
    role: "GURU",
    mapel: "Bahasa Indonesia",
    kelas_diajar: ["1", "2", "3", "4", "5", "6"],
  },
  {
    id: "U02C",
    nama: "Ahmad Dahlan",
    role: "GURU",
    mapel: "IPA",
    kelas_diajar: ["4", "5", "6"],
  },
  {
    id: "U02D",
    nama: "Dewi Rahayu",
    role: "GURU",
    mapel: "PJOK",
    kelas_diajar: ["1", "2", "3", "4", "5", "6"],
  },
  { id: "U03", nama: "Bapak/Ibu Andi", role: "ORANG_TUA" },
  { id: "U04", nama: "Bapak/Ibu Budi", role: "ORANG_TUA" },
  { id: "U05", nama: "Bapak/Ibu Citra", role: "ORANG_TUA" },
  { id: "U06", nama: "Bapak/Ibu Dewi", role: "ORANG_TUA" },
  { id: "U07", nama: "Bapak/Ibu Eko", role: "ORANG_TUA" },
  { id: "U08", nama: "Bapak/Ibu Faisal", role: "ORANG_TUA" },
  { id: "U09", nama: "Bapak/Ibu Gita", role: "ORANG_TUA" },
  { id: "U10", nama: "Bapak/Ibu Hendra", role: "ORANG_TUA" },
  { id: "U11", nama: "Bapak/Ibu Indah", role: "ORANG_TUA" },
  { id: "U12", nama: "Bapak/Ibu Joko", role: "ORANG_TUA" },
];
```

**B. Pastikan semua siswa punya `id_orangtua` yang valid:**

```js
export const students = [
  {
    id: "S01",
    nis: "1011",
    nama: "Andi Wijaya",
    kelas: "5",
    id_orangtua: "U03",
  },
  {
    id: "S02",
    nis: "1012",
    nama: "Budi Gunawan",
    kelas: "5",
    id_orangtua: "U04",
  },
  {
    id: "S03",
    nis: "1013",
    nama: "Citra Lestari",
    kelas: "4",
    id_orangtua: "U05",
  },
  {
    id: "S04",
    nis: "1014",
    nama: "Dewi Sartika",
    kelas: "4",
    id_orangtua: "U06",
  },
  {
    id: "S05",
    nis: "1015",
    nama: "Eko Prasetyo",
    kelas: "3",
    id_orangtua: "U07",
  },
  {
    id: "S06",
    nis: "1016",
    nama: "Faisal Rahman",
    kelas: "3",
    id_orangtua: "U08",
  },
  {
    id: "S07",
    nis: "1017",
    nama: "Gita Gutawa",
    kelas: "2",
    id_orangtua: "U09",
  },
  {
    id: "S08",
    nis: "1018",
    nama: "Hendra Saputra",
    kelas: "2",
    id_orangtua: "U10",
  },
  {
    id: "S09",
    nis: "1019",
    nama: "Indah Permatasari",
    kelas: "1",
    id_orangtua: "U11",
  },
  {
    id: "S10",
    nis: "1020",
    nama: "Joko Anwar",
    kelas: "1",
    id_orangtua: "U12",
  },
];
```

**C. Perluas data dummy nilai dan absen untuk semua siswa:**

- Sekarang nilai dan absen lengkap hanya ada untuk S01
- Buat loop yang menghasilkan data lengkap (semua mapel, 2 semester) untuk minimal S01 s/d S04
- Sisanya cukup beberapa entri agar tidak terlalu berat

**D. Tambahkan field `tipe` di data `grades`:**

```js
// Tambah field tipe di setiap entri grades
// Tipe: "PR" | "UH" | "UTS" | "UAS"
{ id: "N01", id_siswa: "S01", mapel: "Matematika", nilai: 85,
  kelas: "5", semester: "1", tipe: "UH" }
```

---

### [FIX-03] Perbaiki Login — Tambah Dropdown Pilih Akun Per Role

**File:** `src/pages/Login.jsx`

**Masalah:**
Saat ini `users.find()` hanya mengambil user pertama yang cocok dengan role, sehingga semua orang tua selalu login sebagai U03, dan semua guru selalu login sebagai U02.

**Yang Harus Dilakukan:**

- Setelah role dipilih, tampilkan dropdown "Pilih Akun" yang berisi daftar user sesuai role
- Saat form disubmit, simpan user yang dipilih ke `localStorage`

**Contoh Implementasi:**

```jsx
const [selectedUserId, setSelectedUserId] = useState("");

// Daftar user sesuai role yang dipilih
const userList = users.filter((u) => u.role === selectedRole);

// Tampilkan dropdown di dalam form
<div>
  <label className="block text-sm font-medium text-gray-700">Pilih Akun</label>
  <select
    required
    value={selectedUserId}
    onChange={(e) => setSelectedUserId(e.target.value)}
    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 sm:text-sm"
  >
    <option value="">-- Pilih Akun --</option>
    {userList.map((u) => (
      <option key={u.id} value={u.id}>
        {u.nama} {u.mapel ? `(${u.mapel})` : ""}
      </option>
    ))}
  </select>
</div>;

// Update handleLogin untuk pakai selectedUserId
const handleLogin = (e) => {
  e.preventDefault();
  const user = users.find((u) => u.id === selectedUserId);
  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    if (user.role === "ADMIN") navigate("/admin");
    if (user.role === "GURU") navigate("/guru");
    if (user.role === "ORANG_TUA") navigate("/orang-tua");
  }
};
```

---

### [FIX-04] Filter Kelas Input Guru Berdasarkan `kelas_diajar`

**File:** `src/pages/guru/RekapNilai.jsx`

**Masalah:**
Dropdown kelas selalu menampilkan Kelas 1-6 untuk semua guru, padahal guru mapel hanya mengajar kelas tertentu. Tidak realistis untuk tampilan.

**Yang Harus Dilakukan:**

```js
// Ambil data guru yang sedang login
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
const guruData = users.find((u) => u.id === currentUser.id);
const kelasDiajar = guruData?.kelas_diajar || ["1", "2", "3", "4", "5", "6"];

// Gunakan kelasDiajar untuk dropdown kelas
<select value={bulkKelas} onChange={(e) => setBulkKelas(e.target.value)}>
  {kelasDiajar.map((k) => (
    <option key={k} value={k}>
      Kelas {k}
    </option>
  ))}
</select>;
```

---

## 🟡 PRIORITAS 2 — PENAMBAHAN FITUR TAMPILAN

---

### [ADD-01] Tambahkan Timeline Absen Harian di Dashboard Orang Tua

**File:** `src/pages/orangtua/Dashboard.jsx`

**Deskripsi:**
Tambahkan section tabel di bawah grafik kehadiran yang menampilkan riwayat absen per hari secara kronologis. Data diambil langsung dari `dummyData.js`.

**Tampilan yang Diinginkan:**

```
┌──────────────────────────────────────────┐
│ 📅 Riwayat Kehadiran Harian              │
├─────────────┬───────────┬────────────────┤
│ Tanggal     │ Hari      │ Status         │
├─────────────┼───────────┼────────────────┤
│ 10 Okt 2023 │ Selasa    │ 🟢 Hadir      │
│ 09 Okt 2023 │ Senin     │ 🟡 Sakit      │
│ 06 Okt 2023 │ Jumat     │ 🟢 Hadir      │
└─────────────┴───────────┴────────────────┘
```

**Yang Harus Dilakukan:**

- Buat tabel di bawah grafik kehadiran
- Filter dari `attendance` di `dummyData.js` berdasarkan `childId` aktif
- Sort berdasarkan tanggal terbaru di atas
- Tampilkan badge warna sesuai status:
  - Hadir → badge hijau
  - Sakit → badge kuning
  - Izin → badge biru
  - Alpa → badge merah
- Tampilkan 7 data terbaru, tambahkan tombol "Lihat Semua" untuk expand

---

### [ADD-02] Tambahkan Tabel Detail Nilai Per Mapel di Dashboard Orang Tua

**File:** `src/pages/orangtua/Dashboard.jsx`

**Deskripsi:**
Selain grafik bar, tambahkan tabel detail yang menampilkan nilai per mata pelajaran beserta tipenya. Data dari `dummyData.js`.

**Tampilan yang Diinginkan:**

```
┌───────────────────────────────────────────────────┐
│ 📚 Detail Nilai — Kelas 5 | Semester 1             │
├──────────────────┬──────┬──────┬──────┬───────────┤
│ Mata Pelajaran   │  PR  │  UH  │ UTS  │    UAS    │
├──────────────────┼──────┼──────┼──────┼───────────┤
│ Matematika       │  85  │  90  │  88  │     -     │
│ Bahasa Indonesia │  78  │  82  │  80  │     -     │
│ IPA              │  92  │  88  │   -  │     -     │
└──────────────────┴──────┴──────┴──────┴───────────┘
```

**Yang Harus Dilakukan:**

- Buat tabel di bawah grafik nilai
- Group data `grades` berdasarkan `mapel`
- Pivot kolom berdasarkan `tipe` (PR, UH, UTS, UAS)
- Tampilkan `-` jika tidak ada nilai untuk tipe tersebut
- Beri warna merah jika nilai di bawah 75

---

### [ADD-03] Tambahkan Badge Notifikasi Statis di Sidebar

**File:** `src/components/Sidebar.jsx`

**Deskripsi:**
Tampilkan angka badge merah kecil di menu sidebar orang tua sebagai indikator visual bahwa ada informasi baru. Angka bersifat **statis dari dummy data**.

**Yang Harus Dilakukan:**

```jsx
// Hitung jumlah catatan perilaku terbaru untuk anak (dari dummyData)
// Tampilkan sebagai badge di menu "Dashboard Anak"

<NavLink to="/orang-tua" ...>
  <link.icon className="h-5 w-5 mr-3" />
  {link.label}
  {/* Badge statis — angka dari dummy data */}
  <span className="ml-auto bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
    3
  </span>
</NavLink>
```

- Badge hanya tampil di role ORANG_TUA
- Angkanya bisa statis (misal: 2 atau 3) karena hanya untuk tampilan

---

### [ADD-04] Tambahkan Halaman Pengumuman Khusus Orang Tua

**File Baru:** `src/pages/orangtua/Pengumuman.jsx`

**Deskripsi:**
Halaman terpisah yang menampilkan semua pengumuman (sekolah + kelas) dalam satu tempat, dengan filter dan tampilan yang lebih lengkap dari yang ada di dashboard.

**Konten Halaman:**

- Tab: "Pengumuman Sekolah" dan "Pengumuman Kelas"
- Setiap card pengumuman tampil lengkap dengan judul, tanggal, isi, dan pengirim
- Filter berdasarkan bulan (statis dari dummy data)

**Route yang Perlu Ditambahkan di `App.jsx`:**

```jsx
<Route path="/orang-tua/pengumuman" element={<PengumumanOrangTua />} />
```

**Link di Sidebar untuk role ORANG_TUA:**

```js
{ to: '/orang-tua/pengumuman', icon: Bell, label: 'Pengumuman' }
```

---

### [ADD-05] Tambahkan Halaman Profil Siswa untuk Guru

**File Baru:** `src/pages/guru/ProfilSiswa.jsx`

**Deskripsi:**
Saat guru klik "Lihat Detail" pada daftar siswa di Dashboard Guru, tampilkan halaman profil lengkap siswa tersebut. Data dari `dummyData.js`.

**Konten Halaman:**

- Card biodata singkat (nama, NIS, kelas, nama orang tua)
- Grafik nilai semua mapel (Bar Chart dari Chart.js)
- Tabel riwayat absen
- Riwayat catatan perilaku yang pernah dikirim untuk siswa ini

**Route yang Perlu Ditambahkan di `App.jsx`:**

```jsx
<Route path="/guru/siswa/:studentId" element={<ProfilSiswa />} />
```

**Update tombol "Lihat Detail" di `GuruDashboard.jsx`:**

```jsx
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

// Ganti tombol yang ada
<button
  onClick={() => navigate(`/guru/siswa/${student.id}`)}
  className="text-sm text-blue-600 font-medium hover:text-blue-800"
>
  Lihat Detail
</button>;
```

---

### [ADD-06] Improve Chat — Tambahkan Konteks Siswa & Pesan Cepat

**File:** `src/pages/Chat.jsx`

**Deskripsi:**
Tambahkan elemen visual yang membuat chat terasa lebih kontekstual dan realistis.

**Yang Harus Dilakukan:**

**A. Tampilkan nama anak di header chat (untuk orang tua):**

```jsx
// Di header chat kanan, tambahkan subjudul
<div className="ml-4">
  <h3 className="text-md font-semibold text-gray-800">{activeContact?.nama}</h3>
  {currentUser.role === "ORANG_TUA" && (
    <p className="text-xs text-gray-500">Re: {childName}</p>
  )}
</div>
```

**B. Tambahkan tombol "Pesan Cepat" di atas input:**

```jsx
// Tombol template pesan — klik langsung isi input
const quickMessages = [
  "Anak saya hari ini tidak masuk karena sakit",
  "Saya ingin menanyakan perkembangan belajar anak saya",
  "Terima kasih atas informasinya, Pak/Bu Guru",
];

<div className="flex gap-2 px-3 pt-2 flex-wrap">
  {quickMessages.map((msg, i) => (
    <button
      key={i}
      onClick={() => setNewMessage(msg)}
      className="text-xs bg-white border border-gray-300 rounded-full px-3 py-1 text-gray-600 hover:bg-gray-50"
    >
      {msg}
    </button>
  ))}
</div>;
```

---

## 📁 RINGKASAN FILE YANG PERLU DIUBAH / DIBUAT

### File yang Diubah:

| No  | File                               | Perubahan                                                                                                                                                |
| --- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `src/data/dummyData.js`            | Tambah `kelas_diajar` di guru, perbaiki `id_orangtua` di semua siswa, tambah field `tipe` di grades, perluas data nilai & absen untuk lebih banyak siswa |
| 2   | `src/pages/Login.jsx`              | Tambah dropdown pilih akun per role                                                                                                                      |
| 3   | `src/pages/orangtua/Dashboard.jsx` | Fix `childId` dinamis dari dummy data, tambah timeline absen harian, tambah tabel detail nilai                                                           |
| 4   | `src/pages/guru/RekapNilai.jsx`    | Filter dropdown kelas berdasarkan `kelas_diajar` guru yang login                                                                                         |
| 5   | `src/components/Sidebar.jsx`       | Tambah badge notifikasi statis untuk role orang tua                                                                                                      |
| 6   | `src/pages/Chat.jsx`               | Tambah konteks siswa di header, tambah tombol pesan cepat                                                                                                |
| 7   | `src/App.jsx`                      | Tambah route untuk halaman baru                                                                                                                          |

### File Baru yang Perlu Dibuat:

| No  | File                                | Fungsi                                    |
| --- | ----------------------------------- | ----------------------------------------- |
| 1   | `src/pages/guru/ProfilSiswa.jsx`    | Halaman detail profil siswa untuk guru    |
| 2   | `src/pages/orangtua/Pengumuman.jsx` | Halaman daftar pengumuman untuk orang tua |

---

## ⚠️ URUTAN PENGERJAAN YANG DISARANKAN

```
1. FIX-02 → Perbaiki dummyData.js dulu (fondasi semua fitur lain)
2. FIX-03 → Perbaiki Login agar bisa ganti akun
3. FIX-01 → Fix childId dinamis di dashboard orang tua
4. FIX-04 → Filter kelas guru di RekapNilai
5. ADD-01 → Timeline absen harian di dashboard orang tua
6. ADD-02 → Tabel detail nilai di dashboard orang tua
7. ADD-03 → Badge notifikasi di sidebar
8. ADD-05 → Halaman profil siswa (klik dari dashboard guru)
9. ADD-04 → Halaman pengumuman orang tua
10. ADD-06 → Improve chat (opsional, kerjakan terakhir)
```

---

## 📝 CATATAN

- Semua data bersumber dari `dummyData.js` — tidak ada fetch API, tidak ada localStorage sync antar role
- `localStorage` hanya digunakan untuk menyimpan **data sesi login** (`currentUser`) agar navigasi antar halaman tetap tahu siapa yang sedang login
- Fokus utama adalah **kelengkapan dan keakuratan tampilan UI** bukan alur data yang berfungsi penuh

---

_Dokumen ini dibuat sebagai panduan upgrade prototype SIMPATIK — Frontend Only / Dummy Data Version_
_Versi: 2.0 | Tanggal: Juni 2026_
