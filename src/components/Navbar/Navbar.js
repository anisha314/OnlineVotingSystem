import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './CSS/Nav.css'
import Logo from './VotingLogo.png';

function Nav_bar() {
  return (
    <Navbar expand="lg" className="Nav">
      {/* <Container className='Nav'>*/}
        <Navbar.Brand className ="Heading" href="/"><img src={Logo} alt= 'Logo' style={{width: "130px"}}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className='Toggle'/> 
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto Nav">
            <Nav.Link className="Nav-items" href="/">Home</Nav.Link>
            <Nav.Link className="Nav-items" href="/Signup">New Registration</Nav.Link>
            <Nav.Link className="Nav-items" href="/Login">Login</Nav.Link>
            <Nav.Link className="Nav-items" href="/AdminLogin">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default Nav_bar;