import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from "./components/ProtectedRoute"
import Admin from './pages/Admin'
import Navbar from "./components/Navbar"


function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path="/admin" element={<ProtectedRoute><Admin/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
