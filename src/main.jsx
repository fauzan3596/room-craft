import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FurniturePage from './pages/furniturePage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FurniturePage />
  </StrictMode>,
)
