import { Outlet } from "react-router-dom"
import { Header } from "./Components/Header"
import './assets/css/main.css'

function App() {
  return (
    <div className="body-gradient min-h-dvh">
      <Header/>
      <Outlet/>
    </div>
  )
}

export default App
