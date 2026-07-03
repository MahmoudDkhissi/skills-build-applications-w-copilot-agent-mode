import ResourcePage from './ResourcePage';

export default function Teams() {
  return (
    <ResourcePage
      endpoint="/api/teams/"
      title="Teams"
      description="Track squads, coaching staff, and current leaderboard points."
      emptyMessage="No teams are available yet."
      renderItem={(team) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h2 className="h5 fw-semibold mb-1">{team.name}</h2>
              <p className="text-white-50 mb-0">Coach: {team.coach}</p>
            </div>
            <span className="badge text-bg-success">{team.points} pts</span>
          </div>
          <div className="resource-metric mb-3">
            <span>Motto</span>
            <strong>{team.motto}</strong>
          </div>
          <div className="resource-metric">
            <span>Members</span>
            <strong>{Array.isArray(team.members) ? team.members.length : 0}</strong>
          </div>
        </>
      )}
    />
  );
}