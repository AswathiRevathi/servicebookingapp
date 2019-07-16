import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { Image,View } from 'react-native';

export default class MenuItem extends Component {

  click=()=>{
    alert('clicked');
  }
    render() {
      return (
        
       
          
       
        <Content>
            <Card >
              <CardItem button style = {{backgroundColor:'transparent'}} onPress = {this.props.click}>
              <Body     style        = {{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
              <Image    source       = {{uri: this.props.uris}} style            = {{height: 60, width: 60}}
                />
                <View style = {{width:'100%',alignItems:'center',justifyContent:'center',margin:5}}>
                <Text style = {{fontSize:12,fontWeight:'bold'}}>{this.props.textValue}</Text>

                </View>
                </Body>
              </CardItem>
            </Card>
        </Content>
      
      );
    }
  }
  

