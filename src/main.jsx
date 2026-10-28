import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

<<<<<<< HEAD
=======
try {
  localStorage.removeItem('clinicos_public_theme');
  document.documentElement.removeAttribute('data-theme');
  document.documentElement.style.colorScheme = 'light';
} catch {}

>>>>>>> origin/main
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
