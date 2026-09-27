import { useState } from 'react'
import { BrowserRouter , Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/LogIn'
import CreateRequest from './components/CreateRequest'
import ClientsRequests from './components/ClientsRequests'

function App() {

  return (
   <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path= "/create-request" element={<CreateRequest/>}/>
      <Route path= "/requests-dashboard" element={<ClientsRequests/>}/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
