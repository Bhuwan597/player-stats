export enum Faculty{
  BEI = "bei",
  BCT = "bct",
  BAM = "bam",
  BCE= "bce",
  BEL = "bel",
  BME = "bme",
}

export enum PlayerRole {
  BATSMAN = "batsman",
  BOWLER = "bowler",
  ALL_ROUNDER = "all_rounder",
}
export interface Player {
  _id: string,
  name: string;
  role: PlayerRole;
  faculty: Faculty;
  slug: string;
}

export interface BattingRecord {
  balls: number | null,
  runs: number | null,
  status: string | null,
}

export interface BowlingRecord{
  overs: number | null,
  runs: number | null,
  wickets: number | null,
}

export interface MatchRecord{
  matchName: string,
  matchDate: string,
  player: string,
  batting: BattingRecord,
  bowling: BowlingRecord,
}