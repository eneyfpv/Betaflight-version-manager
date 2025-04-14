import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthWrapper from './components/auth-wrapper/AuthWrapper'

import './helpers/firebase.js'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </QueryClientProvider>
  </StrictMode>,
)
