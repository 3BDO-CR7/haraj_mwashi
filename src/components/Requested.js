import React, { Component } from 'react';
import {StyleSheet, Text, Image, View, I18nManager, FlatList, TouchableOpacity} from 'react-native';
import {Container, Content, Header, Left, Body, Right, Button, Icon, Title, Item} from 'native-base';

import I18n from "ex-react-native-i18n";
import axios from "axios";
// import Spinner from "react-native-loading-spinner-overlay";
import {connect} from "react-redux";
import {profile} from "../actions";
const  base_url = 'http://plus.4hoste.com/api/';
import CONST from '../consts';
import styles from '../../assets/style'
import {NavigationEvents} from "react-navigation";

class Requested extends Component {

    constructor(props) {
        super(props);

         this.state = {lang : 'ar',spinner: false, text: '',favourites : []};

     }


    componentWillMount() {

        this.props.profile({  user_id: this.props.auth.data.id  });

        this.setState({spinner: true});

        axios.post(`${CONST.url}requestedAds`, { lang: this.props.lang , user_id : this.props.user.id })
            .then( (response)=> {
                console.warn(response.data.data);
                this.setState({favourites: response.data.data});
            })
            .catch( (error)=> {
                this.setState({spinner: false});
            }).then(()=>{
            this.setState({spinner: false});
        });
    }

    _renderItem = ({item,i}) => (

        <View  style={styles.block_section} >
            <TouchableOpacity onPress={() => { this.props.navigation.navigate(
                {
                    routeName: 'details',
                    params: {
                        blog_id: item.id,
                    },
                    key: 'APage' + i
                }
            ) } }>
                 <Image style={styles.image_MAZAD} resizeMode='cover' source={{uri:item.img}}/>
            <View >
                <Text style={styles.titles}>{item.title}</Text>
                <View style={styles.user_MAZAD}>
                    <View style={styles.views}>
                        <Text style={styles.text_user}>
                            {item.country}
                        </Text>
                        <Icon style={styles.icon_user} type="FontAwesome" name='map-marker'/>
                    </View>
                    <View style={styles.views}>
                        <Text style={styles.text_user}>
                            { item.count}
                        </Text>
                        <Icon style={styles.icon_user} type="FontAwesome" name='image'/>
                    </View>
                </View>
            </View>
            </TouchableOpacity>
        </View>
    );

    onFocus(){
        this.componentWillMount()
    }

    render() {
        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()}/>
                <Header style={styles.Header_Up}>
                    <Body style={[ styles.body_header , styles.textHead ]}>
                        <Title style={styles.headerTitle}>{I18n.translate('requested')}</Title>
                    </Body>
                    <Right style={[ styles.RightDir ]}>
                        <Button transparent onPress={()=> this.props.navigation.goBack()} >
                            <Icon style={styles.icons} type="AntDesign" name={ (this.state.lang !== 'ar' || this.state.lang == null) ? 'right' : 'left' }/>
                        </Button>
                    </Right>
                </Header>

                {/*<Spinner visible={this.state.spinner}/>*/}

                <Content>

                    { (this.state.favourites.length === 0 && this.state.spinner === false) ? this.noResults() : null}

                    <FlatList
                        data={ this.state.favourites}
                        style={styles.flatList}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.5}
                        renderItem={  this._renderItem}
                        numColumns = { 2 }/>

                </Content>

            </Container>
        );

    }

    _keyExtractor = (item, index) => item.id;

    noResults()
    {
        return ( <View><Text style={{marginTop:'50%',textAlign:'center',color:'#ff6649', fontSize:22,fontFamily:'CairoRegular'}}>{I18n.translate('no_results')}</Text></View>);
    }
}

const mapStateToProps = ({ auth, lang ,profile }) => {

    return {
        auth   : auth.user,
        lang   : lang.lang,
        user   : profile.user
    };
};
export default connect(mapStateToProps, {profile})(Requested);


