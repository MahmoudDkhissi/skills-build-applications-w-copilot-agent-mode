import ResourcePage from './ResourcePage';

function formatDate(value) {
  if (!value) {
    return 'Unavailable';
  }

  const date = new Date(value);

  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
}

export default function Activities() {
  return (
    <ResourcePage
      endpoint="/api/activities/"
      title="Activities"
      description="Inspect training sessions, duration, calories, and activity timing."
      emptyMessage="No activities are available yet."
      renderItem={(activity) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h2 className="h5 fw-semibold mb-1">{activity.type}</h2>
              <p className="text-white-50 mb-0">Logged on {formatDate(activity.activityDate)}</p>
            </div>
            <span className="badge text-bg-warning">{activity.caloriesBurned} cal</span>
          </div>
          <div className="resource-grid">
            <div className="resource-metric">
              <span>Duration</span>
              <strong>{activity.durationMinutes} min</strong>
            </div>
            <div className="resource-metric">
              <span>User</span>
              <strong>{activity.userId}</strong>
            </div>
          </div>
        </>
      )}
    />
  );
}