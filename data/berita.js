/*
  data/berita.js — delapan kabar bumi yang dikurasi manual.

  Field:
    id, tanggal     tanggal terbit sumber (ISO), bukan tanggal salin
    judul           judul ringkas yang ditulis sendiri, bukan judul asli
    sumber          { nama, url } — tautan ke artikel asli
    lapisan         id lapisan terkait (1–6), untuk penanda warna
    ringkasan       2–3 kalimat rangkuman sendiri; jangan menyalin teks sumber
    penting         satu kalimat: kenapa ini penting

  Contoh entri:
    { id: 99, tanggal: '2026-01-01', judul: '...',
      sumber: { nama: 'Nama media', url: 'https://...' }, lapisan: 2,
      ringkasan: '...', penting: '...' }

  Tidak ada foto berita di situs ini. Tautan membuka sumber aslinya.
*/
window.DATA_BERITA = [
  {
    id: 1,
    tanggal: '2024-01-24',
    judul: 'Air tanah di 1.693 akuifer: turun, dan di banyak tempat makin cepat',
    sumber: { nama: 'UC Santa Barbara — The Current', url: 'https://news.ucsb.edu/2024/021303/global-groundwater-depletion-accelerating-not-inevitable' },
    lapisan: 3,
    ringkasan: 'Penelitian di jurnal Nature memakai jutaan pengukuran dari 170.000 sumur. Air tanah menurun di 71% akuifer yang diperiksa, dan penurunannya bertambah cepat di banyak tempat sejak 2000. Beberapa wilayah menunjukkan pemulihan setelah pengambilan air dibatasi.',
    penting: 'Air tanah adalah sumber minum dan irigasi; penurunannya juga memicu amblesan tanah.'
  },
  {
    id: 2,
    tanggal: '2024-11-20',
    judul: 'Cadangan air tawar di daratan turun sekitar 1.200 km³',
    sumber: { nama: 'NASA JPL — GRACE Tellus', url: 'https://grace.jpl.nasa.gov/news/218/nasa-satellites-reveal-abrupt-drop-in-global-freshwater-levels' },
    lapisan: 3,
    ringkasan: 'Data satelit GRACE menunjukkan rata-rata air tawar di daratan pada 2015–2023 lebih rendah 1.200 km³ dibanding 2002–2014. Kekeringan dan pemompaan air tanah memperparah penurunan; tanah yang mengering dan memadat juga lebih sulit menyerap hujan berikutnya.',
    penting: 'Perubahan kecil di tanah dan akuifer berkumpul menjadi kehilangan air bersih yang besar.'
  },
  {
    id: 3,
    tanggal: '2024-12-11',
    judul: 'Garam menyusup ke 10,7% daratan dunia',
    sumber: { nama: 'FAO — Newsroom', url: 'https://www.fao.org/newsroom/detail/fao-launches-first-major-global-assessment-of-salt-affected-soils-in-50-years/en' },
    lapisan: 2,
    ringkasan: 'Laporan FAO memperkirakan 1.381 juta hektare tanah terdampak garam, atau 10,7% daratan. Sekitar 10% lahan irigasi dan 10% lahan tadah hujan terpengaruh. Dengan pemanasan yang berlanjut, luasnya diperkirakan bisa naik menjadi 24–32%.',
    penting: 'Tanah asin menurunkan hasil panen, dan pemulihannya butuh drainase, bahan organik, serta waktu.'
  },
  {
    id: 4,
    tanggal: '2024-05-29',
    judul: 'Lava menembus benteng Grindavík',
    sumber: { nama: 'BBC News', url: 'https://www.bbc.com/news/articles/c844em2ey7eo' },
    lapisan: 6,
    ringkasan: 'Erupsi kelima di Semenanjung Reykjanes sejak Desember 2023 membuka retakan sepanjang lebih dari 2,5 km. Lava melewati sebagian benteng pelindung di sekitar Grindavík, dan warga serta fasilitas panas bumi dievakuasi. Aktivitas di kawasan itu belum berhenti.',
    penting: 'Contoh langsung bagaimana magma dari dalam kerak membentuk dan mengubah permukaan.'
  },
  {
    id: 5,
    tanggal: '2026-09-12',
    judul: 'Gua terdalam diukur ulang: 2.209 meter',
    sumber: { nama: 'Discover Wildlife', url: 'https://www.discoverwildlife.com/environment/veryovkina-cave-georgia' },
    lapisan: 4,
    ringkasan: 'Ekspedisi 2024 mengukur ulang Gua Veryovkina di Abkhazia dengan penerima GNSS presisi tinggi dan mencatat kedalaman 2.209 m. Gua Krubera di kawasan yang sama juga berada di kisaran 2,2 km. Catatan resmi masih menempatkan Veryovkina sebagai yang terdalam.',
    penting: 'Kedalaman gua berubah saat pemetaan membaik; angka rekor bukan angka final.'
  },
  {
    id: 6,
    tanggal: '2025-09-12',
    judul: 'Banjir Indonesia dilacak ke kanal yang mengeringkan gambut',
    sumber: { nama: 'Mongabay', url: 'https://news.mongabay.com/2025/09/indonesia-flooding-traced-to-corporate-canals-that-drain-peatlands-report' },
    lapisan: 1,
    ringkasan: 'Laporan Pantau Gambut menghubungkan banjir di beberapa daerah dengan kanal industri yang mengeringkan lahan gambut. Gambut yang kering menyusut, kehilangan kemampuan menahan air, dan mudah terbakar. Banjir lalu menjadi gejala keruntuhan hidrologi, bukan hanya hujan ekstrem.',
    penting: 'Lapisan organik di permukaan adalah spons raksasa; mengeringkannya mengubah banjir dan emisi.'
  },
  {
    id: 7,
    tanggal: '2022-05-27',
    judul: 'Jakarta dan Semarang: sumur dangkal, tanah yang turun',
    sumber: { nama: 'Mongabay Indonesia', url: 'https://mongabay.co.id/2022/05/27/was-was-eksploitasi-air-tanah-berlebih' },
    lapisan: 3,
    ringkasan: 'Di Jabodetabek, sebagian besar rumah tangga masih memakai sumur dangkal karena jaringan pipa belum menjangkau. Pengambilan air tanah yang melebihi pengisian dikaitkan dengan penurunan muka tanah. Di beberapa daerah, penurunan melandai setelah pasokan air pipa masuk.',
    penting: 'Keputusan soal air pipa dan sumur ikut menentukan apakah tanah kota tetap stabil.'
  },
  {
    id: 8,
    tanggal: '2023-01-23',
    judul: 'Inti dalam bumi tidak berputar dengan kecepatan tetap',
    sumber: { nama: 'Nature Geoscience — Yang & Song', url: 'https://www.nature.com/articles/s41561-022-01112-z' },
    lapisan: 6,
    ringkasan: 'Dengan membandingkan gelombang gempa yang berulang sejak 1960-an, peneliti menemukan pola rotasi inti dalam yang berubah dalam siklus sekitar tujuh dekade. Rotasi diferensialnya tampak melambat dan berhenti sementara di sekitar 2009. Pola ini berkaitan dengan perubahan panjang hari dan medan magnet.',
    penting: 'Bagian bumi yang tidak bisa digali tetap bisa dipelajari dari getaran yang menembusnya.'
  }
];
