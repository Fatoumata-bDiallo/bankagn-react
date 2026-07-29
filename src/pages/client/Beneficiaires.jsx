import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function ClientBeneficiaires() {
  const [beneficiaires, setBeneficiaires] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ nom: '', numeroCompte: '', telephone: '', description: '' })
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const token = localStorage.getItem('token')

  const charger = () => {
    axios.get(`${API}/api/client/beneficiaires`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => { setBeneficiaires(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { charger() }, [])

  const ajouter = async () => {
    if (!form.nom || !form.numeroCompte) {
      setMsg({ type: 'error', text: 'Nom et numéro de compte requis.' }); return
    }
    setSubmitting(true); setMsg(null)
    try {
      const res = await axios.post(`${API}/api/client/beneficiaires/ajouter`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMsg({ type: 'success', text: res.data.message })
      setForm({ nom: '', numeroCompte: '', telephone: '', description: '' })
      charger()
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Erreur.' })
    } finally { setSubmitting(false) }
  }

  const supprimer = async (id) => {
    try {
      await axios.delete(`${API}/api/client/beneficiaires/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      charger()
    } catch (err) { console.error(err) }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/beneficiaires" />
      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px 25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>👥 Mes Bénéficiaires</h4>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '20px' }}>➕ Ajouter un bénéficiaire</h5>
          {msg && (
            <div style={{ padding: '12px', borderRadius: '10px', marginBottom: '15px', fontWeight: 600, background: msg.type === 'success' ? '#dcfce7' : '#fee2e2', color: msg.type === 'success' ? '#16a34a' : '#dc2626' }}>
              {msg.text}
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Nom</label>
              <input value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Numéro de compte</label>
              <input value={form.numeroCompte} onChange={e => setForm({ ...form, numeroCompte: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Téléphone (optionnel)</label>
              <input value={form.telephone} onChange={e => setForm({ ...form, telephone: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Description (optionnel)</label>
              <input value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>
          </div>
          <button onClick={ajouter} disabled={submitting} style={{
            padding: '12px 30px', background: submitting ? '#94a3b8' : 'linear-gradient(135deg, #1a3c5e, #f0a500)',
            color: 'white', border: 'none', borderRadius: '25px', fontWeight: 700, cursor: submitting ? 'not-allowed' : 'pointer'
          }}>{submitting ? 'Ajout...' : '➕ Ajouter'}</button>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '15px' }}>📋 Liste</h5>
          {loading ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
            : beneficiaires.length === 0 ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Aucun bénéficiaire</p>
            : (
              <div style={{ display: 'grid', gap: '12px' }}>
                {beneficiaires.map(b => (
                  <div key={b.id} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '15px', background: '#f8f9fa', borderRadius: '12px'
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#1a3c5e' }}>{b.nom}</div>
                      <div style={{ fontSize: '0.85rem', color: '#6c757d', fontFamily: 'monospace' }}>{b.numeroCompte}</div>
                      {b.telephone && <div style={{ fontSize: '0.8rem', color: '#6c757d' }}>📱 {b.telephone}</div>}
                    </div>
                    <button onClick={() => supprimer(b.id)} style={{
                      padding: '8px 14px', background: '#fee2e2', color: '#dc2626',
                      border: 'none', borderRadius: '10px', fontWeight: 600, cursor: 'pointer'
                    }}>🗑️ Supprimer</button>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}