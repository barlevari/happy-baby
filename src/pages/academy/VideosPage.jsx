import { useState } from 'react';
import { MOCK_VIDEOS } from '../../data/mockData';
import VideoPlayerModal from '../../components/VideoPlayerModal';

const ALL_CATEGORIES = ['כולם', ...new Set(MOCK_VIDEOS.map(v => v.category))];

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState('כולם');
  const [playingVideo, setPlayingVideo] = useState(null);

  const filtered = activeCategory === 'כולם'
    ? MOCK_VIDEOS
    : MOCK_VIDEOS.filter(v => v.category === activeCategory);

  const getWeeksLabel = (v) => {
    if (v.weeksMin === null) return 'כל השבועות';
    return `שבועות ${v.weeksMin}–${v.weeksMax}`;
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
      <div className="tabs" style={{ overflowX: 'auto' }}>
        {ALL_CATEGORIES.map(cat => (
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
            onClick={() => setPlayingVideo(video)}
          >
            {/* Thumbnail */}
            <div style={{
              height: 160,
              background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-cream))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              <div style={{ fontSize: '3rem' }}>🎬</div>

              {/* Play Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(45, 58, 53, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
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

              {/* Week badge */}
              <div style={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                background: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '2px 8px',
                borderRadius: 6,
                fontSize: '0.72rem',
                fontWeight: 700,
              }}>
                {getWeeksLabel(video)}
              </div>

              {/* Number badge */}
              <div style={{
                position: 'absolute',
                top: 8,
                right: 8,
                background: 'var(--color-sage)',
                color: 'white',
                width: 28,
                height: 28,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                fontWeight: 800,
              }}>
                {video.id}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '14px 16px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, lineHeight: 1.4, color: 'var(--color-text)', marginBottom: 8 }}>
                {video.title}
              </h3>
              <span className="badge badge-sage">{video.category}</span>
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

      {playingVideo && (
        <VideoPlayerModal
          video={playingVideo}
          onClose={() => setPlayingVideo(null)}
          getWeeksLabel={getWeeksLabel}
        />
      )}
    </div>
  );
}
