import React, { Component } from 'react';
import { Text, Image, View, I18nManager, TouchableOpacity,} from 'react-native';
import  { Container, Content, Header, Left, Body, Right, Button, Icon, Title,} from 'native-base';
import Tabs from './Tabs';
import {connect} from "react-redux";
import {profile} from "../actions";
import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import {NavigationEvents} from "react-navigation";
import CONST from '../consts';
import styles from '../../assets/style'
class Chat extends Component {
    constructor(props) {
        super(props);
        I18nManager.forceRTL(true);
        this.state = {
            conversations : [],
            spinner : false,
            lang : 'ar'
        };
    }

 async  componentWillMount() {
      this.setState({spinner: true});
      axios.post(`${CONST.url}conversations`, { lang: this.props.lang , user_id : this.props.auth.data.id })
          .then( (response)=> {
                  this.setState({conversations: response.data.data});
          })
          .catch( (error)=> {
              console.warn(error);
              this.setState({spinner: false});
          }) .then( ()=> {
          this.setState({spinner: false});
      })
  }
    onFocus() {
        this.componentWillMount();
    }

    goRoom(other,room)
    {
         this.props.navigation.navigate('chatroom' , {
             other,
             room
         })
    }

    noResults() {
        return (
            <View>
                <View style={[ styles.no_data, {flexGrow : 1 } ]}>
                    <Image style={{ width  : 150, height : 150, top : -20 }} source={require('../../assets/no_data.png')} resizeMode={"contain"}/>
                </View>
            </View>
        );
    }

  render() {
    return (
      <Container>
          {/*<Spinner visible={this.state.spinner}/>*/}
          <NavigationEvents onWillFocus={() => this.onFocus()} />
          <Header style={styles.Header_Up}>
              <Left style={[ styles.RightDir ]}>
                  <Button transparent onPress={() => this.props.navigation.navigate('mune')}>
                      <Icon style={styles.icons} type="Octicons" name='three-bars' />
                  </Button>
              </Left>
              <Body style={[styles.body_header, styles.textHead, { right : 10 }]}>
                <Title style={styles.headerTitle}>{I18n.translate('chat')}</Title>
              </Body>
          </Header>
        <Content contentContainerStyle={{ flexGrow: 1 }}>

            { (this.state.conversations.length === 0 && this.state.spinner === false) ? this.noResults() : null}

            {
                this.state.conversations.map((chat, i) => {
                    return (
                        <TouchableOpacity onPress={() => {this.goRoom(chat.other,chat.room)}}>
                            <View key={i} style={[styles.chat, styles.paddingVertical_10 ,styles.paddingHorizontal_10 ,{borderBottomWidth : 1 ,borderBottomColor:'#f5f5f5', margin : 0}]}>
                                <View style={[ styles.imgUser, { flexBasis : '15%' } ]}>
                                    <Image style={styles.imgUser} source={{uri : chat.image}}/>
                                </View>
                                <View style={[ styles.overHidden , { flexBasis : '85%' } ]}>
                                    <View style={{justifyContent:'space-between' , flexDirection:'row', alignItems : 'center'}}>
                                        <Text style={[ styles.textSize_14, styles.textRegular, styles.text_black,{color : CONST.color}]}>
                                            {chat.username}
                                        </Text>
                                        <Text style={[ styles.textSize_14, styles.textRegular, styles.text_red ]}>
                                            {chat.date}
                                        </Text>
                                    </View>
                                    <Text style={[ styles.textSize_14, styles.textRegular, styles.text_gray, styles.textLeft]} numberOfLines = { 1 } ellipsizeMode = 'head'>
                                        {chat.msg}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                })
            }
        </Content>
        <Tabs routeName="chat" navigation={this.props.navigation}/>
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
export default connect(mapStateToProps, {profile})(Chat);


