import { Ring as Loader } from '@uiball/loaders'
import React, { ReactNode } from 'react'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import { Router } from './components/Router'
import { AuthProvider } from './hooks/AuthProvider'
import { useUser } from './hooks/models'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <SWRConfig>
        <AuthProvider>
          <ProtectRoutes>
            <Router />
          </ProtectRoutes>
        </AuthProvider>
      </SWRConfig>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App

const ProtectRoutes = ({ children }: { children: ReactNode }): JSX.Element => {
  const { isLoading: isLoadingUser, error } = useUser()

  const navigate = useNavigate()
  const location = useLocation()

  if (error !== undefined) {
    if (location.pathname !== '/login' && location.pathname !== '/') {
      toast.error('Porfavor inicia sesion', { toastId: 'auth-error' })
      navigate('/login')
    }
  }

  if (isLoadingUser)
    return (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Loader size={64} color='white'></Loader>
      </div>
    )

  return <>{children}</>
}
