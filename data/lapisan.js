/*
  data/lapisan.js — model enam lapisan yang dipakai Home, artikel, filter, dan cutaway.

  Field:
    id          angka urut, dipakai untuk menautkan materi dan milestone
    slug        nama pendek untuk URL/filter, huruf kecil
    nama        nama lengkap yang tampil
    pendek      label pendek di alat ukur
    min, max    kedalaman dalam meter (angka, bukan teks)
    suhu        perkiraan rentang suhu, sudah termasuk satuan
    warna       warna identitas lapisan (dipakai di latar, bilah, penanda)
    warnaTeks   '#16262B' atau '#FFF6E6', dipilih agar kontras minimal 4.5:1
    ringkas     satu paragraf pembuka lapisan
    bahan       komposisi utama dalam kalimat
    proses      bagaimana lapisan ini terbentuk
    peran       peran ekologis
    ancaman     hal yang merusaknya
    tekstur     { file, blend, opacity, speed } untuk latar bertekstur
    komposisi   { sumber: {nama,url}, butir: [{label, nilai, tampil, warna}] }
                nilai harus berjumlah 100; tampil boleh berupa rentang.

  Contoh entri (ringkas):
    { id: 9, slug: 'contoh', nama: 'Contoh', pendek: 'Contoh', min: 0, max: 1,
      suhu: '10–20 °C', warna: '#6B4428', warnaTeks: '#FFF6E6', ... }

  Angka komposisi adalah rentang umum dari literatur tanah, bukan hasil satu
  sampel. Jangan mengganti angka tanpa memperbarui sumbernya.
*/
window.DATA_LAPISAN = [
  {
    id: 1,
    slug: 'serasah-humus',
    nama: 'Serasah dan humus',
    pendek: 'Serasah',
    min: 0,
    max: 0.1,
    suhu: '15–25 °C',
    warna: '#4A3322',
    warnaTeks: '#FFF6E6',
    ringkas: 'Daun, ranting, dan sisa makhluk yang belum selesai diuraikan. Di sinilah tanah mulai terbentuk.',
    bahan: 'Serasah daun dan ranting, humus, miselium jamur, bakteri, akar halus, dan arang sisa kebakaran lama.',
    proses: 'Bakteri dan jamur memecah bahan organik. Cacing, rayap, dan serangga menggilingnya lalu mencampurnya dengan mineral. Semakin lambat bahan membusuk, semakin banyak karbon yang tersimpan.',
    peran: 'Menahan air hujan, mendinginkan permukaan tanah, dan memasok nutrisi bagi tanaman. Lapisan ini juga rumah bagi sebagian besar kehidupan tanah.',
    ancaman: 'Pemadatan oleh kendaraan dan ternak, pengambilan serasah, kebakaran, serta kekeringan yang memutus proses pembusukan.',
    tekstur: { file: 'serasah.webp', blend: 'multiply', opacity: 0.5, speed: 0.3 },
    komposisi: {
      sumber: { nama: 'USDA NRCS — Soil health', url: 'https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health' },
      butir: [
        { label: 'Bahan organik', nilai: 12, tampil: '5–20%', warna: '#2E2015' },
        { label: 'Mineral', nilai: 58, tampil: '45–75%', warna: '#8B6B47' },
        { label: 'Air', nilai: 15, tampil: '10–30%', warna: '#8FC7DD' },
        { label: 'Udara', nilai: 15, tampil: '10–25%', warna: '#FFF6E6' }
      ]
    }
  },
  {
    id: 2,
    slug: 'tanah-atas',
    nama: 'Tanah atas',
    pendek: 'Tanah atas',
    min: 0.1,
    max: 0.3,
    suhu: '14–24 °C',
    warna: '#6B4428',
    warnaTeks: '#FFF6E6',
    ringkas: 'Bagian yang paling sering diinjak dan paling sering dianggap kotor. Padahal ini dapur utama tanaman.',
    bahan: 'Mineral lempung dan pasir, humus tercampur, akar halus, udara, dan air.',
    proses: 'Humus dari lapisan atas tercampur mineral oleh cacing, akar, dan aktivitas manusia. Pencampuran ini butuh puluhan sampai ratusan tahun.',
    peran: 'Tempat akar menyerap sebagian besar air dan hara. Struktur gemburnya menentukan apakah hujan meresap atau mengalir sebagai banjir.',
    ancaman: 'Erosi oleh air dan angin, pengolahan tanah berlebihan, pupuk dan pestisida, serta penutupan permukaan oleh beton.',
    tekstur: { file: 'tanah-atas.webp', blend: 'multiply', opacity: 0.45, speed: 0.45 },
    komposisi: {
      sumber: { nama: 'USDA NRCS — Soil texture', url: 'https://www.nrcs.usda.gov/resources/education-and-teaching-materials/soil-texture-guide' },
      butir: [
        { label: 'Mineral', nilai: 45, tampil: '±45%', warna: '#A8804F' },
        { label: 'Bahan organik', nilai: 5, tampil: '3–8%', warna: '#3B291B' },
        { label: 'Air', nilai: 25, tampil: '20–30%', warna: '#8FC7DD' },
        { label: 'Udara', nilai: 25, tampil: '20–30%', warna: '#FFF6E6' }
      ]
    }
  },
  {
    id: 3,
    slug: 'tanah-bawah',
    nama: 'Tanah bawah',
    pendek: 'Tanah bawah',
    min: 0.3,
    max: 1.5,
    suhu: '12–22 °C',
    warna: '#C47A34',
    warnaTeks: '#16262B',
    ringkas: 'Lebih dingin, lebih padat, dan lebih sunyi. Air bergerak pelan membawa mineral ke bawah, atau polutan ikut serta.',
    bahan: 'Lempung, pasir, sisa mineral, akar dalam, dan pori-pori kecil berisi air.',
    proses: 'Partikel halus tercuci dari lapisan atas dan mengendap. Sebagian membentuk lapisan kedap yang menahan air di atasnya.',
    peran: 'Menyimpan air untuk musim kering dan menyaring sebagian polutan. Akar pohon besar dan liang hewan dalam memakai ruang ini.',
    ancaman: 'Pemadatan, pencemaran nitrat, dan penggalian yang memotong lapisan penyangga.',
    tekstur: { file: 'tanah-bawah.webp', blend: 'multiply', opacity: 0.5, speed: 0.4 },
    komposisi: {
      sumber: { nama: 'Encyclopaedia Britannica — Soil horizon', url: 'https://www.britannica.com/science/soil-horizon' },
      butir: [
        { label: 'Mineral', nilai: 70, tampil: '60–80%', warna: '#9C5B28' },
        { label: 'Air', nilai: 20, tampil: '15–25%', warna: '#8FC7DD' },
        { label: 'Udara', nilai: 8, tampil: '5–15%', warna: '#FFF6E6' },
        { label: 'Bahan organik', nilai: 2, tampil: '1–3%', warna: '#4A3322' }
      ]
    }
  },
  {
    id: 4,
    slug: 'batuan-lapuk',
    nama: 'Batuan lapuk',
    pendek: 'Lapuk',
    min: 1.5,
    max: 30,
    suhu: '10–20 °C',
    warna: '#D9B77A',
    warnaTeks: '#16262B',
    ringkas: 'Batuan yang sudah lelah. Retak dan rongganya menyimpan air, akar, dan kadang gua sepanjang berkilo-kilometer.',
    bahan: 'Pecahan batuan, pasir, lempung hasil pelapukan, dan rongga berisi air atau udara.',
    proses: 'Air, perubahan suhu, akar, dan asam organik memecah batuan selama ribuan sampai jutaan tahun. Ketebalannya sangat berbeda antar tempat.',
    peran: 'Menjadi spons raksasa: menampung air tanah, mengalirkannya ke mata air, dan menopang fondasi bangunan.',
    ancaman: 'Pengambilan air tanah berlebihan, pencemaran dari permukaan, dan penggalian yang membuka jalur polutan.',
    tekstur: { file: 'batuan-lapuk.webp', blend: 'multiply', opacity: 0.55, speed: 0.5 },
    komposisi: {
      sumber: { nama: 'USGS Water Science School — Aquifers and groundwater', url: 'https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater' },
      butir: [
        { label: 'Mineral', nilai: 80, tampil: '75–90%', warna: '#C0A06B' },
        { label: 'Air', nilai: 15, tampil: '10–20%', warna: '#8FC7DD' },
        { label: 'Rongga dan udara', nilai: 5, tampil: '2–10%', warna: '#FFF6E6' }
      ]
    }
  },
  {
    id: 5,
    slug: 'batuan-dasar',
    nama: 'Batuan dasar',
    pendek: 'Batuan dasar',
    min: 30,
    max: 500,
    suhu: '15–30 °C',
    warna: '#8793A1',
    warnaTeks: '#16262B',
    ringkas: 'Fondasi keras di bawah semua yang kita tanam. Di retakannya, air bisa bertahan jutaan tahun.',
    bahan: 'Batuan padat seperti granit, gamping, atau basal, dengan retakan dan urat mineral.',
    proses: 'Magma yang mendingin, sedimen yang terlipat dan terpadatkan, atau batuan lama yang berubah karena panas dan tekanan.',
    peran: 'Menopang tanah di atasnya dan menyimpan air tanah dalam. Retakan menjadi rumah bagi mikroba yang hidup tanpa cahaya.',
    ancaman: 'Penambangan, pengeboran, dan masuknya air asin atau polutan lewat sumur yang tidak tertutup rapat.',
    tekstur: { file: 'batuan-dasar.webp', blend: 'multiply', opacity: 0.55, speed: 0.55 },
    komposisi: {
      sumber: { nama: 'Encyclopaedia Britannica — Earth crust', url: 'https://www.britannica.com/science/Earth-crust' },
      butir: [
        { label: 'Mineral padat', nilai: 96, tampil: '>95%', warna: '#6F7C8A' },
        { label: 'Rongga dan retakan', nilai: 3, tampil: '1–5%', warna: '#FFF6E6' },
        { label: 'Air', nilai: 1, tampil: '<2%', warna: '#8FC7DD' }
      ]
    }
  },
  {
    id: 6,
    slug: 'kerak-bumi',
    nama: 'Kerak bumi',
    pendek: 'Kerak',
    min: 500,
    max: 35000,
    suhu: '30–700 °C (bervariasi)',
    warna: '#6F6862',
    warnaTeks: '#FFF6E6',
    ringkas: 'Dari 500 meter sampai sekitar 35 kilometer: batuan, air purba, mikroba, dan panas. Manusia baru menggores sedikit.',
    bahan: 'Batuan beku, metamorf, dan sedimen; air purba di retakan; gas; mikroba; serta mineral yang terbentuk di bawah tekanan.',
    proses: 'Kerak terbentuk dari magma yang naik di batas lempeng, sedimen yang tertimbun, dan batuan yang berubah bentuk selama ratusan juta tahun.',
    peran: 'Perisai hidup di permukaan, penopang lempeng, dan laboratorium alami untuk memahami bumi. Batasnya dengan mantel adalah garis Moho.',
    ancaman: 'Pengeboran dalam, penambangan, gempa yang dipicu aktivitas manusia, dan perubahan tekanan akibat cairan yang disuntikkan.',
    tekstur: { file: 'kerak-bumi.webp', blend: 'multiply', opacity: 0.55, speed: 0.6 },
    komposisi: {
      sumber: { nama: 'Encyclopaedia Britannica — Earth crust', url: 'https://www.britannica.com/science/Earth-crust' },
      butir: [
        { label: 'Silika (SiO₂)', nilai: 60, tampil: '59–63%', warna: '#A7B0B8' },
        { label: 'Alumina (Al₂O₃)', nilai: 15, tampil: '15–16%', warna: '#C9C2B4' },
        { label: 'Besi oksida', nilai: 6, tampil: '6–7%', warna: '#C97B5B' },
        { label: 'Kalsium oksida', nilai: 5, tampil: '5–6%', warna: '#E6D3B3' },
        { label: 'Lainnya', nilai: 14, tampil: '±14%', warna: '#8F9AA3' }
      ]
    }
  }
];
