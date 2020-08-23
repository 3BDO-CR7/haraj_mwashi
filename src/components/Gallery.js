import React, { Component } from 'react';
import {Image, View, TouchableOpacity, Linking, Animated, Dimensions} from 'react-native';
import {Container, Content, Button, Icon, Title, Header, Left, Body, Right} from 'native-base';
import Tabs from './Tabs';
import axios from "axios";
import I18n from "ex-react-native-i18n";
import {connect} from "react-redux";
import {profile} from "../actions";
import {NavigationEvents} from "react-navigation";
import CONST from '../consts';
import styles from '../../assets/style'
import MasonryList from "react-native-masonry-list";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
const width = Dimensions.get('window').width;

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lang               : 'ar',
            spinner            : false,
            categories         : [],
            page               : 0,
            category_id        : null,
            sub_category_id    : null,
            sub_categories     : [],
            images             : [],
            blogs              : []
        };
    }

    onFocus() {
        this.componentWillMount();
    }

    async componentWillMount() {
        this.runPlaceHolder();
        this.setState({lang: this.props.lang});
        this.addMoreImages();
  }

    _renderRows(loadingAnimated, numberRow, uniqueKey) {
        let shimmerRows = [];
        for (let index = 0; index < numberRow; index++) {
            shimmerRows.push(
                <ShimmerPlaceHolder
                    key={`loading-${index}-${uniqueKey}`}
                    ref={(ref) => loadingAnimated.push(ref)}
                    style={{marginVertical: 7, alignSelf: 'center'}}
                    width={width - 20}
                    height={100}
                    colorShimmer={['#ffffff75', '#f2f0ff', '#ffffff75']}
                />
            )
        }
        return (
            <View>
                {shimmerRows}
            </View>
        )
    }

    runPlaceHolder() {
        if (Array.isArray(this.loadingAnimated) && this.loadingAnimated.length > 0) {
            Animated.parallel(
                this.loadingAnimated.map(animate => {
                    if (animate&&animate.getAnimated) {
                        return animate.getAnimated();
                    }
                    return null;
                }),
                {
                    stopTogether: false,
                }
            ).start(() => {
                this.runPlaceHolder();
            })
        }
    }

    addMoreImages() {
        if(this.state.spinner === false) {
            this.setState({spinner: true, page: this.state.page + 1}, () => {
                axios.post(`${CONST.url}photoBlog`, {
                     lang  : this.props.lang,
                 //  page  : this.state.page,

                }).then( (response)=> {
                    this.setState({blogs: this.state.blogs.concat(response.data.data),spinner: false});
                })
            });
        }
    }
    render() {
      this.loadingAnimated = [];
      return (
      <Container>
          <NavigationEvents onWillFocus={() => this.onFocus()} />
          <Header style={[styles.Header_Up]}>
              <Left style={[ styles.RightDir]}>
                  <Button transparent onPress={() => this.props.navigation.navigate('mune')}>
                      <Icon style={styles.icons}  type="Feather" name='align-right'/>
                  </Button>
              </Left>
              <Body style={[styles.body_header, styles.textHead, { right : 10 }]}>
                  <Title style={styles.headerTitle}>{I18n.translate('photo_ads')}</Title>
              </Body>
          </Header>
        <Content contentContainerStyle={{ flexGrow: 1 }}>
            {
                this.state.spinner ?
                    this._renderRows(this.loadingAnimated, 5, '5rows')
                    :
            <View style={[ styles.rowGroup, styles.Width_100 ]}>
                <MasonryList
                    onPressImage ={(item) => {(item.url) ? Linking.openURL('https://' + item.url) : Linking.openURL(item.img)}}
                    images       ={this.state.blogs}
                    rerender=    {true}
                    // onEndReached={() => {
                    //     this.addMoreImages();
                    // }}
                />
            </View>
            }
        </Content>
        <Tabs routeName="gallery"  navigation={this.props.navigation}/>
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
export default connect(mapStateToProps, {profile})(Gallery);




