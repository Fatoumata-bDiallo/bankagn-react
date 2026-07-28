import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function Fraudes() {
  const [alertes, setAlertes] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/admin/fraudes`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setAlertes(Array.isArray(res.data) ? res.data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const nonResolues = alertes.filter(a => !a.resolu).length

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/fraudes" />

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
              🚨 Alertes Fraude
            </h4>
            <small style={{ color: '#6c757d' }}>
              Surveillance des activités suspectes
            </small>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {nonResolues > 0 && (
              <span style={{
                background: '#fee2e2', color: '#dc2626',
                padding: '6px 14px', borderRadius: '20px',
                fontSize: '0.85rem', fontWeight: 600
              }}>
                🚨 {nonResolues} non résolues
              </span>
            )}
            <span style={{
              background: '#f3e8ff', color: '#7c3aed',
              padding: '6px 14px', borderRadius: '20px',
              fontSize: '0.85rem', fontWeight: 600
            }}>
              {alertes.length} total
            </span>
          </div>
        </div>

        {nonResolues > 0 && (
          <div style={{
            background: '#fee2e2', border: '2px solid #dc2626',
            borderRadius: '15px', padding: '15px 20px',
            marginBottom: '20px', display: 'flex',
            alignItems: 'center', gap: '15px'
          }}>
            <span style={{ fontSize: '2rem' }}>🚨</span>
            <div>
              <div style={{ fontWeight: 700, color: '#dc2626' }}>
                {nonResolues} alerte(s) de fraude non résolue(s) !
              </div>
              <small style={{ color: '#6c757d' }}>
                Veuillez examiner et résoudre ces alertes.
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
          ) : alertes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>✅</div>
              <p style={{ color: '#16a34a', fontWeight: 600 }}>
                Aucune alerte de fraude !
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Type', 'Client', 'Niveau', 'Statut', 'Résolu', 'Date'].map(h => (
                    <th key={h} style={{
                      background: '#1a3c5e', color: 'white',
                      padding: '12px', textAlign: 'left', fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {alertes.map((a, i) => (
                  <tr key={a.id} style={{
                    background: !a.resolu ? '#fff5f5' :
                      i % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <td style={{
                      padding: '12px', fontWeight: 600,
                      color: '#1a3c5e'
                    }}>
                      {a.typeAlerte}
                    </td>
                    <td style={{ padding: '12px' }}>{a.client}</td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: a.niveau === 'ELEVE' ? '#fee2e2' :
                          a.niveau === 'MOYEN' ? '#fef3c7' : '#dcfce7',
                        color: a.niveau === 'ELEVE' ? '#dc2626' :
                          a.niveau === 'MOYEN' ? '#d97706' : '#16a34a'
                      }}>{a.niveau}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: '#dbeafe', color: '#2563eb'
                      }}>{a.statut}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: a.resolu ? '#dcfce7' : '#fee2e2',
                        color: a.resolu ? '#16a34a' : '#dc2626'
                      }}>
                        {a.resolu ? '✅ Oui' : '❌ Non'}
                      </span>
                    </td>
                    <td style={{
                      padding: '12px', color: '#6c757d',
                      fontSize: '0.85rem'
                    }}>
                      {a.dateAlerte ?
                        new Date(a.dateAlerte).toLocaleDateString('fr-FR', {
                          day: '2-digit', month: '2-digit',
                          year: 'numeric'
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