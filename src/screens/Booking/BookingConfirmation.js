import React, { Component } from "react";
import { View, TextInput, Image ,NetInfo,AsyncStorage,BackHandler} from "react-native";
import { Container, Header, Content, Form, Item, Textarea, Text, Input, Icon, Label, Button, Card, CardItem, Body,Left,Right } from 'native-base';
import PopupDialog, { SlideAnimation, } from 'react-native-popup-dialog';
import { Actions } from "react-native-router-flux";
import { Dialog } from 'react-native-simple-dialogs';
import { ProgressDialog } from 'react-native-simple-dialogs';


import Moment from 'moment';

export default class BookingConfirmation extends Component {


       
   state ={

    bookingUrl     : 'http://api.kimsth.a2hosted.com/api/Booking/api/servicebyId',
    userId         : '',
    slot           : '',
    dateOfBooking  : '',
    name           : '',
    dob            : '',
    tokenNo        : null,
    age            : '',
    gender         : '',
    mobile         : '',
    description    : '',
    productId      : '',
    categoryId     : '',
    isLoading      : '',                                             progressVisible: true,
    bookingResponse: '',                                             dialogVisible  : false,
    bookingPossible:null,messagesOnFailure:null






  };
    homeHandler = key => {
Actions.Home();
  
}
backAndroid= ()=> {

    if(this.props.nav==1){
        Actions.reset('Home');
        return true  
    }
    else{
      Actions.pop();
      return true  

    }
    return true

    // Actions.pop() // Return to previous screen
     // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  componentWillUnmount() {
    // this.backHandler.remoe();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }
displaydata=async () => {
    try{
      let u = await AsyncStorage.getItem('UserId');
      this.setState({userId:u})

      return u;
    }
    catch(error){
    }
    }


    componentDidMount(){
        this.displaydata();
        // Listen for the hardware back button on Android to be pressed
       console.log(" Service Name" +this.props.serviceName);
       console.log(" selectedAddressArray" +this.props.selectedAddressArray.Name);
       console.log(" Service Category" +this.props.serviceCategoty);
       console.log(" Service Category" + this.props.addressId);
    //    this.props.addressId.name
    console.log(" Service Category" + this.props.addressId.name);
    console.log(" Service Category" + this.props.addressId.name);
    console.log(" Service Category" + this.props.addressId.name);
    console.log(" Service Category" + this.props.addressId.name);
    console.log(" Service Category" + this.props.addressId.name);
    console.log(" Service Category" + this.props.addressId.name);
      

       
        BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
        );

    }
    handleBooking = ()=>
    {
        this.setState({isLoading:true});

  
        NetInfo.getConnectionInfo().then((connectionInfo) => {
          if (connectionInfo.type === 'none') {
              alert("No internet connection")
          } else {
              // online
              // do something
              this.handlePress.bind(this)();
  
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
          this.handlePress
      );
  
  

  
  
       
   
    };
  closePop=()=>{
    this.setState({dialogVisible: false})  ; 
  }
continueBooking=()=>{
    this.setState({dialogVisible: false})  ; 

    Actions.Service({id:0,nav:2});

}
stopBooking=()=>{
    this.setState({dialogVisible: false})  ; 
 Actions.reset('Home');
      

}



handlePress = async () => {

    var k    = this.props.selectedDate;
    var k=this.props.selectedDate.split("-")[1]+"-"+this.props.selectedDate.split("-")[0]+"-"+this.props.selectedDate.split("-")[2]+" 14:24:36";
    console.log("SD",k);
    console.log("aaaa",Moment(k).format('YYYY-DD-MM'));


    // const IsoDateTo = Moment(this.state.chosenDate,'DD-MM-YYYY').format('YYYY-MM-DD[T]HH:mm:ss');





    // console.log("IsoDateTo",IsoDateTo);
    // var toSenDdate=IsoDateTo.split("T")[0];


    var h= Moment(this.props.selectedDate,'DD-MM-YYYY').format("YYYY-MM-DD[T]HH:mm:ss").split("T")[0];


console.log("date to send",h);
console.log("date to this.props.date",this.props.date);


    // var dobs = Moment(this.props.date,'MMM D YYYY').format("YYYY-MM-DD[T]HH:mm:ss").split("T")[0];
    // console.log( h,""+dobs);

    return  fetch(this.state.bookingUrl, {
      method : 'POST',
      headers: {
          Accept        : 'application/json',
          'Content-Type': 'application/json',
      },
     
      body:JSON.stringify( {
        userId       : Number(this.state.userId),
        slot         : this.props.selectedTime,
        dateOfBooking:h.toString(),
        description  : "null",
        addressId:this.props.addressId,
        productId    : this.props.serviceId,
        categoryId   : this.props.serviceCategoryId

     })
    
  }).then((response) => response.json())
  .then((responseJson) => {
      // return responseJson.servicesCategory;

      this.setState({
        isLoading      : false,
        bookingResponse: responseJson,
        // userId:responseJson.UserId.toString()
      }, function(){
  
      });
      console.log("ASWATHH");

console.log(responseJson);
      if(responseJson.Status=='true'){


        this.setState({
            tokenNo      : responseJson.Token,
            dialogVisible: true
           
            // userId:responseJson.UserId.toString()
          }, function(){
      
          });

        // this.Dialog.show()
// alert(responseJson.Token);
console.log("USERID"+this.state.userId);

Actions.Home({nav:null});

      }
      else{
        this.setState({
            bookingPossible      :1,
            dialogVisible: true,messagesOnFailure:responseJson.Message
           
            // userId:responseJson.UserId.toString()
          }, function(){
      
          });
        // alert(responseJson.Message);
        // Actions.Service({id:0,nav:2});

      }


      
 
  })
  .catch((error) => { 
      console.error(error);
  });



  }

    render() {

        // var dob=this.props.selectedAddressArray.DateofBirth.split("T")[0];
        // console.log("BOOKING DATE IS",dob);
        const slideAnimation = new SlideAnimation({
            slideFrom: 'bottom',
          });
          if (this.state.isLoading) {
            return ( 
             
<ProgressDialog 
    visible = {this.state.progressVisible}
    title   = "Progress Dialog"
    message = "Please, wait..."
/>
            
            )
          } 


if(this.state.tokenNo!=null){
    return(
<Dialog 
    visible        = {this.state.dialogVisible}
    title          = "Booking Confirmed"
    

    onTouchOutside = {() => this.setState({dialogVisible: false})} >
    {/* style={{width:"90%",height:40,color:'#2471A3'}} */}
    <View>
        <View  style={{
    borderBottomColor: "#2471A3",
    borderBottomWidth: 1,
  }}></View>
       
       <Text style = {{margin:3,fontWeight:'bold'}}>Booking confirmed on:{this.props.selectedDate}</Text>
       <Text style = {{margin:3,fontWeight:'bold'}}>Your Token number :{this.props.selectedTime}
    </Text>
       <Text style = {{marginLeft:3,fontWeight:'bold'}}>Reference number:{this.state.tokenNo}</Text>
       <Text style = {{margin:3,fontWeight:'bold',color:'black'}}>For any queries or concerns, please contact 0497 - 2714800 </Text>

       <View style={{height:60,width:"100%",justifyContent:'center',alignItems:'center',margin:8}}>
    <Body> 
          <Button rounded info onPress = {this.closePop} style = {{ marginLeft: 5, backgroundColor: '#2471A3', width: 100, height: 40, justifyContent: 'center',alignItems:'center' }} >
                              <Text   style                = {{ fontSize: 13 }} >OK</Text>
                            </Button>
                            </Body>
       </View>
  
    </View>
</Dialog>
    );
    

}
else if(this.state.bookingPossible!=null){
    return(
        <Dialog 
            visible        = {this.state.dialogVisible}
            title          = "Continue Booking?"
            
        
            onTouchOutside = {() => this.setState({dialogVisible: false})} >
            {/* style={{width:"90%",height:40,color:'#2471A3'}} */}
            <View>
                <View  style={{
            borderBottomColor: "#2471A3",
            borderBottomWidth: 1,
          }}></View>
               <Text style = {{margin:3}}>{this.state.messagesOnFailure}</Text>
               <Text style = {{margin:3}}>Do you want to Continue Booking?</Text>
               <View style={{height:60,width:"100%",marginTop:5,marginBottom:5,marginLeft:20,marginRight:20,flexDirection:'row'}}>
            <Body> 
                <View style={{flex:1,flexDirection:'row'}}>
                <Button rounded info onPress = {this.stopBooking} style = {{ backgroundColor: '#2471A3', width: 100, height: 40, justifyContent: 'center',alignItems:'center' }} >
                                      <Text   style                = {{ fontSize: 13 }} >No</Text>
                                    </Button>
                                  
                  <Button rounded info onPress = {this.continueBooking} style = {{backgroundColor: '#2471A3', width: 100, height: 40, justifyContent: 'center',alignItems:'center' }} >
                                      <Text   style                = {{ fontSize: 13 }} >Yes</Text>
                                    </Button>
                 
                </View>
                                    </Body>
               </View>
          
            </View>
        </Dialog>
            );
}



        return (
            <Container >
                <Content style = {{ margin: 10 }}>
               

                
                    <Label style = {{ margin: 10 }}>Review Appointment Details</Label>
                    <View>
                  
                        <Card>
                            <CardItem>
                               
                               
                           
                                <View style = {{ flexDirection: 'row' }}>
                               
                                    <Image
                                        source = {{ uri: this.props.serviceImage }}
                                        style  = {{ height: 80, width: 80 ,borderRadius:40,resizeMode:'stretch',alignSelf:'stretch'}} />

                                    <View style = {{ flexDirection: 'column' }}>
                                    <View style = {{ flexDirection: 'column', margin: 5, padding: 5 }}>
                                    <Text style = {{ fontWeight: 'bold', fontSize: 13, margin: 5, padding: 5 }}>{this.props.serviceName}</Text>

                                            <Item>
                                                <Icon style = {{ color: '#2471A3', marginLeft: 5 }} active name = 'git-branch' />
                                                <Text style = {{ fontSize: 12 }}>{this.props.serviceCategoty}</Text>
                                            </Item>
                                        </View>


                                    </View>
                                </View>
                            </CardItem></Card>


                        <Card>
                            <CardItem>
                                <View >
                                    <Text>Patient Details</Text>
                                   
                              
                                    <View style = {{ height: 1, width: '50%', backgroundColor: 'gray', marginBottom: 10 }}></View>
                                    <View style = {{ margin: 5 }}>
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'person' />
                                            <View style = {{ flexDirection: 'row', marginRight: 10 }}>
                                            <Text style = {{ margin: 5 }}>Name</Text>
                                            {/* <Text style = {{ margin: 5 }}>{this.props.nameEntered}</Text> */}
                                            <Text style = {{ margin: 5 }}>{this.props.selectedAddressArray.Name}</Text>

                                            </View>
                                        </Item>
                                    </View>
                                   
                                    <View style = {{ margin: 5 }}>
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'outlet' />
                                            <View style = {{ flexDirection: 'row', marginRight: 10 }}>
                                            <Text style = {{ margin: 5 }}>Age</Text>
                                            <Text style = {{ margin: 5 }}>{this.props.selectedAddressArray.Age}</Text>

                                            </View>
                                        </Item>
                                    </View>
                                    {/* <View style = {{ margin: 5 }}>
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'calendar' />
                                            <View style = {{ flexDirection: 'row', marginRight: 10 }}>
                                            <Text style = {{ margin: 5 }}>Dob</Text>
                                            <Text style = {{ margin: 5 }}>{dob.split("-")[2]+"-"+dob.split("-")[1]+"-"+dob.split("-")[0]}</Text>

                                            </View>
                                        </Item>
                                    </View> */}
                                    <View style = {{ margin: 5 }}>
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'transgender' />
                                            <View style = {{ flexDirection: 'row', marginRight: 10 }}>
                                            <Text style = {{ margin: 5 }}>Gender</Text>
                                            <Text style = {{ margin: 5 }}>{this.props.selectedAddressArray.Gender}</Text>

                                            </View>
                                        </Item>
                                    </View>
                                    <View style = {{ margin: 5 }}> 
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'call' />
                                            <View style = {{ flexDirection: 'row', marginRight: 10 }}>
                                            <Text style = {{ margin: 5 }}>Mobile</Text>
                                            <Text style = {{ margin: 5 }}>{this.props.selectedAddressArray.MobileNumber}</Text>

                                            </View>
                                        </Item>
                                    </View>
                                    
                                </View>


                            </CardItem>
                            <PopupDialog width           = {0.5} height                              = {0.3}
                                         ref             = {(popupDialog) => { this.popupDialog = popupDialog; }}
                                         dialogAnimation = {slideAnimation}>
                            <View        style           = {{ width: '100%', alignItems: 'center' }}>
                            <Image       source          = {require("../../Images/token.png")} style = {{ height: 100, width: 100, margin: 10, justifyContent: 'center' }}></Image>
                                    <Text>Your Token No Is</Text>
                                    <Text style = {{ fontSize: 20, color: 'black', fontWeight: 'bold', margin: 10 }}>{this.state.tokenNo}</Text>
                        
                                </View>
                            </PopupDialog>
                            
                           
                            </Card>
                        <Card>
                            <CardItem>
                                <View >
                                    <Text>Date and Time</Text>
                                    <View style = {{ height: 1, width: '50%', backgroundColor: 'gray', marginBottom: 10 }}></View>
                                    <View style = {{ margin: 5 }}>
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'calendar' />
                                            <Text>Date</Text>
                                            <Text style = {{ margin: 5 }}>{this.props.selectedDate}</Text>


                                        </Item>
                                    </View>
                                    {/* <View style = {{ margin: 5 }}>
                                        <Item>
                                            <Icon style = {{ color: '#2471A3' }} active name = 'time' />
                                            <Text>Time</Text>
                                            <Text style = {{ margin: 5 }}>{this.props.selectedTime}</Text>


                                        </Item>
                                    </View> */}
                                </View>
                               
                                </CardItem></Card>
                        <View style = {{ height: 40, width: '100%', justifyContent: 'center' }}>
                        <Body>
                            {/* <Button rounded info onPress={() => {
                                this.popupDialog.show();
                            }} style={{ marginLeft: 5, backgroundColor: '#2471A3', width: 120, height: 40, justifyContent: 'center' }} >
                                <Text style = {{ fontSize: 10 }} >Submit</Text>
                            </Button> */
                            }
                              <Button rounded info onPress = {this.handleBooking} style = {{ marginLeft: 5, backgroundColor: '#2471A3', width: 120, height: 40, justifyContent: 'center' }} >
                              <Text   style                = {{ fontSize: 10 }} >Submit</Text>
                            </Button>
</Body>
                            
                        </View>
                       
                    </View>
                    
                </Content>
            </Container>
        );
    }; 

}