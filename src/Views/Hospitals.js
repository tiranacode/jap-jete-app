/**
 * Application Dashboard View
 */

'use strict';
import React, {Component, StyleSheet, View, Text, Dimensions} from "react-native";
import Labels from "../Configs/Labels";
import {AppStyle} from "../Styles/CommonStyles";
import EmptyContent from "../Components/UI/EmptyContent";
import ViewMetaBar from "../Components/UI/ViewMetaBar";
import IO from "../Util/IO";
import Rest from "../Util/Rest";
import {Endpoints} from "../Configs/Url";
import MessageDialog from "../Components/UI/MessageDialog";
import Constants from "../Configs/Constants";
import RNGMap from "react-native-gmaps";

export default class DashboardView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            markers: []
        };
        this._renderDataContent = this._renderDataContent.bind(this);
        this._retrieveHospitals = this._retrieveHospitals.bind(this);
        this._treatHospitalData = this._treatHospitalData.bind(this);
    }

    componentDidMount() {
        this._retrieveHospitals();
    }

    _treatHospitalData(res) {
        var markers = [];
        res.forEach((data) => {
           markers.push({
               coordinates: {
                   lat: data.latitude,
                   lng: data.longitude,
               },
               icon: require('image!marker')
           })
        });
        this.setState({
            data: res,
            markers: markers
        });
        MessageDialog.show("", JSON.stringify(this.state));
    }

    _retrieveHospitals(cb) {
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
                                this._treatHospitalData(res.hospitals);
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
        return (
            <View style={styles.container}>
                <RNGMap
                    ref='gmap'
                    style={styles.map}
                    markers={this.state.markers}
                    zoomLevel={15}
                    onMapChange={(e) => {
                                console.log(e)
                                }}
                    onMapError={(e) => {
                                    MessageDialog.show(Labels.Ui.ERROR, Labels.Messages.MAP_ERROR)
                                }}
                    center={{ lng: 0.0, lat: 0.0 }} //TODO - Calculate Center
                    clickMarker={0}/>
            </View>
        )
    }

    _renderDataContent() {
        if (!this.state.data) {
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
        alignItems: 'center',
        height: Dimensions.get('window').height / 2,
    },
    map: {
        height: Dimensions.get('window').height - 50,
        width: Dimensions.get('window').width
    },
    empty: {
        alignItems: 'flex-start',
        flex: 1,
        marginTop: 100
    }
});