import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

const TABS = [
  { key: 'depot', label: '⬇️ Dépôt', color: '#16a34a' },
  { key: 'retrait', label: '⬆️ Retrait', color: '#dc2626' },
  { key: 'transfert', label: '🔁 Transfert', color: '#2563eb' },
]

export default function ClientOperations() {
  const [tab, setTab] = useState('depot')
  const [comptes, setComptes] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  const [compteId, setCompteId] = useState('')
  const [numeroDestination, setNumeroDestination] = useState('')
  const [montant, setMontant] = useState('')
  const [description, setDescription] = useState('')

  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    axios.get(`${API}/api/client/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setComptes(res.data.comptes || [])
      if (res.data.comptes?.length > 0) {
        setCompteId(res.data.comptes[0].id)
      }
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const resetForm = () => {
    setNumeroDestination('')
    setMontant('')
    setDescription('')
  }

  const changerTab = (key) => {
    setTab(key)
    setMessage(null)
    resetForm()
  }

  const soumettre = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (!compteId) {
      setMessage({ type: 'error', text: 'Veuillez sélectionner un compte.' })
      return
    }
    if (!montant || Number(montant) <= 0) {
      setMessage({ type: 'error', text: 'Veuillez saisir un montant valide.' })
      return
    }
    if (tab === 'transfert' && !numeroDestination.trim()) {
      setMessage({ type: 'error', text: 'Veuillez saisir le numéro du compte destinataire.' })
      return
    }

    setSubmitting(true)
    try {
      let url = ''
      let payload = {}

      if (tab === 'depot') {
        url = `${API}/api/client/depot`
        payload = { compteId, montant, description }
      } else if (tab === 'retrait') {
        url = `${API}/api/client/retrait`
        payload = { compteId, montant, description }
      } else {
        url = `${API}/api/client/transfert`
        payload = { compteSourceId: compteId, numeroDestination, montant, description }
      }

      const res = await axios.post(url, payload, {
        headers: { Authorization: `Bearer ${token}` }
      })

      setMessage({ type: 'success', text: res.data.message || 'Opération réussie !' })
      resetForm()

      const dash = await axios.get(`${API}/api/client/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComptes(dash.data.comptes || [])
    } catch (err) {
      const text = err.response?.data?.message || 'Une erreur est survenue. Veuillez réessayer.'
      setMessage({ type: 'error', text })
    } finally {
      setSubmitting(false)
    }
  }

  const activeTab = TABS.find(t => t.key === tab)
  const compteSelectionne = comptes.find(c => String(c.id) === String(compteId))

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/operations" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1, maxWidth: '700px' }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            💼 Opérations bancaires
          </h4>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => changerTab(t.key)}
              style={{
                flex: 1, padding: '14px', borderRadius: '12px',
                border: 'none', cursor: 'pointer',
                fontWeight: 700, fontSize: '0.95rem',
                background: tab === t.key ? t.color : 'white',
                color: tab === t.key ? 'white' : '#1a3c5e',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                transition: 'all 0.2s'
              }}>
              {t.label}
            </button>
          ))}
        </div>

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
          ) : comptes.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>
              Aucun compte disponible.
            </p>
          ) : (
            <form onSubmit={soumettre}>
              <label style={{ display: 'block', marginBottom: '6px', color: '#1a3c5e', fontWeight: 600, fontSize: '0.9rem' }}>
                {tab === 'transfert' ? 'Compte source' : 'Compte'}
              </label>
              <select
                value={compteId}
                onChange={e => setCompteId(e.target.value)}
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', marginBottom: '16px',
                  fontSize: '0.95rem', color: '#1a3c5e'
                }}>
                {comptes.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.numeroCompte} — {Number(c.solde).toLocaleString('fr-FR')} GNF
                  </option>
                ))}
              </select>

              {compteSelectionne && (
                <div style={{
                  background: '#f0f9ff', borderRadius: '10px',
                  padding: '10px 14px', marginBottom: '16px',
                  fontSize: '0.85rem', color: '#0369a1'
                }}>
                  Solde disponible : <strong>{Number(compteSelectionne.solde).toLocaleString('fr-FR')} GNF</strong>
                </div>
              )}

              {tab === 'transfert' && (
                <>
                  <label style={{ display: 'block', marginBottom: '6px', color: '#1a3c5e', fontWeight: 600, fontSize: '0.9rem' }}>
                    Numéro du compte destinataire
                  </label>
                  <input
                    type="text"
                    value={numeroDestination}
                    onChange={e => setNumeroDestination(e.target.value)}
                    placeholder="Ex : CG-000123"
                    style={{
                      width: '100%', padding: '12px', borderRadius: '10px',
                      border: '1px solid #e2e8f0', marginBottom: '16px',
                      fontSize: '0.95rem', boxSizing: 'border-box'
                    }}
                  />
                </>
              )}

              <label style={{ display: 'block', marginBottom: '6px', color: '#1a3c5e', fontWeight: 600, fontSize: '0.9rem' }}>
                Montant (GNF)
              </label>
              <input
                type="number"
                min="1000"
                step="1"
                value={montant}
                onChange={e => setMontant(e.target.value)}
                placeholder="Ex : 50000"
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', marginBottom: '16px',
                  fontSize: '0.95rem', boxSizing: 'border-box'
                }}
              />

              <label style={{ display: 'block', marginBottom: '6px', color: '#1a3c5e', fontWeight: 600, fontSize: '0.9rem' }}>
                Description (optionnel)
              </label>
              <input
                type="text"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Ex : Paiement loyer"
                style={{
                  width: '100%', padding: '12px', borderRadius: '10px',
                  border: '1px solid #e2e8f0', marginBottom: '20px',
                  fontSize: '0.95rem', boxSizing: 'border-box'
                }}
              />

              {message && (
                <div style={{
                  padding: '12px 14px', borderRadius: '10px',
                  marginBottom: '16px', fontSize: '0.9rem', fontWeight: 600,
                  background: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                  color: message.type === 'success' ? '#16a34a' : '#dc2626'
                }}>
                  {message.type === 'success' ? '✅ ' : '⚠️ '}{message.text}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{
                  width: '100%', padding: '14px', borderRadius: '10px',
                  border: 'none', cursor: submitting ? 'not-allowed' : 'pointer',
                  fontWeight: 700, fontSize: '1rem', color: 'white',
                  background: submitting ? '#94a3b8' : activeTab.color,
                  transition: 'all 0.2s'
                }}>
                {submitting ? 'Traitement...' : `Confirmer le ${activeTab.label.replace(/^\S+\s/, '').toLowerCase()}`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}