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

var self;

export default class HomeView extends Component {
    
    constructor(props) {
        super(props);
        this.props = {
            isLoggedIn: true
        };
        this.state = {
            data: []
        };
        self = this;
    }

    componentDidMount() {
        this.retrieveDonations();
    }

    retrieveDonations() {
        IO.getSessionToken().then((sessionToken) => {
            //Read User Data
            IO.getUser().then((user) => {
                if (sessionToken && user) {
                    let userId = JSON.parse(user).facebookId;
                    let params = {};
                    params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                    params[Constants.StorageKeys.USER_ID] = userId;
                    Rest.read(Endpoints.DONATION, params,
                        (res) => {
                            res.json().then((res) => {
                                res = {
                                    "campains": [
                                        {
                                            "hospital": "QSUT",
                                            "message": "This is a Campain message",
                                            "name": "NameOfCampain",
                                            "end_date": "2016-06-22 15:47:05.379738",
                                            "start_date": "2016-05-03 15:47:05.379717",
                                            rand: Math.random()
                                        }
                                    ]
                                }; //TODO - Remove when retrieve from server
                                self.setState({
                                    data: res.campains
                                });
                            });
                        }, (res) => {
                            console.error(res);
                            //TODO - Handle Error
                        });
                }
            });
        });
    }


    goToLogin(navigator) {
        navigator.push({
            id: 'Login'
        });
    }

    render() {
        if (!this.state.data.length) {
            return (
                <View style={styles.container}>
                    <EmptyContent label={Labels.Messages.NO_DATA} icon={AppStyle.Icons.EMPTY_DATA}/>
                    <InstantActionBtn icon={AppStyle.Icons.HEART}/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <PTRView onRefresh={this.retrieveDonations} progressBackgroundSWColor={AppStyle.Colors.FG}>
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