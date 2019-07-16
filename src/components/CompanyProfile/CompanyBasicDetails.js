import React,{Component} from 'react';
import {  Card, CardItem,  Text,  Left, Body, Right,View } from 'native-base';
import {StyleSheet,Image} from "react-native";
class BasicDetails extends Component{
    render(){
        return(
              <Card>
            <CardItem>
            {/* {{uri:this.props.logo}} */}



             


                <View  style  = {{height:100,width:"100%",justifyContent:'center',alignItems:'center'}}>
                
                <Image source={{uri:this.props.logo}} style={{width:320,height:100,resizeMode:'contain'}}/>
                </View>

            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:this.props.image}} style={styles.topImage}/>
            </CardItem>
            <CardItem>
                <Text style={{fontSize:13}}>{this.props.description}</Text>
            </CardItem>
          </Card>
        );
    }
}
const styles=StyleSheet.create({

    topImage:{
        height: 120, 
    width: "100%", 
    resizeMode:'contain'
    },
    imgItemStyle:{
        height: 50, 
        width: "100%",
        flex: 1
    }
});
export default BasicDetails;