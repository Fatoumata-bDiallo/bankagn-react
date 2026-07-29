import { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Reinitialiser() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [nouveauMotDePasse, setNouveauMotDePasse] = useState('')
  const [confirmerMotDePasse, setConfirmerMotDePasse] = useState('')
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (nouveauMotDePasse !== confirmerMotDePasse) {
      setMessage({ type: 'error', text: 'Les mots de passe ne correspondent pas !' })
      return
    }

    setLoading(true)
    try {
      const res = await axios.post(`${API}/api/auth/reinitialiser`, {
        token, nouveauMotDePasse
      })
      if (res.data.success) {
        setMessage({ type: 'success', text: 'Mot de passe réinitialisé ! Redirection...' })
        setTimeout(() => navigate('/login'), 2500)
      }
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
        <div style={{ fontSize: '3rem', margin: '20px 0' }}>🔑</div>
        <h2 style={{ color: '#1a3c5e', marginBottom: '25px' }}>Nouveau mot de passe</h2>

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
            type="password" value={nouveauMotDePasse} onChange={e => setNouveauMotDePasse(e.target.value)}
            placeholder="Nouveau mot de passe" required minLength={6}
            style={{
              width: '100%', padding: '15px', border: '2px solid #e9ecef',
              borderRadius: '12px', fontSize: '0.95rem', boxSizing: 'border-box',
              marginBottom: '15px', outline: 'none'
            }}
          />
          <input
            type="password" value={confirmerMotDePasse} onChange={e => setConfirmerMotDePasse(e.target.value)}
            placeholder="Confirmer le mot de passe" required minLength={6}
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
          }}>{loading ? 'Envoi...' : 'Réinitialiser'}</button>
        </form>
      </div>
    </div>
  )
}