import ResourcePage from './ResourcePage';

export default function Users() {
  return (
    <ResourcePage
      endpoint="/api/users/"
      title="Users"
      description="Review athlete profiles, team assignments, and roles from the API."
      emptyMessage="No users are available yet."
      renderItem={(user) => (
        <>
          <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
            <div>
              <h2 className="h5 fw-semibold mb-1">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-white-50 mb-0">{user.email}</p>
            </div>
            <span className="badge text-bg-info text-uppercase">{user.role}</span>
          </div>
          <div className="resource-metric">
            <span>Team</span>
            <strong>{user.teamName}</strong>
          </div>
        </>
      )}
    />
  );
}