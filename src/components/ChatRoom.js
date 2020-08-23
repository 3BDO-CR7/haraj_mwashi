import React, { Component } from 'react';
import {StyleSheet, Text, Image, View, ScrollView,KeyboardAvoidingView} from 'react-native';
import {Container, Button, Icon, Title, Textarea, Toast, Left, Body, Right, Header} from 'native-base';
// import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import {connect} from "react-redux";
import {profile} from "../actions";
// const  base_url = 'http://plus.4hoste.com/api/';
import CONST from '../consts';
import styles from '../../assets/style'

import I18n from "ex-react-native-i18n";
import {NavigationEvents} from "react-navigation";

class ChatRoom extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conversations   : [],
            spinner         : false,
            name            : '',
            message         : '',
            lang            : this.props.lang
        };
    }

    componentWillMount() {
        this.setState({spinner: true});
        axios.post(`${CONST.url}inbox`, {
            lang: this.props.lang ,
            user_id : this.props.auth.data.id ,
            r_id : this.props.navigation.state.params.other , room : this.props.navigation.state.params.room
        }).then( (response)=> {
            this.setState({
                 conversations     : response.data.data,
                 name              : response.data.name,
                spinner           : false
            });
        }).catch( (error)=> {
            this.setState({spinner: false});
        })
    }

    sendMessage() {

        axios.post(`${CONST.url}sendMessage`, {
            lang        : this.props.lang,
            user_id     : this.props.auth.data.id ,
            r_id        : this.props.navigation.state.params.other ,
            ad_id       : this.props.navigation.state.params.room ,
            message     : this.state.message
        }).then( (response)=> {

            if(response.data.value === '0'){
                // Toast.show({
                //     text            : response.data.msg,
                //     duration        : 2000 ,
                //     type            : 'danger',
                //     textStyle       : {
                //         color           : "white" ,
                //         textAlign       : 'center'
                //     }
                // });
                CONST.showToast(response.data.msg,'danger')

            }else {
                this.state.conversations.push(response.data.data);
                this.setState({message : ''})
            }

        }).catch( (error)=> {console.warn( error)})
    }

    onFocus(){
        this.componentWillMount()
    }

    render() {
        return (
            <Container>

                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{this.state.name}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                <KeyboardAvoidingView behavior="height" style={{  flex: 1}} >
                    <ScrollView style={styles.content} ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{this.scrollView.scrollToEnd({animated: true});}}>
                        {
                            this.state.conversations.map((chat, i) => {
                                return (
                                    (this.props.auth.data.id === chat.s_id)
                                        ?
                                        <View key={i} style={{ flexDirection : 'row', justifyContent : 'space-between', margin : 10}}>
                                            <View style={[styles.width_50, styles.height_50,  { flexBasis : '15%', justifyContent : 'center',alignItems: 'center' } ]}>
                                                <Image style={{ width : 45, height : 45, borderRadius : 25 }} source={{uri : chat.img}} resizeMode='cover'/>
                                            </View>
                                            <View style={{flexBasis : '85%'}}>
                                                <View style={{ flexDirection : 'column',backgroundColor :'#134949', borderRadius : 30, borderTopLeftRadius : 0 ,paddingVertical : 5, paddingHorizontal : 20}}>
                                                    <Text style={[ styles.text_White , styles.textBold, styles.textSize_14, styles.textLeft, styles.Width_100 , styles.marginVertical_10,]}>
                                                        {chat.msg}
                                                    </Text>
                                                    <Text style={[styles.text_White ,styles.textBold, styles.textSize_11, styles.rowLeft]}>{chat.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        :
                                        <View key={i} style={{ flexDirection : 'row-reverse', justifyContent : 'space-between', margin : 10 }}>
                                            <View style={[styles.width_50, styles.height_50, { flexBasis : '15%', justifyContent : 'center',alignItems: 'center' } ]}>
                                                <Image style={{ width : 45, height : 45, borderRadius : 25 }} source={{uri : chat.img}} resizeMode='cover'/>
                                            </View>
                                            {/*<View style={{flexBasis : '85%',backgroundColor :'#ED1C24', borderRadius : 30, borderTopRightRadius : 0 ,paddingVertical : 5, paddingHorizontal : 20}}>*/}
                                            {/*    <Text style={[ styles.text_White, styles.textRegular, styles.textSize_14, styles.textLeft, { marginBottom : 10 } ]}>*/}
                                            {/*        {chat.msg}*/}
                                            {/*    </Text>*/}
                                            {/*    <Text style={[styles.text_White, styles.textBold, styles.textSize_11, styles.textRight]}>*/}
                                            {/*        {chat.date}*/}
                                            {/*    </Text>*/}
                                            {/*</View>*/}
                                            <View style={{flexBasis : '85%'}}>
                                                <View style={{backgroundColor :'#ced09b', borderRadius : 30, borderTopRightRadius : 0 ,paddingVertical : 5, paddingHorizontal : 20}}>
                                                    <Text style={[ { color: '#fff' }, styles.textBold, styles.textSize_14, styles.textLeft, styles.marginVertical_10 ]}>
                                                        {chat.msg}
                                                    </Text>
                                                    <Text style={[{ color: '#fff' }, styles.textBold, styles.textSize_11, styles.rowLeft]}>{chat.date}</Text>
                                                </View>
                                            </View>
                                        </View>
                                )
                            })
                        }
                    </ScrollView>
                    <View style={{ flexDirection : 'row', justifyContent : 'space-between', alignItems : 'center' ,margin : 10 }}>
                        <View style={{ flexBasis : '85%' }}>
                            <Textarea
                                onChangeText={(message)=> { this.setState({message:message})}}
                                style={{
                                    borderWidth             : 1,
                                    borderColor             : '#f4f4f4',
                                    borderRadius            : 10,
                                    textAlign               : 'right',
                                    fontFamily              : 'CairoRegular',
                                    padding                 : 20,
                                    width                   : '97%',
                                    backgroundColor         : '#ecebea'
                                }}
                                placeholder={I18n.translate('message')}
                                value={this.state.message}
                            />
                        </View>
                        <View style={[ styles.flexCenter  , { flexBasis : '15%' } ]}>
                            <Button
                                onPress={() => this.sendMessage()} style={[styles.bg_ligth , styles.width_50, styles.height_50, styles.flexCenter, styles.Radius_30]}
                                disabled={this.state.message === ''}
                            >
                                <Icon style={[ styles.text_White, styles.textSize_20 ]} type="Entypo" name='paper-plane' />
                            </Button>
                        </View>
                    </View>
                </KeyboardAvoidingView>

            </Container>
        );
    }
}

const mapStateToProps = ({ auth, lang ,profile }) => {

    return {
        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user
    };
};
export default connect(mapStateToProps, {profile})(ChatRoom);



