import { useState, useEffect } from 'react'
import axios from 'axios'
import AdminSidebar from '../../components/AdminSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

export default function AdminDevises() {
  const [taux, setTaux] = useState([])
  const [loading, setLoading] = useState(true)
  const [edits, setEdits] = useState({})
  const [message, setMessage] = useState('')
  const token = localStorage.getItem('token')

  const charger = () => {
    axios.get(`${API}/api/admin/devises`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => { setTaux(res.data); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(() => { charger() }, [])

  const sauvegarder = async (id) => {
    const nouvelleValeur = edits[id]
    if (!nouvelleValeur) return
    try {
      const res = await axios.put(`${API}/api/admin/devises/${id}`,
        { tauxVersGNF: nouvelleValeur },
        { headers: { Authorization: `Bearer ${token}` } })
      setMessage(res.data.message)
      charger()
      setTimeout(() => setMessage(''), 3000)
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <AdminSidebar active="/admin/devises" />
      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px 25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>💱 Gestion des Devises</h4>
          <small style={{ color: '#6c757d' }}>Taux de change vers GNF</small>
        </div>

        {message && (
          <div style={{ background: '#dcfce7', border: '1px solid #16a34a', borderRadius: '10px', padding: '12px', marginBottom: '20px', color: '#16a34a', fontWeight: 600 }}>
            {message}
          </div>
        )}

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          {loading ? <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
            : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {['Devise', 'Nom', 'Taux actuel (GNF)', 'Nouveau taux', ''].map(h => (
                      <th key={h} style={{ background: '#1a3c5e', color: 'white', padding: '12px', textAlign: 'left', fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {taux.map((t, i) => (
                    <tr key={t.id} style={{ background: i % 2 === 0 ? 'white' : '#f8f9fa', borderBottom: '1px solid #e9ecef' }}>
                      <td style={{ padding: '12px', fontWeight: 700 }}>{t.drapeau} {t.code}</td>
                      <td style={{ padding: '12px', color: '#6c757d' }}>{t.nom}</td>
                      <td style={{ padding: '12px', fontWeight: 700, color: '#1a3c5e' }}>
                        {Number(t.tauxVersGNF).toLocaleString('fr-FR')}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <input
                          type="number"
                          placeholder={t.tauxVersGNF}
                          onChange={e => setEdits({ ...edits, [t.id]: e.target.value })}
                          style={{ width: '120px', padding: '8px', border: '2px solid #e9ecef', borderRadius: '8px' }}
                        />
                      </td>
                      <td style={{ padding: '12px' }}>
                        <button onClick={() => sauvegarder(t.id)} style={{
                          padding: '8px 16px', background: '#1a3c5e', color: 'white',
                          border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer'
                        }}>💾 Enregistrer</button>
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