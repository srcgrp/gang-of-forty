import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// This import was removed because it is added via <link> tag in index.html
// import "../style.css"

const root = document.getElementById('root')
if (root) {
    createRoot(root).render(
    <StrictMode>
        <App />
    </StrictMode>,
    )
}