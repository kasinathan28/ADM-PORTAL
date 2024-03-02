import React from 'react';
import "./navbar.css";


// Images
import Logo from "../../assets/logo.png"


function Navbar() {
  return (
    <div className='navbar'>
        <img src={Logo}/>
      <h1>Carmel Polytechnic College</h1>
    </div>
  );
}

export default Navbar;
