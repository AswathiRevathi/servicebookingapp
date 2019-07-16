import React,{Component} from "react";
import {View,Text,StyleSheet,Image,ActivityIndicator,NetInfo,BackHandler} from 'react-native';
import GalleryImageItem from "../../components/ListItem/GalleryImageItem";
import GridView from 'react-native-gridview';
import { Actions } from "react-native-router-flux";

import  NoDataFound from '../../components/ErrorItems/NoDataFound';
const itemsPerRow = 3;
class GalleryImageListing extends Component{
     state = {
         GalleryImage   : [],
         GalleryCategory: '',
         isLoading      : true,

         getGalleryImageUrl: 'http://api.kimsth.a2hosted.com/api/GalleryImages?Id=',
         galleryImages     : ''
        
  };
  backAndroid= ()=> {

    if(this.props.nav==1){
        Actions.reset('Home');
        return true 
    }
    else{
      Actions.pop();
      return true;
    }
  
    // Actions.pop() // Return to previous screen
    return true // Needed so BackHandler knows that you are overriding the default action and that it should not close the app
  }


  

  componentWillUnmount() {
    // this.backHandler.remove();
    BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
  
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
            this.getGalleryImages();

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
        this.getGalleryImages
    );



  }


  getGalleryImages=()=>{
    return  fetch(this.state.getGalleryImageUrl+ `${this.props.selectedCategory.Id}`, {
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
        galleryImages: responseJson.GalleryCategory,
      }, function(){

      });
    })
    .catch((error) => {
        console.error(error);
    });
  }


    render(){

        if (this.state.isLoading) {
            return ( <
              View style = {
                {
                  flex   : 1,
                  padding: 20
                }
              } >
              <
              ActivityIndicator / >
              <
              /View>
            )
          }
          else {if(this.state.galleryImages!= 0){
            
       let dataContent = null;

       if (this.props.selectedCategory.Id==='1') {
            dataContent = (

                <GridView
              style = {{margin:2}}
              data  = {this.state.galleryImages}
                // dataSource={props.randomizeRows ? dataSource : null}
                itemsPerRow = {itemsPerRow}
                renderItem  = {(item, sectionID, rowID, itemIndex, itemID) => {
                    return (
                    <GalleryImageItem
                    galleryImage = {item.Image}
                    galleryTitle = {item.Title}
                    />
                    );
                }}
                />
            );
        }else if(this.props.selectedCategory.Id==='2'){
             dataContent = (

                <GridView
              style = {{margin:2}}
              data  = {this.state.galleryImages}
                // dataSource={props.randomizeRows ? dataSource : null}
                itemsPerRow = {itemsPerRow}
                renderItem  = {(item, sectionID, rowID, itemIndex, itemID) => {
                    return (
                    <GalleryImageItem
                    galleryImage = {item.Image}
                    galleryTitle = {item.Title}
                    />
                    );
                }}
                />
            );
        }else{
             dataContent = (

                <GridView
              style = {{margin:2}}
              data  = {this.state.galleryImages}
                // dataSource={props.randomizeRows ? dataSource : null}
                itemsPerRow = {itemsPerRow}
                renderItem  = {(item, sectionID, rowID, itemIndex, itemID) => {
                    return (
                    <GalleryImageItem
                    galleryImage = {item.Image}
                    galleryTitle = {item.Title}
                    />
                    );
                }}
                />
            );
        }

        return(
        <View style = {styles.container}>
        <Text style = {styles.textStyle}>{this.props.selectedCategory.CategoryTitle}</Text>
             {dataContent}
                </View>
        );  
            
            }
             else {
                   return (
                     <NoDataFound  OnRetry={this.getGalleryImages}/> )
            }
      
          }

    }
}
export default GalleryImageListing;

const styles = StyleSheet.create({
    container:{
    backgroundColor: '#ffffff',
    height         : "100%"
    },
  listContainer: {
    width: "100%",
    
  },
  textStyle:{
      color       : "#000000",
      fontSize    : 14,
      marginTop   : 5,
      marginLeft  : 5,
      marginBottom: 5,
      fontWeight  : 'bold'
  }
});


