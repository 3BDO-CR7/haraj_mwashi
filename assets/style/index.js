import {I18nManager,Dimensions} from "react-native";
import COLORS from '../../src/consts/colors'
import CONST from "../../src/consts";
const height    = Dimensions.get('window').height;
const styles = ({
    blockChick : {
        flexDirection       : 'row',
        justifyContent      : "space-around",
        alignItems          : "center"
    },
    imgBank : {
        flexBasis           : '30%',
    },
    textHead : {
        flex : 1.4,
        alignItems : 'center',
        position : 'relative',
        right : -10
    },
    Bank    : {
        width               : 80,
        height              : 80,
        overflow            :'hidden',
    },
    mt60 : {
        marginVertical : 60
    },
    bankInfo : {
        color               : "#a7a6a8",
        fontFamily          : "CairoRegular",
        fontSize            : 13,
    },
    orange:{
        backgroundColor : '#bb4000'
    },
    text_yellow : {
        color               : COLORS.yellow
    },
    text_red : {
        color               : COLORS.red
    },
    filter_scroll:{
        width : 270,
        height :  height,
        position            : 'relative',
        left                : 0,
        top                 : 0,
        alignSelf           : 'flex-end'
    },
    filter_scroll_model:{
        width : 270,
        height :  '105%',
        position            : 'absolute',
        right               : 20,
        top                 : 5,
        backgroundColor     : "#fff",
    },
    starStyle:{
        marginHorizontal    : 1,
    },
    text_brown : {
        color               : COLORS.brown
    },
    mh_15 :{
        marginHorizontal   : 10
    },
    filter_model :{
        width               : 270,
        height              : '100%',
        backgroundColor     : "#fff",
    },
    render_imgs : {
        width : '100%', height: 200
    },
    no_result:{
        width  : 150, height : 150
    },
    text_blue : {
        color  : COLORS.blue
    },
    category_text : {
        fontFamily : 'CairoBold',
        color : '#606060',
        marginVertical : 12
    },
    render_img :{
        width : '47%',
        height: 200,
        margin: 5,
        overflow: 'hidden'
    },
    render_img_container :{
        width : '100%',
        height: 200 ,
        borderWidth : 1,
        borderColor : "#DDD",
        borderRadius : 5
    },
    category_text2 : {
        fontFamily : 'CairoBold',
        color : '#606060' ,
        fontSize: 15,
        textAlign: 'center' ,
        marginTop : 20
    },
    overflow :{
        overflow      : 'hidden',
    },
    category_img : {
        width       : 70 ,
        height      : 70 ,
        borderRadius: 35 ,
        borderWidth :  .5,
        borderColor : '#bbb'
    },
    category_imgs : {
        width       : 100 ,
        height      : 100 ,
        borderRadius: 50 ,
    },
    text_gray : {
        color: COLORS.gray
    },
    category_scrollView : {
        justifyContent:'center' ,
        alignItems:'center' ,
        flexDirection:'row' ,
        marginVertical: 20 ,
        marginHorizontal: 10
    },
    text_lightWhite : {
        color               : COLORS.lightWhite
    },
    text_toby : {
        color               : COLORS.toby
    },
    text_bom : {
        color               : '#ced09b'
    },
    text_headers : {
        fontFamily : 'CairoBold',
        color : '#7c7c7c' ,
        fontSize: 15,
        textAlign: 'center' ,
        marginTop : 30
    },
    text_headers2 : {
        fontFamily : 'CairoBold',
        color : '#7c7c7c' ,
        fontSize: 15,
        textAlign: 'center' ,
        marginTop : 30
    },
    body_container : {
        justifyContent:'center' ,
        alignItems:'center' ,
        flexDirection:'row' ,
        marginVertical: 20,
    },
    body_child  : {
        justifyContent:'center' ,
        alignItems:'center' ,
        marginHorizontal : 10
    },
    text_orange : {
        color               : COLORS.orange
    },
    text_light_oran : {
        color               : COLORS.light_oran
    },
    text_black : {
        color               : COLORS.black
    },
    text_bold_gray : {
        color               : COLORS.bold_gray
    },
    text_light_gray : {
        color               : COLORS.light_gray
    },
    text_White : {
        color               : '#FFF'
    },
    text_pink : {
        color               : '#134949'
    },
    flex : {
        flex : 1,
    },

    // Style Font

    textRegular : {
        fontFamily          : 'CairoRegular',
    },
    textBold : {
        fontFamily          : 'CairoBold'
    },
    textDecoration : {
        textDecorationLine  : "underline"
    },
    fontBold : {
        fontWeight          : "bold"
    },
    fontSpacing: {
        letterSpacing       : 1,
    },
    textSize_11 : {
        fontSize            : 11,
    },
    textSize_12 : {
        fontSize            : 12,
    },
    textSize_13 : {
        fontSize            : 13,
    },
    textSize_14 : {
        fontSize            : 14,
    },
    textSize_16 : {
        fontSize            : 16,
    },
    textSize_18 : {
        fontSize            : 18,
    },
    textSize_20 : {
        fontSize            : 20,
    },
    textSize_22 : {
        fontSize            : 22,
    },
    textSize_24 : {
        fontSize            : 24,
    },
    textSize_26 : {
        fontSize            : 26,
    },
    textSize_28 : {
        fontSize            : 28,
    },
    textSize_30 : {
        fontSize            : 30,
    },
    textSize_32 : {
        fontSize            : 32,
    },

    // Style Direction Text

    textCenter : {
        textAlign           : "center"
    },
    textRight : {
        textAlign           : "right"
    },
    textLeft : {
        textAlign           : "left"
    },

    // Margin Space Vertical

    marginVertical_5 : {
        marginVertical      : 5
    },
    marginVertical_10 : {
        marginVertical      : 10
    },
    marginVertical_15 : {
        marginVertical      : 15
    },
    marginVertical_20 : {
        marginVertical      : 20
    },
    marginVertical_25 : {
        marginVertical      : 25
    },

    // Margin Space Horizontal

    margin_0 : {
        margin    : 0
    },
    marginHorizontal_0 : {
        marginHorizontal    : 0
    },
    marginHorizontal_5 : {
        marginHorizontal    : 5
    },
    marginHorizontal_10 : {
        marginHorizontal    : 10
    },
    marginHorizontal_15 : {
        marginHorizontal    : 15
    },
    marginHorizontal_20 : {
        marginHorizontal    : 20
    },
    marginHorizontal_25 : {
        marginHorizontal    : 25
    },

    // Padding Space Vertical

    padding_0 : {
        padding      : 0
    },
    paddingVertical_0 : {
        paddingVertical      : 0
    },
    paddingVertical_5 : {
        paddingVertical      : 5
    },
    paddingVertical_10 : {
        paddingVertical      : 10
    },
    paddingVertical_15 : {
        paddingVertical      : 15
    },
    paddingVertical_20 : {
        paddingVertical      : 20
    },
    paddingVertical_25 : {
        paddingVertical      : 25
    },

    // Padding Space Horizontal

    paddingHorizontal_0 : {
        paddingHorizontal    : 0
    },
    paddingHorizontal_5 : {
        paddingHorizontal    : 5
    },
    paddingHorizontal_10 : {
        paddingHorizontal    : 10
    },
    paddingHorizontal_15 : {
        paddingHorizontal    : 15
    },
    paddingHorizontal_20 : {
        paddingHorizontal    : 20
    },
    paddingHorizontal_25 : {
        paddingHorizontal    : 25
    },

    // Style Border Radius

    Radius_0 : {
        borderRadius        : 0
    },
    Radius_5 : {
        borderRadius        : 5
    },
    Radius_10 : {
        borderRadius        : 10
    },
    Radius_15 : {
        borderRadius        : 15
    },
    Radius_20 : {
        borderRadius        : 20
    },
    Radius_30 : {
        borderRadius        : 30
    },
    Radius_40 : {
        borderRadius        : 40
    },
    Radius_50 : {
        borderRadius        : 50
    },
    Radius_60 : {
        borderRadius        : 60
    },
    Radius_70 : {
        borderRadius        : 70
    },
    Radius_80 : {
        borderRadius        : 80
    },
    Radius_90 : {
        borderRadius        : 90
    },
    Radius_100 : {
        borderRadius        : 100
    },
    RadiusTop_5 : {
        borderTopLeftRadius   : 5,
        borderTopRightRadius  : 5
    },

    // Background Color

    bg_toby : {
        backgroundColor     : COLORS.toby
    },
    bg_light_oran : {
        backgroundColor     : COLORS.light_oran
    },
    bg_orange : {
        backgroundColor     : COLORS.orange
    },
    bg_green : {
        backgroundColor     : COLORS.darkGreen
    },
    bg_red : {
        backgroundColor     : COLORS.red
    },
    bg_turquoise : {
        backgroundColor      : COLORS.turquoise
    },
    bg_brown : {
        backgroundColor      : COLORS.brown
    },
    bg_blue : {
        backgroundColor      : COLORS.blue
    },
    bg_gray : {
        backgroundColor      : COLORS.gray
    },
    bg_lightWhite : {
        backgroundColor     : COLORS.lightWhite
    },
    bg_black : {
        backgroundColor     : COLORS.black
    },
    bg_yellow : {
        backgroundColor     : COLORS.yellow
    },
    bg_bom : {
        backgroundColor     : '#ced09b'
    },
    bg_overlay : {
        backgroundColor     : "rgba(250, 218, 208, 0.9)"
    },
    overlay_white : {
        backgroundColor     : "rgba(255, 255, 255, 0.7)"
    },
    overlay_black : {
        backgroundColor     : "rgba(0, 0, 0, 0.5)"
    },
    bg_White : {
        backgroundColor     : '#FFF'
    },
    bg_light_gray : {
        backgroundColor     : '#d2d2d2'
    },
    bg_ligth : {
        backgroundColor     : '#134949'
    },

    // Style Border

    borderToby : {
        borderWidth           : 1,
        borderColor           : COLORS.toby
    },
    borderLightOran : {
        borderWidth           : 1,
        borderColor           : COLORS.light_oran
    },
    borderRed : {
        borderWidth           : 1,
        borderColor           : COLORS.orange
    },
    borderGray : {
        borderWidth           : 1,
        borderColor           : COLORS.light_gray
    },
    borderOpcityGray : {
        borderWidth           : 1,
        borderColor           : '#DDD'
    },
    borderBlack : {
        borderWidth           : 1,
        borderColor           : COLORS.black
    },
    borderBold : {
        borderWidth           : 1,
        borderColor           : COLORS.bold_gray
    },
    Border : {
        borderWidth           : 1,
        borderColor           : COLORS.opcity_gray
    },
    Border_Btn_Opc_Gray : {
        borderBottomWidth           : 1,
        borderBottomColor           : COLORS.opcity_gray
    },
    borderBlue : {
        borderBottomWidth           : 1,
        borderBottomColor           : '#134949'
    },
    borderWhite : {
        borderBottomWidth           : 1,
        borderBottomColor           : '#fff'
    },

    // Style Search

    checkBox : {
        paddingLeft             : 0,
        paddingBottom           : 0,
        borderRadius            : 5,
        paddingRight            : 3
    },

    // Style Shadow

    boxShadow : {
        shadowColor             : "#363636",
        shadowOffset            : { width: 0, height: 1},
        shadowOpacity           : 0.22,
        shadowRadius            : 2.22,
        elevation               : 3,
    },

    // Styles Flex Box

    flexCenter : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
    },
    centerContext : {
        alignItems          : 'center',
        justifyContent      : 'center',
    },
    centerColum : {
        alignSelf           : 'center',
    },
    SelfCenter : {
        alignSelf           : 'center',
        justifyContent      : 'center',
    },
    SelfRight : {
        alignSelf           : 'flex-end',
        justifyContent      : 'center',
    },
    SelfLeft : {
        alignSelf           : 'flex-start',
        justifyContent      : 'center',
    },
    justifyCenter : {
        justifyContent      : 'center',
    },
    justifyTop : {
        justifyContent      : 'flex-end',
    },
    justifyBottom : {
        justifyContent      : 'flex-start',
    },
    rowGroup : {
        flexDirection       : "row",
        justifyContent      : "space-between",
        // alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowGroupColumn : {
        flexWrap            : 'wrap'
    },
    rowCenter : {
        flexDirection       : "row",
        alignSelf           : 'center',
        justifyContent      : "center",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    bottomCenter : {
        alignItems          : 'flex-end',
        justifyContent      : 'flex-end',
        alignSelf           : 'center',
    },
    rowRight : {
        flexDirection       : "row",
        alignSelf           : 'flex-start',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    rowLeft : {
        flexDirection       : "row",
        alignSelf           : 'flex-end',
        alignItems          : "center",
        justifyContent      : 'center',
        flexWrap            : 'wrap'
    },
    bgFullWidth : {
        flexGrow            : 1,
    },
    flex_10 : {
        flexBasis           : '10%'
    },
    flex_20 : {
        flexBasis           : '20%'
    },
    flex_25 : {
        flexBasis           : '25%'
    },
    flex_30 : {
        flexBasis           : '30%'
    },
    flex_40 : {
        flexBasis           : '40%'
    },
    flex_45 : {
        flexBasis           : '45%'
    },
    flex_47 : {
        flexBasis           : '47%'
    },
    flex_50 : {
        flexBasis           : '50%'
    },
    flex_60 : {
        flexBasis           : '60%'
    },
    flex_70 : {
        flexBasis           : '70%'
    },
    flex_75 : {
        flexBasis           : '75%'
    },
    flex_80 : {
        flexBasis           : '80%'
    },
    flex_90 : {
        flexBasis           : '90%'
    },
    flex_100 : {
        flexBasis           : '100%'
    },


    //  Style For App

    windowWidth : {
        paddingVertical     : 30,
        width               : '100%',
        height              : '100%',
    },
    bgContent : {
        width               : null,
        height              : null,
        flex                : 1,
    },
    Width_50 : {
        width               : '50%'
    },
    Width_60 : {
        width               : '60%'
    },
    Width_70 : {
        width               : '70%'
    },
    Width_80 : {
        width               : '80%'
    },
    Width_90 : {
        width               : '90%'
    },
    Width_100 : {
        width               : '100%'
    },
    width_20 : {
        width               : 20
    },
    width_30 : {
        width               : 30
    },
    width_40 : {
        width               : 40
    },
    width_50 : {
        width               : 50
    },
    width_60 : {
        width               : 60
    },
    width_70 : {
        width               : 70
    },
    width_80 : {
        width               : 80
    },
    width_90 : {
        width               : 90
    },
    width_100 : {
        width               : 100
    },
    width_120 : {
        width               : 120
    },
    width_130 : {
        width               : 130
    },
    width_150 : {
        width               : 150
    },
    width_170 : {
        width               : 170
    },
    width_200 : {
        width               : 200
    },
    width_250 : {
        width               : 250
    },
    height_10 : {
        height               : 10
    },
    height_20 : {
        height               : 20
    },
    height_30 : {
        height               : 30
    },
    height_40 : {
        height               : 40
    },
    height_50 : {
        height               : 50
    },
    height_60 : {
        height               : 60
    },
    height_70 : {
        height               : 70
    },
    height_80 : {
        height               : 80
    },
    height_90 : {
        height               : 90
    },
    height_100 : {
        height              : 100
    },
    height_120 : {
        height              : 120
    },
    height_150 : {
        height              : 150
    },
    height_200 : {
        height              : 200
    },
    height_250 : {
        height              : 250
    },
    heightFull : {
        height              : '100%'
    },
    minHeight : {
        minHeight           :  150
    },
    overHidden : {
        overflow            : 'hidden'
    },

    // Style position

    position_R : {
        position                : 'relative',
        zIndex                  : 999
    },
    position_A : {
        position                : 'absolute',
        zIndex                  : 9999
    },
    fixItem : {
        top                     : -20,
        right                   : -20
    },
    top_0 : {
        top                     : 0
    },
    top_5 : {
        top                     : 5
    },
    top_10 : {
        top                     : 10
    },
    top_15 : {
        top                     : 15
    },
    top_20 : {
        top                     : 20
    },
    top_25 : {
        top                     : 25
    },
    top_30 : {
        top                     : 30
    },
    top_35 : {
        top                     : 35
    },
    bottom_0 : {
        bottom                  : 0
    },
    bottom_10 : {
        bottom                  : 10
    },
    bottom_20 : {
        bottom                  : 20
    },
    bottom_30 : {
        bottom                  : 30
    },
    bottom_40 : {
        bottom                  : 40
    },
    right_0 : {
        right                     : 0
    },
    right_5 : {
        right                     : 5
    },
    right_10 : {
        right                     : 10
    },
    right_15 : {
        right                     : 15
    },
    right_20 : {
        right                     : 20
    },
    right_25 : {
        right                     : 25
    },
    right_30 : {
        right                     : 30
    },
    right_35 : {
        right                     : 35
    },
    left_0 : {
        left                     : 0
    },
    left_5 : {
        left                     : 5
    },
    left_10 : {
        left                     : 10
    },
    left_15 : {
        left                     : 15
    },
    left_20 : {
        left                     : 20
    },
    left_25 : {
        left                     : 25
    },
    left_30 : {
        left                     : 30
    },
    left_35 : {
        left                     : 35
    },

    // Style Bg OverLay

    blackOverlay  : {
        backgroundColor         : "rgba(0,0,0,0.5)",
        position                : 'absolute',
        top                     : -10,
        left                    : -10,
        width                   : '100%',
        height                  : '100%'
    },
    lightOverlay  : {
        backgroundColor         : "rgba(255,255,255,0.5)",
        position                : 'absolute',
        top                     : -10,
        left                    : -10,
        width                   : '100%',
        height                  : '100%'
    },

    // Style Loading

    loading : {
        position                : 'absolute',
        top                     : 0,
        right                   : 0,
        width                   : '100%',
        height                  : '100%',
        zIndex                  :  99999,
        backgroundColor         : "rgba(0,0,0,0.5)",
    },

    // Style App

    Header_Up : {
        backgroundColor       : "#134949",
        justifyContent        : 'space-between',
        flexDirection         : 'row',
        paddingTop            : 25,
        paddingRight          : 10,
        paddingLeft           : 10,
        borderWidth           : 0,
        borderColor           : "#ECECEC",
        height                : 85
    },
    headerTitle:{
        color : '#FFF',
        fontFamily            : 'CairoBold',
        paddingHorizontal     : 10,
        fontSize              : 16,
        textAlign : 'center'
    },
    body_header :{
        alignItems : 'flex-start',
        color : '#FFF',
        flex : 1
    },
    text : {
        fontFamily            : 'CairoRegular',
        color                 : '#f2f0ff',
        margin                : 5,
        fontSize              : 15,
        textAlign             : 'center'
    },
    textSize_9 : {
        fontSize : 9
    },
    icons : {
        fontSize              : 20,
        color : '#FFF',
    },
    text_darkGreen :    {
        color : '#134949',
    },
    logo : {
        width                 : 120,
        height                : 120,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        marginVertical        : 20,
        resizeMode            : 'contain'
    },
    sendForm:{
        borderWidth             : 1,
        borderColor             : '#d8d8d8',
        margin                  : 15,
        borderRadius            : 4,
        fontFamily              : 'CairoRegular',
        shadowOffset            : { height: 0, width: 0 },
        width : '100%'
    },
    sendForms:{
        borderWidth             : 1,
        borderColor             : '#dbdbdb',
        margin                  : 15,
        borderRadius            : 4,
        fontFamily              : 'CairoRegular',
        shadowOffset            : { height: 0, width: 0 },
    },
    success:{
        color :'#0d4063'
    },
    error:{
        color : '#F00'
    },
    fixed_top : {
        width                   : '90%',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        alignContent            : 'center',
        flex                    : 1,
        flexGrow                : 1,
        height                  : '100%',
        flexShrink              : 1
    },
    content : {
        flex                   : 1,
    },
    fixed_btn : {
        margin                  : 10,
        padding                 : 10,
        // borderRadius            : 5,
        width                   : '60%',
        backgroundColor         : '#134949'
    },
    rowGroups : {
        flexDirection       : "row",
        justifyContent      : "space-between",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    rowFlex : {
        flexDirection       : "row",
        alignItems          : "center",
        flexWrap            : 'wrap'
    },
    btn_width : {
        margin          : 10,
        padding                 : 10,
        width                   : '40%',
        backgroundColor         : '#134949'
    },
    text_btn :{
        fontFamily            : 'CairoRegular',
        color                 : '#FFF',
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
    },
    block_section : {
        margin                : 15,
        padding               : 5,
        borderRadius          : 0,
        backgroundColor       : '#fff',
        // shadowColor           : '#444',
        // shadowOffset          : { width: 0 , height : 0 },
        // shadowOpacity         : 0.2,
        // elevation             : 5,
        alignItems            : 'center',
    },
    move : {
        flexDirection           : 'row-reverse',
        justifyContent          : 'space-between',
        width                   : '100%'
    },
    block_up : {
        flexDirection           : 'row-reverse',
        margin                  : 5,
    },
    icon_up : {
        marginTop               : 3,
        marginRight             : 5,
        color                   : '#444',
        fontSize                : 20,
    },
    icon : {
        color                   : '#444',
        fontSize                : 16,
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        lineHeight              : 40,
    },
    upload : {
        backgroundColor         : '#fafafa',
        padding                 : 10,
        margin                  : 10,
        borderRadius            : 5,
        textAlign               : 'center',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        width                   : '90%'
    },
    iconUpload : {
        color                   : '#bbbb'
    },
    blockUpload : {
        margin                  : 15,
        borderColor             : '#bbbb',
        borderStyle             : "dashed",
        borderWidth             : 1,
        borderRadius            : 5,
        padding                 : 10,
        textAlign               : 'center',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        width                   : 120,
        height                  : 120
    },
    form : {
        padding                 : 10
    },
    item : {
        padding                 : 0,
        borderColor             : '#b5b5b5',
        width                   : '100%',
        marginVertical          : 10,
        marginLeft              : 0,
        borderWidth             : 1
    },
    item_pro : {
        paddingVertical         : 10,
        paddingHorizontal       : 40,
        borderColor             : '#DDD',
        width                   : '100%',
        marginVertical          : 10,
        borderWidth             : 1,
        alignItems              : 'flex-start',
        position                : 'relative',
        borderRadius            : 5,
        backgroundColor         : '#f3f3f3'
    },
    input : {
        textAlign               : I18nManager.isRTL ? 'right' : 'left',
        color                   : '#444',
        borderColor             : '#DDD',
        fontFamily              : 'CairoRegular',
        fontSize                : 14,
        paddingRight            : 30,
        paddingLeft             : 30,
    },
    item_url : {
        padding                 : 0,
        borderColor             : '#DDD',
        width                   : '90%',
        marginVertical          : 10,
        alignSelf               : 'center',
        borderWidth             : 1,
        borderRadius            : 5
    },
    textarea : {
        textAlign               : 'right',
        color                   : '#444',
        fontFamily              : 'CairoRegular',
        fontSize                : 13,
        borderColor             : '#DDD',
        borderWidth             : 1,
        width                   : '100%',
        padding                 : 0
    },
    blockIcon : {
        width                   : 40,
        height                  : 40,
        lineHeight              : 40,
        borderRadius            : 100,
        backgroundColor         : '#DDD',
        textAlign               : 'center',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        margin                  : 10
    },
    bgLiner:{
        borderRadius            : 5,
        width                   : 170,
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        margin                  : 15,
        backgroundColor         : CONST.color
    },
    textBtn : {
        textAlign             : 'center',
        color                 : '#fff',
        fontSize              : 14,
        padding               : 3,
        fontFamily            : 'CairoRegular',
    },
    itemPiker_second : {
        borderWidth           : 1,
        borderColor           : '#FFF',
        borderBottomColor     : "#b5b5b5" ,
        width                 : '100%',
        position              : 'relative',
        padding               : 0,
        fontSize              : 14,
        marginRight           : 0,
    },
    map : {
        width                 : '90%',
        height                : 150,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        margin                : 5,
        borderRadius          : 10,
    },
    markerFixed: {
        left                : '50%',
        marginLeft          : -24,
        marginTop           : -48,
        position            : 'absolute',
        top                 : '50%'
    },
    marker: {
        height              : 48,
        width               : 48
    },
    Btn : {
        borderRadius           : 100,
        width                  : 35,
        height                 : 35,
        textAlign              : 'center',
        backgroundColor        : "#fff",
        paddingTop             : 2,
    },
    Btn_Icon : {
        color                  : "#134949",
        fontSize               : 30,
        textAlign              : 'center'
    },
    chat : {
        margin               : 10,
        flexDirection        : 'row',
        justifyContent       : 'space-between',
        alignItems  : 'center'
    },
    igUser : {
        width                : '15%',
    },
    imgUser : {
        width                : 45,
        height               : 45,
        borderRadius         : 25,
    },
    textContent : {

        borderColor          : '#DDD',
        padding              : 10,
        width                : '100%',
    },
    time : {
        alignItems          : 'flex-end',
        marginTop              : 0,
        fontFamily          : 'CairoRegular',
        fontSize            : 11,
        marginHorizontal    : 60,
        color : '#fff'
    },
    chatSent : {
        flexDirection        : 'row-reverse',
    },
    writeMassage : {
        position             : 'absolute',
        bottom               : 10,
        width                : '100%',
        right                : 0,
        backgroundColor      : '#FFF',
    },
    input_search : {
        borderWidth             : 1,
        borderColor             : '#DDD',
        borderRadius            : 50,
        textAlign               : 'right',
        fontFamily              : 'CairoRegular',
        paddingLeft             : 20,
        width                   : '90%',
        marginHorizontal        : 20,
        marginTop               : 20
    },
    input_chat : {
        borderWidth             : 1,
        borderColor             : '#DDD',
        borderRadius            : 5,
        textAlign               : 'right',
        fontFamily              : 'CairoRegular',
        paddingLeft             : 20,
        width                   : '90%',
        alignSelf : 'center',
        lineHeight : 30
    },
    btn_massage : {
        position             : 'absolute',
        right                : 5,
        top                  : 8,
        backgroundColor      : '#134949',
        borderRadius         : 30
    },
    bgImage : {
        flex                  : 1,
        justifyContent        : 'center',
    },
    bgDiv : {
        padding               : 10,
        width                 : "85%",
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
    },
    icon_input : {
        color                 : '#bbb',
        position              : 'absolute',
        left                  : 0,
        top                   : 14,
        alignItems            : 'center',
        justifyContent        : 'center',
        fontSize              : 14
    },
    label : {
        width               : "100%",
        color               : '#bbb',
        borderWidth         : 0,
        padding             : 0,
        top                 : -10,
        fontFamily          : 'CairoRegular',
        textAlign           : 'left',
        fontSize            : 14
    },
    textFont : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        color               : '#bbb',
        fontSize            : 14,
        marginBottom        : 20,
        textAlign           : 'center',
        fontFamily          : 'CairoRegular'
    },
    Login : {
        fontFamily            : 'CairoRegular',
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        margin                : 25,
        color                 : "#444"
    },
    imagePicker : {
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        margin                : 20,
        width                 : 90,
        height                : 90,
        borderWidth           : 1,
        borderColor           : "#DDD",
        borderRadius          : 100,
        overflow              : 'hidden'
    },
    imagePickers : {
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        margin                : 20,
        width                 : 90,
        height                : 90,
        overflow              : 'hidden',
        borderWidth           : 1,
        borderColor           : "#DDD"
    },
    clickOpen : {
        width                 : 90,
        height                : 90,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        backgroundColor       : "transparent",
        padding               : 0,
        overflow              : 'hidden'
    },
    iconImage : {
        color                 : "#DDD"
    },
    filter : {
        flexDirection       : "row",
        justifyContent      : "space-between",
        marginBottom        : 5,
        paddingHorizontal     : 10,
        width  : '100%'
    },
    searchBar : {
        position                : 'absolute',
        left                    : 30,
        bottom                  : 70,
        alignItems : 'center',
        justifyContent : 'center',
        width : 50,
        height : 50,
        backgroundColor : '#134949',
        borderRadius : 60,
        zIndex : 99,
    },
    iconSearch : {
        color : "#FFF",
        fontSize : 22
    },
    up_block_search :{
        position            : 'absolute',
        width : '100%',
        height : '100%',
        top  : 0,
        right : 0
    },
    over_block_search : {
        position                : 'absolute',
        width : '100%',
        height : '100%',
        backgroundColor : 'rgba(0,0,0,0.5)',
        top : 0,
        right : 0,
        zIndex : 9
    },
    botn :{
        paddingTop : 5,
        paddingRight : 10,
        paddingLeft: 10,
        paddingBottom : 5
    },
    clickFunction : {
        backgroundColor     : "#fff",
        alignItems          : 'center',
        justifyContent      : 'space-between',
        alignSelf           : 'center',
        borderRadius        : 5,
        color               : CONST.color,
        padding             : 8,
        flexBasis           : "33%",
        flexDirection       : "row",
        borderColor         : '#444',
        borderWidth         : .5
    },
    textFun : {
        color               : '#444',
        fontFamily          : "CairoRegular",
        fontSize            : 14,
    },
    iconFun : {
        color               : CONST.color,
        fontSize            : 16,
    },
    textarea_form : {
        textAlign               : 'right',
        color                   : '#444',
        fontFamily              : 'CairoRegular',
        fontSize                : 16,
        borderLeftColor         : '#ffffff',
        borderRightColor        : '#ffffff',
        borderBottomColor       : '#DDD',
        borderTopWidth          : 0,
        borderRightWidth        : 0,
        borderLeftWidth         : 0,
        borderWidth             : 0.5,
        width                   : '90%',
        padding                 : 0,
        height                  : 120,
        paddingRight            : 10,
        paddingLeft             : 10
    },
    blockContact : {
        // flexDirection           : 'row',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        marginTop               : 50
    },
    block_item : {
        flexDirection           : 'row',
        alignItems              : 'center',
        justifyContent          : 'flex-start',
        alignSelf               : 'flex-start',
        // margin                  : 10
    },
    block_filter : {
        alignItems              : 'center',
        justifyContent          : 'flex-start',
        alignSelf               : 'flex-start',
        margin                  : 10
    },
    icon_style : {
        borderRadius            : 100,
        width                   : 40,
        height                  : 40,
        textAlign               : 'center',
        margin                  : 10
    },
    icon_style2 : {
        borderRadius            : 100,
        width                   : 20,
        height                  : 20,
        textAlign               : 'center',
        margin                  : 10
    },
    green : {
        backgroundColor         : "#134949",
    },
    blue : {
        backgroundColor         : "#54b844",
    },
    red : {
        backgroundColor         : "#F00",
    },
    textEnemy : {
        color                   :'#363636',
        fontFamily              : 'CairoRegular',
    },
    textNumber : {
        fontFamily              : 'CairoRegular',
    },
    titles : {
        textAlign             : 'center',
        marginTop             : 4,
        color                 : '#444',
        fontFamily            : 'CairoRegular',
    },
    user_MAZAD : {
        display               : 'flex',
        flexDirection         : 'row-reverse',
        justifyContent        : 'space-between',
        width                 : '100%',
        padding               : 10,
        alignItems            : 'flex-end',
    },
    image_MAZAD : {
        flex: 1,
        height: 140,
    },
    views : {
        display               : 'flex',
        flexDirection         : 'row',
    },
    text_user : {
        fontFamily            : 'CairoRegular',
        color                 : "#134949",
        fontSize              : 13
    },
    icon_user : {
        color                 : '#bbb',
        fontSize              : 12,
        marginRight           : 5,
        marginTop             : 5
    },
    flatList : {
        marginTop             : 4
    },
    Text: {
        color: '#134949',
        padding: 15,
        fontFamily: 'CairoRegular'
    },
    active:{
        // shadowOpacity: 0.85,
        // shadowRadius: 10,
        // shadowColor: 'blue',
        borderBottomColor:'#ced09b',
        borderBottomWidth :1.5,
        // shadowOffset: { height: 0, width: 0 },
    },
    block_search :{
        flexDirection : 'row' ,
        justifyContent : 'center',
        position                : 'absolute',
        top : 0,
        backgroundColor : '#fff',
        width : '100%',
        paddingVertical : 10,
        borderColor : '#DDD',
        borderWidth : 1,
        zIndex : 99
    },
    icon_search : {
        position                : 'absolute',
        right                   : 35,
        top                     : 45,
        color                   : '#444',
        fontSize                : 24,
    },
    icon_whats : {
        fontSize              : 20,
        marginRight           : 10,
        marginLeft            : 10,
        color                 : "#54B844"
    },
    block_slider : {
        width                 : '95%',
        borderRadius          : 0,
        marginVertical        : 10,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        position              : 'relative'
    },
    wrapper : {
        height                : 200,
        width                 : '100%',
    },
    slide : {
        width: '100%',
        height: '100%',
        borderWidth : 1,
        borderColor: "#DDD"
    },
    block_Content : {
        display               : 'flex',
        flexDirection         : 'row',
        width                 : '100%',
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        marginVertical                : 5,
        borderBottomColor : '#DDD',
        borderBottomWidth : 1,
        paddingTop : 10,
        paddingBottom : 10
    },
    block_Call : {
        // shadowColor           : '#ECECEC',
        // shadowOffset          : { width: 0 , height : 5 },
        // shadowOpacity         : 0.1,
        // elevation             : 5,
        flexDirection         : "row-reverse",
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        borderRadius          : 0,
        borderWidth           : 1,
        borderColor           : "#ECECEC",
        paddingVertical               : 10,
        paddingHorizontal               : 15,
        width                 : 115,
        position              : 'relative',
        marginVertical            : 5
    },
    box_call: {
        backgroundColor : '#134949'
    },
    box_whats: {
        backgroundColor : '#69b454'
    },
    box_email: {
        backgroundColor : '#d53a3a'
    },
    block_Call_text:{
        fontSize              : 12,
        textAlign             : 'center',
        fontFamily            : 'CairoRegular',
        color : '#FFF'
    },
    icon_blcok : {
        fontSize              : 14,
    },
    iconFix : {
        position              : 'absolute',
        width                 : 27,
        height                : 27,
        lineHeight            : 27,
        top                   : -13,
        right                 : -5,
        backgroundColor       : "#fff",
        borderRadius          : 100,
        zIndex                : 99,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        borderWidth           : 1,
        borderColor           : "#ECECEC",
    },
    call : {
        color                 : "#134949",
    },
    whats : {
        color                 : "#54B844",
    },
    email : {
        color                 : "#134949",
    },
    Detils : {
        flex                  : 1,
        marginTop             : 10,
        paddingBottom         : 15,
    },
    Detils_one : {
        flex                  : 1,
        marginTop             : 10,
        justifyContent:'center',
        alignItems : 'center'
    },
    up_text : {
        marginLeft            : 15,
        marginBottom          : 5,
        fontFamily            : 'CairoRegular',
        color                 : "#134949",
    },
    TiTle :{
        marginLeft            : 10,
        marginRight           : 10,
        marginBottom          : 5,
        marginTop             : 5,
        alignSelf             : 'flex-start',
        fontFamily            : 'CairoBold',
        color                 : "#6b6661",
    },
    text_Detils : {
        color                 : "#444",
        fontFamily            : 'CairoRegular',
        textAlign             : 'left',
    },
    block_Detils : {
        flexDirection         : 'row',
        flexWrap              : 'wrap',
    },
    footer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        bottom: 0,
        position: 'absolute',
        width: '100%'
    },
    region: {
        color: '#fff',
        lineHeight: 20,
        margin: 20
    },
    comment : {
        display               : 'flex',
        alignItems            : 'flex-start',
        margin                : 10,
    },
    scroll: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DDD',
        marginBottom: 10,
        flexGrow : 0,
        flex : 0,
        width : '100%',
    },
    scroller : {
        flexDirection: 'row',
        alignSelf : 'flex-start',
    },
    massage_user : {
        borderBottomWidth     : 1,
        borderBottomColor     : '#DDD',
        width                 : '95%',
        alignItems            : 'center',
        alignSelf             : 'center',
        marginVertical        : 10,
        borderRadius          : 5,
        position              : 'relative',
        padding : 10
    },
    user : {
        display               : 'flex',
        flexDirection         : 'row-reverse',
        justifyContent        : 'space-between',
        width                 : '100%',
        padding               : 5,
    },
    massage : {
        fontFamily            : 'CairoRegular',
        color                 : "#444",
        margin                : 5
    },
    block_report : {
        borderRadius          : 100,
        width                 : 30,
        height                : 30,
        position              : 'absolute',
        top                   : 10,
        right                  : 10,
        backgroundColor       : '#333',
        textAlign             : 'center',
    },
    report : {
        color                 : "#F00",
        fontSize              : 15,
        lineHeight            : 30,
        textAlign             : 'center'
    },
    model : {
        backgroundColor       : '#FFF',
        textAlign             : "center",
        alignItems            : 'center',
        alignSelf             : 'center',
        width                 : '100%'
    },
    text_model : {
        padding               : 10,
        borderTopWidth        : 1,
        borderTopColor        : "#DDD",
        fontFamily            : 'CairoRegular'
    },
    write_comment : {
        margin                : 15,

        textAlign             : "center",
        alignItems            : 'center',
        alignSelf             : 'center',
        width                 : 150,
        padding               : 7
    },
    write : {
        width                 : '100%',
        fontFamily            : 'CairoRegular',
        textAlign             : 'right'
    },
    btn_click : {
        textAlign             : "center",
        alignItems            : 'center',
        alignSelf             : 'center',
        width                 : 100,
        margin                : 5
    },
    btn_text : {
        color                 : '#FFF',
        textAlign             : 'center',
        fontFamily            : 'CairoRegular',
        width                 : '100%',
    },
    old_section : {
        display               : 'flex',
        alignItems            : 'flex-start',
        marginBottom          : 20
    },
    LeftDir : {
        flex : 0
    },
    RightDir : {
        flex : 0
    },
    scroll2: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DDD',
        marginBottom: 10
    },
    icoSetting : {
        marginHorizontal : 10,
        fontSize              : 20,
        color                 : "#fff"
    },
    textIner : {
        fontFamily              : 'CairoRegular',
        fontSize                : 14,
        color                   : '#363636',
        alignSelf               : 'flex-start'
    },
    blocksetting : {
        flexDirection           : 'row',
        justifyContent          : 'space-between',
        padding                 : 15,
        position                : 'relative',
    },
    listitem : {
        backgroundColor         : '#FFF',
        paddingTop              : 20,
        paddingBottom           : 20,
        width                   : 95,
        height                  : 140,
        position                : 'relative',
    },
    chickbox : {
        position                : 'absolute',
        top                     : -5,
        left                    : -7,
        textAlign               : 'center',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
    },
    textsetting : {
        textAlign               : 'center',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        flexDirection : 'row'
    },
    iconsetting : {
        color                   : '#FFF',
        fontSize                : 22,
    },
    tesetting : {
        textAlign               : 'center',
        fontSize                : 13,
        fontFamily              : 'CairoRegular'
    },
    textes : {
        fontFamily              : 'CairoRegular',
        fontSize                : 12,
        color                   : '#bbbb'
    },
    imgePrive : {
        position              : 'absolute',
        width                 : 110,
        height                : 110,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        top                   : 0
    },
    imgePrives : {
        position              : 'absolute',
        width                 : 90,
        height                : 90,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        backgroundColor:'#bbb',
        top                   : 0
    },
    blocking : {
        flexDirection           : 'row-reverse',
        justifyContent          : 'space-between',
    },
    text_up : {
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        fontFamily              : 'CairoRegular',
        fontSize                : 18,
    },
    text_enemy : {
        fontFamily              : 'CairoRegular',
        fontSize : 13,
        textAlign : 'center'
    },
    Text_size: {
        color                   : '#444',
        fontSize                 : 15,
        fontFamily              : 'CairoRegular'
    },
    image : {
        width                   : '100%',
        height                  : '100%',
        resizeMode              : 'contain'
    },
    RTLContainer: {
        flexDirection: 'row-reverse'
    },

    LTRContainer: {
        flexDirection: 'row-reverse'
    },
    icologo : {
        width                 : 25,
        height                : 25,
        resizeMode          :  "contain",
        marginHorizontal  : 10
    },
    no_data : {
        width  : '100%',
        height : '100%',
        alignItems : 'center',
        alignSelf : 'center',
        justifyContent : 'center',
    },
    blockAbout : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        width : '90%'
    },
    boxLang : {
        width : '100%'
    },
    langStyle : {
        borderRadius        : 5,
        borderWidth         : 1,
        borderColor         : '#134949',
        padding             : 5,
        marginVertical      : 5,
        width               : '60%',
        alignItems          : 'center',
        // justifyContent      : 'flex-start',
        justifyContent      : 'center',
        alignSelf           : 'center',
        flexDirection:  'row',
        paddingHorizontal : 20
    },
    texter : {
        fontFamily            : 'CairoRegular',
        textAlign             : 'center',
        fontSize              : 17,
        color                 : "#134949",
        // width                 : '100%'
    },
    textIng : {
        marginBottom          : 20,
        fontSize              : 25
    },
    fullWidth : {
        width : '100%'
    },
    logo_lang : {
        width                 : 200,
        height                : 100,
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        // borderRadius:       15,
        // marginVertical : 10,
        resizeMode          :  "contain"
    },
    icologo_lang : {
        width                 : 25,
        height                : 25,
        resizeMode            :  "contain",
        marginHorizontal      : 10
    },
    blockAbout_lang : {
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        width               : '90%',
    },
    langStyle_lang : {
        borderRadius        : 5,
        borderWidth         : 1,
        borderColor         : '#134949',
        padding             : 5,
        marginVertical      : 5,
        width               : '60%',
        alignItems          : 'center',
        // justifyContent      : 'flex-start',
        justifyContent      : 'center',
        alignSelf           : 'center',
        flexDirection:  'row',
        paddingHorizontal : 20
    },
    header : {
        backgroundColor       : "transparent",
        height : 85,
        textAlign             : 'center',
        borderWidth           : 1,
    },
    texts : {
        fontFamily            : 'CairoRegular',
        color                 : '#444',
        marginTop             : 7,
        fontSize              : 15,
    },
    icons_move : {
        fontSize              : 18,
        color                 : "#80aed6c7"
    },
    user_info : {
        marginTop             : 10,
        backgroundColor       : '#134949',
        padding               : 20,
        justifyContent        : 'center',
    },
    btn_click_move : {
        textAlign             : "center",
        alignItems            : 'center',
        alignSelf             : 'center',
        width                 : 130,
        margin                : 10,
        backgroundColor       : '#fff'
    },
    btn_text_move : {
        color                 : '#444',
        textAlign             : 'center',
        fontFamily            : 'CairoRegular',
        width                 : '100%',
    },
    block_section_move : {
        margin                : 15,
        padding               : 10,
        borderRadius          : 5,
        backgroundColor       : '#fff',
        shadowColor           : '#444',
        shadowOffset          : { width: 0 , height : 0 },
        shadowOpacity         : 0.2,
        elevation             : 5,
        borderColor : '#DDD',
        borderWidth : 1
    },
    block_section_move_mune : {
        margin                : 15,
        padding               : 10,
        borderRadius          : 5,
        backgroundColor       : '#fff',
        borderColor : '#DDD',
        borderWidth : 1
    },
    block_section_up : {
        margin                : 5,
        padding               : 5,
        borderRadius          : 5,
        backgroundColor       : '#fff',
        shadowColor           : '#444',
        shadowOffset          : { width: 0 , height : 0 },
        shadowOpacity         : 0.2,
        elevation             : 5,
        borderColor : '#DDD',
        borderWidth : 1
    },
    block_section_mero:  {
        margin                : 5,
        borderRadius          : 5,
        backgroundColor       : '#fff',
        borderColor : '#DDD',
        borderWidth : 1
    },
    select : {
        width                 : '100%',
        display               : 'flex',
        alignItems            : 'center',
        justifyContent        : 'space-between',
        alignSelf             : 'center',
    },
    picker : {
        width                 : '100%',
        display               : 'flex',
        alignItems            : 'center',
        justifyContent        : 'space-between',
        alignSelf             : 'center',
    },
    itemPicker : {
        color: "#444",
        width : '100%',
        fontFamily : 'CairoRegular'
    },
    MainContainer :{
        flexDirection         : 'row',
        justifyContent        : 'space-between',
        flex                  : 1,
        margin                : 10
    },
    text_switch : {
        fontFamily              : 'CairoRegular',
        marginTop               : 1
    },
    blocking_move : {
        flexDirection           : 'row-reverse',
        justifyContent          : 'space-between',
    },
    text_up_move : {
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        fontFamily              : 'CairoRegular',
        fontSize                : 18,
    },
    block_item_move : {
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        margin                  : 10
    },
    icon_style_move : {
        borderRadius            : 100,
        width                   : 40,
        height                  : 40,
        textAlign               : 'center',
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
        margin                  : 10
    },
    icon_move : {
        color                   : '#444',
        fontSize                : 20,
        alignItems              : 'center',
        justifyContent          : 'center',
        alignSelf               : 'center',
    },
    bink : {
        backgroundColor         : "#f9d8de",
    },
    social : {
        backgroundColor         : '#f5f5f5'
    },
    moveing : {
        flexDirection           : 'row-reverse',
        justifyContent          : 'space-between',
        borderBottomWidth       : 1,
        borderBottomColor       : "#DDD",
        paddingTop              : 10,
        paddingBottom           : 10,
        paddingRight            : 5,
        paddingLeft             : 5
    },
    textDate : {
        textAlign               : 'center',
        fontFamily              : 'CairoRegular',
        padding             : 5,
        backgroundColor : 'rgba(0,0,0,0.5)',
        color : "#FFF",
        position                : 'absolute',
        left                    : 0,
        bottom                     : 0,
        width : '100%',
        fontSize : 13
    },
    block_up_move : {
        flexDirection           : 'row-reverse',
        marginTop               : 8,
        overflow                : 'hidden'
    },
    icon_up_move : {
        marginTop               : 3,
        marginRight             : 5,
        color                   : '#444',
        fontSize                : 20,
    },
    image_center : {
        alignItems : 'center',
        alignSelf : 'center',
        justifyContent : 'center',
    },
    info : {
        textAlign            : 'left',
        fontFamily           : 'CairoRegular',
    },
    delete : {
        top: 1,
        fontFamily            : 'CairoRegular',
    },
    removed : {
        position            : 'absolute',
        backgroundColor : '#F00',
        width : 30,
        height : 30,
        borderRadius : 100,
        alignItems : 'center',
        alignSelf : 'center',
        justifyContent : 'center',
        right  : -5,
        top : -5
    },
    textUser : {
        fontFamily            : 'CairoRegular',
        color                 : '#444',
        fontSize              : 15,
        textAlign             : 'center'
    },
    icon_btn : {
        color                 : "#FFF",
        fontSize              : 30,
    },
    slide_cate : {
        height                : 50,
        width                 : 50,
        borderRadius          : 25,
        borderWidth : 1,
        borderColor : '#DDD'

    },
    footer_Tab : {
        backgroundColor         : "#FFF",
        shadowColor             : '#DDD',
        shadowOffset            : { width: 0 , height : -3 },
        shadowOpacity           : 0.4,
        elevation               : 5,
        borderBottomColor       : '#bbb',
    },
    btn_Footer : {
        borderRadius            : 0
    },
    addE3lan : {
        position : 'relative',
        top : -20,
        backgroundColor:  "#134949",
        borderRadius:  100,
        width:  50,
        height:  50,
        alignSelf : 'center',
        alignItems : 'center',
        justifyContent : 'center',
        paddingLeft : 0,
        paddingRight : 0,
        paddingTop : 0,
        paddingBottom : 0,
        flex : 0,
        shadowColor             : '#363636',
        shadowOffset            : { width: 0 , height : 0 },
        shadowOpacity           : 0.4,
        elevation               : 5,
    },
    iconer : {
        marginLeft  : 0,
        marginRight : 0
    },
    divBtn : {
        alignItems            : 'center',
        flexDirection         : 'row',
        justifyContent        : 'space-between',
        margin                : 10
    },
    text_info :{
        fontFamily            : 'CairoRegular',
        color                 : '#444',
        alignItems            : 'center',
        justifyContent        : 'center',
        alignSelf             : 'center',
        textAlign             : 'center',
        margin                : 15
    },
    viewPiker : {
        position            : 'relative',
        marginTop           : 5,
        marginBottom        : 5,
        flexBasis           : "33%",
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        backgroundColor     : "#fff",
        borderRadius        : 5,
        borderColor         : '#444',
        borderWidth         : .5
    },
    Picker : {
        width               : '100%',
        backgroundColor     : 'transparent',
        borderWidth         : 0,
        paddingLeft         : 0,
        marginRight         : 0,
        borderRadius        : 10,
        height              : 41,
    },
    itemPiker : {
        borderWidth         : 0,
        borderColor         : '#FFF',
        width               : '100%',
        position            : 'relative',
        fontSize            : 14,
        fontFamily          : 'CairoRegular',
        borderRadius        : 5,
        borderLeftWidth     : 0,
        borderBottomWidth   : 0,
        borderTopWidth      : 0,
        borderRightWidth    : 0,
        color               : "#FFF"
    },
    iconPicker : {
        position            : 'absolute',
        right               : 0,
        color               : CONST.color,
        fontSize            : 14
    },
    blockInfo : {
        flexDirection       : 'row',
        flexBasis           : '70%',
    },
    nameBank : {
        color               : "#134949",
        fontFamily          : "CairoRegular",
        fontSize            : 13,
    },
    blockUp : {
        position            : "relative",
        backgroundColor     : "#134949ba",
        padding             : 20,
        margin              : 10
    },
    clickMore : {
        backgroundColor     : CONST.color,
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        margin              : 10,
        padding             : 5,
        width               : 120,
    },
    textMore :{
        color               : "#FFF",
        fontFamily          : "CairoRegular",
        fontSize            : 16,
    },
    fixIcon : {
        position:'absolute' ,
        right: 0 ,
        top :0 ,
        backgroundColor:'rgba(0,0,0,0.5)',
        width: '100%',
        height : '100%',
        alignItems : 'center',
        justifyContent : 'center'
    },
    viewImg : {
        height: 120,
        width: 120,
        overflow :'hidden',
        borderRadius : 5,
        position: 'absolute',
        top : 15,
        alignSelf : 'center'
    },
    icon_header: {
        fontSize: 19,
        color: "#fff"
    },
    icon_text: {
        flexDirection: 'row',
        alignItems:'center'
    },
    block_sectionParent: {
        width: '100%'
    },
    touch: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        alignItems: 'flex-end',
    },
    ico_touch: {
        fontSize: 15,
        margin: 5
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    filterItemPicker: {
        width: '50%',
        borderBottomWidth: 0,
        paddingRight: 15,
        paddingLeft: 15,
        overflow: 'hidden'
    },
    bgView: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 0
    },
    TextPrviwe: {
        fontFamily: 'CairoRegular',
        color: "#444",
        fontSize: 15,
        marginLeft: 3,
        marginRight: 3
    },
    headButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    headNearest: {
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent:'space-between',
        flexDirection:'row',
    },
    headNearestText: {
        color: '#444',
        //  fontFamily: 'CairoRegular',
        fontSize: 16,
        justifyContent:'flex-end',
        alignItems:'flex-end'
    },
    headNearestTextActive: {
        color: '#134949',
        fontSize: 16,
        fontFamily            : 'CairoRegular',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'blue',
        shadowOffset: { height: 0, width: 0 },
    },
    productsContainer: {
        flexDirection: 'row',
        marginTop: 5,
        borderWidth: .5,
        borderColor: '#cccccc'

    },
    iconNearestText:{
        color :'#444',
        fontSize:16,
        // marginLeft: 40
    },
    iconNearestTextActive:{
        color: '#134949',
        fontFamily            : 'CairoRegular',
        shadowOpacity: 0.75,
        shadowRadius: 5,
        shadowColor: 'blue',
        shadowOffset: { height: 0, width: 0 },
        fontSize:16,
        // marginLeft: 40
    },
    image_error : {
        width : 150,
        height : 150,
        position : 'relative',
    },
    texteriaForm:{
        borderBottomColor       : '#DDD',
        borderBottomWidth       : 1,
        height                  : 100,
        textAlign               : 'right',
        color                   : '#444',
        fontFamily              : 'CairoRegular',
        fontSize                : 14,
        borderColor             : '#DDD',
        width                   : '100%',
        padding                 : 0
    },
    scrollBar: {
        flexDirection: 'row',
        alignSelf : 'flex-start',
    },
    pickerHome: {
        height: 40,
        marginRight: 0,
        borderWidth: 1,
        width: 10,
        fontFamily: 'CairoRegular',
        position: 'absolute',
        right: 0,
        zIndex: 99
    },
    block_itemHome: {
        //justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#DDD',
        padding: 7,
        marginTop: 2,
        marginBottom: 2,
    },
    clickFunctionHome : {
        backgroundColor     : "#fff",
        alignItems          : 'center',
        justifyContent      : 'space-between',
        alignSelf           : 'center',
        borderRadius        : 0,
        color               : CONST.color,
        paddingHorizontal      : 4,
        flexBasis           : "33.3%",
        flexDirection       : "row",
        borderColor         : '#DDD',
        borderWidth         : 1,
        height              : 37,
    },
    iconFunHome : {
        color               : CONST.color,
        fontSize            : 16,
    },
    viewPikerHome : {
        position            : 'relative',
        marginTop           : 5,
        marginBottom        : 5,
        flexBasis           : "33.3%",
        alignItems          : 'center',
        justifyContent      : 'center',
        alignSelf           : 'center',
        backgroundColor     : "#fff",
        borderRadius        : 0,
        borderColor         : '#DDD',
        borderWidth         : 1,
        borderRightWidth: 0
    },
    PickerHome : {
        width               : '100%',
        backgroundColor     : 'transparent',
        borderWidth         : 0,
        paddingLeft         : 0,
        marginRight         : 0,
        borderRadius        : 0,
        height              : 35,
    },
    itemPikerHome : {
        borderWidth         : 0,
        borderColor         : '#FFF',
        width               : '100%',
        position            : 'relative',
        fontSize            : 14,
        fontFamily          : 'CairoRegular',
        borderRadius        : 0,
        borderLeftWidth     : 0,
        borderBottomWidth   : 0,
        borderTopWidth      : 0,
        borderRightWidth    : 0,
        color               : "#FFF"
    },
    flatLists:{
        marginTop : 10,
        // flexDirection : 'row'
    },
});
export default styles;
