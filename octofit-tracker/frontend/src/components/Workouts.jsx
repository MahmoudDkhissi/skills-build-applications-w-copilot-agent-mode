import ResourcePage from './ResourcePage';

const apiEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

export default function Workouts() {
  return (
    <ResourcePage
      endpoint={apiEndpoint}
      title="Workouts"
      description="Browse recommended routines and their difficulty levels."
      emptyMessage="No workouts are available yet."
      renderItem={(workout) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h2 className="h5 fw-semibold mb-1">{workout.name}</h2>
              <p className="text-white-50 mb-0">Focus: {workout.focus}</p>
            </div>
            <span className="badge text-bg-secondary text-uppercase">{workout.difficulty}</span>
          </div>
          <div className="resource-grid">
            <div className="resource-metric">
              <span>Duration</span>
              <strong>{workout.durationMinutes} min</strong>
            </div>
            <div className="resource-metric">
              <span>Recommended for</span>
              <strong>{Array.isArray(workout.recommendedFor) ? workout.recommendedFor.length : 0} users</strong>
            </div>
          </div>
        </>
      )}
    />
  );
}