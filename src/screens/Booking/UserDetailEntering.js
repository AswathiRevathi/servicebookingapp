import React, { Component } from "react";
import { View,StyleSheet,BackHandler, AsyncStorage, Image,ToastAndroid } from "react-native";

import RadioGroup from 'react-native-radio-buttons-group';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import { Container,DatePicker,Picker,Icon , Header, Content, Form, Item, Textarea, Text, Input, Label, Button,Body } from 'native-base';

import { Actions } from "react-native-router-flux";

import Moment from 'moment';

class UserDetailEntering extends Component {

  constructor(props) {
    super(props)
    this.state = {
      addressListingUrl: 'http://api.kimsth.a2hosted.com/api/Address/api/AddAddress',
        gender        : '',
        name          : '',
        age           : '',
        userId        :'',
        houseName     : '',
        locality      :'',
        district      :'',
        // statte        :'',
        pin           : '',
        mobile        : '',
        dob           : '',
        selectedButton: 'Male',
        date          : "",
        description   : '',
        chosenDate    : null,
        bookingResponse:"",
        data          : [

        {
          label: 'Male',
          value: 'Male',
        },
        {
          label: 'Female',
          value: 'Female',
        }
      ],
    };

    this.setDate = this.setDate.bind(this);

  }


  // update state
 onPress = data => this.setState({ data });
// onValueChange2(value:string) {
//     if(value!=='Gender')
//     this.setState({
//       gender: value
//     });
//   }
onValueChange2 (value: string) {
  if(value!="Gender"){
    this.setState({
      gender : value
  });
  }
  else if(value=='Gender'){
    this.setState({
      gender : null
  });
  }
   
}

onDistrictChange (value: string) {
  console.log("District is" +value)
  if(value!="District"){
    this.setState({
      
      district : value
  });
  }
  else if(value=='District'){
    this.setState({
      district : null
  });
  }
   
}




 setDate(newDate) {
    this.setState({ chosenDate: newDate });
    
    
  }
 
  componentWillMount(){
    console.log("inside componant will oumt","88")
    this.displaydata();

  }
  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }

  componentDidMount(){

    BackHandler.addEventListener('hardwareBackPress',this.backAndroid );
  
   
  }
  displaydata= async()=>  {
    try{
      let u = await AsyncStorage.getItem('UserId');
      console.log("display data userid",u);
      var k=u;

      this.setState({
       userId:u
      }, function () {
        console.log("display data user",this.state.userId);

      });

      // ToastAndroid.show(u, ToastAndroid.SHORT);
      return u;
    }
    catch(error){
    }
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
  
    // Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }
  

Validate=()=>{
  if(this.state.name.length==0){
    // ToastAndroid.show('name cant be  zero ', ToastAndroid.SHORT);

  }
};

  DetailsEnterHandler = () => {
    if(this.state.name.length==0){
      // alert(this.props.selectedSlot)

      ToastAndroid.show('Please enter name', ToastAndroid.SHORT);
  
    }
    else if(this.state.age.length==0){
      ToastAndroid.show('Please enter age', ToastAndroid.SHORT);

    }
    else if(this.state.gender==null){
      ToastAndroid.show('Please choose gender', ToastAndroid.SHORT);
     
    }
    else if(this.state.houseName.length==0){
      ToastAndroid.show('Please enter House Name', ToastAndroid.SHORT);
Console.log("Gender is",this.state.gender)
    }
    else if(this.state.locality.length==0){
      ToastAndroid.show('Please enter Your Place', ToastAndroid.SHORT);

    }
    
    else if(this.state.district.length==0){
      ToastAndroid.show('Please Choose District', ToastAndroid.SHORT);

    }
    // else if(this.state.statte.length==0){
    //   ToastAndroid.show('Please enter District', ToastAndroid.SHORT);

    // }
    else if(this.state.pin.length==0){
      ToastAndroid.show('Please enter PIN number', ToastAndroid.SHORT);

    }else if(this.state.pin.length!==6){
ToastAndroid.show('Invalid PIN number', ToastAndroid.SHORT);
    }
    
    
    else if(this.state.mobile.length==0){
      ToastAndroid.show('Please enter mobile number', ToastAndroid.SHORT);

    }else if(this.state.mobile.length!==10){
ToastAndroid.show('Invalid mobile number', ToastAndroid.SHORT);
    }
  
    else{


      console.log("NAME..."+this.state.name);
      console.log("NAME..."+this.state.age);
      console.log("NAME..."+this.state.gender);
      console.log("NAME..."+this.state.houseName);
      console.log("NAME..."+this.state.locality);
      console.log("NAME..."+this.state.district);
      console.log("NAME..."+this.state.statte);
      console.log("NAME..."+this.state.pin);
      console.log("NAME..."+this.state.mobile);
      console.log("NAME..."+this.state.chosenDate);
   
  // this.props.navigator.push({
  //   screen: "service_app_user_booking_confirmation", 
  //   title: 'Booking Confirmation',
  //   passProps: {
  //     name: this.state.name,
  //     mobile: this.state.mobile,
  //     age: this.state.age, date: this.state.date,
  //     gender: selectedButton,
  //     selectedDate:this.props.selectedDate,
  //     selectedTime:this.props.selectedSlot,
  //     serviceName:this.props.selectedService,
  //     serviceImage:this.props.selectedImage,
  //     serviceCategoty:this.props.selectedServiceCategory
  //   }
  // });

  var dobs = Moment(this.state.chosenDate,'MMM D YYYY').format("YYYY-MM-DD[T]HH:mm:ss").split("T")[0];

console.log("userid",this.state.userId);
console.log("Name",this.state.name);
console.log("Age",this.state.age);
console.log("Mobile",this.state.mobile);
console.log("gender",this.state.gender);

console.log("HouseNAme",this.state.houseName);
console.log("locality",this.state.locality);
console.log("state",this.state.statte);
console.log("Pin",this.state.pin);


  return  fetch(this.state.addressListingUrl, {
  method : 'POST',
  headers: {
      Accept        : 'application/json',
      'Content-Type': 'application/json',
  },
   body:JSON.stringify({
    userId    :this.state.userId,
    name      : this.state.name,
    age       : this.state.age,     
    mobileNumber: this.state.mobile,
    gender      : this.state.gender,
  
    houseName        :this.state.houseName,
    locality         :this.state.locality,
    distric          :this.state.district,
    state            :'kerala',
    pincode          :this.state.pin,
   
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
console.log("responsejson", this.state.bookingResponse);
console.log("props", this.props);
console.log("dataprop", this.props.pro);




if(this.props.addressfrom=='addressbook'){
  Actions.AddressBook({user:this.state.userId,dataprop:this.props.pro});

}
else if(this.props.addressfrom=='addressdetails'){ 


  Actions.AddressDetails({user:this.state.userId});

}



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
  }


// }

   
  // }
  
  render() {

    const slideAnimation = new SlideAnimation({
      slideFrom: 'bottom',
    });
    selectedButton = this.state.data.find(e => e.selected == true);
    selectedButton = selectedButton ? selectedButton.value : this.state.data[1].label;

    // this.state.genderSelected===selectedButton;
    return (
      <Container>
        <Content>
          <Form  style = {{padding:15}}>
          <Label style = {{ margin: 5 }}>Enter Patient Details</Label>
       
             <Item style = {styles.EditTextContainer}>
              <Input 
              
              placeholder  = "Name"
              onChangeText = {(name) => this.setState({ name })}
              value        = {this.state.name}
               
                />
            </Item>
             <Item style = {styles.EditTextContainer}>
             
              <Input 
              maxLength    = {2}
              placeholder  = "Age"
              keyboardType = 'numeric'
              onChangeText = {(age) => this.setState({ age })}
              value        = {this.state.age} />
            </Item>

            
 

            <Item picker style = {styles.EditTextContainer}>
              <Picker
                mode                 = "dropdown"
                iosIcon              = {<Icon name="ios-arrow-down-outline" />}
                style                = {{ width:100}}
                placeholder          = "Gender"
                placeholderStyle     = {{ color: "#bfc6ea" }}
                placeholderIconColor = "#007aff"
                selectedValue        = {this.state.gender}
                onValueChange        = {this.onValueChange2.bind(this)}
              >
                 <Picker.Item label = "Gender" value      = "Gender" /> 
                <Picker.Item label = "Male" value        = "male" />
                <Picker.Item label = "Female" value      = "female" />
                <Picker.Item label = "Transgender" value = "Transgender" />
               
              </Picker>
            </Item>
            <Item style = {styles.EditTextContainer}>
              <Input 
              
              placeholder  = "House Name"
              onChangeText = {(houseName) => this.setState({ houseName })}
              value        = {this.state.houseName}
               
                />
            </Item>
            <Item style = {styles.EditTextContainer}>
              <Input 
              
              placeholder  = "Place"
              onChangeText = {(locality) => this.setState({ locality })}
              value        = {this.state.locality}
               
                />
            </Item>

           < Item picker style = {styles.EditTextContainer}>
              <Picker
                mode                 = "dropdown"
                iosIcon              = {<Icon name="ios-arrow-down-outline" />}
                style                = {{ width:100}}
                placeholder          = "District"
                placeholderStyle     = {{ color: "#bfc6ea" }}
                placeholderIconColor = "#007aff"
                selectedValue        = {this.state.district}
                onValueChange        = {this.onDistrictChange.bind(this)}
              >
                 <Picker.Item label = "District" value      = "District" /> 
                <Picker.Item label = "Kasaragod" value        = "Kasaragod" />
                <Picker.Item label = "kannur" value      = "kannur" />
                <Picker.Item label = "Wayanad" value = "Wayanad" />
               <Picker.Item label = "Kozhikode" value      = "Kozhikode" /> 
                <Picker.Item label = "Malappuram" value        = "Malappuram" />
                <Picker.Item label = "Palakkad" value      = "Palakkad" />
                <Picker.Item label = "Thrissur" value = "Thrissur" />
                <Picker.Item label = "Eranakulam" value      = "Eranakulam" />
                <Picker.Item label = "Idukki" value = "Idukki" />
                <Picker.Item label = "Pathanamthitta" value        = "Pathanamthitta" />
               < Picker.Item label = "Kottayam" value      = "Kottayam" /> 
               
                <Picker.Item label = "Kollam" value      = "Kollam" />
                <Picker.Item label = "Thiruvananthapuram" value = "Thiruvananthapuram" />
               
              </Picker>
            </Item>
            {/* <Item style = {styles.EditTextContainer}>
              <Input 
              
              placeholder  = "District"
              onChangeText = {(district) => this.setState({ district })}
              value        = {this.state.district}
               
                />
            </Item> */}
            {/* <Item style = {styles.EditTextContainer}>
              <Input 
              
              placeholder  = "State"
              onChangeText = {(statte) => this.setState({ statte })}
              value        = {this.state.statte}
               
                />
            </Item> */}
            <Item style = {styles.EditTextContainer}>
             
              <Input 
              maxLength    = {6}
              placeholder  = "PIN"
              keyboardType = 'numeric'
              onChangeText = {(pin) => this.setState({ pin })}
              value        = {this.state.pin.replace(/\s+/g,' ').trim()} />
            </Item>

         <Item style = {styles.EditTextContainer}>
             
              <Input 
              maxLength    = {10}
              placeholder  = "Mobile Number"
              keyboardType = 'numeric'
              onChangeText = {(mobile) => this.setState({ mobile })}
              value        = {this.state.mobile.replace(/\s+/g,' ').trim()} />
            </Item>


             {/* <Item style = {styles.EditTextContainer}>
             
              <Input 
              maxLength    = {10}
              placeholder  = "Description"
              onChangeText = {(description) => this.setState({ description })}
              value        = {this.state.description}
              rowSpan      = {2}
              />
            </Item>
             <View style = {{ justifyContent: 'flex-start',marginLeft:10,marginTop:10}}>
             <Text style = {{ fontSize: 13,marginTop:5 ,marginBottom:5}} >
                  Date Of Birth
                </Text>
              </View> */}
              {/* <View style = {styles.ButtonContainer}
      >
        
         <Icon style = {{ color: '#ffffff', marginLeft: 5 }} active name = 'calendar' />
                                              
          <DatePicker
            defaultDate             = {new Date()}
            minimumDate             = {new Date(1800, 1, 1)}
            maximumDate             = {new Date()}
            locale                  = {"en"}
            timeZoneOffsetInMinutes = {undefined}
            modalTransparent        = {false}
            animationType           = {"fade"}
            androidMode             = {"default"}
            placeHolderText         = "Choose date"
            textStyle               = {{ color: "white" }}
            placeHolderTextStyle    = {{ color: "white" }}
            onDateChange            = {this.setDate}
            />
           
        </View> */}

               {/* <DatePicker
            defaultDate = {new Date()}
            // minimumDate={new Date()}
            maximumDate             = {new Date()}
            locale                  = {"en"}
            timeZoneOffsetInMinutes = {undefined}
            modalTransparent        = {false}
            animationType           = {"fade"}
            androidMode             = {"default"}
            placeHolderText         = "Choose date"
            textStyle               = {{ color: "white" }}
            placeHolderTextStyle    = {{ color: "white" }}
            onDateChange            = {this.setDate}
            /> */}
            
            {/* <View style={{ marginLeft: 20, marginRight: 20, marginTop: 10 }}  >
              <View style = {{ justifyContent: 'flex-start', }}>
              <Text style = {{ fontSize: 15 }} >
                  Gender
                </Text>
              </View>

              <RadioGroup flexDirection = 'row' radioButtons = {this.state.data} onPress = {this.onPress} />
            </View> */}
           
            {/* <Textarea rowSpan={5} bordered placeholder="Description" style={{ marginTop: 40, marginRight: 10, marginLeft: 10 }} /> */}

            <View style = {{ justifyContent: 'center', alignItems: 'center' }}>
              {/* onPress={() => {
                this.popupDialog.show();
              }}  */}
              <Body>
              <Button rounded info onPress = {this.DetailsEnterHandler} style = {{ margin: 20, backgroundColor: '#2471A3', width: 120, height: 40, justifyContent: 'center' }} >
              <Text   style                = {{ fontSize: 12 }} >Submit</Text>
              </Button>
              </Body>
            </View>
            <PopupDialog width           = {0.5} height = {0.3}
                         ref             = {(popupDialog) => { this.popupDialog = popupDialog; }}
                         dialogAnimation = {slideAnimation}
            >
              <View  style  = {{ width: '100%', alignItems: 'center' }}>
              <Image source = {require("../../Images/token.png")} style = {{ height: 100, width: 100, margin: 10, justifyContent: 'center' }}></Image>
                <Text>Your Token No Is</Text>
                <Text style = {{ fontSize: 20, color: 'black', fontWeight: 'bold', margin: 10 }}>103</Text>

              </View>
            </PopupDialog>


          </Form>
        </Content>
      </Container>
    );
  }
}



const styles = StyleSheet.create({
  EditTextContainer: {
        flexDirection  : 'row',
        alignItems     : 'center',
        backgroundColor: '#fff',
        borderWidth    : .1,
        borderColor    : '#000',
        height         : 50,
        borderRadius   : 5,
        marginLeft     : 10,
        marginTop      : 10,
        marginRight    : 10,
        paddingLeft    : 5
    },
     ButtonContainer: {
      width          : "100%",
      flexDirection  : 'row',
      alignItems     : 'center',
      backgroundColor: '#add8e6', 
      borderWidth    : .6,
      borderColor    : '#fff',
      height         : 45,
      justifyContent : 'center',
      marginTop      : 10,
      marginBottom   : 10,
      paddingLeft    : 5
  }
});

export default UserDetailEntering;
