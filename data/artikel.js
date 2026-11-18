/*
  data/artikel.js — delapan tulisan editorial.

  Field:
    id, slug        penanda unik; slug dipakai sebagai nama file artikel/{slug}.html
    lapisan         id lapisan di data/lapisan.js
    lapisanSlug, lapisanNama  untuk label dan filter
    judul, dek      judul dan ringkasan satu–dua kalimat
    sudut           'Cerita' | 'Penjelasan proses' | 'Dampak lingkungan' | ...
    penulis, tanggal, menit, kata
    gambar          sampul WebP; gambarCadangan = SVG asli
    ringkasan30     array 3 kalimat untuk kotak "Ringkasan 30 detik"
    tahukah         { teks, sumber: {nama,url} }
    kutipan         kutipan pendek untuk ditarik ke samping teks
    glosarium       [{istilah, arti}] — istilah pertama di teks diberi tooltip
    isi             HTML tepercaya; hanya tag p, h2, h3, blockquote, ul, ol, li,
                    strong, em, a, br. Jangan menempel HTML dari sumber lain.
    sumber          [{nama,url}] — wajib, tampil di akhir artikel

  Contoh entri:
    { id: 99, slug: 'contoh-artikel', lapisan: 2, lapisanSlug: 'tanah-atas',
      judul: '...', dek: '...', sudut: 'Cerita', penulis: 'Tim Bumi Bawah',
      tanggal: '2026-01-01', menit: 3, kata: 420, ringkasan30: ['...','...','...'],
      tahukah: { teks: '...', sumber: { nama: '...', url: 'https://...' } },
      kutipan: '...', glosarium: [{ istilah: '...', arti: '...' }],
      isi: '<p>...</p>', sumber: [{ nama: '...', url: 'https://...' }] }
*/
window.DATA_ARTIKEL = [
  {
    "id": 1,
    "lapisan": 1,
    "lapisanSlug": "serasah-humus",
    "lapisanNama": "Serasah dan humus",
    "judul": "Daun yang jatuh bukan sampah",
    "slug": "daun-yang-jatuh-bukan-sampah",
    "sudut": "Cerita",
    "dek": "Lapisan setipis 10 cm di bawah kaki adalah tempat daun berubah menjadi tanah. Prosesnya lebih lambat dari yang kita kira.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-09-02",
    "menit": 2,
    "kata": 338,
    "gambar": "assets/img/artikel/serasah.webp",
    "gambarCadangan": "assets/img/artikel/serasah.svg",
    "ringkasan30": [
      "Serasah adalah bahan mentah tanah, bukan sampah yang perlu disapu.",
      "Cacing, jamur, dan bakteri bekerja berurutan memecah daun menjadi humus.",
      "Humus menyimpan air dan karbon; memadatkan tanah mempercepat hilangnya."
    ],
    "tahukah": {
      "teks": "Satu sendok tanah dapat berisi miliaran bakteri, dan sebagian besar pekerjaan pembusukan terjadi di 10 cm teratas.",
      "sumber": {
        "nama": "Encyclopaedia Britannica — Bacteria",
        "url": "https://www.britannica.com/science/bacteria"
      }
    },
    "kutipan": "Tanah bukan wadah pasif. Ia sedang bekerja setiap saat, bahkan ketika kita tidak melihatnya.",
    "glosarium": [
      {
        "istilah": "humus",
        "arti": "Bahan organik gelap yang sudah terurai stabil dan membantu tanah menahan air serta hara."
      },
      {
        "istilah": "serasah",
        "arti": "Lapisan daun, ranting, dan sisa tumbuhan yang menutup permukaan tanah."
      },
      {
        "istilah": "agregat tanah",
        "arti": "Gumpalan butiran tanah yang saling terikat; ruang di antaranya menyimpan air dan udara."
      }
    ],
    "isi": "<p>Di lantai hutan, daun yang gugur tidak langsung menjadi tanah. Ia harus melewati antrean. Cacing dan rayap mencacah jaringan daun, bakteri dan jamur memecah senyawa organik, lalu sisa yang tidak habis bercampur dengan mineral. Hasil akhirnya disebut humus: bahan organik gelap yang membuat tanah mampu menahan air dan hara.</p>\n<h2>Antrean di balik sehelai daun</h2>\n<p>Urutan kerjanya cukup rapi. Serasah menumpuk di permukaan, lalu hewan kecil merobeknya menjadi potongan lebih halus. Jamur mengirim hifa ke dalam jaringan yang sudah lembap, sementara bakteri bekerja di pori-pori yang lebih kecil. Cacing memakan campuran itu dan mengeluarkannya kembali sebagai agregat tanah yang lebih stabil. Setiap pekerja membuka jalan bagi pekerja berikutnya.</p>\n<p>Kecepatan proses ini bergantung pada suhu, kelembapan, dan siapa yang bekerja. Di hutan tropis yang lembap, sehelai daun bisa habis dalam hitungan minggu. Di hutan pinus yang dingin, jarum dapat bertahan bertahun-tahun dan membentuk lapisan asam yang tipis. Karena itu, tanah di dua tempat tidak pernah sama meskipun berasal dari batuan yang serupa.</p>\n<h2>Humus bukan sekadar pupuk</h2>\n<p>Struktur humus seperti spons. Ia menyimpan air di ruang-ruang kecil dan melepaskannya perlahan, sehingga tanaman tidak langsung kekeringan setelah hujan berhenti. Tanah yang kaya humus juga lebih gembur, sehingga akar bisa menembus tanpa harus memecah lapisan yang padat. Ketika humus hilang, air hujan cenderung mengalir di permukaan dan membawa tanah bersamanya.</p>\n<p>Humus juga menyimpan karbon. Semakin lambat bahan organik membusuk, semakin lama karbon itu tertahan di tanah. Di lahan yang terus dibalik dan dibersihkan, proses pembusukan dipercepat dan karbon kembali ke udara. Menjaga serasah berarti menjaga penyimpanan yang berjalan tanpa biaya.</p>\n<h2>Ancaman yang terlihat sepele</h2>\n<p>Kita menyapu daun dari halaman, memadatkan tanah dengan kendaraan, atau membiarkan api menjalar. Semua itu mempercepat hilangnya bahan organik. Pemadatan juga berbahaya karena menutup pori-pori yang dipakai air dan udara, sehingga hewan tanah kehilangan tempat hidup dan akar sulit bernapas.</p>\n<p>Cara menjaganya tidak rumit: biarkan serasah menutup tanah, kurangi pengolahan yang membalik lapisan, dan jangan menutup seluruh permukaan dengan beton. Satu hal yang mudah dilupakan: tanah bukan wadah pasif. Ia sedang bekerja setiap saat, bahkan ketika kita tidak melihatnya.</p>",
    "sumber": [
      {
        "nama": "Encyclopaedia Britannica — Earthworm",
        "url": "https://www.britannica.com/animal/earthworm"
      },
      {
        "nama": "Encyclopaedia Britannica — Humus",
        "url": "https://www.britannica.com/science/humus"
      },
      {
        "nama": "USGS Water Science School — Water table",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/water-table"
      }
    ]
  },
  {
    "id": 2,
    "lapisan": 2,
    "lapisanSlug": "tanah-atas",
    "lapisanNama": "Tanah atas",
    "judul": "Dapur di 20 sentimeter pertama",
    "slug": "dapur-20-sentimeter",
    "sudut": "Penjelasan proses",
    "dek": "Tanah atas adalah lapisan paling produktif dan paling cepat rusak. Di sinilah air, akar, dan kehidupan bertemu.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-09-08",
    "menit": 2,
    "kata": 305,
    "gambar": "assets/img/artikel/tanah-atas.webp",
    "gambarCadangan": "assets/img/artikel/tanah-atas.svg",
    "ringkasan30": [
      "Tanah atas adalah 20–30 cm tempat akar, air, dan kehidupan tanah bertemu.",
      "Struktur gembur menentukan apakah hujan meresap atau mengalir membawa tanah.",
      "Menutup tanah dengan mulsa dan mengurangi pengolahan menjaga lapisan ini."
    ],
    "tahukah": {
      "teks": "Sebagian besar akar tanaman pangan tumbuh di 30 cm teratas, lapisan yang paling cepat berubah karena olah tanah.",
      "sumber": {
        "nama": "Encyclopaedia Britannica — Root",
        "url": "https://www.britannica.com/science/root-plant"
      }
    },
    "kutipan": "Erosi jarang dimulai dari hujan yang deras, tetapi dari tanah yang tidak siap menerima hujan.",
    "glosarium": [
      {
        "istilah": "erosi",
        "arti": "Perpindahan tanah oleh air, angin, atau gaya lain dari tempat asalnya."
      },
      {
        "istilah": "mulsa",
        "arti": "Lapisan bahan organik atau buatan yang menutup permukaan tanah."
      },
      {
        "istilah": "struktur tanah",
        "arti": "Cara butiran tanah menggumpal dan menyusun ruang pori di antaranya."
      }
    ],
    "isi": "<p>Sebagian besar akar tanaman pangan tumbuh di 30 cm teratas. Di lapisan yang sama, cacing membuat liang, jamur membentuk jaringan, dan bakteri mengubah nitrogen menjadi bentuk yang bisa dipakai tanaman. Tanah atas adalah ruang kerja paling sibuk di bawah permukaan.</p>\n<h2>Campuran yang butuh waktu</h2>\n<p>Lapisan ini terbentuk dari pencampuran bahan organik dan mineral. Prosesnya tidak cepat. Di banyak tempat, pembentukan tanah yang bisa ditanami membutuhkan puluhan hingga ratusan tahun, sementara kehilangannya bisa terjadi dalam beberapa musim hujan. Warna gelap pada tanah atas adalah tanda humus yang sudah tercampur, bukan sekadar tanah yang basah.</p>\n<p>Struktur tanah menentukan nasib air. Tanah yang menggumpal memiliki ruang di antara butirannya, sehingga air hujan masuk dan disimpan. Tanah yang dipadatkan kehilangan ruang itu; air mengalir di permukaan, memecah agregat, dan membawa bagian paling subur pergi. Erosi jarang dimulai dari hujan yang deras, tetapi dari tanah yang tidak siap menerima hujan.</p>\n<h2>Erosi dan bahan kimia</h2>\n<p>Ketika tanah dibiarkan terbuka, butir hujan memecah permukaannya, lalu aliran permukaan membawa tanah ke saluran dan sungai. Lereng yang gundul kehilangan tanah atas jauh lebih cepat daripada lereng yang ditutup tumbuhan. Pupuk dan pestisida menambah masalah lain: bahan yang tidak terserap bisa larut dan masuk ke air tanah, sedangkan residunya tertinggal di lapisan yang paling sering diolah.</p>\n<p>Pemadatan oleh kendaraan berat dan ternak juga mengurangi ruang pori. Tanah yang padat lebih sulit ditembus akar, lebih cepat panas, dan lebih mudah kehilangan air. Perbaikan tanah yang padat butuh waktu lama karena struktur yang rusak tidak kembali hanya dengan menambahkan pupuk.</p>\n<h2>Yang bisa dilakukan</h2>\n<p>Ada cara yang sudah terbukti: menutup tanah dengan mulsa atau tanaman penutup, mengurangi pengolahan, dan membuat teras pada lereng. Semua itu menjaga struktur tanah, memperlambat aliran air, dan memberi waktu bagi bahan organik untuk kembali. Tanah atas hanya beberapa sentimeter, tetapi keputusan kita tentang cara mengelolanya menentukan apakah hujan menjadi cadangan air atau bencana.</p>",
    "sumber": [
      {
        "nama": "Encyclopaedia Britannica — Soil horizon",
        "url": "https://www.britannica.com/science/soil-horizon"
      },
      {
        "nama": "Encyclopaedia Britannica — Rhizome",
        "url": "https://www.britannica.com/science/rhizome"
      },
      {
        "nama": "USGS Water Science School — Aquifers and groundwater",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater"
      }
    ]
  },
  {
    "id": 3,
    "lapisan": 3,
    "lapisanSlug": "tanah-bawah",
    "lapisanNama": "Tanah bawah",
    "judul": "Air yang bergerak tanpa suara",
    "slug": "air-yang-bergerak-tanpa-suara",
    "sudut": "Dampak lingkungan",
    "dek": "Di tanah bawah, air bergerak pelan sambil membawa mineral dan polutan. Lapisan ini menyimpan cerita tentang apa yang kita buang.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-09-14",
    "menit": 2,
    "kata": 357,
    "gambar": "assets/img/artikel/tanah-bawah.webp",
    "gambarCadangan": "assets/img/artikel/tanah-bawah.svg",
    "ringkasan30": [
      "Air bergerak pelan di tanah bawah sambil membawa mineral dan polutan.",
      "Lempung memperlambat perjalanan air; pasir dan kerikil meneruskannya cepat.",
      "Sumur dangkal dan muka air tanah membuat kualitas air cepat berubah."
    ],
    "tahukah": {
      "teks": "Di dataran rendah, muka air tanah bisa kurang dari satu meter dari permukaan, sehingga polutan di permukaan cepat sampai ke air.",
      "sumber": {
        "nama": "USGS Water Science School — Water table",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/water-table"
      }
    },
    "kutipan": "Tanpa catatan, kerusakan air tanah baru terasa setelah sumur berbau atau warga sakit.",
    "glosarium": [
      {
        "istilah": "muka air tanah",
        "arti": "Batas atas zona jenuh air di dalam tanah atau batuan."
      },
      {
        "istilah": "akuifer",
        "arti": "Lapisan batuan atau sedimen berpori yang dapat menyimpan dan mengalirkan air."
      },
      {
        "istilah": "nitrat",
        "arti": "Senyawa nitrogen yang larut dalam air dan sering berasal dari pupuk atau limbah."
      }
    ],
    "isi": "<p>Tanah bawah dimulai di sekitar 30 cm dan bisa mencapai satu setengah meter. Di sini akar halus mulai jarang, tetapi air tetap bergerak. Setiap hujan menambah air ke pori-pori tanah; sebagian ditahan, sebagian meresap lebih dalam, dan sebagian lagi mengalir ke saluran di bawah.</p>\n<h2>Air yang membawa barang</h2>\n<p>Ketika air bergerak turun, ia membawa larutan. Kalsium dan magnesium bisa mengendap dan membentuk lapisan keras. Nitrat dari pupuk bisa ikut turun dan mencemari sumur. Karena itu, tanah bawah bukan penyaring yang tak terbatas. Kemampuannya menahan polutan bergantung pada jenis tanah, kedalaman muka air, dan berapa lama bahan itu berada di sana.</p>\n<p>Lapisan lempung yang rapat bisa memperlambat perjalanan air selama bertahun-tahun. Sebaliknya, pasir dan kerikil meneruskan air dengan cepat. Di daerah dengan batuan retak, air bisa mencapai kedalaman puluhan meter dalam waktu singkat dan membawa serta apa pun yang larut di permukaan. Perbedaan ini menjelaskan mengapa dua sumur yang berdekatan bisa punya kualitas air yang sangat berbeda.</p>\n<h2>Sumur dan muka air</h2>\n<p>Sumur dangkal sering mengambil air dari lapisan ini. Kalau sumur tidak ditutup rapat, air permukaan yang tercemar bisa masuk langsung. Memeriksa konstruksi sumur sama pentingnya dengan memeriksa sumber airnya. Muka air juga berubah sepanjang tahun: naik setelah musim hujan, turun saat kemarau, dan bisa turun permanen bila pengambilan melebihi pengisian.</p>\n<p>Di dataran rendah, muka air bisa kurang dari satu meter dari permukaan. Di tempat seperti itu, tanah bawah sangat dekat dengan aktivitas manusia, dan apa pun yang terjadi di permukaan cepat sampai ke air. Sebaliknya, di perbukitan, air harus menempuh perjalanan lebih panjang sebelum mencapai lapisan penyimpanan.</p>\n<h2>Yang tidak terlihat</h2>\n<p>Tanah bawah jarang menjadi pusat perhatian. Padahal di sinilah kualitas air yang kita minum mulai ditentukan. Memahami arah aliran, ketebalan lapisan, dan sumber pencemar di permukaan adalah pekerjaan yang membosankan tetapi jauh lebih murah daripada membersihkan air setelah tercemar.</p>\n<p>Pekerjaan itu biasanya dimulai dari hal sederhana: mencatat kedalaman sumur, menguji air secara berkala, dan memeriksa apakah ada septic tank atau kandang ternak yang terlalu dekat. Di banyak desa, data seperti ini belum pernah dikumpulkan. Padahal tanpa catatan, kerusakan air tanah baru terasa setelah sumur berbau atau warga sakit. Menjaga tanah bawah berarti menjaga catatan yang tidak terlihat.</p>",
    "sumber": [
      {
        "nama": "USGS Water Science School — Water table",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/water-table"
      },
      {
        "nama": "USGS Water Science School — Groundwater wells",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/groundwater-wells"
      },
      {
        "nama": "USGS Water Science School — Artesian water",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells"
      }
    ]
  },
  {
    "id": 4,
    "lapisan": 4,
    "lapisanSlug": "batuan-lapuk",
    "lapisanNama": "Batuan lapuk",
    "judul": "Batuan yang berubah jadi spons",
    "slug": "batuan-yang-berubah-jadi-spons",
    "sudut": "Proses",
    "dek": "Pelapukan mengubah batuan padat menjadi lapisan berpori yang menyimpan air. Di beberapa tempat, proses itu juga menciptakan gua.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-09-20",
    "menit": 2,
    "kata": 308,
    "gambar": "assets/img/artikel/batuan-lapuk.webp",
    "gambarCadangan": "assets/img/artikel/batuan-lapuk.svg",
    "ringkasan30": [
      "Pelapukan mengubah batuan padat menjadi lapisan berpori yang menyimpan air.",
      "Di batuan gamping, air melarutkan batuan dan membentuk lorong serta gua.",
      "Pengambilan air berlebihan menurunkan muka air dan bisa membuat tanah turun."
    ],
    "tahukah": {
      "teks": "Gua Veryovkina di Abkhazia tercatat sedalam 2.209 m setelah pengukuran ulang pada 2024.",
      "sumber": {
        "nama": "Guinness World Records — Deepest cave",
        "url": "https://www.guinnessworldrecords.com/world-records/deepest-cave"
      }
    },
    "kutipan": "Batuan lapuk adalah pengingat bahwa yang keras pun bisa berubah. Kita hanya perlu waktu yang lebih panjang untuk melihatnya.",
    "glosarium": [
      {
        "istilah": "karst",
        "arti": "Bentang alam yang terbentuk dari pelarutan batuan, umumnya gamping, oleh air."
      },
      {
        "istilah": "pelapukan",
        "arti": "Proses pemecahan batuan di tempat oleh cuaca, air, akar, dan reaksi kimia."
      },
      {
        "istilah": "akuifer",
        "arti": "Lapisan berpori yang menyimpan air dan dapat dialirkan ke sumur atau mata air."
      }
    ],
    "isi": "<p>Batuan tidak selamanya padat. Air yang membeku di celah, akar yang menekan, dan asam dari tumbuhan bekerja perlahan. Dalam skala ribuan tahun, batuan bisa pecah menjadi pasir, lempung, dan kerikil. Hasilnya adalah batuan lapuk: lapisan yang lebih mirip spons daripada batu.</p>\n<h2>Dari retakan menjadi akuifer</h2>\n<p>Rongga di antara pecahan menyimpan air. Itulah awal akuifer, cadangan air bawah tanah yang dipakai rumah, sawah, dan kota. Ketebalan batuan lapuk sangat bervariasi. Di beberapa tempat ia hanya beberapa meter; di tempat lain bisa puluhan meter, tergantung jenis batuan dan iklim. Semakin lama pelapukan berlangsung, semakin dalam air bisa tersimpan.</p>\n<p>Air di dalam akuifer tidak mengalir seperti sungai. Ia bergerak pelan di antara butiran, mengikuti perbedaan tekanan. Kecepatannya bisa beberapa sentimeter per hari, jauh lebih lambat daripada aliran permukaan. Karena lambat, pencemar yang masuk bisa bertahan lama dan menyebar ke sumur yang jauh.</p>\n<h2>Ketika air melarutkan batu</h2>\n<p>Pada batuan gamping, air tidak hanya mengisi rongga. Air melarutkan batuan itu sendiri, membentuk lorong dan gua. Prosesnya disebut karst. Sungai bisa hilang ke dalam tanah dan muncul kembali sebagai mata air di tempat lain. Karena aliran di karst cepat dan sulit diprediksi, pencemaran di permukaan bisa sampai ke sumber air dalam waktu singkat.</p>\n<p>Karst juga menyimpan air dalam jumlah besar, tetapi bukan di pori-pori kecil. Airnya terkumpul di saluran dan rongga yang saling terhubung. Kalau satu saluran tercemar, kualitas air di seluruh sistem bisa berubah. Memetakan jalur air di karst jauh lebih sulit daripada memetakan sungai di permukaan.</p>\n<h2>Mengambil tanpa menghabiskan</h2>\n<p>Mengambil air dari lapisan ini berlebihan akan menurunkan muka air dan membuat tanah di atasnya turun. Di daerah pesisir, air laut bisa masuk dan membuat sumur menjadi asin. Memetakan akuifer sebelum mengebor adalah langkah yang jauh lebih murah daripada memperbaiki kesalahan setelah air habis. Batuan lapuk adalah pengingat bahwa yang keras pun bisa berubah. Kita hanya perlu waktu yang lebih panjang untuk melihatnya.</p>",
    "sumber": [
      {
        "nama": "National Park Service — Karst landscapes",
        "url": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
      },
      {
        "nama": "USGS Water Science School — Aquifers and groundwater",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater"
      },
      {
        "nama": "USGS Water Science School — Water table",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/water-table"
      }
    ]
  },
  {
    "id": 5,
    "lapisan": 5,
    "lapisanSlug": "batuan-dasar",
    "lapisanNama": "Batuan dasar",
    "judul": "Arsip keras di bawah kaki",
    "slug": "arsip-keras-di-bawah-kaki",
    "sudut": "Arsip",
    "dek": "Batuan dasar menyimpan catatan waktu, air purba, dan retakan yang menjadi rumah bagi mikroba.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-09-26",
    "menit": 2,
    "kata": 338,
    "gambar": "assets/img/artikel/batuan-dasar.webp",
    "gambarCadangan": "assets/img/artikel/batuan-dasar.svg",
    "ringkasan30": [
      "Batuan dasar bisa berupa granit, gamping, basal, atau batuan metamorf.",
      "Retakan menyimpan air purba dan menjadi rumah mikroba tanpa cahaya.",
      "Pengeboran yang tidak disegel dapat mencampur lapisan yang sebelumnya terpisah."
    ],
    "tahukah": {
      "teks": "Air di retakan batuan dasar bisa berumur jutaan tahun dan punya komposisi kimia berbeda dari air hujan.",
      "sumber": {
        "nama": "The ISME Journal (2021) — Deep subsurface microbial lineage",
        "url": "https://www.nature.com/articles/s41396-021-00965-3"
      }
    },
    "kutipan": "Sumur yang bocor dan tambang yang ditinggalkan adalah cara paling cepat merusak arsip yang butuh jutaan tahun untuk terbentuk.",
    "glosarium": [
      {
        "istilah": "batuan dasar",
        "arti": "Batuan padat di bawah tanah dan sedimen, menjadi fondasi lapisan di atasnya."
      },
      {
        "istilah": "sesar",
        "arti": "Retakan batuan tempat dua sisi bergerak relatif satu sama lain."
      },
      {
        "istilah": "litotrof",
        "arti": "Mikroba yang memperoleh energi dari reaksi kimia batuan atau gas, bukan cahaya."
      }
    ],
    "isi": "<p>Di bawah tanah dan batuan lapuk, ada batuan dasar. Ia bisa berupa granit, gamping, basal, atau batuan metamorf yang sudah mengalami panas dan tekanan. Batuan ini menjadi fondasi bagi bangunan, jalan, dan seluruh lapisan di atasnya.</p>\n<h2>Ruang di antara yang padat</h2>\n<p>Yang menarik justru bagian yang tidak padat. Retakan dan sesar membentuk jaringan ruang tempat air bisa mengalir dan bertahan. Di beberapa lokasi, air di retakan berumur jutaan tahun dan punya komposisi kimia yang berbeda dari air hujan. Air itu tidak selalu bisa diminum, tetapi menyimpan informasi tentang sejarah batuan dan iklim masa lalu.</p>\n<p>Retakan juga menjadi rumah bagi mikroba. Organisme ini tidak memakai cahaya matahari; mereka mengambil energi dari reaksi kimia antara air, batuan, dan gas. Prosesnya sangat lambat, tetapi berlangsung dalam rentang waktu yang sangat panjang. Di kedalaman beberapa kilometer, kehidupan tetap ada meskipun tanpa sinar matahari.</p>\n<h2>Pengeboran membuka pintu</h2>\n<p>Batuan dasar juga menjadi sasaran pengeboran. Sumur dalam mencari air, minyak, gas, atau panas bumi. Setiap pengeboran membuka jalur baru antara lapisan yang sebelumnya terpisah. Kalau sumur tidak disegel dengan benar, air asin atau polutan bisa berpindah ke akuifer yang dipakai manusia.</p>\n<p>Di permukaan, batuan dasar muncul sebagai pegunungan, tebing, atau lantai lembah. Dari sana kita bisa membaca lipatan dan patahan yang terbentuk jauh sebelum manusia ada. Tetapi membaca permukaan saja tidak cukup; sebagian besar sejarahnya tersembunyi di bawah.</p>\n<h2>Fondasi yang perlu dirawat</h2>\n<p>Batuan dasar bukan latar statis. Ia menyimpan air, panas, dan kehidupan yang berjalan sangat lambat. Memahaminya membantu kita mengambil sumber daya tanpa merusak sistem yang sulit pulih. Sumur yang bocor, tambang yang ditinggalkan, dan pengeboran yang tergesa-gesa adalah cara paling cepat untuk merusak arsip yang butuh jutaan tahun untuk terbentuk.</p>\n<p>Karena biaya pengeboran mahal, banyak keputusan tentang batuan dasar dibuat dari data yang sedikit. Satu lubang uji bisa mewakili wilayah yang sangat luas, padahal retakan di bawah tanah tidak tersebar merata. Di sinilah pemetaan geologi, pengukuran getaran, dan pencatatan sumur warga saling melengkapi. Tidak ada satu alat yang cukup, tetapi bersama-sama ketiganya memberi gambaran yang lebih jujur tentang apa yang ada di bawah.</p>",
    "sumber": [
      {
        "nama": "The ISME Journal (2021) — Deep subsurface microbial lineage",
        "url": "https://www.nature.com/articles/s41396-021-00965-3"
      },
      {
        "nama": "USGS Water Science School — Artesian water",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells"
      },
      {
        "nama": "AAPG Explorer — The deepest and longest wells",
        "url": "https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/"
      }
    ]
  },
  {
    "id": 6,
    "lapisan": 6,
    "lapisanSlug": "kerak-bumi",
    "lapisanNama": "Kerak bumi",
    "judul": "35 kilometer yang belum selesai dipetakan",
    "slug": "35-kilometer-yang-belum-selesai",
    "sudut": "Mitos vs fakta",
    "dek": "Kerak bumi adalah lapisan tipis tempat semua kehidupan berlangsung. Batasnya dengan mantel bernama Moho, dan belum ada bor yang menembusnya.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-10-02",
    "menit": 2,
    "kata": 319,
    "gambar": "assets/img/artikel/kerak-bumi.webp",
    "gambarCadangan": "assets/img/artikel/kerak-bumi.svg",
    "ringkasan30": [
      "Kerak benua rata-rata 35 km; kerak samudra hanya 5–10 km.",
      "Batas kerak dan mantel disebut Moho, ditemukan dari gelombang gempa pada 1909.",
      "Manusia belum pernah menembus Moho; Kola berhenti di 12.262 m."
    ],
    "tahukah": {
      "teks": "Kola Superdeep Borehole mencapai 12.262 m, sementara Moho di bawah benua rata-rata sekitar 35 km. Lubang itu baru menggores kulit bumi.",
      "sumber": {
        "nama": "AAPG Explorer — The deepest and longest wells",
        "url": "https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/"
      }
    },
    "kutipan": "Para ahli geologi tidak bekerja dengan jawaban akhir; mereka bekerja dengan perkiraan terbaik yang terus diuji.",
    "glosarium": [
      {
        "istilah": "Moho",
        "arti": "Diskontinuitas Mohorovičić, batas antara kerak bumi dan mantel."
      },
      {
        "istilah": "gelombang seismik",
        "arti": "Getaran yang merambat melalui bumi setelah gempa atau ledakan."
      },
      {
        "istilah": "kerak benua",
        "arti": "Bagian kerak yang membentuk benua, umumnya lebih tebal daripada kerak samudra."
      }
    ],
    "isi": "<p>Di bawah benua, kerak bumi rata-rata setebal 35 km. Di bawah samudra, ketebalannya hanya sekitar 5 sampai 10 km. Angka itu terdengar besar sampai dibandingkan dengan jari-jari bumi yang sekitar 6.371 km. Kerak hanyalah kulit tipis di permukaan planet.</p>\n<h2>Garis yang ditemukan dari gelombang</h2>\n<p>Batas antara kerak dan mantel disebut diskontinuitas Mohorovičić, atau Moho. Andrija Mohorovičić menemukannya pada 1909 dengan membaca perubahan kecepatan gelombang seismik setelah gempa. Gelombang merambat lebih cepat di mantel karena batuan di sana berbeda kepadatan dan komposisinya.</p>\n<p>Sejak itu, para ilmuwan memetakan Moho dengan gempa, ledakan, dan alat penerima di permukaan. Hasilnya bukan garis rata. Di bawah pegunungan, kerak bisa menebal sampai puluhan kilometer; di bawah lembah retak, ia menipis. Moho juga tidak selalu sama dengan batas batuan yang terlihat di permukaan.</p>\n<h2>Yang belum pernah ditembus</h2>\n<p>Manusia belum pernah menembus Moho. Lubang terdalam buatan manusia, Kola Superdeep Borehole, mencapai 12.262 m, masih jauh di atas batas itu. Panas, tekanan, dan batuan yang mudah runtuh membuat pengeboran semakin sulit seiring kedalaman.</p>\n<p>Karena tidak bisa melihat langsung, kita membaca kerak dari potongan batuan yang terangkat, dari getaran gempa, dan dari pengukuran di permukaan. Model yang dihasilkan terus diperbaiki ketika data baru masuk. Beberapa bagian kerak masih dipetakan dengan resolusi kasar, terutama di bawah samudra dan di daerah yang jarang dilalui alat seismik.</p>\n<h2>Rumah yang belum selesai dipahami</h2>\n<p>Kerak bumi adalah rumah kita, tetapi sebagian besar isinya belum kita lihat langsung. Yang kita punya adalah potongan batuan, gelombang, dan model yang terus diperbaiki. Itu cukup untuk membuat peta, tetapi belum cukup untuk mengatakan bahwa kita sudah selesai memahami bumi.</p>\n<p>Yang membuat pekerjaan ini menarik adalah ketidakpastiannya. Setiap gempa besar menambah data baru, dan setiap data baru bisa mengubah model yang sudah dipakai bertahun-tahun. Para ahli geologi tidak bekerja dengan jawaban akhir; mereka bekerja dengan perkiraan terbaik yang terus diuji. Sikap itu layak ditiru ketika kita membahas bumi: berani mengakui batas pengetahuan, tetapi tetap mengambil keputusan yang bisa dipertanggungjawabkan.</p>",
    "sumber": [
      {
        "nama": "Geology.com — Mohorovičić discontinuity",
        "url": "https://geology.com/articles/mohorovicic-discontinuity.shtml"
      },
      {
        "nama": "USGS Earthquake Hazards Program — Earthquake depth",
        "url": "https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake"
      },
      {
        "nama": "AAPG Explorer — The deepest and longest wells",
        "url": "https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/"
      }
    ]
  },
  {
    "id": 7,
    "lapisan": 6,
    "lapisanSlug": "kerak-bumi",
    "lapisanNama": "Kerak bumi",
    "judul": "Lubang 12.262 meter dan pelajaran dari Kola",
    "slug": "lubang-12262-meter",
    "sudut": "Sejarah sains",
    "dek": "Kola Superdeep Borehole adalah lubang vertikal terdalam buatan manusia. Ia tidak mencapai mantel, tetapi mengubah banyak hal yang kita kira tentang kerak bumi.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-10-08",
    "menit": 2,
    "kata": 348,
    "gambar": "assets/img/artikel/kola.webp",
    "gambarCadangan": "assets/img/artikel/kola.svg",
    "ringkasan30": [
      "Kola Superdeep Borehole adalah lubang vertikal terdalam buatan manusia.",
      "Batuan di kedalaman itu berair, mengandung gas, dan dihuni mikroba.",
      "Panas yang lebih tinggi dari perkiraan membuat pengeboran berhenti pada 1994."
    ],
    "tahukah": {
      "teks": "Suhu di dasar Kola mencapai sekitar 180 °C pada kedalaman sekitar 12 km, jauh lebih panas dari perkiraan awal proyek.",
      "sumber": {
        "nama": "AAPG Explorer — The deepest and longest wells",
        "url": "https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/"
      }
    },
    "kutipan": "Lubang itu tidak membuka pintu ke mantel, tetapi membuka mata tentang betapa sedikitnya yang kita tahu.",
    "glosarium": [
      {
        "istilah": "lubang bor",
        "arti": "Lubang sempit yang dibuat dengan bor untuk mengambil sampel atau mengakses bawah permukaan."
      },
      {
        "istilah": "lumpur bor",
        "arti": "Cairan yang disirkulasikan saat mengebor untuk mendinginkan bor dan mengangkat serpihan batuan."
      },
      {
        "istilah": "gradien panas",
        "arti": "Kenaikan suhu per satuan kedalaman di dalam bumi."
      }
    ],
    "isi": "<p>Proyek pengeboran Kola dimulai di Semenanjung Kola, Rusia, pada 1970. Tujuannya ilmiah: melihat langsung batuan kerak bumi yang dalam. Setelah bertahun-tahun dan beberapa kali kegagalan, salah satu cabang lubang mencapai kedalaman vertikal 12.262 m pada 1989.</p>\n<h2>Sebanding apa?</h2>\n<p>Angka itu membuat Kola menjadi lubang vertikal terdalam buatan manusia. Sebagai perbandingan, Palung Mariana di lautan sedalam sekitar 10,9 km. Kola lebih dalam, tetapi tetap belum menyentuh batas kerak-mantel yang di bawah benua rata-rata sekitar 35 km. Kalau bumi diibaratkan apel, lubang ini baru menggores kulitnya.</p>\n<p>Yang ditemukan justru mengejutkan. Batuan di kedalaman itu tidak kering dan steril. Ada air di retakan, gas hidrogen, dan mikroba. Suhu di dasar lubang jauh lebih tinggi dari perkiraan awal, mencapai sekitar 180 °C pada kedalaman sekitar 12 km. Panas dan batuan yang retak membuat bor sering macet.</p>\n<h2>Berhenti, lalu terlupakan</h2>\n<p>Pada 1994, pengeboran berhenti. Sejak itu, lubang ditutup dengan pelat logam dan situsnya terbengkalai. Kisah Kola sering dibumbui cerita tentang suara dari neraka, tetapi catatan proyeknya jauh lebih menarik: batuan yang berair, panas yang tidak terduga, dan batas teknologi manusia.</p>\n<p>Temperatur yang lebih tinggi dari perkiraan bukan sekadar catatan teknis. Panas memengaruhi sifat batuan, umur alat bor, dan biaya operasi. Di kedalaman seperti itu, setiap derajat tambahan membuat pengeboran lebih lambat dan lebih mahal. Batas kedalaman bukan hanya soal panjang pipa, tetapi juga soal bahan dan pendinginan.</p>\n<h2>Dua pelajaran</h2>\n<p>Kola mengajarkan dua hal. Pertama, kerak bumi jauh lebih rumit daripada lapisan pada diagram. Kedua, jarak 12 km terdengar besar bagi kita, tetapi sangat kecil bagi planet ini. Lubang itu tidak membuka pintu ke mantel, tetapi membuka mata tentang betapa sedikitnya yang kita tahu.</p>\n<p>Sejak Kola ditutup, teknologi bor sudah berubah. Alat baru memakai sensor yang lebih baik, lumpur bor yang lebih tahan panas, dan pipa yang lebih kuat. Tetapi batasnya tetap sama: semakin dalam, semakin panas dan semakin mudah batuan runtuh. Proyek pengeboran ilmiah hari ini lebih sering memilih target yang lebih dangkal dan lebih terarah, bukan mengejar rekor kedalaman. Pelajaran dari Kola bukan tentang siapa yang bisa menggali paling dalam, melainkan tentang seberapa jauh kita bersedia mendengar apa yang ditemukan di sana.</p>",
    "sumber": [
      {
        "nama": "AAPG Explorer — The deepest and longest wells",
        "url": "https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/"
      },
      {
        "nama": "The ISME Journal (2021) — Deep subsurface microbial lineage",
        "url": "https://www.nature.com/articles/s41396-021-00965-3"
      },
      {
        "nama": "USGS Earthquake Hazards Program — Earthquake depth",
        "url": "https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake"
      }
    ]
  },
  {
    "id": 8,
    "lapisan": 4,
    "lapisanSlug": "batuan-lapuk",
    "lapisanNama": "Batuan lapuk",
    "judul": "Kenapa gua bisa sedalam dua kilometer?",
    "slug": "kenapa-gua-bisa-dalam-dua-kilometer",
    "sudut": "Penjelasan proses",
    "dek": "Gua terdalam di dunia turun lebih dari 2 km. Pembentuknya bukan gempa, melainkan air yang bekerja sangat lama.",
    "penulis": "Tim Bumi Bawah",
    "tanggal": "2026-10-14",
    "menit": 2,
    "kata": 334,
    "gambar": "assets/img/artikel/gua.webp",
    "gambarCadangan": "assets/img/artikel/gua.svg",
    "ringkasan30": [
      "Gua terbentuk ketika air yang sedikit asam melarutkan batuan gamping.",
      "Kedalaman gua dihitung dari titik masuk tertinggi ke titik terendah yang bisa dicapai.",
      "Aliran di gua karst cepat, sehingga pencemaran permukaan mudah masuk ke sumber air."
    ],
    "tahukah": {
      "teks": "Gua Veryovkina sedalam 2.209 m; Gua Krubera di kawasan yang sama juga berada di kisaran 2,2 km.",
      "sumber": {
        "nama": "Guinness World Records — Deepest cave",
        "url": "https://www.guinnessworldrecords.com/world-records/deepest-cave"
      }
    },
    "kutipan": "Bagi manusia, gua adalah tempat eksplorasi. Bagi air, gua hanyalah jalan yang terus melebar.",
    "glosarium": [
      {
        "istilah": "karst",
        "arti": "Bentang alam berbatuan mudah larut dengan gua, lorong, dan mata air bawah tanah."
      },
      {
        "istilah": "stalaktit",
        "arti": "Endapan kalsium yang tumbuh menggantung dari atap gua."
      },
      {
        "istilah": "stalagmit",
        "arti": "Endapan kalsium yang tumbuh dari lantai gua ke atas."
      }
    ],
    "isi": "<p>Gua biasanya terbentuk di batuan yang mudah larut, terutama gamping. Air hujan yang menyerap karbon dioksida dari udara dan tanah menjadi sedikit asam. Saat meresap ke celah batuan, air itu melarutkan mineral secara perlahan. Dari retakan kecil, jalur air melebar menjadi lorong.</p>\n<h2>Air yang tidak pernah terburu-buru</h2>\n<p>Prosesnya butuh waktu lama, tetapi hasilnya bisa sangat dalam. Gua Veryovkina di Abkhazia tercatat sedalam 2.209 m pada pengukuran 2024. Angka ini sempat berubah beberapa kali karena ekspedisi menemukan jalur baru atau mengukur ulang dengan alat yang lebih presisi. Gua Krubera di kawasan yang sama juga berada di kisaran 2,2 km.</p>\n<p>Kedalaman gua dihitung dari titik masuk tertinggi sampai titik terendah yang bisa dicapai, bukan dari permukaan laut. Karena itu, gua di pegunungan bisa punya kedalaman vertikal besar meskipun pintunya berada jauh di atas laut. Dua gua yang pintunya berbeda ketinggian bisa punya kedalaman yang sama sekali berbeda.</p>\n<h2>Air di dalam batu</h2>\n<p>Di dalam gua, air terus bekerja. Banjir bawah tanah bisa datang cepat setelah hujan di permukaan, bahkan di lorong yang tampak kering. Endapan kalsium membentuk stalaktit dan stalagmit, tetapi pertumbuhannya sangat lambat. Satu sentimeter bisa memakan puluhan hingga ratusan tahun, tergantung kondisi.</p>\n<p>Gua juga menjadi jalan masuk air ke akuifer karst. Sungai permukaan bisa hilang ke dalam tanah, mengalir di lorong bawah tanah, lalu muncul lagi di mata air yang jauh. Karena jalurnya cepat, pencemaran di permukaan bisa sampai ke sumber air minum tanpa banyak tersaring.</p>\n<h2>Kesabaran yang mengalahkan batu</h2>\n<p>Gua adalah pengingat bahwa air punya kesabaran yang tidak kita miliki. Ia tidak perlu mengebor; cukup mengalir di celah yang sama selama ribuan tahun. Bagi manusia, gua adalah tempat eksplorasi. Bagi air, gua hanyalah jalan yang terus melebar.</p>\n<p>Kesabaran itu juga berarti gua sulit dipulihkan. Kalau endapan kalsium dipatahkan atau aliran air dialihkan, bekasnya bertahan sangat lama. Wisata gua yang tidak diatur bisa membawa lumpur, sampah, dan cahaya yang mengubah kehidupan di dalamnya. Menjaga gua berarti membatasi jumlah pengunjung, memakai jalur yang sudah ada, dan tidak menyentuh formasi yang tumbuh lebih lambat daripada usia kita.</p>",
    "sumber": [
      {
        "nama": "Guinness World Records — Deepest cave",
        "url": "https://www.guinnessworldrecords.com/world-records/deepest-cave"
      },
      {
        "nama": "National Park Service — Karst landscapes",
        "url": "https://www.nps.gov/subjects/caves/karst-landscapes.htm"
      },
      {
        "nama": "USGS Water Science School — Aquifers and groundwater",
        "url": "https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater"
      }
    ]
  }
];
