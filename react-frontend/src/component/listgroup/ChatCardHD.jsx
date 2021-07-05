import React from 'react';
import { MDBCard, MDBCardBody, MDBCol, MDBCardText } from "mdbreact";

const ChatPanelHD = (props) => {
return (
    <MDBCol md="12" sm='12' lg="12" >
      <MDBCard color="elegant-color" text="white" className="text-center">
        <MDBCardBody className="p-3 text-left"> 
            <MDBCardText style={{color:'white'}}>
            {props.chat.message}
            </MDBCardText>
            <MDBCardText style={{color:'white', fontWeight: "bold"}} className="text-right">
             12:00
            </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
);
};

export default ChatPanelHD;