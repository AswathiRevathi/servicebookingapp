import React, { Component } from 'react';
import {
  AppRegistry,
  Text
} from 'react-native';

import {Drawer} from 'native-base';

import AppHeader from './AppHeader';
import BookingStatus from '../Booking/BookingStatus';
import Gallery from '../Gallery/GalleryCategoryListing';
import {Actions} from 'react-native-router-flux';

import Sidebar from './SideBar';
import {Router,Scene} from 'react-native-router-flux';
import Facility from '../Facilities/FacilitiesListing'
export default class Main extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open()
  };


  render() {
    
    return (
     
              <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<Sidebar  clo={this.closeDrawer}/>}
                onClose={() => this.closeDrawer()}
                >

                <AppHeader
                    openDrawer={this.openDrawer.bind(this)}
                />
                {/* <AppBody/> */}
                <Router>
          <Scene key="scenes" >
               <Scene key="Gallery" initial={true} component={Gallery}  />
               <Scene key="BookingStatus" component={BookingStatus} onEnter={() => this.closeDrawer()} />
               <Scene key="Facility" component={Facility} onEnter={() => this.closeDrawer()}  />


          </Scene>
     </Router>
                </Drawer>
    );
  }
}
