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
import {Actions, Router, Route} from 'react-native-router-flux';
import Button from 'react-native-button';
import Labels from '../Configs/Labels';
import Rest from '../Util/Rest.js'

import { Endpoints } from '../Configs/Url';
import ProfileBox from '../Components/UI/ProfileBox.js';


export default class ProfileView extends Component {

    loadTestData() {
        Rest.read(Endpoints.Test, {},
            (res) => ToastAndroid.show(res._bodyText, ToastAndroid.SHORT),
            (res) => console.error(res)
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <ProfileBox />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});