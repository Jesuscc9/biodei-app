import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import { DashboardPage, DeviceDetailPage, DevicesPage as AdminDevicesPage, UsersPage } from '../pages/admin'
import { DevicesPage, NewDevicePage } from '../pages/devices'

import { LoginPage } from '../pages/login'
import { NewTicketPage, TicketDetailPage, TicketsPage } from '../pages/tickets'

import { Navbar } from '../components'

export const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />
      <Route index element={<LoginPage />} />
      <Route path='/' element={<Navbar />}>
        <Route path='tickets' element={<Outlet />}>
          <Route index element={<TicketsPage />} />
          <Route path=':ticketId' element={<TicketDetailPage />} />
          <Route path='new' element={<NewTicketPage />} />
        </Route>
        <Route path='admin' element={<Outlet />}>
          <Route path='dashboard' element={<DashboardPage />} />
          <Route
            path='devices'
            element={
              <>
                <AdminDevicesPage />
                <Outlet />
              </>
            }
          >
            <Route index element={<Outlet />} />
          </Route>
          <Route
            path='devices/:deviceId'
            element={
              <>
                <Outlet />
                <DeviceDetailPage />
              </>
            }
          />
          <Route
            path='users'
            element={
              <>
                <UsersPage />
                <Outlet />
              </>
            }
          >
            <Route index element={<Outlet />} />
          </Route>
        </Route>
        <Route
          path='devices'
          element={
            <>
              <DevicesPage />
              <Outlet />
            </>
          }
        >
          <Route index element={<Outlet />} />
          <Route path=':deviceId' element={<div>device con id</div>} />
          <Route path='new' element={<NewDevicePage />} />
          <Route path='ticket' element={<NewTicketPage />} />
        </Route>
      </Route>
    </Routes>
  )
}
