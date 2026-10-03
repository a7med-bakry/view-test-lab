import {NextResponse} from "next/server";
import {createWorker,listWorkers} from "../../../lib/workers";
export async function GET(){return NextResponse.json({workers:listWorkers()})}
export async function POST(){return NextResponse.json({worker:createWorker("instagram")},{status:201})}
