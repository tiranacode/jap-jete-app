/**
 * TabView, handles tab navigation
 */

'use strict';
import React, {Component, StyleSheet, ScrollView, View, Text, TouchableOpacity} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import {AppStyle} from "../Styles/CommonStyles";
import Labels from "../Configs/Labels";
import DonationView from "./Donations";
import ProfileView from "./Profile";
import DashboardView from "./Hospitals";
import HistoryView from "./History";
import HelpView from "./Help";
import Header from "../Components/UI/Header";
import IO from "../Util/IO";
import Setting from "../Domain/Setting";
import MessageDialog from "../Components/UI/MessageDialog";

export default class TabView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            darkHeader: true
        };
    }

    componentDidMount() {
        IO.getSettings().then((settings) => {
            if (settings) {
                var userSettings = new Setting(settings);
                MessageDialog.show("Settings", JSON.stringify(userSettings));
                this.setState({
                    darkHeader: userSettings.getSetting(Setting.KEYS.DARK_HEADER)
                })
            }
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header title={Labels.APP_NAME} navigator={this.props.navigator}/>
                <ScrollableTabView tabBarUnderlineColor={AppStyle.Colors.FG}
                                   tabBarInactiveTextColor={this.state.darkHeader ? "white" : "black"}
                                   tabBarActiveTextColor={AppStyle.Colors.FG}
                                   tabBarBackgroundColor={this.state.darkHeader ? "#333" : "white"}
                                   style={styles.tabView}>
                    {/*<HomeView navigator={this.props.navigator} tabLabel={Labels.Tabs.HOM}/>*/}
                    <DonationView navigator={this.props.navigator} tabLabel={Labels.Tabs.DONATIONS}/>
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
