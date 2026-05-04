import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import IdentitiesPage from './pages/IdentitiesPage'
import IdentityDetailPage from './pages/IdentityDetailPage'
import { useLocalStorage } from './hooks/useLocalStorage'
import { useToast } from './context/ToastContext'

function App() {
  const [identities, setIdentities] = useLocalStorage('becoming.identities', [])
  const [completions, setCompletions] = useLocalStorage('becoming.completions', {})
  const toast = useToast()

  function handleAddIdentity(identity) {
    const newIdentity = {
      id: crypto.randomUUID(),
      habits: [],
      ...identity,
    }
    setIdentities([...identities, newIdentity])
    toast.success(`Identidade criada: ${identity.name}`)
  }

  function handleUpdateIdentity(identityId, updates) {
    setIdentities(
      identities.map((identity) =>
        identity.id === identityId ? { ...identity, ...updates } : identity
      )
    )
    toast.success('Identidade atualizada')
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
    toast.info(`Identidade "${identity?.name}" excluída`)
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
    toast.success(`Hábito criado: ${habit.name}`)
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
    toast.success('Hábito atualizado')
  }

  function handleDeleteHabit(identityId, habitId) {
    const identity = identities.find((i) => i.id === identityId)
    const habit = identity?.habits?.find((h) => h.id === habitId)

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
    toast.info(`Hábito "${habit?.name}" excluído`)
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