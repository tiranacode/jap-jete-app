/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";

export default class DashboardView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Spitalet</Text>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});