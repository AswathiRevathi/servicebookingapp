import React, { Component } from 'react';
import {
  AppRegistry,
  Text,AsyncStorage
} from 'react-native';
import { Drawer } from 'native-base';
import AppHeader from '../NavigationDrawer/AppHeader';
import BookingStatus from '../Booking/BookingStatus';
import Home from '../Home/Home';
import Gallery from '../Gallery/GalleryCategoryListing';
import { Actions } from 'react-native-router-flux';
import Sidebar from '../NavigationDrawer/SideBar';
import { Router, Scene } from 'react-native-router-flux';
import Facility from '../Facilities/FacilitiesListing';
import ServiceCategoryListingScreen from "../ServiceCategory/ServiceCategoryListing";
import ServiceManProfile from "../Services/ServiceManprofile";
import ServiceListingScreen from "../Services/ServiceListing";
import SlotPickingScreen from "../Booking/SlotPicking";
import UserDetailEntering from "../Booking/UserDetailEntering";
import BookingConfirmation from "../Booking/BookingConfirmation";
import CompanyProfileScreen from "../CompanyProfile/CompanyProfile";
import CompanyInteriorViewScreen from "../CompanyProfile/CompanyInteriorView";
import FacilitiesDetailsScreen from "../Facilities/FailitiesDetails";
import LoginScreen from "../Auth/Login";
import OtpVerificationScreen from "../Auth/OtpVerification";
import GalleryImageListingScreen from "../Gallery/GalleryImageListing";
export default class Main extends Component {
  constructor(props){
    super(props);
    this.state ={titleName:'KIMST Hospital',userID:''}}

  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };
updateTitle=()=>{
    this.setState({
        titleName:'Ammu'
    }, () => {
        console.log("after" + this.state.titleName);
        // this.props.onCountChanged(this.state.count);

    });

};
displaydata=async () => {
  try{
    let u=await AsyncStorage.getItem('UserId');
    this.setState({userId:u})

    return u;
  }
  catch(error){
  }
  }

componentDidMount(){
  this.displaydata();

}
  render() {
    return (

//       <Router navigationBarStyle={{ backgroundColor: '#81b71a' }}>
//       <Scene key="root">
//       <Scene key="LoginScreen"  component={LoginScreen}  hideNavBar={true}  title="Login"/>
//       <Scene key="otp"  component={OtpVerificationScreen}  hideNavBar={true}  title="Login"/>
//       <Scene key="Home"  component={Home} hideNavBar={true} title="KIMST Hospital"  />
//       <Scene key="Service" component={ServiceListingScreen}  title="Doctors" />
// {/*     
//       <Scene key="drawer"  contentComponent={Drawer} drawerImage={require('../../assets/Images/call_icon.png')}   title="Doctors" >
//        <Drawer
//         ref={(ref) => { this.drawer = ref; }}
//         content={<Sidebar clo={this.closeDrawer} />}
//         onClose={() => this.closeDrawer()}
//       >
//         <AppHeader title={this.state.titleName}
//           openDrawer={this.openDrawer.bind(this)} 
//         />
//         {/* <AppBody/> */}
//         {/* <Router>
//           <Scene key="scenes" >
//             <Scene key="Home" initial={true} component={Home} hideNavBar={true} title="KIMST Hospital"  />
//             <Scene key="Service" component={ServiceListingScreen} hideNavBar={true} title="Doctors" />
//             <Scene key="ServiceCategory" component={ServiceCategoryListingScreen} hideNavBar={true}  title="Departments"/>
//             <Scene key="SlotPicking" component={SlotPickingScreen} hideNavBar={true}  title="Booking"/>
//             <Scene key="Profile" component={ServiceManProfile} hideNavBar={true}  title="Doctor Profile"/>
//             <Scene key="UserDetailEntering" component={UserDetailEntering} hideNavBar={true} title="Patient Details" />
//             <Scene key="BookingConfirmation" component={BookingConfirmation} hideNavBar={true} title="Review Booking"/>
//             <Scene key="CompanyProfileScreen" component={CompanyProfileScreen} hideNavBar={true} title="Profile" />
//             <Scene key="CompanyInteriorViewScreen" component={CompanyInteriorViewScreen} hideNavBar={true} title="Interior View" />
//             <Scene key="FacilitiesDetailsScreen" component={FacilitiesDetailsScreen} hideNavBar={true} title="Facility Details" />
//             <Scene key="OtpVerificationScreen" component={OtpVerificationScreen} hideNavBar={true} title="OTP Verification" />
//             <Scene key="GalleryImageListingScreen" component={GalleryImageListingScreen} hideNavBar={true}  title="Gallery"/>
//             <Scene key="Gallery" component={Gallery} hideNavBar={true} title="Gallery" />
//             <Scene key="BookingStatus" component={BookingStatus}  onEnter={() => this.closeDrawer()} hideNavBar={true} title="Booking Status" />
//             <Scene key="Facility" component={Facility} onEnter={() => this.closeDrawer()} hideNavBar={true} title="Facilities" />
//           </Scene>
//         </Router>
//       </Drawer> */}
    
//         {/* <AppBody/> */}
       
          
//      {/* </Scene>  */}
     
//      </Scene></Router>



      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar clo={this.closeDrawer} />}
        onClose={() => this.closeDrawer()}
      >
        <AppHeader title={this.state.titleName}
          openDrawer={this.openDrawer.bind(this)} 
        />
        {/* <AppBody/> */}
        <Router>
          <Scene key="scenes" >
            <Scene key="Home" initial={true} component={Home} hideNavBar={true} title="KIMST Hospital"  />
            <Scene key="Service" component={ServiceListingScreen} hideNavBar={true} title="Doctors" />
            <Scene key="ServiceCategory" component={ServiceCategoryListingScreen} hideNavBar={true}  title="Departments"/>
            <Scene key="SlotPicking" component={SlotPickingScreen} hideNavBar={true}  title="Booking"/>
            <Scene key="Profile" component={ServiceManProfile} hideNavBar={true}  title="Doctor Profile"/>
            <Scene key="UserDetailEntering" component={UserDetailEntering} hideNavBar={true} title="Patient Details" />
            <Scene key="BookingConfirmation" component={BookingConfirmation} hideNavBar={true} title="Review Booking"/>
            <Scene key="CompanyProfileScreen" component={CompanyProfileScreen} hideNavBar={true} title="Profile" />
            <Scene key="CompanyInteriorViewScreen" component={CompanyInteriorViewScreen} hideNavBar={true} title="Interior View" />
            <Scene key="FacilitiesDetailsScreen" component={FacilitiesDetailsScreen} hideNavBar={true} title="Facility Details" />
            <Scene key="OtpVerificationScreen" component={OtpVerificationScreen} hideNavBar={true} title="OTP Verification" />
            <Scene key="GalleryImageListingScreen" component={GalleryImageListingScreen} hideNavBar={true}  title="Gallery"/>
            <Scene key="Gallery" component={Gallery} hideNavBar={true} title="Gallery" />
            <Scene key="BookingStatus" component={BookingStatus}  onEnter={() => this.closeDrawer()} hideNavBar={true} title="Booking Status" />
            <Scene key="Facility" component={Facility} onEnter={() => this.closeDrawer()} hideNavBar={true} title="Facilities" />
          </Scene>
        </Router>
      </Drawer>
    );
  }
}