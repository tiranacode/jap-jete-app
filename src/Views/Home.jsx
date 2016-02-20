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
import { Button, Card } from 'react-native-material-design';
import InstantActionBtn from '../Components/InstantActionBtn'

export default class HomeView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <InstantActionBtn/>
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