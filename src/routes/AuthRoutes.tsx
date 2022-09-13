import { Navigate, Route, Routes } from "react-router-dom"
import { SidebarDrawerProvider } from "../context/SidebarContext"
import { FinishRegister } from "../pages/auth/FinishRegister/FinishRegister"

import { SignIn } from "../pages/auth/SignIn"
import { SignUp } from "../pages/auth/SignUp"

export default function AuthRoutes() {
  return (
    <SidebarDrawerProvider>
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/finishRegister" element={<FinishRegister />} />
        <Route path="/*" element={<Navigate to="/signIn" />} />
      </Routes>
    </SidebarDrawerProvider>
  )
}
