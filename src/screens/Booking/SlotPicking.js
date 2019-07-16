import React, {Component} from "react";
import {Text,View,StyleSheet,ToastAndroid,BackHandler,NetInfo,TouchableOpacity,TouchableWithoutFeedback} from "react-native";
import SlotList from '../../components/Lists/SlotList';
import {  DatePicker ,Icon,Container,Content,Button,Body} from 'native-base';
import ServiceListItem from '../../components/ListItem/ServiceListItem';
import { Actions } from "react-native-router-flux";
import Moment from 'moment';

class SlotPicking extends Component{
     constructor(props) {
    super(props);
    this.state = {
        selectedSlotIndex: null,
        selectedSlotId   : null,
        chosenDate       : null, isLoading: true,
      
        selectedSlot   : null,
        isToggled      : false,                                             message: null,
        val            : "slotpicking",
        Slots          : [],                                                flag   : false, availability: false,
        status         : null,
        reservedSlots  : [],
        availabilityUrl: 'http://api.kimsth.a2hosted.com/api/ServiceList/api/Tokens?Id=',

    
        };
        this.setDate = this.setDate.bind(this);

  
  }

  
  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }
      
  backAndroid =()=> {
  console.log(this.props.nav);
    if(this.props.nav!=null){
        Actions.Service({id:0,nav:2})
        return true 

    }
    else{
      Actions.pop();
      return true 

    }
  
    // Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  componentDidMount(){

    BackHandler.addEventListener('hardwareBackPress',this.backAndroid);

    console.log("----"+this.props);
    this.setState({
        chosenDate: Moment(this.props.selectedService.NextAvailableDate.split("T")[0]).format('DD-MM-YYYY')
    });
    //   this.getSlots();
  }

   setDate(newDate) {
       console.log("newdarew",newDate);
var k  = newDate.toString();
var op = k.split(" ")[0];
console.log("day",op);
   var p = this.props.selectedService.Availabledates.split(",");
   console.log("no of days",p.length);
   this.setState({
    flag: false
   
  }, function () {


  });
   for(var i in p){
  
    console.log("first 3 of days",p[i].substr(0,3));

       if(op==p[i].substr(0,3)){
        console.log(" present ",i);
        this.setState({
            flag: true
           
          }, function () {
 
  
          });
        this.setState({ chosenDate: Moment(newDate).format('DD-MM-YYYY') });

       }
       else{
           console.log("not present ",i);
       }
   }
   console.log("flag",this.state.flag);

   if(this.state.flag==true){
       console.log("dtae available","oo");
       this.setState({
        Slots       : [],
        availability: false
       
      }, function () {


      });
   }
   else{
    this.setState({
        Slots       : [],
        availability: true
       
      }, function () {


      });
    ToastAndroid.show('Doctor Not Available.Please choose another day', ToastAndroid.SHORT);
}



      console.log("converrt",Moment(newDate).format('DD-MM-YYYY')) ;





    
    
  }
  checkAvailabilityHandler = () => {

    console.log(this.state.chosenDate);
    console.log("inside check availability",this.state.chosenDate);
    // ToastAndroid.show("toas",ToastAndroid.SHORT);

    NetInfo.getConnectionInfo().then((connectionInfo) => {
        if (connectionInfo.type === 'none') {
          alert("No internet connection")
      } else {
          // online
         // do something
        //  ToastAndroid.show("connection available",ToastAndroid.SHORT);

         this.handlePress();
    
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
        this.handlePress
      );
    
  }

  onPressLearnMore=()=>{
      ToastAndroid.show("hi",ToastAndroid.LONG);
  }
  handlePress = async () => {
    // ToastAndroid.show("inside handle press",ToastAndroid.SHORT);


    var k = this.state.chosenDate.split("-")[1]+"-"+this.state.chosenDate.split("-")[0]+"-"+this.state.chosenDate.split("-")[2]+" 14:24:36";
    // ToastAndroid.show("chosen date"+k,ToastAndroid.SHORT);

    console.log("SD",k);
    const IsoDateTo = Moment(this.state.chosenDate,'DD-MM-YYYY').format('YYYY-MM-DD[T]HH:mm:ss');





    console.log("IsoDateTo",IsoDateTo);
    var toSenDdate=IsoDateTo.split("T")[0];
    // ToastAndroid.show("url calling",ToastAndroid.SHORT);

      console.log("URL",this.state.availabilityUrl+`${this.props.selectedService.Id}`+"&date="+`${toSenDdate}`)





    return  fetch(this.state.availabilityUrl+`${this.props.selectedService.Id}`+"&date="+`${toSenDdate}`, {
        method : 'POST',
        headers: {
          Accept        : 'application/json',
          'Content-Type': 'application/json',
        },

      }).then((response) => response.json())
      .then((responseJson) => {
        // return responseJson.servicesCategory;


        this.setState({
          isLoading    : false,
          status       : responseJson.Status,
          message      : responseJson.Message,
        
         
        }, function () {
console.log("aswathiii",responseJson);
// ToastAndroid.show(" after url calling",ToastAndroid.SHORT);
if(responseJson.Status=="true"){

    this.setState({
        Slots        : responseJson.service.Token,
        reservedSlots: responseJson.service.ReservedTokens
        // userId:responseJson.UserId.toString()
      }, function(){
        this.getSlots();

      });




}
else{
    ToastAndroid.show(responseJson.Message, ToastAndroid.SHORT);

}

        });
      })
      .catch((error) => {
        console.error(error);
      });
      console.log("aswathiiiff",responseJson);


}


  getSlots=()=>{

    var timeslots     = this.state.Slots
    var reserved      = this.state.reservedSlots
    var newStateArray = [];

    


    // ToastAndroid.show("inside reserved"+reserved.length,ToastAndroid.show);
    // ToastAndroid.show("inside "+reserved.length,ToastAndroid.show);


  
        console.log("inndex",i);

        if(reserved.length!=0){
            var intersection = reserved.filter(element => timeslots.includes(element));

            

            console.log("commm",intersection);

            for(var i in intersection){
                newStateArray.push({ 
             
                    "SlotTittle": intersection[i],
                    "isSelected": false,
                    "SlotText"  : intersection[i],
                    "SlotStatus": "Reserved",
                    "SlotColor" : 'red'
                   
                }); 
                
            }


            var res = timeslots.filter( function(n) { return !this.has(n) }, new Set(reserved) );
            console.log("commmres",res);

            for(var k in res){
                newStateArray.push({ 
             
                    "SlotTittle": res[k],
                    "isSelected": false,
                    "SlotText"  : res[k],
                    "SlotStatus": "Not Reserved",
                    "SlotColor" : 'red'
                   
                }); 
                
            }

        //     console.log("reserved",k);
        //     for(var k in  reserved){
        //         if(reserved[k]==timeslots[i]){
                   
        //             console.log("pushing reserved",reserved[k])
        //             console.log("rsed",reserved)
        //             newStateArray.push({ 
             
        //                 "SlotTittle": reserved[k],
        //                 "isSelected": false,
        //                 "SlotText"  : reserved[k],
        //                 "SlotStatus": "Reserved",
        //                 "SlotColor":'red'
                       
        //             }); 
                    

        //         }
        //         else{
        //             console.log("pushing non reserved",timeslots[i])

        //             newStateArray.push({ 
             
        //                 "SlotTittle": timeslots[i],
        //                 "isSelected": false,
        //                 "SlotText"  : timeslots[i],
        //                 "SlotStatus": "Not Reserved",
        //                 "SlotColor":'blue'

                       
        //             }); 
        //         }
        // }
    }
    else{
        console.log("pushing non reserved without non reserved token",timeslots[i])
for(var i in timeslots){
    newStateArray.push({ 
         
        "SlotTittle": timeslots[i],
        "isSelected": false,
        "SlotText"  : timeslots[i],
        "SlotStatus": "Not Reserved",
        "SlotColor" : 'blue'

       
    });
}
       
    }
            
            // else{
            //     newStateArray.push({ 
         
            //         "SlotTittle": timeslots[i],
            //         "isSelected": false,
            //         "SlotText"  : timeslots[i],
            //         "SlotStatus": "Not Reserved"
                   
            //     });
            // }
        

        console.log("element",timeslots[i]);

       
    
        // newStateArray = sortByKey(newStateArray, 'SlotTittle');
        newStateArray.sort(function(a, b){
            return a.SlotTittle-b.SlotTittle
        })
        console.log("newStateArray",newStateArray);


    this.setState({
        Slots: newStateArray 
        
    });

  }
   slotUpdation =(Slot,key,status) => {
console.log("statusssress",status);

    if(status=='Not Reserved'){
        let   array           = Object.assign({}, this.state.Slots);  //creating copy of object
        array[key].isSelected = true
        if(this.state.selectedSlotIndex!==null)
        array[this.state.selectedSlotIndex].isSelected = false;
        this.setState({selectedSlotIndex:key})
        this.setState({selectedSlotId:array[key].Id})
        this.setState({selectedSlot:Slot})
        this.setState({array});
    }
    else{
        ToastAndroid.show('Slot Already reserved.Choose another slot', ToastAndroid.SHORT);

        console.log("cant reserve");

    }
      
    }
    addMinutes=(time, minutes) =>{
        var date     = new Date(new Date('01/01/2015 ' + time).getTime() + minutes * 60000);
        var tempTime = ((date.getHours().toString().length == 1) ? '0' + date.getHours() : date.getHours()) + ':' +
          ((date.getMinutes().toString().length == 1) ? '0' + date.getMinutes() : date.getMinutes());
        return tempTime;
      }

   reserveSlotHandler = () => {
       if(this.state.chosenDate===null){
           ToastAndroid.show('Please choose a date', ToastAndroid.SHORT);
       }else{
           
           //checking wheather selected slot for reserve
     if(this.state.selectedSlot===null)
     {
        ToastAndroid.show('Please choose a slot', ToastAndroid.SHORT);
     }else{
        const selSlot = this.state.Slots.find(slot => {
            return slot.Id === this.state.selectedSlotId;
        });
       
        //     this.props.navigator.push({
        //     screen: "service_app_user_details_entering",
        //     title: "Patient Details",
        //     passProps:{
        //         selectedSlotId:selSlot.Id,
        //         selectedSlot:selSlot.SlotTittle,
        //         selectedDate:this.state.chosenDate.toString().substr(4, 12),
        //         selectedService:this.props.selectedService.ServiceName,
        //         selectedImage:this.props.selectedService.ServiceImage,
        //         selectedServiceCategory:this.props.selectedService.ServiceCategory,
        //         selectedServiceQualification:this.props.selectedService.ServiceQualification
        //     }
        // });
        console.log("to userdetails",this.props)
        console.log("to userdetails2",this.state.chosenDate.toString().substr(4, 12))



        Actions.AddressBook({
            selectedSlotId    : selSlot.Id,
            selectedSlotString: this.state.selectedSlot,
            selectedDate      : this.state.chosenDate,
            selectedService   : this.props.selectedService.ServiceName,
            selectedImage     : this.props.selectedService.ServiceImage,
            selectedServiceId : this.props.selectedService.Id,
            selectedServiceCategory  : this.props.selectedService.ServiceCategory,
            selectedServiceCategoryId: this.props.selectedService.CategoryID,
            selectedServiceQualification: this.props.selectedService.ServiceQualification,
            nav                         : null,
            directValue:1
        });

        
        // Actions.AddressBook({
        //     selectedSlotId    : selSlot.Id,
        //     selectedSlotString: this.state.selectedSlot,
        //     selectedDate      : this.state.chosenDate,
        //     selectedService   : this.props.selectedService.ServiceName,
        //     selectedImage     : this.props.selectedService.ServiceImage,
        //     selectedServiceId : this.props.selectedService.Id,

        //     selectedServiceCategory  : this.props.selectedService.ServiceCategory,
        //     selectedServiceCategoryId: this.props.selectedService.CategoryID,

        //     selectedServiceQualification: this.props.selectedService.ServiceQualification,
        //     nav                         : null
        // });
         }
       }
    }
    profileViewHandler = () => {
   
  Actions.Profile({      selectedDocId:  this.props.selectedService,nav:null
  });
  
  }

  alertHandler = () => {
   alert(this.props.selectedService.ServiceName);
   alert(this.props.selectedService.ServiceImage);
   alert(this.props.selectedService.ServiceCategory);
   alert(this.props.selectedService.ServiceQualification);
  }


  onlyAlertHandler = () => {
   alert(this.state.chosenDate);
  }
    render(){
        let modalContent       = null;
        let modalContent2      = null;
        let availabilityButton = null;



        if(this.state.Slots.length==0&&this.state.availability==false){
            modalContent = (
                <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style = {{flex:1,fontWeight:'bold',fontSize:15,margin:50}}>
                    Check Availability to View Slots
                </Text>
                </View>
            )  ;     

            modalContent2=(

/* <TouchableWithoutFeedback disabled = {true} >
<View                     style    = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'gray'}}>
<Text                     style    = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff',alignItems:'center',width:"100%",justifyContent:'center',height:30,lineHeight:30}} >Book Now</Text>

</View>

</TouchableWithoutFeedback> */


                <Button disabled block onPress = {this.reserveSlotHandler} style = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'gray' }} >
                <Text   style         = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff'}} >Book Now</Text>
                                </Button>
            );
            availabilityButton=(
             
// <TouchableWithoutFeedback onPress = {this.checkAvailabilityHandler} >
// <View                     style   = {{height:40,justifyContent: 'center',backgroundColor:'steelblue',marginRight:5}}>
// <Text                     style   = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff',padding:10}} >Check Availability</Text>

// </View>

// </TouchableWithoutFeedback>

                    <Button   block onPress = {this.checkAvailabilityHandler} style = {{height:40,justifyContent: 'center',backgroundColor:'steelblue',marginRight:5 }} >
            <Text   style         = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff',padding:10}} >Check Availability</Text>
                            </Button>
            
             
            );

        }
        else if(this.state.Slots.length==0&&this.state.availability==true){
            modalContent = (
                <View style = {{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text style = {{flex:1,fontWeight:'bold',fontSize:13,margin:50}}>
                    Doctor Not Available.Choose Another Date
                </Text>
                </View>
            )  ;     
            modalContent2=(

// <TouchableWithoutFeedback disabled = {true}>
// <View                     style    = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'gray'}}>
// <Text                     style    = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff',alignItems:'center',width:"100%",justifyContent:'center',height:30,lineHeight:30}} >Book Now</Text>

// </View>

// </TouchableWithoutFeedback>

                <Button disabled block onPress = {this.reserveSlotHandler} style = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'gray' }} >
                <Text   style         = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff'}} >Book Now</Text>
                                </Button>



            );
            availabilityButton=(

                             
/* <TouchableWithoutFeedback disabled = {true}  onPress = {this.checkAvailabilityHandler} >
<View                     style    = {{height:40,justifyContent: 'center',backgroundColor:'gray',marginRight:5 }}>
<Text                     style    = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff',padding:10}} >Check Availability</Text>

</View>

</TouchableWithoutFeedback> */
              
                      <Button  disabled block   onPress = {this.checkAvailabilityHandler} style = {{height:40,justifyContent: 'center',backgroundColor:'gray',marginRight:5 }} >
              <Text   style         = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff',padding:10}} >Check Availability</Text>
                              </Button>
              
              
              );
  

        }
        else if(this.state.Slots.length!=0&&this.state.availability==false){
            modalContent = (
                <SlotList style = {{margin:10}} slotList = {this.state.Slots} onItemSelected = {this.slotUpdation}/>

            )  ;  
            modalContent2=(


// <TouchableWithoutFeedback onPress = {this.reserveSlotHandler} >
// <View                     style   = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'steelblue' }}>
// <Text                     style   = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff',alignItems:'center',width:"100%",justifyContent:'center',height:30,lineHeight:30}} >Book Now</Text>

// </View>
// </TouchableWithoutFeedback>

                <Button block onPress = {this.reserveSlotHandler} style = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'steelblue' }} >
                <Text   style         = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff'}} >Book Now</Text>
                                </Button>



              
            );
            availabilityButton=(
//                 <TouchableWithoutFeedback onPress = {this.checkAvailabilityHandler} >
// <View >
// <Text style = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff',padding:10}} >Check Availability</Text>

// </View>
// </TouchableWithoutFeedback>
                
                      <Button   block  onPress = {this.checkAvailabilityHandler} style = {{height:40,justifyContent: 'center',padding:5,backgroundColor:'steelblue',marginRight:5 }} >
              <Text   style         = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff',padding:10}} >Check Availability</Text>
                              </Button>



              
               
              );

        }


       



        // var starttime = this.props.selectedService.StartTime;
        // var interval = this.props.selectedService.TimeDuration;
        // var endtime = this.props.selectedService.EndTime;
        // var timeslots = [starttime];
        
        
        // while (starttime != endtime) {
        
        //   starttime =this. addMinutes(starttime, interval);
        //   timeslots.push(starttime);
        // }

        // // var employees = [];
        
        // for(var i in timeslots) {    
        
        //     var item = timeslots[i];   
        
        //     this.state.Slots.push({ 
        //         "SlotTittle" : timeslots[i],
        //         "isSelected":false,
        //         "SlotStatus":"Not Reserved"
        //     });
        // }
        

        // const val=this.props.selectedService.dept
        return(
            <View style = {{height:"100%"}}>
            <View style = {{width:'100%',height:"25%"}}>
 <ServiceListItem
    serviceName       = {this.props.selectedService.ServiceName}
    serviceImage      = {this.props.selectedService.ServiceImage}
    department        = {this.props.selectedService.ServiceCategory}
    qualification     = {this.props.selectedService.ServiceQualification}
    nextAvailableDate = {this.props.selectedService.NextAvailableDate}

    idPassed       = '0'
    onItemSelected = {this.profileViewHandler}
    // OnItemClicked={this.onlyAlertHandler}
    // OnBookingClicked={this.alertHandler}
>
</ServiceListItem>
</View>

            <View style = {{width:'100%',height:"65%"}}>
            <Text style = {{fontWeight:'bold',marginLeft:5,marginRight:5,color:'black',fontSize:12,paddingLeft:15,paddingTop:15,paddingBottom:10}}>Available On {this.props.selectedService.Availabledates.split(",").join(" ")}({this.props.selectedService.Startandendtimes.split("&").join(" ")})</Text>

            <View style={{flexDirection:'row', alignItems     : 'center',width:160,
        backgroundColor: 'steelblue',justifyContent:'center',height:40,marginLeft:20,marginBottom:10,marginRight:20,marginTop:10}}
      >

    
         <Icon style = {{ color: '#ffffff'}} active name = 'calendar' />
                                              
          <DatePicker
            defaultDate = {new Date()}
            minimumDate = {new Date()}

            // maximumDate={new Date()}
            locale                  = {"en"}
            timeZoneOffsetInMinutes = {undefined}
            modalTransparent        = {false}
            animationType           = {"fade"}
            androidMode             = {"default"}
            placeHolderText         = {Moment(this.props.selectedService.NextAvailableDate.split("T")[0]).format('DD-MM-YYYY')}
            textStyle               = {{ color: "white" }}
            placeHolderTextStyle    = {{ color: "white" }}
            onDateChange            = {this.setDate}
            />
            {/* <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text> */}
        </View>
        <View style={{height:40, marginLeft:5,marginRight:5,  alignItems     : 'center',justifyContent:'center',
        marginBottom   : 5}}>
       
        {availabilityButton}
            {/* <Button   info  onPress = {this.checkAvailabilityHandler} style = {{height:40,justifyContent: 'center',backgroundColor:'steelblue',marginRight:5 }} >
            <Text style = {{ fontSize: 14,fontWeight:'bold' ,color:'#ffffff'}} >Check Availability</Text>
                            </Button>
             */}
        </View>
 
<Text style = {{ fontSize: 14,fontWeight:'bold',margin:5 ,color:'#000'}}>
Available Slots({this.props.selectedService.StartTime}-{this.props.selectedService.EndTime})
</Text>

<Container>
    <Content>{modalContent}
        
    {/* <SlotList style = {{margin:10}} slotList = {this.state.Slots} onItemSelected = {this.slotUpdation}/> */}

    </Content>
</Container>
            </View>
            <View style = {{height:'10%', justifyContent:'center',alignItems:'center',width:"100%"}}>{modalContent2}
            {/* <Button block onPress = {this.reserveSlotHandler} style = {{height:50,width:'100%',justifyContent: 'center',backgroundColor:'steelblue' }} >
            <Text style = {{ fontSize: 17,fontWeight:'bold' ,color:'#ffffff'}} >Book Now</Text>
                            </Button>
             */}
            </View>
            </View>
        );
    
}}
const styles = StyleSheet.create({
  TitleText:{
      fontSize  : 15,
      color     : 'black',
      fontWeight: 'bold',
      marginLeft: 10
      
  },
    ButtonContainer: {
        width          : "100%",
        flexDirection  : 'row',
        alignItems     : 'center',
        backgroundColor: 'steelblue',
        borderWidth    : .1,
        borderColor    : '#000',
        height         : 40,
        justifyContent : 'center',
        marginTop      : 10,
        marginBottom   : 5,
        marginLeft     : 10,          marginRight: 10,
        padding        : 10
    }
});
export default SlotPicking;