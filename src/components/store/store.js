import {  configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import authReducer from './authSlice'

const reduxStore = configureStore({
    reducer:  {counter: counterReducer, auth: authReducer}
})

export default reduxStore