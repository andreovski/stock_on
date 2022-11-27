import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarDrawerProvider } from "../context/SidebarContext"

import { AdminLayout } from "../components/AdminLayout"

import Dashboard from "../pages/admin/Dashboard"
import { WorkersList } from "../pages/admin/Registers/Workers/WorkersList"
import { WorkersCreate } from "../pages/admin/Registers/Workers/WorkersCreate"
import { StockList } from "../pages/admin/Registers/Stock/StockList"
import { StockCreate } from "../pages/admin/Registers/Stock/StockCreate"
import { StockEdit } from "../pages/admin/Registers/Stock/StockEdit"
import { WorkersEdit } from "../pages/admin/Registers/Workers/WorkersEdit"
import { FinishRegister } from "../pages/auth/FinishRegister/FinishRegister"
import { FerramentasSolicitadasEdit } from "../pages/admin/Registers/FerramentasSolicitadas/FerramentasSolicitadasEdit"
import { FerramentasSolicitadasList } from "../pages/admin/Registers/FerramentasSolicitadas/FerramentasSolicitadasList"
import { FerramentasSolicitadasCreate } from "../pages/admin/Registers/FerramentasSolicitadas/FerramentasSolicitadasCreate"

export default function AppRoutes() {
  return (
    <SidebarDrawerProvider>
      <AdminLayout>
        <Routes>
          <Route path="/finishRegister" element={<FinishRegister />} />

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workers" element={<WorkersList />} />
          <Route path="/workers/create" element={<WorkersCreate />} />
          <Route path="/workers/edit/:id" element={<WorkersEdit />} />
          <Route path="/stock" element={<StockList />} />
          <Route path="/stock/create" element={<StockCreate />} />
          <Route path="/stock/edit/:id" element={<StockEdit />} />
          <Route
            path="/ferramentas-solicitadas"
            element={<FerramentasSolicitadasList />}
          />
          <Route
            path="/ferramentas-solicitadas/create"
            element={<FerramentasSolicitadasCreate />}
          />
          <Route
            path="/ferramentas-solicitadas/edit/:id"
            element={<FerramentasSolicitadasEdit />}
          />
          <Route path="/*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </AdminLayout>
    </SidebarDrawerProvider>
  )
}
