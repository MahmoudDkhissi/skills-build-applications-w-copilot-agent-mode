import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    motto: { type: String, required: true },
    points: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export type Team = InferSchemaType<typeof teamSchema>;

export const TeamModel = model('Team', teamSchema);