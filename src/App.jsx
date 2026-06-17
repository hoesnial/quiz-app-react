import { useState } from 'react'
import Login from './Login'
import Quiz from './Quiz'
import Results from './Results'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)
  const [questions, setQuestions] = useState([])
  const [results, setResults] = useState(null)

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

  function handleFinish(result) {
    setResults(result)
  }

  if (!user) return <Login onLogin={handleLogin} />
  if (results) return <Results user={user} answers={results.answers} questions={results.questions} timedOut={results.timedOut} />
  if (!questions.length) return <p className="loading-state">Loading...</p>
  return <Quiz user={user} questions={questions} onFinish={handleFinish} />
}
