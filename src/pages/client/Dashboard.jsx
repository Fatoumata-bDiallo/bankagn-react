import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientDashboard() {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(true)
  const [creation, setCreation] = useState(null)
  const [creationLoading, setCreationLoading] = useState(false)
  const token = localStorage.getItem('token')

  const charger = () => {
    setLoading(true)
    axios.get(`${API}/api/client/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setData(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { charger() }, [])

  const creerCompte = async (type) => {
    setCreationLoading(true)
    setCreation(null)
    try {
      const res = await axios.post(`${API}/api/client/comptes/creer`, { type }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCreation({ type: 'success', text: res.data.message })
      charger()
    } catch (err) {
      setCreation({ type: 'error', text: err.response?.data?.message || 'Erreur lors de la création.' })
    } finally {
      setCreationLoading(false)
    }
  }

  const comptes = data.comptes || []
  const aCourant = comptes.some(c => c.type === 'COURANT')
  const aEpargne = comptes.some(c => c.type === 'EPARGNE')

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/dashboard" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>🏠 Mon Dashboard</h4>
            <small style={{ color: '#6c757d' }}>Bienvenue, {data.prenom} {data.nom}</small>
          </div>
          {data.notificationsNonLues > 0 && (
            <span style={{
              background: '#dc2626', color: 'white',
              borderRadius: '20px', padding: '4px 12px',
              fontSize: '0.8rem', fontWeight: 700
            }}>🔔 {data.notificationsNonLues} notification(s)</span>
          )}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
        ) : (
          <>
            {comptes.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '15px', marginBottom: '25px'
              }}>
                {[
                  { label: 'Solde Total', value: data.soldeTotal, icon: '💰', color: '#1a3c5e' },
                  { label: 'Compte Courant', value: data.soldeCourant, icon: '🏦', color: '#2563eb' },
                  { label: 'Compte Épargne', value: data.soldeEpargne, icon: '📈', color: '#16a34a' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: 'white', borderRadius: '15px',
                    padding: '20px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                    borderLeft: `4px solid ${stat.color}`
                  }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{stat.icon}</div>
                    <div style={{ color: '#6c757d', fontSize: '0.8rem', marginBottom: '4px' }}>{stat.label}</div>
                    <div style={{ color: stat.color, fontWeight: 800, fontSize: '1.2rem' }}>
                      {Number(stat.value || 0).toLocaleString('fr-FR')} GNF
                    </div>
                  </div>
                ))}
              </div>
            )}

            {creation && (
              <div style={{
                padding: '12px 16px', borderRadius: '10px', marginBottom: '20px',
                fontWeight: 600, fontSize: '0.9rem',
                background: creation.type === 'success' ? '#dcfce7' : '#fee2e2',
                color: creation.type === 'success' ? '#16a34a' : '#dc2626'
              }}>
                {creation.text}
              </div>
            )}

            <div style={{ marginBottom: '25px' }}>
              <h5 style={{ color: '#1a3c5e', marginBottom: '15px' }}>🏦 Mes Comptes</h5>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '20px'
              }}>
                {comptes.map(compte => (
                  <div key={compte.id} style={{
                    background: 'linear-gradient(135deg, #1a3c5e, #2d6a9f)',
                    borderRadius: '20px', padding: '25px', color: 'white'
                  }}>
                    <div style={{ fontSize: '0.85rem', opacity: 0.8, marginBottom: '8px' }}>
                      {compte.type} — {compte.numeroCompte}
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '5px' }}>
                      {Number(compte.solde).toLocaleString('fr-FR')} GNF
                    </div>
                    <span style={{
                      display: 'inline-block',
                      background: 'rgba(240,165,0,0.3)',
                      color: '#f0a500', padding: '3px 10px',
                      borderRadius: '20px', fontSize: '0.75rem'
                    }}>{compte.statut}</span>
                  </div>
                ))}

                {!aCourant && (
                  <button onClick={() => creerCompte('COURANT')} disabled={creationLoading}
                    style={{
                      background: 'white', borderRadius: '20px', padding: '25px',
                      border: '2px dashed #2563eb', cursor: creationLoading ? 'not-allowed' : 'pointer',
                      color: '#2563eb', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center'
                    }}>
                    ➕ Créer un compte<br />COURANT
                  </button>
                )}
                {!aEpargne && (
                  <button onClick={() => creerCompte('EPARGNE')} disabled={creationLoading}
                    style={{
                      background: 'white', borderRadius: '20px', padding: '25px',
                      border: '2px dashed #16a34a', cursor: creationLoading ? 'not-allowed' : 'pointer',
                      color: '#16a34a', fontWeight: 700, fontSize: '0.95rem', textAlign: 'center'
                    }}>
                    ➕ Créer un compte<br />ÉPARGNE
                  </button>
                )}
              </div>
            </div>

            <div style={{
              background: 'white', borderRadius: '15px',
              padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
            }}>
              <h5 style={{ color: '#1a3c5e', marginBottom: '15px' }}>💸 Dernières Transactions</h5>
              {data.transactions && data.transactions.length > 0 ? (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      {['Type', 'Description', 'Montant', 'Date'].map(h => (
                        <th key={h} style={{
                          background: '#f8f9fa', color: '#1a3c5e',
                          padding: '10px', textAlign: 'left',
                          fontWeight: 600, borderBottom: '2px solid #e9ecef'
                        }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.transactions.map((t, i) => (
                      <tr key={t.id} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                        <td style={{ padding: '10px' }}>
                          <span style={{
                            padding: '4px 10px', borderRadius: '20px',
                            fontSize: '0.8rem', fontWeight: 600,
                            background: t.type === 'DEPOT' ? '#dcfce7' :
                              t.type === 'RETRAIT' ? '#fee2e2' : '#dbeafe',
                            color: t.type === 'DEPOT' ? '#16a34a' :
                              t.type === 'RETRAIT' ? '#dc2626' : '#2563eb'
                          }}>{t.type}</span>
                        </td>
                        <td style={{ padding: '10px', color: '#6c757d', fontSize: '0.85rem' }}>
                          {t.description || '-'}
                        </td>
                        <td style={{
                          padding: '10px', fontWeight: 600,
                          color: t.type === 'DEPOT' ? '#16a34a' : '#dc2626'
                        }}>
                          {t.type === 'DEPOT' ? '+' : '-'}{Number(t.montant).toLocaleString('fr-FR')} GNF
                        </td>
                        <td style={{ padding: '10px', color: '#6c757d', fontSize: '0.85rem' }}>
                          {t.dateTransaction ? new Date(t.dateTransaction).toLocaleDateString('fr-FR') : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p style={{ textAlign: 'center', color: '#6c757d' }}>Aucune transaction</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}