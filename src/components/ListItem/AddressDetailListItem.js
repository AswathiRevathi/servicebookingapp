
  import React, { Component } from 'react';
  import {Text, View ,StyleSheet,TouchableOpacity,Image} from "react-native";
  import { Card,Thumbnail,Right} from 'native-base';
  import Moment from 'moment';
 




  import AgeIcon from '../../assets/Images/age.png'
  import UserIcon from '../../assets/Images/user.png';
 import GenderIcon from '../../assets/Images/gender.png'
  import DobIcon from '../../assets/Images/dob.png';
  import LocationIcon from '../../assets/Images/location.png';
  import MobileIcon from '../../assets/Images/mobile.png';

  import { Actions } from "react-native-router-flux";
  import { CheckBox } from 'react-native-elements'
 

  //import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
  
  
 
  
  class AddressDetailListItem extends Component {
   




        
              render() {
                var radio_props=this.props;         
                console.log("NAME IS"+this.props.namee) 
      //           var dateFormat = require('dateformat');
      //  dateFormat("2018-09-12", "dddd, mmmm d, yyyy");
      
              
      return(
       
          
        <View>
         
        <Card style={styles.cardStyle}>
                   <View style={styles.itemContainer}>
                           {/* <View style={{flexDirection:'column'}}> */}
                           <View style={{width:"100%",flexDirection:"row"}}>
   
                                   <View style={{width:"80%",flexDirection:"row"}}>
                                       <Image source = {UserIcon} style = {{width:15,height:15}}/>
                                       <Text style={{fontWeight:'bold',fontSize:16,paddingLeft:20}}>{this.props.namee}</Text>
                                       </View>
                                      
                                    </View>
   
                                    <View style={{flexDirection:"row"}}>
                                    
                                    <Image source = {AgeIcon} style = {{width:15,height:15}}/>
                                       <Text style={{fontSize:15,paddingLeft:18}}>{this.props.age}</Text>
                                       </View>
   
                                       <View style={{flexDirection:"row"}}>
                                       <Image source = {GenderIcon} style = {{width:15,height:15}}/>
                                       <Text style={{fontSize:15,paddingLeft:20}}>{this.props.gender}</Text>
                                       </View>
   
                                       
   
                                       <View style={{flexDirection:"row"}}>
                                       <Image source = {LocationIcon} style = {{width:15,height:15}}/>
                                       <Text style={{fontSize:15,paddingLeft:20}}>{this.props.houseName},{this.props.locality},{this.props.district},{this.props.pin}</Text>
                                       </View>
                                       
                                       <View style={{flexDirection:"row"}}>
                                       <Image source = {MobileIcon}  style = {{width:15,height:15}}/>
                                       <Text style={{fontSize:15,paddingLeft:20}}>{this.props.mobileNumber}</Text>
                                       </View>
                 
             
          </View>
          </Card>
          </View>
          
  
      );
  }
}
  
  const styles = StyleSheet.create({
    itemContainerSelected: {
        margin: 20,
       // flexDirection:'column',
       // alignItems:'flex-start',
       // paddingLeft:20
       backgroundColor:"steelblue"
      },
      itemContainerNot: {
        
        margin: 20
      },
      itemContainer: {
        
        margin: 20,
        // backgroundColor:"powderblue"
      },
      
  
    cardStyle:{
        marginLeft:15,
       marginRight:15,
       marginTop:15,

  }
      
      
      
    });
  
  
  export default AddressDetailListItem;
  
  
  