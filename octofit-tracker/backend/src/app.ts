import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api', (_request, response) => {
  response.json({ message: 'OctoFit Tracker API is running' });
});

export default app;