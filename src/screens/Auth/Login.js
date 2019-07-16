import React,{Component} from "react";
import {View,StyleSheet,Text,Image,Button,ToastAndroid,Alert,NetInfo,ActivityIndicator,AsyncStorage,BackHandler } from 'react-native';
import { Container, Content, Form, Item, Input, Label } from 'native-base';
import ImageLogo from '../../assets/Images/logoOne.jpg'
import userIcon from '../../assets/Images/user.png';
import mobileIcon from '../../assets/Images/mobile.png';
import { Actions } from "react-native-router-flux";
import { ProgressDialog } from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/FontAwesome';


class Login extends Component{
  state={
          userName     : "",
          mobileNum    : "",
          nameError    : null,
          mobError     : null,
          loginResponse: '',   progressVisible: true,
          userId       : '',   isLoading      : '',
          loginUrl     : 'http://api.kimsth.a2hosted.com/api/Login/api/login'
   
        };
        backAndroid () {

          if(this.props.nav==1){
            Actions.Home(); 
          }
          else{
          BackHandler.exitApp();
          }
        
               }
      
      componentWillUnmount () 
      {
        BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
      }
      
        componentDidMount() {
          // Actions.refresh({key: 'drawer1', open: false });
      console.log("Check---"+this.props);
          console.log("ID"+this.props.id);
          BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed
      
        }      
  NameChangeHandler = val=>
      {
          this.setState(
        {
          userName: val
        }
        );    
      };
      _storeData = async () => {
        try {
          await AsyncStorage.setItem('UserId', this.state.userId.toString());
          // Alert.alert("Stored+"+this.state.userId);
        } catch (error) {
          // Error saving data
        }
      }
  mobileChangehandler = val=>
      {
        
          this.setState(
        {
          mobileNum: val
        }
        );
      };
  
  handleLogin = ()=>
  {
  
    var name   = this.state.userName
    var mobile = this.state.mobileNum
    var count  = this.state.mobileNum.length

    if(name.trim()=== "")
    {
      ToastAndroid.show('Enter Your Name !', ToastAndroid.LONG);
    }

    else if(mobile.trim()==="")
    {
      ToastAndroid.show('Enter Your Mobile Number !', ToastAndroid.LONG);
    }

    
    else if(count!==10)
    {
      ToastAndroid.show('Invalid Mobile Number !', ToastAndroid.LONG);
    }
    else{
      this.setState({isLoading:true});
      console.log("inside login net call");

      
      NetInfo.getConnectionInfo().then((connectionInfo) => {
        if (connectionInfo.type === 'none') {
          ToastAndroid.show('No internet Connection', ToastAndroid.LONG);
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
  };

  handlePress = async () => {
console.log("inside login call");
    return  fetch(this.state.loginUrl, {
      method : 'POST',
      headers: {
          Accept        : 'application/json',
          'Content-Type': 'application/json',
      },
     
      body:JSON.stringify( {
        userName: this.state.userName,
        mobileNo: this.state.mobileNum,
     })
    
  }).then((response) => response.json())
  .then((responseJson) => {

      this.setState({
        isLoading    : false,
        loginResponse: responseJson,
        userId       : responseJson.UserId.toString()
      }, function(){
  
      });

      if(responseJson.Status=='true'){
ToastAndroid.show('OTP has send to Registered Mobile Number', ToastAndroid.SHORT);
console.log("checkprops",this.props.selectedService);

         Actions.OtpVerificationScreen({valueFrom:this.props,userId:this.state.userId});

      }
      else{
        ToastAndroid.show(responseJson.Message, ToastAndroid.SHORT);

      }


      
 
  })
  .catch((error) => { 
      console.error(error);
  });
console.log(loginResponse.Status)


  }

  render()
    {

      if (this.state.isLoading) {
        return ( 
           
<ProgressDialog 
visible = {this.state.progressVisible}
title   = "Checking Internet Connection"
message = "Please, wait..."
/>
         
        )
      } 



      return(

      <Container>
          <Content>
            <Form >


               <View style = {{flex:1,justifyContent:'center'}}>

              <View  style  = {{height:250,width:"100%",justifyContent:'center',alignItems:'center'}}>
                
                <Image source = {ImageLogo} style={{width:320,height:250,resizeMode:'contain'}}/>
                </View>

              <View>
              <Text style = {styles.headingStyle}>
                      Register
                  </Text>

              </View>

              <View style = {styles.loginStyle_1} >

                  <Item>
                   <Image source       = {userIcon} style = {{width:30,height:30}}/> 
                  
                    <Input placeholder  = "Username"
                           //style        = {{borderBottomWidth:1}}
                          
                           Value        = {this.state.userName}
                           onChangeText = {this.NameChangeHandler}
                          
                        /> 
                        </Item>
                       
              

                  <Item >
                    <Image source = {mobileIcon} style = {{width:30,height:30,paddingLeft:20}}/>
                    <Input
                        placeholder  = "Mobile Number"
                        keyboardType = "numeric"
                        maxLength    = {10}
                        value        = {this.state.mobileNum}
                        onChangeText = {this.mobileChangehandler}/>
                  </Item>

              </View>
          
              <View style = {styles.buttonStyle}>

                  <Button
                        title   = "Register"
                        onPress = {this.handleLogin} />
              </View>
          </View>
            </Form>
        </Content>
    </Container>
        
     );
  }
}

const styles = StyleSheet.create({
  loginStyle_1: {

    marginLeft : 10,
    marginRight: 30,
    marginTop  : 50,
  },
  
  headingStyle:{

    flex      : 1,
    fontWeight: "bold",
    fontSize  : 20,
    color     : "steelblue",
    textAlign : "center",
    paddingTop: 70
  },

  imageStyles: 
  {
    position : "absolute",
    marginTop: 30,
    height   : 65,
    width    : "100%",
  },

  buttonStyle: 
    {
    marginTop : 40,
    width     : "80%",
    //marginLeft: 110
    justifyContent:"center",
    //alignItems:"center"
    marginLeft:40,
    
    }
});


export default Login;