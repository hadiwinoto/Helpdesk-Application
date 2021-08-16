import { GlobalConsumer } from '../../../context/context';
import authHeader from '../../../services/authHeader';
import React, { Fragment } from 'react';

import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBAlert } from "mdbreact";
import { MDBPagination, MDBPageItem, MDBPageNav } from "mdbreact";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import { MDBFormInline, MDBIcon,MDBBadge } from "mdbreact";
import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { DataGrid } from '@material-ui/data-grid';

import SpinnerPageFull from '../../../component/loading_page/loading.page';
import FooterPage from '../../../component/footer/footerPage';
import PanelPage from '../../../component/list/list';
import API from '../../../services';
import Swal from 'sweetalert2';
import './list_tickets.css'

function getMonth (e){
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  return monthNames[e];
}

class ListTickets extends React.Component {

  state={
    allTickets : [],
    status: "All",
    handleYou:'',
    searchData : '',
    h100: 'h-100',
    loader: true,
    nodata: false,
    currentPage: 0,
    totalPages:0,
    session : JSON.parse(localStorage.getItem('user'))
  }

  componentDidMount(){
    this.props.dispatch({type:'navbarShow'})
    window.scrollTo(0, 0) 
    this.getAllTicket();
  }

  getAllTicket(){
    
    let states = this.state;

    var params = {
      ticket_status: states.status == 'All' ? '' : states.status,
      user_handler:states.handleYou, 
      ticket_id : states.searchData,
      page:states.currentPage,
      complainer_user: states.session.roles.includes("ROLE_ADMIN") ? '' :  states.session.username
    } 

    API.master.getTickets(params,authHeader()).then(res=>{
      if(res.data.totalItems > 0){
        return this.setState({ allTickets: res.data.tickets, 
                               loader: false, 
                               h100: res.data.tickets.length < 3 ? 'h-100' : null,
                               totalPages:res.data.totalPages,
                               currentPage: res.data.currentPage
                               })
      }else{
        return this.setState({allTickets: [],nodata: true, h100: 'h-100',loader:false})
      }  
    }).catch(err=>{
        this.props.dispatch({type:'navbarHide'})
        this.props.history.push('/')
    })
  }

  listStatus(event){
      event.preventDefault();
      this.setState({
          status: event.target.outerText
      },()=>{
          this.setState({loader:true,allTickets:[],h100:'h-100',nodata:false})
          this.getAllTicket()
      })
  }
  
  handleSearch(event){
    this.setState({searchData : event.target.value})
  }
  
  submitSearch(event){
    event.preventDefault();
    this.setState({loader:true,allTickets:[],h100:'h-100',nodata:false})
    this.getAllTicket()
  }

  changePage(index){
    this.setState({
      currentPage: index.target.outerText - 1,
      loader:true,allTickets:[],h100:'h-100',
    },()=>{
      this.getAllTicket()
    })
  }
  
  next(){
    if(this.state.currentPage != (this.state.totalPages -1)){  
      this.setState({
        currentPage: this.state.currentPage + 1,
        loader:true,allTickets:[],h100:'h-100'
      },()=>{
        this.getAllTicket()
      })
    }
  }

  previous(){
    if(!this.state.currentPage == 0){
        this.setState({
          currentPage: this.state.currentPage - 1,
          loader:true,allTickets:[],h100:'h-100'
        },()=>{
          this.getAllTicket()
        })
    }
  }

  handleYou(event){
    console.log(event.target.checked)
    if(event.target.checked){
      this.setState({
        handleYou: event.target.value
      },()=>{
        this.setState({loader:true,allTickets:[],h100:'h-100',nodata:false})
        this.getAllTicket()
      })
    }else{
      this.setState({
        handleYou: ''
      },()=>{
        this.setState({loader:true,allTickets:[],h100:'h-100',nodata:false})
        this.getAllTicket()
      })
    }
  }

  handleDetail = (id) =>{
    this.props.history.push(`/detail-ticket/${id}`);
  }

  render() {
    let temp = '*'
    let listPage = [];
    let state = this.state;
    let session = this.state.session;
    for(var i = 1;i <= state.totalPages; i++){ 
     if(i - 1 == state.currentPage){
       listPage.push(<MDBPageItem active><MDBPageNav>{i}</MDBPageNav></MDBPageItem>)
     }else{
       listPage.push(<MDBPageItem onClick={(event)=>this.changePage(event)}><MDBPageNav>{i}</MDBPageNav></MDBPageItem>)
     }
    }

    return (
        <Fragment>
            <div data-aos="fade-right">
              <MDBBreadcrumb color="indigo lighten-4">
                <MDBContainer className="d-flex">
                  <MDBBreadcrumbItem appendIcon icon="caret-right">Home</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem appendIcon icon="caret-right" active>List Ticket</MDBBreadcrumbItem>
                </MDBContainer>
              </MDBBreadcrumb>
            </div>
            <MDBContainer className={this.state.h100}>
            <MDBCol>
              <MDBFormInline onSubmit={(event) => this.submitSearch(event)} className="md-form d-flex justify-content-center">
              <MDBIcon icon="search" style={{cursor:"pointer"}} className="text-grey iconsrc" />
                <input className="form-control form-control-md ml-3" onChange={(event)=> this.handleSearch(event)} style={{width:"45%"}} type="text" placeholder="Ticket ID" aria-label="Search" />
                <MDBDropdown className="ml-3">
                  <MDBDropdownToggle
                    color="primary"
                    size="md"
                    className="m-0"
                  >
                  <b>{this.state.status}</b> <MDBIcon icon="caret-down" className="ml-1" />
                  </MDBDropdownToggle>
                  <MDBDropdownMenu color="white" right>
                    <MDBDropdownItem onClick={(event)=>this.listStatus(event)}>All</MDBDropdownItem>
                    <MDBDropdownItem onClick={(event)=>this.listStatus(event)}>Open</MDBDropdownItem>
                    <MDBDropdownItem onClick={(event)=> this.listStatus(event)}>Close</MDBDropdownItem>
                    <MDBDropdownItem onClick={(event)=> this.listStatus(event)}>Process</MDBDropdownItem>
                    <MDBDropdownItem onClick={(event)=>this.listStatus(event)}>Resolved</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBFormInline>
            </MDBCol>
            {
              session.roles.includes("ROLE_ADMIN") && (
                <MDBCol sm="12">
                <div class="custom-control custom-checkbox ml-4">
                  <input type="checkbox" name="handleyou" 
                  value={session.username} 
                  onChange={(event)=> this.handleYou(event)} class="custom-control-input" id="defaultChecked2"/>
                  <label class="custom-control-label" for="defaultChecked2">Handle By You</label>
                </div>
                </MDBCol>
              )
            }
            <MDBCol >
            {this.state.loader && (<SpinnerPageFull/>)}
               
              {this.state.nodata && (
                <div data-aos="fade-left">
                  <div className="text-center mt-4">
                    <MDBAlert color="primary" >
                      Complaint Not Found
                    </MDBAlert>
                  </div>
                </div>
              )}

              { 
                this.state.allTickets.map(data =>{
               
                  let date = new Date(data.trouble_time);
                  let dateNow = new Date();
                  let dateDisplay;
                  dateDisplay = `${date.getDate()} ${getMonth(date.getMonth())} ${date.getFullYear()}`;
                  if(date.getDate()+date.getMonth() == temp){
                    return(<PanelPage data={data} handleDetail={this.handleDetail}/>)                    
                  }else{
                    temp = date.getDate()+date.getMonth()
                      return(<Fragment>
                        <div className="text-center mt-5">
                          <h3><MDBBadge pill color="light">{`${dateDisplay}`}</MDBBadge></h3>
                        </div>
                        <PanelPage 
                        data={data}
                        handleDetail={this.handleDetail}
                        />
                      </Fragment>)
                  }
                })
              }
            </MDBCol>
            </MDBContainer>
            <MDBCol>
              <MDBContainer className="d-flex justify-content-center">
              <MDBRow>
                <MDBCol>
                  <MDBPagination className="mt-5 mb-4">
                    <MDBPageItem >
                      <MDBPageNav onClick={()=>this.previous()} aria-label="Previous">
                        <span aria-hidden="true">Previous</span>
                      </MDBPageNav>
                    </MDBPageItem>
                    {
                      listPage.map(data=>{
                        return(data)
                      })
                    }
                    <MDBPageItem> 
                      <MDBPageNav onClick={()=>this.next()} aria-label="Previous">
                        <span aria-hidden="true">Next</span>
                      </MDBPageNav>
                    </MDBPageItem>
                  </MDBPagination>
                </MDBCol>
              </MDBRow>
              </MDBContainer>
            </MDBCol>
           
            <FooterPage/>
        </Fragment>
    );
  }
}

// Exporting the component
export default GlobalConsumer(ListTickets);