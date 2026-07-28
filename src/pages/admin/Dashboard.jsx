import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Dashboard() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const prenom = localStorage.getItem('prenom')
  const nom = localStorage.getItem('nom')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setStats(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const cards = [
    { label: 'Total Clients', value: stats.totalClients, bg: 'linear-gradient(135deg, #1a3c5e, #2d6a9f)' },
    { label: 'Clients Actifs', value: stats.clientsActifs, bg: 'linear-gradient(135deg, #16a34a, #15803d)' },
    { label: 'Total Comptes', value: stats.totalComptes, bg: 'linear-gradient(135deg, #f0a500, #d97706)' },
    { label: 'Transactions', value: stats.totalTransactions, bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/dashboard" />

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
              🏠 Dashboard Administrateur
            </h4>
            <small style={{ color: '#6c757d' }}>
              Bienvenue, {prenom} {nom}
            </small>
          </div>
          <span style={{
            background: '#f0a500', color: 'white',
            padding: '8px 16px', borderRadius: '20px',
            fontSize: '0.85rem', fontWeight: 600
          }}>ADMIN</span>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
        ) : (
          <>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px', marginBottom: '25px'
            }}>
              {cards.map(card => (
                <div key={card.label} style={{
                  background: card.bg, borderRadius: '15px',
                  padding: '25px', color: 'white'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {card.value ?? '...'}
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                    {card.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '20px', marginBottom: '25px'
            }}>
              <div style={{
                background: 'white', borderRadius: '15px',
                padding: '20px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem' }}>⏳</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#f0a500' }}>
                  {stats.enAttente ?? 0}
                </div>
                <div style={{ color: '#6c757d' }}>En attente</div>
              </div>
              <div style={{
                background: 'white', borderRadius: '15px',
                padding: '20px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem' }}>🚨</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#dc2626' }}>
                  {stats.alertesNonResolues ?? 0}
                </div>
                <div style={{ color: '#6c757d' }}>Alertes Fraude</div>
              </div>
              <div style={{
                background: 'white', borderRadius: '15px',
                padding: '20px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '2rem' }}>🏦</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a3c5e' }}>
                  {stats.totalSoldes ?? 0} GNF
                </div>
                <div style={{ color: '#6c757d' }}>Total Soldes</div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}