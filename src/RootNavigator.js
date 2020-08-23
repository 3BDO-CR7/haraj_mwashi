import {createStackNavigator, createAppContainer} from 'react-navigation';

import Login from './components/Login'
import About from './components/About'
import Home from './components/Home'
import ForgetPassword from './components/ForgetPassword'
import NewPassword from './components/NewPassword'
import Register from './components/Register'
import DetilsE3lan from './components/DetilsE3lan'
import MuneApp from './components/MuneApp'
import Filter from './components/Filter'
import Gallery from './components/Gallery'
import Chat from './components/Chat'
import AddE3lan from './components/AddE3lan'
import Requested from './components/Requested'
import ChatRoom from './components/ChatRoom'
import Notification from './components/Notification'
import TermsE3lan from './components/TermsE3lan'
import FormE3lan from './components/FormE3lan'
import Terms from './components/Terms'
import Commission from './components/Commission'
import WatchLater from './components/WatchLater'
import Favorite from './components/Favorite'
import Contact from './components/Contact'
import Profile from './components/Profile'
import EditProfile from './components/EditProfile'
import Language from './components/Language'
import Categories from "./components/Categories";
import Confirmation from "./components/Confirmation";
import ConfirmationPhone from './components/ConfirmationPhone'
import SubCategory from './components/SubCategory'
import SelectCategory from './components/SelectCategory'
import AddPhotoAds from "./components/addPhotoAds";
import MyAds from "./components/MyAds";
import Edit_ad from "./components/Edit_ad";
import EditPhotoAd from "./components/EditPhotoAd";
import InitScreen from "./components/InitScreen";
import AboutCommission from "./components/AboutCommission";
import chnage_password from "./components/chnage_password";
import UserDetailes from './components/UserDetailes';
import Payment from './components/Payment';
import Retreival from './components/Retreival';
import Privacy from './components/Privacy';
import Map from './components/Map';
import ChooseBank from './components/ChooseBank';

const MainNavigator = createStackNavigator({
        InitScreen: {
            screen: InitScreen,
            navigationOptions: {
                header: null
            }
        },
        forme3lan_photo: {
            screen: AddPhotoAds,
            navigationOptions: {
                header: null
            }
        },
        ChooseBank: {
            screen: ChooseBank,
            navigationOptions: {
                header: null
            }
        },
        contact: {
            screen: Contact,
            navigationOptions: {
                header: null
            }
        },
        Map: {
            screen: Map,
            navigationOptions: {
                header: null
            }
        },
        mune: {
            screen: MuneApp,
            navigationOptions: {
                header: null
            }
        },
        filter: {
            screen: Filter,
            navigationOptions: {
                header: null
            }
        },
        Payment: {
            screen: Payment,
            navigationOptions: {
                header: null
            }
        },
        MyAds: {
            screen: MyAds,
            navigationOptions: {
                header: null
            }
        },
        Privacy: {
            screen: Privacy,
            navigationOptions: {
                header: null
            }
        },
        chat: {
            screen: Chat,
            navigationOptions: {
                header: null
            }
        },
        chatroom: {
            screen: ChatRoom,
            navigationOptions: {
                header: null
            }
        },
        gallery: {
            screen: Gallery,
            navigationOptions: {
                header: null
            }
        },
        Categories: {
            screen: Categories,
            navigationOptions: {
                header: null
            }
        },
        editprofile: {
            screen: EditProfile,
            navigationOptions: {
                header: null
            }
        },
        login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        register: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        },
        profile: {
            screen: Profile,
            navigationOptions: {
                header: null
            }
        },
        terms: {
            screen: Terms,
            navigationOptions: {
                header: null
            }
        },
        commission: {
            screen: Commission,
            navigationOptions: {
                header: null
            }
        },
        newpassword: {
            screen: NewPassword,
            navigationOptions: {
                header: null
            }
        },
        language: {
            screen: Language,
            navigationOptions: {
                header: null
            }
        },

        Edit_ad: {
            screen: Edit_ad,
            navigationOptions: {
                header: null
            }
        },
        details: {
            screen: DetilsE3lan,
            navigationOptions: {
                header: null
            }
        },
        about: {
            screen: About,
            navigationOptions: {
                header: null
            }
        },
        Confirmation_Page: {
            screen: ConfirmationPhone,
            navigationOptions: {
                header: null
            }
        },
        Confirmation: {
            screen: Confirmation,
            navigationOptions: {
                header: null
            }
        },
        chnage_password: {
            screen: chnage_password,
            navigationOptions: {
                header: null
            }
        },
        adde3lan: {
            screen: AddE3lan,
            navigationOptions: {
                header: null
            }
        },
        termse3lan: {
            screen: TermsE3lan,
            navigationOptions: {
                header: null
            }
        },
        AboutCommission: {
            screen: AboutCommission,
            navigationOptions: {
                header: null
            }
        },
        UserDetailes:{
            screen: UserDetailes,
            navigationOptions: {
                header: null
            }
        },
        forme3lan: {
            screen: FormE3lan,
            navigationOptions: {
                header: null
            }
        },
        notification: {
            screen: Notification,
            navigationOptions: {
                header: null
            }
        },
        forgetpassword: {
            screen: ForgetPassword,
            navigationOptions: {
                header: null
            }
        },
        home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        EditPhotoAd: {
            screen: EditPhotoAd,
            navigationOptions: {
                header: null
            }
        },
        SelectCategory: {
            screen: SelectCategory,
            navigationOptions: {
                header: null
            }
        },

        sub_category: {
            screen: SubCategory,
            navigationOptions: {
                header: null
            }
        },
        favorite: {
            screen: Favorite,
            navigationOptions: {
                header: null
            }
        },
        requested: {
            screen: Requested,
            navigationOptions: {
                header: null
            }
        },
        watchLater: {
            screen: WatchLater,
            navigationOptions: {
                header: null
            }
        },
        Retreival: {
            screen: Retreival,
            navigationOptions: {
                header: null
            }
        },



    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: 'transparent'
            },
        }

    });

const Routes = createAppContainer(MainNavigator);


export default Routes;
