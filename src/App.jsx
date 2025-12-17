import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"

// Layouts
import AppLayout from "./Layouts/AppLayout"

// Pages
import Dashboard from "./Pages/Dashboard/Dashboard"
import Trend from "./Pages/Dashboard/Trend"
import AdvancedDashboard from "./Pages/Dashboard/AdvancedDashboard"


import Departement from "./Pages/Departement/Departement"
import Schdule from "./Pages/Schedule/Schedule"
import SchduleMobile from "./Pages/Schedule/Schedule-mobile"

import ProductionAudit from "./Pages/ProductionAudit/ProductionAudit"
import ProductionAuditCreate from "./Pages/ProductionAudit/Create"
import ProductionAuditCreateWarehouse from "./Pages/ProductionAudit/CreateWarehouse"
import ProductionAuditEdit from "./Pages/ProductionAudit/Edit"
import ProductionAuditPreview from "./Pages/ProductionAudit/Preview"

import NonProductionAudit from "./Pages/NonProductionAudit/NonProductionAudit"
import NonProductionAuditCreate from "./Pages/NonProductionAudit/Create"
import NonProductionAuditEdit from "./Pages/NonProductionAudit/Edit" // Updated import path
import NonProductionAuditPreview from "./Pages/NonProductionAudit/Preview" // Updated import path

// Styles
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "@mantine/notifications/styles.css"
import "@mantine/charts/styles.css"

function App() {
  return (
    <MantineProvider>
      <Notifications />
      <BrowserRouter>
        <Routes>
          {/* Routes WITHOUT AppLayout (no navbar) */}
          <Route path="/6S/non-production-audit/create" element={<NonProductionAuditCreate />} />
          <Route path="/6S/production-audit/create" element={<ProductionAuditCreate />} />
          <Route path="/6S/production-audit/createwarehouse" element={<ProductionAuditCreateWarehouse />} />
          <Route path="/6S/schedule/mobile" element={<SchduleMobile />} />

          {/* Routes WITH AppLayout (navbar) */}
          <Route element={<AppLayout />}>
            {/* Dashboard */}
            <Route path="/6S/dashboard" element={<Dashboard />} />
            <Route path="/6S/trend" element={<Trend />} />
            <Route path="/6S/advanced-dashboard" element={<AdvancedDashboard />} />

            {/* Departement Routes */}
            <Route path="/6S/departement" element={<Departement />} />

            {/* Schedule Routes */}
            <Route path="/6S/schedule" element={<Schdule />} />

            {/* Production Audit Routes */}
            <Route path="/6S/production-audit" element={<ProductionAudit />} />
            <Route path="/6S/production-audit/edit/:id" element={<ProductionAuditEdit />} />
            <Route path="/6S/production-audit/preview/:id" element={<ProductionAuditPreview />} />

            {/* Non Production Audit Routes */}
            <Route path="/6S/non-production-audit" element={<NonProductionAudit />} />
            <Route path="/6S/non-production-audit/edit/:id" element={<NonProductionAuditEdit />} />
            <Route path="/6S/non-production-audit/preview/:id" element={<NonProductionAuditPreview />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
