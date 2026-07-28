import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function OTP() {
  const [code, setCode] = useState('')
  const [erreur, setErreur] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const email = localStorage.getItem('otpEmail')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    try {
      const res = await axios.post(`${API}/api/auth/verify-otp`, {
        email, code
      })
      if (res.data.success) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('role', res.data.role)
        localStorage.setItem('prenom', res.data.prenom)
        localStorage.setItem('nom', res.data.nom)
        if (res.data.role === 'ADMIN') {
          navigate('/admin/dashboard')
        } else {
          navigate('/client/dashboard')
        }
      }
    } catch (err) {
      setErreur(err.response?.data?.message || 'Code incorrect !')
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
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 5px' }}>
          <span style={{ color: '#1a3c5e', fontWeight: 900, fontSize: '2rem' }}>Banka</span>
          <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '2rem' }}>GN</span>
        </h1>

        <div style={{
          fontSize: '3rem',
          margin: '20px 0'
        }}>🔐</div>

        <h2 style={{ color: '#1a3c5e', marginBottom: '10px' }}>
          Vérification 2FA
        </h2>
        <p style={{ color: '#6c757d', marginBottom: '25px' }}>
          Code envoyé sur <strong>{email}</strong>
        </p>

        {erreur && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #dc2626',
            borderRadius: '10px',
            padding: '12px',
            marginBottom: '20px',
            color: '#dc2626'
          }}>
            {erreur}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="000000"
            maxLength={6}
            required
            style={{
              width: '100%',
              padding: '15px',
              border: '2px solid #e9ecef',
              borderRadius: '12px',
              fontSize: '1.5rem',
              textAlign: 'center',
              letterSpacing: '8px',
              boxSizing: 'border-box',
              marginBottom: '20px',
              outline: 'none'
            }}
          />

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
            {loading ? 'Vérification...' : 'Valider le code'}
          </button>
        </form>

        <div style={{ marginTop: '20px' }}>
          <a href="/login" style={{ color: '#6c757d', fontSize: '0.9rem' }}>
            ← Retour à la connexion
          </a>
        </div>
      </div>
    </div>
  )
}