import { useState } from 'react';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { MOCK_ARTICLES } from '../../data/mockData';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    pageTitle: '📚 ספריית מאמרים',
    articles: 'מאמרים',
    searchPlaceholder: '🔍 חפשי מאמרים...',
    openingArticle: 'פותחת מאמר:',
    readMinutes: 'דק\' קריאה',
    noArticlesFound: 'לא נמצאו מאמרים תואמים',
    catAll: 'כולם',
    catPregnancy: 'הריון',
    catNutrition: 'תזונה',
    catSleep: 'שינה',
    catMentalHealth: 'בריאות נפשית',
    catEquipment: 'ציוד',
    catHealth: 'בריאות',
  },
  en: {
    pageTitle: '📚 Article Library',
    articles: 'articles',
    searchPlaceholder: '🔍 Search articles...',
    openingArticle: 'Opening article:',
    readMinutes: 'min read',
    noArticlesFound: 'No matching articles found',
    catAll: 'All',
    catPregnancy: 'Pregnancy',
    catNutrition: 'Nutrition',
    catSleep: 'Sleep',
    catMentalHealth: 'Mental Health',
    catEquipment: 'Equipment',
    catHealth: 'Health',
  },
};

const CATEGORY_KEYS = ['catAll', 'catPregnancy', 'catNutrition', 'catSleep', 'catMentalHealth', 'catEquipment', 'catHealth'];
const CATEGORY_VALUES_HE = ['כולם', 'הריון', 'תזונה', 'שינה', 'בריאות נפשית', 'ציוד', 'בריאות'];

export default function LibraryPage() {
  const pt = usePageText(PAGE_TEXT);
  const { isRTL } = useLanguage();

  const [activeCategoryKey, setActiveCategoryKey] = useState('catAll');
  const [search, setSearch] = useState('');

  // Map the active category key back to the Hebrew data value for filtering
  const activeCategoryIdx = CATEGORY_KEYS.indexOf(activeCategoryKey);
  const activeCategoryDataValue = CATEGORY_VALUES_HE[activeCategoryIdx];

  const filtered = MOCK_ARTICLES.filter(a => {
    const matchesCat = activeCategoryKey === 'catAll' || a.category === activeCategoryDataValue;
    const matchesSearch = a.title.includes(search) || a.excerpt.includes(search);
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          {filtered.length} {pt('articles')}
        </span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          className="form-input"
          placeholder={pt('searchPlaceholder')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 360 }}
        />
      </div>

      {/* Category Filter */}
      <div className="tabs">
        {CATEGORY_KEYS.map(key => (
          <button
            key={key}
            className={`tab-btn${activeCategoryKey === key ? ' active' : ''}`}
            onClick={() => setActiveCategoryKey(key)}
          >
            {pt(key)}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid-2">
        {filtered.map(article => (
          <div
            key={article.id}
            className="card card-clickable"
            onClick={() => alert(`${pt('openingArticle')} "${article.title}"`)}
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
                ⏱️ {article.readMinutes} {pt('readMinutes')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>📭</div>
          <p>{pt('noArticlesFound')}</p>
        </div>
      )}
    </div>
  );
}
