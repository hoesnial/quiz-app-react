import { useState, useEffect } from 'react'

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

export default function Quiz({ user, questions }) {
  const [idx, setIdx] = useState(0)
  const [shuffled, setShuffled] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (!shuffled.length && questions.length) {
      setShuffled(questions.map(q => shuffle([...q.incorrect_answers, q.correct_answer])))
    }
  }, [questions, shuffled])

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
