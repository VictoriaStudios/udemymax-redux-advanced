import { createSlice, configureStore } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialCounterState = {
    counter: 0,
    showCounter: true
}

const initialAuthState = {
    loggedIn: false
}

const counterSlice = createSlice ({
    name: 'counter',
    initialState: initialCounterState,
    reducers: {
        increment (state, action) {
            state.counter+= action.payload
        },
        decrement (state, action) {
            state.counter-= action.payload
        },
        toggle (state) {
            state.showCounter = !state.showCounter
        }
    }
})

const authSlice = createSlice ({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login (state) {
            state.loggedIn = true
        },
        logout (state) {
            state.loggedIn = false
        }
    }
})

export const counterActions = counterSlice.actions
export const authAuctions = authSlice.actions

const reduxStore = configureStore({
    reducer:  {counter: counterSlice.reducer, auth: authSlice.reducer}
})

export default reduxStore