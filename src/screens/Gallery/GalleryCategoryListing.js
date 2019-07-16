import React,{Component} from "react";
import {Text,View,Alert,ActivityIndicator,NetInfo,BackHandler} from "react-native";
import GalleryCategoryList from '../../components/Lists/GalleryList';
import { Actions } from "react-native-router-flux";
class GalleryCategoryListing extends Component{
    
   state = {
    val                  : "GalleryCategory",
    galleryCategories    : '',
    isLoading            : true,
    getGalleryCategoryUrl: 'http://api.kimsth.a2hosted.com/api/GalleryCategory'

  };

  backAndroid =()=> {

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

  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
  }



 itemSelectedHandler = key => {
    
     
        const selCategory = this.state.galleryCategories.find(category => {
            return category.Id === key;
        });
        // this.props.navigator.push({
        //     screen: "service_app_gallery_image",
        //     title: selCategory.CategoryTitle,
        //     passProps:{
        //         selectedCategory:selCategory
        //     }
        // });

Actions.GalleryImageListingScreen({selectedCategory:selCategory,nav:null});


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
                this.getGalleryCategoryList();

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
            this.getGalleryCategoryList
        );



      }


      getGalleryCategoryList=()=>{

       return  fetch(this.state.getGalleryCategoryUrl, {
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
            galleryCategories: responseJson.GalleryCategory,
          }, function(){

          });
        })
        .catch((error) => { 
            console.error(error);
        });

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
            if (this.state.galleryCategories.length != 0){
              return (    <View>
                <GalleryCategoryList categories = {this.state.galleryCategories} onItemSelected = {this.itemSelectedHandler}/>
               
                </View>             )}
                 else {
                   return (
                     <NoDataFound  OnRetry={this.getGalleryCategoryList}/> )
            }
      
          }






    
    }
}
export default GalleryCategoryListing;