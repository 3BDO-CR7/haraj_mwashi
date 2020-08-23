import React, { Component } from 'react';
import {StyleSheet, Text, Image, View, Dimensions, FlatList, TouchableOpacity, Animated} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Button, Icon, Title, Item} from 'native-base';
import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
const  base_url = 'http://plus.4hoste.com/api/';
import {profile} from "../actions";
import CONST from '../consts';
import styles from '../../assets/style'
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import {NavigationEvents} from "react-navigation";
const width = Dimensions.get('window').width;

class WatchLater extends Component {

    constructor(props) {
        super(props);
        this.state = {lang : this.props.lang,spinner: false, text: '',favourites : []};
        this.setState({spinner: true});
    }
    componentWillMount() {
        this.runPlaceHolder()
        this.props.profile({  user_id: this.props.auth.data.id  });
        this.setState({spinner: true});
        axios.post(`${CONST.url}last-seen`, { lang: this.props.lang , user_id : this.props.auth.data.id})
            .then( (response)=> {
                this.setState({favourites: response.data.data});
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    _renderItem = ({item,i}) => (

        <View style={{flexBasis:'50%', overflow : 'hidden' }}>
            <TouchableOpacity onPress={() => { this.props.navigation.navigate({routeName: 'details', params: {blog_id: item.id,}, key: 'APage' + i})}}>
                <View style={[styles.block_section_mero ]}>
                    <View style={{ position : 'relative', overflow : 'hidden' }}>
                        <Image style={styles.image_MAZAD} source={{uri:item.img}}/>
                        <Text style={[styles.textDate,{textAlign:'right',fontSize : 10 , fontFamily :'CairoBold'}]}>{item.date}</Text>
                    </View>
                    <View style={[ styles.overHidden, styles.paddingVertical_5, styles.paddingHorizontal_5  ]}>
                        <View style={{ flexDirection:'row', width: '100%' }}>
                            <Text style={{  fontSize : 13,color : '#757575', fontFamily : 'CairoBold', marginBottom : 5}}
                                  numberOfLines={1} ellipsizeMode='tail'>
                                {item.title}
                            </Text>
                        </View>
                        <View style={{ flexDirection:'row', width: '100%', alignItems : 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection:'row', flexBasis : '50%', overflow : 'hidden', paddingHorizontal : 2, alignItems : 'center'}}>
                                <Icon style={[styles.text_darkGreen, styles.textSize_9, { marginHorizontal : 3 } ]} type="FontAwesome5" name='user-alt'/>
                                <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                    { item.user}
                                </Text>
                            </View>
                            <View style={{ flexDirection:'row', flexBasis : '50%', overflow : 'hidden', paddingHorizontal : 2, justifyContent : 'flex-end', alignItems : 'center'}}>
                                <Icon style={[styles.text_darkGreen ,styles.textSize_9, { marginHorizontal : 3 }]} type="Fontisto" name='map-marker-alt'/>
                                <Text style={[ styles.textRegular, styles.text_gray , styles.textSize_11 ]} numberOfLines={1} ellipsizeMode='tail'>
                                    { item.country}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );

    _keyExtractor = (item, index) => item.id;
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
    noResults() {
        return (
            <View>
                <View style={[ styles.no_data, {flexGrow : 1 } ]}>
                    <Image style={{ width  : 150, height : 150 }} source={require('../../assets/no_data.png')} resizeMode={"contain"}/>
                </View>
            </View>
        );
    }

    onFocus(){
        this.componentWillMount()
    }


    render() {
        this.loadingAnimated = [];
        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                <Header style={styles.Header_Up}>
                    <Body style={[styles.body_header,styles.textHead]}>
                        <Title style={styles.headerTitle}>{I18n.translate('watchLater')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>
                <Content contentContainerStyle={{ flexGrow: 1 }}>
                    { (this.state.favourites.length === 0 && this.state.spinner === false) ? this.noResults() : null}

                    <View style={[ styles.rowGroup ]}>
                        {
                            this.state.spinner ?
                                this._renderRows(this.loadingAnimated, 5, '5rows')
                                :
                                <FlatList
                                    data={this.state.favourites}
                                    style={styles.flatList}
                                    keyExtractor={this._keyExtractor}
                                    onEndReachedThreshold={0.5}
                                    renderItem={this._renderItem}
                                    numColumns={2}
                                />
                        }
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
export default connect(mapStateToProps, {profile})(WatchLater);

