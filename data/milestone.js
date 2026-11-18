/*
  data/milestone.js — 25 penanda di kedalaman sebenarnya.

  Field:
    id             angka unik
    lapisan        id lapisan di data/lapisan.js (1–6)
    nama           nama penanda
    jenis          'makhluk' | 'tumbuhan' | 'fenomena alam' | 'rekor manusia'
    kedalaman      kedalaman dalam meter (angka)
    label          kedalaman yang sudah diformat, misalnya '22 m'
    at             posisi 0–1 di dalam lapisan, untuk tata letak kartu
    keterangan     satu sampai dua kalimat
    gambar         path relatif dari root situs
    sumber         { nama, url } — wajib
    perluVerifikasi (opsional) true bila angka masih berupa perkiraan/rentang
    catatan        (opsional) alasan angka perlu dicek ulang

  Contoh entri:
    { id: 99, lapisan: 2, nama: 'Contoh', jenis: 'fenomena alam', kedalaman: 0.2,
      label: '20 cm', at: 0.5, keterangan: '...', gambar: 'assets/img/milestones/...',
      sumber: { nama: 'Sumber', url: 'https://...' } }

  Angka yang ditandai perluVerifikasi HARUS dicek ke sumber sebelum publikasi.
*/
window.DATA_MILESTONE = [
  {
    "id": 1,
    "lapisan": 1,
    "nama": "Cacing serasah",
    "jenis": "makhluk",
    "kedalaman": 0.03,
    "label": "3 cm",
    "at": 0.3,
    "keterangan": "Cacing kecil memakan daun mati dan mengembalikannya sebagai tanah.",
    "gambar": "assets/img/milestones/cacing-serasah.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Earthworm",
      "url": "https://www.britannica.com/animal/earthworm"
    }
  },
  {
    "id": 2,
    "lapisan": 1,
    "nama": "Jaringan mikoriza",
    "jenis": "makhluk",
    "kedalaman": 0.05,
    "label": "5 cm",
    "at": 0.5,
    "keterangan": "Hifa jamur memperluas jangkauan akar hingga jauh melampaui akar itu sendiri.",
    "gambar": "assets/img/milestones/mikoriza.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Mycorrhiza",
      "url": "https://www.britannica.com/science/mycorrhiza"
    },
    "perluVerifikasi": true,
    "catatan": "Kedalaman 5 cm hanya titik ilustrasi. Jaringan mikoriza bisa mencapai puluhan sentimeter sampai beberapa meter, tergantung akar inang."
  },
  {
    "id": 3,
    "lapisan": 1,
    "nama": "Ekor pegas",
    "jenis": "makhluk",
    "kedalaman": 0.07,
    "label": "7 cm",
    "at": 0.7,
    "keterangan": "Collembola melompat dengan ekor lipatnya saat terganggu.",
    "gambar": "assets/img/milestones/ekor-pegas.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Springtail",
      "url": "https://www.britannica.com/animal/springtail"
    },
    "perluVerifikasi": true,
    "catatan": "Kedalaman 7 cm adalah titik wakil untuk collembola di serasah; hewan ini dapat ditemukan dari permukaan sampai lapisan tanah atas."
  },
  {
    "id": 4,
    "lapisan": 1,
    "nama": "Bakteri pengurai",
    "jenis": "makhluk",
    "kedalaman": 0.09,
    "label": "9 cm",
    "at": 0.9,
    "keterangan": "Satu sendok tanah bisa berisi miliaran bakteri yang memulai pembusukan.",
    "gambar": "assets/img/milestones/bakteri.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Bacteria",
      "url": "https://www.britannica.com/science/bacteria"
    },
    "perluVerifikasi": true,
    "catatan": "\"Miliaran\" adalah orde besaran yang sering dikutip; jumlahnya bergantung pada jenis tanah dan metode hitung."
  },
  {
    "id": 5,
    "lapisan": 2,
    "nama": "Rimpang rumput",
    "jenis": "tumbuhan",
    "kedalaman": 0.15,
    "label": "15 cm",
    "at": 0.25,
    "keterangan": "Batang bawah tanah rumput menyimpan cadangan makanan dan menyebar di lapisan atas.",
    "gambar": "assets/img/milestones/rimpang-rumput.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Rhizome",
      "url": "https://www.britannica.com/science/rhizome"
    }
  },
  {
    "id": 6,
    "lapisan": 2,
    "nama": "Bank benih",
    "jenis": "tumbuhan",
    "kedalaman": 0.2,
    "label": "20 cm",
    "at": 0.5,
    "keterangan": "Biji tertidur di tanah. Sebagian tetap hidup bertahun-tahun menunggu cahaya.",
    "gambar": "assets/img/milestones/bank-benih.svg",
    "sumber": {
      "nama": "Forest Ecology and Management (2018) — Soil seed bank characteristics",
      "url": "https://www.sciencedirect.com/science/article/pii/S0378112717316481"
    }
  },
  {
    "id": 7,
    "lapisan": 2,
    "nama": "Rayap tanah",
    "jenis": "makhluk",
    "kedalaman": 0.25,
    "label": "25 cm",
    "at": 0.75,
    "keterangan": "Lorong jelajahnya bisa 1–2 m, dengan jaringan tipis 2–6 cm dari permukaan.",
    "gambar": "assets/img/milestones/rayap.svg",
    "sumber": {
      "nama": "Insectes Sociaux (1991) — Gallery system of Macrotermes bellicosus",
      "url": "https://link.springer.com/article/10.1007/BF01242714"
    },
    "perluVerifikasi": true,
    "catatan": "Lorong 1–2 m dan jaringan 2–6 cm berasal dari satu studi Macrotermes bellicosus; spesies lain bisa berbeda."
  },
  {
    "id": 8,
    "lapisan": 2,
    "nama": "Tikus tanah",
    "jenis": "makhluk",
    "kedalaman": 0.3,
    "label": "30 cm",
    "at": 0.96,
    "keterangan": "Terowongannya biasanya 15–45 cm di bawah permukaan, lebih dalam saat tanah kering.",
    "gambar": "assets/img/milestones/tikus-tanah.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Mole",
      "url": "https://www.britannica.com/animal/mole-mammal"
    },
    "perluVerifikasi": true,
    "catatan": "Terowongan 15–45 cm adalah rentang umum; kedalaman berubah mengikuti kelembapan dan jenis tanah."
  },
  {
    "id": 9,
    "lapisan": 3,
    "nama": "Akar pohon",
    "jenis": "tumbuhan",
    "kedalaman": 0.6,
    "label": "60 cm",
    "at": 0.25,
    "keterangan": "Sebagian besar akar pohon bekerja di lapisan atas, bukan jauh di bawah.",
    "gambar": "assets/img/milestones/akar-pohon.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Root",
      "url": "https://www.britannica.com/science/root-plant"
    },
    "perluVerifikasi": true,
    "catatan": "\"Sebagian besar akar di lapisan atas\" adalah pola umum; kedalaman akar sangat bervariasi antar spesies."
  },
  {
    "id": 10,
    "lapisan": 3,
    "nama": "Muka air tanah",
    "jenis": "fenomena alam",
    "kedalaman": 0.9,
    "label": "90 cm",
    "at": 0.5,
    "keterangan": "Di dataran rendah, air tanah bisa kurang dari satu meter dari permukaan.",
    "gambar": "assets/img/milestones/muka-air.svg",
    "sumber": {
      "nama": "USGS Water Science School — Water table",
      "url": "https://www.usgs.gov/special-topics/water-science-school/science/water-table"
    },
    "perluVerifikasi": true,
    "catatan": "Muka air tanah bisa muncul di permukaan pada dataran rendah; 0,9 m hanya contoh, bukan rata-rata."
  },
  {
    "id": 11,
    "lapisan": 3,
    "nama": "Cacing anecic",
    "jenis": "makhluk",
    "kedalaman": 1.2,
    "label": "1,2 m",
    "at": 0.75,
    "keterangan": "Lumbricus terrestris membuat liang vertikal 1–2 m dan naik ke permukaan untuk makan.",
    "gambar": "assets/img/milestones/cacing-anecic.svg",
    "sumber": {
      "nama": "European Journal of Soil Biology (2024) — Lumbricus terrestris burrowing",
      "url": "https://doi.org/10.1016/j.ejsobi.2024.103595"
    },
    "perluVerifikasi": true,
    "catatan": "Liang 1–2 m berasal dari literatur Lumbricus terrestris; kedalaman tergantung tekstur tanah dan musim."
  },
  {
    "id": 12,
    "lapisan": 3,
    "nama": "Lapisan besi",
    "jenis": "fenomena alam",
    "kedalaman": 1.45,
    "label": "1,5 m",
    "at": 0.9583,
    "keterangan": "Warna karat menandai besi yang teroksidasi lalu mengendap di pori tanah.",
    "gambar": "assets/img/milestones/lapisan-besi.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Soil horizon",
      "url": "https://www.britannica.com/science/soil-horizon"
    }
  },
  {
    "id": 13,
    "lapisan": 4,
    "nama": "Sumur gali",
    "jenis": "rekor manusia",
    "kedalaman": 8,
    "label": "8 m",
    "at": 0.2281,
    "keterangan": "Sumur gali tradisional biasanya belasan meter; kedalamannya mengikuti muka air tanah.",
    "gambar": "assets/img/milestones/sumur.svg",
    "sumber": {
      "nama": "USGS Water Science School — Groundwater wells",
      "url": "https://www.usgs.gov/special-topics/water-science-school/science/groundwater-wells"
    },
    "perluVerifikasi": true,
    "catatan": "Sumur gali tradisional umumnya belasan meter, tetapi kedalamannya mengikuti muka air setempat."
  },
  {
    "id": 14,
    "lapisan": 4,
    "nama": "Akar mesquite",
    "jenis": "tumbuhan",
    "kedalaman": 15,
    "label": "15 m",
    "at": 0.4737,
    "keterangan": "Mesquite gurun mengirim akar lebih dari 15 m untuk mencapai air.",
    "gambar": "assets/img/milestones/akar-mesquite.svg",
    "sumber": {
      "nama": "Encyclopaedia Britannica — Mesquite",
      "url": "https://www.britannica.com/plant/mesquite"
    },
    "perluVerifikasi": true,
    "catatan": "\"Lebih dari 15 m\" adalah rentang, bukan rekor. Mesquite dapat mengirim akar sampai puluhan meter."
  },
  {
    "id": 15,
    "lapisan": 4,
    "nama": "Akuifer dangkal",
    "jenis": "fenomena alam",
    "kedalaman": 22,
    "label": "22 m",
    "at": 0.7193,
    "keterangan": "Pasir dan kerikil berpori menyimpan air yang bisa dipompa ke permukaan.",
    "gambar": "assets/img/milestones/akuifer.svg",
    "sumber": {
      "nama": "USGS Water Science School — Aquifers and groundwater",
      "url": "https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater"
    }
  },
  {
    "id": 16,
    "lapisan": 4,
    "nama": "Gua karst",
    "jenis": "fenomena alam",
    "kedalaman": 28,
    "label": "28 m",
    "at": 0.9298,
    "keterangan": "Air yang melarutkan gamping menciptakan rongga, lorong, dan stalaktit.",
    "gambar": "assets/img/milestones/gua-karst.svg",
    "sumber": {
      "nama": "National Park Service — Karst landscapes",
      "url": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
    },
    "perluVerifikasi": true,
    "catatan": "Kedalaman 28 m adalah titik wakil. Gua karst bisa jauh lebih dalam, dan atapnya bisa lebih dekat ke permukaan."
  },
  {
    "id": 17,
    "lapisan": 5,
    "nama": "Terowongan Channel",
    "jenis": "rekor manusia",
    "kedalaman": 100,
    "label": "100 m",
    "at": 0.1489,
    "keterangan": "Di titik terendahnya, jalur kereta bawah laut ini 75 m di bawah permukaan laut.",
    "gambar": "assets/img/milestones/channel.svg",
    "sumber": {
      "nama": "The Geological Society — Channel Tunnel",
      "url": "https://www.geolsoc.org.uk/science-and-policy/100-great-geosites/industrial-and-economic-importance/channel-tunnel"
    },
    "perluVerifikasi": true,
    "catatan": "75 m adalah titik terendah jalur kereta di bawah permukaan laut, bukan kedalaman dari permukaan tanah."
  },
  {
    "id": 18,
    "lapisan": 5,
    "nama": "Akar fig Echo Caves",
    "jenis": "tumbuhan",
    "kedalaman": 120,
    "label": "120 m",
    "at": 0.1915,
    "keterangan": "Akar fig liar di Afrika Selatan tercatat menembus 120 m lewat celah batu.",
    "gambar": "assets/img/milestones/akar-fig.svg",
    "sumber": {
      "nama": "Guinness World Records — Greatest root depth",
      "url": "https://www.guinnessworldrecords.com/world-records/66407-greatest-root-depth"
    },
    "perluVerifikasi": true,
    "catatan": "Rekor 120 m berasal dari Guinness; rekor bisa diperbarui."
  },
  {
    "id": 19,
    "lapisan": 5,
    "nama": "Akuifer artesis",
    "jenis": "fenomena alam",
    "kedalaman": 300,
    "label": "300 m",
    "at": 0.5745,
    "keterangan": "Air terkurung di antara lapisan kedap bisa naik sendiri saat dibor.",
    "gambar": "assets/img/milestones/akuifer-artesis.svg",
    "sumber": {
      "nama": "USGS Water Science School — Artesian water",
      "url": "https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells"
    }
  },
  {
    "id": 20,
    "lapisan": 6,
    "nama": "Gua Veryovkina",
    "jenis": "fenomena alam",
    "kedalaman": 2209,
    "label": "2,2 km",
    "at": 0.0495,
    "keterangan": "Gua terdalam yang diketahui, di Abkhazia. Kedalaman resminya masih diperbarui antar ekspedisi.",
    "gambar": "assets/img/milestones/veryovkina.svg",
    "sumber": {
      "nama": "Guinness World Records — Deepest cave",
      "url": "https://www.guinnessworldrecords.com/world-records/deepest-cave"
    },
    "perluVerifikasi": true,
    "catatan": "Rekor Guinness diperbarui setelah ekspedisi 2024 menjadi 2.209 m; angka dapat berubah bila ada penemuan jalur baru."
  },
  {
    "id": 21,
    "lapisan": 6,
    "nama": "Mikroba batuan dalam",
    "jenis": "makhluk",
    "kedalaman": 2800,
    "label": "2,8 km",
    "at": 0.0667,
    "keterangan": "Di air retakan Mponeng, satu spesies bakteri hidup tanpa cahaya dan oksigen bebas.",
    "gambar": "assets/img/milestones/mikroba.svg",
    "sumber": {
      "nama": "The ISME Journal (2021) — Deep subsurface microbial lineage",
      "url": "https://www.nature.com/articles/s41396-021-00965-3"
    },
    "perluVerifikasi": true,
    "catatan": "2.800 m adalah kedalaman sampel air retakan, bukan batas sebaran mikroba."
  },
  {
    "id": 22,
    "lapisan": 6,
    "nama": "Tambang Mponeng",
    "jenis": "rekor manusia",
    "kedalaman": 3891,
    "label": "3,9 km",
    "at": 0.0983,
    "keterangan": "Tambang emas terdalam di dunia, dengan batuan kerja di bawah 3,8 km.",
    "gambar": "assets/img/milestones/mponeng.svg",
    "sumber": {
      "nama": "Harmony Gold — Mponeng Mine",
      "url": "https://www.harmony.co.za/operations/south-africa/underground/mponeng/"
    },
    "perluVerifikasi": true,
    "catatan": "3.891 m adalah kedalaman operasi terdalam Mponeng menurut Harmony; bisa berbeda dari kedalaman poros total."
  },
  {
    "id": 23,
    "lapisan": 6,
    "nama": "Gempa dangkal",
    "jenis": "fenomena alam",
    "kedalaman": 10000,
    "label": "10 km",
    "at": 0.2754,
    "keterangan": "Sebagian besar gempa merusak terjadi di kerak atas, pada kedalaman sekitar 10 km.",
    "gambar": "assets/img/milestones/gempa.svg",
    "sumber": {
      "nama": "USGS Earthquake Hazards Program — Earthquake depth",
      "url": "https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake"
    },
    "perluVerifikasi": true,
    "catatan": "10 km adalah kedalaman wakil. Gempa merusak umumnya 5–15 km, tetapi bisa jauh lebih dangkal atau lebih dalam."
  },
  {
    "id": 24,
    "lapisan": 6,
    "nama": "Kola Superdeep Borehole",
    "jenis": "rekor manusia",
    "kedalaman": 12262,
    "label": "12 km",
    "at": 0.3409,
    "keterangan": "Lubang vertikal terdalam buatan manusia. Panas dan batuan retak menghentikannya.",
    "gambar": "assets/img/milestones/kola.svg",
    "sumber": {
      "nama": "AAPG Explorer — The deepest and longest wells",
      "url": "https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/"
    },
    "perluVerifikasi": true,
    "catatan": "12.262 m adalah kedalaman vertikal lubang SG-3 pada 1989; laporan lain menyebut panjang lubang yang sedikit berbeda."
  },
  {
    "id": 25,
    "lapisan": 6,
    "nama": "Batas Moho",
    "jenis": "fenomena alam",
    "kedalaman": 35000,
    "label": "35 km",
    "at": 0.96,
    "keterangan": "Batas kerak dan mantel. Di bawah benua, rata-ratanya sekitar 35 km.",
    "gambar": "assets/img/milestones/moho.svg",
    "sumber": {
      "nama": "Geology.com — Mohorovičić discontinuity",
      "url": "https://geology.com/articles/mohorovicic-discontinuity.shtml"
    },
    "perluVerifikasi": true,
    "catatan": "35 km adalah rata-rata kerak benua. Di bawah pegunungan bisa 50–70 km; di bawah samudra 5–10 km."
  }
];
