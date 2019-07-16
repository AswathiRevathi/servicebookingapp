import React, {
  Component
} from "react";
import {
  Platform,
  StyleSheet,
  ActivityIndicator,
  Alert,
  View,
  FlatList,
  Image,
  ToastAndroid,BackHandler,
  AsyncStorage,NetInfo
} from 'react-native';
import {
  Row,
  Button,
  Text,
  Segment,
  Header,
  Body,
  Container,
  Content,
  Tab,
  Tabs,Card, CardItem
} from 'native-base';
import ServiceList from '../../components/Lists/ServiceList';
import {
  Actions
} from "react-native-router-flux";
import NoDataFound from '../../components/ErrorItems/NoDataFound';
class ServiceListing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      servicesCategory : '',   selectedADoctorId: '',description:null,
      isLoading        : true,
      userId           : null,
      status:null,
      serviceListingUrl: 'http://api.kimsth.a2hosted.com/api/ServiceList/api/servicelist?CategoryId='

    }
  }
  BookingHandler = key => {
    const selDoctId = this.state.servicesCategory.find(doctor => {
      return doctor.Id === key;
    });

    // this.props.navigator.push({
    //     screen: "service_app_Slot_picking",
    //     title: selDoctId.ServiceName,
    //     passProps:{

    //         selectedService:selDoctId
    //     }
    // });
    console.log("USERID",this.state.userId);
if(this.state.userId!=null){
// alert(this.state.userId);
console.log("clicked","9");
  Actions.SlotPicking({
    selectedService: selDoctId,nav:null

  });
}
else{
  Actions.login({from:'service',selectedService:selDoctId,nav:null});
}

  }


  displaydata=async () => {
    try{
      let u = await AsyncStorage.getItem('UserId');
      this.setState({
        userId: u
      });
      // ToastAndroid.show(u, ToastAndroid.SHORT);
      return u;
    }
    catch(error){
    }
    }
  listItemSelectedHandler = key => {

    const selDoctId = this.state.servicesCategory.find(doctor => {
      return doctor.Id === key;
    });

    // this.props.navigator.push({
    //     screen: "service_man_profile",
    //     title: selDoctId.ServiceName,
    //     passProps:{
    //         selectedADoctorId:selDoctId
    //     }
    // });

  
    Actions.Profile({
      selectedDocId: selDoctId,nav:null
      
    });

  }
  backAndroid= ()=> {
console.log("navv",this.props.nav)
    if(this.props.nav==1){
      Actions.reset('Home')
      return true
      // Actions.Home(); 
    }
    else if(this.props.nav==2){
      Actions.ServiceCategory({nav:2}); 
      return true
    }
    else{
      Actions.pop();
      return true
    }
  
    // Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

componentWillUnmount () {
  BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
}

  componentDidMount() {
    // Actions.refresh({key: 'drawer1', open: false });
console.log("Check---"+this.props);
    console.log("ID"+this.props.id);
    BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
    );
  


this.displaydata();

  NetInfo.getConnectionInfo().then((connectionInfo) => {
    if (connectionInfo.type === 'none') {
      alert("No internet connection")
  } else {
      // online
     // do something
     this.getServiceDetails();

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
    this.getServiceDetails
  );

  // NetInfo.isConnected.addEventListener('connectionChange', (hasInternetConnection) = this.getServiceDetails() );


  }


  getServiceDetails = () => {
console.log("----",this.props);
   

      if(this.props.nav==1){

        console.log("inside nav 1","0")
        return fetch('http://api.kimsth.a2hosted.com/api/ServiceList/api/servicelist?CategoryId=0', {
          method : 'POST',
          headers: {
            Accept        : 'application/json',
            'Content-Type': 'application/json',
          },
  
        }).then((response) => response.json())
        .then((responseJson) => {
          // return responseJson.servicesCategory;
  
  
          this.setState({
            isLoading       : false,
            status:responseJson.Status,
            servicesCategory: responseJson.services,
          }, function () {
            console.log("status",this.state.status);

  console.log("ckeckresponse",responseJson);
          });
        })
        .catch((error) => {
          console.error(error);
        });

      }
      else{
        console.log("inside nav null","0")
        console.log("inside nav null",this.props.id)


        return fetch(this.state.serviceListingUrl+`${this.props.id}`, {
          method : 'POST',
          headers: {
            Accept        : 'application/json',
            'Content-Type': 'application/json',
          },
  
        }).then((response) => response.json())
        .then((responseJson) => {
          // return responseJson.servicesCategory;
  
  
          this.setState({
            isLoading       : false,
            status:responseJson.Status,

            
            servicesCategory: responseJson.services,
          }, function () {
  console.log("ckeckresponse",responseJson);
          });
        })
        .catch((error) => {
          console.error(error);
        });
  
      }


  };


  render() {



    let k=this.props.id;
    let modalContent=null;

    if(this.props.category=='General Surgery'){

      modalContent=(
        <View style={{backgroundColor:'white',padding:5}}>
        <Card >
        
          <Text style={{fontSize:13,textAlign:'justify',padding:5,fontWeight:'bold'}}>
{this.props.description}
        </Text>
        
        </Card>

        </View>
       
      );
    }





    if (this.state.isLoading) {
      return ( <View style = {
          {
            flex   : 1,
            padding: 20
          }
        } >
        <ActivityIndicator/>
        </View>
      )
    } else {
      if (this.state.servicesCategory.length != 0){
        return ( <View style = {{margin: 10}} >
        {modalContent}
          <ServiceList dummyData={this.state.servicesCategory}   id ='1' OnBookingClicked ={this.BookingHandler} onItemSelected = {this.listItemSelectedHandler}></ServiceList>
          </View>)}
           else {
             return (
               <NoDataFound  OnRetry={this.getServiceDetails}/> )
      }

    }
  

  }
}

const styles = StyleSheet.create({
  container: {
    flex           : 1,
    justifyContent : 'center',
    alignItems     : 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize : 20,
    textAlign: 'center',
    margin   : 10,
  },
  instructions: {
    textAlign   : 'center',
    color       : '#333333',
    marginBottom: 5,
  },
});
export default ServiceListing;