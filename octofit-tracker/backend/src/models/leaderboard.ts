import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    displayName: { type: String, required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export type LeaderboardEntry = InferSchemaType<typeof leaderboardSchema>;

export const LeaderboardModel = model('Leaderboard', leaderboardSchema);