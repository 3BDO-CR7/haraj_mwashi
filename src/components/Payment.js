import React, { Component } from "react";
import {View, Text, StyleSheet, WebView, } from "react-native";
import {Container, Header, Button, Footer, FooterTab, Body, Title, Right, Icon} from 'native-base'
import styles from '../../assets/style'
import {connect}         from "react-redux";
import {profile} from "../actions";
import I18n from "ex-react-native-i18n";
class Payment extends Component {
    constructor(props){
        super(props);

        this.state=
            {
                who_are_we : '',
                isLoaded   : false
            }
    }

    render() {
        return (
            <Container>
                <Header style={[styles.Header_Up]}>
                    <Body style={styles.body_header}>
                    <Title style={styles.headerTitle}>{I18n.translate('online_payment')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.navigate('home')} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                <View style={style.container}>
                    <WebView
                        source= {{uri: this.props.navigation.state.params.url}}
                        style= {style.loginWebView}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        javaScriptEnabled={true}

                    />

                </View>

            </Container>

        );
    }
}


const style = StyleSheet.create({
    container: {
        height:'90%',
        width:'100%',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    loginWebView: {
        flex   : 1 ,
        width  : '100%'
    }});

const mapStateToProps = ({ auth, lang ,profile }) => {

    return {
        auth      : auth.user,
        lang      : lang.lang,
        user      : profile.user,
     };
};
export default connect(mapStateToProps, {profile})(Payment);



