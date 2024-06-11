import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/Nav.css';
import img from '../../assets/images/Logo.png';

function Nav() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const links = isLandingPage ? [
    <Link key="signin" to="/signin">Sign In</Link>,
    <Link key="signup" to="/signup">Sign Up</Link>
  ] : [
    <Link key="about" to="/about">About Us</Link>,
    <Link key="contact" to="/contact">Contact Us</Link>,
    <Link key="services" to="/services">Services</Link>
  ];

  return (
    <div id='contaner'>
      <img id='logo' src={img} alt='logo'/>
      <div id='navigate' className={isLandingPage && links.length === 2 ? 'two-links' : ''}>
        {links}
      </div>
    </div>
  );
}

export default Nav;
