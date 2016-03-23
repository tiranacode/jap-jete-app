/**
 * Main View of the application. Shows a generic screen.
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import {MKColor} from "react-native-material-kit";
import InstantActionBtn from "../Components/UI/InstantActionBtn";
import GiftedListView from 'react-native-gifted-listview';
import Labels from '../Configs/Labels';
import {AppStyle} from '../Styles/CommonStyles';
import CommonUtils from '../Util/Commons';
import EmptyContent from '../Components/UI/EmptyContent';

let data = [];

export default class HomeView extends Component {
    constructor(props) {
        super(props);
        this.props = {
            isLoggedIn: true
        }
    }

    goToLogin(navigator) {
        navigator.push({
            id: 'Login'
        });
    }

    render() {
        if (!data.length) {
            return (
                <View style={styles.container}>
                    <EmptyContent label={Labels.Messages.NO_DATA} icon={AppStyle.Icons.EMPTY_DATA}/>
                    <InstantActionBtn/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <InstantActionBtn/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    }
});