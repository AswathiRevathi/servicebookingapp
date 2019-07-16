import React, { Component } from 'react';
import {View,StyleSheet} from 'react-native';
import { Container, Header, Content, DatePicker, Text } from 'native-base';
export default class DatePicking extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    
  }
  
  render() {
    return (
      <View style={styles.ButtonContainer}
      onPress={this.alertHandler}>
        
      
          <DatePicker
            defaultDate={new Date()}
            minimumDate={new Date()}
            // maximumDate={new Date()}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Choose date"
            textStyle={{ color: "black" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={props.onDataChange}
            />
            {/* <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text> */}
        </View>
    
    );
  }
}
const styles = StyleSheet.create({
   ButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .1,
        borderColor: '#000',
        height: 45,
        borderRadius: 5,
        marginLeft: 5,
        marginTop: 10,
         marginBottom: 10,
        marginRight: 5,
        paddingLeft: 5
    }
});