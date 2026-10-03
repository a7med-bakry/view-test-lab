import {NextResponse} from "next/server";
import {getInstagramAccount,connectInstagramAccount,disconnectInstagramAccount} from "../../../lib/instagram-account";

export async function GET(){return NextResponse.json({account:getInstagramAccount()})}
export async function POST(req){
 const body=await req.json().catch(()=>({}));
 const username=String(body.username||"").trim();
 const accountId=String(body.accountId||"").trim();
 if(!username||!accountId)return NextResponse.json({error:"USERNAME_AND_ACCOUNT_ID_REQUIRED"},{status:400});
 return NextResponse.json({account:connectInstagramAccount({username,accountId})},{status:201});
}
export async function DELETE(){return NextResponse.json({account:disconnectInstagramAccount()})}
