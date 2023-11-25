import { BrowserRouter } from 'react-router-dom'

import App from '@/App.tsx'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx'
import { Theme } from '@/constants/Theme.tsx'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <MantineProvider theme={Theme}>
        <App />
      </MantineProvider>
    </BrowserRouter>
  </ErrorBoundary>
)
