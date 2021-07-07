import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink,MDBRow,
        MDBCol,MDBListGroup, MDBListGroupItem,MDBIcon,MDBBtn} from 'mdbreact';
import React, { Fragment, useState,useEffect,useRef} from 'react';
import API from '../../../services';
import moment from 'moment'

import './style.css';
import hd from './image/hd.png';
import ChatPanelUser from '../../../component/listgroup/ChatCardUser';
import ChatPanelHD from '../../../component/listgroup/ChatCardHD';

import socketIOClient from "socket.io-client";
import LoadingChat from './loading_chat/loading_chat';

const socket = socketIOClient("http://localhost:4000");

function SETLocalStorage(name,params) {
  localStorage.setItem(name, JSON.stringify(params));
}

function GETLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}

const ChatDashboard = () => {
  
  const [Session,setSession] = useState(JSON.parse(localStorage.getItem('user')))
  // const [ShowChat, setShowChat] = useState({data:{rows:[]}});
  const [ListChat, setListChat] = useState({data:{rows:[]}});
  const [activeTabs, setActiveTabs] = useState("1");
  const [Content, setContent] = useState(null);
  const [Loader, setLoader] = useState(false);
  const [Active,setActive] = useState(null);
  const inputRef = useRef(null);
  // Check storage
  if(!GETLocalStorage('ListChat')){
    SETLocalStorage('ListChat',{data:{rows:[]}});
  }else if(GETLocalStorage('ListChat').data.rows.length == 0){
    SETLocalStorage('ListChat',ListChat);
  }

  function GetMsg(e){
    setContent(e.target.value)
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    
    let getChatLast = GETLocalStorage(Active).data.rows.pop().id + 1;
    let dateNow = new Date();
    let BroadCast = new Object();
    BroadCast["createdAt"] = dateNow;
    BroadCast["updatedAt"] = dateNow;
    BroadCast["handler"] = Session.username;
    BroadCast["sender"] = "Helpdesk";
    BroadCast["message"] = Content;
    BroadCast["id"] = getChatLast;
    BroadCast["roomid"] = Active;
    BroadCast["type"] = "Text";
    BroadCast["read"] = 1;    
    socket.emit("SendChat",BroadCast);
  }

  async function getListChat () {
    let msg = new Object();
    msg['data'] = { rows: [] }
    await API.chat.GetListChat().then(res=>{  
      res.data.rows.map(item=>{
        // Get Detail Chat
        getListChatDetails(item.roomid)
        msg.data.rows.push(item)
      })
    }).catch((error) => {
      alert(error)
   })
    
    setListChat(msg)
  }

  async function getListChatDetails (roomid) {
    await API.chat.GetChatDetail({ roomid:roomid}).then(res=>{  
      SETLocalStorage(roomid,res);
    }).catch((error) => {
       alert(error)
    })
  }
  
  useEffect( ()  => {
    
    socket.on("SendBackChat",(res)=>{
      let chatWillUpdate = GETLocalStorage(res.roomid);
      chatWillUpdate.data.rows.push(res)
      
      SETLocalStorage(res.roomid, chatWillUpdate);
      setContent("")
      
      // Scroll Bottom
      var myDiv = document.getElementById("messagebox");
      myDiv.scrollTop = myDiv.scrollHeight;
    })

    inputRef.current.focus();
    
    if(GETLocalStorage('ListChat').data.rows.length == 0){
      getListChat();
    }
    
    // Component Did Update
    return () =>{
    }
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
                      <MDBNavLink link to="#" active={activeTabs === "1"} onClick={()=>setActiveTabs("1")}   role="tab" >
                       Handle by You 
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "2"} onClick={()=>setActiveTabs("2")}  role="tab" >
                        Not Handle
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
                      <MDBTabPane tabId="1" role="tabpanel">
                      {
                          GETLocalStorage("ListChat").data.rows.map(list =>{
                            const date = new Date(list.updatedAt); 
                            if(list.helpdesk_id != null && list.helpdesk_id == Session.username){
                              return(
                                <MDBListGroup>
                                    <MDBListGroupItem hover className={`p-2 m-1 mt-2 ${Active == list.roomid ? 'active' : ''}`} onClick={()=>setActive(list.roomid)} roomid={list.roomid}>
                                      <div className="d-flex w-100 justify-content-between">
                                        <h6 className="ticketno mb-1">{list.roomid}</h6>
                                        <small>{moment(date, "YYYYMMDD").fromNow()}</small>
                                      </div>
                                      <small>{list.complainer_id}</small>
                                    </MDBListGroupItem> 
                              </MDBListGroup>
                              )
                            }
                          })
                        }
                      </MDBTabPane>
                      <MDBTabPane tabId="2" role="tabpanel" >
                        {
                          GETLocalStorage('ListChat').data.rows.map(list =>{
                            const date = new Date(list.updatedAt); 
                            if(list.helpdesk_id == null){
                              return(
                                <MDBListGroup>
                                    <MDBListGroupItem hover className={`p-2 m-1 mt-2 ${Active == list.roomid ? 'active' : ''}`} onClick={()=>setActive(list.roomid)} roomid={list.roomid}>
                                      <div className="d-flex w-100 justify-content-between">
                                        <h6 className="ticketno mb-1">{list.roomid}</h6>
                                        <small>{moment(date, "YYYYMMDD").fromNow()}</small>
                                      </div>
                                      <small>{list.complainer_id}</small>
                                    </MDBListGroupItem> 
                              </MDBListGroup>
                              )
                            }
                          })
                        }
                      </MDBTabPane>
                      <MDBTabPane tabId="3" role="tabpanel">
                      {
                          GETLocalStorage('ListChat').data.rows.map(list =>{
                            const date = new Date(list.updatedAt); 
                            if(list.helpdesk_id != null && list.helpdesk_id != Session.username){
                              return(
                                <MDBListGroup>
                                    <MDBListGroupItem hover className={`p-2 m-1 mt-2 ${Active == list.roomid ? 'active' : ''}`} onClick={()=>setActive(list.roomid)} roomid={list.roomid}>
                                      <div className="d-flex w-100 justify-content-between">
                                        <h6 className="ticketno mb-1">{list.roomid}</h6>
                                        <small>{moment(date, "YYYYMMDD").fromNow()}</small>
                                      </div>
                                      <small>{list.complainer_id}</small>
                                    </MDBListGroupItem> 
                              </MDBListGroup>
                              )

                            }
                          })
                        }
                      </MDBTabPane>
                    </MDBTabContent>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol className="chatbox" sm="12" md="7" xl="8">
                  <MDBRow>
                  <MDBCol className="info w-100" md="12" xl="12" sm="12">
                        
                  </MDBCol>
                    <MDBCol className="messagebox p-4" id="messagebox" md="12" xl="12" sm="12">
                      {
                        Active && GETLocalStorage(Active).data.rows.map(chat=>{
                          if(chat.sender == "Helpdesk"){
                            return(<MDBRow className="h-auto d-inline-block mt-3 w-100">
                            {/* Complainer */}
                            <MDBCol md="12" sm="12" lg="12">
                              <MDBRow>
                                <MDBCol sm="1.5" md="1.5" xl="1.5">
                                    <img src={hd} className="img-fluid helpdeskphoto ml-1"  alt="" />
                                </MDBCol>
                                <MDBCol sm="10" md="10" xl="10">
                                    <ChatPanelHD chat={chat}/>
                                    
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
                                  <ChatPanelUser chat={chat} />
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
                    <MDBCol className="action" style={activeTabs != 1 ? {opacity:0.6, pointerEvents:"none"} : {}} md="12" xl="12" sm="12">
                    <form className="action" onSubmit={(e)=>handleSubmit(e)}>
                    <MDBRow className="d-flex justify-content-center">
                        <MDBCol className="d-flex align-items-center" size="2">
                          <MDBBtn size="sm" className="d-flex justify-content-center">
                            <MDBIcon icon="paperclip" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-center" size="8">
                            <input type="text" autocomplete="off" required ref={inputRef} onChange={(e)=>GetMsg(e)} value={Content} className="form-control" id="msg"/>
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

export default ChatDashboard;