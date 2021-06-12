import React, { useState,Fragment,useEffect } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBInput, MDBModalBody, 
    MDBModalHeader, MDBModalFooter, MDBCol,MDBIcon, MDBRow,MDBAlert  } from 'mdbreact';
    
import GooglePlacesAutocomplete,{geocodeByAddress, getLatLng} from 'react-google-places-autocomplete';
import { GlobalConsumer } from '../../context/context';
import GoogleMapReact from 'google-map-react';
import Marker from './img/marker.svg'

function ModalMapsPage(props) {
      const [center, setCenter] = useState({ lat: -0.390688 , lng: 120.056756});
      const [modal, setModal] = useState(false);
      const [value, setValue] = useState(null);
      const [zoom, setZoom] = useState(4);
      
      //Marker 
      const AnyReactComponent = () => {
            return(
                  <img src={Marker} style={{width:"25px"}}/>
            )
      };
      
      const closeModal = (modal) =>{
            setModal(false)
      }
      
      // If Map already select on Auto Completed
      useEffect(()=>{
            if(value){
                  console.log('value',value)
                  geocodeByAddress(value.label)
                  .then(results => getLatLng(results[0]))
                  
                  .then(({ lat, lng }) =>
                        setCenter({ lat, lng }),
                        setZoom(17),
                  );
            }
      })

      const onSetLocation = () =>{
           const reps = setInterval(()=>{
                  props.dispatch({type:'setLocation', value:{center:center,description:value.label}})
            },500)
            
            setTimeout(()=>{
                  clearInterval(reps)
            },1500)

            closeModal();
      }
      
      function createMapOptions  (maps) {
            return {
              panControl: true,
              mapTypeControl: true,
              scrollwheel: true,
              styles: [{ stylers: [ { 'gamma': 0.8 }, { 'lightness': 4 }, { 'visibility': 'on' }] }]
            }
      }

      return (
        <Fragment>
            <MDBBtn color="primary" onClick={() => setModal(true)} size="sm" outline className="">
                <MDBIcon icon="search" size="2x" />
          </MDBBtn>
            <MDBContainer>
            <MDBModal isOpen={modal} toggle="toggle" size="lg" top>
                  <MDBModalHeader toggle={()=>closeModal()}><h6>Search Location</h6></MDBModalHeader>
                        <MDBModalBody>
                              <MDBContainer className="text-white">
                                    <MDBRow>
                                    <MDBCol sm="12" md="12">
                                          <GooglePlacesAutocomplete
                                          selectProps={{
                                                value,
                                                onChange: setValue,
                                          styles: {
                                                input: (provided) => ({
                                                ...provided,
                                                color: 'black',
                                                }),
                                                option: (provided) => ({
                                                ...provided,
                                                color: 'black',
                                                }),
                                                singleValue: (provided) => ({
                                                ...provided,
                                                color: 'black',
                                                }),
                                          },
                                          }}
                                          />
                                    </MDBCol>
                                    <MDBCol sm="12" md="12" className="mt-4">
                                          <div id="map" style={{ height: '62vh', width: '100%' }}>
                                          <GoogleMapReact
                                          bootstrapURLKeys={{ key: "AIzaSyAhL_4LXSpRkQ1kEpUGyQ3V5oKGiN8Jv_c" }}
                                          defaultZoom={4}
                                          zoom={zoom}
                                          center={center}
                                          options={createMapOptions}
                                          >
                                          <AnyReactComponent
                                                lat={center.lat}
                                                lng={center.lng}
                                          />
                                          </GoogleMapReact>
                                          </div>
                                    </MDBCol>
                                    </MDBRow>
                              </MDBContainer>
                        </MDBModalBody>
                        <MDBModalFooter>
                              <MDBBtn color="secondary" size="sm" onClick={()=>closeModal()}>Close</MDBBtn>
                              <MDBBtn color="primary" size="sm" onClick={()=>onSetLocation()}>Set Location</MDBBtn>
                        </MDBModalFooter>
                       
                  </MDBModal>
            </MDBContainer>
        </Fragment>
  );
}

export default GlobalConsumer(ModalMapsPage);