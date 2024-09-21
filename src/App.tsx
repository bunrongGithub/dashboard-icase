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
import PhoneServiceView from "./components/services/PhoneServiceView"
import { PaymentMethod } from "./components/settings/payment_method/PaymentMethod"
import { PhoneServiceUpdate } from "./components/services/PhoneSeviceUpdate"
import { Teachnicain } from "./components/teachnician/Teachnician"
import {PhoneServicePrint} from "./components/services/PhhoneServicePrint"
import { PhoneServiceCreate } from "./components/services/PhoneServiceCreate"
import _404 from "./components/utils/response-page/_404";
import _500 from "./components/utils/response-page/_500"
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
            <Route path="payment-method" element={<PaymentMethod/>}/>
            <Route path="phone-model" element={<PhoneModel/>}/>
            <Route path="users-role" element={<UserRole/>}/>
            <Route path="users" element={<Users/>}/>
            <Route path="teachnician" element={<Teachnicain/>}/>
            <Route path="services" element={<PhoneServices/>}/>
            <Route path="services/create" element={<PhoneServiceCreate/>}/>
            <Route path="services/view/:id" element={<PhoneServiceView/>}/>
            <Route path="services/update/:id" element={<PhoneServiceUpdate/>}/>
            <Route path="services/print/:id" element={<PhoneServicePrint/>}/>
            <Route path="_500" element={<_500/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}