import React, { Component } from "react";
import { View, StyleSheet,ActivityIndicator,NetInfo,BackHandler,AsyncStorage,Button,ToastAndroid} from "react-native";
import { Actions } from "react-native-router-flux";
import NoDataFound from '../../components/ErrorItems/NoDataFound';
import AddressDetailList from '../../components/Lists/AddressDetailList';
import { Right ,Card,Text} from "native-base";
 export default class AddressBook extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          addressIndex     : 0,
          isLoading        : true,
          val              : "AddressCategory",
          selectedAddressId: null,
          userId           : "",
          
          addressLists     : '',
          addressListingUrl: 'http://api.kimsth.a2hosted.com/api/Address/api/GetAddress?userId=',
         

  
        }
    }
    displaydata= async()=> {
      try{
        let u = await AsyncStorage.getItem('UserId');
        console.log(".........ID IS..........",u);
        var k = u;
  
        this.setState({
         userId: u
        }, function () {
          console.log("..........DATA IS.........",this.state.userId);
  
        });
  
        // ToastAndroid.show(u, ToastAndroid.SHORT);
        return u;
      }
      catch(error){
      }
      }
      componentDidMount() {
         
         
        console.log("........... uuu..........",this.state.userId);
        BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
        );
  
        NetInfo.getConnectionInfo().then((connectionInfo) => {
          if (connectionInfo.type === 'none') {
            alert("No internet connection")
        } else {
          console.log("userId",this.state.userId);
            // online
           // do something
           
           this.getAddressDetails();
      
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
          this.getAddressDetails
        );
      
      
        }
  
        backAndroid= ()=> {

          if(this.props.nav==1){
            Actions.reset('Home');
            return true  
          }
          else{
            Actions.reset('Home');
            return true  
          }
        
          // Actions.pop() // Return to previous screen
          return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
        }

    componentWillMount(){
      console.log(".........xxxxxxxxx...........")
      this.displaydata();
  
    }
    componentWillUnmount () {
      console.log("Happpy.......")
      BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);

    }

    
    
     



   

    getAddressDetails=()=> {
      console.log("USER ID IS.............",this.state.userId);

      if(this.state.userId==null){
        console.log("inside if for api calling",this.state.userId);

        ToastAndroid.show("Please Register to Add Address", ToastAndroid.SHORT);


      }

else{
console.log("inside else for api calling",this.state.userId);
  return fetch(this.state.addressListingUrl+`${this.state.userId}`, {
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
    
      addressLists: responseJson.Address
    }, function () {

    });
    console.log(" Response length" +this.state.addressLists.length)
    var check = this.state.addressLists
for(var i in check) { 
console.log("Response header is",check[i]);
}
  })
  .catch((error) => {
    console.error(error);
  });
}



         
      };
   
      
   
      

handleAdd=()=>{
    Actions.UserDetailEntering({addressfrom:'addressdetails'})
}


OnRetry=()=>{

  Actions.login({from:'addressDetails',nav:null});

}
      
render()
     {
       if(this.state.userId!=null){
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
        }
        else{
          if (this.state.addressLists.length != 0){
            return ( 
              <View style = {styles.Container}>
                  
            
        
                <View style = {{ alignSelf: 'flex-end',width:"50%",margin:10}}>
        
        <Button color = 'steelblue' title = "ADD NEW ADDRESS" onPress = {this.handleAdd}/>
        
        
        </View>
              <AddressDetailList dummyData = {this.state.addressLists} />
                 
              </View>
            );
          }
               else {
                 return (
                  
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
               

                   <View  style = {{ alignItems:'center',width:"50%",margin:10}}>
          
          <Button  color = 'steelblue' title="ADD NEW ADDRESS" onPress={this.handleAdd}/>
          
         
          </View>

                 </View>
                 )
          }
        }



       }

   
      else if(this.state.userId==null){
return(

 
  <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
  

     <View  style = {{ alignItems:'center',width:"50%",margin:10}}>

<Button  color = 'steelblue' title="Register" onPress={this.OnRetry}/>


</View>

   </View>
   
)
;
      }

       
      }
     
      
    }
 
 const styles = StyleSheet.create({

    Container: {
        flex: 1
    }

});