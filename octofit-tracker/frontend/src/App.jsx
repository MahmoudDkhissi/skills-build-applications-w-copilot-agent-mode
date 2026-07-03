import { Link, NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  return (
    <section className="home-hero card-glass p-4 p-md-5 rounded-4">
      <div className="row align-items-center g-4">
        <div className="col-lg-8">
          <p className="section-kicker mb-2">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold mb-3">Train, track, and compete with purpose.</h1>
          <p className="lead text-white-75 mb-4">
            A React 19 presentation tier that talks to the Node.js API with a Codespaces-safe base URL and flexible response handling.
          </p>
          <div className="alert alert-warning border-0 mb-4">
            Define <strong>VITE_CODESPACE_NAME</strong> in <code>.env.local</code> for Codespaces routing. If it is unset, the app falls back to localhost.
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Link className="btn btn-light" to="/users">
              View users
            </Link>
            <Link className="btn btn-outline-light" to="/activities">
              View activities
            </Link>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="resource-panel p-4">
            <h2 className="h5 fw-semibold mb-3">API routes</h2>
            <ul className="list-unstyled mb-0 d-grid gap-2">
              <li>/api/users/</li>
              <li>/api/teams/</li>
              <li>/api/activities/</li>
              <li>/api/leaderboard/</li>
              <li>/api/workouts/</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Navigation() {
  const navItems = [
    { to: '/users', label: 'Users' },
    { to: '/teams', label: 'Teams' },
    { to: '/activities', label: 'Activities' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ];

  return (
    <header className="app-header mb-4">
      <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-center gap-3">
        <Link className="brand-lockup d-inline-flex align-items-center gap-3" to="/">
          <span className="brand-mark">O</span>
          <span>
            <span className="brand-name d-block">OctoFit Tracker</span>
            <span className="brand-caption d-block">Presentation tier</span>
          </span>
        </Link>
        <nav className="nav nav-pills flex-wrap gap-2">
          {navItems.map((item) => (
            <NavLink key={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="app-shell container py-4 py-lg-5">
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}