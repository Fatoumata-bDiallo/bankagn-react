import { useState } from 'react'
import ClientSidebar from '../../components/ClientSidebar'

const API = 'https://bankagn-production.up.railway.app'

export default function ClientReleve() {

  const telechargerReleve = () => {
    window.open(`${API}/client/releve/telecharger`, '_blank')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex' }}>
      <ClientSidebar active="/client/releve" />

      <div style={{ marginLeft: '260px', padding: '30px', flex: 1 }}>
        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '20px 25px', marginBottom: '25px',
          boxShadow: '0 2px 15px rgba(0,0,0,0.05)'
        }}>
          <h4 style={{ margin: 0, color: '#1a3c5e', fontWeight: 700 }}>
            📄 Relevé de Compte
          </h4>
        </div>

        <div style={{
          background: 'white', borderRadius: '15px',
          padding: '50px', boxShadow: '0 2px 15px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📄</div>
          <h3 style={{ color: '#1a3c5e', marginBottom: '10px' }}>
            Télécharger votre relevé bancaire
          </h3>
          <p style={{ color: '#6c757d', marginBottom: '30px' }}>
            Votre relevé PDF contient toutes vos transactions
            avec un QR Code de vérification.
          </p>
          <button
            onClick={telechargerReleve}
            style={{
              padding: '15px 35px',
              background: 'linear-gradient(135deg, #1a3c5e, #f0a500)',
              color: 'white', border: 'none',
              borderRadius: '25px', fontWeight: 700,
              fontSize: '1rem', cursor: 'pointer'
            }}>
            📥 Télécharger mon relevé PDF
          </button>
          <p style={{
            color: '#6c757d', fontSize: '0.85rem',
            marginTop: '20px'
          }}>
            Le relevé inclut un QR Code pour vérifier son authenticité
          </p>
        </div>
      </div>
    </div>
  )
}