import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { LoginPage, HomePage, TicketsPage, DevicesPage, SignupPage } from '../pages'
import { Navbar } from '../components'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='tickets' element={<Outlet />}>
          <Route index element={<TicketsPage />} />
          <Route path=':ticketId' element={<div>Ticket con id</div>} />
        </Route>
        <Route path='devices' element={<Outlet />}>
          <Route index element={<DevicesPage />} />
          <Route path=':deviceId' element={<div>device con id</div>} />
        </Route>
      </Route>
    </Routes>
  )
}
