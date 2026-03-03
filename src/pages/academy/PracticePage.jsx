import { useState } from 'react';

const QUESTIONS = [
  {
    id: 1,
    question: 'מהי הסיבה העיקרית לבעיות שינה בתינוקות מתחת לגיל 4 חודשים?',
    options: [
      'רצון לתשומת לב מהורים',
      'מחזורי שינה קצרים וחוסר בשלות של מערכת העצבים',
      'רעב בלבד',
      'בעיות בריאותיות',
    ],
    correct: 1,
    explanation: 'תינוקות צעירים עדיין לא פיתחו מחזורי שינה מגובשים, ומעברים בין שלבים גורמים להתעוררויות תכופות.',
  },
  {
    id: 2,
    question: 'מהי שיטת 5 ה-S של ד"ר קארפ?',
    options: [
      'שינה, שקט, שתייה, שמחה, שוויון',
      'עטיפה, תנוחת צד, רעש לבן, נדנוד, מציצה',
      'שגרה, שינה, שבע, שכיבה, שתיקה',
      'שירה, שכיבה, שחרור, שמחה, שינה',
    ],
    correct: 1,
    explanation: 'ה-5S של קארפ: Swaddling (עטיפה), Side/Stomach position, Shushing, Swinging, Sucking – מדמים את תנאי הרחם.',
  },
  {
    id: 3,
    question: 'מאיזה גיל ניתן להתחיל ללמד תינוק להירדם באופן עצמאי?',
    options: [
      'מלידה',
      'מגיל 4–6 חודשים',
      'רק מגיל שנה',
      'מגיל שנתיים',
    ],
    correct: 1,
    explanation: 'מרוב מומחים ממליצים להתחיל ב-4–6 חודשים, כאשר המוח בשל מספיק לאחד מחזורי שינה ללא התערבות הורית.',
  },
  {
    id: 4,
    question: 'כמה שינה צריך תינוק בגיל 6 חודשים ביממה?',
    options: [
      '8–10 שעות',
      '10–12 שעות',
      '14–16 שעות',
      '18–20 שעות',
    ],
    correct: 2,
    explanation: 'תינוק בן 6 חודשים זקוק ל-14–16 שעות שינה ביממה (כולל שנות יום), מחולקות בין לילה ושתי תנומות.',
  },
  {
    id: 5,
    question: 'מהו עקרון "Window of Wakeful" (חלון ערות) בשינת תינוקות?',
    options: [
      'הזמן שבו מותר לפתוח חלון בחדר השינה',
      'משך הזמן שתינוק יכול להישאר ער בין שינה לשינה',
      'שעת הכיבוי של האור בחדר',
      'זמן ההנקה לפני שינה',
    ],
    correct: 1,
    explanation: 'Window of Wakeful הוא פרק הזמן האופטימלי שתינוק יכול להישאר ער מבלי להגיע לעייפות יתר. הכרת חלון זה מסייעת להרדים בקלות.',
  },
];

export default function PracticePage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[currentQ];
  const progress = ((currentQ) / QUESTIONS.length) * 100;

  const handleSelect = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowExplanation(true);
    setAnswers(prev => [...prev, { questionId: question.id, correct: idx === question.correct }]);
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswers([]);
    setShowExplanation(false);
    setFinished(false);
  };

  if (finished) {
    const score = answers.filter(a => a.correct).length;
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const passed = pct >= 80;

    return (
      <div style={{ direction: 'rtl', maxWidth: 560, margin: '40px auto', textAlign: 'center' }}>
        <div className="card" style={{ padding: 48 }}>
          <div style={{ fontSize: '4rem', marginBottom: 16 }}>
            {passed ? '🎉' : '📖'}
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: 8, color: passed ? 'var(--color-sage-dark)' : 'var(--color-text)' }}>
            {passed ? 'כל הכבוד!' : 'כמעט!'}
          </h1>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: 24 }}>
            {passed
              ? 'השגת תוצאה מצוינת. את מוכנה להמשיך לשלב הבא!'
              : 'מומלץ לחזור על החומר ולנסות שוב.'}
          </p>

          {/* Score Circle */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%', margin: '0 auto 24px',
            background: passed ? 'var(--color-sage-ultra)' : '#FEF3E7',
            border: `4px solid ${passed ? 'var(--color-sage)' : 'var(--color-warning)'}`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: '2rem', fontWeight: 900, color: passed ? 'var(--color-sage-dark)' : 'var(--color-warning)' }}>
              {pct}%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {score}/{QUESTIONS.length}
            </div>
          </div>

          {/* Answer Review */}
          <div style={{ textAlign: 'right', marginBottom: 24 }}>
            {answers.map((a, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '8px 0', borderBottom: '1px solid var(--color-border)',
              }}>
                <span>{a.correct ? '✅' : '❌'}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text)' }}>שאלה {i + 1}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={handleRestart}>
              נסי שוב
            </button>
            {!passed && (
              <button className="btn btn-ghost" onClick={() => window.history.back()}>
                חזרי לחומר
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ direction: 'rtl', maxWidth: 660, margin: '0 auto' }}>
      <div className="page-header">
        <h1>✍️ בחינה מבוא</h1>
        <span className="badge badge-sage">{currentQ + 1} / {QUESTIONS.length}</span>
      </div>

      {/* Progress Bar */}
      <div className="progress-bar-track" style={{ marginBottom: 28 }}>
        <div className="progress-bar-fill" style={{ width: `${progress}%`, transition: 'width 0.4s ease' }} />
      </div>

      {/* Question Card */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-sage)', marginBottom: 10 }}>
          שאלה {currentQ + 1} מתוך {QUESTIONS.length}
        </div>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.6, marginBottom: 20, color: 'var(--color-text)' }}>
          {question.question}
        </h2>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {question.options.map((opt, idx) => {
            let bg = 'var(--color-white)';
            let border = 'var(--color-border)';
            let color = 'var(--color-text)';

            if (selected !== null) {
              if (idx === question.correct) {
                bg = '#E6F4EA'; border = '#A5D6A7'; color = '#1B5E20';
              } else if (idx === selected && selected !== question.correct) {
                bg = '#FDEAEA'; border = '#FCA5A5'; color = '#9B1C1C';
              }
            } else if (selected === idx) {
              bg = 'var(--color-sage-ultra)'; border = 'var(--color-sage)';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: `2px solid ${border}`,
                  background: bg,
                  color,
                  fontFamily: 'var(--font-family)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: selected !== null ? 'default' : 'pointer',
                  textAlign: 'right',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: border === 'var(--color-border)' ? 'var(--color-sage-ultra)' : bg,
                  border: `1.5px solid ${border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 800, color,
                }}>
                  {String.fromCharCode(65 + idx)}
                </div>
                {opt}
                {selected !== null && idx === question.correct && <span style={{ marginRight: 'auto' }}>✓</span>}
                {selected === idx && selected !== question.correct && <span style={{ marginRight: 'auto' }}>✗</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`alert ${selected === question.correct ? 'alert-success' : 'alert-warning'}`} style={{ marginBottom: 20 }}>
          <span>{selected === question.correct ? '🌟' : '💡'}</span>
          <div>
            <strong>{selected === question.correct ? 'נכון!' : 'לא בדיוק...'}</strong>
            <p style={{ margin: '4px 0 0', fontSize: '0.875rem' }}>{question.explanation}</p>
          </div>
        </div>
      )}

      {/* Next Button */}
      {selected !== null && (
        <button className="btn btn-primary w-full" onClick={handleNext}>
          {currentQ < QUESTIONS.length - 1 ? 'שאלה הבאה ←' : 'סיום וצפייה בתוצאות'}
        </button>
      )}
    </div>
  );
}
