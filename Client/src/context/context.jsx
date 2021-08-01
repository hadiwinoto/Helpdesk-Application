
import React, { createContext } from 'react';

const RootContext = createContext();
const Provider = RootContext.Provider;

// profivder
const Globalprovider = (Children) =>{
    return(
        class ParentComponent extends React.Component{
      
        state = {
            navbarStatus : false,
            navbarHomeStatus: false,
            navbarProfileStatus: false,
            locationProblem:""
        }

        dispatch = (action) =>{
            switch (action.type) {
                case 'navbarShow':
                    return this.setState({ navbarStatus : true })
                    break;
                case 'navbarHide':
                    return this.setState({ navbarStatus : false })
                    break;
                case 'homeActive':
                    return this.setState({ navbarHomeStatus : true })
                    break;
                case 'homeNonActive':
                    return this.setState({ navbarHomeStatus : false })
                    break;
                case 'profileActive':
                    return this.setState({ navbarProfileStatus : true })
                    break;
                case 'profileNonActive':
                    return this.setState({ navbarProfileStatus : false })
                    break;
                case 'setLocation': 
                    return this.setState({ locationProblem :  action.value.center, description: action.value.description})
                    break;
                default:
                    break;
            }
        }
            render(){

                return(
                    <Provider value={
                        {
                            state: this.state,
                            dispatch : this.dispatch
                        }
                    }>
                       <Children {...this.props} />
                    </Provider> 
                )
            }
        }
    )
}

export default Globalprovider;

// consumer
const Consumer = RootContext.Consumer;

export const GlobalConsumer = (Children) =>{

    return(
        class ParentConsumer extends React.Component{
                render(){
                    return(
                        <Consumer>
                            {   
                                value =>{
                                    return(
                                        
                                        <Children {...this.props} {...value}/>
                                    )
                                }
                            }
                        </Consumer>
                    )
                }
            } 
    )
}
