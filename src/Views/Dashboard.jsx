/**
 * User Profile
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';
import Labels from '../Configs/Labels';

export default class DashboardView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Dashboard</Text>
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