import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import OTP from './pages/OTP'
import AdminDashboard from './pages/admin/Dashboard'
import AdminUtilisateurs from './pages/admin/Utilisateurs'
import AdminComptes from './pages/admin/Comptes'
import AdminTransactions from './pages/admin/Transactions'
import AdminPrets from './pages/admin/Prets'
import AdminFraudes from './pages/admin/Fraudes'
import AdminAudit from './pages/admin/Audit'
import AdminDevises from './pages/admin/Devises'
import AdminRapports from './pages/admin/Rapports'
import ClientDashboard from './pages/client/Dashboard'
import ClientOperations from './pages/client/Operations'
import ClientTransactions from './pages/client/Transactions'
import ClientReleve from './pages/client/Releve'
import ClientPrets from './pages/client/Prets'
import ClientCartes from './pages/client/Cartes'
import ClientBeneficiaires from './pages/client/Beneficiaires'
import ClientDevises from './pages/client/Devises'
import ClientNotifications from './pages/client/Notifications'
import ClientProfil from './pages/client/Profil'
import MotDePasseOublie from './pages/MotDePasseOublie'
import Reinitialiser from './pages/Reinitialiser'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/utilisateurs" element={<AdminUtilisateurs />} />
        <Route path="/admin/comptes" element={<AdminComptes />} />
        <Route path="/admin/transactions" element={<AdminTransactions />} />
        <Route path="/admin/prets" element={<AdminPrets />} />
        <Route path="/admin/fraudes" element={<AdminFraudes />} />
        <Route path="/admin/audit" element={<AdminAudit />} />
        <Route path="/admin/devises" element={<AdminDevises />} />
        <Route path="/admin/rapports" element={<AdminRapports />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/operations" element={<ClientOperations />} />
        <Route path="/client/transactions" element={<ClientTransactions />} />
        <Route path="/client/releve" element={<ClientReleve />} />
        <Route path="/client/prets" element={<ClientPrets />} />
        <Route path="/client/cartes" element={<ClientCartes />} />
        <Route path="/client/beneficiaires" element={<ClientBeneficiaires />} />
        <Route path="/client/devises" element={<ClientDevises />} />
        <Route path="/client/notifications" element={<ClientNotifications />} />
        <Route path="/client/profil" element={<ClientProfil />} />
        <Route path="/mot-de-passe-oublie" element={<MotDePasseOublie />} />
        <Route path="/reinitialiser/:token" element={<Reinitialiser />} />
      </Routes>
    </Router>
  )
}

export default App