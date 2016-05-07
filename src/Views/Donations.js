/**
 * Donation View, Lists Donations Campaign list and open its details
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
import IO from "../Util/IO";
import Rest from "../Util/Rest";
import {Endpoints} from "../Configs/Url";
import Constants from "../Configs/Constants";
import MessageDialog from "../Components/UI/MessageDialog";

export default class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this._retrieveCampaign = this._retrieveCampaign.bind(this);
    }

    componentDidMount() {
        this._retrieveCampaign();
    }

    /**
     * Retrieve campaign data
     */
    _retrieveCampaign() {
        IO.getSessionToken().then((sessionToken) => {
            IO.getUser().then((user) => {
                if (sessionToken && user) {
                    let userId = JSON.parse(user).facebookId;
                    let params = {};
                    params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                    params[Constants.StorageKeys.USER_ID] = userId;
                    Rest.read(Endpoints.DONATION, params, (res) => {
                        res.json().then((res) => {
                            console.log(res);
                            //TODO - Remove when issue #22 is solved
                            res.campains.forEach((c) => {
                                c.start_date = (new Date()).getTime();
                                c.end_date = (new Date()).getTime();
                            });
                            this.setState({
                                data: res.campains
                            });
                        });
                    }, (res) => {
                        console.error(res);
                        MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.NETWORK_ERROR);
                    });
                }
            });
        });
    }

    render() {
        // Show empty content Message
        if (!this.state.data.length) {
            return (
                <View style={styles.container}>
                    <EmptyContent label={Labels.Messages.NO_DATA} icon={AppStyle.Icons.EMPTY_DATA}/>
                    <InstantActionBtn icon={AppStyle.Icons.HEART}/>
                </View>
            )
        }
        // Show content
        return (
            <View style={styles.container}>
                <PTRView onRefresh={this._retrieveCampaign} progressBackgroundSWColor={AppStyle.Colors.FG}>
                    <ScrollView>
                        {
                            this.state.data.map((donation) => {
                                return (
                                    <Donation data={donation} key={donation.message}/>
                                )
                            })
                        }
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