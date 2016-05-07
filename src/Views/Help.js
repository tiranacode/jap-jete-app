/**
 * Application Help View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import Labels from "../Configs/Labels";
import InstantActionBtn from "../Components/UI/InstantActionBtn";
import Share from "react-native-share";
import {Endpoints} from "../Configs/Url";
import ViewMetaBar from "../Components/UI/ViewMetaBar";

export default class HelpView extends Component {

    constructor(props) {
        super(props);
    }

    onShare() {
        Share.open({
            share_text: Labels.Messages.SHARE,
            share_URL: Endpoints.SHARE,
            title: Labels.Messages.SHARE_TITLE
        }, (e) => {
            console.log(e);
        });
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.HELP} icon={AppStyle.Icons.HELP}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewMetaBar description={Labels.Footers.HELP}
                             icon={AppStyle.Icons.footer.HELP}/>
                {this._renderEmptyView()}
                <InstantActionBtn onPress={this.onShare} icon={AppStyle.Icons.SHARE}/>
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    empty: {
        flex: 1,
        marginTop: 100
    }
});