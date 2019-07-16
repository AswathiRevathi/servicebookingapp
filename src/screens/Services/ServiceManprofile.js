import React, { Component } from 'react';
import { View, Text, StyleSheet,ActivityIndicator,NetInfo,AsyncStorage ,BackHandler} from 'react-native';
import ServiceListItem from '../../components/ListItem/ServiceListItem';
import { Row, Button, Segment, Tab, Tabs, Container,Icon,Right , Header,Left, Content,Thumbnail, Card, CardItem, Body } from 'native-base';
import { Actions } from "react-native-router-flux";
import NoDateItem from '../../components/ErrorItems/NoDataFound';
import ServerError from '../../components/ErrorItems/ServerError';
import Moment from 'moment';




export default class ServiceManProfile extends Component{


    constructor(props) {
        super(props)
        this.state = {
            aswathi             : 'aswathi',
            serviceManProfileUrl: 'http://api.kimsth.a2hosted.com/api/ServiceList/api/servicebyId?Id=',
            
            dummy: '', isLoading: true,userId:null,experience:'No Data Available',status:'',message:''
        };
        }
       
          
          componentWillUnmount() {
            // this.backHandler.remove();
            BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
          
          }
              
          backAndroid =() =>{
          
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
          

BookingHandler = key => {


console.log("insidebooking-props--",this.props);
console.log("insidebooking-selectedADoctorId--",this.props.selectedDocId);

if(this.state.userId!=null){
    // alert(this.state.userId);
    Actions.SlotPicking({ selectedService : this.props.selectedDocId,nav:null });

    }
    else{
      Actions.login({from:'service',selectedService:this.props.selectedDocId,nav:null});
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
componentDidMount() {
console.log('reached in service man profile');
this.displaydata();

   
BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
);


    NetInfo.getConnectionInfo().then((connectionInfo) => {
        if (connectionInfo.type === 'none') {
            alert("No internet connection")
        } else {
            // online
            // do something
            this.getServiceManProfileDetails();

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
        this.getServiceManProfileDetails
    );



  }

getServiceManProfileDetails=()=>{
    console.log("reached in service man profile api call");
    console.log("------",this.props);

    console.log("ID IS",this.props.selectedDocId);
    
console.log("inside url-props--",this.props);
console.log("inside url-selectedADoctorId",this.props.selectedDocId);


    return  fetch(this.state.serviceManProfileUrl+`${this.props.selectedDocId.Id}`
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
        isLoading: false,
        status:responseJson.Status,
        message:responseJson.Message,

        dummy    : responseJson,
        
      }, function(){

      });
    })
    .catch((error) => {
        console.error(error);
    });


}
    render() {
        console.log('--------',this.props)
        let modalContent = null;
        let availableList=null;
        let experienceList=null;
if(this.props.selectedDocId.IsAllowBooking==false){
    modalContent = (
        // <View style={{
        //     backgroundColor: '#c0c0', justifyContent: 'flex-start', flex: 1, flexDirection: 'row',
        //     alignItems: 'center', marginTop: 10, marginLeft: 5
        // }}>
           <Body>
   
   <Button rounded info onPress = {this.BookingHandler} style = {styles.bookinButton} >
   <Text   style                = {{ fontSize: 14 ,color:'white'}} >Book Appointment</Text>
           </Button>
  </Body>
        // </View>
    );
}
if(this.props.selectedDocId.Availabledates!=null){
  var  strA = this.props.selectedDocId.Availabledates.split(",").join("-").split('-')[0];                    // "72";
var strB = this.props.selectedDocId.Availabledates.split(",").join("-").slice(strA.length + 1);
console.log("so=pli",strB);
    availableList=(

<View>
<View style = {styles.line}></View>

        <View style = {{flexDirection:'row'}}>
        <Icon style = {styles.IconStyle} active name = 'calendar' />
       <View>
       <Text style = {styles.tittleText}>Available On</Text>
            <Text style = {styles.contenttext}>{strB}</Text>


       </View>
       </View>

</View>
        

    );
}
if(this.props.selectedDocId.Description!=null){
    experienceList=(

<View>
<View style = {styles.line}></View>

        <View style = {{flexDirection:'row'}}>
        <Icon style = {styles.IconStyle} active name = 'paper' />
       <View>
       <Text style = {styles.tittleText}>Experience</Text>
            <Text style = {styles.contenttext}>{this.props.selectedDocId.Description}</Text>


       </View>
       </View>

</View>
        

    );
}
// else{
//     availableList=(
//         <View style={{height:0,width:0}}>
// <Text>njjjj</Text>
//         </View>
//     );
   
// }
     

        if(this.state.isLoading){
            return(
              <View style = {{flex: 1, padding: 20}}>
                <ActivityIndicator  />
              </View>
            )
          }

          else {
            console.log("Inside else","nnn");

              if(this.state.status){

                Moment.locale('en');
        var dt = this.props.selectedDocId.NextAvailableDate.toString().split("T")[0];
        console.log("ID IN",dt);
            if (this.state.dummy.service.length != 0){ 
              return (
                
            <View style = {styles.mainContainer}>
            <View style = {{height:130}}>


                <ServiceListItem
                    serviceName   = {this.props.selectedDocId.ServiceName}
                    serviceImage  = {this.props.selectedDocId.ServiceImage}
                    department    = {this.props.selectedDocId.ServiceCategory}
                    qualification = {this.props.selectedDocId.ServiceQualification}
                    nextAvailableDate={this.props.selectedDocId.NextAvailableDate}


                ></ServiceListItem>
            </View>
            
            <Card style = {{padding:25}}>
            
         <View style = {{flexDirection:'row'}}>
         <Icon style = {styles.IconStyle} active name = 'medal' />
            <View>
            <Text style = {styles.tittleText}>Qualification</Text>
            <Text style = {styles.contenttext}>{this.state.dummy.service.ServiceQualification}</Text>
            </View>
            </View> 
            <View>
            {availableList}

            </View>
           
            {/* <View style = {styles.line}></View>

            <View style = {{flexDirection:'row'}}>
            <Icon style = {styles.IconStyle} active name = 'time' />
            <View>
            <Text style = {styles.tittleText}>Experience</Text>
          
            <Text style = {styles.contenttext}>{this.state.experience}</Text>
            </View>
            </View> */}


            {/* <View>
{experienceList}
            </View> */}
            
       
       
        
       
       
       
</Card>{modalContent}

{/* <Body>
       
        <Button rounded info onPress = {this.BookingHandler} style = {styles.bookinButton} >
        <Text   style                = {{ fontSize: 14 ,color:'white'}} >Book Appointment</Text>
                </Button>
       </Body> */}

        </View>
                )}
                 else {
                   return (
                     <NoDataFound  OnRetry={this.getServiceManProfileDetails}/> )
            }
      
              }
              else{
                return (
                    <ServerError /> )
              }
          }
    };
}
const styles = StyleSheet.create({
    mainContainer: {
     margin: 10,
       
    },
    IconStyle:{
        color      : '#2471A3',
        marginRight: 10
    },
    tittleText:{
        fontSize  : 13,
        fontWeight: 'bold',
        color     : 'black'
        },
    contenttext:{
        fontSize : 12,
        marginTop: 5
        },
    detailContainer: {
        alignItems: 'center'
    },
    line:{
        backgroundColor: 'steelblue',
        marginBottom   : 10,
        marginTop      : 10,
        height         : 1
    },
    bookinButton:{marginTop:10,
    marginBottom   : 10,
    marginLeft     : 5,
    backgroundColor: '#2471A3',
    width          : 150,
    height         : 40,
    justifyContent : 'center'
     }
});