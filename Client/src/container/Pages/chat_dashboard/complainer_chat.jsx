import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink,MDBRow,
        MDBCol,MDBListGroup, MDBListGroupItem,MDBIcon,MDBBtn} from 'mdbreact';
import React, { Fragment, useState,useEffect,useRef } from 'react';
import socketIOClient from "socket.io-client";
import API from '../../../services';
import moment from 'moment'

import './style.css';
import hd from './image/hd.png';
import ChatPanelUser from '../../../component/listgroup/ChatCardUser';
import ChatPanelHD from '../../../component/listgroup/ChatCardHD';

import LoadingChat from './loading_chat/loading_chat';


const socket = socketIOClient("http://localhost:4000");

const ComplainerChat = () => {

  const [Session,setSession] = useState(JSON.parse(localStorage.getItem('user')))
  const [ShowChat, setShowChat] = useState({data:{rows:[]}});
  const [Content, setContent] = useState(null);
  const [Loader, setLoader] = useState(false);
  const inputRef = useRef(null);
  
  function GetMsg(e){
    setContent(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    setContent("")
  }

  useEffect( ()  => {
    inputRef.current.focus();
    // Component Did Update
    return () =>{
      
    }
  }, []);
  console.log(Content)
  return (
    <Fragment>
        <div className="container">
            { Loader && ( <LoadingChat/> ) }
            <MDBRow className="row">
                <MDBCol className="chatbox" sm="12" md="12" xl="12">
                  <MDBRow>
                  <MDBCol className="info w-100" md="12" xl="12" sm="12">
                        
                  </MDBCol>
                    <MDBCol className="messagebox p-4" md="12" xl="12" sm="12">
                      {
                        ShowChat.data.rows.map(chat=>{
                          if(chat.sender == "Helpdesk"){
                            return(<MDBRow className="h-auto d-inline-block mt-3 w-100">
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
                    <form className="action" onSubmit={(e)=>handleSubmit(e)}>
                    <MDBRow className="d-flex justify-content-center">
                        <MDBCol className="d-flex align-items-center" size="2">
                          <MDBBtn size="sm" className="d-flex justify-content-center">
                            <MDBIcon icon="paperclip" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-center" size="8">
                            <input type="text" ref={inputRef} onChange={(e)=>GetMsg(e)} value={Content} className="form-control" id="msg"/>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-center" size="2">
                        <MDBBtn size="sm" className="d-flex justify-content-center">
                           <MDBIcon icon="paper-plane" className="mr-1" />
                        </MDBBtn>
                        </MDBCol>
                      </MDBRow>
                      </form>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
            </MDBRow>
        </div>
    </Fragment>
  );
}

export default ComplainerChat;