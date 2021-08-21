  import React, { Fragment } from 'react';
  import API from '../../../../services';

  import { MDBBtn,MDBBreadcrumbItem,MDBBreadcrumb } from "mdbreact";
  import { MDBContainer, MDBRow, MDBCol, MDBInput,MDBIcon } from 'mdbreact';
  import { GlobalConsumer } from '../../../../context/context';
  import SpinnerPage from '../../../../component/loading/loading';

  import Footer from '../../../../component/footer/footerPage'
  import logo from './password.png';
  import Swal from 'sweetalert2';
  import './login.css'

  function validateForm (errors) {
    let valid = true;
    Object.values(errors).forEach(val =>{
      if (val.length > 0 ) valid = false;
    })

    return valid;
  }
  
  class Login extends React.Component {

    state = {
      loading: false,
      getValues : { username : '', password: '', },
      infoValidation:{
        username :{
          errorMessage: '',
          valueValid:'',
          spanInfo:'',
          formInfo:'',
          error:'false',
          min: 8 
        },
        password :{
          errorMessage: '',
          valueValid:'',
          formInfo:'',
          spanInfo:'',
          error:'false',
          min :8
        }
      }     
  }

  feedbackValidation = (property) =>{

    var infoValidation = this.state.infoValidation

      if(infoValidation[property].valueValid.length  == infoValidation[property].min){
        infoValidation[property].formInfo = "is-valid"
        infoValidation[property].spanInfo = "valid-feedback"
      } 

      if(infoValidation[property].valueValid.length < infoValidation[property].min){
        infoValidation[property].spanInfo = 'invalid-feedback';
        infoValidation[property].formInfo = "is-invalid"
      }

    this.setState({infoValidation})
  }

  handleGetValue(property){

    let stateForm = {...this.state.getValues};
  
    const { name, value } = property.target;
    const infoValidation = this.state.infoValidation

    switch (name) {
      case 'username': 
      infoValidation[name].error = '';
      infoValidation[name].errorMessage = `Great !`;

      if(value.length < infoValidation[name].min){
        infoValidation[name].error = 'false';
        infoValidation[name].errorMessage = `Username must be at least ${infoValidation[name].min} characters long!`;
      }
    
      infoValidation[name].valueValid = value;
      break;

      case 'password': 
      
      infoValidation[name].error = '';
      infoValidation[name].errorMessage = `Great !`;

      if(value.length < infoValidation[name].min){
        infoValidation[name].error = 'false';
        infoValidation[name].errorMessage = `Password must be at least ${infoValidation[name].min} characters long!`;
      }
      
      infoValidation[name].valueValid = value;
      break;
    }

    // set GetValue for Send Login API
    stateForm[name] = value;
    
    this.setState({infoValidation , getValues : stateForm, infoValidation})

    this.feedbackValidation(name)
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
      username : infoValidation.username.error,
      password : infoValidation.password.error  
    }
    
    if(validateForm(errors)) {
      this.postLogin();
    }
  }

  componentDidMount() {
    this.nameInput.focus();
    window.scrollTo(0, 0)
    if(localStorage.getItem('user')){
      this.props.history.push('/home')
    }
  }
  
  postLogin = () =>{
    
    this.setState({loading : true})

    API.auth.LoginPost(this.state.getValues,{header:''}).then(response=>{
      if(response.status == 1){
        this.setState({loading : false})
        this.props.dispatch({type:'navbarShow'})
        // Save Session 
        localStorage.setItem("user", JSON.stringify(response.userInfo));
        this.props.history.push('/home')
      }else{
        this.setState({loading : false})
        Swal.fire({
            icon: 'info',
            title: `${response.message}`
        })
      }
    }).catch((error) => {
        this.setState({loading : false})
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      })
  }

  toRegister(){
    this.props.history.push('/register')
  }

    render() {
      const {infoValidation} = this.state;
      return (
          <Fragment>
            <div data-aos="fade-down d-flex justify-content-center">
              <MDBBreadcrumb color="indigo lighten-4" className="breadcrumb-style justify-content-center">
                <h3 className="mt-1"><b>PT Panca Putra Solusindo</b></h3>
              </MDBBreadcrumb>
            </div>
              <MDBContainer className="mt-5 h-auto" style={{borderRadius:20,padding:25}}>
                <MDBRow>
                  <MDBCol md="12" sm="6" className="mb-3">
                    <div class="text-center">
                      <img src={logo} class="rounded mx-auto d-block" id="logo-center" alt="logo"/>
                    </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="6" md="6" className="offset-3">
                      <div class="form-group">
                        <label for="username">Username
                        </label>
                        <input type="input" size="sm" ref={(input) => { this.nameInput = input; }}  onChange={(property)=> this.handleGetValue(property)} name="username" class={'form-control form-control-lg '+ infoValidation.username.formInfo} id="username"/>
                        {/* {infoValidation.username.errorMessage.length > 0 && <div class={infoValidation.username.spanInfo+' mt-2'}>{infoValidation.username.errorMessage}</div>} */}
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="6" md="6" className="offset-3">
                      <div class="form-group">
                        <label for="password">Password
                        </label>
                        <input type="password" size="sm" onChange={(event)=> this.handleGetValue(event)} name="password" class={'form-control form-control-lg ' + infoValidation.password.formInfo} id="password"/>
                        {/* {infoValidation.password.errorMessage.length > 0 &&  <div class={infoValidation.password.spanInfo+' mt-2'}>{infoValidation.password.errorMessage}</div>} */}
                      </div>
                    </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="12" md="12" className="text-center">
                        <MDBBtn  color="primary"  onClick={(event)=> this.handleSubmit(event)} className="btn-md">
                         {this.state.loading ? ( 
                            <SpinnerPage/>
                         ) : 'Sign In' }
                         <MDBIcon far icon="paper-plane" className={this.state.loading ? 'd-none' : 'ml-2'} />
                        </MDBBtn>   
                    </MDBCol>  
                  </MDBRow>
                  <MDBRow>
                    <MDBCol md="12" sm="6" className="d-flex justify-content-center mt-5">
                      <p className="font-large grey-text">
                        Don't have an account?
                        <a
                          onClick={()=> this.toRegister()}
                          href="#!"
                          className="blue-text ml-1 font-weight-bold "
                        >
                          Sign up
                        </a>
                      </p>
                    </MDBCol>
                </MDBRow>
              </MDBContainer>
              
              {/* <Footer/> */}
              
          </Fragment>
      );
    }
  }

  // Exporting the component
  export default GlobalConsumer(Login);