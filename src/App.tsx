import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Router'
import { SWRConfig } from 'swr'
import { AuthProvider } from './hooks/AuthProvider'

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <SWRConfig>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </SWRConfig>
    </BrowserRouter>
  )
}

export default App
