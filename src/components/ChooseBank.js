import React, { Component } from 'react';
import {Container, Content, Button, Icon, Title, Header, Body, Right, Left, CheckBox, Toast, Input} from 'native-base';
import I18n from "ex-react-native-i18n";
// import Spinner from "react-native-loading-spinner-overlay";
import axios from "axios";
import {connect} from "react-redux";
import {profile} from "../actions";
import CONST from '../consts';
import styles from '../../assets/style'
import {TouchableOpacity, Text, View, Image, Dimensions, I18nManager} from "react-native";
import HTML from "react-native-render-html";
import Modal from "react-native-modal";
class ChooseBank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bank                : null ,
            selectedId          : null,
            checked             : null,
            spinner             : false,
            text                : '' ,
            lang            : this.props.lang,
            banks               : [],
            bankImg             : '',
            bankName            : '',
            bankNumber          : '',
            valOneStatus        : 0,
            commissionModal     : false,
            valTwoStatus        : 0,
            textErr             : '',
            priceNum            : 0
        };
        this.setState({spinner: true});
    }

    componentWillMount() {
        this.setState({spinner: true});
        axios.post(`${CONST.url}commission_info`, { lang: this.props.lang  })
            .then( (response)=> {
                this.setState({
                    site_commission: response.data.data.site_commission,
                    text: response.data.data.site_commission_notes
                });
                axios.post(`${CONST.url}banks`, { lang: this.props.lang })
                    .then( (response)=> {
                        this.setState({banks: response.data.data});
                    }).then(()=>{
                    this.setState({spinner: false , commissionModal:true});
                });
            })
    }

    selectBankId(id,name,number,image) {
        this.setState({
            checked  : id,
        });
        this.state.selectedId       = id;
        this.state.bankImg          = image;
        this.state.bankNumber       = number;
        this.state.bankName         = name;
    }

    moveBank(){
        if(this.state.selectedId === null)
        {
            // Toast.show({
            //     text        : I18n.translate('choose_bank'),
            //     duration    : 2000 ,
            //     type        : "danger",
            //     textStyle   : {
            //         color       : "white",
            //         fontFamily  : 'CairoRegular',
            //         textAlign   : 'center'
            //     }
            // });
            CONST.showToast(I18n.translate('choose_bank'),'danger')

        }else{
            this.props.navigation.navigate('commission',{
                id                  : this.state.selectedId,
                bankName            : this.state.bankName,
                bankImg             : this.state.bankImg,
                bankNumber          : this.state.bankNumber,
                priceNum            : JSON.stringify(this.state.priceNum),
            })
        }
    }
    commissionModal(){
        this.setState({ commissionModal: !this.state.commissionModal });
        console.log('priceNum', this.state.priceNum)
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

    show_alert(){
        alert(I18n.translate('dsa'));
    }
    handleKeyUp(keyword) {
        const total = (keyword * 1 / 100);
        setTimeout(()=>{
            this.setState({ priceNum : total });
        },500);
    }

    render() {
        return (
            <Container>
                <Header style={[styles.Header_Up]}>
                    <Body style={[styles.body_header,styles.textHead]}>
                    <Title style={styles.headerTitle}>{I18n.translate('choose_bank')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                {/*<Spinner visible={this.state.spinner}/>*/}
                <Content>
                    <View style={{flexDirection : 'row' ,justifyContent:'center',alignItems:'center' , borderWidth : .5 , borderColor : CONST.color}}>
                        <Text style={{textAlign:'center' ,fontFamily : 'CairoBold' , marginVertical: 20,fontSize:20, color :'#BBB'}}>{I18n.translate('total_commission')} </Text>
                        <Text> : </Text>
                        <Text  style={{textAlign:'center' ,fontFamily : 'CairoBold',fontSize:22, color :'#F00'}}>{this.state.priceNum} {I18n.translate('rs')} </Text>
                    </View>

                    <View style={[ styles.paddingHorizontal_15, styles.paddingVertical_10 ]}>
                        <HTML
                            html                  = {this.state.site_commission}
                            imagesMaxWidth        = {Dimensions.get('window').width}
                            baseFontStyle         = {{
                                fontSize            : 14,
                                fontFamily          : 'CairoRegular' ,
                                color               : CONST.dark,
                                writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                            }}
                        />
                        <HTML
                            html                  = {this.state.text}
                            imagesMaxWidth        = {Dimensions.get('window').width}
                            baseFontStyle         = {{
                                fontSize            : 14,
                                fontFamily          : 'CairoRegular' ,
                                color               : CONST.dark,
                                writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                            }}
                        />
                    </View>

                    <View style={[ styles.Width_90, styles.flexCenter ]}>
                        {this.state.banks.map((bank, i) => {
                            return (
                                <TouchableOpacity
                                    onPress             = {() => this.selectBankId(bank.id,bank.name,bank.account_number,bank.image)}
                                    style               = {[ styles.marginVertical_5, styles.paddingHorizontal_5, styles.paddingVertical_5, styles.Width_100, styles.SelfCenter, styles.position_R]}>
                                    <TouchableOpacity
                                        style               = {[styles.position_A , { top : 10, right : 25 , zIndex : 999 }]}
                                        onPress             = {() => this.selectBankId(bank.id,bank.name,bank.account_number,bank.image)}
                                    >
                                        <CheckBox
                                            style               = {[styles.checkBox ,{ backgroundColor : '#363636', borderColor : '#363636', borderWidth : 1, }]}
                                            color               = {styles.text_White}
                                            selectedColor       = {styles.text_White}
                                            checked             = {this.state.checked === bank.id}
                                            onPress             = {() => this.selectBankId(bank.id,bank.name,bank.account_number,bank.image)}
                                        />
                                    </TouchableOpacity>
                                    <View style={[ styles.Border, styles.border_gray, styles.bg_White, styles.paddingHorizontal_10, styles.paddingVertical_5 ,styles.rowFlex, styles.Width_100, styles.position_R, { zIndex : -1 } ]}>
                                        <View style={[ styles.Bank, styles.Radius_5, styles.Border, styles.opcity_gray, styles.Radius_5, styles.bg_White, styles.flex_30 ]}>
                                            <Image style={[styles.Width_100, styles.height_80]} source={{ uri: bank.image }} resizeMode={'cover'}/>
                                        </View>
                                        <View style={[ styles.overHidden, styles.paddingHorizontal_10, styles.flex_70 ]}>
                                            <View style={[ styles.rowFlex ]}>
                                                <Text style={[styles.textRegular, styles.textSize_14, styles.text_gray]}>{ I18n.translate('accountName')}</Text>
                                                <Text style={[styles.textRegular, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                                <Text style={[styles.textRegular, styles.textSize_12,]}>{ bank.name }</Text>
                                            </View>
                                            <View style={[ styles.rowFlex ]}>
                                                <Text style={[styles.textRegular, styles.textSize_14,]}>{ I18n.translate('account_number')}</Text>
                                                <Text style={[styles.textRegular, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                                <Text style={[styles.textRegular, styles.textSize_12]}>{ bank.account_number }</Text>
                                            </View>
                                            <View style={[ styles.rowFlex ]}>
                                                <Text style={[styles.textRegular, styles.textSize_14,]}>{ I18n.translate('iban_number')}</Text>
                                                <Text style={[styles.textRegular, styles.textSize_14, styles.marginHorizontal_5]}>:</Text>
                                                <Text style={[styles.textRegular, styles.textSize_12]}>{ bank.iban_number }</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}

                    </View>
                    <TouchableOpacity style={styles.clickMore} onPress={() => this.moveBank()}>
                        <Text style={styles.textMore}> {I18n.translate('send')}</Text>
                    </TouchableOpacity>




                </Content>

                <Modal isVisible={this.state.commissionModal} avoidKeyboard={true}>
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
                                        <View style={[ styles.item, styles.height_50 ,{ borderColor : (this.state.valOneStatus === 1 ? '#cf5936' : '#DDD') } ]} >
                                            <Input
                                                placeholder={ I18n.translate('saleop')}
                                                onChangeText={(keyword)=> this.handleKeyUp(keyword)}
                                                style={[styles.input, styles.height_50]}
                                                onBlur={()  => this.unActiveInput('valOne')}
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
                                        <View style={[ styles.item, styles.height_50 , styles.paddingHorizontal_10 ,{ justifyContent : 'center' ,borderColor : (this.state.valTwoStatus === 1 ? '#cf5936' : '#DDD') } ]} >
                                            <Text style={[ styles.textRegular, styles.textSize_14, styles.text_gray,{writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'} ]}>
                                                { this.state.priceNum }
                                            </Text>
                                        </View>
                                    </View>
                                </View>

                                <Text style={[ styles.textRegular, styles.textSize_14, styles.text_red, styles.textCenter ]}>
                                    { this.state.textErr }
                                </Text>

                                <View style={{flexDirection :'row' , justifyContent :'space-between' , alignItems:'center'}}>
                                    <TouchableOpacity
                                        style={[ styles.bg_black, styles.width_150, styles.height_50, styles.Radius_5, styles.marginVertical_10, styles.flexCenter ]}
                                        onPress={ ()=> this.state.priceNum !== 0 && this.state.priceNum !== 'NaN' ?  this.commissionModal() : this.show_alert()}
                                    >
                                        <Text style={[ styles.text_White, styles.textRegular, styles.textSize_16 ]}>
                                            {I18n.translate('sendButton')}
                                        </Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[ styles.bg_red, styles.width_150, styles.height_50, styles.Radius_5, styles.marginVertical_10, styles.flexCenter ]}
                                        onPress={ ()=> this.props.navigation.navigate('home')}
                                    >
                                        <Text style={[ styles.text_White, styles.textRegular, styles.textSize_16 ]}>
                                            {I18n.translate('cancel')}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
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
export default connect(mapStateToProps,{profile})(ChooseBank);



