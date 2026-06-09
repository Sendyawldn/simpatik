export const users = [
  { id: "U01", nama: "Admin Sekolah", role: "ADMIN" },
  { id: "U02", nama: "Budi Guru", role: "GURU" },
  { id: "U03", nama: "Siti OrangTua", role: "ORANG_TUA" }
];

export const students = [
  { id: "S01", nis: "1011", nama: "Andi", kelas: "5A", id_orangtua: "U03" },
  { id: "S02", nis: "1012", nama: "Budi", kelas: "5A", id_orangtua: "U04" },
  { id: "S03", nis: "1013", nama: "Citra", kelas: "5B", id_orangtua: "U05" }
];

export const grades = [
  { id: "N01", id_siswa: "S01", mapel: "Matematika", nilai: 85, semester: 1 },
  { id: "N02", id_siswa: "S01", mapel: "Bahasa Indonesia", nilai: 90, semester: 1 },
  { id: "N03", id_siswa: "S01", mapel: "IPA", nilai: 88, semester: 1 },
];

export const attendance = [
  { id: "A01", id_siswa: "S01", tanggal: "2023-10-01", status: "Hadir" },
  { id: "A02", id_siswa: "S01", tanggal: "2023-10-02", status: "Hadir" },
  { id: "A03", id_siswa: "S01", tanggal: "2023-10-03", status: "Sakit" },
];

export const announcements = [
  { id: "P01", judul: "Libur Semester", tanggal: "2023-12-15", isi: "Libur semester ganjil dimulai tanggal 18 Desember 2023." }
];

export const messages = [
  { id: "M01", pengirim: "U02", penerima: "U03", tanggal: "2023-10-05", isi: "Andi hari ini sangat aktif di kelas." },
  { id: "M02", pengirim: "U03", penerima: "U02", tanggal: "2023-10-05", isi: "Terima kasih infonya, Pak Budi." }
];
