import { Outlet } from "react-router-dom"
import { Header } from "./Components/Header"
import { Footer } from "./Components/Footer"
import './assets/css/main.css'

function App() {
  return (
    <div className="bg-main-gradient">
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default App
