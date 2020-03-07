import axios from "axios"

export const getUser = (users)=>{
  return { type: 'GET_USER', payload: users}
}
export const startGetUser = () => {
  return (dispatch) => {
    axios.get("https://cors-anywhere.herokuapp.com/dct-application-form.herokuapp.com/users/application-forms",
    )
      .then((response) => {
        //console.log(response)
        const users=response.data
        dispatch(getUser(users))
      })
  }
}

export const setUser = userInfo => {
         return { type: "SET_USER", payload: userInfo };
       };
export const startSetUser=(formData)=>{
    return(dispatch)=>{
        axios.post(
          "https://cors-anywhere.herokuapp.com/dct-application-form.herokuapp.com/users/application-form",formData   
        )
        .then((response)=>{
           // console.log(response)
           const userInfo=response.data
           dispatch(setUser(userInfo));
        })
    }
}

// export const viewUser=(id)=>{
//     return{type:'VIEW_USER',payload:id}
// }
// export const startViewUser=(id)=>{
//   return(dispatch)=>{
//     axios
//       .get(
//         "https://cors-anywhere.herokuapp.com/dct-application-form.herokuapp.com/users/application-form/id",id
//       )
//       .then(response => {
//         console.log(response);
//         const details=response.data
//         dispatch(viewUser(details))
//       });
//   }
// }
