import React,{Component} from "react";
import {Text,View,StyleSheet,BackHandler,AsyncStorage,Alert} from "react-native";
import ImageItem  from './ImageItem';
import MenuItem from './MenuItem';
import {Actions} from 'react-native-router-flux';
import { Button ,Body,Container,Content} from 'native-base';


import { Dialog } from 'react-native-simple-dialogs';

class Home extends Component{
       
    constructor(props){
        super(props);
        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);

        this.state ={ isLoading: true,show:'false',backHandvalue:undefined,
          IdToBePassed: "0", exit: false, dialogVisible: false, asyValue: 'true',
          homeData    : {
            "AppConfig": {
              "serviceCategory": [
                {
                  "id"   : "1",
                  "title": "Department",
                  "icon" : "https://cdn1.iconfinder.com/data/icons/got-idea-vol-2/128/branches-512.png"
                }
              ],
              "services": [
                {
                  "id"   : "1",
                  "title": "Doctors",
                  "icon" : "https://cdn4.iconfinder.com/data/icons/X-Mac/medical/png/400/surgeon.png"
                }
              ],
              "booking": [
                {
                  "id"   : "1",
                  "title": "Book Now",
                  "icon" : "https://images.vexels.com/media/users/3/136133/isolated/preview/1d35b34d0b6d38b8a58b43a78eace330-smartphone-tocando-m-o-by-vexels.png"
                }
              ],
              "Facilities": [
                {
                  "id"   : "1",
                  "title": "Facilities",
                  "icon" : "https://image.flaticon.com/sprites/new_packs/965177-health-care.png"
                }
              ],
              "Gallery": [
                {
                  "id"   : "1",
                  "title": "Gallery",
                  "icon" : "http://icongal.com/gallery/image/11429/blue_images_folder.png"
                }
              ],
              "More": [
                {
                  "id"   : "1",
                  "title": "More",
                  "icon" : "http://icons.iconarchive.com/icons/martz90/circle/128/app-draw-icon.png"
                }
              ]
            }
          }
    
    
    }
      }
    
      exitFromApp=()=>{
        this.setState({dialogVisible: false})  ; 
    
        BackHandler.exitApp();
    
    }
     stayInApp=()=>{
        this.setState({dialogVisible: false})  ; 
        
    }
      backAndroid=()=> {

  


      
          return true;
 
      
        }


        componentDidMount() {


  BackHandler.addEventListener('hardwareBackPress',this.handleBackButtonClick

  
  
  );


         
        }
      componentWillMount(){
        console.log("here componentWillMount ","--aswathi");
      
       
   

      }
      
 

   
        componentWillUnmount() {
          BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);

        }    
      handleBackButtonClick=()=> {
        // this.getKey.bind(this)
        Alert.alert(
          'Exit App',
          'Do u really want to exit from App?',
          [
           
            {text: 'Cancel', onPress: () => this.stayInApp(), style: 'cancel'},
            {text: 'Confirm', onPress: () =>this.exitFromApp()},
          ],
          { cancelable: false }
        )       
 
        return true;
      }
                
      

      deptNavigationHandler = () =>{
     

      Actions.ServiceCategory({nav:1});
  }
galleryNavigationHandler = () =>{
Actions.Gallery({nav:1});

      
  }
  bookingNavigationHandler = () =>{
    Actions.Service({
      id: "0", nav: 1

    }
      
      );

}
  facilitiesNavigationHandler = () =>{
    Actions.Facility({nav:1});
  }
  companyProfileNavigationHandler = () =>{

    Actions.CompanyProfileScreen({nav:1});

     
  }


    render()
    {
      console.log("here render ","--aswathi");
      

      let homedataa = this.state.homeData.AppConfig.serviceCategory[0].title;
    console.log("result is"+homedataa);
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
            <View style = {styles.mainlayout} >
            <View style = {styles.imgItemStyle}>

            <ImageItem/></View>
            <View     style = {styles.cardLay}>
            <View     style = {styles.menuItemStyle}>
            <MenuItem click = {this.deptNavigationHandler}  uris                     = {this.state.homeData.AppConfig.serviceCategory[0].icon} textValue = {this.state.homeData.AppConfig.serviceCategory[0].title}/>
            <MenuItem uris  = {this.state.homeData.AppConfig.services[0].icon} click = {this.bookingNavigationHandler} textValue                         = {this.state.homeData.AppConfig.services[0].title}/>

            <MenuItem click = {this.bookingNavigationHandler} uris = {this.state.homeData.AppConfig.booking[0].icon}  textValue = {this.state.homeData.AppConfig.booking[0].title}/>


            </View>
            <View     style = {styles.menuItemStyle2}>
            <MenuItem click = {this.facilitiesNavigationHandler} uris = {this.state.homeData.AppConfig.Facilities[0].icon} textValue = {this.state.homeData.AppConfig.Facilities[0].title}/>
            <MenuItem click = {this.galleryNavigationHandler} uris    = {this.state.homeData.AppConfig.Gallery[0].icon}  textValue   = {this.state.homeData.AppConfig.Gallery[0].title}/>

            <MenuItem click = {this.companyProfileNavigationHandler} uris = {this.state.homeData.AppConfig.More[0].icon} textValue = {this.state.homeData.AppConfig.More[0].title}/>


            </View>
            </View>
            
            {/* <Button title="CategoryList" onPress={this.navigationHandler}/> */}

            </View>
        );
    }
}
export default Home;

const styles=StyleSheet.create({

    mainlayout:{
        flex           : 1,
        backgroundColor: 'white',
        flexDirection  : 'column'
    },
    imgItemStyle:{
        height: '50%'
    },
    cardLay:{
        flexDirection: 'column',
        height       : '50%',

    },
    menuItemStyle:{
        flexDirection: 'row',
        flex         : 1,
        height       : '50%',
        alignItems   : 'flex-end'
    
    },
    menuItemStyle2:{
        flexDirection: 'row',
        flex         : 1,
        height       : '50%',
        alignItems   : 'flex-start' }
});