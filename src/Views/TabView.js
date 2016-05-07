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
import DashboardView from "./Hospitals";
import HistoryView from "./History";
import HelpView from "./Help";
import Header from "../Components/UI/Header";

export default class TabView extends Component {

    _goToSettings() {
        //TODO - Implement go to settings
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title={Labels.APP_NAME} navigator={this.props.navigator}/>
                <ScrollableTabView tabBarUnderlineColor={AppStyle.Colors.FG} tabBarInactiveTextColor="white" tabBarBackgroundColor="#333" tabBarActiveTextColor={AppStyle.Colors.FG} style={styles.tabView}>
                    <HomeView navigator={this.props.navigator} tabLabel={Labels.Tabs.HOME}/>
                    <HistoryView navigator={this.props.navigator} tabLabel={Labels.Tabs.HISTORY}/>
                    <DashboardView navigator={this.props.navigator} tabLabel={Labels.Tabs.HOSPITALS}/>
                    <ProfileView navigator={this.props.navigator} tabLabel={Labels.Tabs.PROFILE}/>
                    <HelpView navigator={this.props.navigator} tabLabel={Labels.Tabs.HELP}/>
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
    }
});
