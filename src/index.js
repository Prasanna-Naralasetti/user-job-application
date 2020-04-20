import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'
import { startSetUsers, startUpdateStatus, startSendUser } from './actions/userAction'

const store = configureStore()
console.log(store.getState())

store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(startSetUsers())
if (store.users != null) {
    store.dispatch(startSendUser())
    store.dispatch(startUpdateStatus())
}


const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))
