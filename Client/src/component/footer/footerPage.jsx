import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="indigo" className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Complaint Application System</h5>
            <p>
                Only use for Helpdesk team management 
            </p>
          </MDBCol>
          <MDBCol md="6">
            <ul>
              <li className="list-unstyled">
                <a href="#!">Contacts</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Donate</a>
              </li>
              <li className="list-unstyled">
                <a href="#!">Support</a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="#"> FajrinApplicationStore.com </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;