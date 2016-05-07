/**
 * Main View of the application. Shows a generic screen.
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";

export default class HelpView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Home
                </Text>
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