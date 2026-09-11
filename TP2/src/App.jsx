import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Inicio from './pages/inicio'
import Contacto from './pages/contacto'
import Servicios from './pages/servicios'
import Layout from './components/Layout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
