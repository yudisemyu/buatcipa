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
  content: `

happy birthday cipaa

AKHIRNYAAAA 21 TAHUN..

HAHAHAHA nyusul juga tuh

aku harap kamu sehat terus, makin cantik, makin imut mirip kaya ur idol hwhwhehwewh

semoga cepet kelar kknnya trs bisa liburan yeyeyeyeyeyey(semoga ak diajak)

semoga dimudahkan semua urusannya, cepet sidang, lulus secepetnya, bisa banggain semua orang orang tersayang aaamiiiiinn

semoga kamu selalu dikelilingi orang orang yang baik sama kamu, yang sayang sama kamu, dan selalu bikin kamu bahagiaaa

terimakasi udah mau ngeladenin aku, udah sabar ngadepin aku yang kadang ngeselin hehehehe(selalu deng kayanya)

maaf aku ga bisa ngasih apa apa di hari spesial kamu, tapi aku harap kamu suka sama hadiah kecil kecilan ini

maaf kalo monoton, foto kita dikit banget aku bingung😔😔. semoga bisa nambah terus sampe akhirnya di pelaminan EHH

iloveu more and alwayssss

sincerely

yudis

made with love`,
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
  buttonText: "buka hadiah aku dong",
  // The secret surprise message revealed upon opening the gift box
  giftMessage: "Voucher Spesial: Jalan-jalan sama aku HAHAHHAHAAHH🎫✨\n(Bisa diklaim di ending yaa)",
};

export const WA_CLAIM = {
  phoneNumber: "6285325400414", // Ganti dengan nomor WA kamu (gunakan 62 di depan)
  message: "mau klaim hadiah dong bup", // Pesan otomatis yang akan dikirim
  buttonText: "Klaim hadiah di WA", // Teks tombol WA
};

export const ENDING_CONTENT = {
  title: "Happy Birthday ❤️",
  subtitle: "Makasih udah mau baca sampe sini.",
  message: "aku harap ini bisa jadi salah satu alasan kamu senyum hari ini",
  buttonText: "Ulangin",
};
