import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function Utilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchUtilisateurs()
  }, [])

  const fetchUtilisateurs = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/utilisateurs`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUtilisateurs(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const valider = async (id) => {
    await axios.put(`${API}/api/admin/utilisateurs/${id}/valider`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setMessage('✅ Compte validé !')
    fetchUtilisateurs()
    setTimeout(() => setMessage(''), 3000)
  }

  const bloquer = async (id) => {
    await axios.put(`${API}/api/admin/utilisateurs/${id}/bloquer`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    setMessage('🔒 Compte bloqué !')
    fetchUtilisateurs()
    setTimeout(() => setMessage(''), 3000)
  }

  const enAttente = utilisateurs.filter(u => u.statut === 'EN_ATTENTE').length

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/utilisateurs" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
              👥 Gestion des Utilisateurs
            </h4>
            <small style={{ color: '#6c757d' }}>
              Tous les clients inscrits
            </small>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {enAttente > 0 && (
              <span style={{
                background: '#fef3c7', color: '#d97706',
                padding: '6px 14px', borderRadius: '20px',
                fontSize: '0.85rem', fontWeight: 600
              }}>
                ⏳ {enAttente} en attente
              </span>
            )}
            <span style={{
              background: '#dbeafe', color: '#2563eb',
              padding: '6px 14px', borderRadius: '20px',
              fontSize: '0.85rem', fontWeight: 600
            }}>
              {utilisateurs.length} clients
            </span>
          </div>
        </div>

        {message && (
          <div style={{
            background: '#dcfce7', border: '1px solid #16a34a',
            borderRadius: '10px', padding: '12px',
            marginBottom: '20px', color: '#16a34a', fontWeight: 600
          }}>{message}</div>
        )}

        {enAttente > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #fff3cd, #ffeaa7)',
            border: '2px solid #f0a500', borderRadius: '15px',
            padding: '15px 20px', marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '15px'
          }}>
            <span style={{ fontSize: '2rem' }}>⏳</span>
            <div>
              <div style={{ fontWeight: 700, color: '#1a3c5e' }}>
                {enAttente} inscription(s) en attente de validation !
              </div>
              <small style={{ color: '#6c757d' }}>
                Vérifiez les pièces d'identité et validez les nouveaux clients.
              </small>
            </div>
          </div>
        )}

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#6c757d' }}>Chargement...</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Client', 'Email', 'Téléphone', 'Statut', 'Date', 'Actions'].map(h => (
                    <th key={h} style={{
                      background: '#1a3c5e', color: 'white',
                      padding: '12px', textAlign: 'left', fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {utilisateurs.map((u, i) => (
                  <tr key={u.id} style={{
                    background: u.statut === 'EN_ATTENTE' ? '#fffbeb' :
                      i % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '38px', height: '38px',
                          background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
                          borderRadius: '50%', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: 'white', fontWeight: 700, fontSize: '0.9rem'
                        }}>
                          {u.prenom?.charAt(0)}{u.nom?.charAt(0)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: '#1a3c5e' }}>
                            {u.prenom} {u.nom}
                          </div>
                          <small style={{ color: '#6c757d' }}>Client</small>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '12px', color: '#6c757d' }}>{u.email}</td>
                    <td style={{ padding: '12px' }}>{u.telephone}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: u.statut === 'ACTIF' ? '#dcfce7' :
                          u.statut === 'EN_ATTENTE' ? '#fef3c7' : '#fee2e2',
                        color: u.statut === 'ACTIF' ? '#16a34a' :
                          u.statut === 'EN_ATTENTE' ? '#d97706' : '#dc2626'
                      }}>{u.statut}</span>
                    </td>
                    <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>
                      {u.dateCreation ?
                        new Date(u.dateCreation).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {u.statut === 'EN_ATTENTE' && (
                          <button onClick={() => valider(u.id)} style={{
                            padding: '6px 12px', background: '#16a34a',
                            color: 'white', border: 'none', borderRadius: '8px',
                            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
                          }}>✅ Valider</button>
                        )}
                        {u.statut === 'ACTIF' && (
                          <button onClick={() => bloquer(u.id)} style={{
                            padding: '6px 12px', background: '#f0a500',
                            color: 'white', border: 'none', borderRadius: '8px',
                            cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
                          }}>🔒 Bloquer</button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}