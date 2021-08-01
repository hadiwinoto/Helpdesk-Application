import React, { useState,Fragment,useEffect } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, 
    MDBModalHeader, MDBModalFooter, MDBCol,MDBIcon, MDBRow  } from 'mdbreact';

import './style.css';
import hd from './img/hd.png';
import ChatHead from './img/chat.png';
import ChatPanelUser from '../listgroup/ChatCardUser';
import ChatPanelHD from '../listgroup/ChatCardHD';

function ModalChat(props) {
      const [modal, setModal] = useState(false);
      
      const closeModal = (modal) =>{
            setModal(false)
      }
      const chat = [
        {
          "id": 1,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "hallo",
          "read": "1",
          "createdAt": "2021-08-01T11:33:49.000Z",
          "updatedAt": "2021-08-01T11:33:49.000Z"
        },
        {
          "id": 2,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "hallo",
          "read": "1",
          "createdAt": "2021-08-01T11:33:58.000Z",
          "updatedAt": "2021-08-01T11:33:58.000Z"
        },
        {
          "id": 3,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "Hallo",
          "read": "1",
          "createdAt": "2021-08-01T11:42:18.000Z",
          "updatedAt": "2021-08-01T11:42:18.000Z"
        },
        {
          "id": 4,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "hallo",
          "read": "1",
          "createdAt": "2021-08-01T11:42:20.000Z",
          "updatedAt": "2021-08-01T11:42:20.000Z"
        },
        {
          "id": 5,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "hallo",
          "read": "1",
          "createdAt": "2021-08-01T11:42:22.000Z",
          "updatedAt": "2021-08-01T11:42:22.000Z"
        },
        {
          "id": 6,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:24.000Z",
          "updatedAt": "2021-08-01T11:42:24.000Z"
        },
        {
          "id": 7,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:26.000Z",
          "updatedAt": "2021-08-01T11:42:26.000Z"
        },
        {
          "id": 8,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:27.000Z",
          "updatedAt": "2021-08-01T11:42:27.000Z"
        },
        {
          "id": 9,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:29.000Z",
          "updatedAt": "2021-08-01T11:42:29.000Z"
        },
        {
          "id": 10,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:30.000Z",
          "updatedAt": "2021-08-01T11:42:30.000Z"
        },
        {
          "id": 11,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:32.000Z",
          "updatedAt": "2021-08-01T11:42:32.000Z"
        },
        {
          "id": 12,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asdasd",
          "read": "1",
          "createdAt": "2021-08-01T11:42:34.000Z",
          "updatedAt": "2021-08-01T11:42:34.000Z"
        },
        {
          "id": 13,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "tes",
          "read": "1",
          "createdAt": "2021-08-01T11:42:57.000Z",
          "updatedAt": "2021-08-01T11:42:57.000Z"
        },
        {
          "id": 14,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asd",
          "read": "1",
          "createdAt": "2021-08-01T11:43:17.000Z",
          "updatedAt": "2021-08-01T11:43:17.000Z"
        },
        {
          "id": 15,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asd",
          "read": "1",
          "createdAt": "2021-08-01T11:43:18.000Z",
          "updatedAt": "2021-08-01T11:43:18.000Z"
        },
        {
          "id": 16,
          "roomid": "COP-20200101-00001",
          "sender": "cz",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asd",
          "read": "1",
          "createdAt": "2021-08-01T12:02:02.000Z",
          "updatedAt": "2021-08-01T12:02:02.000Z"
        },
        {
          "id": 17,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asd",
          "read": "1",
          "createdAt": "2021-08-01T12:45:35.000Z",
          "updatedAt": "2021-08-01T12:45:35.000Z"
        },
        {
          "id": 18,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "asd",
          "read": "1",
          "createdAt": "2021-08-01T12:45:36.000Z",
          "updatedAt": "2021-08-01T12:45:36.000Z"
        },
        {
          "id": 19,
          "roomid": "COP-20200101-00001",
          "sender": "Vivi",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "hllo",
          "read": "1",
          "createdAt": "2021-08-01T12:45:44.000Z",
          "updatedAt": "2021-08-01T12:45:44.000Z"
        },
        {
          "id": 20,
          "roomid": "COP-20200101-00001",
          "sender": "Helpdesk",
          "handler": "m.fazrin.fahlevi",
          "type": "Text",
          "message": "sdfsd",
          "read": "1",
          "createdAt": "2021-08-01T12:45:46.000Z",
          "updatedAt": "2021-08-01T12:45:46.000Z"
        }]

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
                                    <MDBRow>
                                        <MDBCol className="ComplaintMassageBox p-3">
                                            {
                                                chat.map(chat=>{
                                                    if(chat.sender == "Helpdesk"){
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
                                                    }else{
                                                        return(<MDBRow className="h-auto d-inline-block mt-3 w-100">
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
                                                      </MDBRow>)
                                                    }
                                                })
                                            }
                                        </MDBCol>
                                    </MDBRow>
                              </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter className="FooterChat">
                            <form className="ActionComplaintChat">
                                <MDBRow className="d-flex justify-content-center">
                                    <MDBCol className="d-flex align-items-center" size="2">
                                    <MDBBtn  size="sm" className="d-flex justify-content-center">
                                        <MDBIcon icon="paperclip" />
                                    </MDBBtn>
                                    </MDBCol>
                                    <MDBCol className="d-flex align-items-center" size="8">
                                        <input type="text" autocomplete="off" className="form-control" id="msg"/>
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