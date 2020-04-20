const usersInitialState = []

const usersReducer = (state = usersInitialState, action) => {
    switch (action.type) {
        case 'SEND_USER': {
            return [...state, action.payload]
        }
        case 'SET_USERS': {
            return [...action.payload]
        }
        case 'UPDATE_STATUS': {
            return state.map(user => {
                if (user._id == action.payload._id) {
                    return { ...user, ...action.payload }
                } else {
                    return { ...user }
                }
            })
        }
        default: {
            return [...state]
        }
    }
}
export default usersReducer