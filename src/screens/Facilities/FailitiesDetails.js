import React,{Component} from "react";
import {StyleSheet,Image,BackHandler,WebView} from "react-native";
import { Container,Card, Header, Content, Text, View ,Body} from 'native-base';
import { Actions } from "react-native-router-flux";

class FacilitiesDetails extends Component{
    


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
  
      componentWillUnmount() {
        // this.backHandler.remove();
        BackHandler.removeEventListener('hardwareBackPress', this.backAndroid);
      
      }
    
    
    
   
    componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress',this.backAndroid

        );
    }
    
    render(){
         const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
        return(
          
            <Card  style  = {styles.container}>
           
            <Card  style  = {styles.facilitiesImageContainer}>

            <Image source = {{ uri: this.props.selectedCategory.Categoryimage}} style = {styles.facilitiesImage}/>
            </Card>
            {/* <Card  style={{padding:5,width:'100%',height:40,backgroundColor:'white'}} >
            <Body>
            <Text style = {styles.titleText}>{this.props.selectedCategory.CategoryTitle}</Text>

            </Body>

            </Card> */}


<View style={{flex: 1, flexDirection:'column',height:200,width:'100%',marginTop:10}}>

  <WebView source={{ html: "<h3 style='line-height: 0px; text-align: center;'>"+this.props.selectedCategory.CategoryTitle+"</h3></Br></h1><p style='text-align: justify;'>"+this.props.selectedCategory.Description+"</p>"}} style={{backgroundColor:'white',marginTop:20}} />
</View> 

          
            </Card>
           
        );
    }
}
const styles = StyleSheet.create({
container:{
            alignItems : 'center',
            marginLeft : 10,
            marginRight: 10,
            marginTop  : 10,
            padding    : 10,
            flex:1,
            marginBottom:10
        },
         facilitiesImageContainer: 
    {
        width          : 160,
        height         : 160,
        marginTop      : 10,
        alignItems     : 'center',
        backgroundColor: 'powderblue',
        justifyContent : 'center',
        borderRadius   : 160/2
    },
    facilitiesImage: 
    {
        width       : 150,
        height      : 150,
        borderRadius: 150/2
    },
    titleText: 
    {width:'100%',
         fontSize : 15,
         fontWeight:'bold',
     
       justifyContent:'center',
         color    : 'steelblue'
    }
});
export default FacilitiesDetails;