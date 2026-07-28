import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function ClientProfil() {
  const [profil, setProfil] = useState({})
  const [loading, setLoading] = useState(true)
  const [ancienMdp, setAncienMdp] = useState('')
  const [nouveauMdp, setNouveauMdp] = useState('')
  const [succes, setSucces] = useState('')
  const [erreur, setErreur] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/client/profil`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setProfil(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const handleChangeMdp = async (e) => {
    e.preventDefault()
    setSucces('')
    setErreur('')
    try {
      const res = await axios.post(`${API}/api/client/modifier-mdp`, {
        ancienMotDePasse: ancienMdp,
        nouveauMotDePasse: nouveauMdp
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.data.success) {
        setSucces('Mot de passe modifié avec succès !')
        setAncienMdp('')
        setNouveauMdp('')
      }
    } catch (err) {
      setErreur(err.response?.data?.message || 'Erreur !')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/profil" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            👤 Mon Profil
          </h4>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>

            {/* Infos profil */}
            <div style={{
              background: 'white', borderRadius: '15px',
              padding: '30px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                <div style={{
                  width: '80px', height: '80px',
                  background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
                  borderRadius: '50%', margin: '0 auto 10px',
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem', color: 'white', fontWeight: 800
                }}>
                  {profil.prenom?.charAt(0)}{profil.nom?.charAt(0)}
                </div>
                <h4 style={{ color: '#1a3c5e', margin: '0 0 5px' }}>
                  {profil.prenom} {profil.nom}
                </h4>
                <span style={{
                  padding: '3px 10px', borderRadius: '20px',
                  fontSize: '0.75rem', fontWeight: 600,
                  background: '#dcfce7', color: '#16a34a'
                }}>{profil.statut}</span>
              </div>

              {[
                { label: '📧 Email', value: profil.email },
                { label: '📱 Téléphone', value: profil.telephone },
                { label: '📅 Membre depuis', value: profil.dateCreation ?
                  new Date(profil.dateCreation).toLocaleDateString('fr-FR') : '-' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '12px', background: '#f8f9fa',
                  borderRadius: '10px', marginBottom: '10px'
                }}>
                  <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>
                    {item.label}
                  </div>
                  <div style={{ fontWeight: 600, color: '#1a3c5e' }}>
                    {item.value || '-'}
                  </div>
                </div>
              ))}
            </div>

            {/* Modifier mot de passe */}
            <div style={{
              background: 'white', borderRadius: '15px',
              padding: '30px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
            }}>
              <h5 style={{ color: '#1a3c5e', marginBottom: '20px' }}>
                🔐 Modifier le mot de passe
              </h5>

              {succes && (
                <div style={{
                  background: '#dcfce7', border: '1px solid #16a34a',
                  borderRadius: '10px', padding: '12px',
                  marginBottom: '15px', color: '#16a34a'
                }}>{succes}</div>
              )}

              {erreur && (
                <div style={{
                  background: '#fee2e2', border: '1px solid #dc2626',
                  borderRadius: '10px', padding: '12px',
                  marginBottom: '15px', color: '#dc2626'
                }}>{erreur}</div>
              )}

              <form onSubmit={handleChangeMdp}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{
                    display: 'block', fontWeight: 600,
                    color: '#1a3c5e', marginBottom: '6px'
                  }}>Ancien mot de passe</label>
                  <input
                    type="password"
                    value={ancienMdp}
                    onChange={e => setAncienMdp(e.target.value)}
                    required
                    style={{
                      width: '100%', padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px', outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block', fontWeight: 600,
                    color: '#1a3c5e', marginBottom: '6px'
                  }}>Nouveau mot de passe</label>
                  <input
                    type="password"
                    value={nouveauMdp}
                    onChange={e => setNouveauMdp(e.target.value)}
                    required
                    minLength={6}
                    style={{
                      width: '100%', padding: '12px',
                      border: '2px solid #e9ecef',
                      borderRadius: '10px', outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
                <button type="submit" style={{
                  width: '100%', padding: '12px',
                  background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
                  color: 'white', border: 'none',
                  borderRadius: '10px', fontWeight: 700,
                  cursor: 'pointer'
                }}>
                  Modifier le mot de passe
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}