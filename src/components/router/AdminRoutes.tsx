import React from 'react'
import { Outlet, Route } from 'react-router-dom'
import {
  ClientDetailPage,
  DashboardPage,
  DeviceDetailPage,
  DevicesPage as AdminDevicesPage,
  UsersPage,
} from '../../pages/admin'

import { NewClientDevicePage } from '../../pages/admin/clients/devices/NewClientDevicePage'
import { NewClientPage } from '../../pages/admin/clients/NewClientPage'

export const AdminRoutes = (): JSX.Element => {
  return (
    <Route path='admin' element={<Outlet />}>
      <Route
        path='clients'
        element={
          <>
            <DashboardPage />
            <Outlet />
          </>
        }
      >
        <Route
          path=':clientId'
          element={
            <>
              <Outlet />
              <ClientDetailPage />
            </>
          }
        >
          <Route path='devices'>
            <Route path='new' element={<NewClientDevicePage />} />
          </Route>
        </Route>
        <Route
          path='new'
          element={
            <>
              <NewClientPage />
            </>
          }
        ></Route>
      </Route>
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
      ></Route>
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
  )
}
