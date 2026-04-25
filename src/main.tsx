import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { TodoProvider } from './context/TodoContext.tsx'
import { UserProvider } from './context/UserContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TodoProvider >
      <UserProvider>
        <App />
      </UserProvider>
    </TodoProvider>
  </StrictMode>,
)
