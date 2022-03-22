import {createStore} from 'redux'

const initialState = {
    counter: 0,
    showCounter: true
}

const counterReducer = ( state = {initialState}, action) => {
    switch (action.type) {
        case 'INCREMENT': return {...state, counter: state.counter+action.val}
        case 'DECREMENT': return {...state, counter: state.counter-action.val}
        case 'TOGGLE_COUNTER': return {...state, showCounter:!state.showCounter}
        default: return state
    }
}

const reduxStore = createStore(counterReducer, initialState)

export default reduxStore