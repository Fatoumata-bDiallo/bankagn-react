import { useNavigate } from 'react-router-dom'

export default function AdminSidebar({ active }) {
  const navigate = useNavigate()
const links = [
    { icon: '📊', label: 'Dashboard', path: '/admin/dashboard' },
    { icon: '👥', label: 'Utilisateurs', path: '/admin/utilisateurs' },
    { icon: '🏦', label: 'Comptes', path: '/admin/comptes' },
    { icon: '💸', label: 'Transactions', path: '/admin/transactions' },
    { icon: '💰', label: 'Prêts', path: '/admin/prets' },
    { icon: '🚨', label: 'Alertes Fraude', path: '/admin/fraudes' },
    { icon: '📋', label: 'Journal Audit', path: '/admin/audit' },
    { icon: '💱', label: 'Devises', path: '/admin/devises' },
    { icon: '📊', label: 'Rapports', path: '/admin/rapports' },
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
        <span style={{
          background: '#f0a500', color: 'white',
          fontSize: '0.7rem', padding: '3px 8px',
          borderRadius: '10px', marginLeft: '8px'
        }}>ADMIN</span>
      </div>

      <nav style={{ marginTop: '20px', paddingBottom: '30px' }}>
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