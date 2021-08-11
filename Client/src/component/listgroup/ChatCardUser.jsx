import { MDBCard, MDBCardBody, MDBCol, MDBCardText } from "mdbreact";
import moment from 'moment'
import React from 'react';
const ChatPanelUser = (props) => {
let date = new Date(props.chat.createdAt);
return (
    <MDBCol md="12" sm='12' lg="12" >
      <MDBCard color="primary-color-dark" text="white" className="text-center">
        <MDBCardBody className="p-2 text-left"> 
            <MDBCardText  className="d-flex justify-content-between" style={{color:'white'}}>
              {props.chat.message}    

               <small style={{color:"white",fontWeight:"bold",color:"yellow"}}>{props.chat.sender}</small>   
             </MDBCardText>
            <MDBCardText style={{color:'white', fontWeight: "bold"}} className="text-right">
              {moment(date).format('LT')}
            </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
);
};

export default ChatPanelUser;

