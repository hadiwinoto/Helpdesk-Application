import React from "react";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol,MDBInput,MDBBadge,MDBAlert } from "mdbreact";
import API from "../../services";
import user from './user.png'

import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init({
    duration: 1000
});


class JumbotronPage extends React.Component {

  state={
    user : '',
    roles: []
  }

  componentDidMount(){

      let user = JSON.parse(localStorage.getItem('user')) || '';
      API.master.userInfo(user)
      .then(response =>{
        if(response.status == 1){
          this.setState({
            user : response.data,
            roles:user.roles
          })
        }
      })
  }

  render(){
    let userData = this.state.user; 
    
  return (
    <div data-aos="fade-up" className="w-100">
    <MDBContainer className="mt-4">
      <MDBRow>
        <MDBCol>
          <MDBJumbotron>
            <MDBRow>
              <MDBCol size="12">
                <div className="text-center">
                  <img src={user} alt="thumbnail" className="img-fluid w-25"/>
                </div>
              </MDBCol>
            </MDBRow>
          <MDBRow className="mt-4">
            <MDBCol md='4'>
              <MDBInput
                icon='user'
                value={userData.fullname}
                name='fname'
                type='text'
                id='fullname'
                label='Fullname'
                outline
                disabled 
              >
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='address-card'
                value={userData.username}
                name='lname'
                type='text'
                id='username'
                label='Last name'
                outline
                disabled 
              >
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='envelope-open'
                value={userData.email}
                onChange={this.changeHandler}
                type='email'
                id='email'
                name='email'
                label='Your Email address'
                outline
                disabled 
              >
              </MDBInput>
            </MDBCol>
          </MDBRow>
          <MDBRow>
            <MDBCol md='4'>
              <MDBInput
                icon='mobile'
                value={userData.mobile_number}
                type='number'
                id='mobile_number'
                name='mobile_number'
                label='Mobile Number'
                outline
                disabled 
              >
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
              <MDBInput
                icon='user-circle'
                value={userData.gender}
                type='text'
                id='gender'
                name='gender'
                label='Gender'
                outline
                disabled 
              >
              </MDBInput>
            </MDBCol>
            <MDBCol md='4'>
             <MDBInput icon='map-marked-alt' value={userData.address} disabled outline type="textarea" label="Address" rows="2  " />
            </MDBCol>
            <MDBCol md='12' sm="12" className="mb-4 mt-3">
            <MDBAlert color="light border border-light p-2">
            <h5 className="alert-heading">Roles : </h5>
            <div className="d-flex justify-content-center">
            {
               this.state.roles.map(role =>{
                 return(
                   <h4><MDBBadge pill color="light" className="ml-1 mt-2">{role.substr(0)}</MDBBadge></h4>
                 )
               })
             }
            </div>
    
          </MDBAlert>
             
            </MDBCol>
          </MDBRow>
          <MDBRow size="12 ">
            <MDBBtn href="#" gradient="blue" className="mx-auto" rounded>
                  Edit Profile
            </MDBBtn>
          </MDBRow>
          </MDBJumbotron>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  )
  }
}

export default JumbotronPage;