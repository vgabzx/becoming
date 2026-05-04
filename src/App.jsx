function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <p className="text-violet-400 text-sm uppercase tracking-widest mb-6">
          Becoming
        </p>
        
        <h1 className="text-5xl md:text-6xl font-serif italic mb-6 leading-tight">
          Quem você <span className="text-violet-400">está se tornando</span>?
        </h1>
        
        <p className="text-lg text-zinc-400 mb-10 leading-relaxed">
          Hábitos não são tarefas. São evidências de quem você escolhe ser.
          Aqui você não rastreia o que faz — você rastreia quem está virando.
        </p>
        
        <button className="bg-violet-500 hover:bg-violet-600 transition-colors px-8 py-3 rounded-full font-medium text-white">
          Começar
        </button>
      </div>
    </div>
  )
}

export default App