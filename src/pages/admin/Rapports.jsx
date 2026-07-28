import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function Rapports() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/admin/rapports`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setStats(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/rapports" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            📊 Rapport Bancaire Officiel
          </h4>
          <a
            href={`${API}/admin/rapports`}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '10px 20px',
              background: '#dc2626',
              color: 'white',
              borderRadius: '25px',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem'
            }}>
            📄 Télécharger PDF
          </a>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
        ) : (
          <>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px', marginBottom: '25px'
            }}>
              {[
                { label: 'Total Clients', value: stats.totalClients, bg: 'linear-gradient(135deg, #1a3c5e, #2d6a9f)' },
                { label: 'Clients Actifs', value: stats.clientsActifs, bg: 'linear-gradient(135deg, #16a34a, #15803d)' },
                { label: 'Total Comptes', value: stats.totalComptes, bg: 'linear-gradient(135deg, #f0a500, #d97706)' },
                { label: 'Transactions', value: stats.totalTransactions, bg: 'linear-gradient(135deg, #7c3aed, #6d28d9)' },
              ].map(card => (
                <div key={card.label} style={{
                  background: card.bg, borderRadius: '15px',
                  padding: '25px', color: 'white'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 800 }}>
                    {card.value ?? 0}
                  </div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>
                    {card.label}
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px', marginBottom: '25px'
            }}>
              {[
                { label: '💰 Total Dépôts', value: stats.totalDepots, bg: '#dcfce7', color: '#16a34a', border: '#16a34a' },
                { label: '💸 Total Retraits', value: stats.totalRetraits, bg: '#fee2e2', color: '#dc2626', border: '#dc2626' },
                { label: '🔄 Total Transferts', value: stats.totalTransferts, bg: '#dbeafe', color: '#2563eb', border: '#2563eb' },
                { label: '🏦 Total Soldes', value: stats.totalSoldes, bg: '#fef3c7', color: '#d97706', border: '#f0a500' },
              ].map(card => (
                <div key={card.label} style={{
                  background: card.bg,
                  borderRadius: '15px', padding: '20px',
                  borderLeft: `5px solid ${card.border}`,
                  boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
                }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, color: card.color, marginBottom: '8px' }}>
                    {card.label}
                  </div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, color: card.color }}>
                    {Number(card.value ?? 0).toLocaleString('fr-FR')} GNF
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: 'white', borderRadius: '15px',
              padding: '20px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
              borderLeft: '4px solid #1a3c5e'
            }}>
              <small style={{ color: '#6c757d' }}>
                <strong>DOCUMENT CONFIDENTIEL</strong> —
                Ce rapport est établi par BankaGN et destiné
                exclusivement à l'usage interne.
                © BankaGN 2026 — ODC-Guinée
              </small>
            </div>
          </>
        )}
      </div>
    </div>
  )
}