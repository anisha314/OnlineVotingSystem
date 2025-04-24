import Nav_bar from "../Navbar/Navbar"
import './CSS/home.css'
import About from "./About"
import Features from "./Features"
import Contact from "./Contact"

const Home = () => {
    return (
        <div className="Home" >
            <div className="Home-content">
            <Nav_bar />
            <About/>
            <Features/>
            {/* <Contact/> */}
            </div>
        </div>
    )
}
export default Home