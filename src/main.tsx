import App from '@/App.tsx'
import { Theme } from '@/constants/Theme.tsx'
import { ColorScheme } from '@/constants/colorShceme.ts'
import { MantineProvider } from '@mantine/core'
import ReactDOM from 'react-dom/client'

import './main.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme={ColorScheme.Light} theme={Theme}>
    <App />
  </MantineProvider>
)
