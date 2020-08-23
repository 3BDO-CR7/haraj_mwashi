import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    I18nManager,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator, TouchableOpacity
} from 'react-native';
import {
    Container,
    Content,
    Form,
    Item,
    Input,
    Label,
    Title,
    Button,
    Icon,
    Header,

    Left,
    Body,
    Right,
    Toast
} from 'native-base'

import { LinearGradient } from 'expo';
import I18n from "ex-react-native-i18n";
// import {Bubbles} from "react-native-loader";
import axios from "axios";
import {connect} from "react-redux";
import {profile, userLogin} from "../actions";
const  base_url = 'http://plus.4hoste.com/api/';
import CONST from '../consts';
import * as Animatable from "react-native-animatable";
import styles from '../../assets/style'

class NewPassword extends Component {


    constructor(props) {
        super(props);
        this.state = {
            lang              : 'ar',
            password          : '',
            cf_password       : '',
            user_id           : '',
            code              : '',
            device_id         : '',
            key               : '',
            phone             : '',
            isLoaded          : false,
            spinner           : false
        };

    }
  componentWillMount() {

        this.setState({
            user_id            : this.props.navigation.state.params.user_id,
            key                : this.props.navigation.state.params.key,
            phone              : this.props.navigation.state.params.mobile,
            lang               : this.props.lang,
        });


  }

    componentWillReceiveProps(newProps){


        if (newProps.auth !== null && newProps.auth.value === '1'){

            this.setState({ user_id: newProps.auth.data.id });
            this.props.profile({user_id :newProps.auth.data.id});
            AsyncStorage.setItem('plusUserData', JSON.stringify(newProps.auth.data));
            this.props.navigation.navigate('home');

        }

        if (newProps.auth !== null) {

            // Toast.show({
            //     text: newProps.auth.msg,
            //     duration : 2000  ,
            //     type : (newProps.auth.value === '1'  || newProps.auth.value === '2' )? "success" : "danger",
            //     textStyle: {  color: "white",
            //         fontFamily : 'CairoRegular' ,
            //         textAlign:'center'
            //     } });

            CONST.showToast(newProps.auth.msg,  (newProps.auth.value === '1'  || newProps.auth.value === '2' )? "success" : "danger")


        }

        this.setState({spinner: false,isLoaded: false});
    }

    sendData()
    {
        const err = this.validate();
        if (!err) {
            this.setState({isLoaded: true,spinner: true});

            axios.post(`${CONST.url}resetPassword`, {
                lang            : this.props.lang ,
                password            : this.state.password,
                code        : this.state.code,
                user_id         : this.state.user_id,
            })
                .then( (response)=> {

                        if(response.data.value === '1')
                        {
                            this.setState({isLoaded: true,spinner: true});

                            const {phone, password, device_id , key,lang} = this.state;
                            this.props.userLogin({ phone, password, device_id, key ,lang } );
                            this.props.profile({  user_id:  this.state.user_id });

                        }
                        //
                        // Toast.show({
                        // text: response.data.msg,
                        // duration : 2000  ,
                        // type : (response.data.value === '1' )? "success" : "danger",
                        // textStyle: {  color: "white",   fontFamily : 'CairoRegular' , textAlign:'center'
                        // } });

                    CONST.showToast(response.data.msg,  (response.data.value === '1' )? "success" : "danger")


                }).catch( (error)=> {
                this.setState({spinner: false,isLoaded: false});

            }).then(()=>{
                this.setState({spinner: false,isLoaded: false});

            });
         }
    }




    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.code.length <= 0 ) {
            isError = true;
            msg = I18n.t('codeValidation');
        }else if(this.state.password.length < 6)
        {   isError = true;
            msg = I18n.t('passwordRequired');

        }else if(this.state.password !== this.state.cf_password)
        {   isError = true;
            msg = I18n.t('cf_passwordRequired');
        }

        if (msg != ''){
            CONST.showToast( msg,   "danger")
            // Toast.show({ text: msg, duration : 2000  ,type :"danger", textStyle: {  color: "white",fontFamily : 'CairoRegular' ,textAlign:'center' } });

        }
        return isError;
    };

    renderSubmit()
    {

        if (this.state.isLoaded){
            return(
                <View  style={{ justifyContent:'center', alignItems:'center' , marginTop:50}}>
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

  render() {
    return (
        <Container style={{ backgroundColor :'#134949' }}>

          <Header style={styles.Header_Up}>
              <Body style={[ styles.body_header , styles.textHead ]}>
                  <Title style={[styles.headerTitle ]}>{I18n.translate('newPass')}</Title>
              </Body>
              <Right style={[ styles.RightDir ]}>
                  <Button transparent onPress={()=> this.props.navigation.goBack()} >
                      <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                  </Button>
              </Right>
          </Header>


        <ScrollView contentContainerStyle={{ flexGrow: 1 , backgroundColor :'#134949'}}>

            <View style={styles.overHidden}>
                <Animatable.View animation="fadeInUp" easing="ease-out" delay={500}>
                    <Image style={styles.logo} source={require('../../assets/icon.png')}/>
                </Animatable.View>
            </View>


        <View style={styles.bgImage}>


            <KeyboardAvoidingView behavior="padding" style={{ flex: 1, width : '100%'}} >

                <View style={[styles.bgDiv, {width : "90%"}]}>


                    <Form style={[ styles.Width_100 ]}>

                        <View style={styles.item}>
                            {/*<Icon style={styles.icon_input} active type="MaterialCommunityIcons" name='barcode-scan' />*/}
                            {/*<Label style={styles.label}>{I18n.translate('code')}</Label>*/}
                            <Input
                                placeholder={I18n.translate('code')}
                                placeholderTextColor="#fff"
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                onChangeText={(code) => this.setState({code})}  value={ this.state.code } />
                        </View>
                        <View style={styles.item}>
                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='lock' />*/}
                            {/*<Label style={styles.label}>{I18n.translate('password')}</Label>*/}
                            <Input
                                placeholder={I18n.translate('password')}
                                placeholderTextColor="#fff"
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                onChangeText={(password) => this.setState({password})}  value={ this.state.password } />
                        </View>
                        <View style={styles.item}>
                            {/*<Icon style={styles.icon_input} active type="SimpleLineIcons" name='lock' />*/}
                            {/*<Label style={styles.label}>{I18n.translate('verifyNewPass')}</Label>*/}
                            <Input
                                placeholder={I18n.translate('verifyNewPass')}
                                placeholderTextColor="#fff"
                                style={[styles.input, { paddingRight : 10, paddingLeft : 10, color : "#fff" }]}
                                onChangeText={(cf_password) => this.setState({cf_password})}  value={ this.state.cf_password }/>
                        </View>

                        { this.renderSubmit() }

                    </Form>



                </View>
            </KeyboardAvoidingView>

        </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth,profile, lang  }) => {

    return {

        auth   : auth.user,
        lang   : lang.lang,
        result   : auth.success,
        userId   : auth.user_id,
    };
};
export default connect(mapStateToProps, { userLogin ,profile})(NewPassword);

