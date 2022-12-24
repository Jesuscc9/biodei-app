import { useAuth } from '../hooks/AuthProvider'
import { useNavigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.ReactNode => {
  const navigate = useNavigate()

  const { session } = useAuth()

  if (session === null) {
    navigate('/login')
  }

  return children
}
