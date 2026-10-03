"use client";
import {useState} from "react";
export default function Home(){
 const [url,setUrl]=useState("");const [type,setType]=useState("view");const [count,setCount]=useState(20);const [events,setEvents]=useState([]);const [running,setRunning]=useState(false);const [error,setError]=useState("");
 async function run(){if(!url.trim()||running)return;setError("");setRunning(true);setEvents([]);
  try{const r=await fetch("/api/tests",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:url,eventType:type,count:Number(count)})});const d=await r.json();if(!r.ok)throw new Error(d.error||"Failed");
   for(let i=0;i<Number(count);i++){await new Promise(x=>setTimeout(x,350));const er=await fetch("/api/tests/"+d.test.id+"/events",{method:"POST"});const ed=await er.json();if(!er.ok)throw new Error(ed.error||"Event failed");setEvents(e=>[...e,ed.event]);}
  }catch(e){setError(e.message)}finally{setRunning(false)}
 }
 return <main style={{maxWidth:900,margin:"40px auto",padding:20}}><div style={{background:"#fff",borderRadius:20,padding:28,boxShadow:"0 8px 30px #00000010"}}>
 <h1 style={{marginTop:0}}>View Test Lab</h1><p style={{color:"#667085"}}>بيئة اختبارات آمنة لتسجيل أحداث Synthetic فقط. لا يتم إرسال تفاعلات حقيقية لأي منصة.</p>
 <div style={{background:"#fff4e5",padding:14,borderRadius:12,margin:"20px 0"}}><b>Server-side limit: 20 events لكل اختبار</b><br/>الرابط مجرد Target للاختبار ولا يتم استخدامه لزيادة المشاهدات أو التفاعلات.</div>
 <label>رابط الهدف التجريبي</label><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://example.com/test" style={{display:"block",width:"100%",boxSizing:"border-box",padding:14,margin:"8px 0 16px",border:"1px solid #d0d5dd",borderRadius:10}}/>
 <div style={{display:"flex",gap:10,marginBottom:16}}><select value={type} onChange={e=>setType(e.target.value)} style={{padding:12}}><option value="view">Views</option><option value="like">Likes</option><option value="comment">Comments</option></select><input type="number" min="1" max="20" value={count} onChange={e=>setCount(Math.min(20,Math.max(1,Number(e.target.value)||1)))} style={{width:90,padding:12}}/></div>
 <button onClick={run} disabled={!url.trim()||running} style={{padding:"12px 20px",border:0,borderRadius:10}}>{running?"جاري تشغيل الاختبار...":"تشغيل الاختبار"}</button>
 {error&&<p style={{color:"#b42318"}}>{error}</p>}<div style={{marginTop:25}}><h2>السجل ({events.length}/{count})</h2>{events.map(e=><div key={e.id} style={{padding:"10px 0",borderBottom:"1px solid #eee"}}>#{e.sequence} — {e.type} — {new Date(e.createdAt).toLocaleTimeString()}</div>)}</div>
 </div></main>
}