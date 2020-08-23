import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, I18nManager,Dimensions } from 'react-native';
import  { Container, Content, Header, Left, Body, Right, Button, Icon, Title} from 'native-base';
import I18n from "ex-react-native-i18n";
// import Spinner from "react-native-loading-spinner-overlay";
import axios   from 'axios';
import {connect} from "react-redux";
import {profile} from "../actions";
import HTML from 'react-native-render-html';

const  base_url = 'http://plus.4hoste.com/api/';
import * as Animatable from 'react-native-animatable';
import CONST from '../consts';
import styles from '../../assets/style'
import {NavigationEvents} from "react-navigation";


class Terms extends Component {


    constructor(props) {
        super(props);
         this.state    = { spinner  : false, text     :   ''};
         this.setState({spinner: true});



    }
  componentWillMount() {

      this.setState({spinner: true});

      axios.post(`${CONST.url}termsAndConditions`, { lang: this.props.lang  })
          .then( (response)=> {
              this.setState({text: response.data.data});
          })
          .catch( (error)=> {
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
                  <Title style={styles.headerTitle}>{I18n.translate('terms')}</Title>
              </Body>
              <Right style={[ styles.RightDir]}>
                  <Button transparent onPress={()=> this.props.navigation.goBack()} >
                      <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                  </Button>
              </Right>
          </Header>
      <Content>
          <View style={styles.blockAbout}>

              {/*<Spinner visible={this.state.spinner}/>*/}

              <View style={styles.overHidden}>
                  <Animatable.View animation="zoomIn" easing="ease-out" delay={1000}>
                      <Image style={styles.logo} source={require('../../assets/lang.png')}/>
                  </Animatable.View>
              </View>

              <View style={[{width: '90%'}]}>
                  <HTML
                      html                  = {this.state.text}
                      baseFontStyle         = {{
                        fontSize            : 14,
                        fontFamily          : 'CairoRegular' ,
                        color               : CONST.dark,
                        writingDirection    : I18nManager.isRTL ? 'rtl' : 'ltr'
                      }}
                        imagesMaxWidth      = {Dimensions.get('window').width}
                  />
              </View>

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
export default connect(mapStateToProps, {profile})(Terms);


