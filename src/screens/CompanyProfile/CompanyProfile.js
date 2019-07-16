import React,{Component} from 'react';
import {View,Image,BackHandler,StyleSheet,NetInfo,ActivityIndicator} from 'react-native';
import openMap from 'react-native-open-maps';
import ContactDetails from '../../components/CompanyProfile/ContactDetails';
import BasicDetails from '../../components/CompanyProfile/CompanyBasicDetails';
import { Container, Header, Content,Button, Card, CardItem, Thumbnail, Text, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import NoDataFound from '../../components/ErrorItems/NoDataFound';
class CompanyProfile extends Component{

  constructor(props) {
    super(props)
    this.state = {
        aswathi          : 'aswathi',
        companyProfileUrl: 'http://api.kimsth.a2hosted.com/api/CompanyProfile',
        
        companyProfile: '',
        isLoading     : true
    };
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
    
   
    componentWillUnmount() {
      // this.backHandler.remove();
      BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
    
    }

    componentDidMount() {

      BackHandler.addEventListener('hardwareBackPress',this.backAndroid

      );
    

      NetInfo.getConnectionInfo().then((connectionInfo) => {
          if (connectionInfo.type === 'none') {
              alert("No internet connection")
          } else {
              // online
              // do something
              this.getCompanyProfile();
  
          }
      });
  
      function handleFirstConnectivityChange(connectionInfo) {
          console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
          NetInfo.removeEventListener(
              'connectionChange',
              handleFirstConnectivityChange
          );
      }
      NetInfo.addEventListener(
          'connectionChange',
          this.getCompanyProfile
      );
  
  
  
    }
    getCompanyProfile=()=>{
      return  fetch(this.state.companyProfileUrl
          , {
          method : 'POST',
          headers: {
              Accept        : 'application/json',
              'Content-Type': 'application/json',
          },
        
      }).then((response) => response.json())
      .then((responseJson) => {
          // return responseJson.servicesCategory;
  
          
      this.setState({
          isLoading     : false,
          companyProfile: responseJson,
          
        }, function(){
  
        });
      })
      .catch((error) => {
          console.error(error);
      });
  }
    
  _goToMap() {
    openMap({ latitude: 11.883429, longitude: 75.372937 });}
_goToInteriorView = () => {
    //  this.props.navigator.push({
    //         screen: "service_app_InteriorView",
    //         title: "Interior Map"
    //         // passProps:{
    //         //     selectedPlace:selPlace
    //         // }
    //     });
    Actions.CompanyInteriorViewScreen({nav:null});
  }
  
    render(){
      if(this.state.isLoading){
        return(
          <View style = {{flex: 1, padding: 20}}>
            <ActivityIndicator  />
          </View>
        )
      }

      else {
        if (this.state.companyProfile.GalleryCategory.length != 0){
          return ( 
                
            <Container>
            <Content>
            <BasicDetails   logo    = {this.state.companyProfile.GalleryCategory.CompanyLogo} image = {this.state.companyProfile.GalleryCategory.Image} description = {this.state.companyProfile.GalleryCategory.Description}/>
            <ContactDetails address = {this.state.companyProfile.GalleryCategory.Address} contactno = {this.state.companyProfile.GalleryCategory.ContactNo} email   = {this.state.companyProfile.GalleryCategory.Email} onMapClick = {this._goToMap} onInteriorClick = {this._goToInteriorView}/>
            </Content>
          </Container>
    
            )}
             else {
               return (
                 <NoDataFound  OnRetry={this.getCompanyProfile}/> )
        }
  
      }
        
    }
}

export default CompanyProfile;