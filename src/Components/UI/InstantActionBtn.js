'use strict';
import React, {
    Component,
    StyleSheet,
} from 'react-native';

import MK, {
    MKButton,
    MKColor
} from 'react-native-material-kit';
import Icon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import {AppStyle} from '../../Styles/CommonStyles'


const styles = StyleSheet.create({
    button: {},
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

const ColoredFab = MKButton.coloredFab()
    .withBackgroundColor(AppStyle.Colors.FG)
    .withStyle(styles.button)
    .withTextStyle({
        color: "white",
        fontWeight: "bold"
    })
    .build();

//TODO - Pass action with props
export default class InstantActionBtn extends Component {
    render() {
        return (
            <ColoredFab>
                <Icon name="pencil" size={25} color="white" style={styles.icon}/>
            </ColoredFab>
        )
    }
}