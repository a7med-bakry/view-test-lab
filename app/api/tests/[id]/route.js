import {NextResponse} from "next/server";
import {getTest} from "../../../../lib/test-store";
export async function GET(req,{params}){const test=getTest(params.id);if(!test)return NextResponse.json({error:"TEST_NOT_FOUND"},{status:404});return NextResponse.json(test)}
