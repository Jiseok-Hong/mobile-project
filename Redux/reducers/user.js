import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE, USER_DATA, CLEAR_DATA } from '../constants'

const initialState = {
    currentUser: null,
    post: [],
}

export const user = (state = initialState, action) => {
    switch(action.type){
        case USER_STATE_CHANGE: 
            return{
                ...state,
                currentUser: action.currentUser 
            }
        case USER_POST_STATE_CHANGE: 
            return{
                ...state,
                posts: action.posts 
            }
        case CLEAR_DATA:
            return{
                currentUser: null,
                post: []
            }
        default:
            return state;
    }
    
}