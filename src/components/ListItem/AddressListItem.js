
  import React, { Component } from 'react';
  import {Text, View ,StyleSheet,TouchableOpacity,Image} from "react-native";
  import { Card,Thumbnail,Right, Input,Radio,Icon} from 'native-base';
  import Moment from 'moment';
  import UserIcon from '../../assets/Images/user.png';
 
  import DobIcon from '../../assets/Images/dob.png';
  import LocationIcon from '../../assets/Images/location.png';
  import MobileIcon from '../../assets/Images/mobile.png';
import RadioButton from 'radio-button-react-native';
import RadioGroup from 'react-native-radio-buttons-group';
  import { Actions } from "react-native-router-flux";
  import { CheckBox } from 'react-native-elements'
 

  //import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
  
  
  
  
  class AddressListItem extends Component {

   

  

  constructor() {
    super();
    this.state = {checked: false}}
onCheck = () => {
    const { checked } = this.state;
    if(this.props.radio===0)
    {
      this.setState({checked:this.state.checked})
    }
    else if(!this.props.radio)
    {
      this.setState({checked:this.state.checked})
    }
    else{
    if(checked == true){this.setState({ checked: false  }) }
    else {this.setState({ checked: true })}
    }
    this.props.onItemPressed();
  }

  
   
              render() {
                let modalContent = null;

  console.log("inside radio" + this.props.radioselected) 
  
  



                // var radio_props=this.props;         
                // console.log("NAME IS"+this.props.namee) 
                // console.log("selected radio id",this.props.radio)
                if(this.props.radio===0)
                {
                  modalContent=(
                    <Radio selected = {!this.state.checked} onPress={() => { this.onCheck() }}/>
                  )

                }
                else if(!this.props.radio)
                {
                  modalContent=(
                    <Radio selected = {this.state.checked} onPress={() => { this.onCheck() }}/>
                  )

                }
                else{
                  modalContent=(
                    <Radio selected = {this.state.checked} onPress={() => { this.onCheck() }}/>
                  )
                }

               
              
      return(
       
          
       <View>
         
     <Card style={styles.cardStyle}>
                <View style={styles.itemContainer}>
                        <View style={{flexDirection:'column',width:"100%"}}>

                                <View style={{width:"50%",flexDirection:"row"}}>
                                    <Image source = {UserIcon} style = {{width:20,height:20}}/>
                                    <Text style={{fontWeight:'bold',fontSize:14,paddingLeft:10}}>{this.props.namee}</Text>
                                </View>

                                <View style={{width:"50%",flexDirection:"row"}}>
                                <Icon name="calendar" />                               
                                
                                  <Text style={{fontWeight:'bold',fontSize:12}}>{this.props.age}</Text>
                             
                                </View>
          
                        </View>

                        <View style={{flexDirection:"row",width:"100%"}}>

                                <View style={{width:"50%",flexDirection:"row"}}>
                                {/* <Image source = {GenderIcon} style = {{width:30,height:30}}/> */}
                                <Text style={{fontWeight:'bold',fontSize:14,paddingLeft:30}}>{this.props.gender}</Text>
                                </View>

                                <View style={{width:"50%",flexDirection:"row"}}>
                                <Image source = {DobIcon} style = {{width:20,height:20}}/>
                                <Text style={{fontWeight:'bold',fontSize:14}}>{Moment(this.props.dob.split("T")[0]).format('DD-MM-YYYY')}</Text>
                             </View>
                        </View>
                       
            <View style={{flexDirection:"row",width:"100%"}}>
            
            <View style={{width:"50%",flexDirection:"row"}}>
            <Image source = {LocationIcon} style = {{width:20,height:20}}/>
            <Text style={{fontWeight:'bold',fontSize:14,paddingLeft:10}}>{this.props.houseName}</Text>
            </View>
            <View style={{width:"30%"}}>
           <Text style={{fontWeight:'bold',fontSize:14}}>{this.props.locality}</Text>
           </View>
           <View style={{width:"20%"}}>

          
     {modalContent}
         
                      </View>
           </View>
           <View style={{flexDirection:"row",width:"100%"}}>
           <View style={{width:"50%"}}>
            <Text style={{fontWeight:'bold',fontSize:14,paddingLeft:30}}>{this.props.district}</Text>
            </View>
            <View style={{width:"25%"}}>
            <Text style={{fontWeight:'bold',fontSize:14}}>{this.props.statee}</Text>
            </View>
            <View style={{width:"25%"}}>
           <Text style={{fontWeight:'bold',fontSize:14}}>{this.props.pin}</Text>
          </View>
           </View>
           <View style={{flexDirection:"row"}}>
           <Image source = {MobileIcon} style = {{width:20,height:20}}/>
           <Text style={{fontWeight:'bold',fontSize:14,paddingLeft:10}}>{this.props.mobileNumber}</Text>
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
  
  
  export default AddressListItem;
  
  
  