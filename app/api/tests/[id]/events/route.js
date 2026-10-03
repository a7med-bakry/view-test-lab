import {NextResponse} from "next/server";
import {addEvent,getTest} from "../../../../../lib/test-store";
export async function POST(req,{params}){const test=getTest(params.id);if(!test)return NextResponse.json({error:"TEST_NOT_FOUND"},{status:404});const result=addEvent(params.id);if(!result.ok)return NextResponse.json({error:result.error},{status:409});return NextResponse.json(result)}
