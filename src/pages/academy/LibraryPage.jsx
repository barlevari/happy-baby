import { useState } from 'react';
import { MOCK_ARTICLES } from '../../data/mockData';

const CATEGORIES = ['כולם', 'הריון', 'תזונה', 'שינה', 'בריאות נפשית', 'ציוד', 'בריאות'];

export default function LibraryPage() {
  const [activeCategory, setActiveCategory] = useState('כולם');
  const [search, setSearch] = useState('');

  const filtered = MOCK_ARTICLES.filter(a => {
    const matchesCat = activeCategory === 'כולם' || a.category === activeCategory;
    const matchesSearch = a.title.includes(search) || a.excerpt.includes(search);
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>📚 ספריית מאמרים</h1>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          {filtered.length} מאמרים
        </span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          className="form-input"
          placeholder="🔍 חפשי מאמרים..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 360 }}
        />
      </div>

      {/* Category Filter */}
      <div className="tabs">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`tab-btn${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid-2">
        {filtered.map(article => (
          <div
            key={article.id}
            className="card card-clickable"
            onClick={() => alert(`פותחת מאמר: "${article.title}"`)}
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
              <div style={{
                width: 52,
                height: 52,
                borderRadius: 'var(--radius-md)',
                background: 'var(--color-sage-ultra)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                flexShrink: 0,
              }}>
                {article.emoji}
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, lineHeight: 1.4, color: 'var(--color-text)' }}>
                  {article.title}
                </h3>
              </div>
            </div>

            {/* Excerpt */}
            <p style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              margin: 0,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {article.excerpt}
            </p>

            {/* Footer */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge badge-sage">{article.category}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                ⏱️ {article.readMinutes} דק' קריאה
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
          <p>לא נמצאו מאמרים תואמים</p>
        </div>
      )}
    </div>
  );
}
