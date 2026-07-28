import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Comptes() {
  const [comptes, setComptes] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/admin/comptes`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setComptes(Array.isArray(res.data) ? res.data : [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/comptes" />

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
              🏦 Gestion des Comptes
            </h4>
            <small style={{ color: '#6c757d' }}>
              Tous les comptes bancaires
            </small>
          </div>
          <span style={{
            background: '#dbeafe', color: '#2563eb',
            padding: '6px 14px', borderRadius: '20px',
            fontSize: '0.85rem', fontWeight: 600
          }}>
            {comptes.length} comptes
          </span>
        </div>

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          overflowX: 'auto'
        }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p style={{ color: '#6c757d' }}>Chargement...</p>
            </div>
          ) : comptes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🏦</div>
              <p style={{ color: '#6c757d' }}>Aucun compte bancaire</p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {['Numéro de Compte', 'Client', 'Type', 'Solde', 'Statut', 'Date'].map(h => (
                    <th key={h} style={{
                      background: '#1a3c5e', color: 'white',
                      padding: '12px', textAlign: 'left', fontWeight: 600
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comptes.map((c, i) => (
                  <tr key={c.id} style={{
                    background: i % 2 === 0 ? 'white' : '#f8f9fa',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <td style={{
                      padding: '12px', fontWeight: 600,
                      color: '#1a3c5e', fontFamily: 'monospace'
                    }}>
                      {c.numeroCompte}
                    </td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>
                      {c.client}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: '#dbeafe', color: '#2563eb'
                      }}>{c.type}</span>
                    </td>
                    <td style={{
                      padding: '12px', fontWeight: 700,
                      color: '#16a34a', fontSize: '1rem'
                    }}>
                      {Number(c.solde).toLocaleString('fr-FR')} GNF
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '20px',
                        fontSize: '0.8rem', fontWeight: 600,
                        background: c.statut === 'ACTIF' ? '#dcfce7' : '#fee2e2',
                        color: c.statut === 'ACTIF' ? '#16a34a' : '#dc2626'
                      }}>{c.statut}</span>
                    </td>
                    <td style={{
                      padding: '12px', color: '#6c757d',
                      fontSize: '0.85rem'
                    }}>
                      {c.dateCreation ?
                        new Date(c.dateCreation).toLocaleDateString('fr-FR') : '-'}
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