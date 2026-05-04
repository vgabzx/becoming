import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import IdentitiesPage from './pages/IdentitiesPage'
import IdentityDetailPage from './pages/IdentityDetailPage'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [identities, setIdentities] = useLocalStorage('becoming.identities', [])
  const [completions, setCompletions] = useLocalStorage('becoming.completions', {})

  function handleAddIdentity(identity) {
    const newIdentity = {
      id: crypto.randomUUID(),
      habits: [],
      ...identity,
    }
    setIdentities([...identities, newIdentity])
  }

  function handleUpdateIdentity(identityId, updates) {
    setIdentities(
      identities.map((identity) =>
        identity.id === identityId ? { ...identity, ...updates } : identity
      )
    )
  }

  function handleDeleteIdentity(identityId) {
    const identity = identities.find((i) => i.id === identityId)
    setIdentities(identities.filter((i) => i.id !== identityId))

    if (identity?.habits) {
      setCompletions((prev) => {
        const next = { ...prev }
        identity.habits.forEach((h) => delete next[h.id])
        return next
      })
    }
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

  function handleUpdateHabit(identityId, habitId, updates) {
    setIdentities(
      identities.map((identity) => {
        if (identity.id !== identityId) return identity
        return {
          ...identity,
          habits: (identity.habits || []).map((habit) =>
            habit.id === habitId ? { ...habit, ...updates } : habit
          ),
        }
      })
    )
  }

  function handleDeleteHabit(identityId, habitId) {
    setIdentities(
      identities.map((identity) => {
        if (identity.id !== identityId) return identity
        return {
          ...identity,
          habits: (identity.habits || []).filter((h) => h.id !== habitId),
        }
      })
    )
    setCompletions((prev) => {
      const next = { ...prev }
      delete next[habitId]
      return next
    })
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
              completions={completions}
              onAddIdentity={handleAddIdentity}
              onUpdateIdentity={handleUpdateIdentity}
              onDeleteIdentity={handleDeleteIdentity}
            />
          }
        />
        <Route
          path="/identidade/:id"
          element={
            <IdentityDetailPage
              identities={identities}
              completions={completions}
              onAddHabit={handleAddHabit}
              onUpdateHabit={handleUpdateHabit}
              onDeleteHabit={handleDeleteHabit}
              onDeleteIdentity={handleDeleteIdentity}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App