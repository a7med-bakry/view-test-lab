import {NextResponse} from "next/server";
import {listLogs} from "../../../lib/logs";
export async function GET(){return NextResponse.json({logs:listLogs()})}
