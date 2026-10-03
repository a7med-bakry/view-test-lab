import {NextResponse} from "next/server";
import {addAccount,listAccounts} from "../../../lib/accounts";
export async function GET(){return NextResponse.json({accounts:listAccounts()})}
export async function POST(req){const body=await req.json().catch(()=>({}));const platform=body.platform==="instagram"?"instagram":"instagram";return NextResponse.json({account:addAccount(platform)},{status:201})}
