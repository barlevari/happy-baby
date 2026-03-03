import { useState } from 'react';
import { MOCK_VIDEOS } from '../../data/mockData';

const CATEGORIES = ['כולם', 'שינה', 'האכלה', 'התפתחות', 'כללי', 'לידה'];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('כולם');
  const [hoveredId, setHoveredId] = useState(null);

  const filtered = activeCategory === 'כולם'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter(v => v.category === activeCategory);

  const handlePlay = (video) => {
    alert(`הסרטון "${video.title}" יפתח בקרוב`);
  };

  return (
    <div style={{ direction: 'rtl' }}>
      <div className="page-header">
        <h1>🎥 ספריית סרטונים</h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {filtered.length} סרטונים
        </span>
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

      {/* Video Grid */}
      <div className="grid-3">
        {filtered.map(video => (
          <div
            key={video.id}
            className="card card-clickable"
            style={{ padding: 0, overflow: 'hidden' }}
            onClick={() => handlePlay(video)}
            onMouseEnter={() => setHoveredId(video.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Thumbnail */}
            <div style={{
              height: 160,
              background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-cream))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              fontSize: '4rem',
              transition: 'all 0.2s',
            }}>
              {video.thumbnail}
              {/* Play Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(45, 58, 53, 0.55)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: hoveredId === video.id ? 1 : 0,
                transition: 'opacity 0.2s',
              }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.95)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  boxShadow: 'var(--shadow-lg)',
                }}>
                  ▶
                </div>
              </div>

              {/* Duration Badge */}
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                background: 'rgba(0,0,0,0.75)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 700,
                direction: 'ltr',
              }}>
                {video.durationMinutes}:00
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.4, color: 'var(--color-text)', flex: 1 }}>
                  {video.title}
                </h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-sage">{video.category}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  👁️ {video.views.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎬</div>
          <p>לא נמצאו סרטונים בקטגוריה זו</p>
        </div>
      )}
    </div>
  );
}
