import { Link, Navigate, Route, Routes } from 'react-router-dom';

function Shell({ title, description }: { title: string; description: string }) {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="app-hero p-4 p-md-5 rounded-4 shadow-lg">
            <p className="text-uppercase text-info fw-semibold mb-2">OctoFit Tracker</p>
            <h1 className="display-5 fw-bold mb-3">{title}</h1>
            <p className="lead mb-4">{description}</p>
            <div className="d-flex flex-wrap gap-2">
              <Link className="btn btn-light" to="/dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-outline-light" to="/teams">
                Teams
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  return (
    <Shell
      title="Train, track, and compete with purpose."
      description="A modern React 19 + Vite frontend for activity tracking, team play, and leaderboards."
    />
  );
}

function Dashboard() {
  return (
    <Shell
      title="Your training dashboard"
      description="Surface workouts, activity summaries, and personalized suggestions in one place."
    />
  );
}

function Teams() {
  return (
    <Shell
      title="Team management"
      description="Create teams, invite members, and keep the competition moving."
    />
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teams" element={<Teams />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}