import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientCartes() {
  const [cartes, setCartes] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/client/cartes`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setCartes(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/cartes" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            💳 Mes Cartes Bancaires
          </h4>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
        ) : cartes.length === 0 ? (
          <div style={{
            background: 'white', borderRadius: '15px',
            padding: '50px', textAlign: 'center',
            boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💳</div>
            <p style={{ color: '#6c757d' }}>Aucune carte bancaire</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {cartes.map(carte => (
              <div key={carte.id} style={{
                background: 'linear-gradient(135deg, #1a3c5e, #2d6a9f)',
                borderRadius: '20px', padding: '30px', color: 'white',
                position: 'relative', overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute', top: '-30px', right: '-30px',
                  width: '120px', height: '120px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: '50%'
                }}></div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginBottom: '30px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>BankaGN</div>
                    <div style={{ fontWeight: 700 }}>{carte.type}</div>
                  </div>
                  <div style={{ fontSize: '1.5rem' }}>💳</div>
                </div>
                <div style={{
                  fontSize: '1.1rem', letterSpacing: '3px',
                  marginBottom: '20px', fontWeight: 600
                }}>
                  {carte.numeroCarte?.replace(/(.{4})/g, '$1 ').trim()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>EXPIRE</div>
                    <div style={{ fontSize: '0.9rem' }}>
                      {carte.dateExpiration ?
                        new Date(carte.dateExpiration).toLocaleDateString('fr-FR', {
                          month: '2-digit', year: '2-digit'
                        }) : '-'}
                    </div>
                  </div>
                  <div>
                    <span style={{
                      padding: '4px 12px', borderRadius: '20px',
                      fontSize: '0.8rem', fontWeight: 600,
                      background: carte.statut === 'ACTIVE' ?
                        'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.3)',
                      color: carte.statut === 'ACTIVE' ? '#4ade80' : '#f87171'
                    }}>{carte.statut}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}