import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Login() {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email, motDePasse
      })
      if (res.data.success) {
        localStorage.setItem('otpEmail', email)
        navigate('/otp')
      }
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur de connexion')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a3c5e 0%, #0d2137 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '25px',
        padding: '40px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0 }}>
            <span style={{ color: '#1a3c5e', fontWeight: 900, fontSize: '2.5rem' }}>Banka</span>
            <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '2.5rem' }}>GN</span>
          </h1>
          <p style={{ color: '#6c757d', margin: '5px 0 0' }}>
            Votre Banque Numérique en Guinée
          </p>
        </div>

        {erreur && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #dc2626',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '20px',
            color: '#dc2626',
            fontSize: '0.9rem'
          }}>
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#1a3c5e',
              marginBottom: '8px'
            }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="votre@email.com"
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              fontWeight: 600,
              color: '#1a3c5e',
              marginBottom: '8px'
            }}>Mot de passe</label>
            <input
              type="password"
              value={motDePasse}
              onChange={e => setMotDePasse(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 15px',
                border: '2px solid #e9ecef',
                borderRadius: '12px',
                fontSize: '0.95rem',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>

          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <a href="/mot-de-passe-oublie" style={{ color: '#6c757d', fontSize: '0.85rem' }}>
              Mot de passe oublié ?
            </a>
          </div>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d' }}>
          Pas de compte ?{' '}
          <a href="/register" style={{ color: '#f0a500', fontWeight: 600 }}>
            S'inscrire
          </a>
        </div>
      </div>
    </div>
  )
}