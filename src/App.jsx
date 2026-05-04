import { useState } from 'react'
import Header from './components/Header'
import IdentityCard from './components/IdentityCard'
import NewIdentityModal from './components/NewIdentityModal'

function App() {
  const [identities, setIdentities] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  function handleSaveIdentity(identity) {
    const newIdentity = {
      id: crypto.randomUUID(),
      ...identity,
    }
    setIdentities([...identities, newIdentity])
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h1 className="text-4xl font-serif italic">
              Suas identidades
            </h1>
            <p className="text-zinc-500 mt-2">
              {identities.length === 0 
                ? 'Comece definindo quem você quer se tornar.' 
                : `${identities.length} ${identities.length === 1 ? 'identidade' : 'identidades'} em construção.`}
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-violet-500 hover:bg-violet-600 transition-colors px-5 py-2.5 rounded-full text-sm font-medium"
          >
            + Nova identidade
          </button>
        </div>

        {identities.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-2xl py-20 text-center">
            <p className="text-zinc-600 font-serif italic text-xl">
              "Você não se eleva ao nível dos seus objetivos.<br/>
              Você cai ao nível dos seus sistemas."
            </p>
            <p className="text-zinc-700 text-sm mt-3">— James Clear</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {identities.map((identity) => (
              <IdentityCard key={identity.id} identity={identity} />
            ))}
          </div>
        )}
      </main>

      {isModalOpen && (
        <NewIdentityModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveIdentity}
        />
      )}
    </div>
  )
}

export default App