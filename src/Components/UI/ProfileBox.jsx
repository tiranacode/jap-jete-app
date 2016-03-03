import React, {
    Component,
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    InteractionManager
} from 'react-native';

import _ from 'lodash';
import {Router, Route, Schema, Animations, TabBar, Actions} from 'react-native-router-flux';
import { Button, Card } from 'react-native-material-design';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import Progress from 'react-native-progress';
import {AppStyle, ComponentsStyle} from '../../Styles/CommonStyles.js';
import {Profile, ProfileUISchema} from '../../Domain/Profile.js';
import ProfileEdit from '../../Views/ProfileEdit';
import Constants from '../../Configs/Constants';
import IO from '../../Util/IO';
import {Endpoints} from '../../Configs/Url';
import Rest from '../../Util/Rest';
import Spinner from './Spinner';

export default class ProfileBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            loading: true
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            //Get Data From Local Storage
            AsyncStorage.getItem(Constants.StorageKeys.USER).then((data) => {
                if (data) {
                    this.setState({
                        user: JSON.parse(data),
                        loading: false
                    });
                }
            });
        });

        //Make Request to get user Data
        /*IO.getSessionToken().then((token) => {
         if (token) {
         Rest.read(Endpoints.USER, {
         session_token: token,
         user_id: this.state.user.facebookId
         },
         (res) => {
         console.dir(res);
         //TODO - Handle Su  ccess
         }, (res) => {
         //TODO - Handle Error
         });
         }
         });*/
    }

    navigateToProfileEdit(navigator) {
        navigator.push({
            id: 'ProfileEdit',
            user: this.state.user
        });
    }

    render() {
        if (!this.state.loading) {
            return (
                <ScrollView style={styles.container}>
                    {/* Image Header */}
                    <View style={styles.header}>
                        <Image
                            source={{ uri: this.state.user.photo }}
                            indicator={Progress.Pie}
                            resizeMode="cover"
                            indicatorProps={ComponentsStyle.ProgressIndicator}
                            style={styles.photo}/>
                        {/* Toolbar */}
                        <View style={styles.toolbar}>
                            <TouchableOpacity
                                onPress={() => { this.navigateToProfileEdit(this.props.navigator, this.state.user) }}>
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
                    <DetailsBox schema={ProfileUISchema} entity={this.state.user}/>
                </ScrollView>
            );
        }
        return (
            <Spinner/>
        )
    }
}

class DetailsBox extends Component {
    render() {
        var details = [];
        for (field in this.props.entity) {
            if (this.props.schema[field]) {
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
