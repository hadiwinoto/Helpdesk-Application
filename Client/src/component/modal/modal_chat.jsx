import React, { useState,Fragment,useEffect,useRef} from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, 
    MDBModalHeader, MDBModalFooter, MDBCol,MDBIcon, MDBRow  } from 'mdbreact';
import { useParams } from "react-router-dom";

import API from '../../services';

import './style.css';
import hd from './img/hd.png';
import ChatHead from './img/chat.png';
import ChatPanelUser from '../listgroup/ChatCardUser';
import ChatPanelHD from '../listgroup/ChatCardHD';

import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:4000");


function SETLocalStorage(name,params) {
  localStorage.setItem(name, JSON.stringify(params));
}

function GETLocalStorage(name) {
  return JSON.parse(localStorage.getItem(name))
}

function RemoveLocalStorage(name){
  localStorage.removeItem(name);
}

function ScrollToBottom() {
  var myDiv = document.getElementById("ComplaintMassageBox2");
  myDiv.scrollTop = myDiv.scrollHeight;
}

function ModalChat(props) {
      const [Session,setSession] = useState(JSON.parse(localStorage.getItem('user')))
      const [modal, setModal] = useState(false);
      const [Content,setContent] = useState(null);
      const [Temp,setTemp] = useState(null)
      const inputRef = useRef(null);
      const { id } = useParams();

      const closeModal = (modal) =>{
        setModal(false)
      }      

      if(!GETLocalStorage(id)){
        SETLocalStorage(id,{data:{rows:[]}})
      }

      async function getListChatDetails (id,send) {
        await API.chat.GetChatDetail({ roomid:id}).then(res=>{ 
          
          SETLocalStorage(id,res);  
          
          setTemp(res)
        }).catch((error) => {
           alert(error)
        })
      }

      function GetMsg(e){
        setContent(e.target.value)
      }

      function handleSubmit(e) {

        if(Content.trim().length ==  0){
          return false
        }
        
        e.preventDefault();
        
        let getChatLast = null;
        let dateNow = new Date();
        let BroadCast = new Object();
        BroadCast["createdAt"] = dateNow;
        BroadCast["updatedAt"] = dateNow;
        BroadCast["sender"] = Session.username;
        BroadCast["message"] = Content;
        BroadCast["id"] = getChatLast;
        BroadCast["roomid"] = id;
        BroadCast["type"] = "Text";
        BroadCast["read"] = 1;    

        socket.emit("SendChat",BroadCast);
      }

      useEffect( ()  => {
  
        if(GETLocalStorage(id)){
          getListChatDetails(id,null)
        }

        socket.on("SendBackChat",(res)=>{

          let chatWillUpdate = GETLocalStorage(res.roomid);
          chatWillUpdate.data.rows.push(res)
          
          SETLocalStorage(res.roomid, chatWillUpdate);
          setContent("")
          
            
          ScrollToBottom()
        })

        // SendSuccess
        socket.on("SendSuccess",(res)=>{
          console.log(res)
          if(res.status)
          {
            getListChatDetails(res.data.roomid,'send')
          }
        });

    
        // Component Did Update
        return () =>{
        }
      }, []);
      return (
        <Fragment>
          <MDBBtn onClick={() => setModal(true)} color="primary">
            <MDBIcon icon="headset" className="mr-2" />
                Live Chat
            </MDBBtn>
            <MDBContainer>
            <MDBModal isOpen={modal} toggle="toggle" size="lg" top>
                  <MDBModalHeader className="p-2" toggle={()=>closeModal()}>
                      <div className="d-flex align-items-center">
                        <img src={ChatHead} className="imgHead"/>
                        <div className="mt-1 conline">
                            <MDBIcon FAS icon="circle" className="ml-3" style={{color:"#00c851"}} />
                            <div className="hdhead">Help Desk</div>  
                            <div className="online">Online</div>
                        </div>
                      </div>
                    </MDBModalHeader>
                        <MDBModalBody className="p-0">
                              <MDBContainer className="text-white">
                                    <MDBRow id="ComplaintMassageBox">
                                        <MDBCol className="ComplaintMassageBox p-3" id="ComplaintMassageBox2">
                                            {
                                                GETLocalStorage(id).data.rows.map(chat=>{
                                                    if(chat.sender == "Helpdesk"){
                                                        return(
                                                          <MDBRow className="h-auto d-inline-block mt-3 w-100">
                                                        {/* Helpdesk */}
                                                        <MDBCol md="12" sm="12" lg="12">
                                                        <MDBRow className="d-flex justify-content-end">
                                                          <MDBCol sm="10" md="10" xl="10">
                                                              <ChatPanelUser chat={chat}  />
                                                          </MDBCol> 
                                                          <MDBCol sm="1.5" md="1.5" xl="1.5">
                                                              <img src={hd} className="img-fluid helpdeskphoto mt-3"  alt="" />
                                                          </MDBCol>
                                                        </MDBRow>
                                                      </MDBCol>
                                                      </MDBRow>
                                                        )
                                                    }else{
                                                        return(
                                                             <MDBRow className="h-auto d-inline-block mt-3 w-100">
                                                                {/* Complainer */}
                                                                <MDBCol md="12" sm="12" lg="12">
                                                                <MDBRow>
                                                                    <MDBCol sm="1.5" md="1.5" xl="1.5">
                                                                        <img src={hd} className="img-fluid helpdeskphoto ml-3 mb-4 mt-2"  alt="" />
                                                                    </MDBCol>
                                                                    <MDBCol sm="10" md="10" xl="10">
                                                                        <ChatPanelHD chat={chat}/>                                         
                                                                    </MDBCol>
                                                                </MDBRow>
                                                                </MDBCol>
                                                            </MDBRow>
                                                        )
                                                    }
                                                })
                                            }
                                        </MDBCol>
                                    </MDBRow>
                              </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter className="FooterChat">
                            <form className="ActionComplaintChat" onSubmit={(e)=>handleSubmit(e)}>
                                <MDBRow className="d-flex justify-content-center">
                                    <MDBCol className="d-flex align-items-center" size="2">
                                    <MDBBtn  size="sm" className="d-flex justify-content-center">
                                        <MDBIcon icon="paperclip" />
                                    </MDBBtn>
                                    </MDBCol>
                                    <MDBCol className="d-flex align-items-center" size="8">
                                        <input type="text" autocomplete="off" required  ref={inputRef} value={Content} onChange={(e)=>GetMsg(e)} value={Content} className="form-control" id="msg"/>
                                    </MDBCol>
                                    <MDBCol className="d-flex align-items-center" size="2">
                                    <MDBBtn size="sm"className="d-flex justify-content-center">
                                    <MDBIcon icon="paper-plane" className="mr-1" />
                                    </MDBBtn>
                                    </MDBCol>
                                </MDBRow>
                            </form>
                        </MDBModalFooter>
                       
                  </MDBModal>
            </MDBContainer>
        </Fragment>
  );
}

export default ModalChat;