import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const API = 'https://bankagn-production.up.railway.app'

export default function Register() {
  const [form, setForm] = useState({
    nom: '', prenom: '', email: '',
    telephone: '', motDePasse: ''
  })
  const [erreur, setErreur] = useState('')
  const [succes, setSucces] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setErreur('')
    try {
      const res = await axios.post(`${API}/api/auth/register`, form)
      if (res.data.success) {
        setSucces('Inscription réussie ! Vérifiez votre email.')
        setTimeout(() => navigate('/login'), 3000)
      }
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur inscription')
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
        maxWidth: '480px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ margin: 0 }}>
            <span style={{ color: '#1a3c5e', fontWeight: 900, fontSize: '2.5rem' }}>Banka</span>
            <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '2.5rem' }}>GN</span>
          </h1>
          <p style={{ color: '#6c757d' }}>Créez votre compte</p>
        </div>

        {erreur && (
          <div style={{
            background: '#fee2e2', border: '1px solid #dc2626',
            borderRadius: '10px', padding: '12px',
            marginBottom: '20px', color: '#dc2626'
          }}>{erreur}</div>
        )}

        {succes && (
          <div style={{
            background: '#dcfce7', border: '1px solid #16a34a',
            borderRadius: '10px', padding: '12px',
            marginBottom: '20px', color: '#16a34a'
          }}>{succes}</div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { name: 'nom', label: 'Nom', type: 'text', placeholder: 'Diallo' },
            { name: 'prenom', label: 'Prénom', type: 'text', placeholder: 'Mamadou' },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'votre@email.com' },
            { name: 'telephone', label: 'Téléphone', type: 'text', placeholder: '624 000 000' },
            { name: 'motDePasse', label: 'Mot de passe', type: 'password', placeholder: '••••••' },
          ].map(field => (
            <div key={field.name} style={{ marginBottom: '15px' }}>
              <label style={{
                display: 'block', fontWeight: 600,
                color: '#1a3c5e', marginBottom: '6px'
              }}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                style={{
                  width: '100%', padding: '12px 15px',
                  border: '2px solid #e9ecef', borderRadius: '12px',
                  fontSize: '0.95rem', boxSizing: 'border-box', outline: 'none'
                }}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px',
              background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
              color: 'white', border: 'none', borderRadius: '12px',
              fontSize: '1rem', fontWeight: 700, cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            {loading ? 'Inscription...' : 'Créer mon compte'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', color: '#6c757d' }}>
          Déjà un compte ?{' '}
          <a href="/login" style={{ color: '#f0a500', fontWeight: 600 }}>
            Se connecter
          </a>
        </div>
      </div>
    </div>
  )
}