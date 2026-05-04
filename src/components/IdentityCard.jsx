function IdentityCard({ identity }) {
  return (
    <div className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 transition-all cursor-pointer">
      <div className="flex items-start gap-4">
        <div 
          className="w-1 h-14 rounded-full flex-shrink-0"
          style={{ backgroundColor: identity.color }}
        />
        
        <div className="flex-1">
          <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">
            Sou
          </p>
          <h3 className="text-2xl font-serif italic text-white">
            {identity.name}
          </h3>
          <p className="text-zinc-500 text-sm mt-2">
            0 hábitos · 0% este mês
          </p>
        </div>
      </div>
    </div>
  )
}

export default IdentityCard