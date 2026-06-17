import { useState } from 'react'
import Login from './Login'
import Quiz from './Quiz'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])

  async function handleLogin(name) {
    setUser(name)
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      const data = await res.json()
      if (data.response_code === 0) setQuestions(data.results)
      else alert('Gagal ambil soal')
    } catch {
      alert('Koneksi error')
    }
  }

  if (!user) return <Login onLogin={handleLogin} />
  if (!questions.length) return <p className="loading-state">Loading...</p>
  return <Quiz user={user} questions={questions} />
}
