import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import _ from 'lodash';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import { Button, Card } from 'react-native-material-design';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
import {AppStyle, ComponentsStyle} from '../../Styles/CommonStyles.js';
import {Profile, ProfileUISchema} from '../../Domain/Profile.js';
import ProfileEdit from '../../Views/ProfileEdit'

var testProfile = new Profile("Kostandin", "A+", "kostandinangjellari@gmail.com", "020309131", "023, Tirana");

export default class ProfileBox extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                {/* Image Header */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'http://kclr96fm.com/media/2015/03/Captain-Jack-captain-jack-sparrow-14117613-1242-900.jpg' }}
                        indicator={Progress.Pie}
                        resizeMode="cover"
                        indicatorProps={ComponentsStyle.ProgressIndicator}
                        style={styles.photo}/>
                    {/* Toolbar */}
                    <View style={styles.toolbar}>
                        <TouchableOpacity onPress={()=>Actions.profileEdit({user: testProfile})}>
                            <Icon
                                name="pencil"
                                size={30}
                                color="#fff"
                                style={styles.toolbarBtn}/>
                        </TouchableOpacity>
                    </View>
                    {/* Icon - TODO - Change Icon */}
                    <Image
                        source={{uri: "http://www.myiconfinder.com/uploads/iconsets/067f33d33e085fde8c366c8ae7162d95-heart.png"}}
                        style={styles.toolbarImage}>
                    </Image>
                </View>

                {/* Content */}
                <DetailsBox schema={ProfileUISchema} entity={testProfile}/>
            </ScrollView>
        )
    }
}

class DetailsBox extends Component {
    render() {
        var details = [];
        for (field in this.props.entity) {
            console.log(this.props.entity[field]);
            details.push(
                <View style={styles.detail} key={field}>
                    <Icon
                        name={this.props.schema[field].icon}
                        size={20}
                        color="red"
                        style={styles.detailIcon}
                        />
                    <Text style={styles.detailValue}>{this.props.entity[field]}</Text>
                </View>
            )
        }
        return (
            <View style={styles.profileDetails}>
                <View>{details}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flex: 0.5
    },
    photo: {
        width: Dimensions.get('window').width,
        left: 0,
        height: 200,
        right: 0,
        justifyContent: 'flex-end'
    },
    toolbar: {
        flex: 0.4,
        backgroundColor: 'red',
        width: Dimensions.get('window').width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    toolbarBtn: {
        borderLeftColor: 'white',
        borderLeftWidth: 2,
        borderStyle: 'solid',
        right: 10,
        width: 50,
        top: 5,
        textAlign: 'center'
    },
    toolbarImage: {
        width: 80,
        height: 80,
        left: 10,
        top: 160,
        position: 'absolute'
    },
    profileDetails: {
        flex: 0.5,
        width: Dimensions.get('window').width - 40,
        backgroundColor: 'white',
        padding: 20,
        margin: 20
    },
    name: {
        fontSize: 20,
        marginBottom: 20
    },
    detail: {
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: 10
    },
    detailIcon: {
        marginRight: 20
    },
    detailValue: {
        fontSize: 15
    }
});