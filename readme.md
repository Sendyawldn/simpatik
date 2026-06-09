# SIMPATIK (Sistem Monitoring Perkembangan Akademik dan Komunikasi)

Proyek ini adalah antarmuka (user interface) berbasis web untuk sistem monitoring akademik sekolah, dikembangkan menggunakan **React**, **Vite**, dan **Tailwind CSS**.

## Progres Pengembangan

### ✅ Tahap 1: Setup Proyek & Dependensi
- Inisialisasi React dengan Vite.
- Instalasi dan konfigurasi Tailwind CSS v3.
- Instalasi dependensi tambahan (`react-router-dom`, `react-icons`, `chart.js`, `react-chartjs-2`).
- Setup folder struktur (`src/components`, `src/pages`, `src/data`).

### ✅ Tahap 2: Struktur Data & Komponen Global
- Pembuatan `src/data/dummyData.js` untuk simulasi data (tanpa backend).
- Pembuatan komponen reusable: `Navbar.jsx`, `Sidebar.jsx`, dan `Layout.jsx`.

### ✅ Tahap 3: Halaman & Routing
- Setup React Router di `src/App.jsx`.
- Pembuatan Halaman Login multi-role.
- Pembuatan Dashboard Admin, Dashboard Guru, dan Dashboard Orang Tua terintegrasi dengan Chart.js.

### ✅ Tahap 4: Polishing & Testing
- Penyempurnaan tampilan UI menggunakan kelas utilitas Tailwind CSS.
- Verifikasi desain responsif untuk layout mobile terutama pada halaman Orang Tua.
- Implementasi navigasi sidebar dan layout multi-peran berjalan sukses.

## Cara Menjalankan (Local Development)

```bash
npm install
npm run dev
```
