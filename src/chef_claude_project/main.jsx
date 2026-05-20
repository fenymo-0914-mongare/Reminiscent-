import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import AppDev from './App.jsx'
import "flowbite/dist/flowbite.css"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppDev />
  </StrictMode>,
)
