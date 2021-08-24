import React, { Fragment } from 'react';

import { GlobalConsumer } from '../../../context/context';
import authHeader from '../../../services/authHeader';

import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import { MDBInput,MDBJumbotron, MDBBadge,MDBBtn, MDBIcon,MDBTypography  } from "mdbreact";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { Rating } from '@material-ui/lab';
import Swal from 'sweetalert2';
import moment from 'moment'

import SpinnerPageFull from '../../../component/loading_page/loading.page';
import ModalResolvedPage from '../../../component/modal/modal_resolved';
import ModalHandlePage from '../../../component/modal/modal_handle';
import ModalUpdatePage from '../../../component/modal/modal_update';
import ModalClosePage from '../../../component/modal/modal_close';
import PanelPage from '../../../component/panel_page/panel_page';
import FooterPage from '../../../component/footer/footerPage';
import ModalChat from '../../../component/modal/modal_chat';
import API from '../../../services';
import './detail_ticket.css';

class DetailTicket extends React.Component {

  state={
      ticket : [],
      loader : true,
      activeItem: "1",
  }

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  componentDidMount(){
    this.props.dispatch({type:'navbarShow'})
    window.scrollTo(0, 0) 
    this.getTicket();

    // Check Session
    if(!localStorage.getItem('user')){
      this.props.history.push(`/`);
    }
  }

  getTicket(){
    API.master.getOneTicket({ticket_id:this.props.match.params.id},authHeader()).then(res=>{

      if(res.status){
        this.setState({
          ticket: res.data
        },()=>{
         this.setState({
           loader: false
         }) 
        })
      }else{
            Swal.fire({
              icon: 'info',
              title: 'Oops...',
              text: res.message,
            })
      }
    }).catch(err=>{
      this.props.history.push(`/`);
    })
  }

  goListTickets = () =>{
    this.props.history.push(`/list-tickets`);
  }
  
  render() {
       let session = JSON.parse(localStorage.getItem('user'));
       let data = this.state.ticket;
       let update_info_model = data.update_info_model;
       let update_list = [];    
       for (var key in update_info_model) {
        let obj = update_info_model[key];
        update_list.push(<PanelPage data={obj}/>);
       }
       return(
        <Fragment>
          {this.state.loader && (<SpinnerPageFull/>)}
            <div data-aos="fade-right">
              <MDBBreadcrumb color="indigo lighten-4">
                <MDBContainer className="d-flex">
                  <MDBBreadcrumbItem appendIcon icon="caret-right">Home</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem appendIcon onClick={()=>this.goListTickets()} style={{cursor:"pointer"}} icon="caret-right">Ticket</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem appendIcon icon="caret-right" active>Detail</MDBBreadcrumbItem>
                </MDBContainer>
              </MDBBreadcrumb>
            </div>
            <MDBContainer className={this.state.activeItem == 2 && update_list.length <= 3 ? 'h-100' : '' }>
              <MDBNav className="nav-tabs w-100 mb-2" style={{borderBottom:"0px"}}>
              <MDBNavItem >
                <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                  Detail
                </MDBNavLink>
              </MDBNavItem>
              {
                data.ticket_status != 'Open' && update_list.length != 0 &&  (
                <MDBNavItem>
                  <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                    History
                  </MDBNavLink>
                </MDBNavItem>
                )
              }
            </MDBNav>
              <MDBTabContent activeItem={this.state.activeItem}>
                {/* Detail Ticket */}
                <MDBTabPane tabId="1" role="tabpanel">
                  <MDBJumbotron>
                  <MDBRow>
                  <MDBCol>
                    <h5>Status :<MDBBadge color="primary" className="ml-2">{data.ticket_status}</MDBBadge></h5>
                  </MDBCol>
                  <MDBCol>
                    { data.ticket_status =='Close' &&  ( <Rating name="read-only" size="large" value={data.rating} readOnly />) }
                  </MDBCol>
                  </MDBRow>
                  <MDBRow>
                    <MDBCol sm="12" md="6">            
                        <MDBInput label="Title"  hint={data.title} disabled type="text" />
                    </MDBCol>
                    <MDBCol sm="12" md="6">            
                        <MDBInput label="Handler"  hint={data.user_handler || 'Not Handle'} disabled type="text" />
                    </MDBCol>
                      <MDBCol sm="12" md="6">
                          <MDBInput label="Ticket ID" hint={data.ticket_id} disabled type="text" />
                      </MDBCol>
                      <MDBCol>
                          <MDBInput label="Category Complaint" hint={data.category_complant} disabled type="text" />
                      </MDBCol>
                      <MDBCol sm="6" md="6">
                          <MDBInput type="textarea" label="Description Complaint" value={data.description_complaint} disabled rows="5" />
                      </MDBCol>
                      <MDBCol sm="6" md="6">
                           <MDBInput type="textarea" label="Address" value={data.address} disabled rows="5" />
                      </MDBCol>
                      <MDBCol sm="6" md="6">
                          <MDBInput label="msisdn" hint={data.msisdn} disabled type="text" />
                      </MDBCol>
                      <MDBCol sm="6" md="6">
                          <MDBInput label="Trouble Time" hint={data.trouble_time} disabled type="text" />
                      </MDBCol>
                      <MDBCol sm="6" md="6">
                          <MDBInput label="Resolved Time" hint={data.resolved_time == null ? '-' : moment(data.resolved_time).format('YYYY-MM-DD hh:mm:ss')} disabled type="text" />
                      </MDBCol>
                      <MDBCol sm="6" md="6">
                          <MDBInput label="Close Time" hint={data.close_time == null ? '-' : moment(data.close_time).format('YYYY-MM-DD hh:mm:ss')} disabled type="text" />
                      </MDBCol>   
                      <MDBCol sm="6" md="6">
                          <label className="mb-2">
                            File Attachment
                          </label>
                        <MDBTypography tag='h4' variant="h4-responsive">
                                    <a href={data.file_id} size="sm" download={data.file_id != '' ? new Date().getTime() : ''}>{ data.file_id != '' ? new Date().getTime()  : ''}</a>
                        </MDBTypography>
                      </MDBCol>    
                      <MDBCol sm="12" md="12" className="mt-3">
                      { data.ticket_status == 'Resolved' && (session.roles.includes("ROLE_COMPLAINER") || session.roles.includes("ROLE_ADMIN")) && ( 
                          <div className="text-center">
                              <ModalClosePage data={data}/>
                              {/* <MDBBtn color="primary">
                                  <MDBIcon icon="reply" className="mr-1" /> Reopen
                              </MDBBtn>  */}
                          </div>
                       )
                      }
                      {
                        (session.roles.includes("ROLE_ADMIN") || session.roles.includes("ROLE_HELPDESK")) && (
                            <div className="text-center">
                              { data.ticket_status == 'Open' && ( <ModalHandlePage data={data}/> ) }
                              { data.ticket_status == 'Process' && ( <ModalUpdatePage data={data}/> ) }
                              { data.ticket_status == 'Process' || data.ticket_status == 'Update' && ( <ModalResolvedPage data={data}/> ) }
                              { data.ticket_status == 'Update' && ( <ModalUpdatePage data={data}/> ) }
                              {/* { data.ticket_status != 'Close' && ( <ModalChat/> ) } */}
                            </div>
                        ) 
                      }
                       <div className="text-center">
                              { data.ticket_status != 'Close' && session.roles.includes("ROLE_COMPLAINER") ? ( <ModalChat/> ) : "" }
                          </div>
                        <MDBBtn color="primary" onClick={()=>this.goListTickets()}>
                          <MDBIcon icon="arrow-left" className="mr-1" /> Back
                        </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBJumbotron>
                </MDBTabPane>
                {/* History */}
                <MDBTabPane tabId="2" role="tabpanel">
                <MDBJumbotron  className="p-4">
                    {
                      update_list.map(data=>{
                        return(data)
                      })
                    }
                </MDBJumbotron>
                </MDBTabPane>
              </MDBTabContent>
            </MDBContainer>
            {/* <FooterPage/> */}
        </Fragment>
    );
  }
}

// Exporting the component
export default GlobalConsumer(DetailTicket);