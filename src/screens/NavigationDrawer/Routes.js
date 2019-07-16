import React from 'react';
import {ToastAndroid,Linking,View,TouchableOpacity} from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import Home from '../Home/Home';
import Gallary from '../Gallery/GalleryCategoryListing';
import ServiceCategory from '../ServiceCategory/ServiceCategoryListing';
import Service from '../Services/ServiceListing';
import SplashScreen from '../Auth/SplashScreen';
import Welcome from '../Auth/Welcome';
import Notifications from '../Notifications/NotificationNew';
// import Icon from 'react-native-vector-icons/FontAwesome';
import SideBar from '../NavigationDrawer/SideBar';
import Login from '../Auth/Login';
import OtpVerification from '../Auth/OtpVerification';

import BookingStatus from '../Booking/BookingStatus';
import { Actions,ActionConst } from 'react-native-router-flux';
import Facility from '../Facilities/FacilitiesListing';
import ServiceManProfile from "../Services/ServiceManprofile";
import SlotPickingScreen from "../Booking/SlotPicking";
import UserDetailEntering from "../Booking/UserDetailEntering";
import BookingConfirmation from "../Booking/BookingConfirmation";
import CompanyProfileScreen from "../CompanyProfile/CompanyProfile";
import CompanyInteriorViewScreen from "../CompanyProfile/CompanyInteriorView";
import FacilitiesDetailsScreen from "../Facilities/FailitiesDetails";
import GalleryImageListingScreen from "../Gallery/GalleryImageListing";
import AddressBook from "../Booking/AddressBook";
import AddressDetails from "../Booking/AddressDetails";
import SAmple from '../Home/SAmple';
import Sample2 from '../Home/Sample2';
import Drawers from '../NavigationDrawer/Drawers';
import Communications from 'react-native-communications';




import Icon from 'react-native-vector-icons/MaterialIcons';
const MenuIcon=()=>{
    return(
        <Icon name = "menu" size = {30}></Icon>
        )
}
const CallIcon=()=>{
  return(
        <View style={{marginRight:25}}>
      <TouchableOpacity onPress={() => Communications.phonecall('9400379999', true)}>
      <Icon 
      type='font-awesome'
      name="phone"
      color='steelblue'
      size={30}
      
      />
      </TouchableOpacity>
      </View>

      )
}

 
const Routes = () => (
   <Router>
       <Scene key = "root">
       
       <Scene key = "splash" component  = {SplashScreen} hideNavBar = {true}  />
       <Scene key = "welcome" component = {Welcome} hideNavBar      = {true}    />


       <Scene key = "login"    component              = {Login} hideNavBar      = {true} title = "Login"  />
       <Scene key = "OtpVerificationScreen" component = {OtpVerification} hideNavBar = {true}  title = "Otp Verification" />
      <Scene  
      key = "drawer1"
      drawer
     
      contentComponent = {SideBar}
      drawerIcon       = {MenuIcon}
      drawerWidth = {300}
      hideNavBar
      color
      
      >
      <Scene key = "drawerroot" >
      <Scene key = "Home"  initial = {true}  component = {Home} title = "KIMST HOSPITAL"   renderRightButton={CallIcon}
            
            />

      <Scene key = "Service" component         = {Service}   title         = "Doctors" renderRightButton={CallIcon} />
      <Scene key = "ServiceCategory" component = {ServiceCategory} title = "Departments"  renderRightButton={CallIcon}/>
     
            {/* <Scene key = "Service" component = {Service} title = "hhhh" /> */}

      <Scene key = "Gallery" component                   = {Gallary} title                   = "Gallery" renderRightButton={CallIcon}/>
      <Scene key = "GalleryImageListingScreen" component = {GalleryImageListingScreen} title = "Images" renderRightButton={CallIcon} />
      <Scene key = "Facility" component                  = {Facility} title                  = "Facilities" renderRightButton={CallIcon} />

      <Scene key = "FacilitiesDetailsScreen" component = {FacilitiesDetailsScreen} title = "Facility Details "  renderRightButton={CallIcon} />

      <Scene key = "CompanyProfileScreen" component = {CompanyProfileScreen} title = "KIMST" renderRightButton={CallIcon}/>

      <Scene key = "CompanyInteriorViewScreen" component = {CompanyInteriorViewScreen} title = "Interior View" renderRightButton={CallIcon}/>
      <Scene key = "BookingStatus" component = {BookingStatus} title = "Booking Status"  renderRightButton={CallIcon}/>
      <Scene key = "Notification" component             = {Notifications} title             = "News & Events" renderRightButton={CallIcon} />

      <Scene key = "SlotPicking" component = {SlotPickingScreen} title = "Pick a Slot"  renderRightButton={CallIcon} />
      <Scene key = "Profile" component     = {ServiceManProfile} title = "Profile" renderRightButton={CallIcon}/>

      <Scene key = "UserDetailEntering" component = {UserDetailEntering} title = "Book Now"renderRightButton={CallIcon} />

      <Scene key = "BookingConfirmation" component = {BookingConfirmation} title = "BookingConfirmation"renderRightButton={CallIcon} />
      <Scene key = "AddressBook" component = {AddressBook} title = "Address Book" renderRightButton={CallIcon} />
      <Scene key = "AddressDetails" component = {AddressDetails} title ="AddressDetails" renderRightButton={CallIcon} />
        </Scene>
      </Scene>
    </Scene>
   </Router>);

export default Routes;
