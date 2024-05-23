import { Router } from '@/app/providers/router/router-config'
import { AppShell } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'

import '@mantine/carousel/styles.css'
import '@mantine/core/styles.css'
import '@mantine/core/styles/global.css'
import '@mantine/dates/styles.css'

function App() {
  return (
    <ModalsProvider>
      <AppShell m={'auto'} maw={'1800px'}>
        <Router />
      </AppShell>
    </ModalsProvider>
  )
}

export default App
