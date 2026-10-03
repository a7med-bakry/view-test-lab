import {NextResponse} from "next/server";
import {getJob,updateJob} from "../../../../../lib/jobs";
import {getWorker,updateWorker,heartbeat} from "../../../../../lib/workers";
import {addLog} from "../../../../../lib/logs";
import {platformAdapter} from "../../../../../lib/platform-adapter";

export async function POST(req,{params}){
 const job=getJob(params.id);
 if(!job)return NextResponse.json({error:"JOB_NOT_FOUND"},{status:404});
 if(job.status!=="queued")return NextResponse.json({error:"JOB_NOT_QUEUED"},{status:409});
 let worker=heartbeat();
 if(worker.status!=="idle")return NextResponse.json({error:"WORKER_BUSY"},{status:409});
 worker=updateWorker(worker.id,{status:"running",currentJobId:job.id});
 updateJob(job.id,{status:"running",startedAt:new Date().toISOString()});
 addLog({level:"info",type:"job_started",jobId:job.id,workerId:worker.id,message:"Single test worker started synthetic lab job"});
 try{
  const result=await platformAdapter.execute({job});
  const finalJob=updateJob(job.id,{status:"completed",completedAt:new Date().toISOString(),result});
  updateWorker(worker.id,{status:"idle",currentJobId:null,completedJobs:worker.completedJobs+1,lastHeartbeat:new Date().toISOString()});
  addLog({level:"info",type:"job_completed",jobId:job.id,workerId:worker.id,message:"Job completed in NO-OP adapter"});
  return NextResponse.json({job:finalJob,workerId:worker.id,result});
 }catch(error){
  updateJob(job.id,{status:"failed",completedAt:new Date().toISOString(),result:{status:"error",message:"Synthetic worker execution failed"}});
  updateWorker(worker.id,{status:"idle",currentJobId:null,lastHeartbeat:new Date().toISOString()});
  addLog({level:"error",type:"job_failed",jobId:job.id,workerId:worker.id,message:"Synthetic lab job failed"});
  return NextResponse.json({error:"JOB_FAILED"},{status:500});
 }
}
