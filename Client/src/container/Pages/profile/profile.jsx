import { MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdbreact";

import JumbotronPage from '../../../component/jumbotron/jumbotron';
import FooterPage from '../../../component/footer/footerPage';
import React, { Fragment } from 'react';

import { GlobalConsumer } from '../../../context/context';


class Profile extends React.Component {

  componentDidMount(){
    window.scrollTo(0, 0)
    this.props.dispatch({type:'profileActive'})

    if(!localStorage.getItem('user')){
      this.props.history.push('/')
    }
    this.props.dispatch({type:'navbarShow'})
  } 

  componentWillUnmount(){
    this.props.dispatch({type:'profileNonActive'})
    this.props.dispatch({type:'navbarHide'})
  }

  render() {

    return (
        <Fragment>
           <div data-aos="fade-right">
            <MDBBreadcrumb color="indigo lighten-4">
              <MDBContainer className="d-flex">
                <MDBBreadcrumbItem appendIcon icon="caret-right">Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem appendIcon active>Profile</MDBBreadcrumbItem>
              </MDBContainer>
            </MDBBreadcrumb>
            </div>
            <MDBContainer>
              <MDBCol>
                <MDBRow>
                
                    <JumbotronPage/>
          
                </MDBRow>
              </MDBCol>
            </MDBContainer>
            {/* <FooterPage/> */}
            
        </Fragment>
    );
  }
}

// Exporting the component
export default GlobalConsumer(Profile);