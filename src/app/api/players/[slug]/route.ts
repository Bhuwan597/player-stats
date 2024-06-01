import Record from "@/models/MatchRecordModel";
import Player from "@/models/PlayerModel";
import { MatchRecord } from "@/types/Player";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  slug: string;
}
export async function GET(req: NextRequest, { params }: { params: Params }) {
  try {
    const slug = params.slug;
    const player = await Player.findOne({
      slug,
    });
    if (!player) {
      throw Error("Player not found!");
    }
    const allRecords: MatchRecord[] = await Record.find({
      player: player._id,
    });

    const battingDetails = allRecords.map((record: MatchRecord) => {
      const runsScored = record.batting.runs;
      const statusOfBatting = record.batting.status;
      const ballsFaced = record.batting.balls;
      return {
        runsScored,
        ballsFaced,
        statusOfBatting,
      };
    });
    const bowlingDetails = allRecords.map((record: MatchRecord) => {
      const oversBowled = record.bowling.overs;
      const runsConceded = record.bowling.runs;
      const wicketsTaken = record.bowling.wickets;
      return {
        runsConceded,
        wicketsTaken,
        oversBowled,
      };
    });
    const totalRunsScored = battingDetails.reduce(
      (total, { runsScored }) => {
        return total + (runsScored || 0);
      },
      0
    );

    const totalDismissals = battingDetails.filter(
      ({ statusOfBatting }) => statusOfBatting === "out"
    ).length;

    const totalBallsFaced = battingDetails.reduce(
      (total, { ballsFaced }) => {
        return total + (ballsFaced || 0);
      },
      0
    );

    const battingAverage =
      totalDismissals > 0 ? totalRunsScored / totalDismissals : totalRunsScored;

    const battingStrikeRate = Math.floor(
      (totalRunsScored / totalBallsFaced) * 100
    ) || 0;

    const totalRunsConceded = bowlingDetails.reduce(
      (total, { runsConceded }) => total + (runsConceded || 0),
      0
    );
    const totalWicketsTaken = bowlingDetails.reduce(
      (total, { wicketsTaken }) => total + (wicketsTaken || 0),
      0
    );
    const totalOversBowled = bowlingDetails.reduce(
      (total, { oversBowled }) => total + (oversBowled || 0),
      0
    );

    const bowlingAverage =
      totalWicketsTaken > 0 ? totalRunsConceded / totalWicketsTaken : 0;
    const bowlingEconomy =
      Math.floor(totalRunsConceded / totalOversBowled) || 0;

    return NextResponse.json(
      {
        ...player.toObject(),
        runs: totalRunsScored,
        wickets: totalWicketsTaken,
        strikeRate: battingStrikeRate,
        battingAverage,
        economy: bowlingEconomy,
        bowlingAverage,
        records: allRecords,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}