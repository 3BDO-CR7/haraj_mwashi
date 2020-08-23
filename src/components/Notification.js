import React, { Component } from 'react';
import {Text, Image, View, TouchableOpacity, Alert} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Button, Icon, Title, Toast,} from 'native-base';

import Tabs from './Tabs';
import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import { connect } from "react-redux";
import {profile} from "../actions";
import CONST from '../consts';
import styles from '../../assets/style'

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state  = {
            notifications  : [],
            user_id        : this.props.auth.data.id,
            spinner        : false,
            lang           : this.props.lang,
            en_message     : 'please complete all required data',
            ar_message     : 'برجآء تأكد من إدخال جميع البيانات'
        };
    }

    componentWillMount() {

        this.props.profile({  user_id: this.props.auth.data.id  });

        this.setState({spinner: true});

        axios.post(`${CONST.url}notifications`, { lang: this.props.lang, user_id : this.state.user_id })
            .then( (response)=> {
                this.setState({notifications: response.data.data});
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    delete(id,i) {

        Alert.alert(
            `${I18n.currentLocale() === 'en' ? 'Delete Notification' : 'حذف الإشعار'}`,
            `${I18n.currentLocale() === 'en' ? 'want to delete notification ?' : 'هل تريد حذف الإشعار ؟'}`,
            [
                {
                    text: `${I18n.currentLocale() === 'en' ? 'remove' : 'حذف'}`,
                    onPress: () => {
                        this.setState({spinner: true});

                        axios.post(`${CONST.url}deleteNotificaion`, { lang: this.props.lang, id : id  })
                            .then( (response)=> {

                                if(response.data.value === '1'){
                                    this.state.notifications.splice(i,1);
                                    CONST.showToast( response.data.msg,   "success")

                                    // Toast.show({ text: response.data.msg, duration : 2000 ,type:'success' ,textStyle: { color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                                }
                            })
                            .catch( (error)=> {
                                console.warn(error);
                                //Toast.show({ text: error.message, duration : 2000  ,textStyle: { color: "yellow",fontFamily : 'CairoRegular' ,textAlign:'center' } });
                                this.setState({spinner: false});
                            }).then(()=>{
                            this.setState({spinner: false});
                        });
                    }
                },
                {
                    text: `${I18n.currentLocale() === 'en' ? 'Cancel' : 'إلغاء'}`,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                }
            ],
            {cancelable: false},
        );
    }

    noResults() {
        return (
            <View>
                <View style={[ styles.no_data, {flexGrow : 1 } ]}>
                    <Image style={{ width  : 150, height : 150 }} source={require('../../assets/no_data.png')} resizeMode={"contain"}/>
                </View>
            </View>
        );
    }


    render() {
        return (
            <Container>

                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header, styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('notifications')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    {this.state.notifications.map((notification, i) => {
                        return (
                            <View style={[ styles.chat, { margin : 0 } ]}>
                                <View style={[ styles.textContent , { padding: 0 } ]} >
                                    {
                                        notification.type  === 2 ?
                                            <TouchableOpacity onPress={()=>{
                                                this.props.navigation.navigate(
                                                    {
                                                        routeName: 'details',
                                                        params: {
                                                            blog_id: notification.blog,
                                                        },
                                                        key: 'APage' + i
                                                    }
                                                )
                                            }} key={i} style={styles.Width_100}>
                                                <View style={[ styles.Radius_5, styles.paddingVertical_10, styles.paddingHorizontal_10 , { borderBottomWidth : 1 ,borderBottomColor:'#DDD' }]}>
                                                    <View style={[ styles.rowGroup, ]}>
                                                        <Text style={[styles.textRegular, styles.text_darkGreen, styles.textSize_14]}>
                                                            {notification.sender}
                                                        </Text>
                                                        <Text style={[styles.textRegular, styles.text_gray, styles.textSize_11]}>
                                                            {notification.date}
                                                        </Text>
                                                    </View>
                                                    <Text style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.textLeft]}>
                                                        {notification.msg}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                            :
                                            notification.type === 1 ?
                                                <TouchableOpacity onPress={()=>{
                                                    this.props.navigation.navigate('chatroom' , {
                                                        other  : notification.other,
                                                        room   : notification.room
                                                    })
                                                }} key={i} style={[ styles.Width_100  ]}>
                                                    <View style={[ styles.Radius_5, styles.paddingVertical_10, styles.paddingHorizontal_10, { borderBottomWidth : 1 ,borderBottomColor:'#DDD' }]}>
                                                        <View style={[ styles.rowGroup, { marginBottom : 10 }]}>
                                                            <Text style={[styles.textRegular, styles.text_darkGreen, styles.textSize_14]}>
                                                                {notification.sender}
                                                            </Text>
                                                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_11]}>
                                                                {notification.date}
                                                            </Text>
                                                        </View>
                                                        <Text style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.textLeft]}>
                                                            {notification.msg}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity key={i} style={styles.Width_100}>
                                                    <View style={[ styles.Radius_5, styles.paddingVertical_10, styles.paddingHorizontal_10, { borderBottomWidth : 1 ,borderBottomColor:'#DDD' }]}>
                                                        <View style={[ styles.rowGroup, { marginBottom : 10 } ]}>
                                                            <Text style={[styles.textRegular, styles.text_darkGreen, styles.textSize_14]}>
                                                                {notification.sender}
                                                            </Text>
                                                            <Text style={[styles.textRegular, styles.text_gray, styles.textSize_11]}>
                                                                {notification.date}
                                                            </Text>
                                                        </View>
                                                        <Text style={[styles.textRegular, styles.text_gray, styles.textSize_14, styles.textLeft]}>
                                                            {notification.msg}
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                    }
                                </View>
                            </View>
                        )
                    })}


                    { (this.state.notifications.length === 0 && this.state.spinner === false) ? this.noResults() : null}

                </Content>

                <Tabs navigation={this.props.navigation}/>

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, lang ,profile}) => {

    return {

        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user,
    };
};
export default connect(mapStateToProps,{profile})(Notification);




