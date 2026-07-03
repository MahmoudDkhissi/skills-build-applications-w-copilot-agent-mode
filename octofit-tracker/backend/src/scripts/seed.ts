import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity';
import { LeaderboardModel } from '../models/leaderboard';
import { TeamModel } from '../models/team';
import { UserModel } from '../models/user';
import { WorkoutModel } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.deleteMany({}),
      TeamModel.deleteMany({}),
      ActivityModel.deleteMany({}),
      LeaderboardModel.deleteMany({}),
      WorkoutModel.deleteMany({}),
    ]);

    const users = await UserModel.insertMany([
      { firstName: 'Ava', lastName: 'Martinez', email: 'ava.martinez@octofit.dev', role: 'captain', teamName: 'Titan Training' },
      { firstName: 'Noah', lastName: 'Kim', email: 'noah.kim@octofit.dev', role: 'member', teamName: 'Titan Training' },
      { firstName: 'Mia', lastName: 'Patel', email: 'mia.patel@octofit.dev', role: 'coach', teamName: 'Pulse Prime' },
      { firstName: 'Liam', lastName: 'Johnson', email: 'liam.johnson@octofit.dev', role: 'member', teamName: 'Pulse Prime' },
    ]);

    const [ava, noah, mia, liam] = users;

    const teams = await TeamModel.insertMany([
      {
        name: 'Titan Training',
        coach: 'Jordan Reyes',
        members: [ava._id, noah._id],
        motto: 'Strong together, faster every week.',
        points: 186,
      },
      {
        name: 'Pulse Prime',
        coach: 'Mia Patel',
        members: [mia._id, liam._id],
        motto: 'Precision, persistence, progress.',
        points: 214,
      },
    ]);

    await ActivityModel.insertMany([
      {
        userId: ava._id,
        type: 'strength training',
        durationMinutes: 55,
        caloriesBurned: 420,
        activityDate: new Date('2026-06-30T07:30:00.000Z'),
      },
      {
        userId: noah._id,
        type: 'interval run',
        durationMinutes: 40,
        caloriesBurned: 365,
        activityDate: new Date('2026-07-01T06:45:00.000Z'),
      },
      {
        userId: mia._id,
        type: 'mobility flow',
        durationMinutes: 30,
        caloriesBurned: 180,
        activityDate: new Date('2026-07-02T18:15:00.000Z'),
      },
      {
        userId: liam._id,
        type: 'rowing intervals',
        durationMinutes: 50,
        caloriesBurned: 470,
        activityDate: new Date('2026-07-02T08:10:00.000Z'),
      },
    ]);

    await LeaderboardModel.insertMany([
      { userId: ava._id, displayName: 'Ava Martinez', score: 920, rank: 2 },
      { userId: noah._id, displayName: 'Noah Kim', score: 880, rank: 3 },
      { userId: mia._id, displayName: 'Mia Patel', score: 980, rank: 1 },
      { userId: liam._id, displayName: 'Liam Johnson', score: 845, rank: 4 },
    ]);

    await WorkoutModel.insertMany([
      {
        name: 'Power Circuit',
        focus: 'full body strength',
        durationMinutes: 45,
        difficulty: 'advanced',
        recommendedFor: [ava._id, liam._id],
      },
      {
        name: 'Cardio Engine',
        focus: 'endurance',
        durationMinutes: 35,
        difficulty: 'intermediate',
        recommendedFor: [noah._id],
      },
      {
        name: 'Recovery Reset',
        focus: 'mobility and recovery',
        durationMinutes: 25,
        difficulty: 'beginner',
        recommendedFor: [mia._id],
      },
    ]);

    console.log('Database seeding complete');
    console.log(`Seeded users: ${users.length}, teams: ${teams.length}, activities: 4, leaderboard entries: 4, workouts: 3`);
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
