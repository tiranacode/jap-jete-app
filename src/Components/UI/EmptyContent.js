'use strict';

import React, {
    Component,
    View,
    Text,
    StyleSheet
} from 'react-native';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import {AppStyle} from '../../Styles/CommonStyles'

export default class EmptyContent extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.central}>
                    <Icon name="thumbs-down" size={100} color="#aaa" style={styles.icon}/>
                    <Text style={styles.text}>
                        {this.props.label}
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    central: {
        marginTop: 50,
        alignItems: 'center'
    },
    icon: {

    },
    text: {
        marginTop: 20,
        color: '#999'
    }
});
