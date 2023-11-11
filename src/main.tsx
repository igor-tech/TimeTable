import App from '@/App.tsx'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'

import './main.css'

import { Theme } from './constants/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme={Theme.Light}>
    <App />
  </MantineProvider>
)
