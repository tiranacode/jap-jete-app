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

export default class ProfileView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Profile View</Text>
                <Button onPress={() => Actions.home()}> Go to Home </Button>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    }
});