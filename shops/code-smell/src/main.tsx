import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import Layout from "./components/Layout"

const root = document.getElementById("root")

if (root) {
    createRoot(root).render(
        <StrictMode>
            <Layout>
                <App />
            </Layout>
        </StrictMode>
    )
}