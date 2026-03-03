import { useState } from 'react';

export default function VideoPlayerModal({ video, onClose, getWeeksLabel }) {
  const [videoError, setVideoError] = useState(false);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{ alignItems: 'flex-start', paddingTop: 40 }}
    >
      <div
        className="modal-box"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 800, width: '95vw', padding: 0, overflow: 'hidden' }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div>
            <h2 style={{ fontSize: '1rem', fontWeight: 800, margin: 0 }}>{video.title}</h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              {video.category} · {getWeeksLabel(video)}
            </span>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--color-text-muted)', padding: 4 }}
          >
            ✕
          </button>
        </div>

        {/* Video or placeholder */}
        {videoError ? (
          <div style={{
            padding: '48px 32px',
            textAlign: 'center',
            background: 'var(--color-sage-ultra)',
            direction: 'rtl',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎬</div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: 'var(--color-sage-dark)' }}>
              הסרטון זמין רק בגרסה המקומית
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              הסרטונים עדיין לא הועלו לשרת האינטרנט.
              לצפייה בסרטון — פנ/י לרויטל בוואטסאפ.
            </p>
            <a
              href="https://wa.me/972522218646"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25D366', color: 'white', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, textDecoration: 'none' }}
            >
              💬 צרי קשר בוואטסאפ
            </a>
          </div>
        ) : (
          <video
            src={video.videoUrl}
            controls
            autoPlay
            onError={() => setVideoError(true)}
            style={{ width: '100%', display: 'block', maxHeight: '60vh', background: '#000' }}
          />
        )}
      </div>
    </div>
  );
}
