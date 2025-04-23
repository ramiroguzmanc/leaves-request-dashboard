import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from '@ui5/webcomponents-react'
import "@ui5/webcomponents-icons/dist/AllIcons.js"
import "@ui5/webcomponents/dist/Assets.js"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
