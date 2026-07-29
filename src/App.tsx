import { Outlet } from "react-router-dom"
import { Header } from "./Components/UI/Header"
import { Footer } from "./Components/UI/Footer"
import './assets/css/main.css'
import { Stars } from "./Components/Visuals/Stars"
import { TwinklingStars } from "./Components/Visuals/TwinklingStars"

function App() {
  return (
    <div className="bg-main-gradient">
      <Stars />
      <TwinklingStars/>
      <div className="z-10 relative">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default App
