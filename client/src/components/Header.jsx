import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='header-color'>
        <Container className='header-cont'>
          <Navbar.Brand href="#home">
            <img src='./images/logo.png' className='logo-bni' />
          </Navbar.Brand>
          <Nav className="me-auto header-item">
            User Management System
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;