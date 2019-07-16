import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const drawer1 = () => {
  // const goToHome = () => {
  //    Actions.drawer1()
  // }
  return (
     <TouchableOpacity style = {{ margin: 128 }} onPress = {goToHome}>
        <Text>This is ABOUT</Text>
     </TouchableOpacity>
  )
}
export default drawer1;