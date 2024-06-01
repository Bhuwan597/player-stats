import mongoose from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug)

enum BattingStatus {
    OUT = "out",
    NOT_OUT = "not_out",
  }

const MatchRecordSchema = new mongoose.Schema(
  {
    matchName: {type: String, required: true},
    matchDate: {type: String, required: true},
    player: {type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true},
    bowling: {
        overs: { type: Number },
        runs: { type: Number },
        wickets: { type: Number },
    },
    batting: {
        balls: { type: Number },
        runs: { type: Number },
        status: { type: String, enum: BattingStatus },
    },
    slug: { type: String, slug: ["matchName", "matchDate"] },
  },
  { timestamps: true }
);

const Record =
  mongoose.models.Record || mongoose.model("Record", MatchRecordSchema);

export default Record;
