import React, {
    Component
  } from "react";
  import {Text
  } from 'react-native';
export default class ServicesListing extends Component {


    
  click=()=>{
    Actions.Sample2({hi:'aswathi'})
  }
    render() {

        return(
           
        <Text>
            {this.props.hi}
        </Text>
        
            
        );
    }}