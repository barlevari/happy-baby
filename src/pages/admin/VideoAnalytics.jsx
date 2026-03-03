import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MOCK_VIDEOS } from '../../data/mockData';

const ANALYTICS_DATA = MOCK_VIDEOS.map(v => ({
  ...v,
  avgWatchMinutes: Math.floor(v.durationMinutes * (0.5 + Math.random() * 0.4)),
  completionRate: Math.floor(50 + Math.random() * 45),
}));

const DATE_RANGES = [
  { id: '7', label: '7 ימים אחרונים', multiplier: 0.25 },
  { id: '30', label: '30 ימים אחרונים', multiplier: 0.7 },
  { id: 'all', label: 'כל הזמן', multiplier: 1 },
];

export default function VideoAnalytics() {
  const [range, setRange] = useState('all');

  const rangeConfig = DATE_RANGES.find(r => r.id === range);

  const data = useMemo(() => {
    return ANALYTICS_DATA.map(v => ({
      ...v,
      views: Math.round(v.views * rangeConfig.multiplier),
      avgWatchMinutes: v.avgWatchMinutes,
    })).sort((a, b) => b.views - a.views);
  }, [range, rangeConfig]);

  const top10 = data.slice(0, 10);

  const totalViews = data.reduce((s, v) => s + v.views, 0);
  const avgWatch = Math.round(data.reduce((s, v) => s + v.avgWatchMinutes, 0) / data.length);
  const avgCompletion = Math.round(data.reduce((s, v) => s + v.completionRate, 0) / data.length);

  const summaryCards = [
    { label: 'סה"כ צפיות', value: totalViews.toLocaleString(), icon: '👁️', bg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
    { label: 'זמן צפייה ממוצע', value: `${avgWatch} דק'`, icon: '⏱️', bg: '#FEF3E7', color: 'var(--color-warning)' },
    { label: 'שיעור השלמה', value: `${avgCompletion}%`, icon: '✅', bg: 'var(--color-admin-light)', color: 'var(--color-admin)' },
  ];

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>📈 אנליטיקס סרטונים</h1>

        {/* Date Range Filter */}
        <div style={{ display: 'flex', gap: 8 }}>
          {DATE_RANGES.map(r => (
            <button
              key={r.id}
              className={`btn btn-sm ${range === r.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRange(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid-3" style={{ marginBottom: 28 }}>
        {summaryCards.map((c, i) => (
          <div className="stat-card" key={i}>
            <div className="stat-icon" style={{ background: c.bg, fontSize: '1.4rem' }}>{c.icon}</div>
            <div className="stat-value" style={{ color: c.color }}>{c.value}</div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="card" style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>
          🎬 10 הסרטונים הנצפים ביותר
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={top10} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis type="number" tick={{ fontSize: 11 }} />
            <YAxis
              dataKey="title"
              type="category"
              width={160}
              tick={{ fontSize: 11 }}
            />
            <Tooltip formatter={v => [`${v} צפיות`, 'צפיות']} />
            <Bar dataKey="views" fill="var(--color-sage)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card">
        <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>פירוט לפי סרטון</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>סרטון</th>
                <th>קטגוריה</th>
                <th>צפיות</th>
                <th>זמן צפייה ממוצע</th>
                <th>אחוז השלמה</th>
              </tr>
            </thead>
            <tbody>
              {data.map(v => (
                <tr key={v.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: '1.3rem' }}>{v.thumbnail}</span>
                      <span style={{ fontWeight: 600 }}>{v.title}</span>
                    </div>
                  </td>
                  <td><span className="badge badge-sage">{v.category}</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--color-sage-dark)' }}>
                    {v.views.toLocaleString()}
                  </td>
                  <td style={{ color: 'var(--color-text-muted)' }}>{v.avgWatchMinutes} דק'</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{
                        flex: 1, height: 6, background: 'var(--color-border)', borderRadius: 'var(--radius-full)', overflow: 'hidden',
                        maxWidth: 80,
                      }}>
                        <div style={{
                          height: '100%',
                          width: `${v.completionRate}%`,
                          background: v.completionRate >= 75 ? 'var(--color-sage)' : v.completionRate >= 50 ? 'var(--color-warning)' : 'var(--color-danger)',
                          borderRadius: 'var(--radius-full)',
                        }} />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-muted)', minWidth: 36 }}>
                        {v.completionRate}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
