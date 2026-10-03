import {NextResponse} from "next/server";
import {getWorker,heartbeat} from "../../../lib/workers";
export async function GET(){return NextResponse.json({workers:[getWorker()]})}
export async function POST(){return NextResponse.json({worker:heartbeat(),message:"Single test worker is ready"})}
