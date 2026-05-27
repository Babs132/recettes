import { useState } from 'react'

interface Props {
  open: boolean
  onClose: () => void
  onLogin: (password: string) => void
  error?: string | null
}

export default function LoginModal({ open, onClose, onLogin, error }: Props) {
  const [password, setPassword] = useState('')

  if (!open) return null

  return (
    <div className="login-modal-backdrop" onClick={onClose}>
      <div className="login-modal" onClick={e => e.stopPropagation()}>
        <h3>Connexion Admin</h3>
        <p>Entrez le mot de passe administrateur pour activer les actions.</p>
        <input
          type="password"
          className="form-control"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div className="login-error">{error}</div>}
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button className="btn-primary" onClick={() => onLogin(password)}>Se connecter</button>
          <button className="nav-button" onClick={onClose}>Annuler</button>
        </div>
      </div>
    </div>
  )
}
