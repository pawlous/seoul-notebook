"use client";
import { useEffect, useState } from "react";
import { MapPin, NotebookPen, Plane, Check, LoaderCircle, Coffee, Utensils, ShoppingBag, Building2, TrainFront } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import data from "@/lib/itinerary.json";
import { dayPlan, periods } from "@/lib/day-plan";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
const days=["2026-10-13","2026-10-14","2026-10-15","2026-10-16","2026-10-17"];
const titles=["抵達首爾，隨心逛逛","聖水的甜點與城市小旅行","走進宮殿與安國街巷","弘大散步，收集喜歡的小店","早餐之後，帶回首爾的回憶"];
const weekdays=["週二","週三","週四","週五","週六"];
function kind(item:typeof data[number]){
 if(item.name.includes("BR1"))return {Icon:Plane,label:"航班"};
 if(item.category==="Commute")return {Icon:TrainFront,label:"交通"};
 if(item.category==="Cafe"||/甜點/.test(item.notes))return {Icon:Coffee,label:"咖啡・甜點"};
 if(item.category==="Shopping"||/飾品|PLAZA/.test(item.name))return {Icon:ShoppingBag,label:"逛街"};
 if(item.category==="Restaurant"||/肉|五花|韓牛|湯|餃|Kongsim|外婆|Egg/.test(item.name))return {Icon:Utensils,label:"美食"};
 return {Icon:Building2,label:item.name.includes("諾富特")?"住宿":"探索"};
}
export default function App(){
 const [user,setUser]=useState<User|null>(null);const [initialized,setInitialized]=useState(false);
 useEffect(()=>{const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setUser(session?.user??null);setInitialized(true);});return()=>subscription.unsubscribe();},[]);
 if(!initialized)return <main><p role="status">正在載入旅行手帳…</p></main>;
 return <Home key={user?.id??"device"} user={user}/>;
}
function Home({user}:{user:User|null}){
 const [day,setDay]=useState(days[0]);const [notes,setNotes]=useState<Record<string,string>>({});const [ready,setReady]=useState(false);
 const [loadError,setLoadError]=useState("");const [editing,setEditing]=useState<string|null>(null);const [draft,setDraft]=useState("");const [saving,setSaving]=useState(false);const [message,setMessage]=useState("");const [error,setError]=useState("");
 const storageKey="seoul-notebook-2026-notes-v1";
 function readNotes():Record<string,string>{const value=JSON.parse(localStorage.getItem(storageKey)||"{}");if(!value||Array.isArray(value)||typeof value!=="object"||Object.values(value).some(v=>typeof v!=="string"))throw Error("Invalid saved notes");return value;}
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [authBusy,setAuthBusy]=useState(false);const [authError,setAuthError]=useState("");const [importBusy,setImportBusy]=useState(false);
 async function load(){setLoadError("");setReady(false);try{if(user){const {data:rows,error}=await supabase.from("travel_notes").select("stop_id,content").eq("user_id",user.id);if(error)throw error;setNotes(Object.fromEntries((rows??[]).map(x=>[x.stop_id,x.content])));}else{setNotes(readNotes());}setReady(true);}catch{setLoadError(user?"雲端備註無法載入，請確認已完成資料表設定並檢查網路，再按重新載入。":"此瀏覽器無法讀取備註，請確認允許網站儲存資料後重試。");}}
 async function login(e:React.FormEvent){e.preventDefault();setAuthBusy(true);setAuthError("");try{const {error}=await supabase.auth.signInWithPassword({email:email.trim(),password});if(error)throw error;setPassword("");}catch{setAuthError("登入失敗，請確認 Email、密碼與網路，並確認已在 Supabase 建立使用者。");}finally{setAuthBusy(false);}}
 async function logout(){setAuthBusy(true);setAuthError("");try{const {error}=await supabase.auth.signOut({scope:"local"});if(error)throw error;}catch{setAuthError("登出失敗，請重試。");}finally{setAuthBusy(false);}}
 async function importNotes(){if(!user||!ready)return;setImportBusy(true);setAuthError("");try{const local=readNotes();const rows=Object.entries(local).filter(([id,text])=>data.some(x=>x.id===id)&&text.length<=10000&&!Object.prototype.hasOwnProperty.call(notes,id)).map(([stop_id,content])=>({user_id:user.id,stop_id,content}));if(!rows.length){setMessage("沒有待匯入的備註；雲端已有的行程備註會保留。");return;}const {error}=await supabase.from("travel_notes").upsert(rows,{onConflict:"user_id,stop_id",ignoreDuplicates:true});if(error)throw error;await load();setMessage("匯入完成；雲端已有的備註不會被覆蓋，裝置原本的備註也會保留。");}catch{setAuthError("匯入失敗，原本的裝置備註已保留，請稍後重試。");}finally{setImportBusy(false);}}

 useEffect(()=>{void load()},[]);
 function start(id:string){const item=data.find(x=>x.id===id);if(!item||!ready)throw Error("備註尚未載入");setDraft(notes[id]??item.notes);setEditing(id);setMessage("");setError("");}
 async function save(id:string,text:string){if(!data.some(x=>x.id===id)||typeof text!=="string"||text.length>10000)throw Error("備註內容無效");if(user){const {error}=await supabase.from("travel_notes").upsert({user_id:user.id,stop_id:id,content:text},{onConflict:"user_id,stop_id"});if(error)throw Error("雲端儲存失敗，文字已保留，請檢查網路後重試。");setNotes(prev=>({...prev,[id]:text}));setMessage("備註已儲存至雲端");}else{try{const next={...readNotes(),[id]:text};localStorage.setItem(storageKey,JSON.stringify(next));setNotes(next);}catch{throw Error("無法儲存到此裝置，文字已保留，請確認瀏覽器儲存空間與設定後重試。");}setMessage("備註已儲存到此裝置");}return {id,saved:true};}
 useEffect(()=>{const context=(document as any).modelContext;if(!context?.registerTool)return;const lifecycle=new AbortController();
 const tools=[{name:"read_itinerary",description:"讀取五天參考行程與已儲存備註。",inputSchema:{type:"object",properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:()=>data.map(x=>({...x,suggestedPeriod:dayPlan[x.id].period,suggestion:dayPlan[x.id].hint,notes:notes[x.id]??x.notes}))},{name:"save_itinerary_note",description:"儲存指定行程的完整備註，取代目前備註。",inputSchema:{type:"object",properties:{id:{type:"string"},text:{type:"string",maxLength:10000}},required:["id","text"],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input:any)=>{if(!ready||editing||importBusy||authBusy)throw Error("請先完成目前編輯並確認備註已載入");if(!input||typeof input.id!=="string"||typeof input.text!=="string")throw Error("需要行程 ID 與文字");return save(input.id,input.text);}}];
 for(const tool of tools){try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}}return()=>lifecycle.abort();},[notes,ready,editing,importBusy,authBusy]);
 return <main><header className="topbar"><a className="brand" href="./"><NotebookPen size={22}/> SEOUL <span>／ 我的旅行手帳</span></a><span className="trip-year">OCTOBER 2026</span></header>
 <section className="intro"><div><p className="eyebrow">서울 · 五天四夜</p><h1>首爾，慢慢走。</h1><p className="description">想去的地方先收好，今天的步調自己決定。</p><div className="trip-meta"><span>2026.10.13 — 10.17</span><span>{data.length} 個靈感目的地</span></div></div><figure><img src={`${import.meta.env.BASE_URL}seoul.jpg`} alt="藍調時刻的首爾東大門設計廣場"/><figcaption>SEOUL / DONGDAEMUN</figcaption></figure></section>
 <section className="cloud-panel" aria-label="備註儲存與登入"><div><strong>{user?"雲端備註":"裝置備註"}</strong><p>{user?`已登入 ${user.email}。其他裝置登入同一帳號後，重新載入即可查看最新備註。`:"未登入時，備註只存於目前瀏覽器。登入後可跨裝置查看。"}</p></div>
 {user?<div className="cloud-actions"><button disabled={!ready||!!editing||saving||authBusy||importBusy} onClick={importNotes}>{importBusy?"匯入中…":"匯入此裝置備註"}</button><button disabled={!!editing||saving||authBusy||importBusy} onClick={load}>重新載入雲端備註</button><button disabled={!!editing||saving||authBusy||importBusy} onClick={logout}>登出</button><small>匯入只新增雲端尚未有的備註，不覆蓋既有內容。</small></div>:<form onSubmit={login} className="login-form"><label>Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>密碼<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button disabled={authBusy||saving||!!editing} type="submit">{authBusy?"登入中…":"登入雲端備註"}</button></form>}
 {authError&&<p className="error" role="alert">{authError}</p>}</section>
 <Tabs value={day} onValueChange={v=>{if(editing){setError("請先儲存或取消目前備註，再切換日期。");return;}setDay(v);setMessage("");}} className="itinerary"><TabsList className="day-tabs" aria-label="行程日期">{days.map((d,i)=><TabsTrigger className="day-tab" key={d} value={d}><span className="day-index">DAY 0{i+1}</span><strong>10 / {13+i}</strong><span>{weekdays[i]}</span></TabsTrigger>)}</TabsList>
 {loadError&&<div className="alert" role="alert">{loadError}<button onClick={load}>重新載入</button></div>}<p className="save-status" aria-live="polite">{message}</p>
 {days.map((d,i)=><TabsContent key={d} value={d}><div className="day-heading"><div><p className="eyebrow">DAY 0{i+1} · {weekdays[i]}</p><h2>{titles[i]}</h2></div><span className="count">{data.filter(x=>x.day===d).length} 個參考行程</span></div><p className="flexible">依行程類型與原始備註安排建議時段，沒有固定鐘點；同餐餐廳可擇一。時段不代表店家營業時間。</p>
 <div className="periods">{periods.filter(period=>data.some(x=>x.day===d&&dayPlan[x.id].period===period)).map(period=><section className="period-section" key={period} aria-label={period}><div className="period-heading"><h3>{period}</h3><span>建議時段 · 彈性安排</span></div><div className="cards">{data.filter(x=>x.day===d&&dayPlan[x.id].period===period).sort((a,b)=>dayPlan[a.id].order-dayPlan[b.id].order).map(item=>{const {Icon,label}=kind(item);const note=notes[item.id]??item.notes;return <article className="stop" key={item.id}><div className="stop-top"><span className="category"><Icon size={16}/>{label}</span>{item.region&&<span className="region"><MapPin size={14}/>{item.region}</span>}</div><h3>{item.name}</h3><p className="schedule-hint">{dayPlan[item.id].hint}</p><div className="note-block"><div className="note-label"><span>行程備註</span><button disabled={!ready||saving||importBusy||authBusy||(editing!==null&&editing!==item.id)} onClick={()=>start(item.id)}><NotebookPen size={14}/>{note?"修改備註":"新增備註"}</button></div>
 {editing===item.id?<form onSubmit={async e=>{e.preventDefault();setSaving(true);setError("");try{await save(item.id,draft);setEditing(null);}catch(e){setError((e as Error).message);}finally{setSaving(false);}}}><textarea autoFocus aria-label={`${item.name}的備註`} value={draft} onChange={e=>setDraft(e.target.value)} maxLength={10000} rows={5}/><div className="edit-actions"><button type="button" disabled={saving} onClick={()=>{setEditing(null);setError("");}}>取消</button><button className="save-button" disabled={saving} type="submit">{saving?<LoaderCircle size={15} className="spin"/>:<Check size={15}/>} {saving?"儲存中":"儲存備註"}</button></div>{error&&<p className="error" role="alert">{error}</p>}</form>:<p className={note?"note":"note empty-note"}>{note||"尚未新增備註。把想吃的、想買的或交通提醒記在這裡。"}</p>}</div>
 <footer className="stop-footer"><span>{item.day.slice(5).replace("-"," / ")}</span>{item.map?<a className="map-link" href={item.map} target="_blank" rel="noopener noreferrer"><MapPin size={16}/>開啟地圖 <span>NAVER</span></a>:<span className="no-map">原檔未提供地圖連結</span>}</footer></article>})}</div></section>)}</div></TabsContent>)}
 </Tabs><footer className="page-footer"><span>{user?"登入後儲存至雲端；每個帳號只能查看自己的備註。":"裝置備註不會自動上傳；登入後可選擇匯入。"}</span><a href="https://commons.wikimedia.org/wiki/File:Dongdaemun_Design_Plaza_%26_Park_-_13461828345.jpg" target="_blank" rel="noreferrer">Photo: Nestor Lacle · CC BY 2.0 · cropped</a></footer></main>;
}


