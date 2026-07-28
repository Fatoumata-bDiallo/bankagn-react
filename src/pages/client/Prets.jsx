import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientPrets() {
  const [prets, setPrets] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/client/prets`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setPrets(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/prets" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            💰 Mes Prêts
          </h4>
        </div>

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
          ) : prets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>💰</div>
              <p style={{ color: '#6c757d' }}>Aucun prêt en cours</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Référence', 'Montant', 'Statut', 'Date'].map(h => (
                    <th key={h} style={{
                      background: '#f8f9fa', color: '#1a3c5e',
                      padding: '12px', textAlign: 'left',
                      fontWeight: 600, borderBottom: '2px solid #e9ecef'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prets.map((p, i) => (
                  <tr key={p.id} style={{
                    background: i % 2 === 0 ? 'white' : '#f8f9fa'
                  }}>
                    <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>
                      {p.reference}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600, color: '#1a3c5e' }}>
                      {Number(p.montant).toLocaleString('fr-FR')} GNF
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: p.statut === 'ACCEPTE' ? '#dcfce7' :
                          p.statut === 'EN_ATTENTE' ? '#fef3c7' : '#fee2e2',
                        color: p.statut === 'ACCEPTE' ? '#16a34a' :
                          p.statut === 'EN_ATTENTE' ? '#d97706' : '#dc2626'
                      }}>{p.statut}</span>
                    </td>
                    <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>
                      {p.dateCreation ?
                        new Date(p.dateCreation).toLocaleDateString('fr-FR') : '-'}
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