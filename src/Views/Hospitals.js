/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import CommonUtils from "../Util/Commons";
import EmptyContent from "../Components/UI/EmptyContent";


export default class DashboardView extends Component {
    render() {
        return (
            <View style={styles.container}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
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