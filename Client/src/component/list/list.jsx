import React from 'react';
import { MDBCard, MDBCardBody, MDBIcon,MDBCardTitle, MDBCardText, MDBCardHeader, MDBBtn,MDBBadge, MDBContainer } from "mdbreact";

const columns = ["Ticket ID", "Category Complaint", "Handle By", "Status"];

class PanelPage extends React.Component {
    
    state={
        ticket_status: ''
    }

render(){
    let data = this.props.data;
    let session = JSON.parse(localStorage.getItem('user'));
    return (
    <div data-aos="fade-up">
    <MDBContainer>
      <MDBCard className="mt-3 border border-white " onClick={()=>this.props.handleDetail(this.props.data.ticket_id)}  text="white" style={{ backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/Others/gradient1.jpg)`, cursor:"pointer" }}>
        <MDBCardBody>
          <MDBCardTitle className="w-100"><h5><b>ID : {data.ticket_id}</b></h5></MDBCardTitle>
          <MDBCardText style={{color:'#FFFFFF'}} className="w-80 mt-3">
            <h5>{data.category_complant}</h5>
          </MDBCardText>
          <div className={session.roles.includes("ROLE_ADMIN") ? 'd-flex justify-content-between' : 'd-flex justify-content-end' }>

          {
            session.roles.includes("ROLE_ADMIN") && (
              <h6>{data.user_handler == session.username ? 'by You' : data.user_handler ||  'Not Handle yet' }</h6> 
            )
          } 
          
          <h4><MDBBadge pill color="light" style={{width:'100px'}}>{data.ticket_status} </MDBBadge></h4>
          <MDBBtn color="primary">Add</MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </div>
    );
}   
};

export default PanelPage;