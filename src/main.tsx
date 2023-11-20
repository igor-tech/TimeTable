import App from '@/App.tsx'
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx'
import { Theme } from '@/constants/Theme.tsx'
import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import ReactDOM from 'react-dom/client'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <MantineProvider theme={Theme}>
      <ModalsProvider>
        <App />
      </ModalsProvider>
    </MantineProvider>
  </ErrorBoundary>
)
