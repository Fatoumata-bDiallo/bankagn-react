import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientCartes() {
  const [cartes, setCartes] = useState([])
  const [comptes, setComptes] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ type: 'VISA', compteId: '' })
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const token = localStorage.getItem('token')

  const charger = () => {
    axios.get(`${API}/api/client/cartes`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => { setCartes(res.data); setLoading(false) })
      .catch(() => setLoading(false))
    axios.get(`${API}/api/client/dashboard`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const c = res.data.comptes || []
        setComptes(c)
        if (c.length > 0) setForm(f => ({ ...f, compteId: c[0].id }))
      }).catch(() => {})
  }

  useEffect(() => { charger() }, [])

  const soumettre = async () => {
    if (!form.compteId) { setMsg({ type: 'error', text: 'Sélectionnez un compte.' }); return }
    setSubmitting(true); setMsg(null)
    try {
      const res = await axios.post(`${API}/api/client/cartes/demander`,
        { type: form.type, compteId: form.compteId },
        { headers: { Authorization: `Bearer ${token}` } })
      setMsg({ type: 'success', text: res.data.message })
      charger()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Erreur.' })
    } finally { setSubmitting(false) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/cartes" />
      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px 25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>💳 Mes Cartes Bancaires</h4>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '20px' }}>💳 Créer une carte</h5>
          {msg && (
            <div style={{ padding: '12px', borderRadius: '10px', marginBottom: '15px', fontWeight: 600, background: msg.type === 'success' ? '#dcfce7' : '#fee2e2', color: msg.type === 'success' ? '#16a34a' : '#dc2626' }}>
              {msg.text}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Type de carte</label>
              <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box', fontSize: '0.95rem' }}>
                <option value="VISA">VISA</option>
                <option value="MASTERCARD">MASTERCARD</option>
                <option value="VIRTUELLE">VIRTUELLE</option>
              </select>
            </div>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Compte lié</label>
              <select value={form.compteId} onChange={e => setForm({ ...form, compteId: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box', fontSize: '0.95rem' }}>
                {comptes.map(c => (
                  <option key={c.id} value={c.id}>{c.type} — {c.numeroCompte}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={soumettre} disabled={submitting} style={{
            padding: '12px 30px', background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #1a3c5e, #f0a500)',
            color: 'white', border: 'none', borderRadius: '25px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer'
          }}>
            {submitting ? 'Création...' : '💳 Créer ma carte'}
          </button>
          <p style={{ color: '#6c757d', fontSize: '0.82rem', marginTop: '10px' }}>Plafond : 2 000 000 GNF — Valable 3 ans</p>
        </div>

        {loading ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
          : cartes.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '15px', padding: '30px', textAlign: 'center', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
              <p style={{ color: '#6c757d' }}>Aucune carte — créez-en une ci-dessus.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              {cartes.map(carte => (
                <div key={carte.id} style={{ background: 'linear-gradient(135deg, #1a3c5e, #2d6a9f)', borderRadius: '20px', padding: '30px', color: 'white' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                    <div><div style={{ fontSize: '0.8rem', opacity: 0.7 }}>BankaGN</div><div style={{ fontWeight: 700 }}>{carte.type}</div></div>
                    <div style={{ fontSize: '1.5rem' }}>💳</div>
                  </div>
                  <div style={{ fontSize: '1.1rem', letterSpacing: '3px', marginBottom: '20px', fontWeight: 600 }}>
                    {carte.numeroCarte?.replace(/(.{4})/g, '$1 ').trim()}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.7rem', opacity: 0.7 }}>EXPIRE</div>
                      <div style={{ fontSize: '0.9rem' }}>{carte.dateExpiration ? new Date(carte.dateExpiration).toLocaleDateString('fr-FR', { month: '2-digit', year: '2-digit' }) : '-'}</div>
                    </div>
                    <span style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, background: carte.statut === 'ACTIVE' ? 'rgba(22,163,74,0.3)' : 'rgba(220,38,38,0.3)', color: carte.statut === 'ACTIVE' ? '#4ade80' : '#f87171' }}>{carte.statut}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  )
}