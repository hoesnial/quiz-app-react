import { useState } from 'react'
import Login from './Login'
import './App.css'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login onLogin={(name) => setUser(name)} />
  }

  return <p>Halo {user}</p>
}
