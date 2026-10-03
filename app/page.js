"use client";
import {useEffect,useState} from "react";
export default function Home(){
 const [accounts,setAccounts]=useState([]),[jobs,setJobs]=useState([]),[url,setUrl]=useState(""),[action,setAction]=useState("view"),[count,setCount]=useState(20),[loading,setLoading]=useState(false),[message,setMessage]=useState("");
 async function refresh(){const [a,j]=await Promise.all([fetch("/api/accounts").then(r=>r.json()),fetch("/api/jobs").then(r=>r.json())]);setAccounts(a.accounts||[]);setJobs(j.jobs||[])}
 useEffect(()=>{refresh()},[]);
 async function addAccount(){setLoading(true);const r=await fetch("/api/accounts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({platform:"instagram"})});const d=await r.json();setMessage("تم إنشاء حساب تجريبي فارغ فقط");setLoading(false);refresh()}
 async function createJob(){if(!url.trim())return;setLoading(true);const r=await fetch("/api/jobs",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({targetUrl:url,action,count:Number(count)})});const d=await r.json();setMessage(r.ok?"تم إنشاء Job في الـQueue":"حصل خطأ في إنشاء الـJob");setLoading(false);refresh()}
 return <main dir="rtl" style={{maxWidth:1100,margin:"30px auto",padding:20,fontFamily:"Arial,sans-serif"}}>
 <header style={{marginBottom:24}}><h1 style={{marginBottom:6}}>View Test Lab</h1><p style={{color:"#667085"}}>Control Center — Account Pool / Workers / Jobs / Logs</p></header>
 <section style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:24}}>
 {[[accounts.length,"Accounts"],[0,"Online Workers"],[jobs.length,"Jobs"],[jobs.filter(x=>x.status==="queued").length,"Queued"]].map(([n,l])=><div key={l} style={{background:"#fff",padding:20,borderRadius:14,boxShadow:"0 3px 16px #0000000d"}}><div style={{fontSize:28,fontWeight:700}}>{n}</div><div style={{color:"#667085"}}>{l}</div></div>)}
 </section>
 <section style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:18}}>
 <div style={{background:"#fff",padding:22,borderRadius:16}}><h2>Accounts</h2><button onClick={addAccount} disabled={loading} style={{padding:"10px 14px",border:0,borderRadius:9}}>+ Add Instagram Account</button><p style={{color:"#667085",fontSize:13}}>يتم إنشاء سجل تجريبي فقط. لا توجد بيانات دخول ولا اتصال فعلي.</p>{accounts.map(a=><div key={a.id} style={{padding:"12px 0",borderTop:"1px solid #eee"}}><b>Instagram</b> · {a.status}<br/><small>{a.id}</small></div>)}</div>
 <div style={{background:"#fff",padding:22,borderRadius:16}}><h2>New Job</h2><input value={url} onChange={e=>setUrl(e.target.value)} placeholder="Target URL" style={{width:"100%",boxSizing:"border-box",padding:12,marginBottom:10}}/><div style={{display:"flex",gap:8}}><select value={action} onChange={e=>setAction(e.target.value)} style={{padding:10}}><option value="view">View</option><option value="like">Like</option><option value="comment">Comment</option></select><input type="number" min="1" max="20" value={count} onChange={e=>setCount(Math.min(20,Math.max(1,Number(e.target.value)||1)))} style={{width:80,padding:10}}/></div><button onClick={createJob} disabled={loading||!url.trim()} style={{marginTop:12,padding:"10px 16px",border:0,borderRadius:9}}>Create Job</button>{message&&<p>{message}</p>}</div>
 </section>
 <section style={{background:"#fff",padding:22,borderRadius:16,marginTop:18}}><h2>Jobs / Queue</h2>{jobs.length===0?<p style={{color:"#667085"}}>No jobs yet.</p>:jobs.map(j=><div key={j.id} style={{padding:"13px 0",borderTop:"1px solid #eee"}}><b>{j.action}</b> × {j.count} · <span>{j.status}</span><br/><small>{j.targetUrl} · {new Date(j.createdAt).toLocaleString()}</small></div>)}</section>
 <section style={{background:"#fff4e5",padding:16,borderRadius:14,marginTop:18}}><b>Safety status:</b> Platform adapter is NO-OP. No Instagram views, likes, comments, follows, or other interactions are executed.</section>
 </main>
}