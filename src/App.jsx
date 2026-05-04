import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import IdentitiesPage from './pages/IdentitiesPage'
import IdentityDetailPage from './pages/IdentityDetailPage'

function App() {
  const [identities, setIdentities] = useState([])

  // Estrutura: { [habitId]: { [dateKey]: count } }
  // Ex: { "abc-123": { "2025-11-04": 3, "2025-11-03": 8 } }
  const [completions, setCompletions] = useState({})

  function handleAddIdentity(identity) {
    const newIdentity = {
      id: crypto.randomUUID(),
      habits: [],
      ...identity,
    }
    setIdentities([...identities, newIdentity])
  }

  function handleAddHabit(identityId, habit) {
    const newHabit = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...habit,
    }

    setIdentities(
      identities.map((identity) =>
        identity.id === identityId
          ? { ...identity, habits: [...(identity.habits || []), newHabit] }
          : identity
      )
    )
  }

  function handleMarkHabit(habitId, dateKey) {
    setCompletions((prev) => {
      const habitData = prev[habitId] || {}
      const currentCount = habitData[dateKey] || 0
      return {
        ...prev,
        [habitId]: {
          ...habitData,
          [dateKey]: currentCount + 1,
        },
      }
    })
  }

  function handleUnmarkHabit(habitId, dateKey) {
    setCompletions((prev) => {
      const habitData = prev[habitId] || {}
      const currentCount = habitData[dateKey] || 0
      if (currentCount <= 0) return prev

      return {
        ...prev,
        [habitId]: {
          ...habitData,
          [dateKey]: currentCount - 1,
        },
      }
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              identities={identities}
              completions={completions}
              onMarkHabit={handleMarkHabit}
              onUnmarkHabit={handleUnmarkHabit}
            />
          }
        />
        <Route
          path="/identidades"
          element={
            <IdentitiesPage
              identities={identities}
              onAddIdentity={handleAddIdentity}
            />
          }
        />
        <Route
          path="/identidade/:id"
          element={
            <IdentityDetailPage
              identities={identities}
              onAddHabit={handleAddHabit}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App