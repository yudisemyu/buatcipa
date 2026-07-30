import { Chapter, Memory, GalleryItem } from "@/types";

export const STORY_THEME = {
  title: "Met Ultah Cipa",
  subtitle: "Sedikit hadiah dari aku HEHWHHWHS. semoga ga bosen ya bukanya. Hadiah aslinya nanti nyusul kalo kita ngedate wlee",
};

export const PASSWORD_QUESTION = {
  question: "kita pertama ngedate kemana ya?",
  // Standard answer used for validation. We will trim and check case-insensitively.
  answer: ["kopi kenangan", "kopken", "Kopi Kenangan", "Kopken"],
  wrongAnswers: [
    "diinget inget lagi donk yang pertama banget",
    "hmmzz",
  ],
  correctAnswer: "anjay masih inget",
};

export const STORY_CHAPTERS: Chapter[] = [
  {
    id: "chapter-1",
    title: "Awal Mula",
    subtitle: "Sometimes one hello changes everything.",
    image: "/images/foto12.jpeg",
    paragraph: "Lucu ya, awalnya cuman modus minta foto buat logbook eh sekarang malah jadi orang yang paling sering dipikirin. EHH",
    quote: "Mulainya si dari modus simple, eh siapa yang nyangka lanjut sampe sekarang",
  },
  {
    id: "chapter-2",
    title: "First Date",
    subtitle: "SUMPAHHH NERVOUS BGT, GEMETER, EXCITED KASHDHFJDSHJFHS",
    image: "/images/foto13.jpeg",
    paragraph: "Impression abis ngedate : KAMU CANTIK BGTT, lucu, manis, gimana ga makin kepelet",
    quote: "First date: ngopi, makan, ngobrol. Plot twist: ternyata bukan kopinya yang bikin ketagihan.",
  },
  {
    id: "chapter-3",
    title: "Hari Spesial",
    subtitle: "Latian Puitis Dikit HEHEHE",
    image: "/images/foto3.jpeg",
    paragraph: "Hari itu bukan tentang aku. Hari itu tentang kamu, tentang perjuangan kamu, tentang satu langkah yang berhasil kamu lewatin. aku bersyukur bisa jadi salah satu orang yang nyaksiin perjalanan km itu dari deket. kalo suatu hari nanti kamu flashback semua perjuangan kamu, semoga kamu inget aku pernah ada di sana, ikut bangga liat kamu melangkah sejauh itu. 🤍",
    quote: "Some moments are meant to be remembered.",
  },
  {
    id: "chapter-4",
    title: "Lanjut LDH (Long Distance HTS)",
    subtitle: "KANGEEEENNNNNNN",
    image: "/images/foto4.jpeg",
    paragraph: "Kamu disana, aku disini. kita emang gabisa tiba tiba ketemu, ngedate, atau apapun itu. tapi aku masih pengen denger cerita kamu, keluh kesah kamu, hari hari kamu. ",
    quote: "Different places, same story.",
  },
];

export const TIMELINE_MEMORIES: Memory[] = [
  {
    id: "memory-1",
    date: "31 Januari 2026",
    title: "Awal Ngechat",
    image: "/images/foto12.jpeg",
    story: "ngumpulin keberaniannya si yg lama hehe",
    location: "Rumah Masing Masing",
  },
  {
    id: "memory-2",
    date: "5 Februari 2026",
    title: "Modus lanjut WA",
    image: "/images/foto11.jpeg",
    story: "HEHEHEHEHEHHE",
    location: "Rumah Masing Masing",
  },
  {
    id: "memory-3",
    date: "13 Mei 2026",
    title: "First Date",
    image: "/images/foto13.jpeg",
    story: "Sayang BANGEETT ga fotbar",
    location: "Kopken, Papaden",
  },
  {
    id: "memory-4",
    date: "24 Mei 2026",
    title: "Ngelukis Bareng",
    image: "/images/foto7.jpeg",
    story: "Cute",
    location: "Purwokerto",
  },
  {
    id: "memory-5",
    date: "24 Mei 2026",
    title: "photobooth pertama",
    image: "/images/foto10.jpeg",
    story: "MAUU LAGIIII",
    location: "Rita PWT",
  },
  {
    id: "memory-6",
    date: "10 Juni 2026",
    title: "First Lopyu",
    image: "/images/foto14.jpeg",
    story: "MADE MY DAYYYYYY",
    location: "Rumah masing masing",
  },
  {
    id: "memory-7",
    date: "30 Juni 2026",
    title: "Fotbar Sempro",
    image: "/images/foto2.jpeg",
    story: "BANGGAAAA",
    location: "FISIP Unsoed",
  },
];

// Reusable assets for game and gallery (since we don't have local files, we will use mock images from Unsplash that look cozy and scrapbook-like)
export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "gallery-1", type: "image", url: "/images/foto1.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-2", type: "image", url: "/images/foto2.jpeg", caption: "", aspectRatio: "square" },
  { id: "gallery-3", type: "image", url: "/images/foto17.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-4", type: "image", url: "/images/foto4.jpeg", caption: "", aspectRatio: "landscape" },
  { id: "gallery-5", type: "image", url: "/images/foto5.jpeg", caption: "", aspectRatio: "square" },
  { id: "gallery-6", type: "image", url: "/images/foto6.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-7", type: "image", url: "/images/foto7.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-8", type: "image", url: "/images/foto8.jpeg", caption: "", aspectRatio: "landscape" },
  { id: "gallery-9", type: "image", url: "/images/foto9.jpeg", caption: "", aspectRatio: "square" },
  { id: "gallery-10", type: "image", url: "/images/foto10.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-11", type: "image", url: "/images/foto15.jpeg", caption: "", aspectRatio: "landscape" },
  { id: "gallery-12", type: "image", url: "/images/foto16.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-13", type: "image", url: "/images/foto22.jpeg", caption: "", aspectRatio: "square" },
  { id: "gallery-14", type: "image", url: "/images/foto23.jpeg", caption: "", aspectRatio: "landscape" },
  { id: "gallery-15", type: "image", url: "/images/foto18.jpeg", caption: "", aspectRatio: "portrait" },
  { id: "gallery-16", type: "image", url: "/images/foto19.jpeg", caption: "", aspectRatio: "square" },
  { id: "gallery-17", type: "image", url: "/images/foto20.jpeg", caption: "", aspectRatio: "landscape" },
  { id: "gallery-18", type: "image", url: "/images/foto21.jpeg", caption: "", aspectRatio: "portrait" },
];

export const MINI_GAME = {
  type: "Memory Matching",
  cardsCount: 12,
  pairsCount: 6,
  cardBackImage: "/images/stickers/heart.png", // We will style card back as pastel heart using CSS or inline SVG
  rewardText: "You unlocked another memory.",
  buttonText: "Continue",
};

export const LETTER_CONTENT = {
  title: "Happy Birthday 🤍",
  // A long, heartwarming letter
  content: `Dear Cipa,

**Happy Birthday! 🤍🎂**

Hari ini adalah hari spesial buat ngerayain seseorang yang luar biasa, cantik, baik, lucu, dan tentunya... agak menyebalkan juga kadang-kadang. Tapi yaudah, namanya juga kamu. Mau gimana lagi, udah terlanjur sayang. 😔

Aku bikin little universe kecil ini bukan karena aku tiba-tiba jadi web developer profesional yang jago bikin website romantis. Tapi karena aku pengen punya sesuatu yang bisa ngingetin kamu tentang perjalanan kita sampai sekarang. Walaupun kalau dipikir-pikir, perjalanan kita ini isinya lebih banyak makan, jalan-jalan, ngobrol nggak jelas, dan saling ganggu daripada hal-hal yang keren.

Aku masih inget banget cafe pertama yang kita datengin. Awalnya mungkin masih malu-malu, senyum-senyum nggak jelas, sok cool, padahal dalam hati mungkin sama-sama mikir,

*"Ini orang bakal tahan nggak ya sama kelakuan gue?"*

Dan ternyata...

**Tahan.**

Bahkan sampai sekarang.

Hebat juga kamu.
Aku kasih penghargaan khusus buat kamu karena berhasil bertahan sejauh ini. 🏆

Dari first date kita, makan bareng, ketemu di berbagai kesempatan, lari-larian kehujanan, sampai hari-hari sederhana yang mungkin kelihatannya biasa aja, ternyata semuanya jadi kenangan yang seru kalau diinget lagi.

Ada yang bikin ketawa, ada yang bikin malu kalau diinget, ada juga yang mungkin lebih baik kita pura-pura lupa aja. 🤫

Tapi dari semua itu, aku bersyukur banget bisa ngelewatin banyak hal bareng kamu.

Kamu itu orang yang punya banyak banget hal yang aku suka. Kamu baik, perhatian, sabar, bisa bikin orang lain nyaman, dan punya jokes yang... ya... kadang lucu.

**Kadang.**

Tapi gapapa, aku tetap ketawa kok.

Bukan karena lucu.

Tapi karena aku menghargai usaha kamu. 😭

Aku harap selama kamu scroll-scroll website ini, kamu bisa senyum sendiri sambil nginget semua kejadian yang pernah kita lewatin. Kalau ada bagian yang bikin kamu ketawa, berarti misi aku berhasil. Kalau ada bagian yang bikin kamu terharu...

**Maaf, itu tidak disengaja.**

Di umur kamu yang baru ini, aku berharap kamu selalu bahagia, sehat, dimudahkan dalam segala urusan, dan bisa mendapatkan semua hal yang kamu impikan.

Semoga semua yang kamu perjuangkan sekarang bisa berjalan lancar. Semoga kamu selalu punya alasan buat tersenyum, bahkan di hari-hari yang nggak terlalu baik.

Dan semoga...

**kamu tetap sabar menghadapi aku.**

Karena kayaknya itu salah satu tantangan terbesar dalam hidup kamu. 😔🙏

Aku juga mau bilang terima kasih karena udah hadir di hidup aku. Terima kasih karena udah jadi bagian dari banyak cerita dan kenangan yang sekarang bisa kita lihat lagi di sini.

Aku nggak tahu nanti perjalanan kita bakal sejauh apa dan bakal ada cerita apa lagi yang kita lewatin. Tapi untuk sekarang, aku cuma senang karena dari sekian banyak orang di dunia ini, aku bisa ketemu sama kamu.

Orang yang bisa diajak ngobrol sampai lupa waktu.

Orang yang bisa diajak makan walaupun ujung-ujungnya bingung mau makan apa.

Orang yang bisa diajak bercanda sampai lupa kalau besok ada kegiatan.

Dan orang yang entah kenapa masih mau sama aku sampai sekarang.

**Pertahankan ya. Jangan cari yang lain. Susah lho nyari orang sebaik aku.**

*(Ini bercanda. Tapi kalau dipikir-pikir, bener juga.)* 😌

Pokoknya, selamat ulang tahun ya, Cipa.

Semoga hari ini kamu bahagia.

Semoga tahun ini lebih banyak hal baik yang datang ke hidup kamu.

Dan semoga nanti, suatu hari, kita bisa buka website ini lagi bareng-bareng sambil lihat semua kenangan yang ada di sini dan bilang,

**"Gila... ternyata kita udah sejauh ini ya."**

Terus lima menit kemudian kita debat gara-gara lupa siapa yang salah waktu first date.

Tapi yaudah.

Yang penting sekarang...

**Happy Birthday, Cipa! 🤍**

Semoga panjang umur, sehat selalu, makin cantik, makin bahagia, makin sukses...

dan tentunya,

**makin sayang sama aku.**

Karena yang terakhir itu paling penting.

🤍`,
  maxWords: 1200,
  animationSpeed: 30, // ms per character
  allowSkip: true,
};

export const VOICE_MESSAGE = {
  audioFile: "/audio/voice.mp3",
  fallbackText: "Play Voice Note",
  duration: "1:24",
  transcript: "Halo... aku cuma mau bilang selamat ulang tahun sekali lagi. Aku bersyukur banget bisa ketemu sama kamu. Semoga tahun ini bawa banyak banget kebahagiaan buat kamu, dan semoga kita bisa terus bikin banyak kenangan bareng-bareng. I love you.",
};

export const GIFT_CONTENT = {
  type: "Surprise Message",
  illustration: "Gift Box",
  buttonText: "Open My Gift",
  // The secret surprise message revealed upon opening the gift box
  giftMessage: "Voucher Spesial: Jalan-jalan & Makan Malam Romantis Berdua! 🎫✨\n(Bisa diklaim kapan saja kamu senggang. Aku yang traktir!)",
};

export const ENDING_CONTENT = {
  title: "Happy Birthday ❤️",
  subtitle: "Thank you for staying.",
  message: "I hope this tiny website becomes one of the memories we smile about in the future.",
  buttonText: "Replay Journey",
};
