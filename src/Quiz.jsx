import { useState, useEffect, useRef } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function decode(str) {
  const t = document.createElement('textarea')
  t.innerHTML = str
  return t.value
}

function fmt(t) {
  const m = Math.floor(t / 60)
  const s = t % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function Quiz({ user, questions }) {
  const [idx, setIdx] = useState(0)
  const [shuffled, setShuffled] = useState([])
  const [selected, setSelected] = useState(null)
  const [time, setTime] = useState(300)
  const timer = useRef(null)

  useEffect(() => {
    if (!shuffled.length && questions.length) {
      setShuffled(questions.map(q => shuffle([...q.incorrect_answers, q.correct_answer])))
    }
  }, [questions, shuffled])

  useEffect(() => {
    timer.current = setInterval(() => {
      setTime(t => t > 0 ? t - 1 : (clearInterval(timer.current), 0))
    }, 1000)
    return () => clearInterval(timer.current)
  }, [])

  useEffect(() => {
    if (time === 0) alert('Waktu habis!')
  }, [time])

  function pick(answer) {
    if (selected) return
    setSelected(answer)
    setTimeout(() => {
      if (idx + 1 < questions.length) {
        setIdx(idx + 1)
        setSelected(null)
      }
    }, 600)
  }

  if (!questions.length || !shuffled.length) return <p className="loading-state">Loading...</p>

  const q = questions[idx]
  const opts = shuffled[idx]

  return (
    <div className="kuis-section">
      <div className="quiz-header">
        <span className="info-kuis">{user}</span>
        <span className="info-tengah">{idx + 1}/{questions.length}</span>
        <span className={`waktu-sisa ${time <= 30 ? 'timer-warning' : ''} ${time <= 10 ? 'timer-critical' : ''}`}>{fmt(time)}</span>
      </div>
      <div className="progress-track"><div className="progress-indicator" style={{width: `${idx/questions.length*100}%`}} /></div>
      <h2>{decode(q.question)}</h2>
      <div className="opsi-jawaban">
        {opts.map((o, i) => (
          <button key={i} className={`btn-pilihan ${selected === o ? (o === q.correct_answer ? 'status-benar' : 'status-salah') : ''}`} onClick={() => pick(o)} disabled={!!selected}>
            {decode(o)}
          </button>
        ))}
      </div>
    </div>
  )
}
