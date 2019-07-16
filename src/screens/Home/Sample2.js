import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Body } from 'native-base';
import { Image,View ,Text} from 'react-native';
import {
    Actions
  } from "react-native-router-flux";

export default class Sample2 extends Component {

  click=()=>{
    alert('clicked');
  }
    render() {
        return(
<Text>
    {this.props.hi};
</Text>

        );
    }}