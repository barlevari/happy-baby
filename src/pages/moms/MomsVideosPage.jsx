import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage, usePageText } from '../../context/LanguageContext';
import { MOCK_VIDEOS } from '../../data/mockData';
import VideoPlayerModal from '../../components/VideoPlayerModal';

// ── Page-level translations ─────────────────────────────────
const PAGE_TEXT = {
  he: {
    pageTitle: '🎥 סרטוני שיטת Hapby Baby',
    videosCount: 'סרטונים',
    allWeeks: 'כל השבועות',
    weeksRange: 'שבועות',
    relevantForWeek: 'מתאים לשבוע',
    mine: 'שלי',
    allVideos: 'כל הסרטונים',
    noVideosFound: 'לא נמצאו סרטונים לשבוע זה',
  },
  en: {
    pageTitle: '🎥 Hapby Baby Method Videos',
    videosCount: 'videos',
    allWeeks: 'All weeks',
    weeksRange: 'Weeks',
    relevantForWeek: 'Relevant for my week',
    mine: '',
    allVideos: 'All videos',
    noVideosFound: 'No videos found for this week',
  },
};

export default function MomsVideosPage() {
  const { getCurrentWeek } = useAuth();
  const { isRTL } = useLanguage();
  const pt = usePageText(PAGE_TEXT);
  const week = getCurrentWeek() || 1;
  const [filter, setFilter] = useState('relevant');
  const [playingVideo, setPlayingVideo] = useState(null);

  const relevant = MOCK_VIDEOS.filter(v => {
    if (v.weeksMin === null) return true;
    return v.weeksMin <= week && v.weeksMax >= week;
  });

  const displayed = filter === 'relevant' ? relevant : MOCK_VIDEOS;

  const getWeeksLabel = (v) => {
    if (v.weeksMin === null) return pt('allWeeks');
    return `${pt('weeksRange')} ${v.weeksMin}–${v.weeksMax}`;
  };

  const getRelevantLabel = () => {
    if (isRTL) {
      return `${pt('relevantForWeek')} ${week} ${pt('mine')} (${relevant.length})`;
    }
    return `${pt('relevantForWeek')} ${week} (${relevant.length})`;
  };

  return (
    <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
      <div className="page-header">
        <h1>{pt('pageTitle')}</h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          {displayed.length} {pt('videosCount')}
        </span>
      </div>

      {/* Filter */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        <button
          className={`tab-btn${filter === 'relevant' ? ' active' : ''}`}
          onClick={() => setFilter('relevant')}
        >
          {getRelevantLabel()}
        </button>
        <button
          className={`tab-btn${filter === 'all' ? ' active' : ''}`}
          onClick={() => setFilter('all')}
        >
          {pt('allVideos')} ({MOCK_VIDEOS.length})
        </button>
      </div>

      {/* Video Grid */}
      <div className="grid-3">
        {displayed.map(video => (
          <div
            key={video.id}
            className="card card-clickable"
            style={{ padding: 0, overflow: 'hidden' }}
            onClick={() => setPlayingVideo(video)}
          >
            {/* Thumbnail */}
            <div style={{
              height: 150,
              background: video.youtubeId && !video.youtubeId.startsWith('VIDEO_')
                ? `url(https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg) center/cover`
                : 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-rose-light))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
            }}>
              {(!video.youtubeId || video.youtubeId.startsWith('VIDEO_')) && (
                <div style={{ fontSize: '3rem' }}>🤰</div>
              )}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(45, 58, 53, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}>
                  ▶
                </div>
              </div>
              <div style={{
                position: 'absolute', bottom: 8, left: 8,
                background: 'rgba(0,0,0,0.7)', color: 'white',
                padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700,
              }}>
                {getWeeksLabel(video)}
              </div>
              <div style={{
                position: 'absolute', top: 8, right: 8,
                background: 'var(--color-rose-dark)', color: 'white',
                width: 26, height: 26, borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 800,
              }}>
                {video.id}
              </div>
            </div>

            {/* Info */}
            <div style={{ padding: '12px 14px' }}>
              <h3 style={{ fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.4, color: 'var(--color-text)', marginBottom: 6 }}>
                {video.title}
              </h3>
              <span className="badge badge-rose">{video.category}</span>
            </div>
          </div>
        ))}
      </div>

      {displayed.length === 0 && (
        <div style={{ textAlign: 'center', padding: 64, color: 'var(--color-text-muted)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎬</div>
          <p>{pt('noVideosFound')}</p>
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
