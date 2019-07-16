import React, { Component } from "react";
import { View, StyleSheet,ActivityIndicator,NetInfo,BackHandler,AsyncStorage,Button,ToastAndroid,Text} from "react-native";
import { Actions } from "react-native-router-flux";
import NoDataFound from '../../components/ErrorItems/NoDataFound';
import AddressList from '../../components/Lists/AddressList';
import { Right,Container,Content } from "native-base";
 export default class AddressBook extends Component{
    constructor(props) {
        super(props);
        this.state = { 
          selectedSlotIndex: null,
          selectedSlotId   : null,selectedSlot   : null,
          addressIndex:0,
          isLoading                : true,
          val                      : "AddressCategory",
          selectedAddressId         :null,
          selectedArray:null,
          passId:0,
          userId:"",
          
          addressLists       : '',
          addressListingUrl: 'http://api.kimsth.a2hosted.com/api/Address/api/GetAddress?userId=',
         

  
  
        //     dummyDa:'',array:[],
           
        //    dummy : {
        //     "address_list": [
        //       {
        //         "Id": 1,
        //         "Name": "Raj",
        //         "Age": 18,
        //         "MobileNumber": 9040987623,
        //         "Gender": "Male",
        //         "DOB": "1986-04-21T11:23:28.653",
        //         "HouseName": "house 1",
        //         "Locality": "Nadakkavu",
        //         "District": "Kozhikode",
        //         "State": "Kerala",
        //         "Pin": 673571,
        //         "isSelected": true,
        //          "Status":"Selected"
               
        //       },
        //       {
        //         "Id": 2,
        //         "Name": "Krish",
        //         "Age": 28,
        //         "MobileNumber": 9040987623,
        //         "Gender": "Male",
        //         "DOB": "1990-12-21T11:23:28.653",
        //         "HouseName": "house 2",
        //         "Locality": "Eranjipalam",
        //         "District": "Kozhikode",
        //         "State": "Kerala",
        //         "Pin": 673576, 
        //         "isSelected": false,
        //          "Status":"Notselected"
               
        //       },
        //       {
        //         "Id": 3,
        //         "Name": "Suresh",
        //         "Age": 38,
        //         "MobileNumber": 9040987623,
        //         "Gender": "Male",
        //         "DOB": "1980-10-21T11:23:28.653",
        //         "HouseName": "house 3",
        //         "Locality": "Chelavoor",
        //         "District": "Kozhikode",
        //         "State": "Kerala",
        //         "Pin": 673578,
        //         "isSelected": false,
        //          "Status":"Notselected"
        //       }
        //     ]
        //   }
           
        };
    }

    // componentDidMount(){
    //     this.getAddress();
    //   }
    //   componentWillUnmount () {
    //    console.log("welcome")
    //   }
  
    //   getAddress=()=>{
    //     console.log("hai")
    //   // var arr=this.state.dummyDa
    //    var arr=this.state.dummy.address_list
  
    //    for(var i in arr) { 
    //     console.log("array items",arr[i]);
    //    }
    //     this.setState(
    //       {
    //         dummyDa:this.state.dummy.address_list
  
    //       }
    //     )
    //     }
    displaydata= async()=> {
      try{
        let u = await AsyncStorage.getItem('UserId');
        console.log(".........ID IS..........",u);
        var k=u;
  
        this.setState({
         userId:u
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
         
        BackHandler.addEventListener('hardwareBackPress',this.backAndroid

  
  
        );
        console.log("........... uuu..........",this.state.userId);
  
  
        NetInfo.getConnectionInfo().then((connectionInfo) => {
          if (connectionInfo.type === 'none') {
            alert("No internet connection")
        } else {
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
  

    componentWillMount(){
      console.log(".........xxxxxxxxx...........")

      this.displaydata();
  
    }
    componentWillUnmount () {
      console.log("Happpy.......")

      BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);


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
          Actions.ServiceCategory({nav:1});
          return true
        }
      
        // Actions.pop() // Return to previous screen
        return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
      }



   

    getAddressDetails=()=> {
      console.log("USER ID IS.............",this.state.userId);

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
              isLoading        : false,
            
              addressLists:responseJson.Address
            }, function () {
    
            });
            console.log(" Response length" +this.state.addressLists.length)
            var check=this.state.addressLists




var addressarray=this.state.addressLists;
var addressTempArray=[];

            
            for(var i in addressarray){
              console.log("itemaddressarray",addressarray[i]);
              // addressTempArray.push(addressarray[i]);
if(i==0){
  var newUser = "isSelected";
              var newValue = true;
              addressarray[i][newUser]=newValue; 
              this.setState({
                selectedSlotId: addressarray[0].Id,
                selectedArray:addressarray[0]
                
            });
            console.log("selectedAddressId",this.state.selectedAddressId);


}
else{
  var newUser = "isSelected";
  var newValue = false;
  addressarray[i][newUser]=newValue;

}
             
       

            }


            this.setState({
              addressLists: addressarray
              
          });
      


            console.log("length item  array",addressarray.length);

    for(var i in addressarray) { 

       console.log("Response header is",addressarray[i]);
       }
          })
          .catch((error) => {
            console.error(error);
          });
         
      };
   
      
   
  addressUpdation=(ind,key,currentStatus)=>{
    console.log("afterclick id value",ind);
    console.log("afterclick index value",key);
    console.log("Current status",currentStatus);
    console.log("selectedAddressId",this.state.selectedAddressId);
  


  this.setState({
  }, function () {

  });

    
    let  array       = Object.assign({},this.state.addressLists)

    if(currentStatus==false){
      if(key!=0){
        console.log("af(key!index value",key);
    
        array[0].isSelected = false
    
        array[key].isSelected = true
      
                      if(this.state.selectedSlotIndex!==null)
                      array[this.state.selectedSlotIndex].isSelected = false;
                      this.setState({selectedSlotIndex:key})
                      this.setState({selectedSlotId:array[key].Id})
                      this.setState({selectedArray:array[key]})
                      this.setState({array});
                      console.log("selectedSlotId",this.state.selectedSlotId);

       
       }
       else{
        console.log("selectedAddressId",this.state.selectedSlotId);

        console.log("aflue",key);
    
        array[key].isSelected = true
      
                      if(this.state.selectedSlotIndex!==null)
                      array[this.state.selectedSlotIndex].isSelected = false;
                      this.setState({selectedSlotIndex:key})
                      this.setState({selectedSlotId:array[key].Id})
                      this.setState({selectedArray:array[key]})

                      this.setState({array});
                      console.log("selectedSlotId",this.state.selectedSlotId);

       }
    }
   
  


for(var i in array){
  console.log("array after choosng",array[i]);

}



}
handleAdd=()=>{
    Actions.UserDetailEntering({addressfrom:'addressbook',pro:this.props})
}


handleConfirm=()=>
{
//   const addId = this.state.addressLists.find(address => {
//     return address.id === key;
// });
    if(this.state.selectedSlotId===null)
    {
        ToastAndroid.show('Please Add New Address', ToastAndroid.SHORT);
    }
    else{

      console.log("passed directValue",this.props.directValue);
if(this.props.directValue==1){
  console.log("passed directValues",this.props.directValue);


  Actions.BookingConfirmation(

    {
            addressId:  this.state.selectedSlotId,
            selectedAddressArray:this.state.selectedArray,
            selectedDate     : this.props.selectedDate,
            selectedTime     : this.props.selectedSlotString,
            serviceName      : this.props.selectedService,
            serviceImage     : this.props.selectedImage,
            serviceCategoty  : this.props.selectedServiceCategory,
            serviceId        : this.props.selectedServiceId,
            serviceCategoryId: this.props.selectedServiceCategoryId,
            description      : this.state.description,nav:null
    }


);

 
}
else{
  console.log(" else passed directValue",this.props.directValue);

  Actions.BookingConfirmation(

    {
            addressId:  this.state.selectedSlotId,
            selectedAddressArray:this.state.selectedArray,
            selectedDate     : this.props.dataprop.selectedDate,
            selectedTime     : this.props.dataprop.selectedSlotString,
            serviceName      : this.props.dataprop.selectedService,
            serviceImage     : this.props.dataprop.selectedImage,
            serviceCategoty  : this.props.dataprop.selectedServiceCategory,
            serviceId        : this.props.dataprop.selectedServiceId,
            serviceCategoryId: this.props.dataprop.selectedServiceCategoryId,
            description      : this.state.description,nav:null
    }


);

}

    
    }
}
      
render()
     {
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
      } else{
        if (this.state.addressLists.length != 0){
          return ( 

            <View  style  = {styles.Container}>
                
            <View  style = {{ alignSelf: 'flex-end',width:"50%",margin:10}}>
          
            <Button  color = 'steelblue' title="ADD NEW ADDRESS" onPress={this.handleAdd}/>
            
           
            </View>
            <Text style={{margin:10,fontWeight:'bold',fontSize:17}}>Choose Address</Text>
            
            <Container>
    <Content>
            <View style={{marginBottom:10}}> 
            <AddressList  radioId={this.state.passId}  dummyData={this.state.addressLists} onItemSelected = {this.addressUpdation}/>

            </View></Content></Container>
            <View   style = {{width:"100%"}}>
        
       <Button title = "CONFIRM" color = 'steelblue' onPress = {this.handleConfirm} style={{height:60}}/>
       </View> 
               
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
      
    } 
                  
             
          // }


        //  }
      
          

        
// return ( 
//     <View  style  = {styles.Container}>
    
//     <View  style = {{ alignSelf: 'flex-end',width:"30%"}}>
  
//         <Button title="ADD" onPress={this.handleAdd}/>
    
   
//     </View>
//     <AddressList  dummyData={this.state.dummyDa} onItemSelected = {this.addressUpdation}/>
//         {/* <Button title="OK" onPress={this.click}></Button> */}
//         <View   style = {{width:"100%"}}>

// <Button title = "CONFIRM" color = 'steelblue' onPress = {this.handleConfirm} style={{height:60}}/>
// </View>
//     </View>
// );
    
// }
      

 
 const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: '#fff',
    }

});