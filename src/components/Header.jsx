import { NavLink } from 'react-router-dom'

function Header() {
  const linkClass = ({ isActive }) =>
    `text-sm transition-colors ${
      isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
    }`

  return (
    <header className="border-b border-zinc-800/50 px-6 py-5">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div>
            <p className="text-violet-400 text-xs uppercase tracking-widest font-medium">
              Becoming
            </p>
            <p className="text-zinc-500 text-xs mt-0.5">
              quem você está se tornando
            </p>
          </div>

          <nav className="flex items-center gap-6">
            <NavLink to="/" end className={linkClass}>
              Hoje
            </NavLink>
            <NavLink to="/identidades" className={linkClass}>
              Identidades
            </NavLink>
          </nav>
        </div>

        <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
          <span className="text-violet-300 text-sm font-medium">G</span>
        </div>
      </div>
    </header>
  )
}

export default Header