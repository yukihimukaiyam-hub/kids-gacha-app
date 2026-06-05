import { useState, useRef, useEffect } from "react";

const GENRES = [
  { id: "umiu",    name: "ウミウシ", emoji: "🐚", color: "#5BC8E8", active: true },
  { id: "kinoko",  name: "きのこ",   emoji: "🍄", color: "#A0784A", active: true },
  { id: "houseki", name: "宝石",     emoji: "💎", color: "#B787E0", active: true },
  { id: "hana",    name: "はな",     emoji: "🌸", color: "#FF8FAB", active: true },
  { id: "sakana",  name: "さかな",   emoji: "🐠", color: "#4ECDC4", active: false },
  { id: "dobutsu", name: "どうぶつ", emoji: "🐾", color: "#FFAA5A", active: false },
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
function rollGacha(consecutiveDupe) {
  const r = Math.random();
  const srRate = consecutiveDupe >= 2 ? 0.15 : 0.075;
  const rarity = r < srRate ? "SR" : r < srRate + 0.20 ? "R" : "N";
  const pool = ACTIVE_CHARS.filter(c => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}
function getCharImage(charId) {
  const prefix = charId.split("_")[0];
  if (["umiu","kinoko","houseki","hana"].includes(prefix)) return `/images/${charId}.png`;
  return null;
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
`;

function Floaters({ items }) {
  return <>{items.map(s=>(
    <div key={s.id} style={{position:"fixed",left:s.x-16,top:s.y-16,pointerEvents:"none",zIndex:9999,fontSize:26,animation:"floatUp 0.9s ease-out forwards"}}>{s.icon}</div>
  ))}</>;
}

function PointBar({ points, tickets }) {
  const full = Math.floor(points / GACHA_COST);
  const partial = (points % GACHA_COST) / GACHA_COST;
  return (
    <div style={{display:"flex",alignItems:"center",gap:8}}>
      <div style={{flex:1}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:10,color:"#aaa",marginBottom:3}}>
          <span>⭐ {points}pt {tickets>0&&<span style={{color:"#FF8C00"}}>🎟️×{tickets}</span>}</span>
          <span>あと{GACHA_COST-(points%GACHA_COST===0&&points>0?GACHA_COST:points%GACHA_COST)}pt</span>
        </div>
        <div style={{background:"#eee",borderRadius:99,height:10,overflow:"hidden"}}>
          <div style={{width:`${partial*100}%`,height:"100%",background:"linear-gradient(90deg,#FFD700,#FF8C00)",borderRadius:99,transition:"width 0.4s ease"}}/>
        </div>
      </div>
      <div style={{background:"#5599EE",color:"white",borderRadius:12,padding:"4px 10px",fontWeight:900,fontSize:13,whiteSpace:"nowrap"}}>
        🎰 {full+(tickets||0)}回
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
        {isNew&&<div style={{position:"absolute",top:-14,right:-8,background:"#FF4757",color:"white",borderRadius:99,padding:"5px 14px",fontWeight:900,fontSize:13,animation:"newBadge 0.4s 0.3s cubic-bezier(.17,.67,.35,1.5) both",boxShadow:"0 3px 12px #FF475766"}}>NEW！</div>}
        <div style={{marginTop:28,marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center",filter:`drop-shadow(0 6px 18px ${RARITY_COLOR[rarity]}66)`,animation:"charFloat 0.6s 0.15s cubic-bezier(.17,.67,.35,1.3) both"}}>
          {img?<img src={img} alt={char.name} style={{width:180,height:180,objectFit:"contain"}}/>:<span style={{fontSize:110}}>{genre?.emoji||"🎴"}</span>}
        </div>
        <div style={{fontWeight:900,fontSize:28,color:"#333",marginBottom:10,animation:"fadeUp 0.4s 0.3s ease both"}}>{char.name}</div>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:genre?`${genre.color}22`:"#f5f5f5",border:`1.5px solid ${genre?.color||"#eee"}`,borderRadius:99,padding:"5px 16px",fontSize:13,color:genre?.color||"#aaa",fontWeight:700,marginBottom:20,animation:"fadeUp 0.4s 0.35s ease both"}}>
          {genre?.emoji} {genre?.name}
        </div>
        <button onClick={onClose} style={{width:"100%",padding:"13px",background:"linear-gradient(135deg,#eee,#ddd)",border:"none",borderRadius:99,fontFamily:"inherit",fontWeight:900,fontSize:15,color:"#888",cursor:"pointer",animation:"fadeUp 0.4s 0.5s ease both"}}>
          とじる ✕
        </button>
      </div>
    </div>
  );
}

const MASCOTS = [
  {id:"umiu_01",emoji:"🐚"},{id:"kinoko_19",emoji:"🍄"},
  {id:"houseki_20",emoji:"💎"},{id:"hana_14",emoji:"🌸"},
];

function GachaCapsuleAnimation({ onComplete, resultRarity="R", resultChar, consecutiveDupe=0 }) {
  const [phase,setPhase]=useState("idle");
  const [mascotIdx,setMascotIdx]=useState(0);
  const [showPopup,setShowPopup]=useState(false);
  const isSR=resultRarity==="SR";
  const srBoosted=consecutiveDupe>=2;
  const capsuleColor=isSR?["#FFD700","#FFA500"]:resultRarity==="R"?["#7EC8FF","#4A90E2"]:["#A8E6A8","#62C462"];

  useEffect(()=>{
    if(phase!=="idle") return;
    const t=setInterval(()=>setMascotIdx(i=>(i+1)%MASCOTS.length),300);
    return()=>clearInterval(t);
  },[phase]);

  function startDrop(){
    if(phase!=="idle") return;
    setPhase("dropping");
    setTimeout(()=>setPhase("cracking"),800);
    setTimeout(()=>setPhase("revealed"),1100);
    setTimeout(()=>setShowPopup(true),1600);
  }

  const mascot=MASCOTS[mascotIdx];
  const img=getCharImage(mascot.id);

  return(
    <>
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:0}}>
        <div style={{position:"relative",width:130,height:170,display:"flex",alignItems:"center",justifyContent:"center"}}>
          {phase==="idle"&&(
            <div style={{animation:"idleBob 1.4s ease-in-out infinite",cursor:"pointer"}} onClick={startDrop}>
              <Capsule color1={capsuleColor[0]} color2={capsuleColor[1]} size={110}>
                {img?<img src={img} style={{width:48,height:48,objectFit:"contain"}} alt=""/>:<span style={{fontSize:40}}>{mascot.emoji}</span>}
              </Capsule>
            </div>
          )}
          {phase==="dropping"&&(
            <div style={{animation:"capsuleDrop 0.8s cubic-bezier(.17,.67,.35,1.2) forwards"}}>
              <Capsule color1={capsuleColor[0]} color2={capsuleColor[1]} size={110}><span style={{fontSize:40}}>❓</span></Capsule>
            </div>
          )}
          {phase==="cracking"&&(
            <div style={{animation:"capsuleShake 0.3s ease-in-out"}}>
              <Capsule color1={capsuleColor[0]} color2={capsuleColor[1]} size={110} cracked><span style={{fontSize:28}}>💥</span></Capsule>
            </div>
          )}
          {phase==="revealed"&&(
            <div style={{position:"relative",width:110,height:132}}>
              <div style={{position:"absolute",top:0,left:0,right:0,animation:"topHalfFly 0.5s ease-out forwards"}}><CapsuleHalf color1={capsuleColor[0]} color2={capsuleColor[1]} half="top" size={110}/></div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,animation:"bottomHalfFly 0.5s ease-out forwards"}}><CapsuleHalf color1={capsuleColor[0]} color2={capsuleColor[1]} half="bottom" size={110}/></div>
              <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",animation:"charReveal 0.5s 0.1s cubic-bezier(.17,.67,.35,1.3) both"}}>
                <span style={{fontSize:64}}>{mascot.emoji}</span>
              </div>
              {["✦","★","✸","✦","★"].map((s,i)=>(
                <div key={i} style={{position:"absolute",top:`${[10,5,70,60,30][i]}%`,left:`${[5,80,10,85,50][i]}%`,fontSize:isSR?20:13,color:isSR?"#FFD700":capsuleColor[0],animation:`sparkle 0.4s ${i*0.08}s ease both`}}>{s}</div>
              ))}
            </div>
          )}
        </div>
        {phase==="idle"&&(
          <div style={{marginTop:16,fontSize:13,color:"#aaa",fontWeight:700,animation:"idleBob 1.4s ease-in-out infinite"}}>
            {srBoosted?"✨ SR確率アップ中！タップ！":"タップしてひく！"}
          </div>
        )}
      </div>
      {showPopup&&resultChar&&(
        <CharPopup char={resultChar} rarity={resultRarity} isNew={resultChar.isNew} onClose={()=>{setShowPopup(false);onComplete&&onComplete();}}/>
      )}
    </>
  );
}

function PinModal({ onSuccess, onClose, correctPin }) {
  const [val,setVal]=useState(""); const [err,setErr]=useState(false);
  function check(){ if(val===correctPin){onSuccess();}else{setErr(true);setVal("");} }
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
  const [zukanGenre,setZukanGenre]=useState("umiu");
  const [selectedChar,setSelectedChar]=useState(null);
  const [floaters,setFloaters]=useState([]);
  const fxId=useRef(0);

  function addFloater(x,y,icon="⭐"){
    const id=fxId.current++;
    setFloaters(f=>[...f,{id,x,y,icon}]);
    setTimeout(()=>setFloaters(f=>f.filter(fl=>fl.id!==id)),900);
  }

  useEffect(()=>{ if(players.length>0) saveStorage({players,pin}); },[players,pin]);
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
    if(!task||task.done) return;
    const rect=e.currentTarget.getBoundingClientRect();
    addFloater(rect.left+rect.width/2,rect.top,"⭐");
    setPlayers(prev=>prev.map((p,i)=>{
      if(i!==current) return p;
      const tasks=p.tasks.map(t=>t.id===taskId?{...t,done:true}:t);
      const allDone=tasks.every(t=>t.done),prevAllDone=p.tasks.every(t=>t.done);
      const bonus=(allDone&&!prevAllDone)?CLEAR_BONUS:0;
      if(bonus>0) setTimeout(()=>addFloater(rect.left+rect.width/2,rect.top-30,"🎉"),300);
      return{...p,tasks,points:p.points+TASK_PT+bonus};
    }));
  }
  function addTaskParent(){ if(!newTask.trim()) return; updatePlayer(current,p=>({...p,tasks:[...p.tasks,{id:Date.now(),text:newTask.trim(),done:false}]})); setNewTask(""); }
  function removeTask(id){ updatePlayer(current,p=>({...p,tasks:p.tasks.filter(t=>t.id!==id)})); }
  function resetTasks(){ updatePlayer(current,p=>({...p,tasks:p.tasks.map(t=>({...t,done:false}))})); }

  function doGacha(){
    const canUseTicket=(player.tickets||0)>0;
    const canUsePt=player.points>=GACHA_COST;
    if(!canUseTicket&&!canUsePt) return;
    if(gachaReady) return;
    const result=rollGacha(player.consecutiveDupe);
    const isNew=!player.collection[result.id];
    updatePlayer(current,p=>{
      const usedTicket=(p.tickets||0)>0;
      const isSR=result.rarity==="SR";
      const wasDupe=!!p.collection[result.id];
      const newConsecutiveDupe=isSR?0:(wasDupe?(p.consecutiveDupe||0)+1:0);
      return{...p,points:usedTicket?p.points:p.points-GACHA_COST,tickets:usedTicket?(p.tickets||0)-1:(p.tickets||0),collection:{...p.collection,[result.id]:(p.collection[result.id]||0)+1},consecutiveDupe:newConsecutiveDupe};
    });
    setGachaPending({...result,isNew});
    setGachaKey(k=>k+1);
    setGachaReady(true);
  }
  function onGachaComplete(){ setGachaReady(false); setGachaPending(null); }

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
  const canGacha=canGachaCount>0;
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

      <div style={{background:"linear-gradient(90deg,#5BC8E8,#4ECDC4)",padding:"12px 14px 14px",borderRadius:"0 0 22px 22px",boxShadow:"0 4px 18px rgba(0,0,0,0.10)"}}>
        <div style={{display:"flex",gap:6,marginBottom:10}}>
          {players.map((p,i)=>(
            <button key={i} onClick={()=>{setCurrent(i);setGachaReady(false);setGachaPending(null);}} style={{flex:1,padding:"7px 4px",borderRadius:12,border:"none",background:i===current?"white":"rgba(255,255,255,0.3)",color:i===current?"#333":"white",fontFamily:"inherit",fontWeight:800,fontSize:13,cursor:"pointer",transition:"all 0.2s"}}>{p.name}</button>
          ))}
          <button onClick={()=>{setParentOpen(true);setParentAuth(false);}} style={{padding:"7px 12px",borderRadius:12,border:"none",background:"rgba(255,255,255,0.25)",color:"white",fontSize:18,cursor:"pointer"}}>🔐</button>
        </div>
        <div style={{display:"flex",gap:8,marginBottom:10}}>
          <div style={{flex:1,background:"rgba(255,255,255,0.9)",borderRadius:12,padding:"7px 10px",textAlign:"center"}}>
            <div style={{fontSize:9,color:"#aaa"}}>ずかん</div>
            <div style={{fontWeight:900,color:"#FF8C00",fontSize:15}}>{collected}<span style={{fontSize:10,color:"#ccc"}}>/{totalActive}</span></div>
          </div>
          <div style={{flex:1,background:"rgba(255,255,255,0.9)",borderRadius:12,padding:"7px 10px",textAlign:"center"}}>
            <div style={{fontSize:9,color:"#aaa"}}>タスク</div>
            <div style={{fontWeight:900,color:"#62C462",fontSize:15}}>{doneTasks}/{totalTasks}</div>
          </div>
          <div style={{flex:1,background:"rgba(255,255,255,0.9)",borderRadius:12,padding:"7px 10px",textAlign:"center"}}>
            <div style={{fontSize:9,color:"#aaa"}}>ガチャけん</div>
            <div style={{fontWeight:900,color:"#4A90E2",fontSize:15}}>🎰{canGachaCount}</div>
          </div>
        </div>
        <div style={{background:"rgba(255,255,255,0.9)",borderRadius:12,padding:"8px 12px"}}>
          <PointBar points={player.points} tickets={player.tickets||0}/>
        </div>
      </div>

      <div style={{display:"flex",gap:8,padding:"10px 14px 0"}}>
        {[["todo","📋 やること"],["gacha","🎰 ガチャ"],["zukan","📖 ずかん"]].map(([key,label])=>(
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
                  <button onClick={resetTasks} style={{background:"#f5f5f5",border:"none",borderRadius:99,padding:"4px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit",color:"#bbb"}}>リセット</button>
                </div>
                <div style={{background:"#eee",borderRadius:99,height:8,marginBottom:12,overflow:"hidden"}}>
                  <div style={{width:totalTasks>0?`${(doneTasks/totalTasks)*100}%`:"0%",height:"100%",background:"linear-gradient(90deg,#78D878,#FFD700)",borderRadius:99,transition:"width 0.5s ease"}}/>
                </div>
                {player.tasks.map(task=>(
                  <button key={task.id} onClick={e=>completeTask(task.id,e)} disabled={task.done}
                    style={{width:"100%",display:"flex",alignItems:"center",gap:12,background:task.done?"#F1F8F1":"white",border:`2px solid ${task.done?"#78D878":"#FFE082"}`,borderRadius:15,padding:"13px 14px",marginBottom:8,cursor:task.done?"default":"pointer",fontFamily:"inherit",fontSize:15,fontWeight:700,color:task.done?"#78D878":"#333",textAlign:"left",transition:"all 0.15s",boxShadow:task.done?"none":"0 2px 8px #ffd70018"}}>
                    <span style={{fontSize:22}}>{task.done?"✅":"⬜"}</span>
                    <span style={{flex:1}}>{task.text}</span>
                    <span style={{fontSize:11,color:task.done?"#b2dfb2":"#FFB74D",fontWeight:700}}>+{TASK_PT}pt</span>
                  </button>
                ))}
              </>
            )}
          </>
        )}

        {tab==="gacha"&&(
          <div style={{textAlign:"center",paddingTop:8}}>
            {srBoosted&&(
              <div style={{background:"linear-gradient(135deg,#FFF3C4,#FFE082)",border:"2px solid #F5A623",borderRadius:14,padding:"10px 16px",marginBottom:14,animation:"srBoostPulse 1.5s ease infinite",display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
                <span style={{fontSize:20}}>✨</span>
                <div>
                  <div style={{fontWeight:900,color:"#B8720A",fontSize:13}}>SR確率２倍アップ中！</div>
                  <div style={{fontSize:11,color:"#C8860A"}}>ダブりが{player.consecutiveDupe}回つづいてるよ</div>
                </div>
                <span style={{fontSize:20}}>✨</span>
              </div>
            )}
            <div style={{fontSize:12,color:"#ccc",marginBottom:4}}>
              SR確率：<b style={{color:srBoosted?"#F5A623":"#aaa"}}>{srBoosted?"15%":"7.5%"}</b>　R：<b style={{color:"#4A90E2"}}>20%</b>　チケット：<b style={{color:"#FF8C00"}}>🎟️{player.tickets||0}</b>
            </div>
            {gachaReady?(
              <GachaCapsuleAnimation key={gachaKey} resultRarity={gachaPending?.rarity||"N"} resultChar={gachaPending} consecutiveDupe={player.consecutiveDupe} onComplete={onGachaComplete}/>
            ):(
              <>
                <button onClick={doGacha} disabled={!canGacha} style={{marginTop:24,background:canGacha?"linear-gradient(135deg,#FF6B6B,#FFD700)":"#eee",border:"none",borderRadius:99,padding:"16px 44px",fontFamily:"inherit",fontWeight:900,fontSize:18,color:canGacha?"white":"#bbb",cursor:canGacha?"pointer":"not-allowed",boxShadow:canGacha?srBoosted?"0 4px 24px #F5A62366":"0 4px 18px #FF6B6B44":"none",transition:"all 0.2s"}}>
                  🎰 ガチャをひく！（{GACHA_COST}pt or 🎟️）
                </button>
                {!canGacha&&<div style={{marginTop:14,color:"#FFB347",fontWeight:700,fontSize:13}}>タスクをこなしてポイントをためよう！</div>}
              </>
            )}
          </div>
        )}

        {tab==="zukan"&&(
          <>
            <div style={{display:"flex",gap:6,marginBottom:14,overflowX:"auto",paddingBottom:4}}>
              {GENRES.map(g=>{
                const cnt=CHARACTERS[g.id].filter(c=>player.collection[c.id]).length;
                return(
                  <button key={g.id} onClick={()=>g.active&&setZukanGenre(g.id)} style={{flexShrink:0,padding:"8px 10px",borderRadius:12,border:"none",background:!g.active?"#f0f0f0":zukanGenre===g.id?g.color:"white",color:!g.active?"#ccc":zukanGenre===g.id?"white":"#aaa",fontFamily:"inherit",fontWeight:800,fontSize:11,cursor:g.active?"pointer":"default",transition:"all 0.2s",boxShadow:zukanGenre===g.id?`0 3px 10px ${g.color}55`:"0 1px 4px #0001",textAlign:"center"}}>
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
      </div>

      {selectedChar&&<CharDetail char={selectedChar} count={player.collection[selectedChar.id]||0} onClose={()=>setSelectedChar(null)}/>}

      {parentOpen&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:1000,padding:16}} onClick={e=>{if(e.target===e.currentTarget){setParentOpen(false);setParentAuth(false);}}}>
          <div style={{background:"white",borderRadius:"22px 22px 14px 14px",width:"100%",maxWidth:440,padding:22,maxHeight:"85vh",overflowY:"auto",animation:"popIn 0.3s ease"}}>
            {!parentAuth?(
              <PinModal correctPin={pin} onSuccess={()=>{setParentAuth(true);setParentTab("tasks");setNewPin("");setNewPin2("");setPinChangeMsg("");setEditNames(players.map(p=>p.name));setEditCount(players.length);setBonusType("pt");}} onClose={()=>setParentOpen(false)}/>
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
                    <BackupPanel players={players} pin={pin} setPlayers={setPlayers} setPin={setPin}/>
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
