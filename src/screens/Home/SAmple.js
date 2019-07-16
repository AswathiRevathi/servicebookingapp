import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body, Text } from 'native-base';
import { Image,View ,Button} from 'react-native';
import {
    Actions
  } from "react-native-router-flux";

export default class SAmple extends Component {

  click=()=>{
    Actions.Service({hi:'aswathi'})
  }
    render() {

        return(
<Button title="jjj" onPress={this.click}></Button>

        );
    }}