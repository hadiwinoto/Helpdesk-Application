import React, { Fragment } from 'react';

import { GlobalConsumer } from '../../../context/context';
import authHeader from '../../../services/authHeader';
import API from '../../../services';
import Swal from 'sweetalert2';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText} from 'mdbreact';
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';

import SpinnerPageFull from '../../../component/loading_page/loading.page';
import FooterPage from '../../../component/footer/footerPage';
import CardExample from '../../../component/card/card';
// import notification from './menu-img/notification.png'
import coaching from './menu-img/coaching.png'
import setting from './menu-img/setting.png'
import broad from './menu-img/broadcast.png'
import report from './menu-img/report.png'
import batch from './menu-img/batch.png'
import audit from './menu-img/audit.png'
import chat from './menu-img/chat.png'
import list from './menu-img/list.png'
import './home.css'


class Home extends React.Component {

constructor(props){
    super(props)
    window.scrollTo(0, 0)
    this.props.dispatch({type:'navbarShow'})
    this.props.dispatch({type:'homeActive'})
}

state={
    roles : []
}

componentDidMount(){



    // Check is registry with params, if no only check token header
    const params = this.props.match.params;
    if(params.username && params.token){
        this.verifyAccount(params)
    }else{
        // Check Session IF not found, will to login 
        this.checkHeader()
    }
}

componentWillUnmount(){
    this.props.dispatch({
        type:'homeNonActive'
    })
}

checkHeader(){
    API.menu.homeApi(authHeader()).then(res=>{
        this.props.dispatch({
            type:'navbarShow'
        })

        if(JSON.parse(localStorage.getItem('user')).roles.length == 0){
            localStorage.removeItem('user') 
            Swal.fire('Information', "Check your role for access this application, Please Contact Administrator !",'info')
        }
        // Get Roles
        return this.setState({
            roles : JSON.parse(localStorage.getItem('user')).roles
        })
    }).catch(err=>{
       this.props.dispatch({type:'navbarHide'})
       localStorage.removeItem('user')
       this.props.history.push('/')
    })
}

verifyAccount(data){   
        this.props.dispatch({type:'navbarShow'})
        API.auth.verifyAccount(data)
        .then(res=>{
            // Get Roles
            localStorage.setItem("user", JSON.stringify(res.userInfo));
            this.setState({
                roles : JSON.parse(localStorage.getItem('user')).roles
            })
            Swal.fire('Good job!', res.message,'success')
        })
        .catch(err=>{
             this.props.history.push('/404')
        })
}

toListTicket(){
    this.props.history.push('/list-tickets')
}

toCreateTicket(){
    this.props.history.push('/create-ticket')
}

ChatDashboard(){
    this.props.history.push('/chat-dashboard')
}

render() {  
    const ROLE_COMPLAINER = (
        <Fragment>
            <MDBRow className="justify-content-center">
            <MDBCol md="3" sm="12">
                <div data-aos="fade-up">
                    <div data-aos="fade-up">
                            <MDBCol className="w-100">
                            <MDBCard className="mt-3 card-menu">
                                <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={coaching}
                                waves />
                                <MDBCardBody className="text-center">
                                <MDBCardTitle>Create Complaint</MDBCardTitle>
                                <MDBCardText>Report Complaint, Discribe your Problem</MDBCardText>
                                <MDBBtn gradient="blue" onClick={()=>this.toCreateTicket()} className="btn-lg btn-block">Open</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                    </div>
                </div>
            </MDBCol>
            <MDBCol md="3" sm="12">
                <div data-aos="fade-up">
                <MDBCol className="w-100">
                    <MDBCard className="mt-3 card-menu">
                                <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={audit}
                                waves />
                                <MDBCardBody className="text-center">
                                <MDBCardTitle>Complaint History</MDBCardTitle>
                                <MDBCardText>Display History Complaint</MDBCardText>
                                <MDBBtn gradient="blue" onClick={()=>this.toListTicket()} className="btn-lg btn-block">Open</MDBBtn>
                                </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </div>
            </MDBCol>
        </MDBRow>
        </Fragment>
    )

    const ROLE_ADMIN = (
        <Fragment>
            <MDBRow>
                    <MDBCol md="3" sm="12">
                         <div data-aos="fade-up">
                            <MDBCol className="w-100">
                            <MDBCard className="mt-3 card-menu">
                                <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={list}
                                waves />
                                <MDBCardBody className="text-center">
                                <MDBCardTitle>List Complaint Tickets</MDBCardTitle>
                                <MDBCardText>Displays all ticket complaints</MDBCardText>
                                <MDBBtn gradient="blue" onClick={()=>this.toListTicket()} className="btn-lg btn-block">Open</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                        </div>
                    </MDBCol>
                    <MDBCol md="3" sm="12">
                        <div data-aos="fade-up">
                            <div data-aos="fade-up">
                                    <MDBCol className="w-100">
                                    <MDBCard className="mt-3 card-menu">
                                        <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={coaching}
                                        waves />
                                        <MDBCardBody className="text-center">
                                        <MDBCardTitle>Create Complaint</MDBCardTitle>
                                        <MDBCardText>Report Complaint, Discribe your Problem</MDBCardText>
                                        <MDBBtn gradient="blue" onClick={()=>this.toCreateTicket()} className="btn-lg btn-block">Open</MDBBtn>
                                        </MDBCardBody>
                                    </MDBCard>
                                    </MDBCol>
                            </div>
                        </div>
                    </MDBCol>
                    <MDBCol md="3" sm="12">
                        <div data-aos="fade-up">
                            <MDBCol className="w-100">
                            <MDBCard className="mt-3 card-menu">
                                <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={chat}
                                waves />
                                <MDBCardBody className="text-center">
                                <MDBCardTitle>Chat Dashboard</MDBCardTitle>
                                <MDBCardText>All chat Complaint from Customers</MDBCardText>
                                <MDBBtn gradient="blue" onClick={()=>this.ChatDashboard()} className="btn-lg btn-block">Open</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                            </MDBCol>
                        </div>
                    </MDBCol>
                    <MDBCol md="3" sm="12">
                    <div data-aos="fade-up">
                        <CardExample className="card-menu"  title="Report" desc="Customer Complaint Dashboard" img={report}></CardExample>
                    </div>
                    </MDBCol>
                    <MDBCol md="3" sm="12">
                        <div data-aos="fade-up">
                            <CardExample className="mt-3 card-menu" title="Batch Handle" desc="Batch Handle Tickets, Update, Close, Resolve" img={batch}></CardExample>
                        </div>
                    </MDBCol>
                    <MDBCol md="3" sm="12">
                        <div data-aos="fade-up">
                            <CardExample className="mt-3 card-menu" title="Broadcast Incident" desc="Broadcast Incident To All customer or Individual for Send Information" img={broad}></CardExample>
                        </div>
                    </MDBCol >
                    <MDBCol md="3" sm="12">
                        <div data-aos="fade-up">
                            <CardExample className="mt-3 card-menu" title="Management Settings" desc="Management Administrator for settings Role and Activation Accounts" img={setting}></CardExample>
                        </div>
                    </MDBCol>
               
            {/* <MDBCol md="3" sm="12">
                <div data-aos="fade-up">
                <MDBCol className="w-100">
                    <MDBCard className="mt-3 card-menu">
                                <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={audit}
                                waves />
                                <MDBCardBody className="text-center">
                                <MDBCardTitle>Complaint History</MDBCardTitle>
                                <MDBCardText>Display History Complaint</MDBCardText>
                                <MDBBtn gradient="blue" onClick={()=>this.toListTicket()} className="btn-lg btn-block">Open</MDBBtn>
                                </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                </div>
            </MDBCol> */}
                </MDBRow>
               
        </Fragment>
    )
    let roles = this.state.roles;
    // let roles = ['ROLE_COMPLAINER']
    // let roles = ['ROLE_HELPDESK']
    // ROLE_COMPLAINER
    let declare;
    for(let a = 0; a < roles.length; a++){
        if(roles[a] == 'ROLE_ADMIN'){
            declare =  ROLE_ADMIN;
        }else if(roles[a] == 'ROLE_HELPDESK'){
            Swal.fire('Information', `Please contact the administrator, or use the PPS Helpdesk application`,'info')
            this.props.dispatch({type:'navbarHide'})
            localStorage.removeItem('user')
            this.props.history.push('/')
            
        }else{
            declare =  ROLE_COMPLAINER;
        }
    }
    return (
        <Fragment>
        {/* <Sidebar/> */}
            <div data-aos="fade-right">
            <MDBBreadcrumb color="indigo lighten-4">
              <MDBContainer className="d-flex">
                <MDBBreadcrumbItem appendIcon icon="caret-right" active>Home</MDBBreadcrumbItem>
              </MDBContainer>
            </MDBBreadcrumb>
            </div>
            <div className="p-3"> 
                {
                    this.state.roles.length == 0 ? <SpinnerPageFull/> : null
                }
                {
                    declare
                }
            </div>
            {/* <FooterPage/> */}
        </Fragment>
    );
  }
}

// Exporting the component
export default GlobalConsumer(Home);