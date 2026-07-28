import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Audit() {
  const [journaux, setJournaux] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/admin/audit`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setJournaux(Array.isArray(res.data) ? res.data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/audit" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            📋 Journal d'Audit
          </h4>
          <small style={{ color: '#6c757d' }}>
            Traçabilité de toutes les actions
          </small>
        </div>

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ color: '#6c757d' }}>Chargement...</div>
            </div>
          ) : journaux.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>📋</div>
              <p style={{ color: '#6c757d' }}>Aucun journal d'audit</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Action', 'Détails', 'Effectué par', 'Date'].map(h => (
                    <th key={h} style={{
                      background: '#1a3c5e', color: 'white',
                      padding: '12px', textAlign: 'left',
                      fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {journaux.map((j, i) => (
                  <tr key={j.id} style={{
                    background: i % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <td style={{
                      padding: '12px', fontWeight: 600,
                      color: '#1a3c5e'
                    }}>
                      {j.action}
                    </td>
                    <td style={{
                      padding: '12px', color: '#6c757d',
                      fontSize: '0.85rem'
                    }}>
                      {j.details}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: '#dbeafe', color: '#2563eb'
                      }}>
                        {j.effectuePar}
                      </span>
                    </td>
                    <td style={{
                      padding: '12px', color: '#6c757d',
                      fontSize: '0.85rem'
                    }}>
                      {j.dateAction ?
                        new Date(j.dateAction).toLocaleDateString('fr-FR', {
                          day: '2-digit', month: '2-digit',
                          year: 'numeric', hour: '2-digit',
                          minute: '2-digit'
                        }) : '-'}
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