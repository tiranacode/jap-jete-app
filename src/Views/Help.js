/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import Labels from "../Configs/Labels";

export default class HelpView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <EmptyContent label={Labels.Messages.HELP} icon={AppStyle.Icons.HELP}/>
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