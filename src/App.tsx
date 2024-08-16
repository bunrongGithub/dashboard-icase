import React from "react"
import LoginForm from "./LoginForm"
import { AuthProvider } from "./AuthProvider"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"
import Colors from "./components/settings/colors/Colors"
import {Status} from "./components/settings/status/Status"
import { PaymentStatus } from "./components/settings/payment_status/PaymentStatus"
import { PhoneModel } from "./components/settings/phone_model/PhoneModel"
import { UserRole } from "./components/settings/user_roles/UserRole"
import { Users } from "./components/users/Users"
import { PhoneServices } from "./components/services/PhoneServices"

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
           <Route path="colors" element={<Colors/>}/>
           <Route path="status" element={<Status/>}/>
           <Route path="payment-status" element={<PaymentStatus/>}/>
           <Route path="phone-model" element={<PhoneModel/>}/>
           <Route path="users-role" element={<UserRole/>}/>
           <Route path="users" element={<Users/>}/>
           <Route path="services" element={<PhoneServices/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}