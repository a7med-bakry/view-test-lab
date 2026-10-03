import {NextResponse} from "next/server";
import {getJob,updateJob} from "../../../../../lib/jobs";
import {listWorkers,createWorker,updateWorker} from "../../../../../lib/workers";
import {addLog} from "../../../../../lib/logs";
import {platformAdapter} from "../../../../../lib/platform-adapter";

export async function POST(req,{params}){
 const job=getJob(params.id);
 if(!job)return NextResponse.json({error:"JOB_NOT_FOUND"},{status:404});
 if(job.status!=="queued")return NextResponse.json({error:"JOB_NOT_QUEUED"},{status:409});
 let worker=listWorkers().find(w=>w.status==="idle");
 if(!worker)worker=createWorker("instagram");
 worker=updateWorker(worker.id,{status:"running",currentJobId:job.id});
 const started=new Date().toISOString();
 updateJob(job.id,{status:"running",startedAt:started});
 addLog({level:"info",type:"job_started",jobId:job.id,workerId:worker.id,message:"Synthetic lab job started"});
 const result=await platformAdapter.execute({job});
 const completed=new Date().toISOString();
 const finalJob=updateJob(job.id,{status:"completed",completedAt:completed,result});
 updateWorker(worker.id,{status:"idle",currentJobId:null});
 addLog({level:"info",type:"job_completed",jobId:job.id,workerId:worker.id,message:"Job completed in NO-OP adapter"});
 return NextResponse.json({job:finalJob,workerId:worker.id,result});
}
