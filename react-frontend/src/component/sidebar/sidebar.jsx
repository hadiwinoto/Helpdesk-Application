import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBDropdown,
MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBIcon, MDBContainer } from "mdbreact";
import { BrowserRouter as Router, Link ,Route} from 'react-router-dom';
import Swal from 'sweetalert2';
import Profile from "../../container/Pages/profile/profile";
import Home from "../../container/Pages/home/home";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}

logout(){
  Swal.fire({
    title: 'Are you sure?',
    icon: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Logout Success!',
        )
        setTimeout(() => {
          localStorage.removeItem('user')
          // window.location.reload();
          this.context.history.push('/')
        }, 2000);
    }
  })
  
}

render() {
  
  return (
    <Router>
      <MDBNavbar color="indigo" dark expand="md">
        <MDBContainer>
        <MDBNavbarBrand>
          <strong className="white-text">Menu</strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem >
              
              <MDBNavLink to='/'>Home</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink onClick={()=> this.logout()} >Logout</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
            <MDBNavItem>
              <MDBNavLink className="waves-effect waves-light" to="#!">
                <MDBIcon fab icon="instagram" />
              </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  <MDBDropdownItem href='/profile'> Profile</MDBDropdownItem>
                  <MDBDropdownItem href="#!" >Reset Password</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      
    </Router>
    
    );
  }
}

export default NavbarPage; 