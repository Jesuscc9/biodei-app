import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import { HomePage, SignupPage } from '../pages'
import { DevicesPage, NewDevicePage } from '../pages/devices'
import { LoginPage } from '../pages/login'
import { TicketsPage, NewTicketPage, TicketDetailPage } from '../pages/tickets'

import { Navbar } from '../components'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route path='/' element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path='signup' element={<SignupPage />} />
        <Route path='tickets' element={<Outlet />}>
          <Route index element={<TicketsPage />} />
          <Route path=':ticketId' element={<TicketDetailPage />} />
          <Route path='new' element={<NewTicketPage />} />
        </Route>
        <Route path='devices' element={<Outlet />}>
          <Route index element={<DevicesPage />} />
          <Route path=':deviceId' element={<div>device con id</div>} />
          <Route path='new' element={<NewDevicePage />} />
        </Route>
      </Route>
    </Routes>
  )
}
