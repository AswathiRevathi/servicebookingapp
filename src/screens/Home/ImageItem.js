import React, { Component } from 'react';
import { Image,StyleSheet, View } from 'react-native';

export default class ImageItem extends Component {

    render() {
        return (

            <View  style = {Styles.MainView}>
            <Image style = {Styles.ImageStyles} source = {require('../../Images/homeimage.jpg')}
                >
                </Image>
            </View>
        );
    };

}

const Styles = StyleSheet.create({

    MainView: {
        flex: 1
    },
    ImageStyles: {
        height: '100%',
        width : '100%'
    }

});