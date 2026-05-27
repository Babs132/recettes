import type { Page, Role } from "../App"
import { useState } from "react"

interface NavbarProps {
  page: Page
  setPage: (page: Page) => void
  setSelectedRecipe: (recipe: any) => void
  role: Role
  setRole: (role: Role) => void
}

export default function Navbar({ page, setPage, setSelectedRecipe, role, setRole }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const navigateTo = (targetPage: Page) => {
    setPage(targetPage)
    setSelectedRecipe(null)
    setOpen(false)
  }

  return (
    <nav className="top-nav">
      <div className="brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
        Babs Kitchen
      </div>
      <button
        className="mobile-menu-button"
        aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        ☰
      </button>
      <div className={"nav-links " + (open ? 'open' : 'closed')}>
        <button
          type="button"
          className={page === 'home' ? 'nav-button active' : 'nav-button'}
          onClick={() => navigateTo('home')}
        >
          Nos Recettes
        </button>
        <button
          type="button"
          className={page === 'ajouter' ? 'nav-button active' : 'nav-button'}
          onClick={() => navigateTo('ajouter')}
        >
          Ajouter une recette
        </button>
        <button 
          type="button" 
          className={page === 'apropos' ? 'nav-button active' : 'nav-button'} 
          onClick={() => navigateTo('apropos')}
        >
          À propos
        </button>
        <div className="role-selector">
          <label htmlFor="roleSelect">Rôle</label>
          <select id="roleSelect" value={role} onChange={e => setRole(e.target.value as Role)}>
            <option value="admin">Admin</option>
            <option value="user">Utilisateur</option>
            <option value="abonnee">Abonnée</option>
          </select>
        </div>
        <div style={{ marginLeft: 8 }}>
          {role === 'admin' ? (
            <button className="nav-button" onClick={() => { setRole('user'); localStorage.removeItem('role') }}>
              Se déconnecter
            </button>
          ) : (
            <button className="nav-button" onClick={() => (window.dispatchEvent(new CustomEvent('open-login')))}>
              Se connecter
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}