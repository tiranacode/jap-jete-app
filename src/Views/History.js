/**
 * History of donations for the user
 */

'use strict';
import React, {Component, StyleSheet, View, Text, ListView, TouchableHighlight, TouchableOpacity} from "react-native";
import GiftedListView from "react-native-gifted-listview";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import DonationListItem from "../Components/UI/DonationListItem";

//TODO - Test Data, Remove
let history = [
    {
        hospital: "Spitali Nene Tereza",
        date: new Date(),
        amount: 20
    },
    {
        hospital: "Spitali Amerikan",
        date: new Date(),
        amount: 14
    }
];

export default class HistoryView extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {

    }

    _retrieveDonationHistory() {

    }

    /**
     * Testing Fetch
     * @param page
     * @param callback
     * @param options
     * @private
     */
    _onFetch(page = 1, callback) {
        var rows = history;
        if (page === 3) {
            callback(rows, {
                allLoaded: true
            });
        } else {
            callback(rows);
        }
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(data) {
        return (
            <DonationListItem data={data}/>
        );
    }

    /**
     * Render Empty screen
     * @returns {XML}
     * @private
     */
    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HISTORY} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <GiftedListView
                    emptyView={this._renderEmptyView}
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
                    firstLoader={true}
                    pagination={false}
                    refreshable={true}
                    withSections={false}
                    customStyles={{
                        paginationView: {}
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    empty: {
        flex: 1,
        marginTop: 100
    }
});