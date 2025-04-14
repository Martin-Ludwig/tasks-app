import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.tsx'
import TaskApp from "./TaskApp";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TaskApp />
  </StrictMode>,
)

