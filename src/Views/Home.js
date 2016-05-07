/**
 * Main View of the application. Shows a generic screen.
 */

'use strict';
import React, {Component, StyleSheet, View, Text, ScrollView, Dimensions} from "react-native";
import {MKColor} from "react-native-material-kit";
import InstantActionBtn from "../Components/UI/InstantActionBtn";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import Donation from "../Components/UI/Donation";
import PTRView from "react-native-pull-to-refresh";

let data = [{
    hospital: "Qendra Spitalore Nene Tereza",
    date: new Date()
}, {
    hospital: "Spitali Ushtarak",
    date: new Date()
}];

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

    refresh() {
        return new Promise((resolve) => {
            resolve();
            //TODO - Handle Refresh
        });
    }

    render() {
        if (!data.length) {
            return (
                <View style={styles.container}>
                    <EmptyContent label={Labels.Messages.NO_DATA} icon={AppStyle.Icons.EMPTY_DATA}/>
                    <InstantActionBtn icon={AppStyle.Icons.HEART}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <PTRView onRefresh={this.refresh} progressBackgroundSWColor={AppStyle.Colors.FG}>
                    <ScrollView>
                        <Donation data={data[0]}/>
                        <Donation data={data[1]}/>
                        <Donation data={data[1]}/>
                        <Donation data={data[1]}/>
                        <Donation data={data[1]}/>
                        <Donation data={data[1]}/>
                    </ScrollView>
                </PTRView>
                <InstantActionBtn icon={AppStyle.Icons.HEART}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        height: Dimensions.get('window').height,
    }
});