import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function Rapports() {
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')
  const dateGeneration = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

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
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-area { margin-left: 0 !important; padding: 0 !important; }
          body { background: white !important; }
          .stat-card-print {
            background: white !important;
            color: #1a3c5e !important;
            border: 1px solid #1a3c5e !important;
          }
        }
      `}</style>

      <div className="no-print">
        <AdminSidebar active="/admin/rapports" />
      </div>

      <div className="print-area" style={{ marginLeft: '260px', padding: '30px', flex: 1, maxWidth: '900px' }}>

        <div className="no-print" style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            📊 Rapport Bancaire Officiel
          </h4>
          <button onClick={() => window.print()} style={{
            padding: '10px 20px', background: '#dc2626', color: 'white',
            border: 'none', borderRadius: '25px', fontWeight: 600,
            fontSize: '0.9rem', cursor: 'pointer'
          }}>🖨️ Imprimer / PDF</button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
        ) : (
          <div style={{
            background: 'white', borderRadius: '15px', padding: '40px',
            boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
          }}>

            {/* En-tête officiel */}
            <div style={{ textAlign: 'center', borderBottom: '3px solid #1a3c5e', paddingBottom: '20px', marginBottom: '30px' }}>
              <h1 style={{ margin: 0 }}>
                <span style={{ color: '#1a3c5e', fontWeight: 900, fontSize: '2rem' }}>Banka</span>
                <span style={{ color: '#f0a500', fontWeight: 900, fontSize: '2rem' }}>GN</span>
              </h1>
              <p style={{ color: '#6c757d', margin: '5px 0 0', fontSize: '0.9rem' }}>
                Votre Banque Numérique en Guinée
              </p>
              <h3 style={{ color: '#1a3c5e', marginTop: '20px', marginBottom: '5px' }}>
                RAPPORT BANCAIRE OFFICIEL
              </h3>
              <p style={{ color: '#6c757d', fontSize: '0.85rem', margin: 0 }}>
                Généré le {dateGeneration}
              </p>
            </div>

            {/* Vue d'ensemble */}
            <h5 style={{ color: '#1a3c5e', marginBottom: '15px', borderBottom: '1px solid #e9ecef', paddingBottom: '8px' }}>
              I. Vue d'ensemble
            </h5>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <tbody>
                {[
                  { label: 'Total clients', value: stats.totalClients },
                  { label: 'Clients actifs', value: stats.clientsActifs },
                  { label: 'Clients en attente de validation', value: stats.enAttente },
                  { label: 'Total comptes bancaires', value: stats.totalComptes },
                  { label: 'Total transactions', value: stats.totalTransactions },
                  { label: 'Alertes de fraude non résolues', value: stats.alertesNonResolues },
                ].map(row => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px 0', color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700, color: '#1a3c5e' }}>
                      {row.value ?? 0}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mouvements financiers */}
            <h5 style={{ color: '#1a3c5e', marginBottom: '15px', borderBottom: '1px solid #e9ecef', paddingBottom: '8px' }}>
              II. Mouvements financiers (GNF)
            </h5>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
              <tbody>
                {[
                  { label: 'Total des dépôts', value: stats.totalDepots, color: '#16a34a' },
                  { label: 'Total des retraits', value: stats.totalRetraits, color: '#dc2626' },
                  { label: 'Total des transferts', value: stats.totalTransferts, color: '#2563eb' },
                  { label: 'Solde total (tous comptes)', value: stats.totalSoldes, color: '#1a3c5e' },
                ].map(row => (
                  <tr key={row.label} style={{ borderBottom: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '10px 0', color: '#374151' }}>{row.label}</td>
                    <td style={{ padding: '10px 0', textAlign: 'right', fontWeight: 700, color: row.color }}>
                      {Number(row.value ?? 0).toLocaleString('fr-FR')} GNF
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pied de page officiel */}
            <div style={{
              marginTop: '40px', paddingTop: '20px',
              borderTop: '1px solid #e9ecef', textAlign: 'center'
            }}>
              <p style={{ color: '#6c757d', fontSize: '0.75rem', margin: 0 }}>
                <strong>DOCUMENT CONFIDENTIEL</strong> — Ce rapport est établi par BankaGN
                et destiné exclusivement à l'usage interne.
              </p>
              <p style={{ color: '#6c757d', fontSize: '0.75rem', margin: '5px 0 0' }}>
                © BankaGN 2026 — ODC-Guinée
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}