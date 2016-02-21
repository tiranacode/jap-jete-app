/**
 * User Profile
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ToastAndroid
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import Labels from '../Configs/Labels';
import Rest from '../Util/Rest.js'

import { API_ENDPOINT } from '../Configs/Url';

export default class ProfileView extends Component {

    loadTestData() {
        Rest.read(API_ENDPOINT.Test, {},
            function (res) {
                ToastAndroid.show(res._bodyText, ToastAndroid.SHORT);
            }, function (res) {
                ToastAndroid.show(res.data, ToastAndroid.SHORT);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text onLayout={this.loadTestData}>Profile</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});