import { MDBCol, MDBContainer, MDBRow,MDBAlert,MDBBreadcrumb ,MDBBreadcrumbItem,
         MDBIcon,MDBBtn,MDBCard,MDBTypography ,MDBCardBody,MDBJumbotron,MDBInput } from 'mdbreact';
         
import SpinnerPageFull from '../../../component/loading_page/loading.page';
import ModalMapsPage from '../../../component/modal/modal_maps_hook';
import { GlobalConsumer } from '../../../context/context';
import authHeader from '../../../services/authHeader';
import React,{ Fragment } from 'react';
import API from '../../../services';
import Geocode from "react-geocode";
import Swal from 'sweetalert2';
import './style.css';


import {Autocomplete} from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

// Stepper Component
import StepLabel from '@material-ui/core/StepLabel';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';

function validateForm (errors) {
    let valid = true;
    Object.values(errors).forEach(val =>{
      if (val.length > 0 ) valid = false;
    })

    return valid;
}
  
function getSteps() {
    return ['Question 1', 'Question 2','Send file'];
}

const category = [
    {title:"Tower Telecomunication"},
    {title:"Return Materials"}
]

const priority = [
    {title : 'Critical'},
    {title : 'Major'},
    {title : 'Minor'},
    {title : 'Low'},
];

function getKeyProblem(a)
{
    let active;
    category.map((data,index) =>{
        if(data.title == a){
            active = index
        }
    })
    return active
}



class createTicket extends React.Component {

constructor(props){
        super(props)
        window.scrollTo(0, 0)
        this.props.dispatch({type:'navbarShow'})
}
    
state = {
        oader : false,
        selectedFiles: "",
        activeStep : 0, 
        form : {    
            question_0 :{
                ticket_id :"",
                complainer: JSON.parse(localStorage.getItem('user')).username,
                category_complant : "",
                priority : "",
            },
            question_1 :{
                trouble_time : "",
                description_complaint :"",
                address : "",
                msisdn:"",
                longitude : "",
                latitude: "",
            },
            question_2:{
                file_id:""
            }
        },
        error : {
            question_0 :{
                category_complant : "",
                priority : "",
            },
            question_1 :{
                trouble_time : "",
                description_complaint :"",
                address : "",
                msisdn:"",
                longitude : "",
                latitude: "",
            },
            question_2:{
                file_id:"",
            }
        }
}
    
handleValue(prop,step){
      
    let stepObject = `question_${step}`;
    let errors = {...this.state.error}
    let form = {...this.state.form};

    let {name,value} = prop.target
    let valueCheck = value ? value : ''
 
    if(name == 'category_complant' && valueCheck.length == 0){
        errors[stepObject][name] = `Category Complain cannot be empty`
    }else if (name == 'priority' && valueCheck.length == 0){
        errors[stepObject][name] = `Priority cannot be empty`
    }else if (name == 'trouble_time' && valueCheck.length == 0){
        errors[stepObject][name] = `Trouble Time cannot be empty`
    }else if (name == 'description_complaint' && valueCheck.length == 0){
        errors[stepObject][name] = `Description Complaint cannot be empty`
    }else if (name == 'address' && valueCheck.length == 0){
        errors[stepObject][name] = `Location Problem cannot be empty`
    }else if (name == 'msisdn' && valueCheck.length == 0){
        errors[stepObject][name] = `Customer Number cannot be empty`
    }else{
        // Remove Alert
        errors[stepObject][name] = '';
    }
    
    form[stepObject][name] = valueCheck

    this.setState(prevState => ({
        form, errors
    }))
  }

  handleNext(step){

    let errors = this.state.error[`question_${step}`]
    let form = this.state.form[`question_${step}`]

    for(var key in form) {
        if(form[key] == 0){
          const event  = {
              target :{
                name : key,
                value : form[key]
              }
          }
        this.handleValue(event,step)   
        }
    }

    if(validateForm(errors))
        this.setState({
            activeStep : this.state.activeStep + 1
        })
    }
  
  handleBack(){
    this.setState({
        activeStep : this.state.activeStep - 1
    })
  }

  handleReset(){
    this.setState({
            activeStep :0
        }) 
    }

    async setCurrentLocation (){
        if (navigator.geolocation) 
        {
            let form = {...this.state.form};
            
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
            
            form['question_1'].latitude = position.coords.latitude
            form['question_1'].longitude = position.coords.longitude
            
            this.setState({ form },()=>{
                this.getAddress()
            })
        } else {
            Swal.fire('Geolocation is not supported by this browser.','info')
        }
        
    }
    
    async getAddress(){
        Geocode.setApiKey("AIzaSyAhL_4LXSpRkQ1kEpUGyQ3V5oKGiN8Jv_c");
        let form = {...this.state.form};
        await Geocode.fromLatLng(form.question_1.latitude, form.question_1.longitude).then(
            (response) => {
              const address = response.results[0].formatted_address;
              form['question_1'].address = address;
              this.setState(form)
            },
            (error) => {
              console.error(error);
            });
    }

    componentDidMount(){
        this.getCodeID()
    }
    
    getNumberShort = (count) =>{
        let str = "" + count
        let pad = "0000000"
        let ans = pad.substring(0, pad.length - str.length) + str
        return ans
    }

    componentWillReceiveProps(){
        let form = {...this.state.form};
        let context = this.props.state; 
        form['question_1'].address = context.description
        form['question_1'].latitude = context.locationProblem.lat
        form['question_1'].longitude = context.locationProblem.lng
        this.setState({ form })   
    }
  
    selectFile(event) {
        if(event.target.files[0].size > 300000){
            return Swal.fire('File Size must be less 500mb', '', 'info') 
        }else{

            this.setState({
                selectedFiles: event.target.files
            },()=>{
                this.getBase64(event.target.files[0])
                .then(result => {
                    let form = {...this.state.form};
                    form['question_2'].file_id = result
                    this.setState({ form }) 
                })
                .catch(err => {
                  alert(err)
                });

            })

        }
    }

    getCodeID = async () =>{
        
        let date = new Date();
        let dateFormat = date.getDate() < 10 ? '0'+date.getDate() : date.getDate()
        let monthFormat = date.getMonth() < 10 ? '0'+date.getMonth() : date.getMonth()
        let yearFormat = date.getFullYear();
        let dateCode = yearFormat+monthFormat+dateFormat
        
        let initial = 'COP'
        let codeFirst = `${initial}-${dateCode}-${this.getNumberShort(1)}`
        let newPO,arrayId;

        let form = {...this.state.form}

        await API.master.getTickets('', authHeader()).then(response=>{
            if(response.data.tickets.length > 0){
                arrayId = response.data.tickets[0].ticket_id.split("-")
                  if(arrayId[1] === dateCode){
                      newPO = `${initial}-${dateCode}-${this.getNumberShort(parseInt(arrayId[2])+1)}` 
                  }else{
                      newPO = `${initial}-${dateCode}-${this.getNumberShort(1)}` 
                  }
                  form['question_0'].ticket_id = newPO
                  this.setState({form})
              }else{
                  form['question_0'].ticket_id = codeFirst
                  this.setState({form})
              }
      
          }).catch((error) => {
              alert(error)
          })
          
      }

    getBase64 = async file => {
        return await new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          
          let reader = new FileReader();

            reader.readAsDataURL(file);
    
            reader.onload = () => {
        
            baseURL = reader.result;
         
            resolve(baseURL);
          };
        });
      };
    
      sendReport(){
        let getReport = this.state;
        this.setState({loader:true})
        Swal.fire({
            title: 'Do you want to Send Report?',
            icon : 'info',
            showCancelButton: true,
            confirmButtonText: `Submit`,
            }).then((result) => {
            if(result.isConfirmed) {
                let sendObjt  = {}; 
                Object.values(getReport.form).forEach(object =>{
                    for(let key in object){
                      sendObjt[key] = object[key];
                    }
                })
               API.master.createTicket(sendObjt,authHeader()).then(res=>{
                    Swal.fire('Send Successfully', '', 'success')
                    setTimeout(()=>{    
                        this.props.history.push(`/detail-ticket/${getReport.form.question_0.ticket_id}`);
                    },1000)
               }).catch(err=>{
                   alert(err)
               })
            }
        })    
      }

  render() {
    let active = this.state;
    let steps = getSteps();
    return (
        <Fragment>
            {
                active.loader && (
                    <SpinnerPageFull/>
                )
            }
            <MDBBreadcrumb color="indigo lighten-4">
              <MDBContainer className="d-flex">
                <MDBBreadcrumbItem appendIcon icon="caret-right">Home</MDBBreadcrumbItem>
                <MDBBreadcrumbItem appendIcon icon="caret-right" active>Create Ticket</MDBBreadcrumbItem>
              </MDBContainer>
            </MDBBreadcrumb>
            <MDBContainer className="">
            {active.activeStep === steps.length && (
              <MDBAlert color="success">
                  <div className="d-flex justify-content-between">
                      <h5 className="alert-heading">Please Check your Report</h5>
                      <MDBIcon icon="check" className="mt-1 ml-2" size="1x"/>
                  </div>
                  <h6 className="mt-2">Click Send Report if form already correct</h6>
              </MDBAlert>
              
            )}
            {
                active.activeStep != steps.length && (
                <MDBRow>
                    <MDBCol>
                        <Stepper activeStep={active.activeStep} alternativeLabel>
                            {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                            ))}
                        </Stepper>
                    </MDBCol>
                </MDBRow>
                )
            }
                {/* form input */}
                {active.activeStep === steps.length ? (
                    <Fragment>   
                    <MDBRow>
                        <MDBCol className="text-center">
                            {/* <MDBJumbotron style={{"font-size":"12px","font-weight":"bold","background":"#E5E5E5","color":"#21293A"}} className="p-3 check"> */}
                                <MDBRow className="p-2">
                                    <MDBCol md="12" sm="12" className="p-2 d-flex justify-content-between cols">
                                        <div>Problem Category</div> <span>{active.form.question_0.category_complant}</span>
                                    </MDBCol>
                                    <MDBCol md="12" sm="12" className="p-2 d-flex justify-content-between cols">
                                        Priority <span>{active.form.question_0.priority}</span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="p-2">
                                    <MDBCol md="12" sm="12" className="p-2 d-flex justify-content-between cols">
                                        Trouble Time Problem <span>{active.form.question_1.trouble_time}</span>
                                    </MDBCol>
                                    <MDBCol md="12" sm="12" className="p-2 d-flex justify-content-between cols">
                                        Address  <span className="w-75" style={{"text-align":"right"}}>{active.form.question_1.address}</span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="p-2">
                                    <MDBCol md="12" sm="12" className="p-2 d-flex justify-content-between cols">
                                        Customer Number <span>{active.form.question_1.msisdn}</span>
                                    </MDBCol>
                                    <MDBCol md="12" sm="12" className="p-2 d-flex justify-content-between cols">
                                        File Attachment <span>
                                        <MDBTypography tag='h4' variant="h4-responsive">
                                                <a href={active.form.question_2.file_id} size="sm" download={active.selectedFiles.length != 0 ? active.selectedFiles[0].name : ''}>{ active.selectedFiles.length != 0 ? active.selectedFiles[0].name : ''}</a>
                                        </MDBTypography>
                                        </span>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow className="p-2">
                                    <MDBCol md="6" sm="12" className="p-2 d-flex justify-content-between cols">
                                        Detail Problem 
                                    </MDBCol>
                                    <MDBCol md="6" sm="12" className="p-2 d-flex justify-content-between cols">
                                       <span style={{"text-align":"justify"}}>{active.form.question_1.description_complaint}</span>
                                    </MDBCol>
                                </MDBRow>
                            {/* </MDBJumbotron> */}
                            <MDBRow className="mt-2 mb-4">
                                    <MDBCol className="text-center">
                                        <MDBBtn size="sm" onClick={()=>this.handleReset()} color="primary">
                                                <MDBIcon icon="arrow-left" className="mr-1" />
                                                Back 
                                        </MDBBtn>
                                        <MDBBtn size="sm" onClick={()=>this.sendReport()} color="primary">
                                                <MDBIcon icon="paper-plane" className="mr-2" />
                                                Send Report 
                                        </MDBBtn>
                                    </MDBCol>
                                </MDBRow> 
                        </MDBCol>
                    </MDBRow> 
                    </Fragment>
                    ) : (
                    <Fragment>
                        {/* <MDBJumbotron className="mt-3 h-100"> */}
                        <MDBRow>
                            <MDBCol sm="12" md="12">
                                    <MDBRow>
                                        <MDBCol md="12" sm="12">
                                            {
                                                active.activeStep == 0 ? (
                                                <div data-aos="fade-right">
                                                <MDBCard color="indigo" style={{ backgroundImage: `url(https://mdbcdn.b-cdn.net/img/Photos/Others/gradient1.jpg)`}} text="white" className="mb-3">
                                                    <MDBCardBody className="d-flex justify-content-between align-items-center">
                                                        <div className="text-left h5">
                                                            Please Describe your Problem
                                                        </div>
                                                        <MDBIcon icon="question"  size="2x"/>
                                                    </MDBCardBody>
                                                </MDBCard>
                                                </div>
                                                ) : (
                                                 <MDBAlert color="primary" className="d-flex justify-content-between">
                                                    <h5 className="mt-2 w-75">{active.form.question_0.category_complant} - {active.form.question_0.priority}</h5>
                                                    
                                                    <MDBIcon icon="broadcast-tower" className="mt-1" size="2x"/>
                                                </MDBAlert>
                                                )
                                            }
                                        </MDBCol>
                                   
                                        {/* Question 1 */}
                                        {
                                            active.activeStep == 0 && (
                                                <Fragment>
                                                    <MDBCol md="12" sm="12" className="mt-4">
                                                    <label>Problem Category</label>
                                                    <Autocomplete
                                                        id="combo-box-demo"
                                                        className = "mt-3"
                                                        name="category_complant"
                                                        options={category}
                                                        getOptionLabel={(option) => option.title}
                                                        style={{ width: "100%" }}
                                                        size="small"
                                                        defaultValue={category[getKeyProblem(active.form.question_0.category_complant)]}
                                                        onChange={(event,value)=>{
                                                            let val = value ? value : {title:''}
                                                            let send = {
                                                                target: {
                                                                    name : 'category_complant',
                                                                    value : val.title
                                                                }
                                                            }
                                                            this.handleValue(send,active.activeStep)
                                                        }}
                                                        renderInput={(params) => <TextField {...params} label="Select" variant="outlined" />}
                                                        />
                                                    </MDBCol>
                                                    <MDBCol sm="12" md="12">
                                                    {
                                                        active.error.question_0.category_complant.length > 0 && 
                                                            <div data-aos="fade-top">
                                                            <MDBAlert color="danger" className="p-2 mt-3 d-flex justify-content-between">
                                                            {active.error.question_0.category_complant}
                                                            <MDBIcon icon="info" className="mt-1" size="1x"/>
                                                            </MDBAlert>
                                                            </div>
                                                                        
                                                    }
                                                    </MDBCol>
                                                    <MDBCol className="mt-3 p-3">
                                                    <label>Priority</label>
                                                    <select 
                                                    className="browser-default custom-select mt-2" 
                                                    name="priority" onChange={(a)=>this.handleValue(a,active.activeStep)}>
                                                        <option value="">Choose</option>
                                                    {
                                                            priority.map(data=>{
                                                                if(data.title == active.form.question_0.priority){
                                                                    return <option value={data.title} selected="selected">{data.title}</option>
                                                                }else{
                                                                    return <option value={data.title}>{data.title}</option>
                                                                }   
                                                            })
                                                    }
                                                    </select>
                                                    </MDBCol>
                                                    <MDBCol md="12" sm="12">
                                                     {
                                                        active.error.question_0.priority.length > 0 && 
                                                            <div data-aos="fade-top">
                                                            <MDBAlert color="danger" className="p-2 mt-3 d-flex justify-content-between">
                                                            {active.error.question_0.priority}
                                                            <MDBIcon icon="info" className="mt-1" size="1x"/>
                                                            </MDBAlert>
                                                            </div>
                                                                        
                                                    }
                                                    </MDBCol>
                                                </Fragment>
                                            )
                                        }
                                        {
                                            active.activeStep == 1 && (
                                                <Fragment>
                                                    <MDBCol md="12" sm="12" className="mt-4">
                                                        <label>Trouble Time Problem</label>
                                                        <MDBInput outline size="lg" onChange={(a)=>this.handleValue(a,active.activeStep)} 
                                                        value={active.form.question_1.trouble_time}
                                                        type="datetime-local" 
                                                        name="trouble_time"
                                                        />
                                                    </MDBCol>
                                                    <MDBCol sm="12" md="12">
                                                    {
                                                        active.error.question_1.trouble_time.length > 0 && 
                                                            <div data-aos="fade-top">
                                                            <MDBAlert color="danger" className="p-2 d-flex justify-content-between">
                                                            {active.error.question_1.trouble_time}
                                                            <MDBIcon icon="info" className="mt-1" size="1x"/>
                                                            </MDBAlert>
                                                            </div>
                                                                        
                                                    }
                                                    </MDBCol>
                                                    <MDBCol md="12" sm="12" className="mt-4">
                                                        <label>Detail Problem</label>
                                                         <MDBInput type="textarea"  
                                                          onChange={(a)=>this.handleValue(a,active.activeStep)}  
                                                          outline label="" 
                                                          name="description_complaint" valueDefault={active.form.question_1.description_complaint} rows="3" />
                                                    </MDBCol>
                                                    <MDBCol sm="12" md="12">
                                                    {
                                                        active.error.question_1.description_complaint.length > 0 && 
                                                            <div data-aos="fade-top">
                                                            <MDBAlert color="danger" className="p-2 d-flex justify-content-between">
                                                            {active.error.question_1.description_complaint}
                                                            <MDBIcon icon="info" className="mt-1" size="1x"/>
                                                            </MDBAlert>
                                                            </div>
                                                                        
                                                    }
                                                    </MDBCol>
                                                    <MDBCol md="12" sm="12" className="mt-4">
                                                         <label>Location Problem</label>
                                                         <div className="text-right">
                                                            <MDBBtn color="primary" size="sm" onClick={()=>this.setCurrentLocation()} outline className="">
                                                                <MDBIcon icon="map-marker-alt" size="2x" />
                                                            </MDBBtn>
                                                            <ModalMapsPage/>
                                                         </div>
                                                        <MDBInput type="textarea" onChange={(a)=>this.handleValue(a,active.activeStep)} outline label="" name="address" value={active.form.question_1.address} rows="3" />
                                                    </MDBCol>
                                                    <MDBCol sm="12" md="12">
                                                    {
                                                        active.error.question_1.address.length > 0 && 
                                                            <div data-aos="fade-top">
                                                            <MDBAlert color="danger" className="p-2 d-flex justify-content-between">
                                                            {active.error.question_1.address}
                                                            <MDBIcon icon="info" className="mt-1" size="1x"/>
                                                            </MDBAlert>
                                                            </div>
                                                                        
                                                    }
                                                    </MDBCol>
                                                    <MDBCol md="12" sm="12" className="mt-2">
                                                         <label>Customer Number</label>
                                                         <MDBInput outline hint="" name="msisdn" value={active.form.question_1.msisdn} onChange={(a)=>this.handleValue(a,active.activeStep)} type="text" />
                                                    </MDBCol>
                                                    <MDBCol sm="12" md="12">
                                                    {
                                                        active.error.question_1.msisdn.length > 0 && 
                                                            <div data-aos="fade-top">
                                                            <MDBAlert color="danger" className="p-2 d-flex justify-content-between">
                                                            {active.error.question_1.msisdn}
                                                            <MDBIcon icon="info" className="mt-1" size="1x"/>
                                                            </MDBAlert>
                                                            </div>
                                                                        
                                                    }
                                                    </MDBCol>
                                                </Fragment>
                                            )
                                        }
                                            {
                                            active.activeStep == 2 && (
                                                <Fragment>
                                                    <MDBCol className="mt-3 text-center">
                                                    <label className="btn btn-default">
                                                        <input type="file" name="file_id" onChange={(e)=>this.selectFile(e)} />
                                                    </label>
                                                     <MDBTypography tag='h3' variant="h3-responsive" className="mt-3">
                                                            <a href={active.form.question_2.file_id} size="lg" download={active.selectedFiles.length != 0 ? active.selectedFiles[0].name : ''}>{ active.selectedFiles.length != 0 ? active.selectedFiles[0].name : ''}</a>
                                                     </MDBTypography>
                                                    </MDBCol>
                                                </Fragment>
                                            )
                                        }
                                    </MDBRow>
                                </MDBCol>
                                <MDBCol className="text-center mt-4">
                                    <MDBBtn color="primary" size="sm" disabled={active.activeStep === 0}
                                    onClick={()=>this.handleBack()} >
                                    <MDBIcon icon="arrow-left" className="mr-1" />
                                    Back 
                                    </MDBBtn>

                                    <MDBBtn color="primary" size="sm" onClick={()=>this.handleNext(active.activeStep)}>
                                    <MDBIcon icon="arrow-right" className="mr-1" />
                                    Next 
                                    </MDBBtn>
                                </MDBCol>
                        </MDBRow>
                        {/* </MDBJumbotron> */}
                    </Fragment>
                    )}
            </MDBContainer>
            {/* <FooterPage/> */}
        </Fragment>
    );
  }
}

// Exporting the component
export default GlobalConsumer(createTicket);