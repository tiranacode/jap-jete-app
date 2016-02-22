'use strict';

import React, {
    Component,
    ToastAndroid,
    View,
    NetInfo,
} from 'react-native';
import Labels from '../../Configs/Labels';

export default React.createClass({
    getInitialState() {
        return {
            connectionAlive: null
        }
    },
    componentDidMount: function () {
        NetInfo.isConnected.addEventListener('change', this.handleNetworkChange);
        NetInfo.isConnected.fetch().done((connectionAlive) => this.setState({connectionAlive}));
    },
    componentWillUnmount: function () {
        NetInfo.isConnected.removeEventListener('change', this.handleNetworkChange);
    },
    handleNetworkChange: function (connectionAlive) {
        if (!connectionAlive) {
            ToastAndroid.show(Labels.NO_NETWORK, ToastAndroid.SHORT)
        }
        this.setState({
            connectionAlive
        })
    },
    render() {
        return (
            <View></View>
        )
    }
});