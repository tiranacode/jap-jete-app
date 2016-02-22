/**
 * Main View of the application which provides navigation
 */

'use strict';
import React, {
    Component,
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import InstantActionBtn from '../Components/UI/InstantActionBtn';
import DialogAndroid from 'react-native-dialogs';

export default class HomeView extends Component {
    render() {
        return (
            <View style={styles.container} onLayout={this.showDialog}>
                <Text>Home</Text>
                <InstantActionBtn />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});