import { MDBContainer, MDBBtn, MDBModal, MDBInput, MDBModalBody, 
  MDBModalHeader, MDBModalFooter, MDBCol, MDBRow,MDBAlert,MDBSelect   } from 'mdbreact';
  import SpinnerPageFull from '../loading_page/loading.page';
import authHeader from '../../services/authHeader';
import React, { Component,Fragment } from 'react';
import API from '../../services';
import Swal from 'sweetalert2';

function validateForm (errors) {
  let valid = true;
      Object.values(errors).forEach(val =>{
        if (val.length > 0 ) valid = false;
      })
  return valid;
}
        
class ModalHandlePage extends Component {
state = {
  modal16: false,
  sendHandle : {
      user_handler :'',
      ticket_id: this.props.data.ticket_id,
      update_info :'Handle',
      target_troubleshoot: '',
      description_info : ''
  },
  errors:{
    target_troubleshoot: '',
    description_info : '',
    user_handler:'',
  },

  options: [
    {
      text: "Joko",
      value: "1"
    },
    {
      text: "Purwanto",
      value: "2"
    },
    {
      text: "Junaedi",
      value: "3"
    }
  ],
  loading: false,
  hidden : '',
  success: false
}

handleGetValue(event){  
  
  let stateForm = {...this.state.sendHandle};
  let error = {...this.state.errors};
  const { name, value } = event.target;

  stateForm[name] = value;

  error[name] = ''
  
  this.setState({
      sendHandle:stateForm,
      errors :  error
  })
}

componentDidMount(){
  window.scrollTo(0, 0) 
}

post_handle(){

  this.setState({loading:true,hidden:'d-none'})
  
  API.processTicket.handleTicket(this.state.sendHandle,authHeader()).then(res=>{
    if(res.status === 1){
      this.setState({
        success:true,
        loading:false
      },()=>{
        setTimeout(() => {
          this.setState({hidden:'d-none',modal16:false})
          window.location.reload();
        }, 2000);
      })
    }else{
      this.setState({loading : false, modal16:false})
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: res.message,
      }) 
    }
  }).catch(err=>{
    this.setState({loading : false, modal16:false})
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: err.message,
    })
  })
}

toggle = nr => () => {
  let modalNumber = 'modal' + nr
  this.setState({
    [modalNumber]: !this.state[modalNumber]
  });
}

validation(){
  let error = {...this.state.errors};
  if(this.state.sendHandle.target_troubleshoot.length === 0){
      error['target_troubleshoot'] = 'Required !'
  }
  
  if(this.state.sendHandle.description_info.length === 0){
    error['description_info'] = 'Required !'
  }

  if(this.state.sendHandle.user_handler.length === 0){
    error['user_handler'] = 'Required !'
  }
  
  this.setState({ errors : error },()=>{
    if(validateForm(this.state.errors)){
          this.post_handle()
    }
  })
}

render() {
  return (
    <Fragment>
        <MDBBtn onClick={this.toggle(16)} color="primary">
            Handle
        </MDBBtn>
      <MDBContainer>
        <MDBModal isOpen={this.state.modal16} toggle={this.toggle(16)} size="lg" centered>
         {
           this.state.loading && (
             <SpinnerPageFull/>
           )
         }
          <MDBModalHeader toggle={this.toggle(16)}>Handle Ticket</MDBModalHeader>
          <MDBModalBody>
            <MDBContainer className="text-white">
             <MDBRow>
                <MDBCol sm="12" md="6">            
                    <MDBInput label="Ticket ID"  hint={this.props.data.ticket_id} disabled type="text" />
                </MDBCol>
                <MDBCol sm="12" md="6">            
                    <MDBInput label="Helpdesk" name="user_handler"  valueDefault="" onChange={(event)=>this.handleGetValue(event)}  type="text" />
                    {
                  this.state.errors.user_handler.length > 0 && (
                    <div data-aos="fade-top">
                    <MDBAlert color="danger p-1" >
                       {this.state.errors.user_handler}
                    </MDBAlert>
                    </div>
                  )
                }
                </MDBCol>
              <MDBCol sm="12" md="6">            
                {/* <div className="custom-file mb-5 mt-4">
                <label className="custom-file-label" htmlFor="inputGroupFile01">
                    Choose file
                  </label>
                  <input
                    type="file"
                    className="custom-file-input"
                    id="inputGroupFile01"
                    aria-describedby="inputGroupFileAddon01"
                  />
                </div> */}
              </MDBCol>
              <MDBCol sm="12" md="12">    
              <label className="grey-text" >
                Target Resolved
              </label>        
                <MDBInput type="datetime-local" size="lg" name="target_troubleshoot"  onChange={(event)=>this.handleGetValue(event)}/>
                {
                  this.state.errors.target_troubleshoot.length > 0 && (
                    <div data-aos="fade-top">
                    <MDBAlert color="danger p-1" >
                       {this.state.errors.target_troubleshoot}
                    </MDBAlert>
                    </div>
                  )
                }
              </MDBCol>
              <MDBCol sm="12" md="12">            
                  <MDBInput type="textarea" label="Description" name="description_info" valueDefault="" onChange={(event)=>this.handleGetValue(event)}  rows="5" />
                  {
                  this.state.errors.description_info.length > 0 && (
                    <div data-aos="fade-top">
                    <MDBAlert color="danger p-1" >
                       {this.state.errors.description_info}
                    </MDBAlert>
                    </div>
                  )
                }
              </MDBCol>
              <MDBCol>
              {
                  this.state.success && (
                    <div data-aos="fade-right">
                    <MDBAlert color="success text-bold" >
                       Handle Ticket Success !
                    </MDBAlert>
                    </div>
                  )
              }
              </MDBCol>
             </MDBRow>
            </MDBContainer>
          </MDBModalBody>
          <MDBModalFooter className={this.state.hidden}>
            <MDBBtn color="secondary" onClick={this.toggle(16)}>Close</MDBBtn>
            <MDBBtn color="primary" onClick={()=>this.validation()}>Submit</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
      </Fragment>
    );
  }
}

export default ModalHandlePage;