import React from 'react';
import moment from 'moment'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBCardGroup, MDBContainer } from "mdbreact";

class PanelPage extends React.Component {
render(){
  let close = this.props.data.update_info  == 'Close' ? 'text-primary font-weight-bold' : '';
  return (
    <MDBCardGroup deck>
      <MDBCard border="primary" className="mt-3" >
        <MDBCardBody>
          <MDBCardTitle tag="h5" className={close}>{this.props.data.update_info}</MDBCardTitle>
          <MDBCardText>
            {this.props.data.description_info}
          </MDBCardText>
        </MDBCardBody>
        <MDBCardFooter small muted>
          {moment(this.props.data.createdAt).fromNow()}
        </MDBCardFooter>
      </MDBCard>
    </MDBCardGroup>
  );
}
};

export default PanelPage;