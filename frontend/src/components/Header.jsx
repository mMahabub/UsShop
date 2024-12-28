import React from 'react';
import { Navbar, Nav, Container, Badge, NavDropdown } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {

  const { cartItems}  = useSelector((state) => state.cart);
  const { userInfo}  = useSelector((state) => state.auth);

  const logoutHandler =() => {
    console.log('logout')
  }
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="UsShop" /> UsShop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart /> Cart
                {
                 cartItems.length > 0 && (
                  <Badge pill bg='success' style={{ marginLeft: '5px'}}>
                    {cartItems.reduce((a, c) =>  a + c.qty, 0)}

                  </Badge>
                 )
                
                }
              </Nav.Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <Nav.Link to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                  </Nav.Link>
                  <NavDropdown.Item onClick={logoutHandler}>
                    logout

                  </NavDropdown.Item>

                </NavDropdown>
              ) : (
                  <Nav.Link to='/login' >
                  <Nav.Link as={Link} to='/login'>
                   <FaUser /> Sign In
                 </Nav.Link>
                 </Nav.Link>
              ) }
            
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;