import React,{Component} from 'react';
import {View,Image,StyleSheet,Text,Button,ImageBackground,BackHandler,ToastAndroid} from 'react-native';
import ImageLogo from '../../assets/Images/logoOne.jpg';
import {
    Actions
  } from "react-native-router-flux";
import UiImage from '../../assets/Images/one.jpg';

class Welcome extends Component{


    //  componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress',  this.handleBackButton());
    // }

    // componentWillUnmount() {
    //     BackHandler.removeEventListener('hardwareBackPress',  this.handleBackButton());
    // }

    onBackPress () {
      if (Actions.state.index === 0) {
        return false;
      }
  
      Actions.pop();
      return true;
    }
    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
        //   return true;
        });
      }
    
      componentWillUnmount() {
        this.backHandler.remove();
      }
    handleBackButton() {
      
       BackHandler.exitApp();
    }
    handleLogin = ()=>
    {
        // Actions.pop()
        Actions.reset("login")
Actions.login({from:null,nav:null});
    };
    handleSkip = ()=>
    {
      Actions.reset("drawer1")
                // Actions.pop()
                // Actions.drawer1({ type: "reset" }) 

        Actions.drawer1({nav:null});
        


    };

    render()
    {
        return(
            <View style = {styles.container}>

<ImageBackground
  source = {UiImage}
  style  = {{
    height  : "100%",
    width   : "100%",
    position: 'relative',   // because it's parent
    
  }}
>
            <View style = {{flex:1,justifyContent:"space-between"}}>

                      
                      <View  style  = {{height:250,width:"100%",justifyContent:'center',alignItems:'center'}}>
                
                <Image source = {ImageLogo} style={{width:320,height:250,resizeMode:'contain'}}/>
                </View>
              

                
                <View style={{justifyContent:'center',alignItems:'center'}}>
               
                <Text style={{fontSize:16,fontStyle:"italic",color:"steelblue",fontWeight:"bold"}}>"KIMST is equipped with state-of-the-art</Text>
                <Text style={{fontSize:16,fontStyle:"italic",color:"steelblue",fontWeight:"bold"}} >medical gadgets and totally dedicated to</Text>
                <Text style={{fontSize:16,fontStyle:"italic",color:"steelblue",fontWeight:"bold"}}>your complete healing."</Text> 
                </View>
                
               
              
                <View   style = {{flexDirection:"row",width:"100%",height:60,alignItems:'flex-end'}}>
                <View   style = {{width:"50%"}}>
                
                <Button title = "Register"  onPress = {this.handleLogin} style={{height:60}}/>
                </View>
                <View   style = {{width:"50%"}}>

                <Button title = "Skip" color = 'steelblue' onPress = {this.handleSkip} style={{height:60}}/>
               </View>
               </View>
               </View>
               </ImageBackground>
                 </View>
        );

    }
}
const styles= StyleSheet.create({
    
   container:{
       flex          : 1,
       justifyContent: "space-between"
   },
    imageStyle: 
  {
 
    height   : 50,
    width    : "100%",
    margin:20
   
   
  },
  

});

export default Welcome;

