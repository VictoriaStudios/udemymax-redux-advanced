const redux = require('redux')

const initialState = { counter: 0 }

const counterReducer = (state = initialState, action) => {
    // return {
    //     counter: state.counter +1
    // }
    switch (action.type) {
        case 'INCREMENT': return { counter: state.counter +1}
        case 'DECREMENT': return {counter: state.counter - 1}
    }

    return state
}


const store = redux.createStore(counterReducer, initialState)


const counterSub = () => {
    //returns the current state
    const latestState = store.getState()
    console.log(latestState)
}

store.subscribe(counterSub)

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });