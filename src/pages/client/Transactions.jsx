import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
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
                  {['Référence', 'Type', 'Montant', 'Statut', 'Date'].map(h => (
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