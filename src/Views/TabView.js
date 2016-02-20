import React, {
    Component,
    StyleSheet,
    View,
    Text,
    ScrollView
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import {AppStyle} from '../Styles/CommonStyles';
import Labels from '../Configs/Labels';
import HomeView from './Home';
import ProfileView from './Profile';
import DashboardView from './Dashboard';

export default class TabView extends Component {
    render() {
        return (
            <ScrollableTabView tabBarUnderlineColor={AppStyle.Colors.FG} tabBarActiveTextColor={AppStyle.Colors.FG} style={styles.tabView}>
                <HomeView tabLabel={Labels.Tabs.HOME}/>
                <DashboardView tabLabel={Labels.Tabs.DASHBOARD}/>
                <ProfileView tabLabel={Labels.Tabs.PROFILE}/>
            </ScrollableTabView>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabView: {

    }
});