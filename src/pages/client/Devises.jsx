import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function ClientDevises() {
  const [taux, setTaux] = useState([])
  const [loading, setLoading] = useState(true)
  const [montant, setMontant] = useState('')
  const [source, setSource] = useState('USD')
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/client/devises`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setTaux(res.data)
      if (res.data.length > 0) setSource(res.data[0].code)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  const tauxSource = taux.find(t => t.code === source)
  const resultat = tauxSource && montant
    ? (Number(montant) * Number(tauxSource.tauxVersGNF)).toLocaleString('fr-FR', { maximumFractionDigits: 2 })
    : null

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/devises" />
      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px 25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>💱 Devises & Conversion</h4>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '20px' }}>🔄 Convertisseur</h5>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Montant</label>
              <input type="number" value={montant} onChange={e => setMontant(e.target.value)}
                placeholder="Ex: 100"
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ color: '#1a3c5e', fontWeight: 600, display: 'block', marginBottom: '6px' }}>Devise</label>
              <select value={source} onChange={e => setSource(e.target.value)}
                style={{ width: '100%', padding: '12px', border: '2px solid #e9ecef', borderRadius: '10px', boxSizing: 'border-box' }}>
                {taux.map(t => (
                  <option key={t.code} value={t.code}>{t.drapeau} {t.code} — {t.nom}</option>
                ))}
              </select>
            </div>
          </div>
          {resultat && (
            <div style={{
              padding: '20px', background: 'linear-gradient(135deg, #1a3c5e, #2d6a9f)',
              borderRadius: '12px', color: 'white', textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>{montant} {source} équivaut à</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{resultat} GNF</div>
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h5 style={{ color: '#1a3c5e', marginBottom: '15px' }}>📊 Taux du jour (1 unité → GNF)</h5>
          {loading ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
            : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                {taux.map(t => (
                  <div key={t.code} style={{
                    padding: '15px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem' }}>{t.drapeau}</div>
                    <div style={{ fontWeight: 700, color: '#1a3c5e' }}>{t.code}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6c757d' }}>{t.nom}</div>
                    <div style={{ fontWeight: 700, color: '#16a34a', marginTop: '5px' }}>
                      {Number(t.tauxVersGNF).toLocaleString('fr-FR')} GNF
                    </div>
                  </div>
                ))}
              </div>
            )}
        </div>
      </div>
    </div>
  )
}