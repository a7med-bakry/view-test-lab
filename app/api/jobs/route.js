import {NextResponse} from "next/server";
import {createJob,listJobs} from "../../../lib/jobs";
export async function GET(){return NextResponse.json({jobs:listJobs()})}
export async function POST(req){const b=await req.json().catch(()=>({}));const count=Math.min(20,Math.max(1,Number(b.count)||1));if(!b.targetUrl)return NextResponse.json({error:"TARGET_REQUIRED"},{status:400});if(!["view","like","comment"].includes(b.action))return NextResponse.json({error:"INVALID_ACTION"},{status:400});return NextResponse.json({job:createJob({targetUrl:b.targetUrl,action:b.action,count})},{status:201})}
