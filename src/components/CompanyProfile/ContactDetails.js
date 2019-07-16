import React,{Component} from 'react';
import {  Card, CardItem,  Text,  Left, Body, Right,Button } from 'native-base';
import {StyleSheet,Image,View} from "react-native";
class ContactDetails extends Component{
    render(){
        return(
             <Card>
            
            <CardItem>
              <Body>
              <Text style={styles.HeadingText}>Contact Us</Text>
              <View style={styles.ListContainer}>
            <Image style={styles.icon_image} source = { require('../../assets/Images/location_icon.png') }/>
            <Text style={{fontSize:13}}>{this.props.address}</Text>
              </View>
              <View style={styles.ListContainer}>
            <Image style={styles.icon_image} source = { require('../../assets/Images/call.png') }/>
            <Text style={{fontSize:13}}>{this.props.contactno}</Text>
              </View>
               <View style={styles.ListContainer}>
            <Image style={styles.icon_image} source = { require('../../assets/Images/email_icon.png') }/>
            <Text style={{fontSize:13}}>{this.props.email}</Text>
              </View>
                </Body>
            </CardItem>
            <CardItem>
            <View style={styles.buttonContainer}>
            <Button rounded info style={styles.left_btn} onPress={this.props.onMapClick}>
                <Text>On google Map</Text>
            </Button>
          <Button rounded info style={styles.right_btn} onPress={this.props.onInteriorClick}>
            <Text>Floor Map</Text>
          </Button>
        </View>
        </CardItem>
          </Card>
        );
    }
}
const styles = StyleSheet.create({
  icon_image: {
   width:20,
   height:20,
   marginRight:10,
    resizeMode:'contain'
  },
   ListContainer: {
   width:"100%",
   flexDirection:'row',
   marginBottom:5
  },
   HeadingText: {
  color:'#000000',
  fontSize:14,
  fontWeight:'bold',
  marginBottom:15
  },
   buttonContainer: {
   flexDirection:'row',
   flex:2
  },
left_btn:{
    flex:1,
    marginRight:2,
    marginBottom:5,
    fontSize:12,
    backgroundColor: '#2471A3'
  },
right_btn:{
    flex:1,
    marginLeft:2,
    marginBottom:5,
    fontSize:12,
    backgroundColor: '#2471A3'
  }
});
export default ContactDetails;