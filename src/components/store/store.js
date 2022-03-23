import { createSlice, configureStore } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const initialState = {
    counter: 0,
    showCounter: true
}

const counterSlice = createSlice ({
    name: 'counter',
    initialState: initialState,
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

export const counterActions = counterSlice.actions

const reduxStore = configureStore({
    reducer:  counterSlice.reducer
})

export default reduxStore