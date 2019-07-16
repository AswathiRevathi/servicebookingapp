import React,{Component} from "react";
import {Text,View,Alert,Image,StyleSheet,ActivityIndicator,NetInfo,BackHandler} from "react-native";
import FacilitiesCategoryList from '../../components/Lists/GalleryList';
import { Actions } from "react-native-router-flux";
class FacilitiesCategoryListing extends Component{
   state = {
    val               : "FacilitiesCategory",
    facilityUrl       : 'http://api.kimsth.a2hosted.com/api/FacilitiesList',
    FacilitiesCategory: '',                                    isLoading: true,
  };
 itemSelectedHandler = key => {
    
     
        const selCategory = this.state.FacilitiesCategory.find(category => {
            return category.Id === key;
        });
       
Actions.FacilitiesDetailsScreen({ selectedCategory:selCategory,nav:null});}


backAndroid= ()=> {

    if(this.props.nav==1){
        Actions.reset('Home');
        return true     
    }
    else{
     
      return true    
     }

    
  
    // Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }

  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }


        // this.props.navigator.push({
        //     screen: "service_app_facilities_details",
        //     tittle: "Facilities",
        //     passProps:{
        //         selectedCategory:selCategory
        //     }
        // });
    


    getFacilityList=()=>{
        return  fetch(this.state.facilityUrl, {
            method : 'POST',
            headers: {
                Accept        : 'application/json',
                'Content-Type': 'application/json',
            },
          
        }).then((response) => response.json())
        .then((responseJson) => {
            // return responseJson.servicesCategory;


            
        this.setState({
            isLoading         : false,
            FacilitiesCategory: responseJson.FacilitiesCategory,
          }, function(){

          });
        })
        .catch((error) => {
            console.error(error);
        });

    }

    componentDidMount() {
      
        BackHandler.addEventListener('hardwareBackPress',this.backAndroid

        );
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if (connectionInfo.type === 'none') {
                alert("No internet connection")
            } else {
                // online
                // do something
                this.getFacilityList();

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
            this.getFacilityList
        );



      }

    render()
    {


        if(this.state.isLoading){
            return(
              <View style = {{flex: 1, padding: 20}}>
                <ActivityIndicator  />
              </View>
            )
          }
          else {
            if (this.state.FacilitiesCategory.length != 0){
              return (  
                <View  style = {styles.container}>
                <Image style = {styles.ImageStyles} source = {require('../../assets/Images/facilities_top_img.jpg')}>
                   </Image>
               <FacilitiesCategoryList categories = {this.state.FacilitiesCategory} onItemSelected = {this.itemSelectedHandler}/>
              
               </View>      )}
                 else {
                   return (
                     <NoDataFound  OnRetry={this.getFacilityList}/> )
            }
      
          }

       
    }
}
const styles = StyleSheet.create({
container:{
alignItems: "center"
},
    ImageStyles: {
        height      : 150,
        width       : '100%',
        marginBottom: 10,
        resizeMode  : 'contain'
        
    }

});
export default FacilitiesCategoryListing;