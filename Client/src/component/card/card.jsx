import React, { Fragment } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

class CardExample extends React.Component {
    render(){

        return (
            <Fragment>
            <MDBCol style={{ maxWidth: "100%" }}>
            <MDBCard className="mt-3 card-menu">
                <MDBCardImage className="img-fluid mx-auto w-50 mt-4 mb-4" src={this.props.img}
                waves />
                <MDBCardBody className="text-center">
                <MDBCardTitle>{this.props.title}</MDBCardTitle>
                <MDBCardText>{this.props.desc}</MDBCardText>
                <MDBBtn gradient="blue" onClick={()=>this.props.goto()} className="btn-lg btn-block">Open</MDBBtn>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
            </Fragment>
        )
    }
}

export default CardExample;