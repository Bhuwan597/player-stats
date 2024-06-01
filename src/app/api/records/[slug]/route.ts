import Record from "@/models/MatchRecordModel";
import { MatchRecord } from "@/types/Player";
import { NextRequest, NextResponse } from "next/server";

interface Params{
    slug: string
}

export async function GET(req: NextRequest, {params}: {params: Params}){
    try {
        const slug = params.slug;
        const record  = await Record.findOne({
            slug
        })
        if(!record){
            throw Error("No record found!")
        }
        const {batting, bowling} = record as MatchRecord;
        const battingStrikeRate = Math.floor((batting.runs || 0) / (batting.balls || 0));
        const bowlingEconomy = Math.floor((bowling.runs || 0) / (bowling.overs || 0));
        return NextResponse.json({
            record,
            strikeRate: battingStrikeRate,
            economy: bowlingEconomy,
        },{status: 200})
    } catch (error: any) {
        return NextResponse.json({
            message: error.message
        }, { status: 500 });
    }
}