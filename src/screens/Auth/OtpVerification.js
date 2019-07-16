import React,{Component} from "react";
import {View,Text,TouchableHighlight,BackHandler,StyleSheet,Image,NetInfo,Alert,ActivityIndicator,AsyncStorage,ToastAndroid} from 'react-native';
import OtpInputs from 'react-native-otp-inputs';
import { Button ,Body,Container,Content} from 'native-base';
import { Actions } from "react-native-router-flux";
import { ProgressDialog } from 'react-native-simple-dialogs';
import { Dialog } from 'react-native-simple-dialogs';


class OtpVerification extends Component{

    state={
      otpEntered       : '',
      resend           : false,                                      exit           : false, dialogVisible: false,
      userId           : '',
      otpUrl           : 'http://api.kimsth.a2hosted.com/api/Login/api/OtpVerify',
      
      otpResendUrl     : 'http://api.kimsth.a2hosted.com/api/Login/api/OtpResend',
      isLoading        : '',
      resendOtpResponse: '',
      otpResponse      : '',                                         progressVisible: true
 
      };
    //   async displaydata ()  {
    //     try{
    //       let u = await AsyncStorage.getItem('UserId');
    //       this.setState({
    //        userId: u
    //       }, function () {
  
    //       });
    //       // ToastAndroid.show(u, ToastAndroid.SHORT);
    //       return u;
    //     }
    //     catch(error){
    //     }
    //     }




        handleOtp = (otpSubmitted)=>
        {
            this.setState({otpEntered:otpSubmitted})
            
            // alert(this.state.userId);
       
          if(this.state.otpEntered=== "")
          {
            console.log("OTPSS","jjjjj");

            // ToastAndroid.show('Enter Your Otp !', ToastAndroid.LONG);
          }
      
         
          else{
              if(otpSubmitted.length==5){
                  console.log("OTPSS",otpSubmitted.length)
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
          
          
              }
      
      
      
           
          }
        };
        _storeOtpStatusData = async () => {
            try {
              await AsyncStorage.setItem('UserId', this.state.userId.toString());
              // Alert.alert("Stored+"+this.state.userId);
            } catch (error) {
              // Error saving data
            }
          }


          continueBooking=()=>{
            this.setState({dialogVisible: false})  ; 
        
            // BackHandler.exitApp();
        
        }
        _storeData = async () => {
            try {
              await AsyncStorage.setItem('UserId', this.props.userId);
console.log("saved",async);
            } catch (error) {
              // Error saving data
            }
          }
        stopBooking=()=>{
            this.setState({dialogVisible: false})  ; 
        
            // Actions.Home({nav:null});
        
        }
          backAndroid () {
            this.setState({
                exit         : true,
                dialogVisible: true
               
                // userId:responseJson.UserId.toString()
              }, function(){
                //   alert(this.state.exit)
          console.log("kkk",this.state.exit)
              });
            // if(this.props.nav==1){
            //   Actions.Home(); 
            // }
            // else{
            // BackHandler.exitApp();
            }
            componentWillUnmount () {

                BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
              }
            //   componentDidMount() {
            //     // Actions.refresh({key: 'drawer1', open: false });
            // console.log("Check---"+this.props);
            //     console.log("ID"+this.props.id);
            //     // BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
            
            //   }  
        handleOtpResend = ()=>
        {
        
            
         this.setState({isLoading:true});
      
       
      
            NetInfo.getConnectionInfo().then((connectionInfo) => {
              if (connectionInfo.type === 'none') {
                  alert("No internet connection")
              } else {
                  // online
                  // do something
                  this.handleResendOtp.bind(this)();
      
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
              this.handleResendOtp
          );
      
      
      
      
           
       
        };

        _storeOtpStatus = async (data) => {
            try {
              await AsyncStorage.setItem('OTPSTATUS', data);
              // Alert.alert("Stored+"+this.state.userId);
            } catch (error) {
              // Error saving data
            }
          }
      
        async   componentDidMount() {
            console.log("checkpropsinotp",this.props.valueFrom);
            console.log("propss",this.props);

            // if(this.props.valueFrom.from!=null){
            // }
            // console.log("FROMVALUE",this.props.valueFrom.from)

            BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed

            // await  this.displaydata();
        }
        verify=()=>{
            if(this.props.from!=null){
                Actions.SlotPicking();
            }
            else{
                Actions.drawer1();
            }
           
        }
      
    handlePress = async () => {

        return  fetch(this.state.otpUrl, {
          method : 'POST',
          headers: {
              Accept        : 'application/json',
              'Content-Type': 'application/json',
          },
         
          body:JSON.stringify( {
            userId: this.props.userId,
            otp   : this.state.otpEntered.toString(),
         })
        
      }).then((response) => response.json())
      .then((responseJson) => {
          // return responseJson.servicesCategory;
    
          this.setState({
            isLoading  : false,
            otpResponse: responseJson,
            // userId:responseJson.UserId.toString()
          }, function(){
      
          });
          console.log(this.state.otpResponse.Status)

          if(this.state.otpResponse.Status=='true'){
// Alert.alert(this.state.otpResponse.Message);
// this._storeData();


this._storeData();
if(this.props.valueFrom.from=='service'){
    this._storeOtpStatus('true');

    ToastAndroid.show(this.state.otpResponse.Message, ToastAndroid.SHORT);
console.log("checkpropsinotpfrom",this.props.valueFrom.from);
console.log("checkpropsinotpservivce",this.props.valueFrom.selectedService);
console.log("aswathi",this.props.valueFrom.selectedService);
// Actions.drawer1({type:'reset'});

Actions.drawer1();
Actions.SlotPicking({selectedService:this.props.valueFrom.selectedService,nav:2})

}
else if(this.props.valueFrom.from=='addressDetails'){


    console.log("inside addressdetails",this.props.valueFrom.from);
    Actions.drawer1();
    Actions.AddressDetails({nav:1})
    

}
else{
    ToastAndroid.show(this.state.otpResponse.Message, ToastAndroid.SHORT);

    this._storeOtpStatus('true');
    Actions.drawer1({ type: "reset" }) 

    Actions.drawer1({nav:null});

}
console.log("aswathiout",this.props.valueFrom.selectedService);

          }
          else{
            this._storeOtpStatus('false');

            ToastAndroid.show(this.state.otpResponse.Message, ToastAndroid.SHORT);


          }
    
    
          
     
      })
      .catch((error) => { 
          console.error(error);
      });
    
    
      }
      handleResendOtp = async () => {

        return  fetch(this.state.otpResendUrl, {
          method : 'POST',
          headers: {
              Accept        : 'application/json',
              'Content-Type': 'application/json',
          },
         
          body:JSON.stringify( {
            userId: Number(this.state.userId),
             
         })
        
      }).then((response) => response.json())
      .then((responseJson) => {
          // return responseJson.servicesCategory;
    
          this.setState({
            isLoading        : false,
            resendOtpResponse: responseJson,
            // userId:responseJson.UserId.toString()
          }, function(){
      
          });

          if(this.state.resendOtpResponse.Status=='true'){
ToastAndroid.show(this.state.resendOtpResponse.Message, ToastAndroid.SHORT);

    
          }
          else{
            ToastAndroid.show(this.state.resendOtpResponse.Message, ToastAndroid.SHORT);


          }
    
    
          
     
      })
      .catch((error) => { 
          console.error(error);
      });
    
    
      }
    render(){

        if (this.state.isLoading) {
            return ( 
                <
              View style = {
                {
                  flex   : 1,
                  padding: 20,
                 
                }
              } >
<ProgressDialog 
    visible = {this.state.progressVisible}
    title   = "Progress Dialog"
    message = "Please, wait..."
/>
              </View>
            )
          } 
if(this.state.exit){
    return(
        <Dialog 
            visible = {this.state.dialogVisible}
            title   = "Exit App?"
            
        
            onTouchOutside = {() => this.setState({dialogVisible: false})} >
            {/* style={{width:"90%",height:40,color:'#2471A3'}} */}
            <View>
                <View  style={{
            borderBottomColor: "#2471A3",
            borderBottomWidth: 1,
          }}></View>
               <Text style = {{margin:3}}>{this.state.messagesOnFailure}</Text>
               <Text style = {{margin:3}}>Do you want to Exit App?</Text>
               <View style = {{height:60,width:"100%",marginTop:5,marginBottom:5,marginLeft:20,marginRight:20,flexDirection:'row'}}>
            <Body> 
                <View   style                = {{flex:1,flexDirection:'row'}}>
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
        return(
            <Container>
            <Content>
        
             <View  style = {styles.container}>
             <Text  style = {styles.titleText}>OTP Verification</Text>
             <Image style = {styles.titleImage} source = { require('../../assets/Images/otp.png') }/>
             {/* <OtpInputs keyboardType = 'numeric'  handleChange    = {code => this.setState({otpEntered:code})
} numberOfInputs={5} style={{height:40}} /> */}


  <OtpInputs keyboardType = 'numeric'  handleChange    = {code => this.handleOtp(code)
} numberOfInputs={5} style={{height:40}} />
            <Body>
            <TouchableHighlight style   = {{margin:10}}
                                onPress = {this.handleOtpResend}
        >
         <Text style = {{fontWeight:'bold',padding:5,fontSize:14}}> Resend OTP </Text>
        </TouchableHighlight>
             {/* <Button rounded info style = {styles.buttonStyle} onPress = {this.handleOtp}>
             <Text style = {{ fontSize: 12,color:'#ffffff' }} >Verify</Text>
            </Button> */}
            </Body>
            </View></Content></Container>
        );
    }
}
const styles = StyleSheet.create({
container:{
            alignItems    : 'center',
            marginLeft    : 10,
            marginRight   : 10,
            marginTop     : 10,
            padding       : 10,
            height        : "100%",
            justifyContent: 'center'
        },
        titleText: 
    {
         fontSize  : 20,
         fontWeight: 'bold',
         marginTop : 20,
         color     : 'steelblue'
    },
     titleImage: 
    {
         width       : 150,
         height      : 150,
         marginTop   : 20,
         marginBottom: 20
    },
     buttonStyle: 
    { 
    backgroundColor: '#2471A3',
    width          : 100,
    height         : 40,
    margin         : 10,
    justifyContent : 'center'
     }
        
});
export default OtpVerification;