import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { PersonCircle } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import './nav.css';
import Logo from '../../Assets/logo2.jpeg';

const NavBar = ({ isOpen, isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`navbar ${isOpen ? 'shifted' : ''}`}>
      <Navbar expand="lg" className="custom-navbar rounded p-3 mb-5" variant="light">
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link eventKey={2} href="#memes">
              <NavDropdown title={<PersonCircle size={20} />} id="navbarScrollingDropdown">
                <>
                  <NavDropdown.Item onClick={() => navigate('/')} className="nav-link-transition">
                    Logout
                  </NavDropdown.Item>
                  <NavDropdown.Item className="nav-link-transition" onClick={() => navigate('/profile')}>
                    Profile
                  </NavDropdown.Item>
                </>
              </NavDropdown>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
