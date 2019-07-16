import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import {Header,Left,Button,Icon,Right,Body,Title} from 'native-base';

export default class AppHeader extends Component {
  render() {
    return (
      <Header>
       <Left>
       <Button transparent
              onPress={()=>this.props.openDrawer()}
       >
         <Icon name='menu' />
       </Button>
       </Left>
       <Body>
         <Title>{this.props.title}</Title>
       </Body>
       <Right></Right>
     </Header>
    );
  }
}
