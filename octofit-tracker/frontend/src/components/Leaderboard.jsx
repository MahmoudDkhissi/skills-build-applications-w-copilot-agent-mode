import ResourcePage from './ResourcePage';

export default function Leaderboard() {
  return (
    <ResourcePage
      endpoint="/api/leaderboard/"
      title="Leaderboard"
      description="See the current ranking table and score totals."
      emptyMessage="No leaderboard entries are available yet."
      renderItem={(entry) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h2 className="h5 fw-semibold mb-1">{entry.displayName}</h2>
              <p className="text-white-50 mb-0">Rank #{entry.rank}</p>
            </div>
            <span className="badge text-bg-primary">{entry.score} pts</span>
          </div>
          <div className="resource-metric">
            <span>User ID</span>
            <strong>{entry.userId}</strong>
          </div>
        </>
      )}
    />
  );
}