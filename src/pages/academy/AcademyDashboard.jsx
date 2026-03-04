import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { MOCK_LESSONS, MOCK_EVENTS } from '../../data/mockData';

function LessonCard({ lesson, index, lessons }) {
  const isFirst = index === 0;
  const prevLesson = index > 0 ? lessons[index - 1] : null;
  const canAccess = lesson.status === 'completed' || lesson.status === 'unlocked' ||
    (prevLesson && prevLesson.status === 'completed');

  const statusConfig = {
    completed: { icon: '✅', label: 'הושלם', color: 'var(--color-sage)', bg: 'var(--color-sage-ultra)' },
    unlocked: { icon: '🔓', label: 'פתוח', color: 'var(--color-warning)', bg: '#FEF3E7' },
    locked: { icon: '🔒', label: 'נעול', color: 'var(--color-text-muted)', bg: 'var(--color-cream)' },
  };
  const config = statusConfig[lesson.status] || statusConfig.locked;

  const handleClick = () => {
    if (!canAccess) {
      alert('השלימי את השיעור הקודם כדי לפתוח שיעור זה');
      return;
    }
    alert(`פותחת שיעור: ${lesson.title}`);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 20px',
        borderRadius: 'var(--radius-md)',
        border: `2px solid ${canAccess ? 'var(--color-sage-light)' : 'var(--color-border)'}`,
        background: canAccess ? 'var(--color-white)' : 'var(--color-cream)',
        cursor: canAccess ? 'pointer' : 'not-allowed',
        opacity: lesson.status === 'locked' && !canAccess ? 0.65 : 1,
        transition: 'all 0.2s',
        marginBottom: 10,
        boxShadow: canAccess ? 'var(--shadow-sm)' : 'none',
      }}
      onMouseEnter={e => {
        if (canAccess) e.currentTarget.style.boxShadow = 'var(--shadow-md)';
      }}
      onMouseLeave={e => {
        if (canAccess) e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Lesson Number */}
      <div style={{
        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
        background: config.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 800, fontSize: '0.9rem', color: config.color,
      }}>
        {index + 1}
      </div>

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontWeight: 700,
          fontSize: '0.95rem',
          color: canAccess ? 'var(--color-text)' : 'var(--color-text-muted)',
          marginBottom: 2,
        }}>
          {lesson.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          <span>⏱️ {lesson.estimatedMinutes} דקות</span>
          {!canAccess && lesson.status === 'locked' && (
            <span style={{ color: 'var(--color-text-muted)' }}>• השלימי את השיעור הקודם</span>
          )}
        </div>
      </div>

      {/* Status badge */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '4px 10px', borderRadius: 'var(--radius-full)',
        background: config.bg, fontSize: '0.75rem', fontWeight: 700, color: config.color,
      }}>
        <span>{config.icon}</span>
        <span>{config.label}</span>
      </div>
    </div>
  );
}

export default function AcademyDashboard() {
  const { user } = useAuth();
  const [lessons] = useState(MOCK_LESSONS);

  const completedCount = lessons.filter(l => l.status === 'completed').length;
  const progressPct = (completedCount / lessons.length) * 100;

  const upcomingEvents = MOCK_EVENTS.slice(0, 3);

  return (
    <div style={{ direction: 'rtl' }}>
      {/* Welcome Card */}
      <div className="card" style={{
        background: 'linear-gradient(135deg, var(--color-sage-ultra), var(--color-cream))',
        border: '1px solid var(--color-sage-light)',
        marginBottom: 24,
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}>
        <div style={{ fontSize: '3rem' }}>🎓</div>
        <div>
          <h1 style={{ fontSize: 'var(--font-xl)', fontWeight: 900, marginBottom: 4 }}>
            שלום {user?.name?.split(' ')[0]} 🎓
          </h1>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
            ברוכה הבאה לאקדמיית Happy Baby | המשיכי את המסע שלך
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 'var(--font-base)', fontWeight: 700, margin: 0 }}>
            📈 התקדמות בקורס
          </h2>
          <span className="badge badge-sage" style={{ fontSize: '0.85rem' }}>
            {completedCount}/{lessons.length} שיעורים הושלמו
          </span>
        </div>
        <div className="progress-bar-track">
          <div className="progress-bar-fill" style={{ width: `${progressPct}%` }} />
        </div>
        <div style={{ marginTop: 8, fontSize: '0.8rem', color: 'var(--color-text-muted)', textAlign: 'left' }}>
          {Math.round(progressPct)}% הושלם
        </div>
      </div>

      {/* Syllabus */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 20 }}>📋 סילבוס הקורס</h2>
        {lessons.map((lesson, idx) => (
          <LessonCard key={lesson.id} lesson={lesson} index={idx} lessons={lessons} />
        ))}
      </div>

      {/* Upcoming Events Strip */}
      <div className="card">
        <h2 style={{ fontSize: 'var(--font-lg)', fontWeight: 800, marginBottom: 16 }}>📅 אירועים קרובים</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {upcomingEvents.map(event => (
            <div key={event.id} style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '12px 16px', borderRadius: 'var(--radius-md)',
              background: 'var(--color-sage-ultra)', border: '1px solid var(--color-sage-light)',
            }}>
              <div style={{ fontSize: '1.5rem' }}>
                {event.type === 'online' ? '💻' : '📍'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{event.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 2 }}>
                  {(() => { const d = new Date(event.date + 'T12:00:00'); return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`; })()} • {event.location}
                </div>
              </div>
              <span className={`badge ${event.type === 'online' ? 'badge-sage' : 'badge-rose'}`}>
                {event.type === 'online' ? 'אונליין' : 'פרונטלי'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
