import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink,MDBRow,
        MDBCol,MDBListGroup, MDBListGroupItem,MDBIcon,MDBBtn,MDBAnimation} from 'mdbreact';

import React, { Fragment, useState,useEffect,useRef} from 'react';
import API from '../../../services';
import moment from 'moment'

import './style.css';
import hd from './image/hd.png';
import paperPlane from './image/paper-plane.png' 
import ChatPanelUser from '../../../component/listgroup/ChatCardUser';
import ChatPanelHD from '../../../component/listgroup/ChatCardHD';

import socketIOClient from "socket.io-client";
import LoadingChat from './loading_chat/loading_chat';
import Swal from 'sweetalert2';


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

function SortArrayDESC(array) {
  array.sort(function(a,b){ return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); });
}

function ScrollToBottom() {
  // Scroll Bottom
  var myDiv = document.getElementById("messagebox");
  myDiv.scrollTop = myDiv.scrollHeight;
}

const ChatDashboard = () => {

  // Check Login User
  if(!localStorage.getItem('user')){
    window.location = "/";
  }

  const [Session,setSession] = useState(JSON.parse(localStorage.getItem('user')))
  const [ListChat, setListChat] = useState({data:{rows:[]}});
  const [CountListTemp, setCountListTemp] = useState(null);
  const [activeTabs, setActiveTabs] = useState("1");
  const [Content, setContent] = useState(null);
  const [Loader, setLoader] = useState(false);
  const [Search, setSearch] = useState(false);
  const [Active,setActive] = useState(null);
  const [Temp, setTemp] = useState(null);
  const inputRef = useRef(null);

  // Check storage
  if(!GETLocalStorage('ListChat')){
    SETLocalStorage('ListChat',{data:{rows:[]}});
  }else if(GETLocalStorage('ListChat').data.rows.length == 0){
    
    SETLocalStorage('ListChat',ListChat);

    // Get Details Chat
    ListChat.data.rows.map(data=>{
        getListChatDetails(data.roomid)
    })
  }

  console.log(GETLocalStorage("ListChat").data.rows.length +"=----"+CountListTemp)
  //Compare LocalStorage with API List
  if( GETLocalStorage("ListChat").data.rows.length != CountListTemp){
      getListChat()
      SETLocalStorage('ListChat',ListChat);
  }

  const GetList = GETLocalStorage("ListChat").data.rows;
  let HandleByOthers = [], HandleByYou = [], NotHandle = [], CloseList = [];

  GetList.map(a=>{
    if(a.helpdesk_id != null && a.helpdesk_id == Session.username){
      HandleByYou.push(a)
    }else if(a.helpdesk_id == null){
      NotHandle.push(a)
    }else{
      HandleByOthers.push(a)
    }
  })

  if(Search){
    let search = new RegExp( Search  , 'i'); 
    HandleByOthers = HandleByOthers.filter(item => search.test(item.roomid));
    HandleByYou = HandleByYou.filter(item => search.test(item.roomid));
    NotHandle = NotHandle.filter(item => search.test(item.roomid));
  }

  if(HandleByOthers.length == 0 && HandleByYou.length == 0 & NotHandle.length == 0){
    CloseList.push({roomid:"xxxxxxxxx"})
  }

  async function getListChat () {

    let msg = new Object();
    msg['data'] = { rows: [] }
    await API.chat.GetListChat().then(res=>{  
      if(res.status == 1){
        res.data.rows.map(item=>{
          // Get Detail Chat
          msg.data.rows.push(item)
        })
      }else{
        Swal.fire('Failed Get List Charr Please Call Administrator!', '', 'info')
      }
    }).catch((error) => {
      alert(error)
    })

    setListChat(msg)
  }

  async function getListChatDetails (roomid,send) {
    await API.chat.GetChatDetail({ roomid:roomid}).then(res=>{ 
      
      SETLocalStorage(roomid,res);  
      // Render Again after Send Chat
      if(send){

        let msg = new Object();
        msg['data'] = { rows: [] }
        GETLocalStorage("ListChat").data.rows.map(e=>{
            if(e.roomid == roomid){
              e.updatedAt = res.data.rows[res.data.rows.length -1].updatedAt; 
              msg.data.rows.push(e)
            }else{
              msg.data.rows.push(e) 
            }
          })
          
          SortArrayDESC(msg.data.rows)
          SETLocalStorage("ListChat", msg);

          setTemp(res)
        }
    }).catch((error) => {
       alert(error)
    })
  }

  async function CountList() {
    await API.chat.CountList().then(res=>{  
      if(res.status){
        setCountListTemp(res.data)
      }else{
        Swal.fire('Failed Get Count Data Please Call Administrator!', '', 'info')
      }
    }).catch((error) => {
      alert(error)
    })
  }

  async function OpenChat() {
    await API.chat.OpenChat({roomid:Search,helpdesk_id:Session.username}).then(res=>{
      if(res.data.status){
        CountList()
        getListChatDetails(Search)
        setActive(Search)

        setLoader(false)
        Swal.fire('Success !', '', 'success')
      }else{
        setLoader(false)
        Swal.fire('Ticket Not Found !', '', 'info')
      }
    }).catch(err=>{
      alert(err)
    })
  }

  function handlerOpenList() {
    Swal.fire({
      title: 'Do you want to Open Chat ?',
      icon : 'info',
      showCancelButton: true,
      width: '800px',
      confirmButtonText: `Submit`,
      }).then((result) => {
      if(result.isConfirmed) {
        setLoader(true)
        OpenChat()
      }
    })    
  }

  function GetMsg(e){
    setContent(e.target.value)
  }

  function ActionSearch(a) {
    setSearch(a.target.value)
  }

  function handleSubmit(e) {

    if(Content.trim().length ==  0){
      return false
    }
    console.log(Content)
    e.preventDefault();
    
    let getChatLast = null;
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

  async function actionClose(){
    // Reset List Chat
    let msg = new Object();
    msg['data'] = { rows: [] }
      
    GETLocalStorage("ListChat").data.rows.map(e=>{
        if(e.roomid != Active){
          msg.data.rows.push(e)
        }
    })

    SETLocalStorage("ListChat", msg);
    RemoveLocalStorage(Active)
    setActive(null);
    setLoader(false)
    
    await API.chat.CloseSession({roomid:Active}).then(res =>{
      if(res.status){
          Swal.fire('Success !', '', 'success')
      }
    })
  }

  function CloseSession() {
    Swal.fire({
      title: 'Do you want to Close Session ?',
      icon : 'info',
      showCancelButton: true,
      width: '800px',
      confirmButtonText: `Submit`,
      }).then((result) => {
      if(result.isConfirmed) {
        setLoader(true)
        actionClose();
      }
  })    
  }

  function HandOverHandler() {
    API.chat.HandOverHandler({roomid:Active,helpdesk_id: Session.username}).then(res=>{
      if(res.status){

          // Reset List Chat
          let msg = new Object();
          msg['data'] = { rows: [] }
          
          GETLocalStorage("ListChat").data.rows.map(e=>{
            if(e.roomid == Active){
              e.helpdesk_id = Session.username;
              e.updatedAt = moment(new Date()).format(); 
              msg.data.rows.push(e)
            }else{
              msg.data.rows.push(e) 
            }
          })
          
          SortArrayDESC(msg.data.rows)

          SETLocalStorage("ListChat", msg);
          setActiveTabs("1")
          setActive(Active);
          setLoader(false)
          Swal.fire('Success !', '', 'success')
      }
    });
  }

  function TakeOver(){
    Swal.fire({
        title: 'Do you want to Take Over Chat ?',
        icon : 'info',
        showCancelButton: true,
        width: '800px',
        confirmButtonText: `Submit`,
        }).then((result) => {
        if(result.isConfirmed) {
          setLoader(true)
          HandOverHandler();
        }
    })    
  }

  async function ActionHandleChat(){
    await API.chat.HandleChat({roomid:Active, helpdesk_id:Session.username}).then(res=>{
      if(res.status){
        // Reset List Chat
        let msg = new Object();
        msg['data'] = { rows: [] }
        
        GETLocalStorage("ListChat").data.rows.map(e=>{
          if(e.roomid == Active){
            e.helpdesk_id = Session.username;
            e.updatedAt = moment(new Date()).format(); 
            msg.data.rows.push(e)
          }else{
            msg.data.rows.push(e) 
          }
        })

        SortArrayDESC(msg.data.rows)

        SETLocalStorage("ListChat", msg);
        setActiveTabs("1")
        setActive(Active);
        
        Swal.fire('Success !', '', 'success')
        setLoader(false)
      }
    })
  }

  function HandleChat(){
    Swal.fire({
        title: 'Do you want to Handle Chat ?',
        icon : 'info',
        showCancelButton: true,
        width: '800px',
        confirmButtonText: `Submit`,
        }).then((result) => {
        if(result.isConfirmed) {
          setLoader(true)
          ActionHandleChat();
        }
    })    
  }
  
  useEffect( ()  => {
    
    //Compare localstroge with api
    if(Active == null){
      CountList()
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
      if(res.status)
      {
        getListChatDetails(res.data.roomid,'send')
      }
    });

    inputRef.current.focus();

    // Component Did Update
    return () =>{
      ScrollToBottom()  
    }
  }, [Active]);
  
  return (
    <Fragment>
        <div className="container">
            { Loader && ( <LoadingChat/> ) }
            <MDBRow >
                <MDBCol className="list p-2 scrollbar-black bordered-black square thin" sm="12" md="5" xl="4" >
                  <MDBRow>
                    <MDBCol sm="12" md="12" xl="12" className="mb-3 bd-list-bottom">
                    <form className="form-inline ml-2" style={{marginTop:"-2px"}}>
                        <MDBBtn size="sm" rounded outline style={CloseList.length == 0 ? {opacity:0.5,pointerEvents:"none"} : {}} onClick={()=>handlerOpenList()}>Open</MDBBtn>
                        <input className="form-control form-control-sm ml-2" onChange={(a)=>ActionSearch(a)} style={{width:"33vh"}} type="text" placeholder="Ticket ID" aria-label="Search" />
                    </form>
                    </MDBCol>
                    <MDBCol sm="12" md="12" xl="12" className="">
                    <MDBNav className="nav-tabs justify-content-between" >
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "1"} onClick={()=>{
                        setActive(null)
                        setActiveTabs("1")
                      }}
                      style={HandleByYou.length == 0 ? {pointerEvents:"none",opacity:0.4} : {} } role="tab" >
                        by You 
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "2"} onClick={()=>{
                        setActive(null)
                        setActiveTabs("2")
                        }} style={NotHandle.length == 0 ? {pointerEvents:"none",opacity:0.4} : {} }   role="tab" >
                        Not Handle
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink link to="#" active={activeTabs === "3"} onClick={()=>{
                        setActive(null)
                        setActiveTabs("3")
                    }} style={HandleByOthers.length == 0 ? {pointerEvents:"none",opacity:0.4} : {} }    role="tab" >
                        By Other
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNav>
                    </MDBCol>
                    <MDBCol sm="12" md="12" xl="12" className="mt-3">
                    <MDBTabContent activeItem={activeTabs} >
                      <MDBTabPane tabId="1" role="tabpanel">
                      
                      {
                        HandleByYou.map(list =>{
                            let date = new Date(list.updatedAt), getDetail; 
                              if(GETLocalStorage(list.roomid)){
                                getDetail = GETLocalStorage(list.roomid).data.rows;                                
                              }else{
                                getDetail = []
                              }
                              return(
                                <MDBListGroup>
                                    <MDBListGroupItem hover color="secondary" className={`p-2 m-1 mt-2 ${Active == list.roomid ? 'active' : ''}`} onClick={()=>setActive(list.roomid)} roomid={list.roomid}>
                                      <div className="d-flex w-100 justify-content-between">
                                        <h6 className="ticketno mb-1"><b>{list.complainer_id}</b> </h6>
                                        <small>{moment(date, "YYYYMMDD").fromNow()}</small>
                                      </div>
                                      <small><div class="elipsisChat"> <MDBIcon icon={getDetail.length != 0 ? getDetail[getDetail.length -1].id ? "check-double" : "check" : ""} className="mr-1"/> {getDetail.length != 0 ? getDetail[getDetail.length -1].message : 'Empty'}</div></small>
                                    </MDBListGroupItem> 
                              </MDBListGroup>
                              
                              )
                          })
                          
                        }
                      </MDBTabPane>
                      <MDBTabPane tabId="2" role="tabpanel" >
                        {
                          NotHandle.map(list =>{
                            let date = new Date(list.updatedAt), getDetail; 
                            if(GETLocalStorage(list.roomid)){
                              getDetail = GETLocalStorage(list.roomid).data.rows;                                               
                            }else{
                              getDetail = []
                            }
                              return(
                                <MDBListGroup>
                                    <MDBListGroupItem hover color="secondary" className={`p-2 m-1 mt-2 ${Active == list.roomid ? 'active' : ''}`} onClick={()=>setActive(list.roomid)} roomid={list.roomid}>
                                      <div className="d-flex w-100 justify-content-between">
                                      <h6 className="ticketno mb-1"><b>{list.complainer_id}</b> </h6>
                                        <small>{moment(date, "YYYYMMDD").fromNow()}</small>
                                      </div>
                                      <small><div class="elipsisChat">{getDetail.length != 0 ? getDetail[getDetail.length -1].message : 'Empty'}</div></small>
                                    </MDBListGroupItem> 
                              </MDBListGroup>
                              )
                          })
                        }
                      </MDBTabPane>
                      <MDBTabPane tabId="3" role="tabpanel">
                      {
                          HandleByOthers.map(list =>{
                            let date = new Date(list.updatedAt), getDetail; 
                              if(GETLocalStorage(list.roomid)){
                                getDetail = GETLocalStorage(list.roomid).data.rows;                                
                              }else{
                                getDetail = []
                              }                          
                              return(
                                <MDBListGroup>
                                    <MDBListGroupItem hover color="secondary" className={`p-2 m-1 mt-2 ${Active == list.roomid ? 'active' : ''}`} onClick={()=>setActive(list.roomid)} roomid={list.roomid}>
                                      <div className="d-flex w-100 justify-content-between">
                                      <h6 className="ticketno mb-1"><b>{list.complainer_id}</b> </h6>
                                        <small>{moment(date, "YYYYMMDD").fromNow()}</small>
                                      </div>
                                      <small><div class="elipsisChat">{getDetail.length != 0 ? getDetail[getDetail.length -1].message : 'Empty'}</div></small>
                                    </MDBListGroupItem> 
                              </MDBListGroup>
                              )
                          })
                        }
                      </MDBTabPane>
                    </MDBTabContent>
                    </MDBCol>
                  </MDBRow>
                </MDBCol>
                <MDBCol className="chatbox" sm="12" md="7" xl="8">
                <MDBRow>
                  <MDBCol className="info w-100 d-flex align-items-center" md="12" xl="12" sm="12">
                      <MDBCol md="12" xl="12">
                              {
                                Active != null && (
                                  <div data-aos="fade-top">
                                  <div className="infomsg">
                                      <div class="ml-3">
                                        {Active} - Unknown Problem
                                      </div>
      
                                      {
                                        activeTabs == 1 && Active != null && (
                                          <MDBBtn size="sm"  onClick={(a)=>CloseSession(a)}>
                                            <MDBIcon icon="times-circle" className="mr-1" /> Close Chat
                                          </MDBBtn>
                                        )
                                      }
                                      {
                                        activeTabs == 3 && Active != null && (
                                          <MDBBtn size="sm"  onClick={(a)=>TakeOver(a)}>
                                            <MDBIcon icon="people-carry" className="mr-1" /> Take Over
                                          </MDBBtn>
                                        )
                                      }
                                      {
                                        activeTabs == 2 &&  Active != null && (
                                          <MDBBtn size="sm"  onClick={(a)=>HandleChat(a)}>
                                            <MDBIcon icon="lock-open" className="mr-1" /> Handle
                                          </MDBBtn>
                                        )
                                      }
                                  </div>
                                  </div>
                                )
                              }
                      </MDBCol>
                  </MDBCol>
                    <MDBCol className="messagebox p-4 scrollbar-black bordered-black square thin" id="messagebox" md="12" xl="12" sm="12">
                      {
                          GETLocalStorage(Active) != null && (
                              Active && GETLocalStorage(Active).data.rows.map(chat=>{
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
                          )
                      }
                      {
                        Active == null &&(
                          <MDBAnimation type="shake" infinite duration="8s">
                             <img src={paperPlane} className="img-fluid w-25" alt="select-chat" />
                          </MDBAnimation>
                        )
                      }
                    </MDBCol>
                    <MDBCol className="action" style={activeTabs != 1 || Active == null ? {opacity:0.6, pointerEvents:"none"} : {}} md="12" xl="12" sm="12">
                    <form className="action" onSubmit={(e)=>handleSubmit(e)}>
                    <MDBRow className="d-flex justify-content-center">
                        <MDBCol className="d-flex align-items-center" size="2">
                          <MDBBtn  size="sm" className="d-flex justify-content-center">
                            <MDBIcon icon="paperclip" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-center" size="8">
                            <input type="text" autocomplete="off" required ref={inputRef} onChange={(e)=>GetMsg(e)} value={Content} className="form-control" id="msg"/>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-center" size="2">
                        <MDBBtn size="sm" onClick={(e)=>handleSubmit(e)} className="d-flex justify-content-center">
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