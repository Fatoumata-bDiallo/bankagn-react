import { useState, useEffect } from 'react'
import axios from 'axios'
import ClientSidebar from '../../components/ClientSidebar'

const API = import.meta.env.VITE_API_URL || 'https://bankagn-production.up.railway.app'

const ICONES = {
  DEPOT: '⬇️', RETRAIT: '⬆️', TRANSFERT: '🔁',
  PRET: '💰', CONNEXION: '🔐', ALERTE: '🚨', SYSTEME: '⚙️'
}

export default function ClientNotifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`${API}/api/client/notifications`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      setNotifications(res.data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/notifications" />
      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{ background: 'white', borderRadius: '15px', padding: '20px 25px', marginBottom: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>🔔 Notifications</h4>
        </div>

        <div style={{ background: 'white', borderRadius: '15px', padding: '25px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)' }}>
          {loading ? (
            <p style={{ textAlign: 'center', color: '#6c757d' }}>Chargement...</p>
          ) : notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '10px' }}>🔔</div>
              <p style={{ color: '#6c757d' }}>Aucune notification</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '10px' }}>
              {notifications.map(n => (
                <div key={n.id} style={{
                  display: 'flex', gap: '15px', padding: '15px',
                  background: n.lu ? '#f8f9fa' : '#fff7ed',
                  borderLeft: n.lu ? '4px solid transparent' : '4px solid #f0a500',
                  borderRadius: '10px'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{ICONES[n.type] || '🔔'}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#1a3c5e' }}>{n.titre}</div>
                    <div style={{ color: '#6c757d', fontSize: '0.9rem', marginTop: '3px' }}>{n.message}</div>
                    <div style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '5px' }}>
                      {n.dateCreation ? new Date(n.dateCreation).toLocaleString('fr-FR') : ''}
                    </div>
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