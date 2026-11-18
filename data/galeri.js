/*
  data/galeri.js — dua belas pelat ilustrasi.

  Field:
    id, judul, deskripsi, lokasi, kategori
    gambar          versi WebP untuk lightbox dan kartu
    gambarCadangan  SVG asli; dipakai bila WebP gagal dimuat
    kredit          selalu "Ilustrasi: Bumi Bawah" untuk pelat buatan sendiri
    tanggal         tanggal terbit ISO, dipakai untuk urutan

  Contoh entri:
    { id: 99, judul: 'Contoh', deskripsi: '...', lokasi: '...', kategori: 'Tanah',
      gambar: 'assets/img/galeri/contoh.webp',
      gambarCadangan: 'assets/img/galeri/contoh.svg',
      kredit: 'Ilustrasi: Bumi Bawah', tanggal: '2026-01-01' }

  Kategori yang dipakai: Hutan, Tanah, Akar, Gua, Air, Batuan, Manusia.
  Gambar bukan foto lokasi. Jangan menukar kredit menjadi nama fotografer.
*/
window.DATA_GALERI = [
  {
    "id": 1,
    "judul": "Hutan hujan setelah hujan",
    "deskripsi": "Lantai hutan yang basah, tempat serasah mulai diuraikan.",
    "lokasi": "Taman Nasional Gunung Leuser, Aceh",
    "kategori": "Hutan",
    "gambar": "assets/img/galeri/hutan-leuser.webp",
    "gambarCadangan": "assets/img/galeri/hutan-leuser.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-01"
  },
  {
    "id": 2,
    "judul": "Profil tanah di tebing",
    "deskripsi": "Perbedaan warna dan tekstur lapisan tanah terlihat jelas di dinding tebing.",
    "lokasi": "Devon, Inggris",
    "kategori": "Tanah",
    "gambar": "assets/img/galeri/profil-tanah.webp",
    "gambarCadangan": "assets/img/galeri/profil-tanah.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-03"
  },
  {
    "id": 3,
    "judul": "Akar di celah batu",
    "deskripsi": "Akar menembus retakan batuan untuk mencari air.",
    "lokasi": "Echo Caves, Afrika Selatan",
    "kategori": "Akar",
    "gambar": "assets/img/galeri/akar-batu.webp",
    "gambarCadangan": "assets/img/galeri/akar-batu.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-05"
  },
  {
    "id": 4,
    "judul": "Gua kapur dan stalaktit",
    "deskripsi": "Rongga larutan di batuan gamping, dengan endapan kalsium yang tumbuh lambat.",
    "lokasi": "Gunung Mulu, Malaysia",
    "kategori": "Gua",
    "gambar": "assets/img/galeri/gua-kapur.webp",
    "gambarCadangan": "assets/img/galeri/gua-kapur.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-07"
  },
  {
    "id": 5,
    "judul": "Air tanah yang muncul",
    "deskripsi": "Mata air keluar dari rekahan batuan di kaki lereng.",
    "lokasi": "Gunungkidul, Yogyakarta",
    "kategori": "Air",
    "gambar": "assets/img/galeri/mata-air.webp",
    "gambarCadangan": "assets/img/galeri/mata-air.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-09"
  },
  {
    "id": 6,
    "judul": "Lapisan batuan terlipat",
    "deskripsi": "Lipatan batuan sedimen merekam tekanan yang bekerja dalam waktu sangat lama.",
    "lokasi": "Grand Canyon, Arizona",
    "kategori": "Batuan",
    "gambar": "assets/img/galeri/batuan-terlipat.webp",
    "gambarCadangan": "assets/img/galeri/batuan-terlipat.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-11"
  },
  {
    "id": 7,
    "judul": "Tambang emas dalam",
    "deskripsi": "Infrastruktur tambang yang mengikuti lapisan bijih sampai beberapa kilometer.",
    "lokasi": "Witwatersrand, Afrika Selatan",
    "kategori": "Batuan",
    "gambar": "assets/img/galeri/tambang-emas.webp",
    "gambarCadangan": "assets/img/galeri/tambang-emas.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-13"
  },
  {
    "id": 8,
    "judul": "Lava yang mendingin",
    "deskripsi": "Bekas aliran lava menjadi batuan baru di permukaan kerak.",
    "lokasi": "Islandia",
    "kategori": "Batuan",
    "gambar": "assets/img/galeri/lava.webp",
    "gambarCadangan": "assets/img/galeri/lava.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-15"
  },
  {
    "id": 9,
    "judul": "Tanah kering dan retak",
    "deskripsi": "Retakan di permukaan tanah lempung saat kelembapan turun.",
    "lokasi": "Sonora, Meksiko",
    "kategori": "Tanah",
    "gambar": "assets/img/galeri/tanah-kering.webp",
    "gambarCadangan": "assets/img/galeri/tanah-kering.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-17"
  },
  {
    "id": 10,
    "judul": "Tebing kapur di pantai",
    "deskripsi": "Batuan sedimen yang terangkat dan terkikis ombak.",
    "lokasi": "Nusa Penida, Bali",
    "kategori": "Batuan",
    "gambar": "assets/img/galeri/tebing-kapur.webp",
    "gambarCadangan": "assets/img/galeri/tebing-kapur.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-19"
  },
  {
    "id": 11,
    "judul": "Hutan bakau dan lumpur",
    "deskripsi": "Akar bakau menahan lumpur, tempat karbon dan sedimentasi bekerja.",
    "lokasi": "Delta Mahakam, Kalimantan Timur",
    "kategori": "Hutan",
    "gambar": "assets/img/galeri/bakau.webp",
    "gambarCadangan": "assets/img/galeri/bakau.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-21"
  },
  {
    "id": 12,
    "judul": "Situs pengeboran Kola",
    "deskripsi": "Sisa fasilitas pengeboran lubang terdalam buatan manusia.",
    "lokasi": "Semenanjung Kola, Rusia",
    "kategori": "Manusia",
    "gambar": "assets/img/galeri/kola.webp",
    "gambarCadangan": "assets/img/galeri/kola.svg",
    "kredit": "Ilustrasi: Bumi Bawah",
    "tanggal": "2026-09-23"
  }
];
