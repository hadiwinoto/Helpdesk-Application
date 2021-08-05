import base64 from 'react-native-base64'

import Put from "./Put";
import Get from "./Get";
import Post from "./Post";

// Auth
const LoginPost = (data,header) => Post('api/auth/signin',false,false,header,data);
const RegisterPost = (data,header) => Post('api/auth/signup',false,false,header,data);
const verifyAccount = (data) => Get(`api/auth/verify?token=${base64.decode(data.token ? data.token : '' )}&username=${data.username}`)
   
//Menu API 
const homeApi = (data) => Get(`api/home`,false,true,data)   
//master
const userInfo = (data) => Get(`api/users/${data.username}`,false)
// ALL Tickets
const getTickets = (data,header) => Get(`api/tickets`,false,true,header,data)
// Create Ticket
const createTicket = (data,header) => Post(`api/tickets/`,false,true,header,data)
// Get One Ticket
const getOneTicket = (data,header) => Get(`api/tickets/${data.ticket_id}`,false,true,header)
// Process Ticket
const handleTicket = (data,header) => Post(`api/handle-ticket/handle?ticket_id=${data.ticket_id}`,false,true,header,data)
const updateTicket = (data,header) => Post(`api/handle-ticket/update?ticket_id=${data.ticket_id}`,false,true,header,data)
const resolvedTicket = (data,header) => Post(`api/handle-ticket/resolved?ticket_id=${data.ticket_id}`,false,true,header,data)
const closeTicket = (data,header) => Post(`api/handle-ticket/close?ticket_id=${data.ticket_id}`,false,true,header,data)

// Live Chat
const CloseSession = (data,header) => Put(`api/chat/close?roomid=${data.roomid}`,false,true,header,data)
const HandOverHandler = (data,header) => Put(`api/chat/handover`,false,true,header,data)
const GetChatDetail = (data,header) => Get(`api/chat/send`,false,true,header,data)
const HandleChat = (data,header) => Put(`api/chat/handle`,false,true,header,data)
const CountList = (data,header) => Get(`api/chat/count-list`,false,true,header,data)
const OpenChat = (data,header) => Put(`api/chat/open`,false,true,header,data)
const GetListChat = (data,header) => Get(`api/chat`,false,true,header,data)
const CreateRoom = (data,header) => Post(`api/chat`,false,true,header,data)
// Export
const API ={
    auth: {
        LoginPost,
        RegisterPost,
        verifyAccount
    },
    menu:{
        homeApi
    },
    master :{
        userInfo,
        getTickets,
        getOneTicket,
        createTicket
    },
    processTicket:{
        handleTicket,
        updateTicket,
        resolvedTicket,
        closeTicket
    },
    chat:{
        HandOverHandler,
        GetChatDetail,
        CloseSession,
        GetListChat,
        HandleChat,
        CountList,
        OpenChat,
        CreateRoom,
    }
}

export default API;