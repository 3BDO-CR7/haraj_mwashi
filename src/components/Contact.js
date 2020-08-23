import React, { Component } from 'react';
import {Platform, Text, Image, View, Linking, TouchableOpacity} from 'react-native';
import {Container, Content, Button, Icon, Title, Header, Body, Right,Left} from 'native-base';
import I18n from "ex-react-native-i18n";
import axios from "axios";
import {connect} from "react-redux";
import {profile} from "../actions";
import CONST from '../consts';
import styles from '../../assets/style'
import {NavigationEvents} from "react-navigation";
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state        = {
            phone         : '',
            lang          : '',
            email         : '',
            address       : '',
            latitude      : 24.7136,
            longitude     : 46.6753,
            spinner       : false,
        }
    }


    componentWillMount() {
        this.setState({spinner: true});
        axios.post(`${CONST.url}site_help`, { lang: this.props.lang  })
            .then( (response)=> {
                this.setState({phone: response.data.data,email: response.data.email,address: response.data.address,latitude: response.data.latitude,longitude: response.data.longitude});
            }).catch( (error)=> {
            this.setState({spinner: false});
        }).then(()=>{
            this.setState({spinner: false});
        });
    }

    onFocus(){
        this.componentWillMount()
    }

    render() {

        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('help')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <View style={[ styles.overHidden , { paddingHorizontal : 50, marginTop : 50 } ]}>

                        <TouchableOpacity style={[ styles.block_item , styles.marginVertical_10 ]} onPress={() => {Linking.openURL('tel://' + this.state.phone )}}>
                            <View style={[styles.icon_style , { backgroundColor : '#DEECFF'}]}>
                                <Icon style={[styles.icon , {color : "#5A9FFF"}]} type="Ionicons" name='ios-phone-portrait' />
                            </View>
                            <View>
                                <Text style={[styles.textRegular, styles.textSize_14 , styles.textLeft ,{color : "#5A9FFF"}]}>{ I18n.translate('via_call')} </Text>
                                <Text style={[styles.textEnemy , styles.textLeft]}>{ this.state.phone }</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[ styles.block_item , styles.marginVertical_10 ]} onPress={() => {Linking.openURL('http://api.whatsapp.com/send?phone=' + this.state.phone )}}>
                            <View style={[styles.icon_style , { backgroundColor : '#CBFFE5' }]}>
                                <Icon style={[styles.icon , {color : "#35C430"}]} type="FontAwesome" name='whatsapp' />
                            </View>
                            <View>
                                <Text style={[styles.textRegular, styles.textSize_14 , styles.textLeft , {color : "#35C430"}]}> {I18n.translate('via_wts')}</Text>
                                <Text style={[styles.textEnemy , styles.textLeft]}>{ this.state.phone }</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[ styles.block_item , styles.marginVertical_10 ]} onPress={() => {Linking.openURL('mailto:' + this.state.email )}}>
                            <View  style={[styles.icon_style , { backgroundColor : '#FFD0CB' }]}>
                                <Icon style={[styles.icon , {color : "#E34141"}]} type="Entypo" name='email' />
                            </View>
                            <View>
                                <Text style={[styles.textRegular, styles.textSize_14 , styles.textLeft ,{color : "#E34141"}]}> {I18n.translate('via_email')}</Text>
                                <Text style={[styles.textEnemy , styles.textLeft]}>{ this.state.email }</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </Content>
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
export default connect(mapStateToProps, {profile})(Contact);


