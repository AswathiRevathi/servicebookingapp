import React,{ Component} from "react";
import {Text, View ,StyleSheet,Image,TouchableOpacity,ImageBackground} from "react-native";
import { Card,Thumbnail,Right} from 'native-base';

const CategoryListItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <Card>
        <View style={styles.itemContainer}>
         <ImageBackground source = { require('../../assets/Images/no_image.jpg')} style={styles.categoryImage}>
            
             
          <Image 
             source={{uri:props.categoryImage}}
                     style={styles.categoryImage}
                    />
                    </ImageBackground>
           <Text style={styles.TitleText}>{props.categoryName}</Text>
            <Right>
                <Image style={styles.nextIcon} source = { require('../../assets/Images/next_arrow.png') }/>
            </Right>
        </View>
    </Card>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    flexDirection:'row',
    alignItems:'center'
  },
  categoryImage:{
      width:40,
      height:40,
      marginRight:10
  },
   nextIcon:{
      width:20,
      height:20,
      
  },
  TitleText:{
      fontSize:14,
      color:'black'
      
  }
});
export default CategoryListItem;