import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    I18nManager,
    ActivityIndicator,
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
    Right,
    Header
} from 'native-base'

import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
// const  base_url = 'http://plus.4hoste.com/api/';
import { connect } from 'react-redux';
import { userLogin,logout,tempAuth } from '../actions'
// import {Bubbles} from "react-native-loader";
import CONST from '../consts';
import * as Animatable from "react-native-animatable";
import styles from '../../assets/style'

class ConfirmationPage extends Component {


    constructor(props) {

        super(props);
        I18nManager.forceRTL(true);

        this.state  = {
            user_id      : null,
            isLoaded     : false,
            en_message   : 'please complete all required data',
            ar_message   : 'برجآء تأكد من إدخال جميع البيانات',
            code         : null,
            lang         : 'ar',
            keyValue     : '',
            typePage     : ''
        };

        this.props.logout({ token: this.props.navigation.state.params.user_id });
        this.props.tempAuth();
    }

    componentWillMount() {

        this.setState({user_id: this.props.navigation.state.params.user_id});

    }



    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.code  == null|| this.state.code ===  '') {
            isError = true;
            msg = I18n.t('codeValidation');
        }
        if (msg !== ''){
            CONST.showToast(  msg ,'danger')

            // Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };



    sendData()
    {

        this.setState({lang : this.props.lang});

        if(this.state.code == null )
        {
            CONST.showToast(  ( this.props.lang === 'en' ? this.state.en_message : this.state.ar_message) ,'danger')

            // Toast.show({ text: ( this.props.lang === 'en' ? this.state.en_message : this.state.ar_message), duration : 2000 ,textStyle: { color: "yellow",fontFamily            : 'CairoRegular' ,textAlign:'center' }});
        }else{

            this.setState({spinner: true});

            if(this.props.navigation.state.params.type === 'phone'){

                    axios.post(`${CONST.url}activateAccount`, {
                        lang: this.props.lang ,
                        code : this.state.code ,
                        user_id : this.props.navigation.state.params.user_id
                    })
                    .then( (response)=> {
                        this.setAsyncStorage(response);
                    })
                    .catch( (error)=> {
                        this.setState({spinner: false});
                    }).then(()=>{
                        this.setState({spinner: false});
                    })


            }else if (this.props.navigation.state.params.type === 'email') {

                    axios.post(`${CONST.url}activateNewEmail`, {
                        lang: this.props.lang ,
                        code : this.state.code ,
                        user_id : this.props.navigation.state.params.user_id
                    })
                    .then( (response)=> {
                        this.setAsyncStorage(response);
                    })
                    .catch( (error)=> {
                        this.setState({spinner: false});
                    }).then(()=>{
                        this.setState({spinner: false});
                    })

            }else{

                axios.post(`${CONST.url}activateForLogin`, {
                    lang: this.props.lang ,
                    code : this.state.code ,
                    user_id : this.props.navigation.state.params.user_id
                })
                    .then( (response)=> {
                        this.setAsyncStorage(response);
                    })
                    .catch( (error)=> {
                        this.setState({spinner: false});
                    }).then(()=>{
                    this.setState({spinner: false});
                })

            }

        }
    }

    async setAsyncStorage(response) {

        if(response.data.value === '1')
        {
            this.setState({isLoaded: false});
            this.setState({spinner: false});
            CONST.showToast( response.data.msg ,'success')
           // Toast.show({ text: response.data.msg, duration : 2000 ,type : 'success' ,textStyle: { color: "white",fontFamily            : 'CairoRegular' ,textAlign:'center' } });
            this.props.navigation.navigate('login');

        }else{
            CONST.showToast( response.data.msg ,'danger')
            // Toast.show({ text: response.data.msg, duration : 2000 ,type : 'danger' ,textStyle: { color: "white",fontFamily            : 'CairoRegular' ,textAlign:'center' } });
            this.setState({spinner: false});
        }
    }


    renderSubmit()
    {

        if (this.state.isLoaded){
            return(
                <View  style={{ justifyContent:'center', alignItems:'center'}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }


        return (

            <Button  onPress={() => this.sendData()} style={[ styles.flexCenter, styles.bg_bom, styles.width_150, styles.height_50, styles.marginVertical_10 ]}>
                <Text style={[ styles.textBtn , styles.text_darkGreen ]}>{I18n.translate('send')}</Text>
            </Button>

        );
    }


    componentWillReceiveProps(newProps){

        if(newProps.logout == 1)
        {
            this.props.navigation.navigate('home');
        }

    }

    render() {
        return (
            <Container style={{ backgroundColor :'#134949' }}>

                {/*<Spinner visible={this.state.spinner}/>*/}

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('insert_code')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>


                <Content contentContainerStyle={{ flexGrow: 1,backgroundColor :'#134949' }}>
                    <KeyboardAvoidingView behavior="padding" enabled  style={{flex:1, width : '100%'}}>

                        <View style={styles.overHidden}>
                            <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                                <Image style={styles.logo} source={require('../../assets/icon.png')}/>
                            </Animatable.View>
                        </View>

                        <View style={styles.bgDiv}>
                            <Form  style={{width : '100%'}}>

                                <View style={styles.item}>
                                    {/*<Icon style={styles.icon_input} active type="FontAwesome" name='key' />*/}
                                    {/*<Label style={styles.label}>{I18n.translate('code')}</Label>*/}
                                    <Input
                                        placeholder={ I18n.translate('code')}
                                        style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                        value={ this.state.code}
                                        keyboardType={'number-pad'}
                                        placeholderTextColor="#fff"
                                        onChangeText={(code)=> this.setState({code})}
                                    />
                                </View>


                                { this.renderSubmit() }

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

export default connect(mapStateToProps, { userLogin,logout,tempAuth })(ConfirmationPage);


