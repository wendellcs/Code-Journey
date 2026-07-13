import { Outlet } from "react-router-dom"
import { Header } from "./Components/Header"
import { Footer } from "./Components/Footer"
import './assets/css/main.css'
import { Stars } from "./Components/Stars"
import { TwinklingStars } from "./Components/TwinklingStars"
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
