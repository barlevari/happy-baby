import { useLanguage } from '../context/LanguageContext';

const isPlaceholder = (id) => !id || id.startsWith('VIDEO_');

export default function VideoPlayerModal({ video, onClose, getWeeksLabel }) {
  const { lang, isRTL } = useLanguage();
  const placeholder = isPlaceholder(video.youtubeId);
  const ccParams = lang === 'en' ? '&cc_load_policy=1&cc_lang_pref=en&hl=en' : '';

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
          direction: isRTL ? 'rtl' : 'ltr',
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

        {/* YouTube embed or placeholder */}
        {placeholder ? (
          <div style={{
            padding: '48px 32px',
            textAlign: 'center',
            background: 'var(--color-sage-ultra)',
            direction: isRTL ? 'rtl' : 'ltr',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎬</div>
            <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 8, color: 'var(--color-sage-dark)' }}>
              {isRTL ? 'הסרטון עדיין לא הועלה ל-YouTube' : 'Video not yet uploaded to YouTube'}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
              {isRTL
                ? 'הסרטון יהיה זמין בקרוב. לצפייה מוקדמת — פנ/י לרויטל בוואטסאפ.'
                : 'The video will be available soon. For early access — contact Reital on WhatsApp.'}
            </p>
            <a
              href="https://wa.me/972522218646"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ background: '#25D366', color: 'white', border: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20, textDecoration: 'none' }}
            >
              {isRTL ? '💬 צרי קשר בוואטסאפ' : '💬 Contact on WhatsApp'}
            </a>
          </div>
        ) : (
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0${ccParams}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
