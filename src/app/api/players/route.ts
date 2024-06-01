import Player from "@/models/PlayerModel";
import connect from "@/utils/db_connect";
import { NextRequest, NextResponse } from "next/server";


export async function GET(){
  try {
    await connect();
    const players = await Player.find().sort({createdAt: "descending"}).select("name faculty profile role slug");
    return NextResponse.json({
      players
    }, {status: 200})
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}