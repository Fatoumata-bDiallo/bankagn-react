import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientPrets() {
  const [prets, setPrets] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ montant: '', dureeMois: '12', motif: '' })
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const token = localStorage.getItem('token')

  const charger = () => {
    axios.get(`${API}/api/client/prets`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => { setPrets(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { charger() }, [])

  const soumettre = async () => {
    if (!form.montant || Number(form.montant) <= 0) {
      setMsg({ type: 'error', text: 'Entrez un montant valide.' }); return
    }
    setSubmitting(true); setMsg(null)
    try {
      const res = await axios.post(`${API}/api/client/prets/demander`, {
        montant: form.montant, dureeMois: form.dureeMois, motif: form.motif
      }, { headers: { Authorization: `Bearer ${token}` } })
      setMsg({ type: 'success', text: res.data.message })
      setForm({ montant: '', dureeMois: '12', motif: '' })
      charger()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Erreur.' })
    } finally { setSubmitting(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/prets" />
      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px 25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>💰 Mes Prêts</h4>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '20px' }}>📋 Demander un prêt</h5>
          {msg && (
            <div style={{ padding: '12px', borderRadius: '10px', marginBottom: '15px', fontWeight: 600, background: msg.type === 'success' ? '#dcfce7' : '#fee2e2', color: msg.type === 'success' ? '#16a34a' : '#dc2626' }}>
              {msg.text}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Montant (GNF)</label>
              <input type="number" value={form.montant} onChange={e => setForm({ ...form, montant: e.target.value })}
                placeholder="Ex: 5000000" style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box', fontSize: '0.95rem' }} />
            </div>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Durée</label>
              <select value={form.dureeMois} onChange={e => setForm({ ...form, dureeMois: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box', fontSize: '0.95rem' }}>
                <option value="3">3 mois</option>
                <option value="6">6 mois</option>
                <option value="12">12 mois</option>
                <option value="24">24 mois</option>
                <option value="36">36 mois</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Motif</label>
            <textarea value={form.motif} onChange={e => setForm({ ...form, motif: e.target.value })}
              placeholder="Expliquez l'objet de votre demande..." rows={3}
              style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box', resize: 'vertical', fontSize: '0.95rem' }} />
          </div>
          <button onClick={soumettre} disabled={submitting} style={{
            padding: '12px 30px', background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #1a3c5e, #f0a500)',
            color: 'white', border: 'none', borderRadius: '25px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer'
          }}>
            {submitting ? 'Envoi...' : '📤 Envoyer la demande'}
          </button>
          <p style={{ color: '#6c757d', fontSize: '0.82rem', marginTop: '10px' }}>Taux : 8% — La demande sera examinée par l'administrateur.</p>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '15px' }}>📜 Historique des demandes</h5>
          {loading ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
            : prets.length === 0 ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Aucun prêt en cours</p>
            : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  {['Référence', 'Montant', 'Statut', 'Date'].map(h => (
                    <th key={h} style={{ background: '#f8f9fa', color: '#1a3c5e', padding: '12px', textAlign: 'left', fontWeight: 600, borderBottom: '2px solid #e9ecef' }}>{h}</th>
                  ))}
                </tr></thead>
                <tbody>
                  {prets.map((p, i) => (
                    <tr key={p.id} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa' }}>
                      <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>{p.reference}</td>
                      <td style={{ padding: '12px', fontWeight: 600, color: '#1a3c5e' }}>{Number(p.montant).toLocaleString('fr-FR')} GNF</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                          background: p.statut === 'ACCEPTE' ? '#dcfce7' : p.statut === 'EN_ATTENTE' ? '#fef3c7' : '#fee2e2',
                          color: p.statut === 'ACCEPTE' ? '#16a34a' : p.statut === 'EN_ATTENTE' ? '#d97706' : '#dc2626'
                        }}>{p.statut}</span>
                      </td>
                      <td style={{ padding: '12px', color: '#6c757d', fontSize: '0.85rem' }}>
                        {p.dateCreation ? new Date(p.dateCreation).toLocaleDateString('fr-FR') : '-'}
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