import { View, Text, StyleSheet,Image } from 'react-native';
import React,{Component} from 'react';
import { Row, Button, Segment, Tab, Tabs, Container,Icon,Right , Header,Left, Content,Thumbnail, Card, CardItem, Body } from 'native-base';
 export default class DrawerHeader extends Component{
    render() {
        return(

            <View>

                <Image
    style={{ width: '100%', height: 120 }}
    source={ require('../../assets/Images/facilities_top_img.jpg') }>
</Image>
            </View>
        );
    }
 }

