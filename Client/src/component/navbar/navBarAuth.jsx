import React from "react";
import logo from './solar-system.png';
const navbarAuth = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">
      <img src={logo}width="50" height="50" class="d-inline-block align-top img-fluid" alt="" loading="lazy"/>
    </a>
    <a class="navbar-brand" href="#">Complaint Application</a>
    
  </nav>
  );
}

export default navbarAuth;