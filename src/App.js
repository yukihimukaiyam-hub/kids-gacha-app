import { useState, useRef } from "react";

// ============================================================
// DATA
// ============================================================
const GENRES = [
  { id: "umiu",    name: "ウミウシ",   emoji: "🐚", color: "#5BC8E8", active: true },
  { id: "chyo",    name: "ちょうちょ", emoji: "🦋", color: "#B787E0", active: true },
  { id: "sakana",  name: "さかな",     emoji: "🐠", color: "#4ECDC4", active: false },
  { id: "hana",    name: "はな",       emoji: "🌸", color: "#FF8FAB", active: false },
  { id: "dobutsu", name: "どうぶつ",   emoji: "🐾", color: "#FFAA5A", active: false },
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
  chyo: [
    {id:"chyo_01",name:"ちょうこ",rarity:"N"},{id:"chyo_02",name:"きあげは",rarity:"N"},
    {id:"chyo_03",name:"あおすじ",rarity:"N"},{id:"chyo_04",name:"しましま",rarity:"N"},
    {id:"chyo_05",name:"きらりん",rarity:"N"},{id:"chyo_06",name:"てんてん",rarity:"N"},
    {id:"chyo_07",name:"みどりん",rarity:"N"},{id:"chyo_08",name:"きいろちゃん",rarity:"N"},
    {id:"chyo_09",name:"べにこ",rarity:"N"},{id:"chyo_10",name:"こまち",rarity:"N"},
    {id:"chyo_11",name:"るりたては",rarity:"N"},{id:"chyo_12",name:"ひめあか",rarity:"N"},
    {id:"chyo_13",name:"うらら",rarity:"N"},{id:"chyo_14",name:"くろしろ",rarity:"N"},
    {id:"chyo_15",name:"おれんじ",rarity:"N"},{id:"chyo_16",name:"しらはね",rarity:"N"},
    {id:"chyo_17",name:"てんとう",rarity:"N"},{id:"chyo_18",name:"よぞら",rarity:"N"},
    {id:"chyo_19",name:"みずいろ",rarity:"R"},{id:"chyo_20",name:"きんきら",rarity:"R"},
    {id:"chyo_21",name:"はねぼかし",rarity:"R"},{id:"chyo_22",name:"すみれ",rarity:"R"},
    {id:"chyo_23",name:"はごろも",rarity:"R"},{id:"chyo_24",name:"かざぐるま",rarity:"R"},
    {id:"chyo_25",name:"みやび",rarity:"R"},{id:"chyo_26",name:"はなびら",rarity:"R"},
    {id:"chyo_27",name:"しまきら",rarity:"R"},
    {id:"chyo_28",name:"ゆめおおるり",rarity:"SR"},{id:"chyo_29",name:"ぎんせかい",rarity:"SR"},
    {id:"chyo_30",name:"しろきせき",rarity:"SR"},
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
  hana: [
    {id:"hana_01",name:"たんぽぽ",rarity:"N"},{id:"hana_02",name:"チューリップ",rarity:"N"},
    {id:"hana_03",name:"スミれちゃん",rarity:"N"},{id:"hana_04",name:"サクラこ",rarity:"N"},
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
const RARITY_COLOR = { N:"#62C462", R:"#4A90E2", SR:"#F5A623" };
const RARITY_BG    = { N:"#EBF7EB", R:"#EAF2FF", SR:"#FFF7E6" };
const GACHA_COST   = 5;   // points per gacha
const TASK_PT      = 1;   // points per task
const CLEAR_BONUS  = 2;   // bonus for full clear
const PARENT_BONUS = 2;   // bonus from parent

function makePlayer(name) {
  return { name, points: 0, collection: {}, tasks: [] };
}

function rollGacha() {
  const r = Math.random();
  const rarity = r < 0.05 ? "SR" : r < 0.25 ? "R" : "N";
  const pool = ACTIVE_CHARS.filter(c => c.rarity === rarity);
  return pool[Math.floor(Math.random() * pool.length)];
}

function getCharImage(charId) {
  const prefix = charId.split("_")[0];
  if (prefix === "umiu" || prefix === "chyo") {
    return `/images/${charId}.png`;
  }
  return null;
}

function getGenreEmoji(charId) {
  const g = GENRES.find(g => charId.startsWith(g.id));
  return g ? g.emoji : "🎴";
}

// ============================================================
// FLOATING FX
// ============================================================
function Floaters({ items }) {
  return <>
    {items.map(s => (
      <div key={s.id} style={{
        position:"fixed", left:s.x-16, top:s.y-16, pointerEvents:"none", zIndex:9999,
        fontSize:26, animation:"floatUp 0.9s ease-out forwards"
      }}>{s.icon}</div>
    ))}
  </>;
}

// ============================================================
// POINT BAR
// ============================================================
function PointBar({ points }) {
  const full = Math.floor(points / GACHA_COST);
  const partial = (points % GACHA_COST) / GACHA_COST;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
      <div style={{ flex:1 }}>
        <div style={{ display:"flex", justifyContent:"space-between", fontSize:10, color:"#aaa", marginBottom:3 }}>
          <span>⭐ {points}ポイント</span>
          <span>つぎのガチャまで あと{GACHA_COST - (points % GACHA_COST === 0 && points > 0 ? GACHA_COST : points % GACHA_COST)}pt</span>
        </div>
        <div style={{ background:"#eee", borderRadius:99, height:10, overflow:"hidden" }}>
          <div style={{
            width:`${partial*100}%`, height:"100%",
            background:"linear-gradient(90deg,#FFD700,#FF8C00)",
            borderRadius:99, transition:"width 0.4s ease"
          }}/>
        </div>
      </div>
      <div style={{ background:"#5599EE", color:"white", borderRadius:12, padding:"4px 10px", fontWeight:900, fontSize:13, whiteSpace:"nowrap" }}>
        🎰 {full}回
      </div>
    </div>
  );
}

// ============================================================
// CARD SLOT
// ============================================================
function CardSlot({ char, collected, onSelect }) {
  return (
    <div onClick={()=>collected && onSelect && onSelect(char)}
      style={{
        width:72, borderRadius:12,
        background: collected ? RARITY_BG[char.rarity] : "#f2f2f2",
        border:`2px solid ${collected ? RARITY_COLOR[char.rarity] : "#e0e0e0"}`,
        display:"flex", flexDirection:"column", alignItems:"center",
        padding:"8px 4px 6px", gap:3,
        opacity: collected ? 1 : 0.45,
        transition:"all 0.15s",
        cursor: collected ? "pointer" : "default",
        transform: collected ? undefined : undefined,
      }}>
      <div style={{ width:44, height:44, display:"flex", alignItems:"center", justifyContent:"center" }}>
        {collected
          ? (getCharImage(char.id)
              ? <img src={getCharImage(char.id)} alt={char.name} style={{ width:44, height:44, objectFit:"contain" }}/>
              : <span style={{ fontSize:30 }}>{getGenreEmoji(char.id)}</span>)
          : <span style={{ fontSize:28 }}>❓</span>}
      </div>
      <div style={{ fontSize:9, fontWeight:700, color:"#555", textAlign:"center", lineHeight:1.3, minHeight:22 }}>
        {collected ? char.name : "???"}
      </div>
      {collected && (
        <span style={{ background:RARITY_COLOR[char.rarity], color:"white", borderRadius:99, padding:"1px 6px", fontSize:9, fontWeight:800 }}>
          {char.rarity}
        </span>
      )}
    </div>
  );
}

// ============================================================
// CHAR DETAIL MODAL
// ============================================================
function CharDetail({ char, count, onClose }) {
  const genre = GENRES.find(g => char.id.startsWith(g.id));
  return (
    <div style={{
      position:"fixed", inset:0, background:"rgba(0,0,0,0.6)",
      display:"flex", alignItems:"center", justifyContent:"center",
      zIndex:2000, padding:24,
    }} onClick={onClose}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:"white", borderRadius:28, padding:"32px 28px",
        width:"100%", maxWidth:320, textAlign:"center",
        animation:"popIn 0.35s ease",
        border:`4px solid ${RARITY_COLOR[char.rarity]}`,
        boxShadow:`0 12px 48px ${RARITY_COLOR[char.rarity]}44`,
        position:"relative",
      }}>
        {/* Close */}
        <button onClick={onClose} style={{
          position:"absolute", top:14, right:14,
          background:"#f0f0f0", border:"none", borderRadius:"50%",
          width:32, height:32, fontSize:16, cursor:"pointer", color:"#aaa",
          display:"flex", alignItems:"center", justifyContent:"center",
          fontWeight:900,
        }}>✕</button>

        {/* Rarity ribbon */}
        <div style={{
          position:"absolute", top:-1, left:"50%", transform:"translateX(-50%)",
          background:RARITY_COLOR[char.rarity], color:"white",
          borderRadius:"0 0 14px 14px", padding:"4px 20px",
          fontWeight:900, fontSize:13, letterSpacing:2,
        }}>{char.rarity}</div>

        {/* Image or emoji big */}
        <div style={{
          marginTop:20, marginBottom:8,
          filter:`drop-shadow(0 4px 12px ${RARITY_COLOR[char.rarity]}66)`,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          {getCharImage(char.id)
            ? <img src={getCharImage(char.id)} alt={char.name} style={{ width:160, height:160, objectFit:"contain" }}/>
            : <span style={{ fontSize:96 }}>{genre?.emoji || "🎴"}</span>}
        </div>

        {/* Name */}
        <div style={{ fontWeight:900, fontSize:26, color:"#333", marginBottom:6 }}>
          {char.name}
        </div>

        {/* Genre */}
        <div style={{
          display:"inline-flex", alignItems:"center", gap:6,
          background: genre ? `${genre.color}22` : "#f5f5f5",
          border:`1.5px solid ${genre?.color || "#eee"}`,
          borderRadius:99, padding:"5px 16px", fontSize:13,
          color: genre?.color || "#aaa", fontWeight:700, marginBottom:16,
        }}>
          {genre?.emoji} {genre?.name}
        </div>

        {/* Count */}
        {count > 1 && (
          <div style={{ color:"#bbb", fontSize:12, marginTop:4 }}>
            × {count} もってる
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// GACHA EFFECT
// ============================================================
function GachaEffect({ rarity }) {
  const isSR = rarity === "SR";
  const particles = Array.from({ length: isSR ? 40 : 20 }, (_, i) => i);
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:1500, overflow:"hidden" }}>
      {/* Flash overlay for SR */}
      {isSR && (
        <div style={{
          position:"absolute", inset:0,
          background:"radial-gradient(circle at 50% 40%, #fff9 0%, transparent 70%)",
          animation:"srFlash 0.6s ease-out forwards",
        }}/>
      )}
      {/* Light beams for SR */}
      {isSR && Array.from({length:8}).map((_,i)=>(
        <div key={i} style={{
          position:"absolute", top:"40%", left:"50%",
          width:3, height:"60vh",
          background:"linear-gradient(to bottom, #FFD70088, transparent)",
          transformOrigin:"top center",
          transform:`rotate(${i*45}deg)`,
          animation:`beamFade 1.2s ease-out ${i*0.05}s forwards`,
          opacity:0,
        }}/>
      ))}
      {/* Falling particles */}
      {particles.map(i => {
        const x = Math.random()*100;
        const delay = Math.random()*1.2;
        const dur = 1.2 + Math.random()*1.0;
        const size = isSR ? 10+Math.random()*14 : 6+Math.random()*8;
        const colors = isSR
          ? ["#FFD700","#FF8C00","#FFF","#FFFACD","#FFE066","#FFC0CB"]
          : ["#87CEEB","#B0E0FF","#FFF","#E0F0FF","#C0D8FF"];
        const color = colors[Math.floor(Math.random()*colors.length)];
        const shape = isSR
          ? ["✦","★","✸","◆","✺"][Math.floor(Math.random()*5)]
          : ["·","✦","○","·","✦"][Math.floor(Math.random()*5)];
        return (
          <div key={i} style={{
            position:"absolute", left:`${x}%`, top:-20,
            fontSize:size, color,
            animation:`particleFall ${dur}s ease-in ${delay}s forwards`,
            opacity:0,
            textShadow: isSR ? `0 0 8px ${color}` : "none",
          }}>{shape}</div>
        );
      })}
    </div>
  );
}

// ============================================================
// PIN INPUT MODAL
// ============================================================
function PinModal({ onSuccess, onClose, correctPin }) {
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);
  function check() {
    if (val === correctPin) { onSuccess(); }
    else { setErr(true); setVal(""); }
  }
  return (
    <div style={{ textAlign:"center" }}>
      <div style={{ fontSize:40, marginBottom:8 }}>🔐</div>
      <div style={{ fontWeight:900, fontSize:18, color:"#333", marginBottom:4 }}>おやモード</div>
      <div style={{ color:"#aaa", fontSize:12, marginBottom:20 }}>PINコードをにゅうりょくしてください</div>
      <input type="password" value={val} onChange={e=>setVal(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&check()}
        placeholder="PIN" maxLength={8}
        style={{
          width:"100%", padding:"12px", borderRadius:14, textAlign:"center",
          border:`2px solid ${err?"#FF4757":"#ddd"}`, fontFamily:"inherit",
          fontSize:22, letterSpacing:8, outline:"none", boxSizing:"border-box"
        }}/>
      {err && <div style={{ color:"#FF4757", fontSize:12, marginTop:6 }}>PINがちがいます</div>}
      <button onClick={check} style={{
        width:"100%", marginTop:14, background:"#FF8C00", border:"none",
        borderRadius:14, padding:13, fontFamily:"inherit", fontWeight:900,
        fontSize:16, color:"white", cursor:"pointer"
      }}>かくにん</button>
      <button onClick={onClose} style={{
        width:"100%", marginTop:8, background:"#f5f5f5", border:"none",
        borderRadius:14, padding:11, fontFamily:"inherit", fontSize:13,
        color:"#aaa", cursor:"pointer"
      }}>キャンセル</button>
    </div>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  // Setup screen
  const [screen, setScreen]         = useState("setup"); // setup | main
  const [setupNames, setSetupNames] = useState(["", ""]);
  const [setupCount, setSetupCount] = useState(2);
  const [setupPin, setSetupPin]     = useState("");
  const [setupPin2, setSetupPin2]   = useState("");
  const [setupPinErr, setSetupPinErr] = useState("");

  // Game state
  const [players, setPlayers]       = useState([]);
  const [pin, setPin]               = useState("1234");
  const [current, setCurrent]       = useState(0);
  const [tab, setTab]               = useState("todo");

  // Parent modal
  const [parentOpen, setParentOpen] = useState(false);
  const [parentAuth, setParentAuth] = useState(false);
  const [parentTab, setParentTab]   = useState("tasks");
  const [newTask, setNewTask]       = useState("");

  // PIN change
  const [newPin, setNewPin]         = useState("");
  const [newPin2, setNewPin2]       = useState("");
  const [pinChangeMsg, setPinChangeMsg] = useState("");

  // Player settings
  const [editNames, setEditNames]   = useState([]);
  const [editCount, setEditCount]   = useState(2);

  // Gacha
  const [gachaAnim, setGachaAnim]   = useState(false);
  const [gachaEffect, setGachaEffect] = useState(false);
  const [gachaResult, setGachaResult] = useState(null);
  const [gachaIsNew, setGachaIsNew] = useState(false);

  // Zukan
  const [zukanGenre, setZukanGenre] = useState("umiu");
  const [selectedChar, setSelectedChar] = useState(null);

  // FX
  const [floaters, setFloaters]     = useState([]);
  const fxId = useRef(0);

  function addFloater(x, y, icon="⭐") {
    const id = fxId.current++;
    setFloaters(f=>[...f,{id,x,y,icon}]);
    setTimeout(()=>setFloaters(f=>f.filter(fl=>fl.id!==id)),900);
  }

  const player = players[current] || makePlayer("?");

  function updatePlayer(idx, fn) {
    setPlayers(prev=>prev.map((p,i)=>i===idx?fn(p):p));
  }

  // ---- SETUP ----
  function startGame() {
    if (setupPin.length < 4) { setSetupPinErr("PINは4けた以上にしてください"); return; }
    if (setupPin !== setupPin2) { setSetupPinErr("PINがあっていません"); return; }
    const names = setupNames.slice(0, setupCount).map((n,i)=>n.trim()||`プレイヤー${i+1}`);
    setPlayers(names.map(makePlayer));
    setPin(setupPin);
    setEditNames(names);
    setEditCount(setupCount);
    setScreen("main");
  }

  // ---- TASKS ----
  function completeTask(taskId, e) {
    const task = player.tasks.find(t=>t.id===taskId);
    if (!task||task.done) return;
    const rect = e.currentTarget.getBoundingClientRect();
    addFloater(rect.left+rect.width/2, rect.top, "⭐");
    setPlayers(prev=>prev.map((p,i)=>{
      if (i!==current) return p;
      const tasks = p.tasks.map(t=>t.id===taskId?{...t,done:true}:t);
      const allDone = tasks.every(t=>t.done);
      const prevAllDone = p.tasks.every(t=>t.done);
      const bonus = (allDone && !prevAllDone) ? CLEAR_BONUS : 0;
      if (bonus>0) setTimeout(()=>addFloater(rect.left+rect.width/2, rect.top-30,"🎉"),300);
      return {...p, tasks, points: p.points + TASK_PT + bonus};
    }));
  }

  function addTaskParent() {
    if (!newTask.trim()) return;
    updatePlayer(current, p=>({...p, tasks:[...p.tasks,{id:Date.now(),text:newTask.trim(),done:false}]}));
    setNewTask("");
  }

  function removeTask(id) {
    updatePlayer(current, p=>({...p, tasks:p.tasks.filter(t=>t.id!==id)}));
  }

  function resetTasks() {
    updatePlayer(current, p=>({...p, tasks:p.tasks.map(t=>({...t,done:false}))}));
  }

  // ---- GACHA ----
  function doGacha() {
    if (player.points < GACHA_COST || gachaAnim) return;
    setGachaAnim(true);
    setGachaResult(null);
    setTimeout(()=>{
      const result = rollGacha();
      const isNew = !player.collection[result.id];
      setGachaIsNew(isNew);
      setGachaResult(result);
      setGachaEffect(true);
      setTimeout(()=>setGachaEffect(false), 2500);
      updatePlayer(current, p=>({
        ...p,
        points: p.points - GACHA_COST,
        collection:{...p.collection,[result.id]:(p.collection[result.id]||0)+1}
      }));
      setGachaAnim(false);
    },1500);
  }

  // ---- PARENT SETTINGS ----
  function applyPlayerSettings() {
    const newNames = editNames.slice(0,editCount).map((n,i)=>n.trim()||`プレイヤー${i+1}`);
    setPlayers(prev=>{
      const next = [];
      for (let i=0;i<editCount;i++) {
        next.push(prev[i] ? {...prev[i],name:newNames[i]} : makePlayer(newNames[i]));
      }
      return next;
    });
    if (current >= editCount) setCurrent(0);
  }

  function changePin() {
    if (newPin.length < 4) { setPinChangeMsg("4けた以上にしてください"); return; }
    if (newPin !== newPin2)  { setPinChangeMsg("PINがあっていません"); return; }
    setPin(newPin);
    setNewPin(""); setNewPin2("");
    setPinChangeMsg("✅ PINをかえました！");
    setTimeout(()=>setPinChangeMsg(""),2000);
  }

  function giveBonus() {
    updatePlayer(current, p=>({...p, points:p.points+PARENT_BONUS}));
    addFloater(window.innerWidth/2, 200, "🎁");
    setParentOpen(false);
    setParentAuth(false);
  }

  const doneTasks  = player.tasks.filter(t=>t.done).length;
  const totalTasks = player.tasks.length;
  const collected  = Object.keys(player.collection).length;
  const canGacha   = Math.floor(player.points / GACHA_COST);

  // ============================================================
  // SETUP SCREEN
  // ============================================================
  if (screen==="setup") return (
    <div style={{
      minHeight:"100vh", background:"linear-gradient(160deg,#FFF8E1,#E3F2FD)",
      display:"flex", flexDirection:"column", alignItems:"center",
      justifyContent:"center", fontFamily:"'Kosugi Maru',sans-serif", padding:24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes floatUp{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-70px) scale(1.5)}}
        @keyframes popIn{0%{transform:scale(0);opacity:0}80%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
        @keyframes gachaShake{0%,100%{transform:scale(1) rotate(0)}25%{transform:scale(1.05) rotate(-6deg)}75%{transform:scale(1.05) rotate(6deg)}}
        @keyframes newBadge{0%{transform:scale(0)}70%{transform:scale(1.2)}100%{transform:scale(1)}}
        @keyframes particleFall{0%{opacity:1;transform:translateY(0) rotate(0deg)}100%{opacity:0;transform:translateY(100vh) rotate(720deg)}}
        @keyframes srFlash{0%{opacity:0}20%{opacity:1}100%{opacity:0}}
        @keyframes beamFade{0%{opacity:0}20%{opacity:0.7}100%{opacity:0}}
      `}</style>
      <div style={{ fontSize:52, animation:"bounce 2s infinite", marginBottom:8 }}>🌟</div>
      <h1 style={{ fontSize:26, fontWeight:900, color:"#FF8C00", margin:"0 0 4px", textAlign:"center" }}>
        まいにちコレクション
      </h1>
      <p style={{ color:"#bbb", fontSize:13, marginBottom:28 }}>さいしょにせっていしよう！</p>

      <div style={{ width:"100%", maxWidth:360, display:"flex", flexDirection:"column", gap:14 }}>

        {/* Player count */}
        <div style={{ background:"white", borderRadius:18, padding:18, boxShadow:"0 2px 12px #0001" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#888", marginBottom:10 }}>こどものにんずう</div>
          <div style={{ display:"flex", gap:8 }}>
            {[1,2,3,4].map(n=>(
              <button key={n} onClick={()=>setSetupCount(n)} style={{
                flex:1, padding:"10px 0", borderRadius:12, border:"none",
                background:setupCount===n?"#FF8C00":"#f5f5f5",
                color:setupCount===n?"white":"#999",
                fontFamily:"inherit", fontWeight:900, fontSize:16, cursor:"pointer"
              }}>{n}人</button>
            ))}
          </div>
        </div>

        {/* Names */}
        <div style={{ background:"white", borderRadius:18, padding:18, boxShadow:"0 2px 12px #0001" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#888", marginBottom:10 }}>なまえ</div>
          {Array.from({length:setupCount}).map((_,i)=>(
            <input key={i} value={setupNames[i]||""}
              onChange={e=>setSetupNames(prev=>{const a=[...prev];a[i]=e.target.value;return a;})}
              placeholder={`プレイヤー${i+1}`}
              style={{
                width:"100%", padding:"10px 14px", borderRadius:12, marginBottom:8,
                border:"2px solid #FFE082", fontFamily:"inherit", fontSize:15,
                outline:"none", boxSizing:"border-box"
              }}/>
          ))}
        </div>

        {/* PIN */}
        <div style={{ background:"white", borderRadius:18, padding:18, boxShadow:"0 2px 12px #0001" }}>
          <div style={{ fontSize:13, fontWeight:700, color:"#888", marginBottom:10 }}>おやモードのPINコード</div>
          <input type="password" value={setupPin} onChange={e=>setSetupPin(e.target.value)}
            placeholder="PINをきめてね（4けた以上）"
            style={{ width:"100%", padding:"10px 14px", borderRadius:12, marginBottom:8,
              border:`2px solid ${setupPinErr?"#FF4757":"#FFE082"}`, fontFamily:"inherit",
              fontSize:15, outline:"none", boxSizing:"border-box" }}/>
          <input type="password" value={setupPin2} onChange={e=>setSetupPin2(e.target.value)}
            placeholder="もういちどにゅうりょく"
            style={{ width:"100%", padding:"10px 14px", borderRadius:12,
              border:`2px solid ${setupPinErr?"#FF4757":"#FFE082"}`, fontFamily:"inherit",
              fontSize:15, outline:"none", boxSizing:"border-box" }}/>
          {setupPinErr && <div style={{ color:"#FF4757", fontSize:12, marginTop:6 }}>{setupPinErr}</div>}
        </div>

        <button onClick={startGame} style={{
          background:"linear-gradient(135deg,#FFD700,#FF8C00)", border:"none",
          borderRadius:99, padding:"15px", fontFamily:"inherit", fontWeight:900,
          fontSize:18, color:"white", cursor:"pointer", boxShadow:"0 4px 20px #ff8c0044"
        }}>はじめる！🎮</button>
      </div>
    </div>
  );

  // ============================================================
  // MAIN SCREEN
  // ============================================================
  return (
    <div style={{
      minHeight:"100vh", background:"linear-gradient(160deg,#FFF8E1,#E3F2FD)",
      fontFamily:"'Kosugi Maru',sans-serif", paddingBottom:80,
    }}>
      <Floaters items={floaters}/>

      {/* HEADER */}
      <div style={{
        background:"linear-gradient(90deg,#5BC8E8,#4ECDC4)",
        padding:"12px 14px 14px", borderRadius:"0 0 22px 22px",
        boxShadow:"0 4px 18px rgba(0,0,0,0.10)",
      }}>
        {/* Player tabs */}
        <div style={{ display:"flex", gap:6, marginBottom:10 }}>
          {players.map((p,i)=>(
            <button key={i} onClick={()=>{setCurrent(i);setGachaResult(null);}} style={{
              flex:1, padding:"7px 4px", borderRadius:12, border:"none",
              background:i===current?"white":"rgba(255,255,255,0.3)",
              color:i===current?"#333":"white",
              fontFamily:"inherit", fontWeight:800, fontSize:13, cursor:"pointer",
              transition:"all 0.2s"
            }}>{p.name}</button>
          ))}
          <button onClick={()=>{setParentOpen(true);setParentAuth(false);}} style={{
            padding:"7px 12px", borderRadius:12, border:"none",
            background:"rgba(255,255,255,0.25)", color:"white",
            fontSize:18, cursor:"pointer"
          }}>🔐</button>
        </div>

        {/* Stats */}
        <div style={{ display:"flex", gap:8, marginBottom:10 }}>
          <div style={{ flex:1, background:"rgba(255,255,255,0.9)", borderRadius:12, padding:"7px 10px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:"#aaa" }}>ずかん</div>
            <div style={{ fontWeight:900, color:"#FF8C00", fontSize:15 }}>{collected}<span style={{ fontSize:10, color:"#ccc" }}>/150</span></div>
          </div>
          <div style={{ flex:1, background:"rgba(255,255,255,0.9)", borderRadius:12, padding:"7px 10px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:"#aaa" }}>タスク</div>
            <div style={{ fontWeight:900, color:"#62C462", fontSize:15 }}>{doneTasks}/{totalTasks}</div>
          </div>
          <div style={{ flex:1, background:"rgba(255,255,255,0.9)", borderRadius:12, padding:"7px 10px", textAlign:"center" }}>
            <div style={{ fontSize:9, color:"#aaa" }}>ガチャけん</div>
            <div style={{ fontWeight:900, color:"#4A90E2", fontSize:15 }}>🎰{canGacha}</div>
          </div>
        </div>

        {/* Point bar */}
        <div style={{ background:"rgba(255,255,255,0.9)", borderRadius:12, padding:"8px 12px" }}>
          <PointBar points={player.points}/>
        </div>
      </div>

      {/* TABS */}
      <div style={{ display:"flex", gap:8, padding:"10px 14px 0" }}>
        {[["todo","📋 やること"],["gacha","🎰 ガチャ"],["zukan","📖 ずかん"]].map(([key,label])=>(
          <button key={key} onClick={()=>setTab(key)} style={{
            flex:1, padding:"10px 0", borderRadius:13, border:"none", cursor:"pointer",
            fontFamily:"inherit", fontWeight:800, fontSize:12,
            background:tab===key?"#FF8C00":"white",
            color:tab===key?"white":"#aaa",
            boxShadow:tab===key?"0 3px 12px #ff8c0033":"0 1px 4px #0001",
            transition:"all 0.2s"
          }}>{label}</button>
        ))}
      </div>

      <div style={{ padding:"12px 14px", maxWidth:480, margin:"0 auto" }}>

        {/* ===== TODO ===== */}
        {tab==="todo" && (
          <>
            {player.tasks.length===0 ? (
              <div style={{ textAlign:"center", padding:"48px 0", color:"#ccc" }}>
                <div style={{ fontSize:52, marginBottom:12 }}>📋</div>
                <div style={{ fontWeight:700, lineHeight:1.8 }}>🔐 おやモードで<br/>タスクをついかしてね！</div>
              </div>
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                  <div style={{ fontSize:12, color:"#aaa", fontWeight:700 }}>
                    {doneTasks===totalTasks && totalTasks>0
                      ? `🎉 ぜんぶおわった！+${CLEAR_BONUS}pt ボーナス！`
                      : `あと ${totalTasks-doneTasks}こ！`}
                  </div>
                  <button onClick={resetTasks} style={{
                    background:"#f5f5f5", border:"none", borderRadius:99,
                    padding:"4px 12px", fontSize:11, cursor:"pointer",
                    fontFamily:"inherit", color:"#bbb"
                  }}>リセット</button>
                </div>

                {/* progress */}
                <div style={{ background:"#eee", borderRadius:99, height:8, marginBottom:12, overflow:"hidden" }}>
                  <div style={{
                    width:totalTasks>0?`${(doneTasks/totalTasks)*100}%`:"0%", height:"100%",
                    background:"linear-gradient(90deg,#78D878,#FFD700)",
                    borderRadius:99, transition:"width 0.5s ease"
                  }}/>
                </div>

                {player.tasks.map(task=>(
                  <button key={task.id}
                    onClick={e=>completeTask(task.id,e)}
                    disabled={task.done}
                    style={{
                      width:"100%", display:"flex", alignItems:"center", gap:12,
                      background:task.done?"#F1F8F1":"white",
                      border:`2px solid ${task.done?"#78D878":"#FFE082"}`,
                      borderRadius:15, padding:"13px 14px", marginBottom:8,
                      cursor:task.done?"default":"pointer",
                      fontFamily:"inherit", fontSize:15, fontWeight:700,
                      color:task.done?"#78D878":"#333",
                      textAlign:"left", transition:"all 0.15s",
                      boxShadow:task.done?"none":"0 2px 8px #ffd70018"
                    }}>
                    <span style={{ fontSize:22 }}>{task.done?"✅":"⬜"}</span>
                    <span style={{ flex:1 }}>{task.text}</span>
                    <span style={{ fontSize:11, color:task.done?"#b2dfb2":"#FFB74D", fontWeight:700 }}>
                      +{TASK_PT}pt
                    </span>
                  </button>
                ))}
              </>
            )}
          </>
        )}

        {/* ===== GACHA ===== */}
        {tab==="gacha" && (
          <div style={{ textAlign:"center", paddingTop:8 }}>
            <div style={{ fontSize:13, color:"#bbb", marginBottom:6 }}>
              ガチャ1かい = <b style={{ color:"#FF8C00" }}>{GACHA_COST}ポイント</b>
            </div>
            <div style={{ fontSize:13, color:"#bbb", marginBottom:20 }}>
              いまのポイント：<b style={{ color:"#FF8C00" }}>{player.points}pt</b>　ひける回数：<b style={{ color:"#4A90E2" }}>{canGacha}回</b>
            </div>

            {/* Ball */}
            <div onClick={doGacha} style={{
              width:160, height:160, borderRadius:"50%",
              margin:"0 auto 24px",
              background: canGacha>0
                ? "radial-gradient(circle at 35% 35%,#fff9,transparent 60%),linear-gradient(135deg,#FF6B6B,#FFD700)"
                : "radial-gradient(circle at 35% 35%,#fff4,transparent 60%),linear-gradient(135deg,#ccc,#e0e0e0)",
              boxShadow: canGacha>0 ? "0 8px 30px #FF6B6B44" : "none",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:70, cursor:canGacha>0?"pointer":"not-allowed",
              animation:gachaAnim?"gachaShake 0.15s infinite":"none",
              transition:"all 0.3s", userSelect:"none",
            }}>
              {gachaAnim ? "🌀" : "🎰"}
            </div>

            <button onClick={doGacha} disabled={canGacha<1||gachaAnim} style={{
              background: canGacha>0 ? "linear-gradient(135deg,#FF6B6B,#FFD700)" : "#eee",
              border:"none", borderRadius:99, padding:"13px 36px",
              fontFamily:"inherit", fontWeight:900, fontSize:17,
              color:canGacha>0?"white":"#bbb",
              cursor:canGacha>0?"pointer":"not-allowed",
              boxShadow:canGacha>0?"0 4px 18px #FF6B6B44":"none",
            }}>
              {gachaAnim ? "ひいてる…🌀" : `ガチャをひく！（${GACHA_COST}pt）`}
            </button>

            {canGacha<1 && (
              <div style={{ marginTop:14, color:"#FFB347", fontWeight:700, fontSize:13 }}>
                タスクをこなしてポイントをためよう！
              </div>
            )}

            {gachaResult && !gachaAnim && (
              <div style={{
                marginTop:28, padding:"22px 18px", borderRadius:22,
                background:RARITY_BG[gachaResult.rarity],
                border:`3px solid ${RARITY_COLOR[gachaResult.rarity]}`,
                animation:"popIn 0.45s ease", position:"relative",
              }}>
                {gachaIsNew && (
                  <div style={{
                    position:"absolute", top:-12, right:-6,
                    background:"#FF4757", color:"white", borderRadius:99,
                    padding:"4px 12px", fontWeight:900, fontSize:12,
                    animation:"newBadge 0.4s ease", boxShadow:"0 2px 8px #FF475744"
                  }}>NEW！</div>
                )}
                <div style={{ marginBottom:8, display:"flex", justifyContent:"center" }}>
                  {getCharImage(gachaResult.id)
                    ? <img src={getCharImage(gachaResult.id)} alt={gachaResult.name} style={{ width:120, height:120, objectFit:"contain" }}/>
                    : <span style={{ fontSize:56 }}>{getGenreEmoji(gachaResult.id)}</span>}
                </div>
                <div style={{ fontWeight:900, fontSize:21, color:"#333", marginBottom:6 }}>{gachaResult.name}</div>
                <span style={{ background:RARITY_COLOR[gachaResult.rarity], color:"white", borderRadius:99, padding:"3px 14px", fontSize:13, fontWeight:800 }}>
                  {gachaResult.rarity}
                </span>
                {!gachaIsNew && <div style={{ marginTop:10, color:"#bbb", fontSize:12 }}>かぶり！</div>}
                {gachaIsNew && <div style={{ marginTop:10, color:RARITY_COLOR[gachaResult.rarity], fontSize:13, fontWeight:700 }}>ずかんについか！📖</div>}
              </div>
            )}
          </div>
        )}

        {/* ===== ZUKAN ===== */}
        {tab==="zukan" && (
          <>
            <div style={{ display:"flex", gap:6, marginBottom:14, overflowX:"auto", paddingBottom:4 }}>
              {GENRES.map(g=>{
                const cnt = CHARACTERS[g.id].filter(c=>player.collection[c.id]).length;
                const isActive = g.active;
                return (
                  <button key={g.id} onClick={()=>isActive&&setZukanGenre(g.id)} style={{
                    flexShrink:0, padding:"8px 10px", borderRadius:12, border:"none",
                    background: !isActive ? "#f0f0f0" : zukanGenre===g.id?g.color:"white",
                    color: !isActive ? "#ccc" : zukanGenre===g.id?"white":"#aaa",
                    fontFamily:"inherit", fontWeight:800, fontSize:11,
                    cursor:isActive?"pointer":"default", transition:"all 0.2s",
                    boxShadow:zukanGenre===g.id?`0 3px 10px ${g.color}55`:"0 1px 4px #0001",
                    textAlign:"center"
                  }}>
                    <div>{g.emoji}</div>
                    <div>{g.name}</div>
                    <div style={{ fontSize:10 }}>{isActive ? `${cnt}/30` : "じゅんびちゅう"}</div>
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center" }}>
              {GENRES.find(g=>g.id===zukanGenre)?.active
                ? CHARACTERS[zukanGenre].map(char=>(
                    <CardSlot key={char.id} char={char} collected={!!player.collection[char.id]} onSelect={setSelectedChar}/>
                  ))
                : <div style={{ textAlign:"center", padding:40, color:"#ccc" }}>
                    <div style={{ fontSize:48, marginBottom:12 }}>🔒</div>
                    <div style={{ fontWeight:700 }}>じゅんびちゅう…<br/>もうすこしまってね！</div>
                  </div>
              }
            </div>
          </>
        )}
      </div>

      {/* ===== GACHA EFFECT ===== */}
      {gachaEffect && gachaResult && <GachaEffect rarity={gachaResult.rarity}/>}

      {/* ===== CHAR DETAIL MODAL ===== */}
      {selectedChar && (
        <CharDetail
          char={selectedChar}
          count={player.collection[selectedChar.id] || 0}
          onClose={()=>setSelectedChar(null)}
        />
      )}

      {/* ===== PARENT MODAL ===== */}
      {parentOpen && (
        <div style={{
          position:"fixed", inset:0, background:"rgba(0,0,0,0.5)",
          display:"flex", alignItems:"flex-end", justifyContent:"center",
          zIndex:1000, padding:16,
        }} onClick={e=>{if(e.target===e.currentTarget){setParentOpen(false);setParentAuth(false);}}}>
          <div style={{
            background:"white", borderRadius:"22px 22px 14px 14px",
            width:"100%", maxWidth:440, padding:22, maxHeight:"85vh", overflowY:"auto",
            animation:"popIn 0.3s ease",
          }}>
            {!parentAuth ? (
              <PinModal
                correctPin={pin}
                onSuccess={()=>{setParentAuth(true);setParentTab("tasks");setNewPin("");setNewPin2("");setPinChangeMsg("");setEditNames(players.map(p=>p.name));setEditCount(players.length);}}
                onClose={()=>setParentOpen(false)}
              />
            ) : (
              <>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
                  <div style={{ fontWeight:900, fontSize:16, color:"#333" }}>🔓 おやモード — {player.name}</div>
                  <button onClick={()=>{setParentOpen(false);setParentAuth(false);}} style={{
                    background:"none", border:"none", fontSize:20, cursor:"pointer", color:"#bbb"
                  }}>✕</button>
                </div>

                {/* Sub-tabs */}
                <div style={{ display:"flex", gap:6, marginBottom:16, overflowX:"auto" }}>
                  {[["tasks","📋 タスク"],["bonus","🎁 ボーナス"],["settings","⚙️ せってい"]].map(([key,label])=>(
                    <button key={key} onClick={()=>setParentTab(key)} style={{
                      flexShrink:0, padding:"8px 12px", borderRadius:11, border:"none",
                      background:parentTab===key?"#FF8C00":"#f5f5f5",
                      color:parentTab===key?"white":"#aaa",
                      fontFamily:"inherit", fontWeight:800, fontSize:12, cursor:"pointer"
                    }}>{label}</button>
                  ))}
                </div>

                {/* TASKS */}
                {parentTab==="tasks" && (
                  <>
                    <div style={{ display:"flex", gap:8, marginBottom:10 }}>
                      <input value={newTask} onChange={e=>setNewTask(e.target.value)}
                        onKeyDown={e=>e.key==="Enter"&&addTaskParent()}
                        placeholder="タスクをついか…"
                        style={{ flex:1, padding:"10px 13px", borderRadius:12, border:"2px solid #FFE082", fontFamily:"inherit", fontSize:14, outline:"none" }}/>
                      <button onClick={addTaskParent} style={{
                        background:"#FFD700", border:"none", borderRadius:12,
                        padding:"10px 15px", fontSize:18, cursor:"pointer"
                      }}>＋</button>
                    </div>
                    <div style={{ maxHeight:220, overflowY:"auto" }}>
                      {player.tasks.length===0
                        ? <div style={{ color:"#ddd", textAlign:"center", padding:24 }}>タスクがありません</div>
                        : player.tasks.map(t=>(
                          <div key={t.id} style={{
                            display:"flex", alignItems:"center", gap:10, padding:"10px 12px",
                            borderRadius:12, marginBottom:6,
                            background:t.done?"#F1F8F1":"#FFFDE7",
                            border:`1px solid ${t.done?"#78D878":"#FFE082"}`
                          }}>
                            <span style={{ fontSize:16 }}>{t.done?"✅":"⬜"}</span>
                            <span style={{ flex:1, fontSize:14, color:t.done?"#aaa":"#333" }}>{t.text}</span>
                            <button onClick={()=>removeTask(t.id)} style={{ background:"none", border:"none", color:"#ffaaaa", fontSize:18, cursor:"pointer" }}>✕</button>
                          </div>
                        ))
                      }
                    </div>
                    <button onClick={resetTasks} style={{
                      width:"100%", marginTop:10, background:"#f5f5f5", border:"none",
                      borderRadius:12, padding:10, fontFamily:"inherit", fontSize:13,
                      color:"#bbb", cursor:"pointer"
                    }}>タスクをリセット</button>
                  </>
                )}

                {/* BONUS */}
                {parentTab==="bonus" && (
                  <div style={{ textAlign:"center", paddingTop:8 }}>
                    <div style={{ fontSize:48, marginBottom:12 }}>🎁</div>
                    <div style={{ color:"#555", fontSize:15, marginBottom:6 }}>
                      {player.name} に ボーナス +{PARENT_BONUS}pt
                    </div>
                    <div style={{ color:"#aaa", fontSize:12, marginBottom:24 }}>
                      いまのポイント：{player.points}pt
                    </div>
                    <button onClick={giveBonus} style={{
                      background:"linear-gradient(135deg,#78D878,#4CAF50)",
                      border:"none", borderRadius:99, padding:"14px 40px",
                      fontFamily:"inherit", fontWeight:900, fontSize:17, color:"white",
                      cursor:"pointer", boxShadow:"0 4px 16px #78D87855"
                    }}>ボーナスをあげる！🎁</button>
                  </div>
                )}

                {/* SETTINGS */}
                {parentTab==="settings" && (
                  <>
                    {/* Player count & names */}
                    <div style={{ background:"#f9f9f9", borderRadius:14, padding:14, marginBottom:14 }}>
                      <div style={{ fontWeight:800, color:"#555", fontSize:13, marginBottom:10 }}>👦 プレイヤーせってい</div>
                      <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                        {[1,2,3,4].map(n=>(
                          <button key={n} onClick={()=>setEditCount(n)} style={{
                            flex:1, padding:"8px 0", borderRadius:10, border:"none",
                            background:editCount===n?"#FF8C00":"#eee",
                            color:editCount===n?"white":"#aaa",
                            fontFamily:"inherit", fontWeight:800, fontSize:14, cursor:"pointer"
                          }}>{n}人</button>
                        ))}
                      </div>
                      {Array.from({length:editCount}).map((_,i)=>(
                        <input key={i} value={editNames[i]||""}
                          onChange={e=>setEditNames(prev=>{const a=[...prev];a[i]=e.target.value;return a;})}
                          placeholder={`プレイヤー${i+1}`}
                          style={{ width:"100%", padding:"9px 13px", borderRadius:11, marginBottom:7,
                            border:"2px solid #FFE082", fontFamily:"inherit", fontSize:14,
                            outline:"none", boxSizing:"border-box" }}/>
                      ))}
                      <button onClick={applyPlayerSettings} style={{
                        width:"100%", background:"#FF8C00", border:"none", borderRadius:11,
                        padding:10, fontFamily:"inherit", fontWeight:800, fontSize:14,
                        color:"white", cursor:"pointer"
                      }}>てきよう</button>
                    </div>

                    {/* PIN change */}
                    <div style={{ background:"#f9f9f9", borderRadius:14, padding:14 }}>
                      <div style={{ fontWeight:800, color:"#555", fontSize:13, marginBottom:10 }}>🔐 PINコードをかえる</div>
                      <input type="password" value={newPin} onChange={e=>setNewPin(e.target.value)}
                        placeholder="あたらしいPIN（4けた以上）"
                        style={{ width:"100%", padding:"9px 13px", borderRadius:11, marginBottom:7,
                          border:"2px solid #ddd", fontFamily:"inherit", fontSize:14,
                          outline:"none", boxSizing:"border-box" }}/>
                      <input type="password" value={newPin2} onChange={e=>setNewPin2(e.target.value)}
                        placeholder="もういちどにゅうりょく"
                        style={{ width:"100%", padding:"9px 13px", borderRadius:11, marginBottom:7,
                          border:"2px solid #ddd", fontFamily:"inherit", fontSize:14,
                          outline:"none", boxSizing:"border-box" }}/>
                      {pinChangeMsg && (
                        <div style={{ color:pinChangeMsg.startsWith("✅")?"#62C462":"#FF4757", fontSize:12, marginBottom:8 }}>
                          {pinChangeMsg}
                        </div>
                      )}
                      <button onClick={changePin} style={{
                        width:"100%", background:"#5BC8E8", border:"none", borderRadius:11,
                        padding:10, fontFamily:"inherit", fontWeight:800, fontSize:14,
                        color:"white", cursor:"pointer"
                      }}>PINをかえる</button>
                    </div>
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
