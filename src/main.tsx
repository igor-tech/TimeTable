import App from '@/app/App'
import { Theme } from '@/common/constants/theme'
import ErrorBoundary from '@/components/ui/error-boundary/error-boundary'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <MantineProvider theme={Theme}>
      <App />
    </MantineProvider>
  </ErrorBoundary>
)
