import type { Page, Role } from "../App"

interface NavbarProps {
  page: Page
  setPage: (page: Page) => void
  setSelectedRecipe: (recipe: any) => void
  role: Role
  setRole: (role: Role) => void
}

export default function Navbar({ page, setPage, setSelectedRecipe, role, setRole }: NavbarProps) {
  const navigateTo = (targetPage: Page) => {
    setPage(targetPage)
    setSelectedRecipe(null)
  }

  return (
    <nav className="top-nav">
      <div className="brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
        Babs Kitchen
      </div>
      <div className="nav-links">
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
      </div>
    </nav>
  )
}