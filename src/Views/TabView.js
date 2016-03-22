/**
 * TabView, handles tab navigation
 */

'use strict';
import React, {Component, StyleSheet, ScrollView, View, Text, TouchableOpacity} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {AppStyle} from "../Styles/CommonStyles";
import Labels from "../Configs/Labels";
import HomeView from "./Home";
import ProfileView from "./Profile";
import DashboardView from "./Dashboard";
import HistoryView from "./History";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class TabView extends Component {

    _goToSettings() {
        //TODO - Implement go to settings
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <Text style={styles.title}>{Labels.APP_NAME}</Text>
                    <TouchableOpacity onPress={this._goToSettings} style={styles.settingsBtn}>
                        <Icon name="gear" size={25} color="#fff" style={styles.settingsIcon}/>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView tabBarUnderlineColor={AppStyle.Colors.FG} tabBarActiveTextColor={AppStyle.Colors.FG} style={styles.tabView}>
                    <HomeView navigator={this.props.navigator} tabLabel={Labels.Tabs.HOME}/>
                    <HistoryView navigator={this.props.navigator} tabLabel={Labels.Tabs.HISTORY}/>
                    <ProfileView navigator={this.props.navigator} tabLabel={Labels.Tabs.PROFILE}/>
                    <DashboardView navigator={this.props.navigator} tabLabel={Labels.Tabs.DASHBOARD}/>
                </ScrollableTabView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    tabView: {
        alignItems: 'stretch',
    },
    title: {
        color: 'white',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
    },
    settingsBtn: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    settingsIcon: {

    },
    topBar: {
        height: 50,
        backgroundColor: AppStyle.Colors.FG
    }
});
