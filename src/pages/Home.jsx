import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0d2137' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', padding: '20px 50px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <div>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.8rem' }}>Banka</span>
          <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '1.8rem' }}>GN</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => navigate('/login')} style={{
            padding: '10px 25px', background: 'transparent',
            color: 'white', border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '25px', cursor: 'pointer', fontWeight: 600
          }}>
            Se connecter
          </button>
          <button onClick={() => navigate('/register')} style={{
            padding: '10px 25px', background: '#f0a500',
            color: 'white', border: 'none',
            borderRadius: '25px', cursor: 'pointer', fontWeight: 600
          }}>
            Ouvrir un compte
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: '80px 50px',
        background: 'linear-gradient(135deg, #0d2137 0%, #1a3c5e 100%)'
      }}>
        <h1 style={{
          color: 'white', fontSize: '3.5rem',
          fontWeight: 900, marginBottom: '20px', lineHeight: 1.2
        }}>
          Votre Banque<br />
          <span style={{ color: '#f0a500' }}>Numérique</span> en Guinée
        </h1>
        <p style={{
          color: '#8fb0cc', fontSize: '1.2rem',
          marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px'
        }}>
          BankaGN vous offre des services bancaires modernes,
          sécurisés et accessibles depuis partout.
        </p>
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/register')} style={{
            padding: '15px 35px', background: '#f0a500',
            color: 'white', border: 'none', borderRadius: '30px',
            cursor: 'pointer', fontWeight: 700, fontSize: '1rem'
          }}>
            Ouvrir un compte gratuit
          </button>
          <button onClick={() => navigate('/login')} style={{
            padding: '15px 35px', background: 'transparent',
            color: 'white', border: '2px solid white',
            borderRadius: '30px', cursor: 'pointer',
            fontWeight: 700, fontSize: '1rem'
          }}>
            Se connecter
          </button>
        </div>
      </div>

      {/* Features */}
      <div style={{
        padding: '80px 50px',
        background: '#f0f4f8'
      }}>
        <h2 style={{
          textAlign: 'center', color: '#1a3c5e',
          fontSize: '2rem', fontWeight: 800, marginBottom: '50px'
        }}>
          Pourquoi choisir BankaGN ?
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px', maxWidth: '1000px', margin: '0 auto'
        }}>
          {[
            { icon: '🔐', title: 'Sécurité Maximale', desc: 'Double authentification 2FA et détection de fraude en temps réel.' },
            { icon: '📱', title: '100% Numérique', desc: 'Gérez vos comptes depuis n\'importe où, à tout moment.' },
            { icon: '⚡', title: 'Transactions Rapides', desc: 'Dépôts, retraits et transferts instantanés.' },
            { icon: '🪪', title: 'KYC Sécurisé', desc: 'Vérification d\'identité pour protéger votre compte.' },
            { icon: '📄', title: 'Relevés PDF', desc: 'Téléchargez vos relevés bancaires avec QR Code.' },
            { icon: '💰', title: 'Prêts Faciles', desc: 'Demandez un prêt en ligne en quelques minutes.' },
          ].map(f => (
            <div key={f.title} style={{
              background: 'white', borderRadius: '20px',
              padding: '30px', textAlign: 'center',
              boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '15px' }}>{f.icon}</div>
              <h3 style={{ color: '#1a3c5e', fontWeight: 700, marginBottom: '10px' }}>
                {f.title}
              </h3>
              <p style={{ color: '#6c757d', fontSize: '0.9rem' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#0d2137', padding: '30px 50px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.5rem' }}>Banka</span>
          <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '1.5rem' }}>GN</span>
          <div style={{ color: '#8fb0cc', fontSize: '0.85rem', marginTop: '5px' }}>
            Votre Banque Numérique en Guinée
          </div>
        </div>
        <div style={{ color: '#8fb0cc', fontSize: '0.85rem' }}>
          © BankaGN 2026 — ODC-Guinée — Conakry, Guinée
        </div>
      </div>
    </div>
  )
}