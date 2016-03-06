'use strict';
import React, { Component, StyleSheet, View, Text, Dimensions, ToastAndroid} from 'react-native';
import {AppStyle} from '../Styles/CommonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Labels from '../Configs/Labels';
import {Actions, Router, Route} from 'react-native-router-flux';
import Swiper from 'react-native-swiper2'

import MK, {
    MKButton,
    MKColor,
    MKTextField
} from 'react-native-material-kit';

let StartBtn = MKButton.coloredButton()
    .withText(Labels.Ui.LOGOUT)
    .withBackgroundColor(AppStyle.Colors.FG)
    .build();

export default class SplashScreen extends Component {
    render() {

        let dot = (
            <View
                style={{backgroundColor:'rgba(255,255,255,0.6)', width: 12, height: 12, borderRadius: 6, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 20,}}/>
        );

        let activeDot = (
            <View
                style={{backgroundColor:'rgba(255, 255, 255, 1)', width: 12, height: 12, borderRadius: 6, marginLeft: 5, marginRight: 5, marginTop: 3, marginBottom: 20,}}/>
        );

        return (
            <Swiper style={styles.wrapper} showsButtons={false}
                    paginationStyle={styles.paginationStyle}
                    dot={dot} activeDot={activeDot}
                    loop={false}
                    index={0}
                    showsPagination={false}>
                <View style={styles.slide1}>
                    <Text style={styles.text}>Screen 1</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>Screen 2</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>Screen 3</Text>
                    <StartBtn onPress={() => this.props.navigator.push({id: 'Login'})}
                              backgroundColor={AppStyle.Colors.FG}/>
                </View>
            </Swiper>
        )
    }
}

var styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#777',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    paginationStyle: {
        marginBottom: 20
    }
});

