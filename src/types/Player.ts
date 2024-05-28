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
  name: string;
  role: PlayerRole;
  faculty: Faculty;
  slug: string;
  profile: string;
}
