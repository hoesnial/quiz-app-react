export default function Results({ user, answers, questions, timedOut }) {
  const correct = answers.filter((a, i) => a.answer === questions[i].correct_answer).length
  const wrong = answers.length - correct

  return (
    <div className="hasil-section">
      <div className="hasil-panel">
        <h1>Kuis Selesai!</h1>
        <p className="nama-pemain">{user}</p>
        {timedOut && <p className="status-timeout">Waktu habis!</p>}
        <div className="hasil-summary">
          <div className="stat-item jumlah-benar"><span className="stat-value">{correct}</span><span className="stat-label">Benar</span></div>
          <div className="stat-item jumlah-salah"><span className="stat-value">{wrong}</span><span className="stat-label">Salah</span></div>
          <div className="stat-item total-soal"><span className="stat-value">{answers.length}</span><span className="stat-label">Terjawab</span></div>
          <div className="stat-item belum-jawab"><span className="stat-value">{questions.length - answers.length}</span><span className="stat-label">{questions.length - answers.length > 0 ? 'Lewat' : '-'}</span></div>
        </div>
        <div className="score-progress"><div className="score-indicator" style={{width: `${correct/questions.length*100}%`}} /></div>
        <p className="score-caption">{correct}/{questions.length} benar</p>
        <button onClick={() => window.location.reload()}>Coba Lagi</button>
      </div>
    </div>
  )
}
