import { GlobalConsumer } from '../../../context/context';
import authHeader from '../../../services/authHeader';
import React, { Fragment } from 'react';

import { MDBBtn} from "mdbreact";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";
import { MDBCol, MDBIcon, MDBRow } from 'mdbreact';
import { MDBDataTable  } from 'mdbreact';

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
    loader: true,
    session : JSON.parse(localStorage.getItem('user')),
    data:{
      columns: [
        {
          label: 'Ticket ID',
          field: 'ticket_id',
          width: 300,
          attributes: {
            'aria-controls': 'DataTable',
            'aria-label': 'Name',
          },
        },
        {
          label: 'Title',
          field: 'title',
          width: 270,
        },
        {
          label: 'Category',
          field: 'category_complant',
          width: 300,
        },
        {
          label: 'MSISDN',
          field: 'msisdn',
          sort: 'asc',
          width: 100,
        },
        {
          label: 'Priority',
          field: 'priority',
          sort: 'disabled',
          width: 150,
        },
        {
          label: 'Handler',
          field: 'user_handler',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Status',
          field: 'ticket_status',
          sort: 'disabled',
          width: 100,
        },
        {
          label: 'Detail',
          field: 'action',
          sort: 'disabled',
          width: 100,
        },
      ],
     rows:[
        
     ],
    }
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
      complainer_user: states.session.roles.includes("ROLE_ADMIN") ? '' :  states.session.username
    } 

    API.master.getTickets(params,authHeader()).then(res=>{
      if(res.data.totalItems > 0){

        let Resdata = res; 

        var data = {...this.state.data}

        let addEvent = [];

        Resdata.data.tickets.forEach(m =>{
          let result = {}
          result['ticket_id'] = m.ticket_id
          result['title'] = m.title
          result['category_complant'] = m.category_complant
          result['msisdn'] = m.msisdn
          result['user_handler'] = m.user_handler
          result['priority'] = m.priority
          result['user_handler'] = m.user_handler 
          result['ticket_status'] = m.ticket_status
          if(m.ticket_status == "Open"){
            result['rowClassNames'] = 'bg-warning'

          }
          result['action'] = <h5 className="d-flex"><MDBBtn color="primary " onClick={()=>this.handleDetail(m.ticket_id )} size="sm"><MDBIcon fas icon="search" size="1x" /></MDBBtn> 
          {/* <MDBBtn color="unique" size="sm"><MDBIcon fas icon="trash-alt" size="1x" /></MDBBtn> */}
          </h5>

          addEvent.push(result)
      })

      data['rows'] = addEvent

      this.setState({data, loader:false})                      
      
                               
      }else{
        
        return this.setState({loader:false})
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
          this.setState({loader:true,})
          this.getAllTicket()
      })
  }


  handleDetail = (id) =>{
    this.props.history.push(`/detail-ticket/${id}`);
  }

  render() {

    return (
        <Fragment>
            <div data-aos="fade-right">
              <MDBBreadcrumb color="indigo lighten-4 m-3">
                
                  <MDBBreadcrumbItem appendIcon icon="caret-right">Home</MDBBreadcrumbItem>
                  <MDBBreadcrumbItem appendIcon icon="caret-right" active>List Ticket</MDBBreadcrumbItem>
         
              </MDBBreadcrumb>
            </div>
           
            <MDBCol className="p-3">
              <MDBDataTable 
              hover 
              entriesOptions={[5, 20, 25]} 
              entries={5} 
              searchTop
              bordered
              searchBottom={false} 
              pagesAmount={4} 
              responsive 
              theadColor="bg-primary"
              borderless
              theadTextWhite 
              small 
              data={this.state.data} />
            </MDBCol>
        </Fragment>
    );
  }
}

// Exporting the component
export default GlobalConsumer(ListTickets);
