import React, { Component } from 'react';
import { View, Text, StyleSheet ,ActivityIndicator,NetInfo,AsyncStorage,BackHandler} from 'react-native';
import ServiceListItem from '../../components/ListItem/ServiceListItem';
import ServiceList from '../../components/Lists/ServiceList';
import NoDataFound from '../../components/ErrorItems/NoDataFound';
import { Actions } from "react-native-router-flux";

export default class Notifications extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            bookingStatus   : '',
            isLoading       : true,
            userId          : "",
            bookingStatusUrl: 'http://api.kimsth.a2hosted.com/api/Booking/api/BookingStatus?UserId='
      
          ,
  
        }


    }

    backAndroid =()=> {

      if(this.props.nav==1){
        Actions.reset('Home');
        return true 
      }
      else{
        Actions.pop();
        return true 

      }
    
      // Actions.pop() // Return to previous screen
      return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
    }
  
  componentWillMount(){
    console.log("inside componant will oumt","88")
    this.displaydata();

  }
  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }
  

    displaydata= async()=>  {
        try{
          let u = await AsyncStorage.getItem('UserId');
          console.log("display data userid",u);
          var k=u;

          this.setState({
           userId:u
          }, function () {
            console.log("display data user",this.state.userId);

          });

          // ToastAndroid.show(u, ToastAndroid.SHORT);
          return u;
        }
        catch(error){
        }
        }


           componentDidMount() {
          // this.displaydata();

         
          console.log(" uuu",this.state.userId);


          BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
          );
        
          NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
              alert("No internet connection")
          } else {
              // online
             // do something
             this.getBookingStatusDetails();
        
          }  });
          function handleFirstConnectivityChange(connectionInfo) {
            console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
            NetInfo.removeEventListener(
              'connectionChange',
              handleFirstConnectivityChange
            );
          }
          NetInfo.addEventListener(
            'connectionChange',
            this.getBookingStatusDetails
          );
        
        
          }
          getBookingStatusDetails = () => {

            // console.log("ddd",k)  ;      

// alert(this.displaydata());
console.log("DISPLAYED"+this.state.userId)
            return fetch(this.state.bookingStatusUrl+`${this.state.userId}`, {
                method : 'POST',
                headers: {
                  Accept        : 'application/json',
                  'Content-Type': 'application/json',
                },
        
              }).then((response) => response.json())
              .then((responseJson) => {
                // return responseJson.servicesCategory;
        
        
        
                this.setState({
                  isLoading    : false,
                  bookingStatus: responseJson.Rejected,
                }, function () {
        
                });
              })
              .catch((error) => {
                console.error(error);
              });
          };
        

    render() {
      
      if(this.state.userId==null){
        return (
          <NoDataFound  OnRetry={this.getBookingStatusDetails}/> )
      }
            if (this.state.isLoading) {
                return ( <View style = {{  flex   : 1, padding: 20}}>
                  <ActivityIndicator />
                  </View>
                );
              }
else{
    if (this.state.bookingStatus.length != 0){
        return ( 
            <View        style     = {styles.Container}>
            <ServiceList dummyData = {this.state.bookingStatus} status = "1" cStatus="Booking Rejected"
                >
                </ServiceList>
            </View>
        );}
           else {
             return (
               <NoDataFound  OnRetry={this.getBookingStatusDetails}/> )
      }
}


            
       
    }
}

const styles = StyleSheet.create({

    Container: {
        flex: 1
    }

});