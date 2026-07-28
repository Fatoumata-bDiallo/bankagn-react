import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Prets() {
  const [prets, setPrets] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetchPrets()
  }, [])

  const fetchPrets = async () => {
    try {
      const res = await axios.get(`${API}/api/admin/prets`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPrets(Array.isArray(res.data) ? res.data : [])
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/prets" />

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
              💰 Gestion des Prêts
            </h4>
            <small style={{ color: '#6c757d' }}>
              Toutes les demandes de prêt
            </small>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span style={{
              background: '#fef3c7', color: '#d97706',
              padding: '6px 14px', borderRadius: '20px',
              fontSize: '0.85rem', fontWeight: 600
            }}>
              ⏳ {prets.filter(p => p.statut === 'EN_ATTENTE').length} en attente
            </span>
            <span style={{
              background: '#dcfce7', color: '#16a34a',
              padding: '6px 14px', borderRadius: '20px',
              fontSize: '0.85rem', fontWeight: 600
            }}>
              {prets.length} total
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

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#6c757d' }}>Chargement...</p>
            </div>
          ) : prets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>💰</div>
              <p style={{ color: '#6c757d' }}>Aucun prêt</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Référence', 'Client', 'Montant', 'Statut', 'Date'].map(h => (
                    <th key={h} style={{
                      background: '#1a3c5e', color: 'white',
                      padding: '12px', textAlign: 'left', fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prets.map((p, i) => (
                  <tr key={p.id} style={{
                    background: i % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <td style={{
                      padding: '12px', color: '#6c757d',
                      fontSize: '0.8rem', fontFamily: 'monospace'
                    }}>
                      {p.reference}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>
                      {p.client}
                    </td>
                    <td style={{
                      padding: '12px', fontWeight: 700,
                      color: '#1a3c5e', fontSize: '1rem'
                    }}>
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
                    <td style={{
                      padding: '12px', color: '#6c757d',
                      fontSize: '0.85rem'
                    }}>
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