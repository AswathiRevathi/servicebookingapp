import React,{Component} from "react";
import {View,Text,ImageBackground,StyleSheet,Image} from 'react-native';

class GalleryImageItem extends Component{
    render(){
        return(
            <ImageBackground source = { require('../../assets/Images/no_image.jpg')} style={{height: 120,width:120 ,margin:1}}>
            
             <Image
                style={styles.imageStyle}
                source={{ uri: this.props.galleryImage }}/>
                
                 </ImageBackground>               
        );
    }
}
const styles = StyleSheet.create({

   imageStyle: {height: 120 ,width:120,resizeMode:'stretch',alignSelf: 'stretch'}
});

export default GalleryImageItem;

