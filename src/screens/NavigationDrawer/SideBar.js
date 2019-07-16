import React, { Component } from 'react';
import {
  View,
  Image,BackHandler,AsyncStorage,Alert
} from 'react-native';


import DrawerHeader from './DrawerHeader';
import {Actions} from 'react-native-router-flux';
import BookingStatus from '../Booking/BookingStatus';


import {
  Content,
  List,
  ListItem,Button,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail
} from 'native-base';


export default class Sidebar extends Component {
  
_logout=()=>{


  Alert.alert(
    'Logout',
    'Do you really want to Logout from App?',
    [
     
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'Confirm', onPress: () =>this.exitFromApp()},
    ],
    { cancelable: false }
  )       


  




 
}


exitFromApp=()=>{
  this.removeItemValue('UserId');
    // this.removeItemValue(UserId);
  BackHandler.exitApp();

}


removeItemValue = async (key) => {
  try {
        await AsyncStorage.removeItem(key);
        console.log("removed","000");
        return true;
      }
      catch(exception) {
        return false;
      }
}


  render() {
    return (
      <Content style={{ backgroundColor: '#FFFFFF' }}>
        <DrawerHeader />

        <List>
        <ListItem icon onPress={()=>Actions.Home()}>
            <Left>
              <Icon name="home" /> 
            </Left>
            <Body >
              <Text>Home</Text>
            </Body>
          </ListItem>
          <ListItem icon onPress={()=>Actions.ServiceCategory({nav:1})}>
            <Left>
              <Icon name="git-branch" /> 
            </Left>
            <Body >
              <Text>Departments</Text>
            </Body>
          </ListItem>
          <ListItem icon 
          onPress={()=>Actions.Service({nav:1})}>
            <Left>
              <Icon name="medal" /> 
            </Left>
            <Body >
              <Text>Doctors</Text>
            </Body>
          </ListItem>
          <ListItem icon   onPress={()=>Actions.Service({nav:1})}>
            <Left>
              <Icon name="microphone" /> 
            </Left>
            <Body >
              <Text>Book Now</Text>
            </Body>
          </ListItem>
          <ListItem icon  onPress={()=>Actions.Gallery({nav:1})}>
            <Left>
              <Icon name="folder" /> 
            </Left>
            <Body >
              <Text>Gallery</Text>
            </Body>
          </ListItem>
          <ListItem icon  onPress={()=>Actions.AddressDetails({nav:1})}>
            <Left>
              <Icon name="navigate" /> 
            </Left>
            <Body >
              <Text>Address Book</Text>
            </Body>
          </ListItem>

          <ListItem icon  onPress={()=>Actions.BookingStatus({nav:1})}>
            <Left>
              <Icon name="paper" /> 
            </Left>
            <Body >
              <Text>Booking Status</Text>
            </Body>
          </ListItem>

            <ListItem icon  onPress={()=>Actions.Notification({nav:1})}>
            <Left>
              <Icon name="alert" /> 
            </Left>
            <Body >
              <Text>News & Events</Text>
            </Body>
          </ListItem>




          <ListItem icon  onPress={()=>Actions.Facility({nav:1})} >
            <Left>
              <Icon name="switch" />
            </Left>
            <Body>
              <Text>Facilities</Text>
            </Body>
          </ListItem>
          <ListItem icon   onPress={()=>Actions.CompanyProfileScreen({nav:1})} >
            <Left>
              <Icon name="more" />
            </Left>
            <Body>
              <Text>More</Text>
            </Body>
          </ListItem>
          <ListItem icon   onPress={()=>this._logout()} >
            <Left>
              <Icon name="log-out" />
            </Left>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
        </List>

      </Content>
    );
  }
}
