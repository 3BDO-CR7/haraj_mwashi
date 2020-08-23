import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Image,
    KeyboardAvoidingView,
    ScrollView, I18nManager as RNI18nManager,
} from 'react-native';
import {
    Container,
    Form,
    Item,
    Input,
    Label,
    Icon,
    Title,
    Picker,
    Button,
    Toast, Header, Left, Body, Right
} from 'native-base'


import {connect} from "react-redux";
import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
// import {Bubbles} from "react-native-loader";
import { userLogin, profile ,updateProfile,logout ,tempAuth} from '../actions'
import CONST from '../consts';
import styles from '../../assets/style'

class chnage_password extends Component {

    constructor(props) {

        super(props);

        RNI18nManager.forceRTL(true);


        this.state = {
            password     : '',
            cf_password  : '',
            phone        : '',
            countries    : [],
            codes    : [],
            key          : '',
            city_id      : '',
            cities       : [],
            country_id   : '',
            name         : '',
            spinner      : false,
            isLoaded     : false,
            text         : '',
            pathname     : '',
            favourites   : [],
            image        : '',
            img          : '',
            lang         : 'ar'
        };


        if(!this.props.user)
        {
            this.props.navigation.navigate('login');
        }

        this.setState({lang: this.props.lang});
        if (Text.defaultProps == null) Text.defaultProps = {};
        Text.defaultProps.allowFontScaling = false;

    }

    componentWillReceiveProps(newProps){

    }

    validate = () => {
        let isError = false;
        let msg = '';

       if(this.state.password.length > 0)
        {    isError = true;
            if(this.state.password.length < 6)
            {   isError = true;
                msg = I18n.t('passwordRequired');
            }else if(this.state.password !== this.state.cf_password)
            {   isError = true;
                msg = I18n.t('cf_passwordRequired');
            }else{
                isError = false;
            }
        }else{
           isError = true;
           msg = I18n.t('passwordRequired');

       }
        if (msg !== ''){
            // Toast.show({
            //     text: msg,
            //     duration : 2000 ,
            //     type : "danger",
            //     textStyle: {
            //         color: "white",
            //         fontFamily : 'CairoRegular' ,
            //         textAlign:'center'
            //     }
            // });
            CONST.showToast(msg,  "danger")
        }

        return isError;
    };

    renderSubmit() {

        if (this.state.isLoaded){
            return(
                <View  style={{ justifyContent:'center', alignItems:'center'  , marginTop:50}}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
        }

        return (

            <Button  onPress={() => this.sendData()} style={styles.bgLiner}>
                <Text style={styles.textBtn}>{I18n.translate('save')}</Text>
            </Button>

        );
    }

    sendData() {

        const err = this.validate();

        if (!err) {

            this.setState({spinner: true,isLoaded: true});

            axios.post(`${CONST.url}edit_password`, {
                user_id   : this.props.user.id,
                password  : this.state.password ,
            }).then( (response)=> {

                Toast.show({
                    text: response.data.msg,
                    duration : 2000 ,
                    type : (response.data.value === '1') ? 'success' :'danger' ,
                    textStyle: {
                        color: "#FFF",
                        fontFamily : 'CairoRegular',
                        textAlign:'center'
                    }
                });

                this.props.navigation.navigate('profile');

            }).catch( (error)=> {
                this.setState({spinner: false,isLoaded: false});
            }).then(()=>{
                this.setState({spinner: false,isLoaded: false});
            })

        }
    }

    changeFocusPassword(password) { this.setState({password}) }

    changeFocusCfPassword(cf_password) {
        if(this.state.password !== cf_password)
        {
            this.setState({cf_password:cf_password})
            this.setState({is_password:false})
            return false;
        }
        else {
            this.setState({cf_password:cf_password})
            this.setState({is_password:true})
        }
    }

    render() {

        let { image } = this.state;

        return (
            <Container>
                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header , styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('editAcc')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                {/*<Spinner visible={this.state.spinner}/>*/}

                <ScrollView contentContainerStyle={{ flexGrow: 1, marginVertical : 30 }}>

                    <KeyboardAvoidingView behavior="padding"    style={{  flex: 1 , marginHorizontal: 40}} >

                        <View style={styles.item} >
                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='lock' />*/}
                            {/*<Label style={styles.label}>{I18n.translate('password')}</Label>*/}
                            <Input
                                autoCapitalize='none'
                                secureTextEntry
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#f8cf5d" }]}
                                value={this.state.password}
                                onChangeText={(password)=> this.changeFocusPassword(password)}
                                placeholder={ I18n.translate('password')}
                            />
                        </View>

                        <View style={styles.item} >
                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='lock' />*/}
                            {/*<Label style={styles.label}>{I18n.translate('verifyNewPass')}</Label>*/}
                            <Input
                                autoCapitalize='none'
                                secureTextEntry
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#f8cf5d" }]}
                                value={this.state.cf_password}
                                onChangeText={(cf_password)=> this.changeFocusCfPassword(cf_password)}
                                placeholder={ I18n.translate('verifyNewPass')}
                            />
                        </View>

                        { this.renderSubmit() }

                    </KeyboardAvoidingView>

                </ScrollView>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, lang ,profile }) => {
    return {
        auth       : auth.user,
        lang       : lang.lang,
        user       : profile.user,
        result     : profile.result,
        userId     : profile.user_id,
        Updated     : profile.updated,
    };
};
export default connect(mapStateToProps, {profile,updateProfile,logout,tempAuth})(chnage_password);


