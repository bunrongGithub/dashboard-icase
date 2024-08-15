import React from "react"
import LoginForm from "./LoginForm"
import { AuthProvider } from "./AuthProvider"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Dashboard from "./components/dashboard/Dashboard"

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginForm/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  )
}