const INIT_STATE = { user: null , result : null,user_id : null,updated:null};


export default ( state = INIT_STATE, action ) => {
    switch (action.type) {

        case ('profile_data'):
            console.log('profile_data');
            console.log(action.data.data);
            console.log(action.data);
            console.log(action);
            return ({ ...state, user: action.data.data ,updated:1});
        case ('update_profile'):
            console.log('update_profile')

            return ({ ...state, user: action.data.data , result : action.data ,user_id :action.data.user_id,updated:2 });
        case ('logout'):
            console.log('i have logged out');
            return ({ ...state, user: null ,result : null,user_id :null,logout:1 });
        default :
            return state;
    }}