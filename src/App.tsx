"use client";
import { useEffect, useState } from "react";
import { ArrowRight, MapPin, NotebookPen, Plane, Check, LoaderCircle, Coffee, Utensils, ShoppingBag, Building2, TrainFront } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { trip, tripPeriods, type Stop } from "@/lib/trips";
import { supabase } from "@/lib/supabase";
import { SeoulSkyline } from "./SeoulSkyline";
import type { User } from "@supabase/supabase-js";
const { days, stops: data, storageKey } = trip;

function dayNumber(date: string) {
 return date.slice(8);
}
function monthLabel(date: string) {
 return `${Number(date.slice(5, 7))} 月`;
}

function kind(item:Stop){
 if(item.category==="Flight"||item.name.includes("BR1"))return {Icon:Plane,label:"航班"};
 if(item.category==="Commute")return {Icon:TrainFront,label:"交通"};
 if(item.category==="Cafe"||/甜點/.test(item.notes))return {Icon:Coffee,label:"咖啡・甜點"};
 if(item.category==="Shopping"||/飾品|PLAZA/.test(item.name))return {Icon:ShoppingBag,label:"逛街"};
 if(item.category==="Restaurant"||/肉|五花|韓牛|湯|餃|Kongsim|外婆|Egg/.test(item.name))return {Icon:Utensils,label:"美食"};
 return {Icon:Building2,label:item.category==="Hotel"||item.name.includes("諾富特")?"住宿":"探索"};
}
export default function App(){
 const [user,setUser]=useState<User|null>(null);const [initialized,setInitialized]=useState(false);
 useEffect(()=>{const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,session)=>{setUser(session?.user??null);setInitialized(true);});return()=>subscription.unsubscribe();},[]);
 if(!initialized)return <main className="booting"><p role="status">正在載入旅行手帳…</p></main>;
 return <Home key={user?.id??"device"} user={user}/>;
}
function Home({user}:{user:User|null}){
 const [day,setDay]=useState(days[0].date);const [notes,setNotes]=useState<Record<string,string>>({});const [ready,setReady]=useState(false);
 const [loadError,setLoadError]=useState("");const [editing,setEditing]=useState<string|null>(null);const [draft,setDraft]=useState("");const [saving,setSaving]=useState(false);const [message,setMessage]=useState("");const [error,setError]=useState("");
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
 const tools=[{name:"read_itinerary",description:"讀取目前旅行的參考行程與已儲存備註。",inputSchema:{type:"object",properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:()=>data.map(x=>({...x,suggestedPeriod:x.period,suggestion:x.hint,notes:notes[x.id]??x.notes}))},{name:"save_itinerary_note",description:"儲存指定行程的完整備註，取代目前備註。",inputSchema:{type:"object",properties:{id:{type:"string"},text:{type:"string",maxLength:10000}},required:["id","text"],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:true},execute:async(input:any)=>{if(!ready||editing||importBusy||authBusy)throw Error("請先完成目前編輯並確認備註已載入");if(!input||typeof input.id!=="string"||typeof input.text!=="string")throw Error("需要行程 ID 與文字");return save(input.id,input.text);}}];
 for(const tool of tools){try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}}return()=>lifecycle.abort();},[notes,ready,editing,importBusy,authBusy]);
 return <main><div className="band"><header className="topbar"><a className="brand" href={import.meta.env.BASE_URL}><NotebookPen size={18} strokeWidth={1.5}/> SEOUL <span>／ 我的旅行手帳</span></a><a className="trip-link" href={trip.otherTrip.href} onClick={event=>{if(editing){event.preventDefault();setError("請先儲存或取消目前備註，再切換行程。");}}}>{trip.otherTrip.label}<ArrowRight size={14} strokeWidth={1.5} aria-hidden="true"/></a></header>
 <section className="intro"><div className="intro-text"><h1>{trip.title}</h1><div className="trip-meta"><span>{trip.dates}</span><span>{trip.duration}</span></div></div></section><SeoulSkyline/></div>
 <Tabs value={day} onValueChange={v=>{if(editing){setError("請先儲存或取消目前備註，再切換日期。");return;}setDay(v);setMessage("");}} className="itinerary">
   <TabsList className="day-tabs" aria-label="行程日期">
     {days.map(({ date, weekday }) => (
       <TabsTrigger className="day-tab" key={date} value={date} aria-label={`${monthLabel(date)} ${Number(dayNumber(date))} 日 ${weekday}`}>
         <strong>{dayNumber(date)}</strong><span><span className="tab-month">{monthLabel(date)} · </span>{weekday}</span>
       </TabsTrigger>
     ))}
   </TabsList>
   {loadError&&<div className="alert" role="alert">{loadError}<button onClick={load}>重新載入</button></div>}
   <p className="save-status" aria-live="polite">{message}</p>
   {days.map(({ date, title }) => {
     const stops: Stop[] = data.filter(item => item.day === date);
     let paneIndex = 0;
     return (
       <TabsContent key={date} value={date}>
         <div className="day-heading">
           <h2>{title}</h2><span className="count">{stops.length} 個行程</span>
         </div>
         <p className="flexible">{trip.scheduleNote}</p>
         <div className="periods">
           {tripPeriods.map(period => {
             const periodStops = stops.filter(item => item.period === period);
             if (!periodStops.length) return null;
             return (
               <section className="period-section" key={period} aria-label={period}>
                 <div className="period-heading"><h3>{period}</h3></div>
                 <div className="cards">
                   {periodStops.map(item => {
                     const { Icon, label } = kind(item);
                     const note = notes[item.id] ?? item.notes;
                     return (
                       <article className="stop" key={item.id} style={{ "--i": paneIndex++ } as React.CSSProperties}>
                         <div className="stop-top">
                           <span className="category"><Icon size={14} strokeWidth={1.75}/>{label}</span>
                           {item.region && <span className="region"><MapPin size={13} strokeWidth={1.75}/>{item.region}</span>}
                         </div>
                         {item.time ? <p className="stop-time">{item.time}</p> : <p className="stop-time no-time" aria-hidden="true">—</p>}
                         <h4>{item.name}</h4>
                         {item.hint && <p className="schedule-hint">{item.hint}</p>}
                         <div className="note-block">
                           <div className="note-label">
                             <span>行程備註</span>
                             <button disabled={!ready||saving||importBusy||authBusy||(editing!==null&&editing!==item.id)} onClick={()=>start(item.id)}>
                               <NotebookPen size={14} strokeWidth={1.75}/>{note?"修改備註":"新增備註"}
                             </button>
                           </div>
                           {editing===item.id ? (
                             <form onSubmit={async e=>{e.preventDefault();setSaving(true);setError("");try{await save(item.id,draft);setEditing(null);}catch(e){setError((e as Error).message);}finally{setSaving(false);}}}>
                               <textarea autoFocus aria-label={`${item.name}的備註`} value={draft} onChange={e=>setDraft(e.target.value)} maxLength={10000} rows={5}/>
                               <div className="edit-actions">
                                 <button type="button" disabled={saving} onClick={()=>{setEditing(null);setError("");}}>取消</button>
                                 <button className="save-button" disabled={saving} type="submit">{saving?<LoaderCircle size={15} className="spin"/>:<Check size={15}/>} {saving?"儲存中":"儲存備註"}</button>
                               </div>
                               {error&&<p className="error" role="alert">{error}</p>}
                             </form>
                           ) : <p className={note?"note":"note empty-note"}>{note||"尚未新增備註。"}</p>}
                         </div>
                         <footer className="stop-footer">
                           {item.mapLinks.length ? (
                             <>
                               <span className="map-provider">Naver Map</span>
                               <ul className="map-links">
                                 {item.mapLinks.map(({ label, url }) => (
                                   <li key={url}>
                                     <a className="map-link" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${label}（Naver Map）`}>
                                       <MapPin size={14} strokeWidth={1.75} aria-hidden="true"/>{label}
                                     </a>
                                   </li>
                                 ))}
                               </ul>
                             </>
                           ) : <span className="no-map">原檔未提供地圖連結</span>}
                         </footer>
                       </article>
                     );
                   })}
                 </div>
               </section>
             );
           })}
         </div>
       </TabsContent>
     );
   })}
 </Tabs>
 <details className="cloud-panel" open={Boolean(user)}>
 <summary>{user ? "管理雲端備註" : "登入或管理備註"}</summary>
 <p>{user?`已登入 ${user.email}。其他裝置登入同一帳號後，重新載入即可查看最新備註。`:"未登入時，備註只存於目前瀏覽器。登入後可跨裝置查看。"}</p>
 {user?<div className="cloud-actions"><button disabled={!ready||!!editing||saving||authBusy||importBusy} onClick={importNotes}>{importBusy?"匯入中…":"匯入此裝置備註"}</button><button disabled={!!editing||saving||authBusy||importBusy} onClick={load}>重新載入雲端備註</button><button disabled={!!editing||saving||authBusy||importBusy} onClick={logout}>登出</button><small>匯入只新增雲端尚未有的備註，不覆蓋既有內容。</small></div>:<form onSubmit={login} className="login-form"><label>Email<input type="email" autoComplete="username" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>密碼<input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><button disabled={authBusy||saving||!!editing} type="submit">{authBusy?"登入中…":"登入雲端備註"}</button></form>}
 {authError&&<p className="error" role="alert">{authError}</p>}</details><footer className="page-footer"><span>{user?"每個帳號只能查看自己的備註。":"登入後可選擇匯入裝置備註。"}</span></footer></main>;
}


