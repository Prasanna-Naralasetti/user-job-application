const userInitial=[]
const userReducer = (state = userInitial,action)=>{
    switch(action.type){
       case 'SET_USER':{
            return [...state,action.payload]
         }
        case 'GET_USER': {
            return [...state,action.payload]
        }
        default:{
            return[...state]
        }
    }
}
export default userReducer