/*
  data/materi.js — isi setiap lapisan: benda, makhluk, bahan, dan fenomena.
  Bagian "Isi lapisan ini" di Home dirender dari file ini, bukan ditulis di HTML.

  Field:
    id, lapisan     id unik dan id lapisan (1–6) di data/lapisan.js
    nama            nama yang tampil di tombol
    jenis           'benda' | 'makhluk' | 'tumbuhan' | 'bahan' | 'fenomena'
    kedalaman       rentang kedalaman sebagai teks (bukan angka)
    apa             satu kalimat: apa ini
    peran           satu kalimat: kenapa ia penting di lapisan ini
    gambar          path SVG relatif dari root situs
    sumber          { nama, url } — wajib
    perluVerifikasi (opsional) true bila kedalaman hanya titik wakil

  Contoh entri:
    { id: 99, lapisan: 2, nama: 'Contoh', jenis: 'bahan', kedalaman: '10–30 cm',
      apa: '...', peran: '...', gambar: 'assets/img/materi/contoh.svg',
      sumber: { nama: 'Sumber', url: 'https://...' } }

  Daftar ini bisa dioperasikan dengan keyboard: setiap tombol membuka kartu
  detail, dan daftar teks di bawahnya memuat isi yang sama untuk pembaca layar.
*/
window.DATA_MATERI = [
  {
    id: 1, lapisan: 1, nama: 'Daun gugur', jenis: 'benda', kedalaman: '0–5 cm',
    apa: 'Daun yang baru jatuh dan belum kehilangan bentuknya.',
    peran: 'Menutup tanah, menahan tetes hujan, dan menjadi bahan mentah humus.',
    gambar: 'assets/img/materi/daun.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Leaf', url: 'https://www.britannica.com/science/leaf' }
  },
  {
    id: 2, lapisan: 1, nama: 'Ranting', jenis: 'benda', kedalaman: '0–10 cm',
    apa: 'Potongan kayu kecil yang lebih lambat terurai daripada daun.',
    peran: 'Membentuk kerangka serasah, menjaga celah udara, dan menjadi rumah serangga kecil.',
    gambar: 'assets/img/materi/ranting.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Stem', url: 'https://www.britannica.com/science/stem-plant' }
  },
  {
    id: 3, lapisan: 1, nama: 'Jamur', jenis: 'makhluk', kedalaman: '0–10 cm',
    apa: 'Miselium jamur yang tumbuh sebagai benang halus di antara serasah.',
    peran: 'Memecah lignin dan selulosa yang sulit dicerna bakteri, lalu mengedarkan hara.',
    gambar: 'assets/img/materi/jamur.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Fungus', url: 'https://www.britannica.com/science/fungus' }
  },
  {
    id: 4, lapisan: 1, nama: 'Cacing tanah', jenis: 'makhluk', kedalaman: '0–10 cm',
    apa: 'Cacing kecil yang memakan daun mati dan tanah halus.',
    peran: 'Mencacah bahan organik dan mengeluarkannya sebagai agregat tanah yang lebih stabil.',
    gambar: 'assets/img/milestones/cacing-serasah.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Earthworm', url: 'https://www.britannica.com/animal/earthworm' }
  },
  {
    id: 5, lapisan: 1, nama: 'Semut', jenis: 'makhluk', kedalaman: '0–10 cm',
    apa: 'Serangga sosial yang membangun sarang di serasah dan tanah gembur.',
    peran: 'Memindahkan bahan organik, membuka pori, dan memangsa hewan kecil.',
    gambar: 'assets/img/materi/semut.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Ant', url: 'https://www.britannica.com/animal/ant' }
  },
  {
    id: 6, lapisan: 1, nama: 'Kumbang tanah', jenis: 'makhluk', kedalaman: '0–8 cm',
    apa: 'Kumbang predator yang berburu di permukaan tanah dan serasah.',
    peran: 'Mengatur populasi hewan kecil; liangnya membantu air dan udara masuk.',
    gambar: 'assets/img/materi/kumbang.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Ground beetle', url: 'https://www.britannica.com/animal/ground-beetle' }
  },
  {
    id: 7, lapisan: 1, nama: 'Bakteri pengurai', jenis: 'makhluk', kedalaman: '0–10 cm',
    apa: 'Mikroba bersel satu yang bekerja di pori-pori lembap.',
    peran: 'Memulai pembusukan dan mengubah nitrogen menjadi bentuk yang bisa dipakai tanaman.',
    gambar: 'assets/img/milestones/bakteri.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Bacteria', url: 'https://www.britannica.com/science/bacteria' }
  },
  {
    id: 8, lapisan: 1, nama: 'Humus', jenis: 'bahan', kedalaman: '0–10 cm',
    apa: 'Bahan organik gelap yang sudah terurai stabil.',
    peran: 'Menahan air dan hara, serta memberi warna gelap pada tanah subur.',
    gambar: 'assets/img/materi/humus.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Humus', url: 'https://www.britannica.com/science/humus' }
  },

  {
    id: 9, lapisan: 2, nama: 'Akar halus', jenis: 'tumbuhan', kedalaman: '10–30 cm',
    apa: 'Ujung akar berukuran kecil yang menyerap air dan hara.',
    peran: 'Mengikat butiran tanah dan memasok air ke tanaman.',
    gambar: 'assets/img/materi/akar-halus.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Root', url: 'https://www.britannica.com/science/root-plant' }
  },
  {
    id: 10, lapisan: 2, nama: 'Cacing tanah', jenis: 'makhluk', kedalaman: '10–30 cm',
    apa: 'Cacing yang membuat liang dan mencampur humus dengan mineral.',
    peran: 'Menjaga tanah tetap gembur dan mempercepat peresapan air.',
    gambar: 'assets/img/milestones/cacing-serasah.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Earthworm', url: 'https://www.britannica.com/animal/earthworm' }
  },
  {
    id: 11, lapisan: 2, nama: 'Mikroba tanah', jenis: 'makhluk', kedalaman: '10–30 cm',
    apa: 'Bakteri dan jamur mikroskopis yang hidup di sekitar akar.',
    peran: 'Membantu tanaman menyerap fosfor dan nitrogen, dan menjaga patogen tetap terkendali.',
    gambar: 'assets/img/milestones/mikroba.svg',
    sumber: { nama: 'USDA NRCS — Soil health', url: 'https://www.nrcs.usda.gov/conservation-basics/natural-resource-concerns/soils/soil-health' }
  },
  {
    id: 12, lapisan: 2, nama: 'Humus tercampur', jenis: 'bahan', kedalaman: '10–25 cm',
    apa: 'Humus yang sudah bercampur dengan mineral lempung dan pasir.',
    peran: 'Membentuk agregat tanah yang menyimpan air dan tidak mudah hanyut.',
    gambar: 'assets/img/materi/humus.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Humus', url: 'https://www.britannica.com/science/humus' }
  },
  {
    id: 13, lapisan: 2, nama: 'Butiran pasir dan lanau', jenis: 'bahan', kedalaman: '10–30 cm',
    apa: 'Butiran mineral berukuran kasar sampai sangat halus.',
    peran: 'Menentukan tekstur tanah: pasir meloloskan air, lanau menahan lebih lama.',
    gambar: 'assets/img/materi/butiran.svg',
    sumber: { nama: 'USDA NRCS — Soil texture guide', url: 'https://www.nrcs.usda.gov/resources/education-and-teaching-materials/soil-texture-guide' }
  },
  {
    id: 14, lapisan: 2, nama: 'Air pori', jenis: 'fenomena', kedalaman: '10–30 cm',
    apa: 'Air yang mengisi ruang kecil di antara butiran tanah.',
    peran: 'Sumber air utama akar dan pelarut hara.',
    gambar: 'assets/img/materi/air-pori.svg',
    sumber: { nama: 'USGS Water Science School — Groundwater', url: 'https://www.usgs.gov/special-topics/water-science-school/science/groundwater-0' }
  },
  {
    id: 15, lapisan: 2, nama: 'Rimpang rumput', jenis: 'tumbuhan', kedalaman: '15–25 cm',
    apa: 'Batang bawah tanah yang menyimpan cadangan makanan.',
    peran: 'Membantu rumput menyebar dan bertahan setelah dipotong atau terbakar.',
    gambar: 'assets/img/milestones/rimpang-rumput.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Rhizome', url: 'https://www.britannica.com/science/rhizome' }
  },

  {
    id: 16, lapisan: 3, nama: 'Lempung', jenis: 'bahan', kedalaman: '30–150 cm',
    apa: 'Partikel mineral sangat halus yang lengket saat basah.',
    peran: 'Menahan air dan hara, tetapi bisa menjadi kedap bila dipadatkan.',
    gambar: 'assets/img/materi/lempung.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Clay', url: 'https://www.britannica.com/science/clay' }
  },
  {
    id: 17, lapisan: 3, nama: 'Oksida besi', jenis: 'bahan', kedalaman: '50–150 cm',
    apa: 'Besi yang teroksidasi dan mengendap sebagai bercak karat.',
    peran: 'Memberi warna merah-kuning dan memengaruhi cara hara menempel di tanah.',
    gambar: 'assets/img/milestones/lapisan-besi.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Soil horizon', url: 'https://www.britannica.com/science/soil-horizon' }
  },
  {
    id: 18, lapisan: 3, nama: 'Akar pohon besar', jenis: 'tumbuhan', kedalaman: '30–150 cm',
    apa: 'Akar kayu yang menembus lapisan bawah untuk mencari air.',
    peran: 'Mengikat tanah dalam, membuka jalur air, dan menopang pohon.',
    gambar: 'assets/img/milestones/akar-pohon.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Root', url: 'https://www.britannica.com/science/root-plant' }
  },
  {
    id: 19, lapisan: 3, nama: 'Kerikil', jenis: 'bahan', kedalaman: '30–150 cm',
    apa: 'Pecahan batuan berukuran beberapa milimeter sampai sentimeter.',
    peran: 'Membuka ruang pori besar sehingga air bergerak lebih cepat.',
    gambar: 'assets/img/materi/kerikil.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Gravel', url: 'https://www.britannica.com/science/gravel' }
  },
  {
    id: 20, lapisan: 3, nama: 'Mineral terbawa air', jenis: 'bahan', kedalaman: '30–150 cm',
    apa: 'Mineral larut yang terbawa air dari lapisan atas.',
    peran: 'Bisa menjadi hara, bisa juga mengendap menjadi lapisan keras.',
    gambar: 'assets/img/materi/mineral.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Mineral', url: 'https://www.britannica.com/science/mineral-chemical-compound' }
  },
  {
    id: 21, lapisan: 3, nama: 'Air tanah', jenis: 'fenomena', kedalaman: '90–150 cm',
    apa: 'Air yang mengisi pori dan retakan di bawah muka air tanah.',
    peran: 'Cadangan air untuk sumur, mata air, dan aliran sungai di musim kering.',
    gambar: 'assets/img/milestones/muka-air.svg',
    sumber: { nama: 'USGS Water Science School — Water table', url: 'https://www.usgs.gov/special-topics/water-science-school/science/water-table' }
  },
  {
    id: 22, lapisan: 3, nama: 'Cacing anecic', jenis: 'makhluk', kedalaman: '100–150 cm',
    apa: 'Cacing besar yang membuat liang vertikal dalam dan naik ke permukaan untuk makan.',
    peran: 'Memindahkan bahan organik ke lapisan bawah dan menciptakan jalur air.',
    gambar: 'assets/img/milestones/cacing-anecic.svg',
    sumber: { nama: 'European Journal of Soil Biology (2024)', url: 'https://doi.org/10.1016/j.ejsobi.2024.103595' }
  },

  {
    id: 23, lapisan: 4, nama: 'Pecahan batu', jenis: 'bahan', kedalaman: '1,5–30 m',
    apa: 'Batuan yang sudah retak dan terpisah menjadi kepingan.',
    peran: 'Membentuk kerangka lapisan lapuk dan menyediakan ruang untuk air.',
    gambar: 'assets/img/materi/pecahan-batu.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Weathering', url: 'https://www.britannica.com/science/weathering-geology' }
  },
  {
    id: 24, lapisan: 4, nama: 'Saprolit', jenis: 'bahan', kedalaman: '2–30 m',
    apa: 'Batuan yang sudah lapuk tetapi masih mempertahankan struktur aslinya.',
    peran: 'Menjadi zona peralihan antara tanah dan batuan padat; bisa menyimpan air.',
    gambar: 'assets/img/materi/saprolit.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Regolith', url: 'https://www.britannica.com/science/regolith' }
  },
  {
    id: 25, lapisan: 4, nama: 'Rongga berisi air', jenis: 'fenomena', kedalaman: '2–30 m',
    apa: 'Celah dan pori batuan lapuk yang terisi air tanah.',
    peran: 'Bagian dari akuifer yang bisa dipompa untuk rumah dan sawah.',
    gambar: 'assets/img/milestones/akuifer.svg',
    sumber: { nama: 'USGS Water Science School — Aquifers', url: 'https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater' }
  },
  {
    id: 26, lapisan: 4, nama: 'Akar tunggang', jenis: 'tumbuhan', kedalaman: '3–15 m',
    apa: 'Akar utama yang tumbuh lurus ke bawah, kadang sangat dalam.',
    peran: 'Mencapai air di retakan batuan dan memperkuat lereng.',
    gambar: 'assets/img/materi/akar-tunggang.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Root', url: 'https://www.britannica.com/science/root-plant' }
  },
  {
    id: 27, lapisan: 4, nama: 'Kerikil dan pasir', jenis: 'bahan', kedalaman: '1,5–20 m',
    apa: 'Butiran lepas hasil pecahan batuan.',
    peran: 'Mempercepat peresapan air dan membentuk lapisan penyimpan air.',
    gambar: 'assets/img/materi/kerikil.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Gravel', url: 'https://www.britannica.com/science/gravel' }
  },
  {
    id: 28, lapisan: 4, nama: 'Gua karst', jenis: 'fenomena', kedalaman: '10–30 m',
    apa: 'Rongga dan lorong yang terbentuk dari pelarutan batuan gamping.',
    peran: 'Jalur cepat air bawah tanah dan rumah bagi makhluk yang hidup tanpa cahaya.',
    gambar: 'assets/img/milestones/gua-karst.svg',
    sumber: { nama: 'National Park Service — Karst landscapes', url: 'https://www.nps.gov/subjects/caves/karst-landscapes.htm' }
  },
  {
    id: 29, lapisan: 4, nama: 'Sumur gali', jenis: 'fenomena', kedalaman: '5–15 m',
    apa: 'Lubang buatan untuk mengambil air dari lapisan dangkal.',
    peran: 'Sumber air sehari-hari, tetapi juga jalur masuk polutan bila tidak ditutup rapat.',
    gambar: 'assets/img/milestones/sumur.svg',
    sumber: { nama: 'USGS Water Science School — Groundwater wells', url: 'https://www.usgs.gov/special-topics/water-science-school/science/groundwater-wells' }
  },

  {
    id: 30, lapisan: 5, nama: 'Granit', jenis: 'bahan', kedalaman: '30–500 m',
    apa: 'Batuan beku berbutir kasar yang tersusun dari kuarsa, feldspar, dan mika.',
    peran: 'Fondasi keras yang lambat lapuk dan sering menjadi batuan induk tanah.',
    gambar: 'assets/img/materi/granit.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Granite', url: 'https://www.britannica.com/science/granite' }
  },
  {
    id: 31, lapisan: 5, nama: 'Basal', jenis: 'bahan', kedalaman: '30–500 m',
    apa: 'Batuan beku gelap yang umum di kerak samudra dan aliran lava.',
    peran: 'Membentuk dasar samudra dan beberapa dataran vulkanik; retakannya menyimpan air.',
    gambar: 'assets/img/materi/basal.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Basalt', url: 'https://www.britannica.com/science/basalt' }
  },
  {
    id: 32, lapisan: 5, nama: 'Kristal kuarsa', jenis: 'bahan', kedalaman: '30–500 m',
    apa: 'Mineral silika yang keras dan tahan pelapukan.',
    peran: 'Bertahan sebagai butiran pasir dan mengisi urat di batuan.',
    gambar: 'assets/img/materi/kuarsa.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Quartz', url: 'https://www.britannica.com/science/quartz' }
  },
  {
    id: 33, lapisan: 5, nama: 'Rekahan berair', jenis: 'fenomena', kedalaman: '50–500 m',
    apa: 'Celah batuan yang terisi air dan kadang gas.',
    peran: 'Jalur air tanah dalam dan rumah mikroba bawah permukaan.',
    gambar: 'assets/img/materi/rekahan.svg',
    sumber: { nama: 'USGS Water Science School — Aquifers', url: 'https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater' }
  },
  {
    id: 34, lapisan: 5, nama: 'Fosil', jenis: 'bahan', kedalaman: '30–500 m',
    apa: 'Sisa atau jejak makhluk purba yang terawetkan di batuan sedimen.',
    peran: 'Merekam urutan waktu, iklim, dan kehidupan masa lalu.',
    gambar: 'assets/img/materi/fosil.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Fossil', url: 'https://www.britannica.com/science/fossil' }
  },
  {
    id: 35, lapisan: 5, nama: 'Mikroba batuan', jenis: 'makhluk', kedalaman: '300–500 m',
    apa: 'Bakteri dan archaea yang hidup di retakan batuan tanpa cahaya.',
    peran: 'Mengambil energi dari reaksi kimia dan memengaruhi kimia air bawah tanah.',
    gambar: 'assets/img/milestones/mikroba.svg',
    sumber: { nama: 'The ISME Journal (2021)', url: 'https://www.nature.com/articles/s41396-021-00965-3' }
  },
  {
    id: 36, lapisan: 5, nama: 'Akuifer artesis', jenis: 'fenomena', kedalaman: '100–500 m',
    apa: 'Air terkurung di antara lapisan kedap yang bisa naik sendiri saat dibor.',
    peran: 'Sumber air bertekanan, tetapi bisa habis bila pengambilan melebihi pengisian.',
    gambar: 'assets/img/milestones/akuifer-artesis.svg',
    sumber: { nama: 'USGS Water Science School — Artesian water', url: 'https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells' }
  },

  {
    id: 37, lapisan: 6, nama: 'Granit', jenis: 'bahan', kedalaman: '0,5–35 km',
    apa: 'Batuan beku yang membentuk sebagian besar kerak benua.',
    peran: 'Menjadi fondasi benua dan sumber mineral seperti kuarsa dan feldspar.',
    gambar: 'assets/img/materi/granit.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Granite', url: 'https://www.britannica.com/science/granite' }
  },
  {
    id: 38, lapisan: 6, nama: 'Basal', jenis: 'bahan', kedalaman: '0,5–35 km',
    apa: 'Batuan beku gelap yang membentuk kerak samudra dan dataran lava.',
    peran: 'Menyusun sebagian besar permukaan bumi dan menyimpan air di retakannya.',
    gambar: 'assets/img/materi/basal.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Basalt', url: 'https://www.britannica.com/science/basalt' }
  },
  {
    id: 39, lapisan: 6, nama: 'Bijih besi', jenis: 'bahan', kedalaman: '1–10 km',
    apa: 'Batuan dengan konsentrasi besi yang cukup untuk ditambang.',
    peran: 'Bahan baku baja; penambangannya mengubah lanskap dan air bawah tanah.',
    gambar: 'assets/img/materi/bijih-besi.svg',
    sumber: { nama: 'USGS — Iron ore', url: 'https://www.usgs.gov/centers/national-minerals-information-center/iron-ore-statistics-and-information' }
  },
  {
    id: 40, lapisan: 6, nama: 'Bijih tembaga', jenis: 'bahan', kedalaman: '1–10 km',
    apa: 'Mineral tembaga yang terbentuk di urat dan batuan beku.',
    peran: 'Bahan konduktor listrik; penambangannya menghasilkan limbah batuan besar.',
    gambar: 'assets/img/materi/bijih-tembaga.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Copper', url: 'https://www.britannica.com/science/copper' }
  },
  {
    id: 41, lapisan: 6, nama: 'Emas', jenis: 'bahan', kedalaman: '2–4 km',
    apa: 'Logam mulia yang sering ditemukan di urat kuarsa.',
    peran: 'Menjadi penanda proses hidrotermal dan target penambangan dalam.',
    gambar: 'assets/img/materi/emas.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Gold', url: 'https://www.britannica.com/science/gold-chemical-element' }
  },
  {
    id: 42, lapisan: 6, nama: 'Minyak dan gas bumi', jenis: 'bahan', kedalaman: '1–8 km',
    apa: 'Hidrokarbon yang terbentuk dari bahan organik di batuan sedimen.',
    peran: 'Sumber energi, tetapi pengeboran dan kebocoran memengaruhi air dan iklim.',
    gambar: 'assets/img/materi/minyak.svg',
    sumber: { nama: 'Encyclopaedia Britannica — Petroleum', url: 'https://www.britannica.com/science/petroleum' }
  },
  {
    id: 43, lapisan: 6, nama: 'Panas bumi', jenis: 'fenomena', kedalaman: '1–35 km',
    apa: 'Panas dari dalam bumi yang memanaskan batuan dan air.',
    peran: 'Sumber energi terbarukan dan penggerak aliran air hidrotermal.',
    gambar: 'assets/img/materi/geotermal.svg',
    sumber: { nama: 'USGS — Geothermal energy', url: 'https://www.usgs.gov/energy-and-minerals/geothermal-energy' }
  },
  {
    id: 44, lapisan: 6, nama: 'Batas Moho', jenis: 'fenomena', kedalaman: 'sekitar 35 km',
    apa: 'Batas antara kerak bumi dan mantel, ditemukan dari gelombang gempa.',
    peran: 'Menandai perubahan komposisi dan kecepatan gelombang; belum pernah ditembus bor.',
    gambar: 'assets/img/milestones/moho.svg',
    sumber: { nama: 'Geology.com — Mohorovičić discontinuity', url: 'https://geology.com/articles/mohorovicic-discontinuity.shtml' }
  }
];
