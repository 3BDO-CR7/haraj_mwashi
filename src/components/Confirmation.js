import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    Image,
    KeyboardAvoidingView, TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Title,
    Button,
    Toast,
    Body,
    Left,
    Right,
    Header
} from 'native-base'

import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import { connect } from 'react-redux';
import { userLogin, profile } from '../actions'
import CONST from '../consts';
import styles from '../../assets/style'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {NavigationEvents} from "react-navigation";

class Confirmation extends Component {
    constructor(props) {
        super(props);
        this.state  = {
            user_id: null,
            en_message   : 'please complete all required data',
            ar_message   : 'برجآء تأكد من إدخال جميع البيانات',
            code : null,
            lang : this.props.lang,
            device_id : null,
        };
    }

    async componentWillMount() {


        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();

        this.setState({ device_id : token });
        AsyncStorage.setItem('deviceID', token);

    }

    sendData() {

        this.setState({lang : this.props.lang});

        if(this.state.code == null )
        {
            CONST.showToast( ( this.props.lang === 'en' ? this.state.en_message : this.state.ar_message) ,(response.data.value === '1') ? 'success' : 'danger')
        }else{

           this.setState({spinner: true});

            axios.post(`${CONST.url}activateAccount`, { lang: this.props.lang , code : this.state.code , user_id :this.props.navigation.state.params.user_id  })
                .then( (response)=> {

                    this.setData(response);
                })
                .catch( (error)=> {
                    this.setState({spinner: false});
                }).then(()=>{

            }).then(()=>{

            });

       }
    }

    setData(response) {

        if(response.data.value === '1')
        {
            // Toast.show({
            //     text: response.data.msg,
            //     duration : 2000 ,
            //     type : 'success' ,
            //     textStyle: {
            //         color: "white",
            //         fontFamily : 'CairoRegular' ,
            //         textAlign:'center'
            //     }
            // });
            CONST.showToast( response.data.msg ,'success')
           this.props.userLogin({
               phone : this.props.navigation.state.params.phone ,
               password : this.props.navigation.state.params.password ,
               device_id: this.state.device_id ,
               key: this.props.navigation.state.params.key,
               lang:this.props.lang
           });
            this.props.profile({user_id :this.props.navigation.state.params.user_id });
            AsyncStorage.setItem('plusUserData', JSON.stringify(response.data.data));

        }else{
            CONST.showToast( response.data.msg ,'danger')

            // Toast.show({
            //     text: response.data.msg,
            //     duration : 2000 ,
            //     type : 'danger' ,
            //     textStyle: {
            //         color: "white",
            //         fontFamily: 'CairoRegular',
            //         textAlign:'center'
            //     }
            // });
            this.setState({spinner: false});
        }
    }

    componentWillReceiveProps(newProps){

        if(newProps.auth ) {
            this.props.navigation.navigate('home');
            this.setState({spinner: false});
        }else{
            this.setState({spinner: false});
        }
    }

    onFocus(){
        this.componentWillMount()
    }

    render() {
        return (
            <Container style={{ backgroundColor :'#134949' }}>

                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                <Header style={[styles.Header_Up]}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('insert_code')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                {/*<Spinner visible={this.state.spinner}/>*/}

                <Content contentContainerStyle={{ flexGrow: 1, backgroundColor :'#134949' }}>
                    <KeyboardAvoidingView behavior="padding" enabled  style={{flex:1, width : '100%'}}>

                        <View style={[styles.bgDiv,{marginTop : 50}]}>
                            <Form  style={{width : '100%'}}>
                                <View style={styles.item}  error={ this.state.code === '' ? true : false} success={ this.state.code !== ''  && this.state.code !== null ? true : false}>
                                    {/*<Icon style={styles.icon} active type="FontAwesome" name='key' />*/}
                                    {/*<Label style={styles.label}>{I18n.translate('code')}</Label>*/}
                                    <Input
                                        placeholder={ I18n.translate('code')}
                                        style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                        keyboardType={'number-pad'}
                                        value={ this.state.code}
                                        placeholderTextColor="#fff"
                                        onChangeText={(code)=> this.setState({code})}
                                    />
                                </View>

                                <Button  onPress={() => this.sendData()} style={[ styles.flexCenter, styles.bg_bom, styles.width_150, styles.height_50 ]}>
                                    <Text style={[ styles.textBtn , styles.text_darkGreen ]}>{I18n.translate('confirm')}</Text>
                                </Button>

                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                </Content>
            </Container>
        );
    }

}

const mapStateToProps = ({ auth, lang }) => {

    return {

        auth   : auth.user,
        lang   : lang.lang
    };
};
export default connect(mapStateToProps, { userLogin ,profile })(Confirmation);


