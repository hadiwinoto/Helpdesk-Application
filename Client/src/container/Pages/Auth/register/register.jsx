import React, { Fragment } from 'react';

import { MDBBtn, MDBIcon,MDBContainer, MDBBtnFixed, MDBBtnFixedItem, MDBRow, MDBCol, MDBInput } from "mdbreact";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import FooterPage from '../../../../component/footer/footerPage';
import SpinnerPage from '../../../../component/loading/loading';
import API from '../../../../services';
import Swal from 'sweetalert2';
import './register.css'

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validNumberPhone = RegExp(/^[0-9\b]+$/);

function validateForm (errors) {
  let valid = true;
  Object.values(errors).forEach(val =>{
    if (val.length > 0 ) valid = false;
  })

  return valid;
}

class Register extends React.Component {

  state = {
     loading: false,
     getValues:{
          fullname   : "",
          username   : "",
          email      : "",
          mobile_number: "",
          address    : "",
          gender     : "",
          password   : "",
          cPassword  : ""
     },
     infoValidation : {
          fullname :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 5 
          },
          username :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 8 
          }, 
          email :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 0
          },
          mobile_number :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 12 
          }, 
          gender :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 3
          },
          password :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 8 
          },
          cPassword :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 8 
          },
          address :{
            errorMessage: '',
            valueValid:'',
            spanInfo:'',
            formInfo:'',
            error:'',
            min: 15
          }
          
     }
  }

  feedbackValidation = (property) =>{

    var infoValidation = this.state.infoValidation
      
      if(property === 'email'){
        if(validEmailRegex.test(infoValidation[property].valueValid)){
          infoValidation[property].formInfo = "is-valid"
          infoValidation[property].spanInfo = "valid-feedback"
          return;
        }else{
          infoValidation[property].spanInfo = 'invalid-feedback';
          infoValidation[property].formInfo = "is-invalid"
          return;
        }
      }

      if(property === 'mobile_number'){
        if(infoValidation[property].valueValid.length  >= infoValidation[property].min){
            infoValidation[property].formInfo = "is-valid"
            infoValidation[property].spanInfo = "valid-feedback"
                   if(!validNumberPhone.test(infoValidation[property].valueValid)){
                      infoValidation[property].spanInfo = 'invalid-feedback';
                      infoValidation[property].formInfo = "is-invalid"
                      return;
                    }
            return
        }else{
            infoValidation[property].spanInfo = 'invalid-feedback';
            infoValidation[property].formInfo = "is-invalid"
            return;
        }
      }

      if(property === 'gender'){
        if(infoValidation[property].valueValid != ''){
          infoValidation[property].formInfo = "is-valid"
          infoValidation[property].spanInfo = "valid-feedback"
          return;
        }else{
          infoValidation[property].spanInfo = 'invalid-feedback';
          infoValidation[property].formInfo = "is-invalid"
          return;
        }
      }

      if(property === 'cPassword'){
        if(infoValidation[property].valueValid == infoValidation.password.valueValid && infoValidation[property].valueValid.length > 0){
          infoValidation[property].formInfo = "is-valid"
          infoValidation[property].spanInfo = "valid-feedback"
          return;
        }else{
          infoValidation[property].spanInfo = 'invalid-feedback';
          infoValidation[property].formInfo = "is-invalid"
          return;
        }
      }

      if(infoValidation[property].valueValid.length  >= infoValidation[property].min){
        infoValidation[property].formInfo = "is-valid"
        infoValidation[property].spanInfo = "valid-feedback"
      } 

      if(infoValidation[property].valueValid.length < infoValidation[property].min){
        infoValidation[property].spanInfo = 'invalid-feedback';
        infoValidation[property].formInfo = "is-invalid"
      }

    this.setState({infoValidation})
  }

  
  handleGetValue(event){
    
    let stateForm = {...this.state.getValues}
    const { name, value } = event.target;
  
    const infoValidation = this.state.infoValidation
    const errors = this.state.infoValidation
    
    switch (name) {
      case 'fullname': 
      errors[name].error = '';
      errors[name].errorMessage = `Great !`;

      if(value.length < infoValidation[name].min){
        errors[name].error = 'false';
        errors[name].errorMessage = `Fullname must be at least ${infoValidation[name].min} characters long!`;
      }
    
      infoValidation[name].valueValid = value;
      break;

      case 'username': 
      errors[name].error = '';
      errors[name].errorMessage = `Great !`;

      if(value.length < infoValidation[name].min){
        errors[name].error = 'false';
        errors[name].errorMessage = `Username must be at least ${infoValidation[name].min} characters long!`;
      }
    
      infoValidation[name].valueValid = value;
      break;

      case 'email': 
      errors[name].error = '';
      errors[name].errorMessage = `Great !`;

      if(!validEmailRegex.test(value)){
        errors[name].error = 'false';
        errors[name].errorMessage = `Email Is not Valid`;
      } 
    
      infoValidation[name].valueValid = value;
      break;

      case 'address': 
      errors[name].error = '';
      errors[name].errorMessage = `Great !`;

      if(value.length < infoValidation[name].min){
        errors[name].error = 'false';
        errors[name].errorMessage = `Address must be at least ${infoValidation[name].min} characters long!`;
      }
    
      infoValidation[name].valueValid = value;
      break;
    
      case 'mobile_number': 

        errors[name].error = '';
        errors[name].errorMessage = `Great !`;
            
      if(value.length < infoValidation[name].min){
        errors[name].error = 'false';
        errors[name].errorMessage = `Phone Number must be at least ${infoValidation[name].min} characters long!`;
      }
      
      if(!validNumberPhone.test(value)){
        errors[name].error = 'false';
        errors[name].errorMessage = `Phone Number must be Number caracters`;
      }
    
      infoValidation[name].valueValid = value;
      break;

      case 'gender': 
      
      errors[name].error = '';
      errors[name].errorMessage = `Great !`;
      
      if(value.length < infoValidation[name].min){
        errors[name].error = 'false';
        errors[name].errorMessage = `Please Select one`;
      }
    
      infoValidation[name].valueValid = value;
      break;

      case 'password': 

      errors[name].error = '';
      errors[name].errorMessage = `Great !`;

      if(value.length < infoValidation[name].min){
        errors[name].error = 'false';
        errors[name].errorMessage = `Password must be at least ${infoValidation[name].min} characters long!`;
      }
    
      infoValidation[name].valueValid = value;
      break;
      
      case 'cPassword': 

      errors[name].error = '';
      errors[name].errorMessage = `Great !`;

      if(value != infoValidation.password.valueValid){
        errors[name].error = 'false';
        errors[name].errorMessage = `Password must be same`;
      }

      if(value.length == 0){
        errors[name].error = 'false';
        errors[name].errorMessage = `Phone Number must be at least ${infoValidation[name].min} characters long!`;
      }
    
      infoValidation[name].valueValid = value;
      break;

    }

    // set GetValue for Send Login API
    stateForm[name] = value;

    // Save Form Data to Browser  
    this.setLocalStorage(name,value)

    this.setState({errors, getValues : stateForm, infoValidation})
    
    this.feedbackValidation(name)
  }
  
  setLocalStorage(name,value){
    let getValues = JSON.parse(localStorage.getItem('formSave'))
    getValues[name] = value;
    if(name != 'password' ){
      if(name != 'cPassword' ){
        localStorage.setItem('formSave', [JSON.stringify(getValues)]);
      }
    }
  }
  
  componentDidMount(){
    window.scrollTo(0, 0)
    if(!localStorage.getItem('formSave')){
      localStorage.setItem('formSave', [JSON.stringify(this.state.getValues)]);
    }else{
      this.setState({
        getValues: JSON.parse(localStorage.getItem('formSave'))
      })
    }
  }
  
  toSignin(){
    this.props.history.push('/')
  }

handleSubmit(event){
    event.preventDefault();
    
    const {infoValidation,getValues} = this.state;
    
    // Check Form if there are empty
    for(var key in getValues) {
      if(getValues[key].length == 0){
        const event  = {
            target :{
              name : key,
              value : infoValidation[key].valueValid
            }
        }
        this.handleGetValue(event)
      }
    }
    
    let errors = {
      fullname : infoValidation.fullname.error,
      username : infoValidation.username.error,
      email : infoValidation.email.error,   
      mobile_number : infoValidation.mobile_number.error,
      gender : infoValidation.gender.error, 
      password : infoValidation.password.error,
      cPassword : infoValidation.cPassword.error
    }
   
    if(validateForm(errors)) {
      Swal.fire({
        title: 'Do you want to Submit ?',
        icon : 'warning',
        showCancelButton: true,
        confirmButtonText: `Submit`,
      }).then((result) => {
        if (result.isConfirmed) {
          this.postRegister();
        }
      })
    }

  }

  postRegister(){
      this.setState({loading:true})
      API.auth.RegisterPost(this.state.getValues).then(response=>{
        if(response.status == -1){
          this.setState({loading:false})
          Swal.fire({
              icon: 'warning',
              title: `${response.message}`
          })
        }else{
          this.setState({loading:false})
          localStorage.removeItem('formSave')
          this.toSignin();
          Swal.fire('Email Send Successfully, Please Activation your Account', '', 'success')
        }
      }).catch((error) => {
          this.setState({loading:false})
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
      })
  }

  toLogin(){
    this.props.history.push('/')
  }

  render() {
    
    // Save Form
    const getSave = JSON.parse(localStorage.getItem('formSave')) || ''
    const {infoValidation} = this.state;

    return (
        <Fragment>
          {/* Menu Broadcrumb */}
          <div data-aos="fade-down">
          <MDBBreadcrumb color="indigo lighten-4" className="breadcrumb-style">
                <MDBBreadcrumbItem appendIcon icon="caret-right" onClick={() => this.toSignin()} className="breadcrumb-style">Signin</MDBBreadcrumbItem>
                <MDBBreadcrumbItem appendIcon className="breadcrumb-style active">Signup</MDBBreadcrumbItem>
          </MDBBreadcrumb>
          </div>
          <div data-aos="zoom-in">
          <MDBContainer>
            <MDBRow>
              <MDBCol className="mt-3">
                  <h4>1. Account information</h4>
                  <form class="mt-4">
                        <div class="form-group">
                          <label for="fullname">Fullname</label>
                         
                          <input type="input" value={getSave.fullname} onChange={(event)=> this.handleGetValue(event)} name="fullname" class={'form-control form-control-lg '+infoValidation.fullname.formInfo} id="fullname"/>
                          {infoValidation.fullname.errorMessage.length > 0 && <div class={infoValidation.fullname.spanInfo+' mt-2'}>{infoValidation.fullname.errorMessage}</div>}
                        </div>
                        <div class="form-group">
                          <label for="username">Username</label>
                          <input type="input"  value={getSave.username}  onChange={(event)=> this.handleGetValue(event)} name="username" class={'form-control form-control-lg '+infoValidation.username.formInfo}  id="username"/>
                          {infoValidation.username.errorMessage.length > 0 && <div class={infoValidation.username.spanInfo+' mt-2'}>{infoValidation.username.errorMessage}</div>}
                        </div>
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input type="email" value={getSave.email} onChange={(event)=> this.handleGetValue(event)} name="email" class={'form-control form-control-lg '+infoValidation.email.formInfo} id="email"/>
                          {infoValidation.email.errorMessage.length > 0 && <div class={infoValidation.email.spanInfo+' mt-2'}>{infoValidation.email.errorMessage}</div>}
                        </div>
                        <div class="form-group">
                          <label for="mobile_number">Phone Number</label>
                          <input type="input" value={getSave.mobile_number} onChange={(event)=> this.handleGetValue(event)} name="mobile_number" class={'form-control form-control-lg '+infoValidation.mobile_number.formInfo} id="mobile_number"/>
                            {infoValidation.mobile_number.errorMessage.length > 0 && <div class={infoValidation.mobile_number.spanInfo+' mt-2'}>{infoValidation.mobile_number.errorMessage}</div>}
                          </div>
                          <div class="form-group">
                          <label for="address">Address</label>
                        <textarea  onChange={(event)=> this.handleGetValue(event)} class={'form-control form-control-lg '+infoValidation.address.formInfo}  id="address" name="address" rows="4">{getSave.address}</textarea>   
                        {infoValidation.address.errorMessage.length > 0 && <div class={infoValidation.address.spanInfo+' mt-2'}>{infoValidation.address.errorMessage}</div>}
                      </div>
                        <div class="form-group">
                          <label for="gender">Gender</label>
                          <select name="gender" value={getSave.gender} class={'form-control form-control-lg '+infoValidation.gender.formInfo} onChange={(event)=> this.handleGetValue(event)} id="gender">
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                          </select>
                          {infoValidation.gender.errorMessage.length > 0 && <div class={infoValidation.gender.spanInfo+' mt-2'}>{infoValidation.gender.errorMessage}</div>}
                        </div>
                        {/* <hr class="mt-5"/> */}
                        <div class="">
                          <div class="form-group">
                          <label for="password">Password</label>
                            <input type="password" onChange={(event)=> this.handleGetValue(event)}  name="password" class={'form-control form-control-lg '+infoValidation.password.formInfo} id="password"/>
                            {infoValidation.password.errorMessage.length > 0 && <div class={infoValidation.password.spanInfo+' mt-2'}>{infoValidation.password.errorMessage}</div>}
                          </div>

                          <div class="form-group">
                          <label for="cPassword">Confirm Password
                            </label>
                            <input type="password" onChange={(event)=> this.handleGetValue(event)} name="cPassword"class={'form-control form-control-lg '+infoValidation.cPassword.formInfo} id="cPassword"/>
                            {infoValidation.cPassword.errorMessage.length > 0 && <div class={infoValidation.cPassword.spanInfo+' mt-2'}>{infoValidation.cPassword.errorMessage}</div>}
                          </div>
                        </div>
                      
                        <div class="verify_email">
                          <h4 class="ml-1">2. Verify Email</h4>
                          <MDBBtn color="primary" onClick={(event)=> this.handleSubmit(event)}  className="btn btn-lg btn-block mt-4" >
                            {this.state.loading ? ( <SpinnerPage/> ) : ( 'Register') }
                            <MDBIcon far icon="paper-plane" className={this.state.loading ? 'd-none' : 'ml-2'} />
                          </MDBBtn>
                        </div>
                        <p className="font-large grey-text text-center mt-2">
                        have an account?
                        <a
                          onClick={()=> this.toLogin()}
                          href="#!"
                          className="blue-text ml-1 font-weight-bold "
                        >
                          Sign In
                        </a>
                      </p>
                  </form>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
            </div>
              <FooterPage/>
        </Fragment>
    );
  }
}

// Exporting the component
export default Register;