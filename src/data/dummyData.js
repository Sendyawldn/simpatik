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
  { id: "U07", nama: "Bapak/Ibu Eko", role: "ORANG_TUA" },
  { id: "U08", nama: "Bapak/Ibu Faisal", role: "ORANG_TUA" },
  { id: "U09", nama: "Bapak/Ibu Gita", role: "ORANG_TUA" },
  { id: "U10", nama: "Bapak/Ibu Hendra", role: "ORANG_TUA" },
  { id: "U11", nama: "Bapak/Ibu Indah", role: "ORANG_TUA" },
  { id: "U12", nama: "Bapak/Ibu Joko", role: "ORANG_TUA" },
  { id: "U13", nama: "Bapak/Ibu Kiki", role: "ORANG_TUA" },
  { id: "U14", nama: "Bapak/Ibu Lestari", role: "ORANG_TUA" }
];

export const students = [
  { id: "S01", nis: "1011", nama: "Andi Wijaya", kelas: "1A", id_orangtua: "U03" },
  { id: "S02", nis: "1012", nama: "Budi Gunawan", kelas: "1B", id_orangtua: "U04" },
  { id: "S03", nis: "1013", nama: "Citra Lestari", kelas: "2A", id_orangtua: "U05" },
  { id: "S04", nis: "1014", nama: "Dewi Sartika", kelas: "2B", id_orangtua: "U06" },
  { id: "S05", nis: "1015", nama: "Eko Prasetyo", kelas: "3A", id_orangtua: "U07" },
  { id: "S06", nis: "1016", nama: "Faisal Rahman", kelas: "3A", id_orangtua: "U08" },
  { id: "S07", nis: "1017", nama: "Gita Gutawa", kelas: "4A", id_orangtua: "U09" },
  { id: "S08", nis: "1018", nama: "Hendra Saputra", kelas: "4A", id_orangtua: "U10" },
  { id: "S09", nis: "1019", nama: "Indah Permatasari", kelas: "5A", id_orangtua: "U11" },
  { id: "S10", nis: "1020", nama: "Joko Anwar", kelas: "5A", id_orangtua: "U12" },
  { id: "S11", nis: "1021", nama: "Kiki Fatmala", kelas: "6A", id_orangtua: "U13" },
  { id: "S12", nis: "1022", nama: "Lestari Ningsih", kelas: "6A", id_orangtua: "U14" },
];

export const mapelList = ["Matematika", "Bahasa Indonesia", "IPA", "IPS", "Bahasa Inggris", "PKn", "Seni Budaya", "PJOK"];

let gradeIdCounter = 1;
export const grades = [];

for (let k = 1; k <= 6; k++) {
  for (let sem = 1; sem <= 2; sem++) {
    mapelList.forEach(mapel => {
      const score = Math.floor(Math.random() * (98 - 75 + 1)) + 75;
      grades.push({
        id: `N${gradeIdCounter++}`,
        id_siswa: "S01",
        mapel: mapel,
        nilai: score,
        kelas: `${k}A`,
        semester: sem.toString(),
        tipe: Math.random() > 0.5 ? "UH" : "PR"
      });
    });
  }
}

students.slice(1).forEach(student => {
  ["Matematika", "Bahasa Indonesia", "IPA"].forEach(mapel => {
    const score = Math.floor(Math.random() * (95 - 70 + 1)) + 70;
    grades.push({
      id: `N${gradeIdCounter++}`,
      id_siswa: student.id,
      mapel: mapel,
      nilai: score,
      kelas: student.kelas,
      semester: "1",
      tipe: "UTS"
    });
  });
});

let attendanceIdCounter = 1;
export const attendance = [];

for (let k = 1; k <= 6; k++) {
  for (let sem = 1; sem <= 2; sem++) {
    for (let day = 1; day <= 10; day++) {
      const randomVal = Math.random();
      let status = "Hadir";
      let time = "06:45";
      if (randomVal > 0.95) status = "Alpa";
      else if (randomVal > 0.90) status = "Izin";
      else if (randomVal > 0.85) status = "Sakit";
      else {
        const mins = Math.floor(Math.random() * 45) + 30;
        const hr = mins >= 60 ? '07' : '06';
        const m = (mins % 60).toString().padStart(2, '0');
        time = `${hr}:${m}`;
      }

      const month = sem === 1 ? '10' : '03'; 
      const dayStr = day.toString().padStart(2, '0');

      attendance.push({
        id: `A${attendanceIdCounter++}`,
        id_siswa: "S01",
        tanggal: `202${k}-${month}-${dayStr}`,
        status: status,
        waktu: status === "Hadir" ? time : null,
        kelas: `${k}A`,
        semester: sem.toString()
      });
    }
  }
}

students.slice(1).forEach(student => {
  const isHadir = Math.random() > 0.1;
  let time = null;
  if (isHadir) {
    const mins = Math.floor(Math.random() * 45) + 30;
    const hr = mins >= 60 ? '07' : '06';
    const m = (mins % 60).toString().padStart(2, '0');
    time = `${hr}:${m}`;
  }
  attendance.push({
    id: `A${attendanceIdCounter++}`,
    id_siswa: student.id,
    tanggal: "2026-10-01",
    status: isHadir ? "Hadir" : "Sakit",
    waktu: time,
    kelas: student.kelas,
    semester: "1"
  });
});

export const announcements = [
  { id: "P01", judul: "Libur Akhir Semester Ganjil", tanggal: "2026-12-15", isi: "Diberitahukan kepada seluruh siswa dan wali murid, libur semester ganjil akan dimulai pada tanggal 18 Desember 2026 hingga 2 Januari 2027. Harap menggunakan waktu liburan dengan kegiatan positif." },
  { id: "P02", judul: "Rapat Wali Murid", tanggal: "2026-11-20", isi: "Mengundang Bapak/Ibu wali murid kelas 5 untuk hadir dalam rapat pengambilan rapor sisipan yang akan diselenggarakan pada hari Jumat, 24 November 2026 di aula sekolah." },
  { id: "P03", judul: "Kegiatan Ekstrakurikuler Wajib", tanggal: "2026-10-10", isi: "Mengingatkan kembali bahwa kegiatan ekstrakurikuler Pramuka wajib diikuti oleh seluruh siswa kelas 4 hingga kelas 6 setiap hari Sabtu pukul 08.00 - 10.00 WIB." },
  { id: "P04", judul: "Lomba Cerdas Cermat Tingkat Kota", tanggal: "2026-09-05", isi: "Sekolah kita akan berpartisipasi dalam Lomba Cerdas Cermat tingkat kota bulan depan. Seleksi tingkat sekolah akan dilaksanakan minggu ini." },
];

export const classAnnouncements = [
  { id: "CP01", judul: "Pembayaran Uang Kas Kelas", tanggal: "2026-10-15", isi: "Mengingatkan kembali kepada Bapak/Ibu wali murid kelas 5 untuk melunasi iuran uang kas bulan Oktober sebesar Rp 20.000 paling lambat hari Jumat minggu ini.", guru: "Pak Budi Santoso" },
  { id: "CP02", judul: "Membawa Alat Praktek Menggambar", tanggal: "2026-10-18", isi: "Mohon diingatkan kepada putra/putrinya untuk membawa buku gambar A3, krayon, dan pensil warna untuk tugas praktek Seni Budaya besok pagi.", guru: "Pak Budi Santoso" }
];

export const messages = [
  { id: "M01", pengirim: "U02", penerima: "U03", tanggal: "2026-10-05 09:30", isi: "Selamat pagi Bapak/Ibu. Andi hari ini sangat aktif di kelas, terutama saat pelajaran Matematika." },
  { id: "M02", pengirim: "U03", penerima: "U02", tanggal: "2026-10-05 10:15", isi: "Selamat pagi Pak Budi. Syukurlah, terima kasih atas bimbingannya selalu." },
  { id: "M03", pengirim: "U02", penerima: "U03", tanggal: "2026-10-05 10:20", isi: "Sama-sama Bapak/Ibu. Mohon terus didukung belajar di rumahnya ya." }
];

export const behaviorNotes = [
  {
    id: "B01",
    id_siswa: "S01",
    tanggal: "15 Oktober 2026",
    waktu: "10:30",
    catatan: "Andi hari ini sangat antusias saat pelajaran IPA. Ia berhasil memimpin kelompoknya untuk menyelesaikan tugas praktek dengan nilai sempurna. Namun, mohon tetap dinasihati agar tidak terlalu sering mengobrol dengan teman sebangkunya saat sedang menyimak penjelasan.",
    guru: "Bapak Budi Santoso"
  },
  {
    id: "B02",
    id_siswa: "S02",
    tanggal: "14 Oktober 2026",
    waktu: "13:15",
    catatan: "Budi menunjukkan kemajuan yang sangat pesat dalam kedisiplinan mengumpulkan tugas tepat waktu minggu ini. Tolong pertahankan semangat belajarnya di rumah ya, Bapak/Ibu.",
    guru: "Ibu Siti Aminah"
  },
  {
    id: "B03",
    id_siswa: "S03",
    tanggal: "10 Oktober 2026",
    waktu: "09:00",
    catatan: "Citra hari ini terlihat sedikit kurang sehat dan tertidur beberapa kali saat pelajaran berlangsung. Saya sudah mengarahkannya ke UKS sementara. Mohon dipantau jam tidurnya di rumah.",
    guru: "Bapak Budi Santoso"
  }
];

export const bukuPenghubungData = [
  { id: "BP01", id_siswa: "S01", pengirim: "Guru", nama_pengirim: "Bapak Budi Santoso", tanggal: "2026-10-15 09:00", isi: "Andi hari ini lupa membawa krayon untuk pelajaran menggambar. Mohon diingatkan besok ya Pak/Bu." },
  { id: "BP02", id_siswa: "S01", pengirim: "OrangTua", nama_pengirim: "Bapak/Ibu Andi", tanggal: "2026-10-15 09:30", isi: "Baik Pak Budi, maaf sebelumnya. Akan kami siapkan nanti malam." },
];

export const characterStats = [
  { id_siswa: "S01", kedisiplinan: 4, kebersihan: 5, sikap: 4 },
  { id_siswa: "S02", kedisiplinan: 3, kebersihan: 4, sikap: 5 },
];
