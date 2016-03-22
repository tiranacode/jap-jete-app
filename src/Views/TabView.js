/**
 * TabView, handles tab navigation
 */

'use strict';
import React, {Component, StyleSheet, ScrollView} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {AppStyle} from "../Styles/CommonStyles";
import Labels from "../Configs/Labels";
import HomeView from "./Home";
import ProfileView from "./Profile";
import DashboardView from "./Dashboard";
import HistoryView from "./History";

export default class TabView extends Component {
    render() {
        return (
            <ScrollableTabView tabBarUnderlineColor={AppStyle.Colors.FG} tabBarActiveTextColor={AppStyle.Colors.FG} style={styles.tabView}>
                <HomeView navigator={this.props.navigator} tabLabel={Labels.Tabs.HOME}/>
                <HistoryView navigator={this.props.navigator} tabLabel={Labels.Tabs.HISTORY}/>
                <ProfileView navigator={this.props.navigator} tabLabel={Labels.Tabs.PROFILE}/>
                <DashboardView navigator={this.props.navigator} tabLabel={Labels.Tabs.DASHBOARD}/>
            </ScrollableTabView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabView: {}
});
