import cors from 'cors';
import express, { type Request, type Response } from 'express';
import { ActivityModel } from './models/activity';
import { LeaderboardModel } from './models/leaderboard';
import { TeamModel } from './models/team';
import { UserModel } from './models/user';
import { WorkoutModel } from './models/workout';

const app = express();

function createResourceRouter<T>(resourceName: string, model: { find: () => Promise<T[]> }) {
  const router = express.Router();

  router.get('/', async (_request: Request, response: Response) => {
    const items = await model.find();

    response.json({ resource: resourceName, count: items.length, items });
  });

  return router;
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API is running' });
});

app.use('/api/users', createResourceRouter('users', UserModel));
app.use('/api/teams', createResourceRouter('teams', TeamModel));
app.use('/api/activities', createResourceRouter('activities', ActivityModel));
app.use('/api/leaderboard', createResourceRouter('leaderboard', LeaderboardModel));
app.use('/api/workouts', createResourceRouter('workouts', WorkoutModel));

export default app;