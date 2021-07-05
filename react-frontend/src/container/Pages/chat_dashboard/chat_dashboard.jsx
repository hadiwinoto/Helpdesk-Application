import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink,MDBRow,MDBCol} from 'mdbreact';
import ListGroupPage from '../../../component/listgroup/listgroup';
import React, { Fragment, useState,useEffect } from 'react';

import './style.css';
import hd from './hd.png';
import ChatPanelUser from '../../../component/listgroup/ChatCardUser';
import ChatPanelHD from '../../../component/listgroup/ChatCardHD';

import socketIOClient from "socket.io-client";
import LoadingChat from './loading_chat/loading_chat';

const socket = socketIOClient("http://localhost:4000");

function ChatDashboard() {

  const [ListChat, setListChat] = useState({data:{rows:[]}});
  const [ShowChat, setShowChat] = useState({data:{rows:[]}});
  const [activeTabs, setActiveTabs] = useState("1");
  const [Loader, setLoader] = useState(false);

  const setActive = (roomid) => {
    socket.emit("ShowChat",roomid)
    setLoader(true);
  }

  useEffect(() => {
    
    socket.on("ListChat", (data) => {
      setListChat(data);
    });

    socket.on("ShowChat", (data) => { 
      if(data.status == 1){
        setShowChat(data)
        setLoader(false)
      }
    });

  }, []);

  return (
    <Fragment>
        <div className="container">
            { Loader && ( <LoadingChat/> ) }
            <MDBRow className="row">
                <MDBCol className="list p-2 " sm="12" md="5" xl="4" >
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
                        By Other
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                    </MDBCol>
                    <MDBCol sm="12" md="12" xl="12" className="mt-3">
                    <MDBTabContent activeItem={activeTabs} >
                      <MDBTabPane tabId="1" role="tabpanel" >
                        {
                          ListChat.data.rows.map(list =>{
                            return(
                              <ListGroupPage dataList={list} onClick={setActive}/>
                            )
                          })
                        }
                      </MDBTabPane>
                      <MDBTabPane tabId="2" role="tabpanel">
                      </MDBTabPane>
                      <MDBTabPane tabId="3" role="tabpanel">
                      </MDBTabPane>
                    </MDBTabContent>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol className="chatbox" sm="12" md="7" xl="8">
                  <MDBRow >
                  <MDBCol className="info w-100" md="12" xl="12" sm="12">
                        
                  </MDBCol>
                    <MDBCol className="messagebox w-100 p-4" md="12" xl="12" sm="12">
                      {
                        ShowChat.data.rows.map(chat=>{
                          if(chat.sender == "Helpdesk"){
                            return(
                            <MDBRow className="h-auto d-inline-block mt-3 w-100">
                            {/* Complainer */}
                            <MDBCol md="12" sm="12" lg="12">
                              <MDBRow>
                                <MDBCol sm="1.5" md="1.5" xl="1.5">
                                    <img src={hd} className="img-fluid helpdeskphoto ml-1"  alt="" />
                                </MDBCol>
                                <MDBCol sm="10" md="10" xl="10">
                                    <ChatPanelUser chat={chat}/>
                                </MDBCol>
                              </MDBRow>
                            </MDBCol>
                          </MDBRow>)
                          }else{
                          return(<MDBRow className="h-auto d-inline-block mt-3 w-100">
                            {/* Helpdesk */}
                            <MDBCol md="12" sm="12" lg="12">
                            <MDBRow className="d-flex justify-content-end">
                              <MDBCol sm="10" md="10" xl="10">
                                  <ChatPanelHD chat={chat}/>
                              </MDBCol> 
                              <MDBCol sm="1.5" md="1.5" xl="1.5">
                                  <img src={hd} className="img-fluid helpdeskphoto mr-2"  alt="" />
                              </MDBCol>
                            </MDBRow>
                          </MDBCol>
                          </MDBRow>)
                          }
                        })
                      }
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