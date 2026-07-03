import { useEffect, useState } from 'react';
import { fetchCollection } from '../api';

function formatValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : 'None';
  }

  if (value === null || value === undefined || value === '') {
    return 'Unavailable';
  }

  if (value instanceof Date) {
    return value.toLocaleDateString();
  }

  if (typeof value === 'object') {
    return JSON.stringify(value);
  }

  return String(value);
}

function defaultFields(item) {
  return Object.entries(item)
    .filter(([key]) => key !== '_id' && key !== '__v' && key !== 'createdAt' && key !== 'updatedAt')
    .slice(0, 4);
}

export default function ResourcePage({ endpoint, title, description, emptyMessage, renderItem, renderSummary }) {
  const [state, setState] = useState({ items: [], total: 0, loading: true, error: '' });

  useEffect(() => {
    let active = true;

    async function loadResource() {
      try {
        const result = await fetchCollection(endpoint);

        if (active) {
          setState({
            items: result.items,
            total: result.total,
            loading: false,
            error: '',
          });
        }
      } catch (error) {
        if (active) {
          setState({
            items: [],
            total: 0,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load data',
          });
        }
      }
    }

    setState((current) => ({ ...current, loading: true, error: '' }));
    loadResource();

    return () => {
      active = false;
    };
  }, [endpoint]);

  const summary = renderSummary ? renderSummary(state) : null;

  return (
    <section className="resource-page">
      <div className="d-flex flex-column gap-3 mb-4">
        <div>
          <p className="section-kicker mb-2">OctoFit Tracker</p>
          <h1 className="display-6 fw-bold mb-2">{title}</h1>
          <p className="lead text-white-50 mb-0">{description}</p>
        </div>
        {summary}
      </div>

      {state.loading ? (
        <div className="resource-status card-glass p-4">Loading data from {endpoint}...</div>
      ) : state.error ? (
        <div className="resource-status resource-status-error p-4">{state.error}</div>
      ) : state.items.length === 0 ? (
        <div className="resource-status card-glass p-4">{emptyMessage}</div>
      ) : (
        <div className="row g-3">
          {state.items.map((item, index) => {
            const card = renderItem ? renderItem(item, index) : null;
            const fallbackFields = defaultFields(item);

            return (
              <div className="col-12 col-lg-6" key={item._id ?? item.id ?? index}>
                <article className="resource-card card-glass h-100 p-4">
                  {card ? (
                    card
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                        <div>
                          <h2 className="h5 fw-semibold mb-1">{item.name ?? item.title ?? item.displayName ?? item.email ?? `Item ${index + 1}`}</h2>
                          <p className="text-white-50 mb-0">{item.role ?? item.type ?? item.focus ?? item.motto ?? 'Collection item'}</p>
                        </div>
                        <span className="badge text-bg-info">{item._id ? `#${String(item._id).slice(-6)}` : 'record'}</span>
                      </div>

                      <dl className="resource-facts mb-0">
                        {fallbackFields.map(([key, value]) => (
                          <div key={key}>
                            <dt>{key}</dt>
                            <dd>{formatValue(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}