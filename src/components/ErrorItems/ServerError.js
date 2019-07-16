import React, {
    Component
} from 'react';
import {
    StyleSheet,
    Text,Button,
    Image,
    View
} from 'react-native';
import { Card} from 'native-base';


export default class ServerError extends Component {
    render() {
        return (
            <Card  style={Styles.Container}>
<View >

 <Image source={require("../../Images/oops.png")} style={{ height: 250, width: 250, justifyContent: 'center' }}></Image>


</View>
</Card>
        );
    };
}

const Styles =StyleSheet.create({
    Container:{
        justifyContent: 'center',
        alignItems:'center',
        flex:1,
        margin:20,
       height:'50%',width:'100%'
    },
    imageStyle:{
        height:100,
        width:100
    }
});