import React from 'react';
import { MDBListGroup, MDBListGroupItem } from "mdbreact";

const ListGroupPage = () => {
return (
  <MDBListGroup>
    <MDBListGroupItem active hover className="p-2 m-1">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="ticketno mb-1">CCH-20200101-000001</h6>
        <small>12:00</small>
      </div>
      <small>Donec id elit non mi porta.</small>
    </MDBListGroupItem>
    <MDBListGroupItem hover className="p-2 m-1 mt-2">
      <div className="d-flex w-100 justify-content-between">
        <h6 className="ticketno mb-1">CCH-20200101-000001</h6>
        <small>12:00</small>
      </div>
      <small className="text-muted">Donec id elit non mi porta.</small>
    </MDBListGroupItem>
  </MDBListGroup>
);
};

export default ListGroupPage;