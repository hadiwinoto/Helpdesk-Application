import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink,MDBRow,MDBCol} from 'mdbreact';
import ListGroupPage from '../../../component/listgroup/listgroup';
import React, { Fragment, useState,useEffect } from 'react';
import './style.css';

import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:4000");

function ChatDashboard() {

  const [activeTabs, setActiveTabs] = useState("1");
  const [response, setResponse] = useState("");
  
  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    });
  }, []);

  return (
    
    <Fragment>
        <div className="container">
          <h5>{response}</h5>
            <MDBRow className="row">
                <MDBCol className="list p-2 crollbar scrollbar-info" sm="12" md="5" xl="4" >
                  <MDBRow>
                    <MDBCol>
                    <MDBNav className="nav-tabs" >
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "1"} onClick={()=>setActiveTabs("1")}  role="tab" >
                        Not Handle
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "2"} onClick={()=>setActiveTabs("2")}   role="tab" >
                       Handle by You 
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "3"} onClick={()=>setActiveTabs("3")}   role="tab" >
                        Close
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                    </MDBCol>
                    <MDBCol sm="12" md="12" xl="12" className="mt-3">
                    <MDBTabContent activeItem={activeTabs} >
                      <MDBTabPane tabId="1" role="tabpanel" >
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      </MDBTabPane>
                      <MDBTabPane tabId="2" role="tabpanel">
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      </MDBTabPane>
                      <MDBTabPane tabId="3" role="tabpanel">
                      <ListGroupPage/>
                      <ListGroupPage/>
                      <ListGroupPage/>
                      </MDBTabPane>
                    </MDBTabContent>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol className="chatbox" sm="12" md="7" xl="8">
                  <MDBRow>
                    <MDBCol className="messagebox w-100" md="12" xl="12" sm="12">
                        
                    </MDBCol>
                    <MDBCol className="action w-100" md="12" xl="12" sm="12">
                        
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
            </MDBRow>
        </div>
    </Fragment>
  );
}

export default ChatDashboard;