
  import React, { Component } from 'react';
  import {Text, View ,StyleSheet,TouchableOpacity,Image,ImageBackground} from "react-native";
  import { Card,Thumbnail,Right, TextInput,Input,Radio,Icon} from 'native-base';
  import Moment from 'moment';
  import AgeIcon from '../../assets/Images/age.png'
  import UserIcon from '../../assets/Images/user.png';
 import GenderIcon from '../../assets/Images/gender.png'
  import DobIcon from '../../assets/Images/dob.png';
  import LocationIcon from '../../assets/Images/location.png';
  import MobileIcon from '../../assets/Images/mobile.png';
import RadioButton from 'radio-button-react-native';
import RadioGroup from 'react-native-radio-buttons-group';
  import { Actions } from "react-native-router-flux";
  import { CheckBox } from 'react-native-elements'
 

  //import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
  
  
  
  
  class AddressListItems extends Component {

  render() {
                let modalContent = null;


  console.log("inside selectStatus" +this.props.selectStatus) 
if(this.props.selectStatus==true){
  modalContent=(
    <TouchableOpacity onPress={this.props.onItemPressed}>
    
 
                    <View style={styles.itemContainerSelected} pointerEvents="none">

                    <Text style={styles.selctedTitleText}>{this.props.slotText}</Text>
                    </View>
                
</TouchableOpacity>
  );
  
}
else{
  modalContent=(
    <TouchableOpacity onPress={this.props.onItemPressed}>
    

                    <View style={styles.itemContainerNotSelected} pointerEvents="none">
                    
                    <Text style={styles.selctedTitleText}>{this.props.slotText}</Text>
                    
                    </View>
                  
</TouchableOpacity>
  );
}
 




               
              
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
                                    <View style={{width:"20%",alignItems:"flex-end"}}>
                                  {modalContent}

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

                                    {/* <View style={{flexDirection:"row"}}>
                                    <Image source = {DobIcon} style = {{width:15,height:15}}/>
                                    <Text style={{fontWeight:'bold',fontSize:15,paddingLeft:20}}>{Moment(this.props.dob.split("T")[0]).format('DD-MM-YYYY')}</Text>
                                    </View> */}

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
   
      width: 30,
      height: 30,
      borderRadius: 30/2,
      borderColor:'black',
      borderWidth:4,
       backgroundColor:'steelblue'
    },
    itemContainerNotSelected: {
   
       width: 30,
       height: 30,
       borderRadius: 30/2,
       borderColor:'black',
       borderWidth:4,
       backgroundColor: 'white'
    },

      itemContainer: {
        
        margin: 10,
        // backgroundColor:"powderblue"
      },
      CircleShapeView: {
        width: 150,
        height: 150,
        borderRadius: 150/2,
        backgroundColor: '#00BCD4'
    },
  
    cardStyle:{
        marginLeft:10,
       marginRight:10,
       marginTop:10,

  }
      
      
      
    });
  
  
  export default AddressListItems;
  
  
  