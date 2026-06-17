import { useState } from 'react'

export default function Login({ onLogin }) {
  const [name, setName] = useState('')
  const saved = localStorage.getItem('quiz_state')
  const savedName = saved ? JSON.parse(saved).user : null

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim()) onLogin(name.trim(), false)
  }

  return (
    <div className="login-section">
      <div className="login-panel">
        <h1>Quiz App</h1>
        <p>Masukkan nama untuk memulai</p>
        <form onSubmit={handleSubmit}>
          <input placeholder="Nama kamu" value={name} onChange={e => setName(e.target.value)} autoFocus />
          <button disabled={!name.trim()}>Mulai</button>
        </form>
        {saved && (
          <button className="btn-mulai" onClick={() => onLogin(savedName || 'Player', true)}>
            Lanjut ({savedName})
          </button>
        )}
      </div>
    </div>
  )
}
