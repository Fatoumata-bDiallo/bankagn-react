import { useNavigate } from 'react-router-dom'

export default function ClientSidebar({ active }) {
  const navigate = useNavigate()
  const prenom = localStorage.getItem('prenom')

 const links = [
    { icon: '🏠', label: 'Dashboard', path: '/client/dashboard' },
    { icon: '💼', label: 'Opérations', path: '/client/operations' },
    { icon: '💸', label: 'Transactions', path: '/client/transactions' },
    { icon: '📄', label: 'Relevé', path: '/client/releve' },
    { icon: '💰', label: 'Prêts', path: '/client/prets' },
    { icon: '💳', label: 'Cartes', path: '/client/cartes' },
    { icon: '👥', label: 'Bénéficiaires', path: '/client/beneficiaires' },
    { icon: '💱', label: 'Devises', path: '/client/devises' },
    { icon: '🔔', label: 'Notifications', path: '/client/notifications' },
    { icon: '👤', label: 'Profil', path: '/client/profil' },
  ]

  return (
   <div style={{
      width: '260px', height: '100vh',
      background: 'linear-gradient(180deg, #0d2137 0%, #1a3c5e 100%)',
      padding: '20px 0', position: 'fixed', top: 0, left: 0,
      zIndex: 100, overflowY: 'auto'
    }}>
      <div style={{
        textAlign: 'center', padding: '20px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <span style={{ color: 'white', fontWeight: 900, fontSize: '1.8rem' }}>Banka</span>
        <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '1.8rem' }}>GN</span>
        <div style={{ color: '#8fb0cc', fontSize: '0.8rem', marginTop: '5px' }}>
          Bonjour, {prenom} !
        </div>
      </div>

      <nav style={{ marginTop: '20px' }}>
        {links.map(item => (
          <a key={item.path}
            href={item.path}
            style={{
              display: 'block', padding: '10px 25px',
              color: active === item.path ? 'white' : 'rgba(255,255,255,0.7)',
              textDecoration: 'none', fontSize: '0.9rem',
              borderLeft: active === item.path ? '3px solid #f0a500' : '3px solid transparent',
              background: active === item.path ? 'rgba(240,165,0,0.2)' : 'transparent',
              transition: 'all 0.3s'
            }}>
            {item.icon} {item.label}
          </a>
        ))}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          margin: '10px 0'
        }}></div>
        <button
          onClick={() => { localStorage.clear(); navigate('/login') }}
          style={{
            display: 'block', width: '100%', padding: '10px 25px',
            background: 'none', border: 'none', color: '#dc2626',
            textAlign: 'left', fontSize: '0.9rem', cursor: 'pointer'
          }}>
          🚪 Déconnexion
        </button>
      </nav>
    </div>
  )
}