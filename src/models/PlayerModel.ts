import { Faculty, PlayerRole } from "@/types/Player";
import mongoose, { Schema } from "mongoose";
import slug from "mongoose-slug-updater";

mongoose.plugin(slug);

const PlayerSchema = new Schema(
  {
    name: { type: String, required: true },
    faculty: { type: String, enum: Object.values(Faculty), required: true },
    role: { type: String, enum: Object.values(PlayerRole), required: true },
    slug: { type: String, slug: ["name", "faculty"] },
  },
  { timestamps: true }
);

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

export default Player;
