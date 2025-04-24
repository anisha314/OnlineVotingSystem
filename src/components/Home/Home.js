import NavBar from "../Navbar/Navbar"
import './CSS/home.css'
import About from "./About"
import Features from "./Features"

const Home = () => {
    return (
        <div className="Home" >
            <div className="Home-content">
            <NavBar />
            <About/>
            <Features/>
            </div>
        </div>
    )
}
export default Home