import './App.css';
import { useState, useEffect, useReducer, useContext } from 'react';
import { ErrorModal } from './components/ErrorModal';
import Button from './components/Button';
import { useSelector, useDispatch } from 'react-redux'
import Login from './components/Login';
import { counterActions } from './components/store/counterSlice';

//an example of useReducer
const modalReducer = (state, action) => {
  switch (action.type) {
    case 'USER_ERROR_ONE_ENABLE':
      {
        if (action.val === true) {
          localStorage.setItem('error', 'true')
          return { errorOneOpen: true, errorTwoOpen: state.errorTwoOpen }
        }
        if (action.val === false) {
          localStorage.setItem('error', 'false')
          return { errorOneOpen: false, errorTwoOpen: state.errorTwoOpen }
        }
      }
    case 'USER_ERROR_TWO_ENABLE':
      if (action.val === true) {
        localStorage.setItem('errorTwo', 'true')
        return { errorOneOpen: state.errorOneOpen, errorTwoOpen: true }
      }
      if (action.val === false) {
        localStorage.setItem('errorTwo', 'false')
        return { errorOneOpen: state.errorOneOpen, errorTwoOpen: false }
      }

    default:
      return { errorOneOpen: false, errorTwoOpen: false }
  }
}

function App() {


  const [modalState, dispatchModal] = useReducer(modalReducer, { errorOneOpen: false, errorTwoOpen: false })

  const counter = useSelector((state) => state.counter.counter)
  const showCounter = useSelector((state) => state.counter.showCounter)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('error') === 'true') dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: true })
    else dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: false })
    if (localStorage.getItem('errorTwo') === 'true') dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: true })
    else dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: false })
  }, [])



  return (
    <div className="App">
      <Login/>
      <Button onClick={() => dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: true })}>
        Overlay One
      </Button>
      <Button onClick={() => dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: true })}>
        Overlay Two
      </Button>
      {modalState.errorOneOpen ? (<ErrorModal onClose={() => dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: false })} header={"header1"} />) : ("")}
      {modalState.errorTwoOpen ? (<ErrorModal onClose={() => dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: false })} header={"header2"} />) : ("")}
      {showCounter ? (
        <>
          <p>CountAmount: {counter}</p>
          <Button onClick={() => dispatch(counterActions.increment(1))}>Increment</Button>
          <Button onClick={() => dispatch(counterActions.increment(5))}>Increment by 5</Button>
          <Button onClick={() => dispatch(counterActions.decrement(1))}>Decrement</Button>
          <Button onClick={() => dispatch(counterActions.decrement(5))}>Decrement by 5</Button>
        </>
      ) : ('')}
      <Button onClick={() => dispatch(counterActions.toggle())}>Toggle Handler</Button>
    </div>
  )
}

export default App;
