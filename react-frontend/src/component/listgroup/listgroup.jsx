import React from 'react';
import { MDBListGroup, MDBListGroupItem } from "mdbreact";
import moment from 'moment'
const ListGroupPage = (dataList) => {
let data = dataList.dataList;
const date = data.updatedAt; 

return (
  <MDBListGroup>
    {
      data.active == 1  ? (
        <MDBListGroupItem active hover className="p-2 m-1">
          <div className="d-flex w-100 justify-content-between">
            <h6 className="ticketno mb-1">{data.roomid}</h6>
            <small>{moment(date).format('MMMM DD')}</small>
          </div>
          <small>Not Handle</small>
        </MDBListGroupItem>
      ) : (
        <MDBListGroupItem hover className={`p-2 m-1 mt-2}`} roomid={data.roomid} onClick={()=>dataList.onClick(data.roomid)}>
          <div className="d-flex w-100 justify-content-between">
            <h6 className="ticketno mb-1">{data.roomid}</h6>
            <small>{moment(date).format('MMMM DD')}</small>
          </div>
          <small>Not Handle</small>
        </MDBListGroupItem> 
      )
    }
  </MDBListGroup>
);
};

export default ListGroupPage;