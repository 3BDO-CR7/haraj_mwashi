import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    KeyboardAvoidingView,
    ScrollView,
    I18nManager as RNI18nManager, Image, TouchableOpacity,I18nManager
} from 'react-native';

import {
    Container,
    Textarea,
    Header,
    Item,
    Input,
    Body,
    Right,
    Button,
    Icon,
    DatePicker,
    Title,
    Left, Toast, Form, CheckBox, Picker
} from 'native-base';
import I18n from "ex-react-native-i18n";
// import Spinner from "react-native-loading-spinner-overlay";
import axios   from 'axios';
import {connect} from "react-redux";
import {profile} from "../actions";
import CONST from '../consts';
import styles from '../../assets/style'
import * as ImagePicker from "expo-image-picker";
import {NavigationEvents} from "react-navigation";
import Modal from "react-native-modal";

class Commission extends Component {
    constructor(props) {
        super(props);
        RNI18nManager.forceRTL(true);

        this.state = {
            lang                    : this.props.lang,
            spinner                 : false,
            nameBank                : '',
            userName                : '',
            numAcc                  : '',
            countNum                : '',
            img                     : '',
            valOne                  : '',
            valTwo                  : '',
            image                   : 'https://x.kinja-static.com/assets/images/logos/placeholders/default.png',
            en_message              : 'please complete all required data',
            ar_message              : 'برجآء تأكد من إدخال جميع البيانات',
            commissionModal         : false,
            nameBankStatus          : 0,
            userNameStatus          : 0,
            numAccStatus            : 0,
            countNumStatus          : 0,
            valOneStatus            : 0,
            valTwoStatus            : 0,
            textErr                 : '',
            priceNum                : 0
        };

    }

    activeInput(type) {

        if (type === 'nameBank' || this.state.nameBank !== '') {
            this.setState({nameBankStatus: 1})
        }

        if (type === 'userName' || this.state.userName !== '') {
            this.setState({userNameStatus: 1})
        }

        if (type === 'numAcc' || this.state.numAcc !== '') {
            this.setState({numAccStatus: 1})
        }

        if (type === 'countNum' || this.state.countNum !== '') {
            this.setState({countNumStatus: 1})
        }

        if (type === 'valOne' || this.state.valOne !== '') {
            this.setState({valOneStatus: 1})
        }

        if (type === 'valTwo' || this.state.valTwo !== '') {
            this.setState({valTwoStatus: 1})
        }

    }

    unActiveInput(type) {

        if (type === 'nameBank' && this.state.nameBank === '') {
            this.setState({nameBankStatus: 0})
        }

        if (type === 'userName' && this.state.userName === '') {
            this.setState({userNameStatus: 0})
        }

        if (type === 'numAcc' && this.state.numAcc === '') {
            this.setState({numAccStatus: 0})
        }

        if (type === 'password' && this.state.password === '') {
            this.setState({countNumStatus: 0})
        }

        if (type === 'confirmPassword' && this.state.confirmPassword === '') {
            this.setState({valOneStatus: 0})
        }

        if (type === 'confirmPassword' && this.state.confirmPassword === '') {
            this.setState({valTwoStatus: 0})
        }

    }

    sendData() {
        if(
            this.state.userName     === '' ||
            this.state.numAcc       === '' ||
            this.state.countNum     === '' ||
            this.state.img          === ''
        ) {
            // Toast.show({
            //     text: (I18n.currentLocale() === 'en' ? this.state.en_message : this.state.ar_message),
            //     duration : 2000 ,
            //     type : 'danger',
            //     textStyle: {
            //         color: "white",
            //         fontFamily: 'CairoRegular' ,
            //         textAlign:'center'
            //     }
            // });
            CONST.showToast((I18n.currentLocale() === 'en' ? this.state.en_message : this.state.ar_message),'danger')

        }else{
            this.setState({spinner: true});
            axios.post(`${CONST.url}transfer`, {
                lang        : this.props.lang,
                // user_id     : this.props.user.id ,
                // bank_id     : this.props.navigation.state.params.id ,
                // username    : this.state.userName,
                // nameBank    : this.state.nameBank,
                // numAcc      : this.state.numAcc,
                // countNum    : this.state.countNum,
                // img         : this.state.img,

                bank_id : this.props.navigation.state.params.id,
                img : this.state.img,
                accountNumber : this.state.numAcc,
                username : this.state.userName,
                ammount : this.state.countNum ,
                user_id : this.props.user.id
            }).then( (response)=> {

                if(response.data.value === '1') {
                    this.props.navigation.navigate('home');
                }

                // Toast.show({
                //     text        : response.data.msg,
                //     duration    : 2000 ,
                //     type        : (response.data.value === '1') ? 'success' : 'danger',
                //     textStyle   : {
                //         color       : "white",
                //         fontFamily  : 'CairoRegular',
                //         textAlign   : 'center'
                //     }
                // });
                CONST.showToast( response.data.msg ,(response.data.value === '1') ? 'success' : 'danger')

            }).catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
                this.setState({spinner: false});
            });
        }
    }

    commissionModal(){
        this.setState({ commissionModal: !this.state.commissionModal })
    }

    // validate = () => {
    //     let isError = false;
    //     let msg = '';
    //
    //     if(this.state.valOne === '') {
    //         isError = true;
    //         msg = I18n.t('enpobay');
    //     }
    //     if (msg !== ''){
    //         this.setState({ textErr : msg })
    //     }
    //     return isError;
    // };

    // onDone(){
    //
    //     // const err = this.validate();
    //
    //     if (!err) {
    //         this.setState({ commissionModal: !this.state.commissionModal })
    //     }
    //
    // }

    componentWillMount() {}

    _pickImage = async () => {

        let result          = await ImagePicker.launchImageLibraryAsync({
            allowsEditing   : true,
            base64          : true,
            aspect          : [4, 3],
        });

        this.setState({img: result.base64});

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }

    };

    onFocus(){
        this.componentWillMount()
    }

    handleKeyUp(keyword) {
        const total = (keyword * 1 / 100);
        console.log('total', total);
        setTimeout(()=>{
            this.setState({ priceNum : total });
        },500);
    }

    render() {

        let { image } = this.state;

        return (
            <Container>

                {/*<Spinner visible={this.state.spinner}/>*/}
                <NavigationEvents onWillFocus={() => this.onFocus()}/>

                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                    <Title style={styles.headerTitle}>{I18n.translate('commission')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                <ScrollView>
                    <View style={styles.blockAbout}>
                        <View style = {[ styles.marginVertical_5, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Width_100, styles.SelfCenter, styles.position_R]}>
                            <View style={[ styles.Border, styles.border_gray, styles.bg_White, styles.paddingHorizontal_10, styles.paddingVertical_5 ,styles.rowFlex, styles.Width_100, styles.position_R, { zIndex : -1 } ]}>
                                <View style={[ styles.width_20, styles.height_20, styles.flexCenter, styles.position_A, styles.bg_ligth, styles.top_5, styles.right_5, styles.Radius_5 ]}>
                                    <Icon
                                        style={[ styles.textSize_13, styles.text_White ]}
                                        type="AntDesign"
                                        name='check'
                                    />
                                </View>
                                <View style={[ styles.flex_25, styles.Radius_5, styles.Border, styles.opcity_gray, styles.Radius_5, styles.bg_White ]}>
                                    <Image style={[styles.Width_100, styles.height_80]} source={{ uri: this.props.navigation.state.params.bankImg }} resizeMode={'contain'}/>
                                </View>
                                <View style={[ styles.flex_75, styles.overHidden, styles.paddingHorizontal_10 ]}>
                                    <View style={[ styles.rowFlex ]}>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.text_gray]}>{ I18n.translate('accountName')}</Text>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                        <Text style={[styles.textRegular, styles.textSize_14,]}>{ this.props.navigation.state.params.bankName }</Text>
                                    </View>
                                    <View style={[ styles.rowFlex ]}>
                                        <Text style={[styles.textRegular, styles.textSize_14,]}>{ I18n.translate('account_number')}</Text>
                                        <Text style={[styles.textRegular, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                        <Text style={[styles.textRegular, styles.textSize_14]}>{ this.props.navigation.state.params.bankNumber }</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <KeyboardAvoidingView behavior="padding" style={{  flex: 1, justifyContent: 'space-between'}} >
                        <View style={styles.sendForms}>
                            <Text style={{textAlign:'center', marginVertical: 5,fontFamily  : 'CairoRegular',color: CONST.color,fontSize:16}}>{I18n.translate('transfer_commission')}</Text>
                            <Form style={[ styles.Width_100, styles.paddingHorizontal_10 ]}>

                                <View style={[ styles.overHidden ]}>
                                    <View style={[styles.imagePickers]}>
                                        <Button onPress={this._pickImage} style={styles.clickOpen}>
                                            { <Image source={{ uri: image }} style={[styles.imgePrives]} />}
                                        </Button>
                                    </View>
                                    <Text style={{color:'#0a0a0a',fontFamily  : 'CairoRegular',fontSize: 16 , textAlign:'center'}}>
                                        {I18n.translate('transfer_image')}
                                    </Text>
                                </View>

                                <View style={[ styles.item, { borderColor : (this.state.userNameStatus === 1 ? '#009444' : '#DDD') } ]} >
                                    <Input
                                        placeholder={ I18n.translate('nametran')}
                                        onChangeText={(userName) => this.setState({userName})}
                                        style={[styles.input, styles.height_50, { paddingRight : 10,paddingLeft : 10}]}
                                    />
                                </View>

                                <View style={[ styles.item, { borderColor : (this.state.numAccStatus === 1 ? '#009444' : '#DDD') } ]} >
                                    <Input
                                        placeholder={ I18n.translate('numtran')}
                                        onChangeText={(numAcc) => this.setState({numAcc})}
                                        style={[styles.input, styles.height_50, { paddingRight : 10,paddingLeft : 10}]}
                                    />
                                </View>

                                <View style={[ styles.item, { borderColor : (this.state.countNumStatus === 1 ? '#009444' : '#DDD') } ]} >
                                    <Input
                                        placeholder={ I18n.translate('montran')}
                                        onChangeText={(countNum) => this.setState({countNum})}
                                        style={[styles.input, styles.height_50, { paddingRight : 10,paddingLeft : 10}]}
                                    />
                                </View>

                                <TouchableOpacity style={[{ backgroundColor : '#363636'} , styles.flexCenter, styles.width_150, styles.height_50, styles.marginVertical_10 ]} onPress={ ()=> this.sendData()} >
                                    <Text style={[ styles.text_White, styles.textRegular, styles.textSize_16 ]}>
                                        {I18n.translate('sendButton')}
                                    </Text>
                                </TouchableOpacity>

                            </Form>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>


                <Modal onBackdropPress={() => this.setState({ commissionModal: false })} isVisible={this.state.commissionModal}>
                    <View style={styles.model}>
                        <View style={[styles.paddingVertical_10 , {width:'100%'}]}>

                            <Text style={[ styles.textBold, styles.textCenter, styles.textSize_14, styles.text_black, { marginBottom : 20 }]}>
                                {I18n.translate('addWe')}
                            </Text>

                            <View style={[ styles.Width_100, styles.paddingHorizontal_10 ]}>

                                <View style={[styles.Width_100, styles.marginVertical_10]}>

                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_gray,{writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'} ]}>
                                        {I18n.translate('ifbay')}
                                    </Text>

                                    <View style={[styles.Width_100, styles.marginVertical_5]}>
                                        <View style={[ styles.item, styles.height_50 ,{ borderColor : (this.state.valOneStatus === 1 ? '#009444' : '#DDD') } ]} >
                                            <Input
                                                placeholder={ I18n.translate('saleop')}
                                                // onChangeText={(valOne) => this.setState({valOne})}
                                                onChangeText={(keyword)=> this.handleKeyUp(keyword)}
                                                style={[styles.input, styles.height_50]}
                                                onBlur={() => this.unActiveInput('valOne')}
                                                onFocus={() => this.activeInput('valOne')}
                                                keyboardType={'number-pad'}
                                            />
                                        </View>
                                    </View>
                                </View>


                                <View style={[styles.Width_100, styles.marginVertical_10]}>

                                    <Text style={[ styles.textRegular, styles.textSize_14, styles.text_gray,{writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'} ]}>
                                        {I18n.translate('serbay')}
                                    </Text>

                                    <View style={[styles.Width_100, styles.marginVertical_5]}>
                                        <View style={[ styles.item, styles.height_50 , styles.paddingHorizontal_10 ,{ justifyContent : 'center' ,borderColor : (this.state.valTwoStatus === 1 ? '#009444' : '#DDD') } ]} >
                                            <Text style={[ styles.textRegular, styles.textSize_14, styles.text_gray,{writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'} ]}>
                                                { this.state.priceNum }
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_red, styles.textCenter ]}>
                                    { this.state.textErr }
                                </Text>

                                <TouchableOpacity
                                    style={[ styles.bg_black, styles.width_150, styles.height_50, styles.marginVertical_10, styles.flexCenter ]}
                                    onPress={ ()=> this.commissionModal()}
                                >
                                    <Text style={[ styles.text_White, styles.textRegular, styles.textSize_16 ]}>
                                        {I18n.translate('sendButton')}
                                    </Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </Modal>


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
export default connect(mapStateToProps,{profile})(Commission);
