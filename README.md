# SIMPATIK (Sistem Monitoring Perkembangan Akademik dan Komunikasi)

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white" alt="Chart.js" />
</p>

## 📌 Deskripsi Proyek

**SIMPATIK** adalah antarmuka (UI) web mutakhir yang dirancang khusus untuk memfasilitasi sekolah dalam melakukan monitoring pencapaian akademik secara *real-time* sekaligus menjembatani jalur komunikasi interaktif antara institusi pendidikan, tenaga pengajar, dan orang tua siswa.

Sistem ini menggunakan arsitektur *Role-Based Access Control* (RBAC) di sisi frontend untuk memberikan pengalaman visual yang dioptimalkan sesuai dengan kebutuhan spesifik masing-masing pengguna (Admin, Guru, dan Orang Tua).

## ✨ Fitur Utama

- **Role-Based Dashboard**
  - **Admin**: Manajemen data master (Guru dan Siswa) komprehensif dan sistem publikasi pengumuman sekolah terpusat.
  - **Guru**: Sistem *bulk entry* untuk absensi harian dan rekapitulasi nilai yang didesain untuk mempercepat alur kerja pengajar.
  - **Orang Tua**: Dashboard *monitoring* analitik progres belajar anak dengan visualisasi data yang mudah dipahami.

- **Integrated Communication (SIMPATIK Chat)**
  - Antarmuka perpesanan responsif dengan *split-pane layout* (ala WhatsApp Web) yang memfasilitasi komunikasi langsung antara Orang Tua dan Guru secara tertulis.

- **Data Analytics & Visualization**
  - Implementasi *Chart.js* untuk menampilkan kurva nilai dan persentase tingkat kehadiran siswa.

## 🚀 Teknologi yang Digunakan

Frontend proyek ini dibangun menggunakan *stack* JavaScript modern yang berfokus pada kecepatan dan *user experience*:
- **Core Library**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Asset / Library Tambahan**: [Lucide React](https://lucide.dev/) (Sistem Ikon) & [Chart.js](https://www.chartjs.org/) (Data Visualisasi)

## 🛠️ Panduan Instalasi (Lokal)

Untuk menjalankan environment simulasi ini di mesin Anda, pastikan [Node.js](https://nodejs.org/) telah terinstal.

1. **Kloning Repositori**
   ```bash
   git clone https://github.com/Sendyawldn/simpatik.git
   cd simpatik
   ```

2. **Instalasi Dependensi**
   ```bash
   npm install
   ```

3. **Jalankan Server Development**
   ```bash
   npm run dev
   ```

4. **Akses Aplikasi**
   Buka peramban (*browser*) web Anda pada URL lokal yang tertera di terminal (secara *default* adalah `http://localhost:5173`).

---

*© SIMPATIK - Solusi Digital Peningkatan Sinergi Pendidikan*
