import { useState } from 'react'
import axios from 'axios'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function MotDePasseOublie() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const res = await axios.post(`${API}/api/auth/mot-de-passe-oublie`, { email })
      setMessage({ type: 'success', text: res.data.message })
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Erreur.' })
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh', background: 'linear-gradient(135deg, #1a3c5e 0%, #0d2137 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'white', borderRadius: '25px', padding: '40px',
        width: '100%', maxWidth: '420px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', textAlign: 'center'
      }}>
        <h1 style={{ margin: 0 }}>
          <span style={{ color: '#1a3c5e', fontWeight: 900, fontSize: '2rem' }}>Banka</span>
          <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '2rem' }}>GN</span>
        </h1>
        <div style={{ fontSize: '3rem', margin: '20px 0' }}>🔐</div>
        <h2 style={{ color: '#1a3c5e', marginBottom: '10px' }}>Mot de passe oublié</h2>
        <p style={{ color: '#6c757d', marginBottom: '25px' }}>
          Entrez votre email, nous vous enverrons un lien de réinitialisation.
        </p>

        {message && (
          <div style={{
            background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
            border: `1px solid ${message.type === 'success' ? '#16a34a' : '#dc2626'}`,
            borderRadius: '10px', padding: '12px', marginBottom: '20px',
            color: message.type === 'success' ? '#16a34a' : '#dc2626'
          }}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="votre@email.com" required
            style={{
              width: '100%', padding: '15px', border: '2px solid #e9ecef',
              borderRadius: '12px', fontSize: '0.95rem', boxSizing: 'border-box',
              marginBottom: '20px', outline: 'none'
            }}
          />
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
            color: 'white', border: 'none', borderRadius: '12px',
            fontSize: '1rem', fontWeight: 700, cursor: 'pointer'
          }}>{loading ? 'Envoi...' : 'Envoyer le lien'}</button>
        </form>

        <div style={{ marginTop: '20px' }}>
          <a href="/login" style={{ color: '#6c757d', fontSize: '0.9rem' }}>← Retour à la connexion</a>
        </div>
      </div>
    </div>
  )
}