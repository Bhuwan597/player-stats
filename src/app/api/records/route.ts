import Record from "@/models/MatchRecordModel";
import { MatchRecord } from "@/types/Player";
import connect from "@/utils/db_connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connect();
        
        const formData: MatchRecord = await req.json() as MatchRecord;
        const { player, matchName, matchDate, batting, bowling } = formData;

        const removeNullValues = (obj: any) => {
            return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== null));
        };

        const data: any = {
            player,
            matchName,
            matchDate,
            ...(batting && Object.keys(removeNullValues(batting)).length > 0 && { batting: removeNullValues(batting) }),
            ...(bowling && Object.keys(removeNullValues(bowling)).length > 0 && { bowling: removeNullValues(bowling) })
        };

        const createdRecord = await Record.create(data);

        if (createdRecord) {
            return NextResponse.json({
                message: "Record Created!"
            }, { status: 201 });
        }

        throw new Error("Unable to create match record!");
        
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}


export async function GET(req: NextRequest){
    try {

    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}