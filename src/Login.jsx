import { useState } from 'react'

export default function Login({ onLogin }) {
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim()) onLogin(name.trim())
  }

  return (
    <div className="login-section">
      <div className="login-panel">
        <h1>Quiz App</h1>
        <p>Masukkan nama untuk memulai</p>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Nama kamu"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
          />
          <button disabled={!name.trim()}>Mulai</button>
        </form>
      </div>
    </div>
  )
}
