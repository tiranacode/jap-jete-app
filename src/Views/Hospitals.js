/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text} from "react-native";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import ViewMetaBar from "../Components/UI/ViewMetaBar";
import IO from "../Util/IO";
import Rest from "../Util/Rest";
import {Endpoints} from "../Configs/Url";
import MessageDialog from "../Components/UI/MessageDialog";
import Constants from "../Configs/Constants";

export default class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this._renderDataContent = this._renderDataContent.bind(this);
        this._retrieveHospitals = this._retrieveHospitals.bind(this);
    }

    componentDidMount() {
        this._retrieveHospitals();
    }

    _retrieveHospitals() {
        IO.getSessionToken().then((sessionToken) => {
            IO.getUser().then((user) => {
                if (sessionToken && user) {
                    let userId = JSON.parse(user).facebookId;
                    let params = {};
                    params[Constants.StorageKeys.SESSION_TOKEN] = sessionToken;
                    params[Constants.StorageKeys.USER_ID] = userId;
                    Rest.read(Endpoints.HOSPITALS, params, (res) => {
                        if (res) {
                            res.json().then((res) => {
                                console.log(res);
                                this.setState({
                                    data: res.hospitals
                                });
                            })
                        }
                    }, (err) => {
                        console.error(res);
                        MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.NETWORK_ERROR);
                    });
                }
            })
        });
    }

    _renderEmptyView() {
        return (
            <View style={styles.empty}>
                <EmptyContent label={Labels.Messages.NO_HOSPITALS} icon={AppStyle.Icons.EMPTY_DATA}/>
            </View>
        )
    }

    _renderRowView() {
        var count = 0;
        return (
            <View style={styles.container}>
                {
                    this.state.data.map((data) => {
                        count++;
                        return (
                            <Text key={"hos-" + count}>{data.name}</Text>
                        )
                    })
                }
            </View>
        )
    }

    _renderDataContent() {
        //TODO - Change in production
        return this._renderEmptyView();
        /*if (!this.state.data.length) {
            return this._renderEmptyView();
        } else {
            return this._renderRowView();
        }*/
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