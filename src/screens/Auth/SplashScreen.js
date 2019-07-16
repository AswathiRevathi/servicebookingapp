import React, {Component} from 'react';
import {StyleSheet,Image, View,ToastAndroid,AsyncStorage,BackHandler,Text} from 'react-native';
import LogoImage from '../../assets/Images/logo.png';
import {
  Actions
} from "react-native-router-flux";
 class splash extends Component {


  constructor(props) {
    super(props)
    this.state = {
     
      userId           : null,
      otpStatus:null

    }
  }
  

    async displaydata ()  {
      try{
        let uId = await AsyncStorage.getItem('UserId');
      let otpStauss = await AsyncStorage.getItem('OTPSTATUS');

      this.setState({
        userId: uId,otpStatus:otpStauss
      });
        // ToastAndroid.show(u, ToastAndroid.SHORT);
        return u;
      }
      catch(error){
      }
      }


      backAndroid () {

       
        BackHandler.exitApp();
             }

    handleBackButton() {
        // ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        BackHandler.exitApp();
        return true;
    }

      async  componentDidMount(){
    await  this.displaydata();
    console.log("componantdidmount","componant");
    

  BackHandler.addEventListener('hardwareBackPress', () => this.backAndroid()) // Listen for the hardware back button on Android to be pressed


   }
   componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', () => this.backAndroid()) // Remove listener
  }
 
    componentWillMount()
    {
      console.log("componantwillmount","componant");
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);

        setTimeout(()=>{
         // this.props.navigatior.navigate("Splash-Screen.MainScreen");
        //  Actions.welcome();

if(this.state.userId==null){
  console.log("inside userIdNUll",this.state.userId);
 

  Actions.welcome();
  // Actions.pop()

}
// else if(this.state.userId!=null&&this.state.otpStatus=='false'){
//   console.log("inside userId Not null && otpstsatus false",this.state.userId);

//   Actions.welcome();
//   // Actions.pop()

// }
else if(this.state.userId!=null){
  console.log("inside userId Not null && otpstsatus true",this.state.userId);
// Actions.drawer1({ type: "reset" }) 



  Actions.drawer1();
  // Actions.pop()

}




        //  ToastAndroid.show('Welcome Screen will be display after 4 sec!', ToastAndroid.LONG);
          },2000
        )
    }
    
  render() { 
      
      
    return (
      <View style={styles.container}>
       <Image source={LogoImage} style={{width:100,height:100}} />
       <Text style={{fontWeight:'bold',fontSize:17,marginTop:5}}>KIMST HOSPITAL</Text>
       {/* <Text style={{fontSize:11,marginTop:5,marginLeft:20,marginRight:20}}>A Unit of Kannur Institute of Medical Science & Technology Private Limited</Text> */}

        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white'
   
    
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color:"red",
    
  },
  
});

export default splash ;