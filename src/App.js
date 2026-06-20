import { useState, useRef, useEffect } from "react";

const GENRES = [
  { id: "umiu",       name: "ウミウシ",       emoji: "🐚", color: "#5BC8E8", active: true,  free: true  },
  { id: "kinoko",     name: "きのこ",         emoji: "🍄", color: "#A0784A", active: true,  free: false },
  { id: "houseki",    name: "宝石",           emoji: "💎", color: "#B787E0", active: true,  free: false },
  { id: "hana",       name: "はな",           emoji: "🌸", color: "#FF8FAB", active: true,  free: false },
  { id: "sakana",     name: "さかな",         emoji: "🐠", color: "#4ECDC4", active: true,  free: false },
  { id: "dobutsu",    name: "どうぶつ",       emoji: "🐾", color: "#FFAA5A", active: true,  free: false },
  { id: "hachurui",   name: "は虫類・両生類", emoji: "🦎", color: "#7DBF6A", active: false, free: false },
  { id: "biseibutsu", name: "微生物",         emoji: "🔬", color: "#A8D8A8", active: false, free: false },
  { id: "shokuchu",   name: "食虫植物",       emoji: "🌿", color: "#E8A838", active: false, free: false },
  { id: "mushi",      name: "むし",           emoji: "🐛", color: "#D4756A", active: false, free: false },
];

// 総合認定証ランク定義
const TOTAL_CERT_RANKS = [
  { threshold:  50, title: "コレクション見習い",    file: "cert_total_050" },
  { threshold: 100, title: "コレクション隊員",      file: "cert_total_100" },
  { threshold: 150, title: "コレクション探検家",    file: "cert_total_150" },
  { threshold: 200, title: "コレクション研究員",    file: "cert_total_200" },
  { threshold: 250, title: "コレクション博士補",    file: "cert_total_250" },
  { threshold: 300, title: "コレクション博士",      file: "cert_total_300" },
  { threshold: 350, title: "コレクションマスター",  file: "cert_total_350" },
  { threshold: 400, title: "レジェンドコレクター",  file: "cert_total_400" },
  { threshold: 450, title: "大発見マスター",        file: "cert_total_450" },
  { threshold: 500, title: "まいにちコレクション王",file: "cert_total_500" },
];

const CHARACTERS = {
  umiu: [
    {id:"umiu_01",name:"あおぶく",rarity:"N"},{id:"umiu_02",name:"しろたん",rarity:"N"},
    {id:"umiu_03",name:"さくらも",rarity:"N"},{id:"umiu_04",name:"ごまる",rarity:"N"},
    {id:"umiu_05",name:"ゆきみ",rarity:"N"},{id:"umiu_06",name:"そーだん",rarity:"N"},
    {id:"umiu_07",name:"わかめっち",rarity:"N"},{id:"umiu_08",name:"てんてん",rarity:"N"},
    {id:"umiu_09",name:"きいろなみ",rarity:"N"},{id:"umiu_10",name:"うみにこ",rarity:"N"},
    {id:"umiu_11",name:"しずくん",rarity:"N"},{id:"umiu_12",name:"くろぶち",rarity:"N"},
    {id:"umiu_13",name:"そらもち",rarity:"N"},{id:"umiu_14",name:"ぷるね",rarity:"N"},
    {id:"umiu_15",name:"みずたまん",rarity:"N"},{id:"umiu_16",name:"るりきら",rarity:"N"},
    {id:"umiu_17",name:"ちゃぷりん",rarity:"N"},{id:"umiu_18",name:"ふゆうみ",rarity:"N"},
    {id:"umiu_19",name:"つきよみ",rarity:"R"},{id:"umiu_20",name:"こはく",rarity:"R"},
    {id:"umiu_21",name:"かみなりん",rarity:"R"},{id:"umiu_22",name:"ほしぞら",rarity:"R"},
    {id:"umiu_23",name:"ふゆあわ",rarity:"R"},{id:"umiu_24",name:"まよいみち",rarity:"R"},
    {id:"umiu_25",name:"しずぐも",rarity:"R"},{id:"umiu_26",name:"ほのおび",rarity:"R"},
    {id:"umiu_27",name:"よぞらみ",rarity:"R"},
    {id:"umiu_28",name:"オーロラミウシ",rarity:"SR"},{id:"umiu_29",name:"ほしのしんかい",rarity:"SR"},
    {id:"umiu_30",name:"いにしえのラグナ",rarity:"SR"},
  ],
  kinoko: [
    {id:"kinoko_01",name:"しいたん",rarity:"N"},{id:"kinoko_02",name:"えのぴょん",rarity:"N"},
    {id:"kinoko_03",name:"しめたん",rarity:"N"},{id:"kinoko_04",name:"なめこちゃん",rarity:"N"},
    {id:"kinoko_05",name:"えりんぎー",rarity:"N"},{id:"kinoko_06",name:"まいたけくん",rarity:"N"},
    {id:"kinoko_07",name:"ひらたけん",rarity:"N"},{id:"kinoko_08",name:"ぼたん",rarity:"N"},
    {id:"kinoko_09",name:"きくらげん",rarity:"N"},{id:"kinoko_10",name:"ぶなしめじ",rarity:"N"},
    {id:"kinoko_11",name:"はなびらちゃん",rarity:"N"},{id:"kinoko_12",name:"くりたけん",rarity:"N"},
    {id:"kinoko_13",name:"こぶちゃん",rarity:"N"},{id:"kinoko_14",name:"ひらきん",rarity:"N"},
    {id:"kinoko_15",name:"かさたん",rarity:"N"},{id:"kinoko_16",name:"あみたけん",rarity:"N"},
    {id:"kinoko_17",name:"こけしちゃん",rarity:"N"},{id:"kinoko_18",name:"くろまめくん",rarity:"N"},
    {id:"kinoko_19",name:"べにまる",rarity:"R"},{id:"kinoko_20",name:"たまごん",rarity:"R"},
    {id:"kinoko_21",name:"むらさきちゃん",rarity:"R"},{id:"kinoko_22",name:"どくつるくん",rarity:"R"},
    {id:"kinoko_23",name:"みどりのこ",rarity:"R"},{id:"kinoko_24",name:"ながいもくん",rarity:"R"},
    {id:"kinoko_25",name:"はなふわり",rarity:"R"},{id:"kinoko_26",name:"ぴかぴかちゃん",rarity:"R"},
    {id:"kinoko_27",name:"よぞらちゃん",rarity:"R"},
    {id:"kinoko_28",name:"もふじい",rarity:"SR"},{id:"kinoko_29",name:"ひとよちゃん",rarity:"SR"},
    {id:"kinoko_30",name:"つきぼう",rarity:"SR"},
  ],
  houseki: [
    {id:"houseki_01",name:"きらりん",rarity:"N"},{id:"houseki_02",name:"むらさきん",rarity:"N"},
    {id:"houseki_03",name:"ももこはる",rarity:"N"},{id:"houseki_04",name:"おひさま",rarity:"N"},
    {id:"houseki_05",name:"とらめくん",rarity:"N"},{id:"houseki_06",name:"みずいろん",rarity:"N"},
    {id:"houseki_07",name:"みどりん",rarity:"N"},{id:"houseki_08",name:"ゆきだま",rarity:"N"},
    {id:"houseki_09",name:"しろつき",rarity:"N"},{id:"houseki_10",name:"そらしずく",rarity:"N"},
    {id:"houseki_11",name:"きみどり",rarity:"N"},{id:"houseki_12",name:"あかりん",rarity:"N"},
    {id:"houseki_13",name:"さくらいろ",rarity:"N"},{id:"houseki_14",name:"ぎんぼし",rarity:"N"},
    {id:"houseki_15",name:"みるくん",rarity:"N"},{id:"houseki_16",name:"ちゃいろう",rarity:"N"},
    {id:"houseki_17",name:"にじみん",rarity:"N"},{id:"houseki_18",name:"きらこ",rarity:"N"},
    {id:"houseki_19",name:"ゆめつき",rarity:"R"},{id:"houseki_20",name:"にじひめ",rarity:"R"},
    {id:"houseki_21",name:"ほしうみ",rarity:"R"},{id:"houseki_22",name:"こおりのこころ",rarity:"R"},
    {id:"houseki_23",name:"あおぞら",rarity:"R"},{id:"houseki_24",name:"ほししずく",rarity:"R"},
    {id:"houseki_25",name:"きせきん",rarity:"R"},{id:"houseki_26",name:"しんびちゃん",rarity:"R"},
    {id:"houseki_27",name:"ぎんが",rarity:"R"},
    {id:"houseki_28",name:"おうさま",rarity:"SR"},{id:"houseki_29",name:"あかのひめ",rarity:"SR"},
    {id:"houseki_30",name:"あおのおうじ",rarity:"SR"},
  ],
  hana: [
    {id:"hana_01",name:"たんぽぽ",rarity:"N"},{id:"hana_02",name:"チューリップ",rarity:"N"},
    {id:"hana_03",name:"スミレちゃん",rarity:"N"},{id:"hana_04",name:"サクラコ",rarity:"N"},
    {id:"hana_05",name:"アサガオ",rarity:"N"},{id:"hana_06",name:"ヒマワリ",rarity:"N"},
    {id:"hana_07",name:"マーガレット",rarity:"N"},{id:"hana_08",name:"ナノハナ",rarity:"N"},
    {id:"hana_09",name:"タチアオイ",rarity:"N"},{id:"hana_10",name:"クローバー",rarity:"N"},
    {id:"hana_11",name:"コスモス",rarity:"N"},{id:"hana_12",name:"スイセン",rarity:"N"},
    {id:"hana_13",name:"パンジー",rarity:"N"},{id:"hana_14",name:"ネモフィラ",rarity:"N"},
    {id:"hana_15",name:"スズラン",rarity:"N"},{id:"hana_16",name:"カーネーション",rarity:"N"},
    {id:"hana_17",name:"ツツジ",rarity:"N"},{id:"hana_18",name:"ツバキ",rarity:"N"},
    {id:"hana_19",name:"ダリア",rarity:"R"},{id:"hana_20",name:"ラナンキュラス",rarity:"R"},
    {id:"hana_21",name:"ガーベラ",rarity:"R"},{id:"hana_22",name:"アネモネ",rarity:"R"},
    {id:"hana_23",name:"クリスマスローズ",rarity:"R"},{id:"hana_24",name:"フリージア",rarity:"R"},
    {id:"hana_25",name:"カンパニュラ",rarity:"R"},{id:"hana_26",name:"ラベンダー",rarity:"R"},
    {id:"hana_27",name:"ブルースター",rarity:"R"},
    {id:"hana_28",name:"青いバラ",rarity:"SR"},{id:"hana_29",name:"月下美人",rarity:"SR"},
    {id:"hana_30",name:"オオオニバス",rarity:"SR"},
  ],
  sakana: [
    {id:"sakana_01",name:"にもりん",rarity:"N"},{id:"sakana_02",name:"しまぼよ",rarity:"N"},
    {id:"sakana_03",name:"ふぐまる",rarity:"N"},{id:"sakana_04",name:"どりーみ",rarity:"N"},
    {id:"sakana_05",name:"きいろみ",rarity:"N"},{id:"sakana_06",name:"ばくばく",rarity:"N"},
    {id:"sakana_07",name:"きらきら",rarity:"N"},{id:"sakana_08",name:"こいこい",rarity:"N"},
    {id:"sakana_09",name:"めだかっち",rarity:"N"},{id:"sakana_10",name:"らんらん",rarity:"N"},
    {id:"sakana_11",name:"ぴかりん",rarity:"N"},{id:"sakana_12",name:"こばるん",rarity:"N"},
    {id:"sakana_13",name:"てんてん",rarity:"N"},{id:"sakana_14",name:"はたはた",rarity:"N"},
    {id:"sakana_15",name:"ひらひら",rarity:"N"},{id:"sakana_16",name:"ぎょろり",rarity:"N"},
    {id:"sakana_17",name:"ぷくりん",rarity:"N"},{id:"sakana_18",name:"かめきち",rarity:"N"},
    {id:"sakana_19",name:"にじひれ",rarity:"R"},{id:"sakana_20",name:"ほしふぐ",rarity:"R"},
    {id:"sakana_21",name:"りゅうみ",rarity:"R"},{id:"sakana_22",name:"ふわくらげ",rarity:"R"},
    {id:"sakana_23",name:"もようちゃん",rarity:"R"},{id:"sakana_24",name:"かくれんぼ",rarity:"R"},
    {id:"sakana_25",name:"ちょっちょ",rarity:"R"},{id:"sakana_26",name:"くらげるん",rarity:"R"},
    {id:"sakana_27",name:"ぎんぴか",rarity:"R"},
    {id:"sakana_28",name:"ほしじんべえ",rarity:"SR"},{id:"sakana_29",name:"りゅうごう",rarity:"SR"},
    {id:"sakana_30",name:"おーろらまんた",rarity:"SR"},
  ],
  dobutsu: [
    {id:"dobutsu_01",name:"しばころ",rarity:"N"},{id:"dobutsu_02",name:"もふうさ",rarity:"N"},
    {id:"dobutsu_03",name:"こぺん",rarity:"N"},{id:"dobutsu_04",name:"らっこまる",rarity:"N"},
    {id:"dobutsu_05",name:"くるりす",rarity:"N"},{id:"dobutsu_06",name:"みけにゃん",rarity:"N"},
    {id:"dobutsu_07",name:"はりねずみ",rarity:"N"},{id:"dobutsu_08",name:"こあらん",rarity:"N"},
    {id:"dobutsu_09",name:"ぱんだん",rarity:"N"},{id:"dobutsu_10",name:"ぞうぞう",rarity:"N"},
    {id:"dobutsu_11",name:"きりんりん",rarity:"N"},{id:"dobutsu_12",name:"かばぷー",rarity:"N"},
    {id:"dobutsu_13",name:"あらいぐま",rarity:"N"},{id:"dobutsu_14",name:"こぶたん",rarity:"N"},
    {id:"dobutsu_15",name:"しろくま",rarity:"N"},{id:"dobutsu_16",name:"ふくろう",rarity:"N"},
    {id:"dobutsu_17",name:"かわせみ",rarity:"N"},{id:"dobutsu_18",name:"かめきち",rarity:"N"},
    {id:"dobutsu_19",name:"ほしきつね",rarity:"R"},{id:"dobutsu_20",name:"ゆきしろ",rarity:"R"},
    {id:"dobutsu_21",name:"みずひょう",rarity:"R"},{id:"dobutsu_22",name:"そらくじら",rarity:"R"},
    {id:"dobutsu_23",name:"れっさーくん",rarity:"R"},{id:"dobutsu_24",name:"いるかるん",rarity:"R"},
    {id:"dobutsu_25",name:"やまとり",rarity:"R"},{id:"dobutsu_26",name:"おおやまねこ",rarity:"R"},
    {id:"dobutsu_27",name:"まれうさ",rarity:"R"},
    {id:"dobutsu_28",name:"にくじゃく",rarity:"SR"},{id:"dobutsu_29",name:"ほしおおかみ",rarity:"SR"},
    {id:"dobutsu_30",name:"つきしろ",rarity:"SR"},
  ],
  hachurui: [
    {id:"hachurui_01",name:"あまちゃん",rarity:"N"},{id:"hachurui_02",name:"とのさま",rarity:"N"},
    {id:"hachurui_03",name:"いもりん",rarity:"N"},{id:"hachurui_04",name:"やもりん",rarity:"N"},
    {id:"hachurui_05",name:"かなへびん",rarity:"N"},{id:"hachurui_06",name:"とかげん",rarity:"N"},
    {id:"hachurui_07",name:"ひょっこり",rarity:"N"},{id:"hachurui_08",name:"ちゃいろん",rarity:"N"},
    {id:"hachurui_09",name:"きみどり",rarity:"N"},{id:"hachurui_10",name:"べたぺた",rarity:"N"},
    {id:"hachurui_11",name:"のそのそ",rarity:"N"},{id:"hachurui_12",name:"みずたろう",rarity:"N"},
    {id:"hachurui_13",name:"しましま",rarity:"N"},{id:"hachurui_14",name:"あおへび",rarity:"N"},
    {id:"hachurui_15",name:"にこがお",rarity:"N"},{id:"hachurui_16",name:"おたまる",rarity:"N"},
    {id:"hachurui_17",name:"つちまる",rarity:"N"},{id:"hachurui_18",name:"こけもり",rarity:"N"},
    {id:"hachurui_19",name:"きんめだま",rarity:"R"},{id:"hachurui_20",name:"にじいろん",rarity:"R"},
    {id:"hachurui_21",name:"もふもふ",rarity:"R"},{id:"hachurui_22",name:"ひょうもん",rarity:"R"},
    {id:"hachurui_23",name:"あおきら",rarity:"R"},{id:"hachurui_24",name:"あかまる",rarity:"R"},
    {id:"hachurui_25",name:"ほしがめ",rarity:"R"},{id:"hachurui_26",name:"くろまし",rarity:"R"},
    {id:"hachurui_27",name:"みどりりゅう",rarity:"R"},
    {id:"hachurui_28",name:"りゅうじん",rarity:"SR"},{id:"hachurui_29",name:"にじのめ",rarity:"SR"},
    {id:"hachurui_30",name:"しんぴのもり",rarity:"SR"},
  ],
  biseibutsu: [
    {id:"biseibutsu_01",name:"みかづきん",rarity:"N"},{id:"biseibutsu_02",name:"くるくる",rarity:"N"},
    {id:"biseibutsu_03",name:"ふねっち",rarity:"N"},{id:"biseibutsu_04",name:"ばらみん",rarity:"N"},
    {id:"biseibutsu_05",name:"もじゃりん",rarity:"N"},{id:"biseibutsu_06",name:"まりもん",rarity:"N"},
    {id:"biseibutsu_07",name:"つぶつぶ",rarity:"N"},{id:"biseibutsu_08",name:"にこにこ",rarity:"N"},
    {id:"biseibutsu_09",name:"ふわりん",rarity:"N"},{id:"biseibutsu_10",name:"みどりたま",rarity:"N"},
    {id:"biseibutsu_11",name:"ほしみん",rarity:"N"},{id:"biseibutsu_12",name:"おさかなくん",rarity:"N"},
    {id:"biseibutsu_13",name:"たこあし",rarity:"N"},{id:"biseibutsu_14",name:"きらぼち",rarity:"N"},
    {id:"biseibutsu_15",name:"みずだま",rarity:"N"},{id:"biseibutsu_16",name:"ぼよん",rarity:"N"},
    {id:"biseibutsu_17",name:"ころころ",rarity:"N"},{id:"biseibutsu_18",name:"わっかりん",rarity:"N"},
    {id:"biseibutsu_19",name:"つのっち",rarity:"R"},{id:"biseibutsu_20",name:"らっぱん",rarity:"R"},
    {id:"biseibutsu_21",name:"きらきら",rarity:"R"},{id:"biseibutsu_22",name:"おどるん",rarity:"R"},
    {id:"biseibutsu_23",name:"ほしのこ",rarity:"R"},{id:"biseibutsu_24",name:"にじいろ",rarity:"R"},
    {id:"biseibutsu_25",name:"ひげまる",rarity:"R"},{id:"biseibutsu_26",name:"ぎざぎざ",rarity:"R"},
    {id:"biseibutsu_27",name:"ほたるん",rarity:"R"},
    {id:"biseibutsu_28",name:"ふしぎぐま",rarity:"SR"},{id:"biseibutsu_29",name:"ぎんがぼし",rarity:"SR"},
    {id:"biseibutsu_30",name:"うちゅうだま",rarity:"SR"},
  ],
  shokuchu: [
    {id:"shokuchu_01",name:"ハエトリくん",rarity:"N"},{id:"shokuchu_02",name:"ウツボちゃん",rarity:"N"},
    {id:"shokuchu_03",name:"モウセンくん",rarity:"N"},{id:"shokuchu_04",name:"サラセニアくん",rarity:"N"},
    {id:"shokuchu_05",name:"ムシトリスミちゃん",rarity:"N"},{id:"shokuchu_06",name:"ヘリアンくん",rarity:"N"},
    {id:"shokuchu_07",name:"あかモウセン",rarity:"N"},{id:"shokuchu_08",name:"まるつぼ",rarity:"N"},
    {id:"shokuchu_09",name:"しまつぼ",rarity:"N"},{id:"shokuchu_10",name:"きいろつぼ",rarity:"N"},
    {id:"shokuchu_11",name:"みどりふた",rarity:"N"},{id:"shokuchu_12",name:"あかふた",rarity:"N"},
    {id:"shokuchu_13",name:"つやつや",rarity:"N"},{id:"shokuchu_14",name:"ちびごけ",rarity:"N"},
    {id:"shokuchu_15",name:"しずくん",rarity:"N"},{id:"shokuchu_16",name:"ふわりん",rarity:"N"},
    {id:"shokuchu_17",name:"こつぼん",rarity:"N"},{id:"shokuchu_18",name:"にこふた",rarity:"N"},
    {id:"shokuchu_19",name:"べにひめ",rarity:"R"},{id:"shokuchu_20",name:"きらつぼ",rarity:"R"},
    {id:"shokuchu_21",name:"しろぼし",rarity:"R"},{id:"shokuchu_22",name:"あまつゆ",rarity:"R"},
    {id:"shokuchu_23",name:"おうじゃ",rarity:"R"},{id:"shokuchu_24",name:"かみつき",rarity:"R"},
    {id:"shokuchu_25",name:"ドラゴン",rarity:"R"},{id:"shokuchu_26",name:"みやびごけ",rarity:"R"},
    {id:"shokuchu_27",name:"ぎんつぼ",rarity:"R"},
    {id:"shokuchu_28",name:"だいおうつぼ",rarity:"SR"},{id:"shokuchu_29",name:"しんびのつぼ",rarity:"SR"},
    {id:"shokuchu_30",name:"きせきのわな",rarity:"SR"},
  ],
  mushi: [
    {id:"mushi_01",name:"てんとうむし",rarity:"N"},{id:"mushi_02",name:"ちょうちょん",rarity:"N"},
    {id:"mushi_03",name:"とんぼん",rarity:"N"},{id:"mushi_04",name:"みつばち",rarity:"N"},
    {id:"mushi_05",name:"ありんこ",rarity:"N"},{id:"mushi_06",name:"かぶくん",rarity:"N"},
    {id:"mushi_07",name:"くわがたん",rarity:"N"},{id:"mushi_08",name:"びかりん",rarity:"N"},
    {id:"mushi_09",name:"かまきち",rarity:"N"},{id:"mushi_10",name:"せみまる",rarity:"N"},
    {id:"mushi_11",name:"ばったん",rarity:"N"},{id:"mushi_12",name:"こおろぎ",rarity:"N"},
    {id:"mushi_13",name:"ほたるん",rarity:"N"},{id:"mushi_14",name:"てんてんぐん",rarity:"N"},
    {id:"mushi_15",name:"くもくん",rarity:"N"},{id:"mushi_16",name:"みずすまし",rarity:"N"},
    {id:"mushi_17",name:"みのむしくん",rarity:"N"},{id:"mushi_18",name:"だんごむし",rarity:"N"},
    {id:"mushi_19",name:"ぎらぎら",rarity:"R"},{id:"mushi_20",name:"うすばちゃん",rarity:"R"},
    {id:"mushi_21",name:"へびとんぼん",rarity:"R"},{id:"mushi_22",name:"きりぎりす",rarity:"R"},
    {id:"mushi_23",name:"はなかみきり",rarity:"R"},{id:"mushi_24",name:"おにやんま",rarity:"R"},
    {id:"mushi_25",name:"かみきりん",rarity:"R"},{id:"mushi_26",name:"はちきゅう",rarity:"R"},
    {id:"mushi_27",name:"ちょうおう",rarity:"R"},
    {id:"mushi_28",name:"ぎんがざむらい",rarity:"SR"},{id:"mushi_29",name:"むしのじょうおう",rarity:"SR"},
    {id:"mushi_30",name:"ほしのかぶくわ",rarity:"SR"},
  ],
};

const ACTIVE_GENRE_IDS = GENRES.filter(g => g.active).map(g => g.id);
const ALL_CHARS = Object.values(CHARACTERS).flat();
const ACTIVE_CHARS = ALL_CHARS.filter(c => ACTIVE_GENRE_IDS.some(id => c.id.startsWith(id)));

const STORAGE_KEY = "mainichiCollection_v1";
function loadStorage() {
  try { const r = localStorage.getItem(STORAGE_KEY); return r ? JSON.parse(r) : null; } catch { return null; }
}
function saveStorage(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
}
function todayStr() { return new Date().toLocaleDateString("ja-JP"); }

const RARITY_COLOR = { N:"#62C462", R:"#4A90E2", SR:"#F5A623" };
const RARITY_BG    = { N:"#EBF7EB", R:"#EAF2FF", SR:"#FFF7E6" };
const GACHA_COST   = 5;
const TASK_PT      = 1;
const CLEAR_BONUS  = 2;
const PARENT_BONUS_PT     = 2;
const PARENT_BONUS_TICKET = 1;

function makePlayer(name) {
  return { name, points:0, tickets:0, collection:{}, tasks:[], lastReset:todayStr(), consecutiveDupe:0 };
}
// デフォルトの表示ジャンル（全active）
function defaultVisibleGenres() {
  return GENRES.filter(g=>g.active).map(g=>g.id);
}
function rollGacha(consecutiveDupe, completedGenres=[]) {
  const r = Math.random();
  const srRate = consecutiveDupe >= 2 ? 0.15 : 0.075;
  const rarity = r < srRate ? "SR" : r < srRate + 0.20 ? "R" : "N";
  const pool = ACTIVE_CHARS.filter(c =>
    c.rarity === rarity &&
    !completedGenres.includes(c.id.split("_")[0])
  );
  const fallback = ACTIVE_CHARS.filter(c => c.rarity === rarity);
  const target = pool.length > 0 ? pool : fallback;
  return target[Math.floor(Math.random() * target.length)];
}
function getCharImage(charId) {
  const prefix = charId.split("_")[0];
  const imageGenres = ["umiu","kinoko","houseki","hana","sakana","dobutsu"];
  if (imageGenres.includes(prefix)) return `/images/${charId}.png`;
  return null;
}
function getCertImage(genreId) {
  // 総合認定証（"total_cert_total_XXX"形式）
  if (genreId.startsWith("total_")) {
    return `/images/${genreId.replace("total_","")}.png`;
  }
  return `/images/cert_${genreId}.png`;
}
// ジャンル選択対応ガチャ
// 未入手5倍・入手済み1倍の重み付き抽選
function weightedPick(chars, collection) {
  const WEIGHT_NEW = 5;
  const WEIGHT_HAVE = 1;
  const weighted = [];
  for (const c of chars) {
    const w = collection[c.id] ? WEIGHT_HAVE : WEIGHT_NEW;
    for (let i = 0; i < w; i++) weighted.push(c);
  }
  return weighted[Math.floor(Math.random() * weighted.length)];
}

function rollGachaFiltered(consecutiveDupe, completedGenres=[], selectedGenre="all", collection={}) {
  const r = Math.random();
  const srRate = consecutiveDupe >= 2 ? 0.15 : 0.075;
  const rarity = r < srRate ? "SR" : r < srRate + 0.20 ? "R" : "N";

  let candidates;
  if (selectedGenre === "all") {
    // 全ジャンル：コンプリート済みジャンルを除外
    candidates = ACTIVE_CHARS.filter(c =>
      c.rarity === rarity &&
      !completedGenres.includes(c.id.split("_")[0])
    );
  } else {
    // 特定ジャンル
    candidates = ACTIVE_CHARS.filter(c =>
      c.rarity === rarity && c.id.startsWith(selectedGenre)
    );
  }

  // フォールバック（候補が空の場合）
  if (candidates.length === 0) {
    candidates = ACTIVE_CHARS.filter(c => c.rarity === rarity);
  }

  // 未入手5倍・入手済み1倍の重み付き抽選
  return weightedPick(candidates, collection);
}
function getGenreEmoji(charId) {
  const g = GENRES.find(g => charId.startsWith(g.id));
  return g ? g.emoji : "🎴";
}

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');
  @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
  @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-70px) scale(1.5)}}
  @keyframes popIn{0%{transform:scale(0);opacity:0}80%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
  @keyframes newBadge{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:scale(1)}}
  @keyframes charFloat{0%{transform:scale(0) translateY(20px);opacity:0}70%{transform:scale(1.1) translateY(-5px)}100%{transform:scale(1) translateY(0);opacity:1}}
  @keyframes fadeUp{0%{transform:translateY(16px);opacity:0}100%{transform:translateY(0);opacity:1}}
  @keyframes particleFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}
  @keyframes srFlash{0%{opacity:0}20%{opacity:1}100%{opacity:0}}
  @keyframes beamFade{0%{opacity:0}20%{opacity:0.8}100%{opacity:0}}
  @keyframes idleBob{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-12px) rotate(3deg)}}
  @keyframes capsuleDrop{0%{transform:translateY(-130px) rotate(-20deg);opacity:0}30%{opacity:1}80%{transform:translateY(0) rotate(10deg)}100%{transform:translateY(0) rotate(0deg)}}
  @keyframes capsuleShake{0%,100%{transform:translateY(0) rotate(0)}20%{transform:translateY(-7px) rotate(-9deg)}40%{transform:translateY(2px) rotate(7deg)}60%{transform:translateY(-5px) rotate(-6deg)}80%{transform:translateY(1px) rotate(3deg)}}
  @keyframes topHalfFly{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(-90px) rotate(-45deg);opacity:0}}
  @keyframes bottomHalfFly{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(70px) rotate(25deg);opacity:0}}
  @keyframes charReveal{0%{transform:scale(0) rotate(-20deg);opacity:0}60%{transform:scale(1.2) rotate(6deg)}100%{transform:scale(1) rotate(0);opacity:1}}
  @keyframes sparkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
  @keyframes srBoostPulse{0%,100%{box-shadow:0 0 0 0 #F5A62388}50%{box-shadow:0 0 14px 4px #F5A62344}}
  @keyframes slideUp{0%{transform:translateY(100%);opacity:0}100%{transform:translateY(0);opacity:1}}
  @keyframes slideDown{0%{transform:translateY(0);opacity:1}100%{transform:translateY(100%);opacity:0}}
  @keyframes roomBgFade{0%{opacity:0}100%{opacity:1}}
  @keyframes shopSignBounce{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
  @keyframes capsuleSpin{0%{transform:rotate(0deg) translateX(60px) rotate(0deg)}100%{transform:rotate(360deg) translateX(60px) rotate(-360deg)}}
  @keyframes capsuleStop{0%{transform:scale(1)}30%{transform:scale(1.15)}60%{transform:scale(0.95)}100%{transform:scale(1)}}
  @keyframes capsuleWiggle{0%,100%{transform:rotate(0deg)}20%{transform:rotate(-12deg)}40%{transform:rotate(12deg)}60%{transform:rotate(-8deg)}80%{transform:rotate(8deg)}}
  @keyframes capsuleOpen{0%{transform:translateY(0)}100%{transform:translateY(-40px);opacity:0}}
  @keyframes capsuleOpenBottom{0%{transform:translateY(0)}100%{transform:translateY(30px);opacity:0}}
  @keyframes greetingIn{0%{transform:scale(0.8) translateY(20px);opacity:0}100%{transform:scale(1) translateY(0);opacity:1}}
`;

function Floaters({ items }) {
  return <>{items.map(s=>(
    <div key={s.id} style={{position:"fixed",left:s.x-16,top:s.y-16,pointerEvents:"none",zIndex:9999,fontSize:26,animation:"floatUp 0.9s ease-out forwards"}}>{s.icon}</div>
  ))}</>;
}

function PointBar({ points, tickets, canGachaCount }) {
  const partial = (points % GACHA_COST) / GACHA_COST;
  const remain = GACHA_COST - (points % GACHA_COST === 0 && points > 0 ? GACHA_COST : points % GACHA_COST);
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#aaa",marginBottom:3}}>
          <span>⭐ {points}pt {tickets>0&&<span style={{color:"#FF8C00"}}>🎟️×{tickets}</span>}</span>
          <span>あと{remain}pt</span>
        </div>
        <div style={{background:"#eee",borderRadius:99,height:10,overflow:"hidden"}}>
          <div style={{width:`${partial*100}%`,height:"100%",background:"linear-gradient(90deg,#FFD700,#FF8C00)",borderRadius:99,transition:"width 0.4s ease"}}/>
        </div>
      </div>
      <div style={{background:"#5599EE",color:"white",borderRadius:12,padding:"4px 10px",fontWeight:900,fontSize:13,whiteSpace:"nowrap"}}>
        🎰 {canGachaCount !== undefined ? canGachaCount : Math.floor(points/GACHA_COST)+(tickets||0)}回
      </div>
    </div>
  );
}

function CardSlot({ char, collected, onSelect }) {
  return (
    <div onClick={()=>collected&&onSelect&&onSelect(char)} style={{
      width:72,borderRadius:12,
      background:collected?RARITY_BG[char.rarity]:"#f2f2f2",
      border:`2px solid ${collected?RARITY_COLOR[char.rarity]:"#e0e0e0"}`,
      display:"flex",flexDirection:"column",alignItems:"center",
      padding:"8px 4px 6px",gap:3,opacity:collected?1:0.45,
      transition:"all 0.15s",cursor:collected?"pointer":"default",
    }}>
      <div style={{width:44,height:44,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {collected?(getCharImage(char.id)?<img src={getCharImage(char.id)} alt={char.name} style={{width:44,height:44,objectFit:"contain"}}/>:<span style={{fontSize:30}}>{getGenreEmoji(char.id)}</span>):<span style={{fontSize:28}}>❓</span>}
      </div>
      <div style={{fontSize:9,fontWeight:700,color:"#555",textAlign:"center",lineHeight:1.3,minHeight:22}}>{collected?char.name:"???"}</div>
      {collected&&<span style={{background:RARITY_COLOR[char.rarity],color:"white",borderRadius:99,padding:"1px 6px",fontSize:9,fontWeight:800}}>{char.rarity}</span>}
    </div>
  );
}

function CharDetail({ char, count, onClose }) {
  const genre = GENRES.find(g=>char.id.startsWith(g.id));
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2000,padding:24}} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{background:"white",borderRadius:28,padding:"32px 28px",width:"100%",maxWidth:320,textAlign:"center",animation:"popIn 0.35s ease",border:`4px solid ${RARITY_COLOR[char.rarity]}`,boxShadow:`0 12px 48px ${RARITY_COLOR[char.rarity]}44`,position:"relative"}}>
        <button onClick={onClose} style={{position:"absolute",top:14,right:14,background:"#f0f0f0",border:"none",borderRadius:"50%",width:32,height:32,fontSize:16,cursor:"pointer",color:"#aaa",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900}}>✕</button>
        <div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:RARITY_COLOR[char.rarity],color:"white",borderRadius:"0 0 14px 14px",padding:"4px 20px",fontWeight:900,fontSize:13,letterSpacing:2}}>{char.rarity}</div>
        <div style={{marginTop:20,marginBottom:8,filter:`drop-shadow(0 4px 12px ${RARITY_COLOR[char.rarity]}66)`,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {getCharImage(char.id)?<img src={getCharImage(char.id)} alt={char.name} style={{width:160,height:160,objectFit:"contain"}}/>:<span style={{fontSize:96}}>{genre?.emoji||"🎴"}</span>}
        </div>
        <div style={{fontWeight:900,fontSize:26,color:"#333",marginBottom:6}}>{char.name}</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:genre?`${genre.color}22`:"#f5f5f5",border:`1.5px solid ${genre?.color||"#eee"}`,borderRadius:99,padding:"5px 16px",fontSize:13,color:genre?.color||"#aaa",fontWeight:700,marginBottom:16}}>
          {genre?.emoji} {genre?.name}
        </div>
        {count>1&&<div style={{color:"#bbb",fontSize:12,marginTop:4}}>× {count} もってる</div>}
      </div>
    </div>
  );
}

function Capsule({ color1, color2, size=100, cracked=false, children }) {
  const w=size, h=size*1.2;
  return (
    <div style={{position:"relative",width:w,height:h}}>
      <svg width={w} height={h} viewBox="0 0 100 120" style={{position:"absolute",top:0,left:0}}>
        <defs>
          <linearGradient id="capTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color1}/><stop offset="100%" stopColor={color2}/>
          </linearGradient>
          <linearGradient id="capBot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.97"/><stop offset="100%" stopColor="#e0e0e0" stopOpacity="0.97"/>
          </linearGradient>
          <filter id="capShadow"><feDropShadow dx="0" dy="5" stdDeviation="7" floodColor="#00000033"/></filter>
        </defs>
        <path d="M50,5 A45,45 0 0 1 95,50 L95,62 Q95,65 50,65 Q5,65 5,62 L5,50 A45,45 0 0 1 50,5 Z" fill="url(#capTop)" filter="url(#capShadow)"/>
        <path d="M5,58 Q5,55 50,55 Q95,55 95,58 L95,75 A45,45 0 0 1 5,75 Z" fill="url(#capBot)" filter="url(#capShadow)"/>
        <ellipse cx="35" cy="25" rx="14" ry="8" fill="white" opacity="0.35"/>
        <line x1="5" y1="60" x2="95" y2="60" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5"/>
        {cracked&&<><path d="M45,55 L48,44 L52,52 L56,39" stroke="white" strokeWidth="1.8" fill="none" opacity="0.85"/><path d="M60,58 L63,49 L68,55" stroke="white" strokeWidth="1.4" fill="none" opacity="0.7"/></>}
      </svg>
      <div style={{position:"absolute",top:"28%",left:0,right:0,display:"flex",alignItems:"center",justifyContent:"center"}}>{children}</div>
    </div>
  );
}

function CapsuleHalf({ color1, color2, half, size=100 }) {
  return (
    <svg width={size} height={size*0.6} viewBox="0 0 100 60">
      <defs>
        <linearGradient id={`hg${half}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={half==="top"?color1:"white"}/><stop offset="100%" stopColor={half==="top"?color2:"#ddd"}/>
        </linearGradient>
      </defs>
      {half==="top"?<path d="M50,5 A45,45 0 0 1 95,50 L95,58 Q95,60 50,60 Q5,60 5,58 L5,50 A45,45 0 0 1 50,5 Z" fill="url(#hgtop)"/>:<path d="M5,2 Q5,0 50,0 Q95,0 95,2 L95,30 A45,45 0 0 1 5,30 Z" fill="url(#hgbottom)"/>}
    </svg>
  );
}

function CharPopup({ char, rarity, isNew, onClose }) {
  const isSR = rarity==="SR";
  const genre = GENRES.find(g=>char.id.startsWith(g.id));
  const img = getCharImage(char.id);
  const particles = Array.from({length:isSR?40:20},(_,i)=>i);
  return (
    <div onClick={onClose} style={{position:"fixed",inset:0,zIndex:3000,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,0.78)",padding:24}}>
      <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        {isSR&&<>
          <div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 50% 40%, #fff8 0%, transparent 65%)",animation:"srFlash 0.8s ease-out forwards"}}/>
          {Array.from({length:8}).map((_,i)=>(
            <div key={i} style={{position:"absolute",top:"42%",left:"50%",width:3,height:"55vh",background:"linear-gradient(to bottom, #FFD70099, transparent)",transformOrigin:"top center",transform:`rotate(${i*45}deg)`,animation:`beamFade 1.4s ease-out ${i*0.06}s forwards`,opacity:0}}/>
          ))}
        </>}
        {particles.map(i=>{
          const x=Math.random()*100,delay=Math.random()*1.0,dur=1.2+Math.random()*1.2;
          const size=isSR?12+Math.random()*16:7+Math.random()*9;
          const colors=isSR?["#FFD700","#FF8C00","#FFF","#FFFACD","#FFE066","#FFC0CB"]:rarity==="R"?["#87CEEB","#B0E0FF","#FFF","#C0D8FF"]:["#A8E6A8","#C8F0C8","#FFF","#D0F0D0"];
          const color=colors[Math.floor(Math.random()*colors.length)];
          const shape=isSR?["✦","★","✸","◆","✺"][Math.floor(Math.random()*5)]:["·","✦","○","✦","·"][Math.floor(Math.random()*5)];
          return <div key={i} style={{position:"absolute",left:`${x}%`,top:-20,fontSize:size,color,animation:`particleFall ${dur}s ease-in ${delay}s forwards`,opacity:0,textShadow:isSR?`0 0 10px ${color}`:"none"}}>{shape}</div>;
        })}
      </div>
      <div onClick={e=>e.stopPropagation()} style={{position:"relative",zIndex:1,background:"white",borderRadius:32,padding:"40px 32px 32px",width:"100%",maxWidth:340,textAlign:"center",border:`5px solid ${RARITY_COLOR[rarity]}`,boxShadow:isSR?`0 0 0 2px #FFD700, 0 16px 60px #F5A62366, 0 0 80px #FFD70044`:`0 16px 50px ${RARITY_COLOR[rarity]}44`,animation:"popIn 0.45s cubic-bezier(.17,.67,.35,1.3) both"}}>
        <div style={{position:"absolute",top:-2,left:"50%",transform:"translateX(-50%)",background:RARITY_COLOR[rarity],color:"white",borderRadius:"0 0 18px 18px",padding:"6px 28px",fontWeight:900,fontSize:15,letterSpacing:3,boxShadow:`0 4px 14px ${RARITY_COLOR[rarity]}55`}}>{rarity}</div>
        {isNew&&<div style={{position:"absolute",top:-14,right:-8,background:"#FF4757",color:"white",borderRadius:99,padding:"5px 14px",fontWeight:900,fontSize:12,animation:"newBadge 0.4s 0.3s cubic-bezier(.17,.67,.35,1.5) both",boxShadow:"0 3px 12px #FF475766"}}>はじめてゲット！</div>}
        <div style={{marginTop:28,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",filter:`drop-shadow(0 6px 18px ${RARITY_COLOR[rarity]}66)`,animation:"charFloat 0.6s 0.15s cubic-bezier(.17,.67,.35,1.3) both"}}>
          {img?<img src={img} alt={char.name} style={{width:180,height:180,objectFit:"contain"}}/>:<div style={{width:180,height:180,display:"flex",alignItems:"center",justifyContent:"center",background:genre?`${genre.color}22`:"#f5f5f5",borderRadius:20}}><span style={{fontSize:80}}>{genre?.emoji||"🎴"}</span></div>}
        </div>
        <div style={{fontWeight:900,fontSize:28,color:"#333",marginBottom:10,animation:"fadeUp 0.4s 0.3s ease both"}}>{char.name}</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:genre?`${genre.color}22`:"#f5f5f5",border:`1.5px solid ${genre?.color||"#eee"}`,borderRadius:99,padding:"5px 16px",fontSize:13,color:genre?.color||"#aaa",fontWeight:700,marginBottom:20,animation:"fadeUp 0.4s 0.35s ease both"}}>
          {genre?.name}
        </div>
        <button onClick={onClose} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#eee,#ddd)",border:"none",borderRadius:99,fontFamily:"inherit",fontWeight:900,fontSize:15,color:"#888",cursor:"pointer",animation:"fadeUp 0.4s 0.5s ease both"}}>
          とじる
        </button>
      </div>
    </div>
  );
}

const MASCOTS = [
  {id:"umiu_01",emoji:"🐚"},{id:"kinoko_19",emoji:"🍄"},
  {id:"houseki_20",emoji:"💎"},{id:"hana_14",emoji:"🌸"},
];

// 3カプセルの色定義
const CAPSULE_COLORS = [
  ["#FF6B6B","#c0392b"],  // 赤
  ["#7EC8FF","#4A90E2"],  // 青
  ["#78D878","#27ae60"],  // 緑
];

function GachaCapsuleAnimation({ onComplete, resultRarity="R", resultChar, consecutiveDupe=0 }) {
  // phase: spinning → stopping → wiggling → opening → done
  const [phase, setPhase] = useState("spinning");
  const [angle, setAngle] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(1); // 真ん中
  const [showPopup, setShowPopup] = useState(false);
  const isSR = resultRarity === "SR";
  const resultColor = isSR
    ? ["#FFD700","#FFA500"]
    : resultRarity==="R" ? ["#7EC8FF","#4A90E2"] : ["#78D878","#27ae60"];

  const animRef = useRef(null);
  const startTime = useRef(Date.now());

  // ぐるぐる回転
  useEffect(()=>{
    if(phase!=="spinning") return;
    startTime.current = Date.now();
    const tick = ()=>{
      const elapsed = Date.now() - startTime.current;
      // 2秒で自動停止
      if(elapsed > 2000){
        setPhase("stopping");
        return;
      }
      setAngle(a => a + 8);
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
    return()=>{ if(animRef.current) cancelAnimationFrame(animRef.current); };
  },[phase]);

  // 停止後の流れ
  useEffect(()=>{
    if(phase==="stopping"){
      setTimeout(()=>setPhase("wiggling"), 200);
    }
    if(phase==="wiggling"){
      setTimeout(()=>setPhase("opening"), 1200); // ゆらゆら4回分
    }
    if(phase==="opening"){
      setTimeout(()=>setShowPopup(true), 800);
    }
  },[phase]);

  // 3つのカプセルの位置（円軌道）
  const capsulePositions = [0,1,2].map(i=>{
    const a = (angle + i*120) * Math.PI/180;
    const rx = 55, ry = 22; // 楕円軌道
    return {
      x: Math.sin(a)*rx,
      y: Math.cos(a)*ry * -1,
      z: Math.cos(a), // 奥行き（-1〜1）
    };
  });
  // z値でソート（奥から手前へ描画）
  const sorted = [0,1,2]
    .map(i=>({i, ...capsulePositions[i]}))
    .sort((a,b)=>a.z-b.z);

  // 止まったとき、z値が最大（最前面）のカプセルを選択
  const frontIdx = capsulePositions.reduce((best,p,i)=>p.z>capsulePositions[best].z?i:best,0);

  return(
    <>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
        {/* 3カプセル回転エリア */}
        <div style={{position:"relative",width:200,height:200,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {sorted.map(({i,x,y,z})=>{
            const scale = 0.7 + (z+1)*0.25; // 手前ほど大きく
            const opacity = 0.5 + (z+1)*0.3;
            const isSelected = i===frontIdx && (phase==="wiggling"||phase==="opening"||phase==="done");
            const colors = isSelected
              ? resultColor
              : CAPSULE_COLORS[i % CAPSULE_COLORS.length];

            return(
              <div key={i} style={{
                position:"absolute",
                transform:`translate(${x}px,${y}px) scale(${scale})`,
                opacity: phase==="spinning" ? opacity : (isSelected?1:0.3),
                transition: phase==="spinning"?"none":"all 0.4s ease",
                zIndex: Math.round(z*10)+10,
                animation: isSelected && phase==="wiggling" ? "capsuleWiggle 0.25s ease-in-out 4" : "none",
              }}>
                {/* 開くフェーズ */}
                {isSelected && phase==="opening" ? (
                  <div style={{position:"relative",width:88,height:106}}>
                    <div style={{position:"absolute",top:0,left:0,right:0,animation:"capsuleOpen 0.6s ease-out forwards"}}>
                      <CapsuleHalf color1={colors[0]} color2={colors[1]} half="top" size={88}/>
                    </div>
                    <div style={{position:"absolute",bottom:0,left:0,right:0,animation:"capsuleOpenBottom 0.6s ease-out forwards"}}>
                      <CapsuleHalf color1={colors[0]} color2={colors[1]} half="bottom" size={88}/>
                    </div>
                  </div>
                ) : (
                  <Capsule color1={colors[0]} color2={colors[1]} size={88}/>
                )}
              </div>
            );
          })}

          {/* キラキラ（停止後） */}
          {(phase==="wiggling"||phase==="opening")&&isSR&&["✦","★","✸","✦","★"].map((s,i)=>(
            <div key={i} style={{
              position:"absolute",
              top:`${[10,5,75,65,40][i]}%`,
              left:`${[10,80,15,80,50][i]}%`,
              fontSize:16,color:"#FFD700",
              animation:`sparkle 0.4s ${i*0.1}s ease both`,
            }}>{s}</div>
          ))}
        </div>

        {/* フェーズ表示テキスト */}
        <div style={{marginTop:8,fontSize:12,color:"rgba(255,255,255,0.7)",fontWeight:700,height:20}}>
          {phase==="spinning"&&"くるくる…"}
          {phase==="wiggling"&&"ゆらゆら…"}
          {phase==="opening"&&"ぱかっ！"}
        </div>
      </div>

      {showPopup&&resultChar&&(
        <CharPopup
          char={resultChar}
          rarity={resultRarity}
          isNew={resultChar.isNew}
          onClose={()=>{ setShowPopup(false); onComplete&&onComplete(); }}
        />
      )}
    </>
  );
}



// ============================================================
// ログイン後あいさつポップアップ
// ============================================================
function GreetingPopup({ char, onClose }) {
  const genre = GENRES.find(g=>char.id.startsWith(g.id));
  const img = getCharImage(char.id);
  return (
    <div onClick={onClose} style={{
      position:"fixed",inset:0,zIndex:5000,
      display:"flex",alignItems:"center",justifyContent:"center",
      background:"rgba(0,0,0,0.55)",padding:24,
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"linear-gradient(160deg,#FFF8E1,#E3F2FD)",
        borderRadius:28,padding:"28px 24px",
        width:"100%",maxWidth:300,textAlign:"center",
        animation:"greetingIn 0.5s cubic-bezier(.17,.67,.35,1.3) both",
        boxShadow:"0 12px 48px rgba(0,0,0,0.25)",
        border:"3px solid #FFE082",
      }}>
        {/* キャラ画像 */}
        <div style={{
          marginBottom:12,
          filter:"drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
          display:"flex",alignItems:"center",justifyContent:"center",
        }}>
          {img
            ? <img src={img} alt={char.name} style={{width:120,height:120,objectFit:"contain"}}/>
            : <span style={{fontSize:72}}>{genre?.emoji||"🎴"}</span>
          }
        </div>

        {/* キャラ名 */}
        <div style={{fontWeight:900,fontSize:16,color:"#555",marginBottom:4}}>
          {char.name}
        </div>

        {/* メッセージ */}
        <div style={{
          fontWeight:900,fontSize:20,color:"#FF8C00",
          marginBottom:20,lineHeight:1.5,
        }}>
          きょうも<br/>いちにち がんばろう！
        </div>

        <button onClick={onClose} style={{
          background:"linear-gradient(135deg,#FFD700,#FF8C00)",
          border:"none",borderRadius:99,padding:"11px 36px",
          fontFamily:"inherit",fontWeight:900,fontSize:15,
          color:"white",cursor:"pointer",
          boxShadow:"0 4px 16px #FF8C0044",
        }}>
          うん、がんばる！
        </button>
      </div>
    </div>
  );
}

// ============================================================
// 認定証モーダル
// ============================================================
function CertModal({ genreId, genreName, genreEmoji, onClose }) {
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:4000,
      display:'flex', alignItems:'center', justifyContent:'center',
      background:'rgba(0,0,0,0.85)', padding:16,
    }}>
      <div onClick={e=>e.stopPropagation()} style={{
        position:'relative', width:'100%', maxWidth:380,
        animation:'popIn 0.5s cubic-bezier(.17,.67,.35,1.3) both',
      }}>
        {/* 認定証画像 */}
        <img
          src={getCertImage(genreId)}
          alt={genreName + ' 認定証'}
          style={{ width:'100%', borderRadius:20, display:'block',
            boxShadow:'0 8px 48px rgba(0,0,0,0.6)' }}
        />
        {/* とじるボタン */}
        <button onClick={onClose} style={{
          position:'absolute', top:12, right:12,
          background:'rgba(0,0,0,0.5)', border:'none', borderRadius:'50%',
          width:36, height:36, fontSize:18, color:'white',
          cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
          fontWeight:900,
        }}>✕</button>
        <div style={{
          marginTop:12, textAlign:'center',
          fontFamily:"'Kosugi Maru',sans-serif",
          fontWeight:900, fontSize:15, color:'white',
          textShadow:'0 2px 8px rgba(0,0,0,0.8)',
        }}>
          タップしてとじる
        </div>
      </div>
    </div>
  );
}

const DEBUG_CODE = "00012345";
const DEBUG_DURATION = 30 * 60 * 1000; // 30分

function PinModal({ onSuccess, onClose, correctPin, onDebug }) {
  const [val,setVal]=useState(""); const [err,setErr]=useState(false);
  function check(){
    if(val===correctPin){ onSuccess(); }
    else if(val===DEBUG_CODE){ onDebug&&onDebug(); onClose(); }
    else{ setErr(true); setVal(""); }
  }
  return(
    <div style={{textAlign:"center"}}>
      <div style={{fontSize:40,marginBottom:8}}>🔐</div>
      <div style={{fontWeight:900,fontSize:18,color:"#333",marginBottom:4}}>おやモード</div>
      <div style={{color:"#aaa",fontSize:12,marginBottom:20}}>PINコードをにゅうりょくしてください</div>
      <input type="password" value={val} onChange={e=>setVal(e.target.value)} onKeyDown={e=>e.key==="Enter"&&check()} placeholder="PIN" maxLength={8}
        style={{width:"100%",padding:"12px",borderRadius:14,textAlign:"center",border:`2px solid ${err?"#FF4757":"#ddd"}`,fontFamily:"inherit",fontSize:22,letterSpacing:8,outline:"none",boxSizing:"border-box"}}/>
      {err&&<div style={{color:"#FF4757",fontSize:12,marginTop:6}}>PINがちがいます</div>}
      <button onClick={check} style={{width:"100%",marginTop:14,background:"#FF8C00",border:"none",borderRadius:14,padding:13,fontFamily:"inherit",fontWeight:900,fontSize:16,color:"white",cursor:"pointer"}}>かくにん</button>
      <button onClick={onClose} style={{width:"100%",marginTop:8,background:"#f5f5f5",border:"none",borderRadius:14,padding:11,fontFamily:"inherit",fontSize:13,color:"#aaa",cursor:"pointer"}}>キャンセル</button>
    </div>
  );
}


// ============================================================
// 全リセットパネル
// ============================================================
function ResetPanel({ players, current, setPlayers, setPin, setParentOpen, setParentAuth, setupPin }) {
  const [step, setStep] = useState("idle"); // idle | confirm | done

  function doReset() {
    // 全プレイヤーのデータをリセット（名前だけ残す）
    const resetPlayers = players.map(p => makePlayer(p.name));
    setPlayers(resetPlayers);
    saveStorage({ players: resetPlayers, pin: setupPin });
    setStep("done");
    setTimeout(() => {
      setStep("idle");
      setParentOpen(false);
      setParentAuth(false);
    }, 2000);
  }

  return (
    <div style={{background:"#fff5f5",borderRadius:14,padding:14,marginTop:14,border:"2px solid #ffcccc"}}>
      <div style={{fontWeight:800,color:"#e05555",fontSize:13,marginBottom:6}}>🗑️ ぜんぶリセット</div>
      <div style={{fontSize:11,color:"#aaa",marginBottom:12,lineHeight:1.7}}>
        ポイント・コレクション・タスクを<br/>すべて削除します。名前はのこります。
      </div>

      {step === "idle" && (
        <button onClick={()=>setStep("confirm")} style={{
          width:"100%", background:"#f5f5f5", border:"2px solid #ffaaaa",
          borderRadius:11, padding:10, fontFamily:"inherit",
          fontWeight:800, fontSize:14, color:"#e05555", cursor:"pointer"
        }}>
          🗑️ リセットする
        </button>
      )}

      {step === "confirm" && (
        <div>
          <div style={{
            background:"#FF4757", color:"white", borderRadius:11,
            padding:"10px 12px", marginBottom:10, fontSize:13,
            fontWeight:700, textAlign:"center", lineHeight:1.6
          }}>
            ⚠️ ほんとうにリセットしますか？<br/>
            <span style={{fontSize:11,opacity:0.9}}>この操作はもとにもどせません！</span>
          </div>
          <div style={{display:"flex", gap:8}}>
            <button onClick={()=>setStep("idle")} style={{
              flex:1, background:"#f5f5f5", border:"none", borderRadius:11,
              padding:11, fontFamily:"inherit", fontWeight:800,
              fontSize:14, color:"#aaa", cursor:"pointer"
            }}>やめる</button>
            <button onClick={doReset} style={{
              flex:1, background:"linear-gradient(135deg,#FF4757,#c0392b)",
              border:"none", borderRadius:11, padding:11,
              fontFamily:"inherit", fontWeight:800, fontSize:14,
              color:"white", cursor:"pointer",
              boxShadow:"0 4px 14px #FF475744"
            }}>リセット！</button>
          </div>
        </div>
      )}

      {step === "done" && (
        <div style={{
          textAlign:"center", color:"#62C462",
          fontWeight:900, fontSize:15, padding:8
        }}>
          ✅ リセットしました！
        </div>
      )}
    </div>
  );
}

// ============================================================
// バックアップパネル（独立コンポーネント）
// ============================================================
function BackupPanel({ players, pin, setPlayers, setPin }) {
  const [backupText, setBackupText] = useState("");
  const [backupCopied, setBackupCopied] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState("");

  function doBackup() {
    const data = { players, pin, exportedAt: new Date().toISOString(), version: STORAGE_KEY };
    const json = JSON.stringify(data);
    // PC/Android: ダウンロード試行
    try {
      const blob = new Blob([json], { type:"application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mainichiCollection_backup.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch(_) {}
    // iPad用: テキスト表示
    setBackupText(json);
    setBackupCopied(false);
  }

  function doCopyBackup() {
    if (!backupText) return;
    navigator.clipboard.writeText(backupText).then(() => {
      setBackupCopied(true);
      setTimeout(() => setBackupCopied(false), 2000);
    }).catch(() => {
      const ta = document.getElementById("backupTA");
      if (ta) { ta.select(); document.execCommand("copy"); }
      setBackupCopied(true);
      setTimeout(() => setBackupCopied(false), 2000);
    });
  }

  function doRestoreFromText(text) {
    try {
      const data = JSON.parse(text.trim());
      if (!data.players || !data.pin) { setRestoreMsg("❌ ファイルがただしくありません"); return; }
      setPlayers(data.players);
      setPin(data.pin);
      saveStorage({ players: data.players, pin: data.pin });
      setRestoreMsg("✅ データをふっげんしました！");
      setBackupText("");
      setTimeout(() => setRestoreMsg(""), 3000);
    } catch {
      setRestoreMsg("❌ よみこみにしっぱいしました");
      setTimeout(() => setRestoreMsg(""), 3000);
    }
  }

  function doRestoreFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => doRestoreFromText(evt.target.result);
    reader.readAsText(file);
    e.target.value = "";
  }

  return (
    <div style={{background:"#f9f9f9",borderRadius:14,padding:14,marginTop:14}}>
      <div style={{fontWeight:800,color:"#555",fontSize:13,marginBottom:6}}>💾 データのバックアップ・ふっげん</div>
      <div style={{fontSize:11,color:"#aaa",marginBottom:12,lineHeight:1.7}}>
        キャッシュ削除でデータが消えるまえに保存しておこう！
      </div>

      {/* バックアップボタン */}
      <button onClick={doBackup} style={{width:"100%",background:"linear-gradient(135deg,#4CAF50,#2E7D32)",border:"none",borderRadius:11,padding:12,fontFamily:"inherit",fontWeight:800,fontSize:14,color:"white",cursor:"pointer",marginBottom:10}}>
        💾 バックアップをつくる
      </button>

      {/* iPad用テキスト表示 */}
      {backupText && (
        <div style={{marginBottom:12}}>
          <div style={{fontSize:11,color:"#888",marginBottom:6,lineHeight:1.6}}>
            📱 iPadの場合：下のテキストを全部コピーして<br/>メモアプリなどに保存してください
          </div>
          <textarea id="backupTA" readOnly value={backupText}
            style={{width:"100%",height:80,borderRadius:10,border:"2px solid #4CAF50",padding:8,fontSize:10,fontFamily:"monospace",resize:"none",boxSizing:"border-box",color:"#555",background:"#f0fff0"}}/>
          <button onClick={doCopyBackup} style={{width:"100%",marginTop:6,background:backupCopied?"#62C462":"linear-gradient(135deg,#4CAF50,#2E7D32)",border:"none",borderRadius:10,padding:9,fontFamily:"inherit",fontWeight:800,fontSize:13,color:"white",cursor:"pointer"}}>
            {backupCopied ? "✅ コピーしました！" : "📋 テキストをコピー"}
          </button>
        </div>
      )}

      {/* 復元 */}
      <div style={{fontSize:11,color:"#aaa",marginBottom:8,textAlign:"center"}}>▼ データをふっげんする</div>
      <label style={{display:"block",width:"100%",background:"#f0f0f0",border:"2px dashed #ccc",borderRadius:11,padding:"12px",textAlign:"center",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:13,color:"#aaa",boxSizing:"border-box",marginBottom:8}}>
        📂 ファイルをえらぶ（PC・Android）
        <input type="file" accept=".json,.txt" onChange={doRestoreFile} style={{display:"none"}}/>
      </label>
      <div style={{fontSize:11,color:"#ccc",marginBottom:6,textAlign:"center"}}>または</div>
      <textarea
        placeholder="📋 バックアップのテキストをここに貼り付け（iPad用）"
        style={{width:"100%",height:70,borderRadius:10,border:"2px dashed #ccc",padding:8,fontSize:11,fontFamily:"monospace",resize:"none",boxSizing:"border-box",color:"#555"}}
        onBlur={e=>{ if(e.target.value.trim()) { doRestoreFromText(e.target.value); e.target.value=""; } }}
      />
      {restoreMsg && (
        <div style={{color:restoreMsg.startsWith("✅")?"#62C462":"#FF4757",fontSize:13,marginTop:8,textAlign:"center",fontWeight:700}}>
          {restoreMsg}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [screen,setScreen]=useState(()=>loadStorage()?"main":"setup");
  const [setupNames,setSetupNames]=useState(["",""]);
  const [setupCount,setSetupCount]=useState(2);
  const [setupPin,setSetupPin]=useState("");
  const [setupPin2,setSetupPin2]=useState("");
  const [setupPinErr,setSetupPinErr]=useState("");

  const saved=loadStorage();
  const [players,setPlayers]=useState(()=>saved?.players||[]);
  const [pin,setPin]=useState(()=>saved?.pin||"1234");
  const [current,setCurrent]=useState(0);
  const [tab,setTab]=useState("todo");

  const [parentOpen,setParentOpen]=useState(false);
  const [parentAuth,setParentAuth]=useState(false);
  const [parentTab,setParentTab]=useState("tasks");
  const [newTask,setNewTask]=useState("");
  const [bonusType,setBonusType]=useState("pt");
  const [newPin,setNewPin]=useState("");
  const [newPin2,setNewPin2]=useState("");
  const [pinChangeMsg,setPinChangeMsg]=useState("");
  const [editNames,setEditNames]=useState([]);
  const [editCount,setEditCount]=useState(2);

  const [gachaKey,setGachaKey]=useState(0);
  const [gachaReady,setGachaReady]=useState(false);
  const [gachaPending,setGachaPending]=useState(null);
  const [certModal,setCertModal]=useState(null); // {genreId, genreName, genreEmoji}
  const [shownCerts,setShownCerts]=useState({}); // 表示済み認定証（セッション中）
  const [zukanGenre,setZukanGenre]=useState("umiu");
  const [gachaGenre,setGachaGenre]=useState("all"); // "all" or genreId
  const [gachaRoomOpen,setGachaRoomOpen]=useState(false); // ガチャやさんポップアップ
  const [greeting,setGreeting]=useState(null); // あいさつポップアップ {char}
  const [visibleGenres,setVisibleGenres]=useState(()=>{
    const saved=loadStorage();
    return saved?.visibleGenres || defaultVisibleGenres();
  }); // 親が表示するジャンルを選択
  const [totalCertModal,setTotalCertModal]=useState(null); // 総合認定証ポップアップ
  const [shownTotalCerts,setShownTotalCerts]=useState({}); // 表示済み総合認定証
  const bgmRef = useRef(null); // BGM Audio
  const gachaBgmRef = useRef(null); // ガチャBGM Audio（将来用）
  const [certView,setCertView]=useState(null); // にんていしょうタブで選択中
  const [debugMode,setDebugMode]=useState(false); // デバッグモード
  const [debugExpiry,setDebugExpiry]=useState(null); // 有効期限タイムスタンプ
  const [debugRemain,setDebugRemain]=useState(0); // 残り秒数
  const [selectedChar,setSelectedChar]=useState(null);
  const [floaters,setFloaters]=useState([]);
  const fxId=useRef(0);

  function addFloater(x,y,icon="⭐"){
    const id=fxId.current++;
    setFloaters(f=>[...f,{id,x,y,icon}]);
    setTimeout(()=>setFloaters(f=>f.filter(fl=>fl.id!==id)),900);
  }

  useEffect(()=>{ if(players.length>0) saveStorage({players,pin}); },[players,pin]);

  // ログイン後あいさつポップアップ（初回マウント時）
  useEffect(()=>{
    if(players.length===0) return;
    const p = players[0];
    const allCollected = Object.keys(p.collection||{});
    if(allCollected.length > 0){
      // 持っているキャラからランダム1体
      const randomId = allCollected[Math.floor(Math.random()*allCollected.length)];
      const char = Object.values(CHARACTERS).flat().find(c=>c.id===randomId);
      if(char) setTimeout(()=>setGreeting(char), 600);
    }
  // eslint-disable-next-line
  },[]);

  // BGM初期化・ループ再生
  useEffect(()=>{
    const audio = new Audio("/bgm_main.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    bgmRef.current = audio;
    audio.play().catch(()=>{}); // 自動再生ブロック対応
    return ()=>{ audio.pause(); audio.src=""; };
  },[]);

  // ガチャやさん開閉でBGM切替（将来のガチャBGM対応）
  useEffect(()=>{
    if(!bgmRef.current) return;
    if(gachaRoomOpen){
      // ガチャBGMがある場合はここで切替（現在はメインBGMをそのまま継続）
      // bgmRef.current.pause(); gachaBgmRef.current?.play();
    } else {
      // bgmRef.current.play().catch(()=>{});
    }
  },[gachaRoomOpen]);

  // visibleGenresが変わったらlocalStorageに保存
  useEffect(()=>{
    if(players.length>0) saveStorage({players, pin, visibleGenres});
  },[visibleGenres]);

  // ガチャやさん：ポイント・チケットがなくなったら自動で閉じる
  useEffect(()=>{
    if(!gachaRoomOpen) return;
    if(debugMode) return; // デバッグモード中は閉じない
    if(!gachaReady && canGachaCount <= 0){
      setGachaRoomOpen(false);
    }
  },[canGachaCount, gachaRoomOpen, gachaReady, debugMode]);

  // デバッグモードカウントダウン
  useEffect(()=>{
    if(!debugMode) return;
    const interval = setInterval(()=>{
      const remain = Math.max(0, Math.round((debugExpiry - Date.now()) / 1000));
      setDebugRemain(remain);
      if(remain <= 0){
        setDebugMode(false);
        setDebugExpiry(null);
        setDebugRemain(0);
      }
    }, 1000);
    return ()=>clearInterval(interval);
  },[debugMode, debugExpiry]);

  function activateDebug(){
    const expiry = Date.now() + DEBUG_DURATION;
    setDebugMode(true);
    setDebugExpiry(expiry);
    setDebugRemain(DEBUG_DURATION / 1000);
  }
  useEffect(()=>{
    if(players.length===0) return;
    const today=todayStr();
    setPlayers(prev=>prev.map(p=>{
      if(p.lastReset!==today) return{...p,tasks:p.tasks.map(t=>({...t,done:false})),lastReset:today};
      return p;
    }));
  },[]);

  const rawPlayer=players[current]||makePlayer("?");
  const player={tickets:0,consecutiveDupe:0,...rawPlayer};

  function updatePlayer(idx,fn){
    setPlayers(prev=>prev.map((p,i)=>i===idx?fn({tickets:0,consecutiveDupe:0,...p}):p));
  }

  function startGame(){
    if(setupPin.length<4){setSetupPinErr("PINは4けた以上にしてください");return;}
    if(setupPin!==setupPin2){setSetupPinErr("PINがあっていません");return;}
    const names=setupNames.slice(0,setupCount).map((n,i)=>n.trim()||`プレイヤー${i+1}`);
    const newPlayers=names.map(makePlayer);
    setPlayers(newPlayers); setPin(setupPin);
    setEditNames(names); setEditCount(setupCount);
    saveStorage({players:newPlayers,pin:setupPin});
    setScreen("main");
  }

  function completeTask(taskId,e){
    const task=player.tasks.find(t=>t.id===taskId);
    if(!task) return;
    const rect=e.currentTarget.getBoundingClientRect();

    if(!task.done){
      // チェックON
      addFloater(rect.left+rect.width/2,rect.top,"⭐");
      setPlayers(prev=>prev.map((p,i)=>{
        if(i!==current) return p;
        const tasks=p.tasks.map(t=>t.id===taskId?{...t,done:true}:t);
        const allDone=tasks.every(t=>t.done),prevAllDone=p.tasks.every(t=>t.done);
        const bonus=(allDone&&!prevAllDone)?CLEAR_BONUS:0;
        if(bonus>0) setTimeout(()=>addFloater(rect.left+rect.width/2,rect.top-30,"🎉"),300);
        return{...p,tasks,points:p.points+TASK_PT+bonus};
      }));
    } else {
      // チェックOFF（ポイント返却）
      setPlayers(prev=>prev.map((p,i)=>{
        if(i!==current) return p;
        const wasAllDone=p.tasks.every(t=>t.done);
        const tasks=p.tasks.map(t=>t.id===taskId?{...t,done:false}:t);
        // 全クリボーナスを受け取っていた場合は返却
        const bonusReturn=wasAllDone?CLEAR_BONUS:0;
        // ポイントが足りる場合のみ減点（マイナスにしない）
        const deduct=Math.min(TASK_PT+bonusReturn, p.points);
        return{...p,tasks,points:p.points-deduct};
      }));
    }
  }
  function addTaskParent(){ if(!newTask.trim()) return; updatePlayer(current,p=>({...p,tasks:[...p.tasks,{id:Date.now(),text:newTask.trim(),done:false}]})); setNewTask(""); }
  function removeTask(id){ updatePlayer(current,p=>({...p,tasks:p.tasks.filter(t=>t.id!==id)})); }
  function resetTasks(){ updatePlayer(current,p=>({...p,tasks:p.tasks.map(t=>({...t,done:false}))})); }

  // コンプリート済みジャンルを計算
  function getCompletedGenres(collection) {
    return GENRES.filter(g => {
      if (!g.active) return false;
      return CHARACTERS[g.id].every(c => !!collection[c.id]);
    }).map(g => g.id);
  }

  // 総合認定証チェック：コレクション数に応じたランクを返す
  function getTotalCertRank(collection) {
    const total = Object.keys(collection).length;
    let currentRank = null;
    for(const rank of TOTAL_CERT_RANKS){
      if(total >= rank.threshold) currentRank = rank;
    }
    return currentRank; // 現在の最高ランク
  }

  function doGacha(){
    if(gachaReady) return;
    const canUseTicket=(player.tickets||0)>0;
    const canUsePt=player.points>=GACHA_COST;
    // デバッグモード中はポイント・チケット不要
    if(!debugMode && !canUseTicket && !canUsePt) return;
    const completedGenres = getCompletedGenres(player.collection);
    // ガチャジャンル選択反映（allの場合はコンプリート除外のみ）
    const result = rollGachaFiltered(player.consecutiveDupe, completedGenres, gachaGenre, player.collection);
    const isNew=!player.collection[result.id];
    updatePlayer(current,p=>{
      const usedTicket=!debugMode&&(p.tickets||0)>0;
      const isSR=result.rarity==="SR";
      const wasDupe=!!p.collection[result.id];
      const newConsecutiveDupe=isSR?0:(wasDupe?(p.consecutiveDupe||0)+1:0);
      const newCollection={...p.collection,[result.id]:(p.collection[result.id]||0)+1};
      // コンプリートチェック（ガチャ後）
      const genreId = result.id.split("_")[0];
      const genre = GENRES.find(g=>g.id===genreId);
      const justCompleted = genre && CHARACTERS[genreId].every(c=>!!newCollection[c.id]);
      if(justCompleted && !shownCerts[genreId]) {
        setTimeout(()=>{
          setCertModal({genreId, genreName:genre.name, genreEmoji:genre.emoji});
          setShownCerts(prev=>({...prev,[genreId]:true}));
        }, 2200);
      }
      // 総合認定証チェック
      const totalRank = getTotalCertRank(newCollection);
      if(totalRank && !shownTotalCerts[totalRank.file]){
        setTimeout(()=>{
          setTotalCertModal(totalRank);
          setShownTotalCerts(prev=>({...prev,[totalRank.file]:true}));
        }, justCompleted?4000:2200);
      }
      return{
        ...p,
        points: debugMode ? p.points : (usedTicket ? p.points : p.points - GACHA_COST),
        tickets: debugMode ? (p.tickets||0) : (usedTicket ? (p.tickets||0)-1 : (p.tickets||0)),
        collection: newCollection,
        consecutiveDupe: newConsecutiveDupe,
      };
    });
    setGachaPending({...result,isNew});
    setGachaKey(k=>k+1);
    setGachaReady(true);
  }
  function onGachaComplete(){
    setGachaReady(false);
    setGachaPending(null);
    // ガチャ完了後→ガチャやさん内でカテゴリ変更できるよう物屋は開いたまま
  }

  function giveBonus(){
    if(bonusType==="pt"){ updatePlayer(current,p=>({...p,points:p.points+PARENT_BONUS_PT})); addFloater(window.innerWidth/2,200,"⭐"); }
    else{ updatePlayer(current,p=>({...p,tickets:(p.tickets||0)+PARENT_BONUS_TICKET})); addFloater(window.innerWidth/2,200,"🎟️"); }
    setParentOpen(false); setParentAuth(false);
  }
  function applyPlayerSettings(){
    const newNames=editNames.slice(0,editCount).map((n,i)=>n.trim()||`プレイヤー${i+1}`);
    setPlayers(prev=>{ const next=[]; for(let i=0;i<editCount;i++) next.push(prev[i]?{...prev[i],name:newNames[i]}:makePlayer(newNames[i])); return next; });
    if(current>=editCount) setCurrent(0);
  }
  function changePin(){
    if(newPin.length<4){setPinChangeMsg("4けた以上にしてください");return;}
    if(newPin!==newPin2){setPinChangeMsg("PINがあっていません");return;}
    setPin(newPin); setNewPin(""); setNewPin2(""); setPinChangeMsg("✅ PINをかえました！");
    setTimeout(()=>setPinChangeMsg(""),2000);
  }

  const doneTasks=player.tasks.filter(t=>t.done).length;
  const totalTasks=player.tasks.length;
  const collected=Object.keys(player.collection).length;
  const totalActive=ACTIVE_CHARS.length;
  const canGachaCount=Math.floor(player.points/GACHA_COST)+(player.tickets||0);
  const canGacha=debugMode || canGachaCount>0;
  const srBoosted=player.consecutiveDupe>=2;

  if(screen==="setup") return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#FFF8E1,#E3F2FD)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Kosugi Maru',sans-serif",padding:24}}>
      <style>{GLOBAL_CSS}</style>
      <div style={{fontSize:52,animation:"bounce 2s infinite",marginBottom:8}}>🌟</div>
      <h1 style={{fontSize:26,fontWeight:900,color:"#FF8C00",margin:"0 0 4px",textAlign:"center"}}>まいにちコレクション</h1>
      <p style={{color:"#bbb",fontSize:13,marginBottom:28}}>さいしょにせっていしよう！</p>
      <div style={{width:"100%",maxWidth:360,display:"flex",flexDirection:"column",gap:14}}>
        <div style={{background:"white",borderRadius:18,padding:18,boxShadow:"0 2px 12px #0001"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#888",marginBottom:10}}>こどものにんずう</div>
          <div style={{display:"flex",gap:8}}>
            {[1,2,3,4].map(n=><button key={n} onClick={()=>setSetupCount(n)} style={{flex:1,padding:"10px 0",borderRadius:12,border:"none",background:setupCount===n?"#FF8C00":"#f5f5f5",color:setupCount===n?"white":"#999",fontFamily:"inherit",fontWeight:900,fontSize:16,cursor:"pointer"}}>{n}人</button>)}
          </div>
        </div>
        <div style={{background:"white",borderRadius:18,padding:18,boxShadow:"0 2px 12px #0001"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#888",marginBottom:10}}>なまえ</div>
          {Array.from({length:setupCount}).map((_,i)=>(
            <input key={i} value={setupNames[i]||""} onChange={e=>setSetupNames(prev=>{const a=[...prev];a[i]=e.target.value;return a;})} placeholder={`プレイヤー${i+1}`}
              style={{width:"100%",padding:"10px 14px",borderRadius:12,marginBottom:8,border:"2px solid #FFE082",fontFamily:"inherit",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
          ))}
        </div>
        <div style={{background:"white",borderRadius:18,padding:18,boxShadow:"0 2px 12px #0001"}}>
          <div style={{fontSize:13,fontWeight:700,color:"#888",marginBottom:10}}>おやモードのPINコード</div>
          <input type="password" value={setupPin} onChange={e=>setSetupPin(e.target.value)} placeholder="PINをきめてね（4けた以上）"
            style={{width:"100%",padding:"10px 14px",borderRadius:12,marginBottom:8,border:`2px solid ${setupPinErr?"#FF4757":"#FFE082"}`,fontFamily:"inherit",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
          <input type="password" value={setupPin2} onChange={e=>setSetupPin2(e.target.value)} placeholder="もういちどにゅうりょく"
            style={{width:"100%",padding:"10px 14px",borderRadius:12,border:`2px solid ${setupPinErr?"#FF4757":"#FFE082"}`,fontFamily:"inherit",fontSize:15,outline:"none",boxSizing:"border-box"}}/>
          {setupPinErr&&<div style={{color:"#FF4757",fontSize:12,marginTop:6}}>{setupPinErr}</div>}
        </div>
        <button onClick={startGame} style={{background:"linear-gradient(135deg,#FFD700,#FF8C00)",border:"none",borderRadius:99,padding:"15px",fontFamily:"inherit",fontWeight:900,fontSize:18,color:"white",cursor:"pointer",boxShadow:"0 4px 20px #ff8c0044"}}>はじめる！🎮</button>
      </div>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#FFF8E1,#E3F2FD)",fontFamily:"'Kosugi Maru',sans-serif",paddingBottom:80}}>
      <style>{GLOBAL_CSS}</style>
      <Floaters items={floaters}/>

      {/* デバッグモードバナー */}
      {debugMode&&(
        <div style={{
          background:"linear-gradient(90deg,#2d2d2d,#1a1a2e)",
          padding:"6px 14px",
          display:"flex",alignItems:"center",justifyContent:"space-between",
        }}>
          <div style={{color:"#00ff88",fontWeight:900,fontSize:12,fontFamily:"monospace"}}>
            🔧 DEBUGモード ON
          </div>
          <div style={{color:"#ffcc00",fontWeight:700,fontSize:12,fontFamily:"monospace"}}>
            ⏱ {Math.floor(debugRemain/60)}:{String(debugRemain%60).padStart(2,"0")}
          </div>
          <button onClick={()=>{setDebugMode(false);setDebugExpiry(null);setDebugRemain(0);}} style={{
            background:"#ff4444",border:"none",borderRadius:6,
            padding:"3px 8px",color:"white",fontWeight:900,fontSize:11,cursor:"pointer"
          }}>終了</button>
        </div>
      )}
      <div style={{background:"linear-gradient(90deg,#5BC8E8,#4ECDC4)",padding:"12px 14px 14px",borderRadius:"0 0 22px 22px",boxShadow:"0 4px 18px rgba(0,0,0,0.10)"
      ,borderRadius:debugMode?"0 0 22px 22px":"0 0 22px 22px"
      }}>
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {players.map((p,i)=>(
            <button key={i} onClick={()=>{setCurrent(i);setGachaReady(false);setGachaPending(null);}} style={{flex:1,padding:"7px 4px",borderRadius:12,border:"none",background:i===current?"white":"rgba(255,255,255,0.3)",color:i===current?"#333":"white",fontFamily:"inherit",fontWeight:800,fontSize:13,cursor:"pointer",transition:"all 0.2s"}}>{p.name}</button>
          ))}
          <button onClick={()=>{setParentOpen(true);setParentAuth(false);}} style={{padding:"7px 12px",borderRadius:12,border:"none",background:"rgba(255,255,255,0.25)",color:"white",fontSize:18,cursor:"pointer"}}>🔐</button>
        </div>
        <div style={{background:"rgba(255,255,255,0.9)",borderRadius:12,padding:"8px 12px",marginBottom:0}}>
          <PointBar points={player.points} tickets={player.tickets||0} canGachaCount={canGachaCount}/>
        </div>
      </div>

      <div style={{display:"flex",gap:8,padding:"10px 14px 0"}}>
        {[["todo","📋 やること"],["gacha","🎰 ガチャ"],["zukan","📖 ずかん"],["cert","🏆 にんていしょう"]].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{flex:1,padding:"10px 0",borderRadius:13,border:"none",cursor:"pointer",fontFamily:"inherit",fontWeight:800,fontSize:12,background:tab===key?"#FF8C00":"white",color:tab===key?"white":"#aaa",boxShadow:tab===key?"0 3px 12px #ff8c0033":"0 1px 4px #0001",transition:"all 0.2s"}}>{label}</button>
        ))}
      </div>

      <div style={{padding:"12px 14px",maxWidth:480,margin:"0 auto"}}>
        {tab==="todo"&&(
          <>
            {player.tasks.length===0?(
              <div style={{textAlign:"center",padding:"48px 0",color:"#ccc"}}>
                <div style={{fontSize:52,marginBottom:12}}>📋</div>
                <div style={{fontWeight:700,lineHeight:1.8}}>🔐 おやモードで<br/>タスクをついかしてね！</div>
              </div>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                  <div style={{fontSize:12,color:"#aaa",fontWeight:700}}>{doneTasks===totalTasks&&totalTasks>0?`🎉 ぜんぶおわった！+${CLEAR_BONUS}pt ボーナス！`:`あと ${totalTasks-doneTasks}こ！`}</div>

                </div>
                <div style={{background:"#eee",borderRadius:99,height:8,marginBottom:12,overflow:"hidden"}}>
                  <div style={{width:totalTasks>0?`${(doneTasks/totalTasks)*100}%`:"0%",height:"100%",background:"linear-gradient(90deg,#78D878,#FFD700)",borderRadius:99,transition:"width 0.5s ease"}}/>
                </div>
                {player.tasks.map(task=>(
                  <button key={task.id} onClick={e=>completeTask(task.id,e)}
                    style={{width:"100%",display:"flex",alignItems:"center",gap:12,background:task.done?"#F1F8F1":"white",border:`2px solid ${task.done?"#78D878":"#FFE082"}`,borderRadius:15,padding:"13px 14px",marginBottom:8,cursor:"pointer",fontFamily:"inherit",fontSize:15,fontWeight:700,color:task.done?"#78D878":"#333",textAlign:"left",transition:"all 0.15s",boxShadow:task.done?"none":"0 2px 8px #ffd70018"}}>
                    <span style={{fontSize:22}}>{task.done?"✅":"⬜"}</span>
                    <span style={{flex:1}}>{task.text}</span>
                    <span style={{fontSize:11,color:task.done?"#e07777":"#FFB74D",fontWeight:700}}>{task.done?"もどす":"+" + TASK_PT + "pt"}</span>
                  </button>
                ))}
              </>
            )}
          </>
        )}

        {tab==="gacha"&&(
          <div style={{paddingTop:8}}>
            {/* SR確率アップバナー */}
            {srBoosted&&(
              <div style={{background:"linear-gradient(135deg,#FFF3C4,#FFE082)",border:"2px solid #F5A623",borderRadius:14,padding:"10px 16px",marginBottom:12,animation:"srBoostPulse 1.5s ease infinite",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:18}}>✨</span>
                <div style={{textAlign:"center"}}>
                  <div style={{fontWeight:900,color:"#B8720A",fontSize:13}}>SR確率２倍アップ中！</div>
                  <div style={{fontSize:11,color:"#C8860A"}}>ダブりが{player.consecutiveDupe}回つづいてるよ</div>
                </div>
                <span style={{fontSize:18}}>✨</span>
              </div>
            )}

            {debugMode&&(
              <div style={{background:"#1a1a2e",borderRadius:10,padding:"6px 12px",marginBottom:10,fontFamily:"monospace",fontSize:11,color:"#00ff88",fontWeight:700,textAlign:"center"}}>
                🔧 デバッグモード：ガチャ無制限 ⏱{Math.floor(debugRemain/60)}:{String(debugRemain%60).padStart(2,"0")}
              </div>
            )}

            {/* カテゴリ選択 */}
            <div style={{marginBottom:16}}>
              <div style={{fontSize:12,color:"#aaa",marginBottom:8,fontWeight:700,textAlign:"center"}}>🎲 ガチャするカテゴリをえらぼう</div>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
                <button onClick={()=>setGachaGenre("all")} style={{
                  padding:"10px 16px",borderRadius:14,border:"none",
                  background:gachaGenre==="all"?"linear-gradient(135deg,#FF8C00,#FFD700)":"white",
                  color:gachaGenre==="all"?"white":"#888",
                  fontFamily:"inherit",fontWeight:800,fontSize:12,cursor:"pointer",
                  boxShadow:gachaGenre==="all"?"0 3px 12px #FF8C0044":"0 1px 4px #0001",
                  transition:"all 0.2s",
                }}>🎲 ぜんぶ</button>
                {GENRES.filter(g=>g.active && visibleGenres.includes(g.id)).map(g=>{
                  const cnt=CHARACTERS[g.id].filter(c=>player.collection[c.id]).length;
                  const isComplete=cnt===30;
                  const isSelected=gachaGenre===g.id;
                  return(
                    <button key={g.id} onClick={()=>setGachaGenre(g.id)} style={{
                      padding:"10px 14px",borderRadius:14,border:"none",
                      background:isSelected?`linear-gradient(135deg,${g.color},${g.color}cc)`:"white",
                      color:isSelected?"white":"#666",
                      fontFamily:"inherit",fontWeight:800,fontSize:12,cursor:"pointer",
                      boxShadow:isSelected?`0 3px 12px ${g.color}55`:"0 1px 4px #0001",
                      border:isComplete&&!isSelected?`2px solid ${g.color}`:"2px solid transparent",
                      transition:"all 0.2s",
                    }}>
                      {g.emoji} {g.name}{isComplete?" 🏆":""}
                    </button>
                  );
                })}
              </div>
              {gachaGenre!=="all"&&(()=>{
                const g=GENRES.find(x=>x.id===gachaGenre);
                const cnt=CHARACTERS[gachaGenre]?.filter(c=>player.collection[c.id]).length||0;
                return g?(
                  <div style={{textAlign:"center",fontSize:11,color:"#aaa",marginTop:6}}>
                    {g.emoji} {g.name}：<b style={{color:cnt===30?"#FFD700":g.color}}>{cnt}/30</b>
                    {cnt===30&&<span style={{color:"#FFD700",marginLeft:4}}>コンプリート！🎉</span>}
                  </div>
                ):null;
              })()}
            </div>

            {/* ガチャ情報 */}
            <div style={{textAlign:"center",fontSize:11,color:"#ccc",marginBottom:16}}>
              SR：<b style={{color:srBoosted?"#F5A623":"#aaa"}}>{srBoosted?"15%":"7.5%"}</b>　
              R：<b style={{color:"#4A90E2"}}>20%</b>　
              ポイント：<b style={{color:"#FF8C00"}}>{player.points}pt</b>　
              🎟️<b style={{color:"#FF8C00"}}>{player.tickets||0}</b>
            </div>

            {/* ガチャやさんへ入るボタン */}
            <div style={{textAlign:"center"}}>
              <button
                onClick={()=>{ if(canGacha) setGachaRoomOpen(true); }}
                disabled={!canGacha}
                style={{
                  background:canGacha
                    ?"linear-gradient(135deg,#FF6B6B,#FFD700)"
                    :"#eee",
                  border:"none",borderRadius:20,
                  padding:"20px 40px",
                  fontFamily:"inherit",fontWeight:900,fontSize:20,
                  color:canGacha?"white":"#bbb",
                  cursor:canGacha?"pointer":"not-allowed",
                  boxShadow:canGacha
                    ? srBoosted?"0 6px 28px #F5A62366":"0 6px 24px #FF6B6B55"
                    :"none",
                  transition:"all 0.2s",
                  letterSpacing:1,
                }}>
                🎪 ガチャやさんへ行く！
              </button>
              {!canGacha&&(
                <div style={{marginTop:12,color:"#FFB347",fontWeight:700,fontSize:13}}>
                  タスクをこなしてポイントをためよう！
                </div>
              )}
            </div>
          </div>
        )}

        {tab==="zukan"&&(
          <>
            {/* ずかん数表示 */}
            <div style={{textAlign:"center",marginBottom:10,padding:"8px 12px",background:"white",borderRadius:14,boxShadow:"0 1px 4px #0001"}}>
              <span style={{fontSize:12,color:"#aaa",fontWeight:700}}>あつめたキャラ　</span>
              <span style={{fontSize:18,fontWeight:900,color:"#FF8C00"}}>{collected}</span>
              <span style={{fontSize:11,color:"#ccc"}}>/{totalActive}</span>
            </div>
            <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
              {GENRES.map(g=>{
                const cnt=CHARACTERS[g.id].filter(c=>player.collection[c.id]).length;
                return(
                  <button key={g.id} onClick={()=>{
                      if(!g.active) return;
                      setZukanGenre(g.id);
                      // 図鑑タブでコンプリート認定証を再表示
                      if(cnt===30 && !shownCerts[g.id]) {
                        setCertModal({genreId:g.id,genreName:g.name,genreEmoji:g.emoji});
                        setShownCerts(prev=>({...prev,[g.id]:true}));
                      }
                    }} style={{flexShrink:0,padding:"8px 10px",borderRadius:12,border:"none",background:!g.active?"#f0f0f0":zukanGenre===g.id?g.color:"white",color:!g.active?"#ccc":zukanGenre===g.id?"white":"#aaa",fontFamily:"inherit",fontWeight:800,fontSize:11,cursor:g.active?"pointer":"default",transition:"all 0.2s",boxShadow:zukanGenre===g.id?`0 3px 10px ${g.color}55`:"0 1px 4px #0001",textAlign:"center",position:"relative"}}>
                    {cnt===30&&g.active&&<div style={{position:"absolute",top:-6,right:-6,background:"#FFD700",borderRadius:"50%",width:18,height:18,fontSize:11,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 2px 6px #FFD70088"}}>🏆</div>}
                    <div>{g.emoji}</div><div>{g.name}</div>
                    <div style={{fontSize:10}}>{g.active?`${cnt}/30`:"じゅんびちゅう"}</div>
                  </button>
                );
              })}
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,justifyContent:"center"}}>
              {GENRES.find(g=>g.id===zukanGenre)?.active
                ?CHARACTERS[zukanGenre].map(char=><CardSlot key={char.id} char={char} collected={!!player.collection[char.id]} onSelect={setSelectedChar}/>)
                :<div style={{textAlign:"center",padding:40,color:"#ccc"}}><div style={{fontSize:48,marginBottom:12}}>🔒</div><div style={{fontWeight:700}}>じゅんびちゅう…<br/>もうすこしまってね！</div></div>
              }
            </div>
          </>
        )}

        {/* にんていしょうタブ */}
        {tab==="cert"&&(
          <div style={{paddingTop:4}}>
            <div style={{fontSize:12,color:"#aaa",marginBottom:12,textAlign:"center",fontWeight:700}}>
              🏆 タップすると大きく見られるよ！
            </div>
            {GENRES.filter(g=>g.active && visibleGenres.includes(g.id)).map(g=>{
              const cnt = CHARACTERS[g.id].filter(c=>player.collection[c.id]).length;
              const isComplete = cnt === 30;
              return(
                <div key={g.id} onClick={()=>isComplete&&setCertView(g.id)}
                  style={{
                    display:"flex",alignItems:"center",gap:12,
                    background:isComplete?"white":"#f8f8f8",
                    borderRadius:16,padding:"12px 14px",marginBottom:8,
                    border:isComplete?`2px solid ${g.color}`:"2px solid #eee",
                    cursor:isComplete?"pointer":"default",
                    opacity:isComplete?1:0.5,
                    transition:"all 0.2s",
                    boxShadow:isComplete?`0 2px 10px ${g.color}22`:"none",
                  }}>
                  {/* ジャンル情報 */}
                  <div style={{fontSize:32}}>{g.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:900,fontSize:14,color:isComplete?g.color:"#aaa"}}>
                      {g.name}
                      {isComplete&&<span style={{marginLeft:6}}>🏆</span>}
                    </div>
                    <div style={{fontSize:11,color:"#aaa",marginTop:2}}>
                      {isComplete?"コンプリート！認定証を見る →":`${cnt}/30 あつめ中…`}
                    </div>
                  </div>
                  {/* 認定証サムネイル or 鍵 */}
                  {isComplete?(
                    <img src={getCertImage(g.id)} alt={g.name}
                      style={{width:56,height:56,objectFit:"cover",borderRadius:10,
                        border:`2px solid ${g.color}`,
                        boxShadow:`0 2px 8px ${g.color}44`}}
                      onError={e=>{e.target.style.display="none";}}
                    />
                  ):(
                    <div style={{width:56,height:56,borderRadius:10,background:"#eee",
                      display:"flex",alignItems:"center",justifyContent:"center",fontSize:24}}>
                      🔒
                    </div>
                  )}
                </div>
              );
            })}
            {/* 総合認定証セクション */}
            <div style={{marginTop:16,padding:"14px",background:"linear-gradient(135deg,#FFF8E1,#FFF3C4)",borderRadius:16,border:"2px solid #FFD700"}}>
              <div style={{fontWeight:900,fontSize:14,color:"#B8720A",marginBottom:10,textAlign:"center"}}>
                🌟 そうごう にんていしょう
              </div>
              {(()=>{
                const currentRank = TOTAL_CERT_RANKS.filter(r=>collected>=r.threshold).slice(-1)[0];
                const nextRank = TOTAL_CERT_RANKS.find(r=>r.threshold>collected);
                return(
                  <div>
                    {/* 現在のランク */}
                    {currentRank ? (
                      <div onClick={()=>setCertView("total_"+currentRank.file)}
                        style={{display:"flex",alignItems:"center",gap:12,background:"white",borderRadius:12,padding:"10px 12px",marginBottom:10,cursor:"pointer",border:"2px solid #FFD700",boxShadow:"0 2px 8px #FFD70022"}}>
                        <img src={`/images/${currentRank.file}.png`} alt={currentRank.title}
                          style={{width:56,height:56,objectFit:"cover",borderRadius:10,border:"2px solid #FFD700"}}
                          onError={e=>{e.target.style.display="none";}}
                        />
                        <div style={{flex:1}}>
                          <div style={{fontWeight:900,fontSize:14,color:"#B8720A"}}>{currentRank.title}</div>
                          <div style={{fontSize:11,color:"#aaa",marginTop:2}}>{currentRank.threshold}種 達成！認定証を見る →</div>
                        </div>
                        <span style={{fontSize:20}}>🏆</span>
                      </div>
                    ):(
                      <div style={{textAlign:"center",color:"#ccc",fontSize:12,padding:"8px 0"}}>
                        50種あつめると最初の認定証がもらえるよ！
                      </div>
                    )}
                    {/* 次のランクへの進捗 */}
                    {nextRank&&(
                      <div>
                        <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#aaa",marginBottom:4}}>
                          <span>つぎ：{nextRank.title}（{nextRank.threshold}種）</span>
                          <span>{collected}/{nextRank.threshold}</span>
                        </div>
                        <div style={{background:"#eee",borderRadius:99,height:8,overflow:"hidden"}}>
                          <div style={{
                            width:`${Math.min(100,(collected/(nextRank.threshold))*100)}%`,
                            height:"100%",
                            background:"linear-gradient(90deg,#FFD700,#FF8C00)",
                            borderRadius:99,transition:"width 0.5s ease"
                          }}/>
                        </div>
                        <div style={{fontSize:10,color:"#ccc",marginTop:4,textAlign:"right"}}>
                          あと{nextRank.threshold-collected}種！
                        </div>
                      </div>
                    )}
                    {!nextRank&&currentRank&&(
                      <div style={{textAlign:"center",color:"#FFD700",fontWeight:900,fontSize:13,marginTop:8}}>
                        🎊 すべての総合認定証を達成！
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* にんていしょう全画面表示 */}
      {certView&&(
        <div onClick={()=>setCertView(null)} style={{
          position:"fixed",inset:0,zIndex:4000,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(0,0,0,0.9)",padding:16,
        }}>
          <div style={{position:"relative",width:"100%",maxWidth:400,animation:"popIn 0.4s ease"}}>
            <img src={getCertImage(certView)} alt="認定証"
              style={{width:"100%",borderRadius:20,display:"block",
                boxShadow:"0 8px 48px rgba(0,0,0,0.6)"}}
            />
            <button onClick={()=>setCertView(null)} style={{
              position:"absolute",top:10,right:10,
              background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",
              width:36,height:36,fontSize:18,color:"white",
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,
            }}>✕</button>
            <div style={{textAlign:"center",marginTop:12,color:"white",
              fontWeight:900,fontSize:13,textShadow:"0 2px 8px rgba(0,0,0,0.8)"}}>
              タップしてとじる
            </div>
          </div>
        </div>
      )}

      {selectedChar&&<CharDetail char={selectedChar} count={player.collection[selectedChar.id]||0} onClose={()=>setSelectedChar(null)}/>}

      {/* ガチャやさんポップアップ */}
      {gachaRoomOpen&&(
        <div style={{
          position:"fixed",inset:0,zIndex:2500,
          background:"linear-gradient(160deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)",
          animation:"roomBgFade 0.4s ease",
          display:"flex",flexDirection:"column",
          fontFamily:"'Kosugi Maru',sans-serif",
        }}>
          {/* 物屋ヘッダー */}
          <div style={{
            padding:"14px 16px 10px",
            background:"rgba(0,0,0,0.3)",
            display:"flex",alignItems:"center",justifyContent:"space-between",
          }}>
            <button onClick={()=>{
              if(!gachaReady){ setGachaRoomOpen(false); setGachaPending(null); }
            }} style={{
              background:"rgba(255,255,255,0.15)",border:"none",borderRadius:99,
              padding:"8px 16px",color:"white",fontFamily:"inherit",
              fontWeight:800,fontSize:13,cursor:"pointer",
            }}>← もどる</button>

            <div style={{textAlign:"center"}}>
              <div style={{
                fontSize:14,fontWeight:900,color:"white",
                animation:"shopSignBounce 2s ease-in-out infinite",
                display:"inline-block",
              }}>🎪 ガチャやさん</div>
              {(()=>{
                const g = gachaGenre==="all" ? null : GENRES.find(x=>x.id===gachaGenre);
                return g ? (
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>
                    {g.emoji} {g.name}
                  </div>
                ) : (
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.7)"}}>🎲 ぜんぶ</div>
                );
              })()}
            </div>

            <div style={{
              background:"rgba(255,255,255,0.15)",borderRadius:12,
              padding:"6px 12px",textAlign:"center",
            }}>
              <div style={{fontSize:9,color:"rgba(255,255,255,0.6)"}}>のこり</div>
              <div style={{fontWeight:900,color:"#FFD700",fontSize:13}}>
                🎰{canGachaCount}
              </div>
            </div>
          </div>

          {/* 星の背景装飾 */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
            {Array.from({length:20}).map((_,i)=>(
              <div key={i} style={{
                position:"absolute",
                left:`${Math.random()*100}%`,
                top:`${Math.random()*100}%`,
                width:Math.random()*3+1,
                height:Math.random()*3+1,
                background:"white",
                borderRadius:"50%",
                opacity:Math.random()*0.6+0.2,
                animation:`sparkle ${Math.random()*2+1}s ease-in-out infinite`,
              }}/>
            ))}
          </div>

          {/* ガチャエリア */}
          <div style={{
            flex:1,display:"flex",flexDirection:"column",
            alignItems:"center",justifyContent:"center",
            padding:24,position:"relative",zIndex:1,
          }}>
            {srBoosted&&(
              <div style={{
                background:"linear-gradient(135deg,rgba(255,215,0,0.2),rgba(255,140,0,0.2))",
                border:"1px solid #FFD700",borderRadius:12,
                padding:"6px 16px",marginBottom:16,
                color:"#FFD700",fontWeight:800,fontSize:12,
              }}>✨ SR確率２倍アップ中！</div>
            )}

            {/* カプセルアニメーションエリア */}
            {gachaReady ? (
              <GachaCapsuleAnimation
                key={gachaKey}
                resultRarity={gachaPending?.rarity||"N"}
                resultChar={gachaPending}
                consecutiveDupe={player.consecutiveDupe}
                onComplete={()=>{ onGachaComplete(); }}
              />
            ) : (
              <div style={{textAlign:"center"}}>
                {/* 大きなガチャボタン */}
                <div
                  onClick={doGacha}
                  style={{
                    width:200,height:200,
                    margin:"0 auto 24px",
                    display:"flex",alignItems:"center",justifyContent:"center",
                    cursor:"pointer",userSelect:"none",
                    transition:"transform 0.1s",
                    filter:srBoosted?"drop-shadow(0 0 20px #FFD700)":"drop-shadow(0 8px 20px rgba(255,107,107,0.5))",
                  }}
                  onTouchStart={e=>e.currentTarget.style.transform="scale(0.93)"}
                  onTouchEnd={e=>e.currentTarget.style.transform="scale(1)"}
                >
                  <img
                    src="/images/gacha01.png"
                    alt="ガチャ"
                    style={{width:200,height:200,objectFit:"contain"}}
                    onError={e=>{
                      e.target.style.display="none";
                      e.target.nextSibling.style.display="flex";
                    }}
                  />
                  <div style={{display:"none",width:180,height:180,borderRadius:"50%",background:"linear-gradient(135deg,#FF6B6B,#FFD700)",alignItems:"center",justifyContent:"center",fontSize:80}}>🎰</div>
                </div>

                <div style={{color:"rgba(255,255,255,0.8)",fontSize:13,marginBottom:8}}>
                  タップしてひく！
                </div>
                <div style={{color:"rgba(255,255,255,0.5)",fontSize:11}}>
                  1回 = {GACHA_COST}pt または 🎟️1まい
                </div>

                {/* ガチャをまわすボタン */}
                <button onClick={doGacha} style={{
                  marginTop:20,
                  background:"linear-gradient(135deg,#FF6B6B,#FFD700)",
                  border:"none",borderRadius:99,padding:"14px 36px",
                  fontFamily:"inherit",fontWeight:900,fontSize:16,
                  color:"white",cursor:"pointer",
                  boxShadow:"0 4px 20px #FF6B6B55",
                }}>
                  🎰 ガチャをまわす！
                </button>

                {/* カテゴリ変更 */}
                <div style={{marginTop:20}}>
                  <div style={{fontSize:11,color:"rgba(255,255,255,0.5)",marginBottom:8}}>カテゴリをかえる</div>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",justifyContent:"center"}}>
                    <button onClick={()=>setGachaGenre("all")} style={{
                      padding:"5px 12px",borderRadius:99,border:"none",
                      background:gachaGenre==="all"?"#FF8C00":"rgba(255,255,255,0.15)",
                      color:"white",fontFamily:"inherit",fontWeight:800,fontSize:11,cursor:"pointer",
                    }}>🎲 全部</button>
                    {GENRES.filter(g=>g.active && visibleGenres.includes(g.id)).map(g=>{
                      const cnt=CHARACTERS[g.id].filter(c=>player.collection[c.id]).length;
                      return(
                        <button key={g.id} onClick={()=>setGachaGenre(g.id)} style={{
                          padding:"5px 12px",borderRadius:99,border:"none",
                          background:gachaGenre===g.id?g.color:"rgba(255,255,255,0.15)",
                          color:"white",fontFamily:"inherit",fontWeight:800,fontSize:11,cursor:"pointer",
                        }}>{g.emoji}{cnt===30?" 🏆":""}</button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* フッター情報 */}
          <div style={{
            padding:"10px 16px",background:"rgba(0,0,0,0.3)",
            display:"flex",justifyContent:"center",gap:20,
          }}>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>
              SR <b style={{color:srBoosted?"#FFD700":"rgba(255,255,255,0.8)"}}>{srBoosted?"15%":"7.5%"}</b>
            </div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>
              R <b style={{color:"#7EC8FF"}}>20%</b>
            </div>
            <div style={{color:"rgba(255,255,255,0.6)",fontSize:11}}>
              N <b style={{color:"rgba(255,255,255,0.8)"}}>72.5%</b>
            </div>
          </div>
        </div>
      )}

      {/* あいさつポップアップ */}
      {greeting&&(
        <GreetingPopup char={greeting} onClose={()=>setGreeting(null)}/>
      )}

      {/* 認定証モーダル */}
      {certModal&&(
        <CertModal
          genreId={certModal.genreId}
          genreName={certModal.genreName}
          genreEmoji={certModal.genreEmoji}
          onClose={()=>setCertModal(null)}
        />
      )}

      {/* 総合認定証ポップアップ */}
      {totalCertModal&&(
        <div onClick={()=>setTotalCertModal(null)} style={{
          position:"fixed",inset:0,zIndex:4500,
          display:"flex",alignItems:"center",justifyContent:"center",
          background:"rgba(0,0,0,0.85)",padding:16,
        }}>
          <div onClick={e=>e.stopPropagation()} style={{
            position:"relative",width:"100%",maxWidth:380,
            animation:"popIn 0.5s cubic-bezier(.17,.67,.35,1.3) both",
          }}>
            {/* 金のキラキラ */}
            <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
              {Array.from({length:20}).map((_,i)=>{
                const x=Math.random()*100, delay=Math.random()*0.8, dur=1.2+Math.random()*1.0;
                return <div key={i} style={{position:"absolute",left:`${x}%`,top:-20,fontSize:12+Math.random()*10,color:"#FFD700",animation:`particleFall ${dur}s ease-in ${delay}s forwards`,opacity:0}}>✦</div>;
              })}
            </div>
            <img
              src={`/images/${totalCertModal.file}.png`}
              alt={totalCertModal.title}
              style={{width:"100%",borderRadius:20,display:"block",boxShadow:"0 8px 48px rgba(255,215,0,0.4)"}}
              onError={e=>{e.target.style.display="none";}}
            />
            <div style={{textAlign:"center",marginTop:12,color:"#FFD700",fontWeight:900,fontSize:14,textShadow:"0 2px 8px rgba(0,0,0,0.8)"}}>
              🌟 {totalCertModal.title} 🌟
            </div>
            <div style={{textAlign:"center",marginTop:4,color:"rgba(255,255,255,0.7)",fontSize:12}}>
              タップしてとじる
            </div>
            <button onClick={()=>setTotalCertModal(null)} style={{
              position:"absolute",top:10,right:10,
              background:"rgba(0,0,0,0.5)",border:"none",borderRadius:"50%",
              width:36,height:36,fontSize:18,color:"white",
              cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,
            }}>✕</button>
          </div>
        </div>
      )}

      {parentOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000,padding:16}} onClick={e=>{if(e.target===e.currentTarget){setParentOpen(false);setParentAuth(false);}}}>
          <div style={{background:"white",borderRadius:"22px 22px 14px 14px",width:"100%",maxWidth:440,padding:22,maxHeight:"85vh",overflowY:"auto",animation:"popIn 0.3s ease"}}>
            {!parentAuth?(
              <PinModal correctPin={pin} onSuccess={()=>{setParentAuth(true);setParentTab("tasks");setNewPin("");setNewPin2("");setPinChangeMsg("");setEditNames(players.map(p=>p.name));setEditCount(players.length);setBonusType("pt");}} onClose={()=>setParentOpen(false)} onDebug={activateDebug}/>
            ):(
              <>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                  <div style={{fontWeight:900,fontSize:16,color:"#333"}}>🔓 おやモード — {player.name}</div>
                  <button onClick={()=>{setParentOpen(false);setParentAuth(false);}} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:"#bbb"}}>✕</button>
                </div>
                <div style={{display:"flex",gap:6,marginBottom:16,overflowX:"auto"}}>
                  {[["tasks","📋 タスク"],["bonus","🎁 ボーナス"],["settings","⚙️ せってい"]].map(([key,label])=>(
                    <button key={key} onClick={()=>setParentTab(key)} style={{flexShrink:0,padding:"8px 12px",borderRadius:11,border:"none",background:parentTab===key?"#FF8C00":"#f5f5f5",color:parentTab===key?"white":"#aaa",fontFamily:"inherit",fontWeight:800,fontSize:12,cursor:"pointer"}}>{label}</button>
                  ))}
                </div>

                {parentTab==="tasks"&&(
                  <>
                    <div style={{display:"flex",gap:8,marginBottom:10}}>
                      <input value={newTask} onChange={e=>setNewTask(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTaskParent()} placeholder="タスクをついか…"
                        style={{flex:1,padding:"10px 13px",borderRadius:12,border:"2px solid #FFE082",fontFamily:"inherit",fontSize:14,outline:"none"}}/>
                      <button onClick={addTaskParent} style={{background:"#FFD700",border:"none",borderRadius:12,padding:"10px 15px",fontSize:18,cursor:"pointer"}}>＋</button>
                    </div>
                    <div style={{maxHeight:220,overflowY:"auto"}}>
                      {player.tasks.length===0?<div style={{color:"#ddd",textAlign:"center",padding:24}}>タスクがありません</div>
                        :player.tasks.map(t=>(
                          <div key={t.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:12,marginBottom:6,background:t.done?"#F1F8F1":"#FFFDE7",border:`1px solid ${t.done?"#78D878":"#FFE082"}`}}>
                            <span style={{fontSize:16}}>{t.done?"✅":"⬜"}</span>
                            <span style={{flex:1,fontSize:14,color:t.done?"#aaa":"#333"}}>{t.text}</span>
                            <button onClick={()=>removeTask(t.id)} style={{background:"none",border:"none",color:"#ffaaaa",fontSize:18,cursor:"pointer"}}>✕</button>
                          </div>
                        ))
                      }
                    </div>
                    <button onClick={resetTasks} style={{width:"100%",marginTop:10,background:"#f5f5f5",border:"none",borderRadius:12,padding:10,fontFamily:"inherit",fontSize:13,color:"#bbb",cursor:"pointer"}}>タスクをリセット</button>
                  </>
                )}

                {parentTab==="bonus"&&(
                  <div style={{textAlign:"center",paddingTop:8}}>
                    <div style={{fontSize:40,marginBottom:12}}>🎁</div>
                    <div style={{color:"#555",fontSize:14,marginBottom:16,fontWeight:700}}>{player.name} へのごほうびをえらんでね</div>
                    <div style={{display:"flex",gap:10,marginBottom:20}}>
                      <button onClick={()=>setBonusType("pt")} style={{flex:1,padding:"16px 8px",borderRadius:16,border:"none",background:bonusType==="pt"?"linear-gradient(135deg,#FFD700,#FF8C00)":"#f5f5f5",color:bonusType==="pt"?"white":"#aaa",fontFamily:"inherit",fontWeight:900,fontSize:13,cursor:"pointer",boxShadow:bonusType==="pt"?"0 4px 14px #FF8C0044":"none",transition:"all 0.2s"}}>
                        <div style={{fontSize:28,marginBottom:4}}>⭐</div>
                        <div>+{PARENT_BONUS_PT}ポイント</div>
                        <div style={{fontSize:10,marginTop:3,opacity:0.8}}>ポイントをプレゼント</div>
                      </button>
                      <button onClick={()=>setBonusType("ticket")} style={{flex:1,padding:"16px 8px",borderRadius:16,border:"none",background:bonusType==="ticket"?"linear-gradient(135deg,#B787E0,#7B5EA7)":"#f5f5f5",color:bonusType==="ticket"?"white":"#aaa",fontFamily:"inherit",fontWeight:900,fontSize:13,cursor:"pointer",boxShadow:bonusType==="ticket"?"0 4px 14px #B787E044":"none",transition:"all 0.2s"}}>
                        <div style={{fontSize:28,marginBottom:4}}>🎟️</div>
                        <div>ガチャ×{PARENT_BONUS_TICKET}</div>
                        <div style={{fontSize:10,marginTop:3,opacity:0.8}}>すぐひけるチケット</div>
                      </button>
                    </div>
                    <div style={{color:"#aaa",fontSize:12,marginBottom:20}}>いまのポイント：{player.points}pt　チケット：🎟️{player.tickets||0}まい</div>
                    <button onClick={giveBonus} style={{background:bonusType==="pt"?"linear-gradient(135deg,#FFD700,#FF8C00)":"linear-gradient(135deg,#B787E0,#7B5EA7)",border:"none",borderRadius:99,padding:"14px 40px",fontFamily:"inherit",fontWeight:900,fontSize:17,color:"white",cursor:"pointer",boxShadow:bonusType==="pt"?"0 4px 16px #FF8C0055":"0 4px 16px #B787E055"}}>
                      {bonusType==="pt"?`⭐ +${PARENT_BONUS_PT}ptをあげる！`:`🎟️ チケットをあげる！`}
                    </button>
                  </div>
                )}

                {parentTab==="settings"&&(
                  <>
                    <div style={{background:"#f9f9f9",borderRadius:14,padding:14,marginBottom:14}}>
                      <div style={{fontWeight:800,color:"#555",fontSize:13,marginBottom:10}}>👦 プレイヤーせってい</div>
                      <div style={{display:"flex",gap:6,marginBottom:12}}>
                        {[1,2,3,4].map(n=><button key={n} onClick={()=>setEditCount(n)} style={{flex:1,padding:"8px 0",borderRadius:10,border:"none",background:editCount===n?"#FF8C00":"#eee",color:editCount===n?"white":"#aaa",fontFamily:"inherit",fontWeight:800,fontSize:14,cursor:"pointer"}}>{n}人</button>)}
                      </div>
                      {Array.from({length:editCount}).map((_,i)=>(
                        <input key={i} value={editNames[i]||""} onChange={e=>setEditNames(prev=>{const a=[...prev];a[i]=e.target.value;return a;})} placeholder={`プレイヤー${i+1}`}
                          style={{width:"100%",padding:"9px 13px",borderRadius:11,marginBottom:7,border:"2px solid #FFE082",fontFamily:"inherit",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
                      ))}
                      <button onClick={applyPlayerSettings} style={{width:"100%",background:"#FF8C00",border:"none",borderRadius:11,padding:10,fontFamily:"inherit",fontWeight:800,fontSize:14,color:"white",cursor:"pointer"}}>てきよう</button>
                    </div>
                    <div style={{background:"#f9f9f9",borderRadius:14,padding:14}}>
                      <div style={{fontWeight:800,color:"#555",fontSize:13,marginBottom:10}}>🔐 PINコードをかえる</div>
                      <input type="password" value={newPin} onChange={e=>setNewPin(e.target.value)} placeholder="あたらしいPIN（4けた以上）"
                        style={{width:"100%",padding:"9px 13px",borderRadius:11,marginBottom:7,border:"2px solid #ddd",fontFamily:"inherit",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
                      <input type="password" value={newPin2} onChange={e=>setNewPin2(e.target.value)} placeholder="もういちどにゅうりょく"
                        style={{width:"100%",padding:"9px 13px",borderRadius:11,marginBottom:7,border:"2px solid #ddd",fontFamily:"inherit",fontSize:14,outline:"none",boxSizing:"border-box"}}/>
                      {pinChangeMsg&&<div style={{color:pinChangeMsg.startsWith("✅")?"#62C462":"#FF4757",fontSize:12,marginBottom:8}}>{pinChangeMsg}</div>}
                      <button onClick={changePin} style={{width:"100%",background:"#5BC8E8",border:"none",borderRadius:11,padding:10,fontFamily:"inherit",fontWeight:800,fontSize:14,color:"white",cursor:"pointer"}}>PINをかえる</button>
                    </div>

                    {/* ★ バックアップパネル（独立コンポーネント） */}
                    {/* ジャンル表示設定 */}
                    <div style={{background:"#f9f9f9",borderRadius:14,padding:14,marginBottom:14}}>
                      <div style={{fontWeight:800,color:"#555",fontSize:13,marginBottom:6}}>📚 ひょうじするジャンル</div>
                      <div style={{fontSize:11,color:"#aaa",marginBottom:10,lineHeight:1.6}}>
                        ずかん・ガチャ・にんていしょうに表示するジャンルをえらんでね
                      </div>
                      {GENRES.filter(g=>g.active).map(g=>{
                        const isVisible = visibleGenres.includes(g.id);
                        const isFree = g.free;
                        return(
                          <div key={g.id} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid #eee"}}>
                            <span style={{fontSize:20}}>{g.emoji}</span>
                            <div style={{flex:1}}>
                              <div style={{fontWeight:700,fontSize:13,color:"#333"}}>{g.name}</div>
                              {isFree&&<div style={{fontSize:10,color:"#62C462",fontWeight:700}}>無料</div>}
                            </div>
                            <button onClick={()=>{
                              if(isFree) return; // 無料ジャンルは常に表示
                              setVisibleGenres(prev=>
                                isVisible
                                  ? prev.filter(id=>id!==g.id)
                                  : [...prev, g.id]
                              );
                            }} style={{
                              padding:"5px 14px",borderRadius:99,border:"none",
                              background:isVisible?"#4CAF50":"#ddd",
                              color:"white",fontWeight:800,fontSize:12,
                              cursor:isFree?"default":"pointer",
                              opacity:isFree?0.6:1,
                            }}>
                              {isFree?"固定":isVisible?"表示中":"非表示"}
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <BackupPanel players={players} pin={pin} setPlayers={setPlayers} setPin={setPin}/>

                    {/* 全リセット */}
                    <ResetPanel players={players} current={current} setPlayers={setPlayers} setPin={setPin} setParentOpen={setParentOpen} setParentAuth={setParentAuth} setupPin={pin}/>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then(()=>console.log("PWA Ready"))
      .catch(err=>console.error(err));
  });
}
