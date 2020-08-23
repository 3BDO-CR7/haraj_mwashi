import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    I18nManager,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ScrollView, ActivityIndicator
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Toast,
    Title,
    Button,
    Picker,
    Header,
    Left, Body, Right
} from 'native-base'
import {connect}         from "react-redux";
import { userLogin,profile,tempAuth,logout} from "../actions";
import I18n from "ex-react-native-i18n";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
// import Spinner      from "react-native-loading-spinner-overlay";
import axios        from 'axios';
// import {Bubbles}    from "react-native-loader";
import {NavigationEvents} from "react-navigation";
const  base_url     = 'http://plus.4hoste.com/api/';
import CONST from '../consts';
import * as Animatable from "react-native-animatable";
import styles from '../../assets/style'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang      : 'ar',
            phone     : '',
            email     : '',
            password  : '',
            device_id : null,
            key       : null,
            codes     : [],
            isLoaded  : false
        };
        this.setState({spinner: true});
        this.setState({lang: this.props.lang});
        axios.post(`${CONST.url}codes`, { lang: this.props.lang  })
            .then( (response)=> {
                this.setState({codes: response.data.data});
                this.setState({key: response.data.data[0]});
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    validate = () => {
        let isError = false;
        let msg = '';
        console.warn(this.state.phone.length);

        if (this.state.phone.length <= 0 ) {
            isError = true;
            msg = I18n.t('foucs');
        }else if (this.state.password.length <= 0) {
            isError = true;
            msg = I18n.t('passwordRequired');
        }
        if (msg != ''){
            CONST.showToast(msg,  "danger")

            // Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };


    onValueChange(value) {
        this.setState({key : value});
    }
    async componentWillMount() {
     setTimeout(()=> {
         this.allowNotification();
     },8000)
    }
    async  allowNotification(){
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
        console.log('token  ->  ' , token)
        AsyncStorage.setItem('deviceID', token);
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

            <TouchableOpacity  onPress={() => this.onLoginPressed()} style={[ styles.flexCenter, styles.bg_bom, styles.width_150, styles.height_50 ]}>
                <Text style={[ styles.textBtn , styles.text_darkGreen ]}>{I18n.translate('signIn')}</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(newProps){
        if( newProps.result === 2 &&  newProps.auth !== null)
        {

            this.props.navigation.navigate('Confirmation_Page',{
                user_id : newProps.userId,
                code    : newProps.auth.code
            })

        }else{


            if (newProps.auth !== null && newProps.auth.value === '1'){

                this.setState({ user_id: newProps.auth.data.id });
                this.props.profile({user_id :newProps.auth.data.id , lang : this.props.lang});
                AsyncStorage.setItem('plusUserData', JSON.stringify(newProps.auth.data));
                this.props.navigation.navigate('home');

            }else if(newProps.auth !== null && newProps.auth.value === '2')
            {


                this.props.navigation.navigate('Confirmation',
                    {
                        phone: this.state.phone,
                        email: this.state.email,
                        key : this.state.key,
                        password: this.state.password,
                        user_id :this.props.userId,
                        code    : newProps.auth.code,
                        type : 'login'
                    });
            }else{
            }

            if (newProps.auth !== null) {

                if(newProps.auth.value === '0'){
                    this.props.logout({ token: null });
                    this.props.tempAuth();
                }

                // Toast.show({
                //     text: newProps.auth.msg,
                //     duration : 2000  ,
                //     type : (newProps.auth.value === '1'  || newProps.auth.value === '2' )? "success" : "danger",
                //     textStyle: {  color: "white",
                //         fontFamily : 'CairoRegular' ,
                //         textAlign:'center'
                //     }
                // });

                CONST.showToast(newProps.auth.msg,  (newProps.auth.value === '1'  || newProps.auth.value === '2' )? "success" : "danger")

            }

        }
        this.setState({ isLoaded: false });
    }


    onLoginPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isLoaded: true });
            const {phone, password, device_id , key,lang} = this.state;
            this.props.userLogin({ phone, password, device_id, key ,lang } );
        }
    }

    onFocus()
    {
        this.componentWillMount()
    }

    render() {
        return <Container style={{ backgroundColor :'#134949' }}>

        <Header style={styles.Header_Up}>
                <Body style={[styles.body_header,styles.textHead]}>
                <Title style={styles.headerTitle}>{I18n.translate('signIn')}</Title>
                </Body>
                <Right style={[ styles.RightDir]}>
                    <Button transparent onPress={()=> this.props.navigation.goBack()} >
                        <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                    </Button>
                </Right>
            </Header>
            {/*<Spinner visible={this.state.spinner}/>*/}
            <NavigationEvents onWillFocus={() => this.onFocus()} />
            <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor :'#134949'}}>


                <View style={[styles.bgImage]}>
                    <View style={[styles.overHidden,{width : '100%'}]}>
                        <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                            <Image style={[styles.logo]} source={require('../../assets/logo.png')}/>
                        </Animatable.View>
                    </View>
                    <View style={[styles.bgDiv, {width : "90%"}]}>
                        <KeyboardAvoidingView behavior="padding" style={[ styles.Width_100, styles.flexCenter ]} >
                            <Form style={[ styles.Width_100, styles.flexCenter ]}>
                                <View style={{flexDirection: 'row', width : '100%'}}>
                                    <View style={[ styles.flex_80 ]}>
                                        <View style={[ styles.item ]} >
                                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='phone' />*/}
                                            {/*<Label style={styles.label}>{ I18n.translate('enterchoose')}</Label>*/}
                                            <Input
                                                placeholder={I18n.translate('enterchoose')}
                                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                                onChangeText={(phone) => this.setState({phone})}  value={ this.state.mobile }
                                                placeholderColor='#FFF'
                                                placeholderTextColor="#fff"
                                            />
                                        </View>
                                    </View>
                                    <View style={[ styles.flex_20 ]}>
                                        <View style={[ styles.rowGroup , styles.position_R , { alignItems : 'center', paddingHorizontal : 0, borderWidth : 1, borderColor : '#b5b5b5' , borderLeftWidth : 0,top : 10, height : 52}]} regular>
                                            <Picker
                                                mode               ="dropdown"
                                                style              ={{ color: '#9a9a9a',backgroundColor:'transparent' }} iosHeader={I18n.translate('keyCountry')}
                                                headerBackButtonText={I18n.translate('goBack')}
                                                selectedValue       ={this.state.key}
                                                onValueChange      ={this.onValueChange.bind(this)} //ios
                                                textStyle          ={{ color: "#fff", paddingLeft  : 5, paddingRight : 5, fontSize : 12, paddingTop : 8}}
                                                itemTextStyle      ={{ color: '#363636' }}>
                                                {
                                                    this.state.codes.map((code, i) => {
                                                        return <Picker.Item style={{color: "#fff"}}  key={i} value={code} label={code} />
                                                    })
                                                }
                                            </Picker>
                                            <Icon style={[ styles.position_A, {color: "#fff", fontSize:13, right : 5, top: 19} ]} name='down' type="AntDesign"/>
                                        </View>
                                    </View>
                                </View>
                                <View style={[ styles.item , styles.Width_100 ]}>
                                    {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='lock'/>*/}
                                    {/*<Label style={styles.label}>{I18n.translate('password')}</Label>*/}
                                    <Input
                                        placeholderTextColor="#fff"
                                        placeholder={I18n.translate('password')}
                                        autoCapitalize='none'
                                        value={ this.state.password }
                                        onChangeText={(password) => this.setState({password})}
                                        secureTextEntry
                                        style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                    />
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('forgetpassword')}>
                                    <Text style={[styles.textFont , styles.marginVertical_25]}>{I18n.translate('forgetPass')}</Text>
                                </TouchableOpacity>
                                { this.renderSubmit() }
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('register')}>
                                    <Text style={[styles.textFont , styles.marginVertical_25, styles.text_bom]}>
                                        {I18n.translate('newAccount')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[ styles.bg_light_gray, styles.width_150, styles.flexCenter, styles.height_50, styles.marginVertical_10 ]} onPress={() => this.props.navigation.navigate('home')}>
                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_darkGreen ]}>{I18n.translate('visitor')}</Text>
                                </TouchableOpacity>
                            </Form>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </Container>;
    }
}


const mapStateToProps = ({ auth,profile, lang  }) => {

    return {

        auth     : auth.user,
        lang     : lang.lang,
        result   : auth.success,
        userId   : auth.user_id,
    };
};
export default connect(mapStateToProps, {logout, tempAuth,userLogin ,profile})(Login);
