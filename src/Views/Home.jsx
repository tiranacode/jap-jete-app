'use strict';

import React, {
    Component,
    StyleSheet,
    View,
    Text
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'react-native-button';

export default class HomeView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Home View</Text>
                <Button onPress={() => Actions.login()}> Go to Login </Button>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    }
});