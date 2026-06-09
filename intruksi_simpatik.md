INSTRUKSI PROYEK: SISTEM MONITORING PERKEMBANGAN AKADEMIK DAN KOMUNIKASI (SIMPATIK)
Single Source of Truth — Dokumen ini adalah acuan utama pengerjaan proyek.

Posisi Asisten: Senior Frontend Developer (React + Tailwind Expert).

1. Ringkasan Proyek & Role Pengguna
Membangun antarmuka (user interface) berbasis web untuk sistem monitoring akademik sekolah. Proyek ini murni berfokus pada frontend interaktif menggunakan data dummy JSON, tanpa integrasi backend sungguhan.

Peran Pengguna (3 Role):

Admin: Mengakses dashboard pengelolaan data master (Siswa, Guru, Kelas) dan membuat pengumuman sekolah.

Guru: Mengakses antarmuka untuk melakukan input data kehadiran, memasukkan rekap nilai, menulis catatan perkembangan, dan simulasi chat dengan orang tua.

Orang Tua: Mengakses dashboard (yang dioptimalkan untuk tampilan mobile) untuk memonitor grafik nilai, absensi, membaca catatan guru, dan simulasi chat.

2. Struktur Folder Proyek
Proyek ini menggunakan arsitektur berbasis komponen untuk mempercepat pembuatan UI tanpa perlu desain awal.

Plaintext
simpatik/
├── public/
├── src/
│   ├── assets/        # Gambar/Icon statis
│   ├── components/    # Komponen Reusable (Navbar, Sidebar, Table, Card)
│   ├── pages/         # Halaman utama (AdminDashboard, GuruDashboard, dll)
│   ├── data/          # File dummyData.js (berisi JSON untuk semua role)
│   ├── App.jsx        # Routing utama
│   └── main.jsx
├── tailwind.config.js # Konfigurasi styling
└── package.json
3. Stack Teknologi UI (Frontend Only)
Framework: React.js (menggunakan Vite untuk environment yang ringan dan proses build yang cepat).

Styling: Tailwind CSS (kelas utilitas mempercepat pengerjaan UI langsung di kodingan tanpa perlu mockup visual sebelumnya).

Routing: React Router DOM v6 (untuk simulasi navigasi antar halaman dan perpindahan role pengguna).

Icons & Charts: React Icons (Lucide/FontAwesome) dan Chart.js (untuk visualisasi grafik nilai/absensi).

Deployment: Vercel (untuk hosting hasil build frontend agar mudah diakses dan diuji coba melalui link public).

4. Workflow Operasional (Standard Pengembangan UI)
Local Development: Seluruh kode ditulis menggunakan VS Code dan dijalankan langsung di local environment Node.js. Proyek ini tidak menggunakan Docker untuk menyederhanakan proses pengembangan frontend.

Direct-to-Code: Proses desain visual dilewati. UI dibangun dan disesuaikan secara iteratif langsung menggunakan Tailwind CSS di browser.

Data Simulation: Menggunakan modul dummyData.js sebagai "sumber kebenaran" sementara untuk me-render tabel, daftar siswa, dan grafik.

5. Fitur Modul UI Utama
Simulasi Login & Role Switcher: Satu halaman awal yang memiliki tiga tombol masuk cepat (Login as Admin, Login as Guru, Login as Orang Tua) untuk memudahkan pengujian UI.

Admin Workspace: Tampilan tabel CRUD (Create, Read, Update, Delete) secara visual untuk mengelola data siswa dan kelas (tombol aksi ada, namun perubahannya hanya terjadi di state lokal React).

Mobile-First Monitoring (Orang Tua): Layout dashboard orang tua dirancang responsif, mengutamakan kenyamanan membaca di layar smartphone.

6. Struktur Data Dummy (JSON Schema)
JavaScript
// Contoh cuplikan struktur dummyData.js
export const users = [
  { id: "U01", nama: "Admin Sekolah", role: "ADMIN" },
  { id: "U02", nama: "Budi Guru", role: "GURU" },
  { id: "U03", nama: "Siti OrangTua", role: "ORANG_TUA" }
];

export const students = [
  { id: "S01", nis: "1011", nama: "Andi", kelas: "5A", id_orangtua: "U03" }
];

export const grades = [
  { id: "N01", id_siswa: "S01", mapel: "Matematika", nilai: 85, semester: 1 }
];
7. Timeline Pengembangan (Iterasi Frontend)
Tahap 1: Setup Vite + React, instalasi Tailwind CSS, dan penyusunan kerangka routing.

Tahap 2: Pembuatan komponen global (Sidebar, Navbar, Layout) dan penyusunan file dummyData.js.

Tahap 3: Koding halaman Admin (Dashboard & Master Data) dan Halaman Guru (Form Input & Tabel).

Tahap 4: Koding halaman Orang Tua dengan pendekatan Mobile Responsive dan integrasi Chart.js.

Tahap 5: Final Polish, memastikan navigasi antar role berjalan mulus, dan deployment ke Vercel.