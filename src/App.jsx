import { Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout.jsx'
import { DashboardLayout } from './layouts/DashboardLayout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CustomersPage } from './pages/CustomersPage.jsx'
import { CustomerDetailsPage } from './pages/CustomerDetailsPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { DashboardCustomersPage } from './pages/dashboard/DashboardCustomersPage.jsx'
import { PlaceholderPage } from './pages/dashboard/PlaceholderPage.jsx'
import { ContactPage } from './pages/ContactPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="customers" element={<CustomersPage />} />
        <Route path="customers/:id" element={<CustomerDetailsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>

      <Route path="dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="customers" element={<DashboardCustomersPage />} />
        <Route path="leads" element={<PlaceholderPage title="Leads" />} />
        <Route path="deals" element={<PlaceholderPage title="Deals" />} />
        <Route path="tasks" element={<PlaceholderPage title="Tasks" />} />
        <Route path="reports" element={<PlaceholderPage title="Reports" />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" />} />
      </Route>
    </Routes>
  )
}

export default App
