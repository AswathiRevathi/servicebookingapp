import React,{ Component} from "react";
import {Text, View ,StyleSheet,Image,TouchableOpacity,ImageBackground} from "react-native";
import { Card,Thumbnail,Right} from 'native-base';
class NotificationListItem extends Component{
    constructor(props){
            super(props)
            this.state = {
               date:''
                 }
      }
       componentDidMount(){
     var dayVal = String(this.props.Date).split('T');
        var days = String(dayVal[0]).split('-');
        var newDate=days[2]+"-"+days[1]+'-'+days[0]
        console.log("DATEVAL"+newDate);
                                this.setState({
                                   requiredDate:newDate
                                }, function(){
                                   
                                });

    }
    render(){
        return(
                <Card style={{padding:5}}>
                    <View style={styles.itemContainer}>
                    <ImageBackground source = { require('../../assets/Images/no_image.jpg')} style={styles.categoryImage}>
                        
                        
                    <Image 
                        source={{uri:this.props.categoryImage}}
                                style={styles.categoryImage}
                                />
                                </ImageBackground>
                                <View>
                                <Text style={styles.TitleText}>{this.props.categoryName}</Text>
                                <Text style={styles.DecriptionText}>{this.props.Description}</Text>
                                    <Text style={styles.DateText}>Posted Date: {this.state.requiredDate}</Text>
                                </View>
         
           
          </View>
        </Card>
        )
        }
    }


const styles = StyleSheet.create({
  itemContainer: {
    margin: 10,
    flexDirection:'row',
    alignItems:'center',
    paddingRight:5
  },
  categoryImage:{
      width:80,
      height:80,
      marginRight:10
  },
   nextIcon:{
      width:20,
      height:20,
      
  },
  TitleText:{
      fontSize:17,
      color:'black',
      fontWeight:'bold'
      
  },
  DecriptionText:{
      fontSize:12,
    padding:5,
      color:'black',
      
  },
   DateText:{
      fontSize:12,
    padding:5,
      color:'black',
      fontWeight:'bold'
      
  }
});
export default NotificationListItem;