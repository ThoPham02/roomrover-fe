const initialState = {
    isLogined: false,
    token: null
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: action.payload
            }
        default:
            return state
    }
}

export default authReducer;