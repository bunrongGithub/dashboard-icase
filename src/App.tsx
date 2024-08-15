import React from "react"
import LoginForm from "./LoginForm"
import { AuthProvider } from "./AuthProvider"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"
import Colors from "./components/settings/colors/Colors"
import {Status} from "./components/settings/status/Status"

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}>
           <Route path="colors" element={<Colors/>}/>
           <Route path="status" element={<Status/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  )
}