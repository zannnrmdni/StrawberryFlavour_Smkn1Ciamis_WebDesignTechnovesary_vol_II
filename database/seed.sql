-- Bumi Bawah — data awal (tahap 2)
-- Semua angka besar punya sumber. Angka yang tidak pasti ditulis sebagai
-- rentang dan diberi catatan "perlu diverifikasi" tepat di atas barisnya.
-- Import setelah schema.sql: mysql -u root -p dalam_bumi < database/seed.sql

USE dalam_bumi;
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE login_attempts;
TRUNCATE TABLE messages;
TRUNCATE TABLE gallery;
TRUNCATE TABLE articles;
TRUNCATE TABLE milestones;
TRUNCATE TABLE layers;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------------
-- Lapisan
-- Suhu adalah perkiraan rentang musiman di kedalaman tersebut, bukan angka
-- tunggal. Nilai mengikuti sumber penanda di lapisan yang sama.
-- ---------------------------------------------------------------------------

INSERT INTO layers
    (id, nama, slug, kedalaman_min_m, kedalaman_max_m, deskripsi_singkat,
     komposisi, proses_pembentukan, peran_ekologis, ancaman, suhu_perkiraan, warna_hex, urutan)
VALUES
    (1, 'Serasah dan humus', 'serasah-humus', 0.000, 0.100,
     'Daun, ranting, dan sisa makhluk yang belum selesai diuraikan. Di sinilah tanah mulai terbentuk.',
     'Serasah daun dan ranting, humus, miselium jamur, bakteri, akar halus, dan arang sisa kebakaran lama.',
     'Bakteri dan jamur memecah bahan organik. Cacing, rayap, dan serangga menggilingnya lalu mencampurnya dengan mineral. Semakin lambat bahan membusuk, semakin banyak karbon yang tersimpan.',
     'Menahan air hujan, mendinginkan permukaan tanah, dan memasok nutrisi bagi tanaman. Lapisan ini juga rumah bagi sebagian besar kehidupan tanah.',
     'Pemadatan oleh kendaraan dan ternak, pengambilan serasah, kebakaran, serta kekeringan yang memutus proses pembusukan.',
     '15–25 °C', '#7B4B2A', 1),

    (2, 'Tanah atas', 'tanah-atas', 0.100, 0.300,
     'Bagian yang paling sering diinjak dan paling sering dianggap kotor. Padahal ini dapur utama tanaman.',
     'Mineral lempung dan pasir, humus tercampur, akar halus, udara, dan air.',
     'Humus dari lapisan atas tercampur mineral oleh cacing, akar, dan aktivitas manusia. Pencampuran ini butuh puluhan sampai ratusan tahun.',
     'Tempat akar menyerap sebagian besar air dan hara. Struktur gemburnya menentukan apakah hujan meresap atau mengalir sebagai banjir.',
     'Erosi oleh air dan angin, pengolahan tanah berlebihan, pupuk dan pestisida, serta penutupan permukaan oleh beton.',
     '14–24 °C', '#86C254', 2),

    (3, 'Tanah bawah', 'tanah-bawah', 0.300, 1.500,
     'Lebih dingin, lebih padat, dan lebih sunyi. Air bergerak pelan membawa mineral ke bawah, atau polutan ikut serta.',
     'Lempung, pasir, sisa mineral, akar dalam, dan pori-pori kecil berisi air.',
     'Partikel halus tercuci dari lapisan atas dan mengendap. Sebagian membentuk lapisan kedap yang menahan air di atasnya.',
     'Menyimpan air untuk musim kering dan menyaring sebagian polutan. Akar pohon besar dan liang hewan dalam memakai ruang ini.',
     'Pemadatan, pencemaran nitrat, dan penggalian yang memotong lapisan penyangga.',
     '12–22 °C', '#DE7A45', 3),

    (4, 'Batuan lapuk', 'batuan-lapuk', 1.500, 30.000,
     'Batuan yang sudah lelah. Retak dan rongganya menyimpan air, akar, dan kadang gua sepanjang berkilo-kilometer.',
     'Pecahan batuan, pasir, lempung hasil pelapukan, dan rongga berisi air atau udara.',
     'Air, perubahan suhu, akar, dan asam organik memecah batuan selama ribuan sampai jutaan tahun. Ketebalannya sangat berbeda antar tempat.',
     'Menjadi spons raksasa: menampung air tanah, mengalirkannya ke mata air, dan menopang fondasi bangunan.',
     'Pengambilan air tanah berlebihan, pencemaran dari permukaan, dan penggalian yang membuka jalur polutan.',
     '10–20 °C', '#F3C64F', 4),

    (5, 'Batuan dasar', 'batuan-dasar', 30.000, 500.000,
     'Fondasi keras di bawah semua yang kita tanam. Di retakannya, air bisa bertahan jutaan tahun.',
     'Batuan padat seperti granit, gamping, atau basal, dengan retakan dan urat mineral.',
     'Magma yang mendingin, sedimen yang terlipat dan terpadatkan, atau batuan lama yang berubah karena panas dan tekanan.',
     'Menopang tanah di atasnya dan menyimpan air tanah dalam. Retakan menjadi rumah bagi mikroba yang hidup tanpa cahaya.',
     'Penambangan, pengeboran, dan masuknya air asin atau polutan lewat sumur yang tidak tertutup rapat.',
     '15–30 °C', '#557187', 5),

    (6, 'Kerak bumi', 'kerak-bumi', 500.000, 35000.000,
     'Dari 500 meter sampai sekitar 35 kilometer: batuan, air purba, mikroba, dan panas. Manusia baru menggores sedikit.',
     'Batuan beku, metamorf, dan sedimen; air purba di retakan; gas; mikroba; serta mineral yang terbentuk di bawah tekanan.',
     'Kerak terbentuk dari magma yang naik di batas lempeng, sedimen yang tertimbun, dan batuan yang berubah bentuk selama ratusan juta tahun.',
     'Perisai hidup di permukaan, penopang lempeng, dan laboratorium alami untuk memahami bumi. Batasnya dengan mantel adalah garis Moho.',
     'Pengeboran dalam, penambangan, gempa yang dipicu aktivitas manusia, dan perubahan tekanan akibat cairan yang disuntikkan.',
     '30–700 °C (bervariasi)', '#A9423A', 6);

-- ---------------------------------------------------------------------------
-- Penanda
-- Setiap penanda wajib punya nama sumber dan URL. Penanda yang angkanya
-- berupa rentang diberi keterangan yang sama di teks kartunya.
-- ---------------------------------------------------------------------------

INSERT INTO milestones
    (id, layer_id, nama, jenis, kedalaman_m, keterangan, ilustrasi_svg, sumber_url, sumber_nama)
VALUES
    (1, 1, 'Cacing serasah', 'makhluk', 0.030,
     'Cacing kecil memakan daun mati dan mengembalikannya sebagai tanah.',
     'cacing-serasah.svg', 'https://www.britannica.com/animal/earthworm', 'Encyclopaedia Britannica — Earthworm'),

    -- perlu diverifikasi: 5 cm hanya titik ilustrasi. Jaringan mikoriza dapat
    -- mencapai puluhan sentimeter sampai beberapa meter, tergantung akar inang.
    (2, 1, 'Jaringan mikoriza', 'makhluk', 0.050,
     'Hifa jamur memperluas jangkauan akar hingga jauh melampaui akar itu sendiri.',
     'mikoriza.svg', 'https://www.britannica.com/science/mycorrhiza', 'Encyclopaedia Britannica — Mycorrhiza'),

    -- perlu diverifikasi: 7 cm adalah kedalaman wakil untuk collembola di serasah;
    -- hewan ini dapat ditemukan dari permukaan sampai lapisan tanah atas.
    (3, 1, 'Ekor pegas', 'makhluk', 0.070,
     'Collembola melompat dengan ekor lipatnya saat terganggu.',
     'ekor-pegas.svg', 'https://www.britannica.com/animal/springtail', 'Encyclopaedia Britannica — Springtail'),

    -- perlu diverifikasi: "miliaran" adalah orde besaran yang sering dikutip;
    -- jumlahnya sangat bergantung pada jenis tanah dan metode hitung.
    (4, 1, 'Bakteri pengurai', 'makhluk', 0.090,
     'Satu sendok tanah bisa berisi miliaran bakteri yang memulai pembusukan.',
     'bakteri.svg', 'https://www.britannica.com/science/bacteria', 'Encyclopaedia Britannica — Bacteria'),

    (5, 2, 'Rimpang rumput', 'tumbuhan', 0.150,
     'Batang bawah tanah rumput menyimpan cadangan makanan dan menyebar di lapisan atas.',
     'rimpang-rumput.svg', 'https://www.britannica.com/science/rhizome', 'Encyclopaedia Britannica — Rhizome'),

    (6, 2, 'Bank benih', 'tumbuhan', 0.200,
     'Biji tertidur di tanah. Sebagian tetap hidup bertahun-tahun menunggu cahaya.',
     'bank-benih.svg', 'https://www.sciencedirect.com/science/article/pii/S0378112717316481', 'Forest Ecology and Management (2018) — Soil seed bank characteristics'),

    -- perlu diverifikasi: lorong 1–2 m dan jaringan 2–6 cm adalah rentang dari
    -- satu studi (Macrotermes bellicosus); spesies lain bisa berbeda.
    (7, 2, 'Rayap tanah', 'makhluk', 0.250,
     'Lorong jelajahnya bisa 1–2 m, dengan jaringan tipis 2–6 cm dari permukaan.',
     'rayap.svg', 'https://link.springer.com/article/10.1007/BF01242714', 'Insectes Sociaux (1991) — Gallery system of Macrotermes bellicosus'),

    -- perlu diverifikasi: terowongan 15–45 cm adalah rentang umum; kedalaman
    -- berubah mengikuti kelembapan dan jenis tanah.
    (8, 2, 'Tikus tanah', 'makhluk', 0.300,
     'Terowongannya biasanya 15–45 cm di bawah permukaan, lebih dalam saat tanah kering.',
     'tikus-tanah.svg', 'https://www.britannica.com/animal/mole-mammal', 'Encyclopaedia Britannica — Mole'),

    -- perlu diverifikasi: "sebagian besar akar di lapisan atas" adalah pola umum.
    -- Kedalaman akar pohon sangat bervariasi antar spesies dan kondisi tanah.
    (9, 3, 'Akar pohon', 'tumbuhan', 0.600,
     'Sebagian besar akar pohon bekerja di lapisan atas, bukan jauh di bawah.',
     'akar-pohon.svg', 'https://www.britannica.com/science/root-plant', 'Encyclopaedia Britannica — Root'),

    -- perlu diverifikasi: muka air tanah bisa muncul di permukaan pada dataran
    -- rendah; 0,9 m hanya contoh, bukan angka rata-rata.
    (10, 3, 'Muka air tanah', 'fenomena alam', 0.900,
     'Di dataran rendah, air tanah bisa kurang dari satu meter dari permukaan.',
     'muka-air.svg', 'https://www.usgs.gov/special-topics/water-science-school/science/water-table', 'USGS Water Science School — Water table'),

    -- perlu diverifikasi: liang 1–2 m berasal dari literatur Lumbricus terrestris;
    -- kedalaman liang tergantung tekstur tanah dan musim.
    (11, 3, 'Cacing anecic', 'makhluk', 1.200,
     'Lumbricus terrestris membuat liang vertikal 1–2 m dan naik ke permukaan untuk makan.',
     'cacing-anecic.svg', 'https://doi.org/10.1016/j.ejsobi.2024.103595', 'European Journal of Soil Biology (2024) — Lumbricus terrestris burrowing'),

    (12, 3, 'Lapisan besi', 'fenomena alam', 1.450,
     'Warna karat menandai besi yang teroksidasi lalu mengendap di pori tanah.',
     'lapisan-besi.svg', 'https://www.britannica.com/science/soil-horizon', 'Encyclopaedia Britannica — Soil horizon'),

    -- perlu diverifikasi: sumur gali tradisional umumnya belasan meter, tetapi
    -- kedalamannya mengikuti muka air setempat dan bisa jauh lebih dalam.
    (13, 4, 'Sumur gali', 'rekor manusia', 8.000,
     'Sumur gali tradisional biasanya belasan meter; kedalamannya mengikuti muka air tanah.',
     'sumur.svg', 'https://www.usgs.gov/special-topics/water-science-school/science/groundwater-wells', 'USGS Water Science School — Groundwater wells'),

    -- perlu diverifikasi: "lebih dari 15 m" adalah rentang, bukan rekor Pastinaca.
    -- Mesquite dapat mengirim akar sampai puluhan meter pada tanah kering.
    (14, 4, 'Akar mesquite', 'tumbuhan', 15.000,
     'Mesquite gurun mengirim akar lebih dari 15 m untuk mencapai air.',
     'akar-mesquite.svg', 'https://www.britannica.com/plant/mesquite', 'Encyclopaedia Britannica — Mesquite'),

    (15, 4, 'Akuifer dangkal', 'fenomena alam', 22.000,
     'Pasir dan kerikil berpori menyimpan air yang bisa dipompa ke permukaan.',
     'akuifer.svg', 'https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater', 'USGS Water Science School — Aquifers and groundwater'),

    -- perlu diverifikasi: 28 m adalah kedalaman wakil. Gua karst bisa berada
    -- jauh lebih dalam, dan atapnya bisa lebih dekat ke permukaan.
    (16, 4, 'Gua karst', 'fenomena alam', 28.000,
     'Air yang melarutkan gamping menciptakan rongga, lorong, dan stalaktit.',
     'gua-karst.svg', 'https://www.nps.gov/subjects/caves/karst-landscapes.htm', 'National Park Service — Karst landscapes'),

    -- perlu diverifikasi: 75 m adalah titik terendah jalur kereta di bawah
    -- permukaan laut, bukan kedalaman dari permukaan tanah.
    (17, 5, 'Terowongan Channel', 'rekor manusia', 100.000,
     'Di titik terendahnya, jalur kereta bawah laut ini 75 m di bawah permukaan laut.',
     'channel.svg', 'https://www.geolsoc.org.uk/science-and-policy/100-great-geosites/industrial-and-economic-importance/channel-tunnel', 'The Geological Society — Channel Tunnel'),

    -- perlu diverifikasi: 120 m adalah rekor akar fig liar di Echo Caves
    -- menurut Guinness; rekor bisa diperbarui.
    (18, 5, 'Akar fig Echo Caves', 'tumbuhan', 120.000,
     'Akar fig liar di Afrika Selatan tercatat menembus 120 m lewat celah batu.',
     'akar-fig.svg', 'https://www.guinnessworldrecords.com/world-records/66407-greatest-root-depth', 'Guinness World Records — Greatest root depth'),

    (19, 5, 'Akuifer artesis', 'fenomena alam', 300.000,
     'Air terkurung di antara lapisan kedap bisa naik sendiri saat dibor.',
     'akuifer-artesis.svg', 'https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells', 'USGS Water Science School — Artesian water'),

    -- perlu diverifikasi: 2.209 m adalah rekor Guinness yang diperbarui setelah
    -- ekspedisi 2024; angka dapat berubah bila ada penemuan jalur baru.
    (20, 6, 'Gua Veryovkina', 'fenomena alam', 2209.000,
     'Gua terdalam yang diketahui, di Abkhazia. Kedalaman resminya masih diperbarui antar ekspedisi.',
     'veryovkina.svg', 'https://www.guinnessworldrecords.com/world-records/deepest-cave', 'Guinness World Records — Deepest cave'),

    -- perlu diverifikasi: 2.800 m adalah kedalaman sampel air retakan, bukan
    -- batas sebaran mikroba; kehidupan bawah permukaan bisa lebih dalam lagi.
    (21, 6, 'Mikroba batuan dalam', 'makhluk', 2800.000,
     'Di air retakan Mponeng, satu spesies bakteri hidup tanpa cahaya dan oksigen bebas.',
     'mikroba.svg', 'https://www.nature.com/articles/s41396-021-00965-3', 'The ISME Journal (2021) — Deep subsurface microbial lineage'),

    -- perlu diverifikasi: 3.891 m adalah kedalaman operasi terdalam Mponeng
    -- menurut Harmony; angka bisa berbeda dari kedalaman poros total.
    (22, 6, 'Tambang Mponeng', 'rekor manusia', 3891.000,
     'Tambang emas terdalam di dunia, dengan batuan kerja di bawah 3,8 km.',
     'mponeng.svg', 'https://www.harmony.co.za/operations/south-africa/underground/mponeng/', 'Harmony Gold — Mponeng Mine'),

    -- perlu diverifikasi: 10 km adalah kedalaman wakil. Gempa merusak umumnya
    -- 5–15 km, tetapi bisa jauh lebih dangkal atau lebih dalam.
    (23, 6, 'Gempa dangkal', 'fenomena alam', 10000.000,
     'Sebagian besar gempa merusak terjadi di kerak atas, pada kedalaman sekitar 10 km.',
     'gempa.svg', 'https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake', 'USGS Earthquake Hazards Program — Earthquake depth'),

    -- perlu diverifikasi: 12.262 m adalah kedalaman vertikal lubang SG-3 pada
    -- 1989; laporan lain menyebut panjang lubang yang sedikit berbeda.
    (24, 6, 'Kola Superdeep Borehole', 'rekor manusia', 12262.000,
     'Lubang vertikal terdalam buatan manusia. Panas dan batuan retak menghentikannya.',
     'kola.svg', 'https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/', 'AAPG Explorer — The deepest and longest wells'),

    -- perlu diverifikasi: 35 km adalah rata-rata kerak benua. Di bawah
    -- pegunungan bisa 50–70 km; di bawah samudra hanya 5–10 km.
    (25, 6, 'Batas Moho', 'fenomena alam', 35000.000,
     'Batas kerak dan mantel. Di bawah benua, rata-ratanya sekitar 35 km.',
     'moho.svg', 'https://geology.com/articles/mohorovicic-discontinuity.shtml', 'Geology.com — Mohorovičić discontinuity');

-- ---------------------------------------------------------------------------
-- Artikel
-- Isi berupa HTML sederhana: <p>, <h2>, dan <blockquote>. Id heading dibuat
-- otomatis oleh server untuk daftar isi.
-- Kolom sumber: satu sumber per baris, format "Nama|URL".
-- ---------------------------------------------------------------------------

INSERT INTO articles
    (id, layer_id, judul, slug, ringkasan, isi, sumber, gambar, penulis, status, created_at)
VALUES
    (1, 1, 'Daun yang jatuh bukan sampah', 'daun-yang-jatuh-bukan-sampah',
     'Lapisan setipis 10 cm di bawah kaki adalah tempat daun berubah menjadi tanah. Prosesnya lebih lambat dari yang kita kira.',
     '<p>Di lantai hutan, daun yang gugur tidak langsung menjadi tanah. Ia harus melewati antrean. Cacing dan rayap mencacah jaringan daun, bakteri dan jamur memecah senyawa organik, lalu sisa yang tidak habis bercampur dengan mineral. Hasil akhirnya disebut humus: bahan organik gelap yang membuat tanah mampu menahan air dan hara.</p>
<h2>Antrean di balik sehelai daun</h2>
<p>Urutan kerjanya cukup rapi. Serasah menumpuk di permukaan, lalu hewan kecil merobeknya menjadi potongan lebih halus. Jamur mengirim hifa ke dalam jaringan yang sudah lembap, sementara bakteri bekerja di pori-pori yang lebih kecil. Cacing memakan campuran itu dan mengeluarkannya kembali sebagai agregat tanah yang lebih stabil. Setiap pekerja membuka jalan bagi pekerja berikutnya.</p>
<p>Kecepatan proses ini bergantung pada suhu, kelembapan, dan siapa yang bekerja. Di hutan tropis yang lembap, sehelai daun bisa habis dalam hitungan minggu. Di hutan pinus yang dingin, jarum dapat bertahan bertahun-tahun dan membentuk lapisan asam yang tipis. Karena itu, tanah di dua tempat tidak pernah sama meskipun berasal dari batuan yang serupa.</p>
<h2>Humus bukan sekadar pupuk</h2>
<p>Struktur humus seperti spons. Ia menyimpan air di ruang-ruang kecil dan melepaskannya perlahan, sehingga tanaman tidak langsung kekeringan setelah hujan berhenti. Tanah yang kaya humus juga lebih gembur, sehingga akar bisa menembus tanpa harus memecah lapisan yang padat. Ketika humus hilang, air hujan cenderung mengalir di permukaan dan membawa tanah bersamanya.</p>
<p>Humus juga menyimpan karbon. Semakin lambat bahan organik membusuk, semakin lama karbon itu tertahan di tanah. Di lahan yang terus dibalik dan dibersihkan, proses pembusukan dipercepat dan karbon kembali ke udara. Menjaga serasah berarti menjaga penyimpanan yang berjalan tanpa biaya.</p>
<h2>Ancaman yang terlihat sepele</h2>
<p>Kita menyapu daun dari halaman, memadatkan tanah dengan kendaraan, atau membiarkan api menjalar. Semua itu mempercepat hilangnya bahan organik. Pemadatan juga berbahaya karena menutup pori-pori yang dipakai air dan udara, sehingga hewan tanah kehilangan tempat hidup dan akar sulit bernapas.</p>
<p>Cara menjaganya tidak rumit: biarkan serasah menutup tanah, kurangi pengolahan yang membalik lapisan, dan jangan menutup seluruh permukaan dengan beton. Satu hal yang mudah dilupakan: tanah bukan wadah pasif. Ia sedang bekerja setiap saat, bahkan ketika kita tidak melihatnya.</p>',
     'Encyclopaedia Britannica — Earthworm|https://www.britannica.com/animal/earthworm
Encyclopaedia Britannica — Humus|https://www.britannica.com/science/humus
USGS Water Science School — Water table|https://www.usgs.gov/special-topics/water-science-school/science/water-table',
     'artikel/serasah.svg', 'Tim Bumi Bawah', 'published', '2026-09-02 09:00:00'),

    (2, 2, 'Dapur di 20 sentimeter pertama', 'dapur-20-sentimeter',
     'Tanah atas adalah lapisan paling produktif dan paling cepat rusak. Di sinilah air, akar, dan kehidupan bertemu.',
     '<p>Sebagian besar akar tanaman pangan tumbuh di 30 cm teratas. Di lapisan yang sama, cacing membuat liang, jamur membentuk jaringan, dan bakteri mengubah nitrogen menjadi bentuk yang bisa dipakai tanaman. Tanah atas adalah ruang kerja paling sibuk di bawah permukaan.</p>
<h2>Campuran yang butuh waktu</h2>
<p>Lapisan ini terbentuk dari pencampuran bahan organik dan mineral. Prosesnya tidak cepat. Di banyak tempat, pembentukan tanah yang bisa ditanami membutuhkan puluhan hingga ratusan tahun, sementara kehilangannya bisa terjadi dalam beberapa musim hujan. Warna gelap pada tanah atas adalah tanda humus yang sudah tercampur, bukan sekadar tanah yang basah.</p>
<p>Struktur tanah menentukan nasib air. Tanah yang menggumpal memiliki ruang di antara butirannya, sehingga air hujan masuk dan disimpan. Tanah yang dipadatkan kehilangan ruang itu; air mengalir di permukaan, memecah agregat, dan membawa bagian paling subur pergi. Erosi jarang dimulai dari hujan yang deras, tetapi dari tanah yang tidak siap menerima hujan.</p>
<h2>Erosi dan bahan kimia</h2>
<p>Ketika tanah dibiarkan terbuka, butir hujan memecah permukaannya, lalu aliran permukaan membawa tanah ke saluran dan sungai. Lereng yang gundul kehilangan tanah atas jauh lebih cepat daripada lereng yang ditutup tumbuhan. Pupuk dan pestisida menambah masalah lain: bahan yang tidak terserap bisa larut dan masuk ke air tanah, sedangkan residunya tertinggal di lapisan yang paling sering diolah.</p>
<p>Pemadatan oleh kendaraan berat dan ternak juga mengurangi ruang pori. Tanah yang padat lebih sulit ditembus akar, lebih cepat panas, dan lebih mudah kehilangan air. Perbaikan tanah yang padat butuh waktu lama karena struktur yang rusak tidak kembali hanya dengan menambahkan pupuk.</p>
<h2>Yang bisa dilakukan</h2>
<p>Ada cara yang sudah terbukti: menutup tanah dengan mulsa atau tanaman penutup, mengurangi pengolahan, dan membuat teras pada lereng. Semua itu menjaga struktur tanah, memperlambat aliran air, dan memberi waktu bagi bahan organik untuk kembali. Tanah atas hanya beberapa sentimeter, tetapi keputusan kita tentang cara mengelolanya menentukan apakah hujan menjadi cadangan air atau bencana.</p>',
     'Encyclopaedia Britannica — Soil horizon|https://www.britannica.com/science/soil-horizon
Encyclopaedia Britannica — Rhizome|https://www.britannica.com/science/rhizome
USGS Water Science School — Aquifers and groundwater|https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater',
     'artikel/tanah-atas.svg', 'Tim Bumi Bawah', 'published', '2026-09-08 09:00:00'),

    (3, 3, 'Air yang bergerak tanpa suara', 'air-yang-bergerak-tanpa-suara',
     'Di tanah bawah, air bergerak pelan sambil membawa mineral dan polutan. Lapisan ini menyimpan cerita tentang apa yang kita buang.',
     '<p>Tanah bawah dimulai di sekitar 30 cm dan bisa mencapai satu setengah meter. Di sini akar halus mulai jarang, tetapi air tetap bergerak. Setiap hujan menambah air ke pori-pori tanah; sebagian ditahan, sebagian meresap lebih dalam, dan sebagian lagi mengalir ke saluran di bawah.</p>
<h2>Air yang membawa barang</h2>
<p>Ketika air bergerak turun, ia membawa larutan. Kalsium dan magnesium bisa mengendap dan membentuk lapisan keras. Nitrat dari pupuk bisa ikut turun dan mencemari sumur. Karena itu, tanah bawah bukan penyaring yang tak terbatas. Kemampuannya menahan polutan bergantung pada jenis tanah, kedalaman muka air, dan berapa lama bahan itu berada di sana.</p>
<p>Lapisan lempung yang rapat bisa memperlambat perjalanan air selama bertahun-tahun. Sebaliknya, pasir dan kerikil meneruskan air dengan cepat. Di daerah dengan batuan retak, air bisa mencapai kedalaman puluhan meter dalam waktu singkat dan membawa serta apa pun yang larut di permukaan. Perbedaan ini menjelaskan mengapa dua sumur yang berdekatan bisa punya kualitas air yang sangat berbeda.</p>
<h2>Sumur dan muka air</h2>
<p>Sumur dangkal sering mengambil air dari lapisan ini. Kalau sumur tidak ditutup rapat, air permukaan yang tercemar bisa masuk langsung. Memeriksa konstruksi sumur sama pentingnya dengan memeriksa sumber airnya. Muka air juga berubah sepanjang tahun: naik setelah musim hujan, turun saat kemarau, dan bisa turun permanen bila pengambilan melebihi pengisian.</p>
<p>Di dataran rendah, muka air bisa kurang dari satu meter dari permukaan. Di tempat seperti itu, tanah bawah sangat dekat dengan aktivitas manusia, dan apa pun yang terjadi di permukaan cepat sampai ke air. Sebaliknya, di perbukitan, air harus menempuh perjalanan lebih panjang sebelum mencapai lapisan penyimpanan.</p>
<h2>Yang tidak terlihat</h2>
<p>Tanah bawah jarang menjadi pusat perhatian. Padahal di sinilah kualitas air yang kita minum mulai ditentukan. Memahami arah aliran, ketebalan lapisan, dan sumber pencemar di permukaan adalah pekerjaan yang membosankan tetapi jauh lebih murah daripada membersihkan air setelah tercemar.</p>
<p>Pekerjaan itu biasanya dimulai dari hal sederhana: mencatat kedalaman sumur, menguji air secara berkala, dan memeriksa apakah ada septic tank atau kandang ternak yang terlalu dekat. Di banyak desa, data seperti ini belum pernah dikumpulkan. Padahal tanpa catatan, kerusakan air tanah baru terasa setelah sumur berbau atau warga sakit. Menjaga tanah bawah berarti menjaga catatan yang tidak terlihat.</p>',
     'USGS Water Science School — Water table|https://www.usgs.gov/special-topics/water-science-school/science/water-table
USGS Water Science School — Groundwater wells|https://www.usgs.gov/special-topics/water-science-school/science/groundwater-wells
USGS Water Science School — Artesian water|https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells',
     'artikel/tanah-bawah.svg', 'Tim Bumi Bawah', 'published', '2026-09-14 09:00:00'),

    (4, 4, 'Batuan yang berubah jadi spons', 'batuan-yang-berubah-jadi-spons',
     'Pelapukan mengubah batuan padat menjadi lapisan berpori yang menyimpan air. Di beberapa tempat, proses itu juga menciptakan gua.',
     '<p>Batuan tidak selamanya padat. Air yang membeku di celah, akar yang menekan, dan asam dari tumbuhan bekerja perlahan. Dalam skala ribuan tahun, batuan bisa pecah menjadi pasir, lempung, dan kerikil. Hasilnya adalah batuan lapuk: lapisan yang lebih mirip spons daripada batu.</p>
<h2>Dari retakan menjadi akuifer</h2>
<p>Rongga di antara pecahan menyimpan air. Itulah awal akuifer, cadangan air bawah tanah yang dipakai rumah, sawah, dan kota. Ketebalan batuan lapuk sangat bervariasi. Di beberapa tempat ia hanya beberapa meter; di tempat lain bisa puluhan meter, tergantung jenis batuan dan iklim. Semakin lama pelapukan berlangsung, semakin dalam air bisa tersimpan.</p>
<p>Air di dalam akuifer tidak mengalir seperti sungai. Ia bergerak pelan di antara butiran, mengikuti perbedaan tekanan. Kecepatannya bisa beberapa sentimeter per hari, jauh lebih lambat daripada aliran permukaan. Karena lambat, pencemar yang masuk bisa bertahan lama dan menyebar ke sumur yang jauh.</p>
<h2>Ketika air melarutkan batu</h2>
<p>Pada batuan gamping, air tidak hanya mengisi rongga. Air melarutkan batuan itu sendiri, membentuk lorong dan gua. Prosesnya disebut karst. Sungai bisa hilang ke dalam tanah dan muncul kembali sebagai mata air di tempat lain. Karena aliran di karst cepat dan sulit diprediksi, pencemaran di permukaan bisa sampai ke sumber air dalam waktu singkat.</p>
<p>Karst juga menyimpan air dalam jumlah besar, tetapi bukan di pori-pori kecil. Airnya terkumpul di saluran dan rongga yang saling terhubung. Kalau satu saluran tercemar, kualitas air di seluruh sistem bisa berubah. Memetakan jalur air di karst jauh lebih sulit daripada memetakan sungai di permukaan.</p>
<h2>Mengambil tanpa menghabiskan</h2>
<p>Mengambil air dari lapisan ini berlebihan akan menurunkan muka air dan membuat tanah di atasnya turun. Di daerah pesisir, air laut bisa masuk dan membuat sumur menjadi asin. Memetakan akuifer sebelum mengebor adalah langkah yang jauh lebih murah daripada memperbaiki kesalahan setelah air habis. Batuan lapuk adalah pengingat bahwa yang keras pun bisa berubah. Kita hanya perlu waktu yang lebih panjang untuk melihatnya.</p>',
     'National Park Service — Karst landscapes|https://www.nps.gov/subjects/caves/karst-landscapes.htm
USGS Water Science School — Aquifers and groundwater|https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater
USGS Water Science School — Water table|https://www.usgs.gov/special-topics/water-science-school/science/water-table',
     'artikel/batuan-lapuk.svg', 'Tim Bumi Bawah', 'published', '2026-09-20 09:00:00'),

    (5, 5, 'Arsip keras di bawah kaki', 'arsip-keras-di-bawah-kaki',
     'Batuan dasar menyimpan catatan waktu, air purba, dan retakan yang menjadi rumah bagi mikroba.',
     '<p>Di bawah tanah dan batuan lapuk, ada batuan dasar. Ia bisa berupa granit, gamping, basal, atau batuan metamorf yang sudah mengalami panas dan tekanan. Batuan ini menjadi fondasi bagi bangunan, jalan, dan seluruh lapisan di atasnya.</p>
<h2>Ruang di antara yang padat</h2>
<p>Yang menarik justru bagian yang tidak padat. Retakan dan sesar membentuk jaringan ruang tempat air bisa mengalir dan bertahan. Di beberapa lokasi, air di retakan berumur jutaan tahun dan punya komposisi kimia yang berbeda dari air hujan. Air itu tidak selalu bisa diminum, tetapi menyimpan informasi tentang sejarah batuan dan iklim masa lalu.</p>
<p>Retakan juga menjadi rumah bagi mikroba. Organisme ini tidak memakai cahaya matahari; mereka mengambil energi dari reaksi kimia antara air, batuan, dan gas. Prosesnya sangat lambat, tetapi berlangsung dalam rentang waktu yang sangat panjang. Di kedalaman beberapa kilometer, kehidupan tetap ada meskipun tanpa sinar matahari.</p>
<h2>Pengeboran membuka pintu</h2>
<p>Batuan dasar juga menjadi sasaran pengeboran. Sumur dalam mencari air, minyak, gas, atau panas bumi. Setiap pengeboran membuka jalur baru antara lapisan yang sebelumnya terpisah. Kalau sumur tidak disegel dengan benar, air asin atau polutan bisa berpindah ke akuifer yang dipakai manusia.</p>
<p>Di permukaan, batuan dasar muncul sebagai pegunungan, tebing, atau lantai lembah. Dari sana kita bisa membaca lipatan dan patahan yang terbentuk jauh sebelum manusia ada. Tetapi membaca permukaan saja tidak cukup; sebagian besar sejarahnya tersembunyi di bawah.</p>
<h2>Fondasi yang perlu dirawat</h2>
<p>Batuan dasar bukan latar statis. Ia menyimpan air, panas, dan kehidupan yang berjalan sangat lambat. Memahaminya membantu kita mengambil sumber daya tanpa merusak sistem yang sulit pulih. Sumur yang bocor, tambang yang ditinggalkan, dan pengeboran yang tergesa-gesa adalah cara paling cepat untuk merusak arsip yang butuh jutaan tahun untuk terbentuk.</p>
<p>Karena biaya pengeboran mahal, banyak keputusan tentang batuan dasar dibuat dari data yang sedikit. Satu lubang uji bisa mewakili wilayah yang sangat luas, padahal retakan di bawah tanah tidak tersebar merata. Di sinilah pemetaan geologi, pengukuran getaran, dan pencatatan sumur warga saling melengkapi. Tidak ada satu alat yang cukup, tetapi bersama-sama ketiganya memberi gambaran yang lebih jujur tentang apa yang ada di bawah.</p>',
     'The ISME Journal (2021) — Deep subsurface microbial lineage|https://www.nature.com/articles/s41396-021-00965-3
USGS Water Science School — Artesian water|https://www.usgs.gov/special-topics/water-science-school/science/artesian-water-and-artesian-wells
AAPG Explorer — The deepest and longest wells|https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/',
     'artikel/batuan-dasar.svg', 'Tim Bumi Bawah', 'published', '2026-09-26 09:00:00'),

    (6, 6, '35 kilometer yang belum selesai dipetakan', '35-kilometer-yang-belum-selesai',
     'Kerak bumi adalah lapisan tipis tempat semua kehidupan berlangsung. Batasnya dengan mantel bernama Moho, dan belum ada bor yang menembusnya.',
     '<p>Di bawah benua, kerak bumi rata-rata setebal 35 km. Di bawah samudra, ketebalannya hanya sekitar 5 sampai 10 km. Angka itu terdengar besar sampai dibandingkan dengan jari-jari bumi yang sekitar 6.371 km. Kerak hanyalah kulit tipis di permukaan planet.</p>
<h2>Garis yang ditemukan dari gelombang</h2>
<p>Batas antara kerak dan mantel disebut diskontinuitas Mohorovičić, atau Moho. Andrija Mohorovičić menemukannya pada 1909 dengan membaca perubahan kecepatan gelombang seismik setelah gempa. Gelombang merambat lebih cepat di mantel karena batuan di sana berbeda kepadatan dan komposisinya.</p>
<p>Sejak itu, para ilmuwan memetakan Moho dengan gempa, ledakan, dan alat penerima di permukaan. Hasilnya bukan garis rata. Di bawah pegunungan, kerak bisa menebal sampai puluhan kilometer; di bawah lembah retak, ia menipis. Moho juga tidak selalu sama dengan batas batuan yang terlihat di permukaan.</p>
<h2>Yang belum pernah ditembus</h2>
<p>Manusia belum pernah menembus Moho. Lubang terdalam buatan manusia, Kola Superdeep Borehole, mencapai 12.262 m, masih jauh di atas batas itu. Panas, tekanan, dan batuan yang mudah runtuh membuat pengeboran semakin sulit seiring kedalaman.</p>
<p>Karena tidak bisa melihat langsung, kita membaca kerak dari potongan batuan yang terangkat, dari getaran gempa, dan dari pengukuran di permukaan. Model yang dihasilkan terus diperbaiki ketika data baru masuk. Beberapa bagian kerak masih dipetakan dengan resolusi kasar, terutama di bawah samudra dan di daerah yang jarang dilalui alat seismik.</p>
<h2>Rumah yang belum selesai dipahami</h2>
<p>Kerak bumi adalah rumah kita, tetapi sebagian besar isinya belum kita lihat langsung. Yang kita punya adalah potongan batuan, gelombang, dan model yang terus diperbaiki. Itu cukup untuk membuat peta, tetapi belum cukup untuk mengatakan bahwa kita sudah selesai memahami bumi.</p>
<p>Yang membuat pekerjaan ini menarik adalah ketidakpastiannya. Setiap gempa besar menambah data baru, dan setiap data baru bisa mengubah model yang sudah dipakai bertahun-tahun. Para ahli geologi tidak bekerja dengan jawaban akhir; mereka bekerja dengan perkiraan terbaik yang terus diuji. Sikap itu layak ditiru ketika kita membahas bumi: berani mengakui batas pengetahuan, tetapi tetap mengambil keputusan yang bisa dipertanggungjawabkan.</p>',
     'Geology.com — Mohorovičić discontinuity|https://geology.com/articles/mohorovicic-discontinuity.shtml
USGS Earthquake Hazards Program — Earthquake depth|https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake
AAPG Explorer — The deepest and longest wells|https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/',
     'artikel/kerak-bumi.svg', 'Tim Bumi Bawah', 'published', '2026-10-02 09:00:00'),

    (7, 6, 'Lubang 12.262 meter dan pelajaran dari Kola', 'lubang-12262-meter',
     'Kola Superdeep Borehole adalah lubang vertikal terdalam buatan manusia. Ia tidak mencapai mantel, tetapi mengubah banyak hal yang kita kira tentang kerak bumi.',
     '<p>Proyek pengeboran Kola dimulai di Semenanjung Kola, Rusia, pada 1970. Tujuannya ilmiah: melihat langsung batuan kerak bumi yang dalam. Setelah bertahun-tahun dan beberapa kali kegagalan, salah satu cabang lubang mencapai kedalaman vertikal 12.262 m pada 1989.</p>
<h2>Sebanding apa?</h2>
<p>Angka itu membuat Kola menjadi lubang vertikal terdalam buatan manusia. Sebagai perbandingan, Palung Mariana di lautan sedalam sekitar 10,9 km. Kola lebih dalam, tetapi tetap belum menyentuh batas kerak-mantel yang di bawah benua rata-rata sekitar 35 km. Kalau bumi diibaratkan apel, lubang ini baru menggores kulitnya.</p>
<p>Yang ditemukan justru mengejutkan. Batuan di kedalaman itu tidak kering dan steril. Ada air di retakan, gas hidrogen, dan mikroba. Suhu di dasar lubang jauh lebih tinggi dari perkiraan awal, mencapai sekitar 180 °C pada kedalaman sekitar 12 km. Panas dan batuan yang retak membuat bor sering macet.</p>
<h2>Berhenti, lalu terlupakan</h2>
<p>Pada 1994, pengeboran berhenti. Sejak itu, lubang ditutup dengan pelat logam dan situsnya terbengkalai. Kisah Kola sering dibumbui cerita tentang suara dari neraka, tetapi catatan proyeknya jauh lebih menarik: batuan yang berair, panas yang tidak terduga, dan batas teknologi manusia.</p>
<p>Temperatur yang lebih tinggi dari perkiraan bukan sekadar catatan teknis. Panas memengaruhi sifat batuan, umur alat bor, dan biaya operasi. Di kedalaman seperti itu, setiap derajat tambahan membuat pengeboran lebih lambat dan lebih mahal. Batas kedalaman bukan hanya soal panjang pipa, tetapi juga soal bahan dan pendinginan.</p>
<h2>Dua pelajaran</h2>
<p>Kola mengajarkan dua hal. Pertama, kerak bumi jauh lebih rumit daripada lapisan pada diagram. Kedua, jarak 12 km terdengar besar bagi kita, tetapi sangat kecil bagi planet ini. Lubang itu tidak membuka pintu ke mantel, tetapi membuka mata tentang betapa sedikitnya yang kita tahu.</p>
<p>Sejak Kola ditutup, teknologi bor sudah berubah. Alat baru memakai sensor yang lebih baik, lumpur bor yang lebih tahan panas, dan pipa yang lebih kuat. Tetapi batasnya tetap sama: semakin dalam, semakin panas dan semakin mudah batuan runtuh. Proyek pengeboran ilmiah hari ini lebih sering memilih target yang lebih dangkal dan lebih terarah, bukan mengejar rekor kedalaman. Pelajaran dari Kola bukan tentang siapa yang bisa menggali paling dalam, melainkan tentang seberapa jauh kita bersedia mendengar apa yang ditemukan di sana.</p>',
     'AAPG Explorer — The deepest and longest wells|https://www.aapg.org/news-and-media/explorer/the-deepest-and-longest-wells-ever-drilled/
The ISME Journal (2021) — Deep subsurface microbial lineage|https://www.nature.com/articles/s41396-021-00965-3
USGS Earthquake Hazards Program — Earthquake depth|https://www.usgs.gov/programs/earthquake-hazards/determining-depth-earthquake',
     'artikel/kola.svg', 'Tim Bumi Bawah', 'published', '2026-10-08 09:00:00'),

    (8, 4, 'Kenapa gua bisa sedalam dua kilometer?', 'kenapa-gua-bisa-dalam-dua-kilometer',
     'Gua terdalam di dunia turun lebih dari 2 km. Pembentuknya bukan gempa, melainkan air yang bekerja sangat lama.',
     '<p>Gua biasanya terbentuk di batuan yang mudah larut, terutama gamping. Air hujan yang menyerap karbon dioksida dari udara dan tanah menjadi sedikit asam. Saat meresap ke celah batuan, air itu melarutkan mineral secara perlahan. Dari retakan kecil, jalur air melebar menjadi lorong.</p>
<h2>Air yang tidak pernah terburu-buru</h2>
<p>Prosesnya butuh waktu lama, tetapi hasilnya bisa sangat dalam. Gua Veryovkina di Abkhazia tercatat sedalam 2.209 m pada pengukuran 2024. Angka ini sempat berubah beberapa kali karena ekspedisi menemukan jalur baru atau mengukur ulang dengan alat yang lebih presisi. Gua Krubera di kawasan yang sama juga berada di kisaran 2,2 km.</p>
<p>Kedalaman gua dihitung dari titik masuk tertinggi sampai titik terendah yang bisa dicapai, bukan dari permukaan laut. Karena itu, gua di pegunungan bisa punya kedalaman vertikal besar meskipun pintunya berada jauh di atas laut. Dua gua yang pintunya berbeda ketinggian bisa punya kedalaman yang sama sekali berbeda.</p>
<h2>Air di dalam batu</h2>
<p>Di dalam gua, air terus bekerja. Banjir bawah tanah bisa datang cepat setelah hujan di permukaan, bahkan di lorong yang tampak kering. Endapan kalsium membentuk stalaktit dan stalagmit, tetapi pertumbuhannya sangat lambat. Satu sentimeter bisa memakan puluhan hingga ratusan tahun, tergantung kondisi.</p>
<p>Gua juga menjadi jalan masuk air ke akuifer karst. Sungai permukaan bisa hilang ke dalam tanah, mengalir di lorong bawah tanah, lalu muncul lagi di mata air yang jauh. Karena jalurnya cepat, pencemaran di permukaan bisa sampai ke sumber air minum tanpa banyak tersaring.</p>
<h2>Kesabaran yang mengalahkan batu</h2>
<p>Gua adalah pengingat bahwa air punya kesabaran yang tidak kita miliki. Ia tidak perlu mengebor; cukup mengalir di celah yang sama selama ribuan tahun. Bagi manusia, gua adalah tempat eksplorasi. Bagi air, gua hanyalah jalan yang terus melebar.</p>
<p>Kesabaran itu juga berarti gua sulit dipulihkan. Kalau endapan kalsium dipatahkan atau aliran air dialihkan, bekasnya bertahan sangat lama. Wisata gua yang tidak diatur bisa membawa lumpur, sampah, dan cahaya yang mengubah kehidupan di dalamnya. Menjaga gua berarti membatasi jumlah pengunjung, memakai jalur yang sudah ada, dan tidak menyentuh formasi yang tumbuh lebih lambat daripada usia kita.</p>',
     'Guinness World Records — Deepest cave|https://www.guinnessworldrecords.com/world-records/deepest-cave
National Park Service — Karst landscapes|https://www.nps.gov/subjects/caves/karst-landscapes.htm
USGS Water Science School — Aquifers and groundwater|https://www.usgs.gov/special-topics/water-science-school/science/aquifers-and-groundwater',
     'artikel/gua.svg', 'Tim Bumi Bawah', 'published', '2026-10-14 09:00:00');

-- ---------------------------------------------------------------------------
-- Galeri
-- Semua gambar adalah pelat ilustrasi buatan sendiri (SVG), bukan foto.
-- Kolom kredit_foto memakai "Ilustrasi: Bumi Bawah" agar tidak menyesatkan.
-- ---------------------------------------------------------------------------

INSERT INTO gallery
    (id, judul, deskripsi, lokasi, gambar, kategori, kredit_foto, created_at)
VALUES
    (1, 'Hutan hujan setelah hujan', 'Lantai hutan yang basah, tempat serasah mulai diuraikan.', 'Taman Nasional Gunung Leuser, Aceh', 'galeri/hutan-leuser.svg', 'Hutan', 'Ilustrasi: Bumi Bawah', '2026-09-01 08:00:00'),
    (2, 'Profil tanah di tebing', 'Perbedaan warna dan tekstur lapisan tanah terlihat jelas di dinding tebing.', 'Devon, Inggris', 'galeri/profil-tanah.svg', 'Tanah', 'Ilustrasi: Bumi Bawah', '2026-09-03 08:00:00'),
    (3, 'Akar di celah batu', 'Akar menembus retakan batuan untuk mencari air.', 'Echo Caves, Afrika Selatan', 'galeri/akar-batu.svg', 'Akar', 'Ilustrasi: Bumi Bawah', '2026-09-05 08:00:00'),
    (4, 'Gua kapur dan stalaktit', 'Rongga larutan di batuan gamping, dengan endapan kalsium yang tumbuh lambat.', 'Gunung Mulu, Malaysia', 'galeri/gua-kapur.svg', 'Gua', 'Ilustrasi: Bumi Bawah', '2026-09-07 08:00:00'),
    (5, 'Air tanah yang muncul', 'Mata air keluar dari rekahan batuan di kaki lereng.', 'Gunungkidul, Yogyakarta', 'galeri/mata-air.svg', 'Air', 'Ilustrasi: Bumi Bawah', '2026-09-09 08:00:00'),
    (6, 'Lapisan batuan terlipat', 'Lipatan batuan sedimen merekam tekanan yang bekerja dalam waktu sangat lama.', 'Grand Canyon, Arizona', 'galeri/batuan-terlipat.svg', 'Batuan', 'Ilustrasi: Bumi Bawah', '2026-09-11 08:00:00'),
    (7, 'Tambang emas dalam', 'Infrastruktur tambang yang mengikuti lapisan bijih sampai beberapa kilometer.', 'Witwatersrand, Afrika Selatan', 'galeri/tambang-emas.svg', 'Batuan', 'Ilustrasi: Bumi Bawah', '2026-09-13 08:00:00'),
    (8, 'Lava yang mendingin', 'Bekas aliran lava menjadi batuan baru di permukaan kerak.', 'Islandia', 'galeri/lava.svg', 'Batuan', 'Ilustrasi: Bumi Bawah', '2026-09-15 08:00:00'),
    (9, 'Tanah kering dan retak', 'Retakan di permukaan tanah lempung saat kelembapan turun.', 'Sonora, Meksiko', 'galeri/tanah-kering.svg', 'Tanah', 'Ilustrasi: Bumi Bawah', '2026-09-17 08:00:00'),
    (10, 'Tebing kapur di pantai', 'Batuan sedimen yang terangkat dan terkikis ombak.', 'Nusa Penida, Bali', 'galeri/tebing-kapur.svg', 'Batuan', 'Ilustrasi: Bumi Bawah', '2026-09-19 08:00:00'),
    (11, 'Hutan bakau dan lumpur', 'Akar bakau menahan lumpur, tempat karbon dan sedimentasi bekerja.', 'Delta Mahakam, Kalimantan Timur', 'galeri/bakau.svg', 'Hutan', 'Ilustrasi: Bumi Bawah', '2026-09-21 08:00:00'),
    (12, 'Situs pengeboran Kola', 'Sisa fasilitas pengeboran lubang terdalam buatan manusia.', 'Semenanjung Kola, Rusia', 'galeri/kola.svg', 'Manusia', 'Ilustrasi: Bumi Bawah', '2026-09-23 08:00:00');

INSERT INTO users (id, username, password_hash, role)
VALUES
    (1, 'admin', '$2y$10$5VicAE.CcmbZdVW0AdfzsuGbHyniNn9xei2QbbEv1LntV3PsNC3wi', 'admin');
