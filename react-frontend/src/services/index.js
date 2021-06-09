import base64 from 'react-native-base64'

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
// Get One Ticket
const getOneTicket = (data,header) => Get(`api/tickets/${data.ticket_id}`,false,true,header)
// Process Ticket
const handleTicket = (data,header) => Post(`api/handle-ticket/handle?ticket_id=${data.ticket_id}`,false,true,header,data)
const updateTicket = (data,header) => Post(`api/handle-ticket/update?ticket_id=${data.ticket_id}`,false,true,header,data)
const resolvedTicket = (data,header) => Post(`api/handle-ticket/resolved?ticket_id=${data.ticket_id}`,false,true,header,data)

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
        getOneTicket
    },
    processTicket:{
        handleTicket,
        updateTicket,
        resolvedTicket
    }
}

export default API;