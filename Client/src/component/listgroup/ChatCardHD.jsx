import React from 'react';
import { MDBCard, MDBCardBody, MDBCol, MDBCardText,MDBIcon } from "mdbreact";
import moment from 'moment'

const ChatPanelHD = (props) => {
let date = new Date(props.chat.createdAt);
let send = props.chat.id;
return (
    <MDBCol md="12" sm='12' lg="12" >
      <MDBCard color="elegant-color" text="white" className="text-center">
        <MDBCardBody className="p-2 text-left"> 
            <MDBCardText className="d-flex justify-content-between" style={{color:'white'}}>
            {props.chat.message} 
            <small style={{color:"white",fontWeight:"bold",color:"#00bfff"}}>You</small>
            </MDBCardText>
            
            <MDBCardText style={{color:'white', fontWeight: "bold"}} className="text-right d-flex justify-content-end">
            <div className="mr-2">
                {moment(date).format('LT')}
            </div>
            <MDBIcon icon={send ? 'check-double' : 'check'} />
            </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
);
};

export default ChatPanelHD;