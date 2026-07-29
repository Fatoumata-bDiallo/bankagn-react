import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function ClientTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [qrVisible, setQrVisible] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/client/transactions`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTransactions(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/transactions" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            💸 Mes Transactions
          </h4>
        </div>

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
          ) : transactions.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>
              Aucune transaction
            </p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Référence', 'Type', 'Montant', 'Statut', 'Date', 'QR'].map(h => (
                    <th key={h} style={{
                      background: '#f8f9fa', color: '#1a3c5e',
                      padding: '12px', textAlign: 'left',
                      fontWeight: 600, borderBottom: '2px solid #e9ecef'
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map((t, i) => (
                  <tr key={t.id} style={{
                    background: i % 2 === 0 ? 'white' : '#f8f9fa'
                  }}>
                    <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>
                      {t.reference}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: t.type === 'DEPOT' ? '#dcfce7' :
                          t.type === 'RETRAIT' ? '#fee2e2' : '#dbeafe',
                        color: t.type === 'DEPOT' ? '#16a34a' :
                          t.type === 'RETRAIT' ? '#dc2626' : '#2563eb'
                      }}>{t.type}</span>
                    </td>
                    <td style={{
                      padding: '12px', fontWeight: 600,
                      color: t.type === 'DEPOT' ? '#16a34a' : '#dc2626'
                    }}>
                      {t.type === 'DEPOT' ? '+' : '-'}
                      {Number(t.montant).toLocaleString('fr-FR')} GNF
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: t.statut === 'SUCCES' ? '#dcfce7' : '#fee2e2',
                        color: t.statut === 'SUCCES' ? '#16a34a' : '#dc2626'
                      }}>{t.statut}</span>
                    </td>
                    <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>
                      {t.dateTransaction ?
                        new Date(t.dateTransaction).toLocaleDateString('fr-FR') : '-'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      {t.qrCode && (
                        <button onClick={() => setQrVisible(t.id === qrVisible ? null : t.id)} style={{
                          padding: '6px 10px', background: '#f0a500', color: 'white',
                          border: 'none', borderRadius: '8px', fontSize: '0.75rem',
                          fontWeight: 600, cursor: 'pointer'
                        }}>
                          {qrVisible === t.id ? '✕ Fermer' : '📱 Voir'}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {qrVisible && (
          <div onClick={() => setQrVisible(null)} style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.6)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div onClick={e => e.stopPropagation()} style={{
              background: 'white', borderRadius: '20px', padding: '30px',
              textAlign: 'center', boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
            }}>
              <h5 style={{ color: '#1a3c5e', marginBottom: '15px' }}>QR Code de la transaction</h5>
              <img
                src={`data:image/png;base64,${transactions.find(t => t.id === qrVisible)?.qrCode}`}
                alt="QR Code"
                style={{ width: '200px', height: '200px' }}
              />
              <p style={{ color: '#6c757d', fontSize: '0.8rem', marginTop: '15px' }}>
                Scannez pour vérifier l'authenticité de la transaction
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}