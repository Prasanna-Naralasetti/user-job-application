import axios from '../config/axios'

export const startSendUser = (formData, redirect) => {
  return (dispatch) => {
    axios.post('/users/application-form', formData)
      .then((response) => {
        if (response.data.hasOwnProperty('error')) {
          alert(response.data.error)
        } else {
          console.log("user..", response.data)
          const user = response.data
          dispatch(sendUser(user))
          redirect()
        }
      })
  }
}
export const sendUser = (user) => {
  return { type: 'SEND_USER', payload: user }
}

export const setUsers = (users) => {
  return { type: 'SET_USERS', payload: users }
}
export const startSetUsers = () => {
  return (dispatch) => {
    axios.get('/users/application-forms')
      .then((response) => {
        console.log("users", response.data)
        const users = response.data
        dispatch(setUsers(users))
      })
  }
}
export const updateStatus = (user) => {
  return { type: 'UPDATE_STATUS', payload: user }
}
export const startUpdateStatus = (status, id) => {
  return (dispatch) => {
    axios.put(`/users/application-form/update/${id}`, status)
      .then((response) => {
        console.log("response...", response.data)
        const user = response.data
        dispatch(updateStatus(user))
        //redirect()
      })
  }

}
