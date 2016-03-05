'use strict';
import React, { Component, StyleSheet, View, Text, Dimensions, ToastAndroid} from 'react-native';
import {AppStyle} from '../Styles/CommonStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Labels from '../Configs/Labels';
import {Actions, Router, Route} from 'react-native-router-flux';

export default class SplashScreen extends Component {
    render() {
        return (
            <View>
                {/* TODO - Add ViewPager */}
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

