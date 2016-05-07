/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import ViewMetaBar from "../Components/UI/ViewMetaBar";

export default class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this._renderDataContent = this._renderDataContent.bind(this);
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    _renderRowView() {
        return (
            <View style={styles.container}>

            </View>
        )
    }

    _renderDataContent() {
        if (!this.state.data.length) {
            return this._renderEmptyView();
        } else {
            return this._renderRowView();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ViewMetaBar description={Labels.Footers.HOSPITALS}
                             icon={AppStyle.Icons.footer.HOSPITALS}/>
                {this._renderDataContent()}
            </View>
        )
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty: {
        alignItems: 'flex-start',
        flex: 1,
        marginTop: 100
    }
});