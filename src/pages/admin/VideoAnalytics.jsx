import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { MOCK_VIDEOS } from '../../data/mockData';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    // Date range filters
    range7Days: '7 ימים אחרונים',
    range30Days: '30 ימים אחרונים',
    rangeAllTime: 'כל הזמן',
    // Page header
    pageTitle: '📈 אנליטיקס סרטונים',
    // Summary cards
    totalViews: 'סה"כ צפיות',
    avgWatchTime: 'זמן צפייה ממוצע',
    completionRate: 'שיעור השלמה',
    minutesShort: "דק'",
    // Chart
    topVideosTitle: '🎬 10 הסרטונים הנצפים ביותר',
    views: 'צפיות',
    // Table
    tableTitle: 'פירוט לפי סרטון',
    thVideo: 'סרטון',
    thCategory: 'קטגוריה',
    thViews: 'צפיות',
    thAvgWatchTime: 'זמן צפייה ממוצע',
    thCompletionRate: 'אחוז השלמה',
  },
  en: {
    // Date range filters
    range7Days: 'Last 7 days',
    range30Days: 'Last 30 days',
    rangeAllTime: 'All time',
    // Page header
    pageTitle: '📈 Video Analytics',
    // Summary cards
    totalViews: 'Total Views',
    avgWatchTime: 'Avg. Watch Time',
    completionRate: 'Completion Rate',
    minutesShort: 'min',
    // Chart
    topVideosTitle: '🎬 Top 10 Most Viewed Videos',
    views: 'Views',
    // Table
    tableTitle: 'Breakdown by Video',
    thVideo: 'Video',
    thCategory: 'Category',
    thViews: 'Views',
    thAvgWatchTime: 'Avg. Watch Time',
    thCompletionRate: 'Completion Rate',
  },
};

const ANALYTICS_DATA = MOCK_VIDEOS.map(v => ({
  ...v,
  avgWatchMinutes: Math.floor(v.durationMinutes * (0.5 + Math.random() * 0.4)),
  completionRate: Math.floor(50 + Math.random() * 45),
}));

const DATE_RANGE_IDS = [
  { id: '7', labelKey: 'range7Days', multiplier: 0.25 },
  { id: '30', labelKey: 'range30Days', multiplier: 0.7 },
  { id: 'all', labelKey: 'rangeAllTime', multiplier: 1 },
];

export default function VideoAnalytics() {
  const [range, setRange] = useState('all');
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();

  const rangeConfig = DATE_RANGE_IDS.find(r => r.id === range);

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
    { label: pt('totalViews'), value: totalViews.toLocaleString(), icon: '👁️', bg: 'var(--color-sage-ultra)', color: 'var(--color-sage-dark)' },
    { label: pt('avgWatchTime'), value: `${avgWatch} ${pt('minutesShort')}`, icon: '⏱️', bg: '#FEF3E7', color: 'var(--color-warning)' },
    { label: pt('completionRate'), value: `${avgCompletion}%`, icon: '✅', bg: 'var(--color-admin-light)', color: 'var(--color-admin)' },
  ];

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>

        {/* Date Range Filter */}
        <div style={{ display: 'flex', gap: 8 }}>
          {DATE_RANGE_IDS.map(r => (
            <button
              key={r.id}
              className={`btn btn-sm ${range === r.id ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setRange(r.id)}
            >
              {pt(r.labelKey)}
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
          {pt('topVideosTitle')}
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
            <Tooltip formatter={v => [`${v} ${pt('views')}`, pt('views')]} />
            <Bar dataKey="views" fill="var(--color-sage)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card">
        <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 800, marginBottom: 16 }}>{pt('tableTitle')}</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>{pt('thVideo')}</th>
                <th>{pt('thCategory')}</th>
                <th>{pt('thViews')}</th>
                <th>{pt('thAvgWatchTime')}</th>
                <th>{pt('thCompletionRate')}</th>
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
                  <td style={{ color: 'var(--color-text-muted)' }}>{v.avgWatchMinutes} {pt('minutesShort')}</td>
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
