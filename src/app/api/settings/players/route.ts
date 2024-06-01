import Player from "@/models/PlayerModel";
import connect from "@/utils/db_connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const formData = await req.json();
    const { name, faculty, profile, role } = formData;
    const player = await Player.findOne({
      name,
    });
    if (player) {
      return NextResponse.json(
        {
          message: "Player already exists!",
        },
        { status: 400 }
      );
    }

    const createdUser = await Player.create({
      name,
      faculty,
      profile,
      role,
    });
    if(createdUser){
        return NextResponse.json({
            message: "Player added!"
        }, {status: 200})
    }else{
        throw Error("Unable to add!")
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}

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