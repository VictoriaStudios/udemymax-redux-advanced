import './App.css';
import { useState, useEffect, useReducer, useContext } from 'react';
import { ErrorModal } from './components/ErrorModal';
import Button from './components/Button';
import { testContext } from './components/store/TestProvider';
import { ContextTester } from './components/ContextTester';
import { useSelector, useDispatch } from 'react-redux'

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

  const ctx = useContext(testContext)
  const counter = useSelector((state) => state.counter)
  const showCounter = useSelector((state) => state.showCounter)
  const dispatch = useDispatch()

  const incrementHandler = (amount) => {
    dispatch({ type: 'INCREMENT', val: amount })
  }

  const decrementHandler = (amount) => {
    dispatch({ type: 'DECREMENT', val: amount })
  }

  const toggleHandler = () => {
    dispatch({ type: 'TOGGLE_COUNTER' })
  }

  useEffect(() => {
    if (localStorage.getItem('error') === 'true') dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: true })
    else dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: false })
    if (localStorage.getItem('errorTwo') === 'true') dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: true })
    else dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: false })
  }, [])



  return (
    <div className="App">
      App
      <Button onClick={() => dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: true })}>
        Overlay One
      </Button>
      <Button onClick={() => dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: true })}>
        Overlay Two
      </Button>
      {modalState.errorOneOpen ? (<ErrorModal onClose={() => dispatchModal({ type: 'USER_ERROR_ONE_ENABLE', val: false })} header={"header1"} />) : ("")}
      {modalState.errorTwoOpen ? (<ErrorModal onClose={() => dispatchModal({ type: 'USER_ERROR_TWO_ENABLE', val: false })} header={"header2"} />) : ("")}
      {!ctx.loggedIn ? (
        <>
          <ContextTester message="Not logged in" />
          <Button onClick={() => ctx.dispatchDetails({ type: "LOG_IN" })}>Log in</Button>
        </>
      ) : (
        <>
          <ContextTester message="Logged in" />
          <Button onClick={() => ctx.dispatchDetails("LOG_OUT")}>Log out</Button>
        </>
      )}
      {showCounter ? (
        <>
          <p>CountAmount: {counter}</p>
          <Button onClick={() => incrementHandler(1)}>Increment</Button>
          <Button onClick={() => incrementHandler(5)}>Increment by 5</Button>
          <Button onClick={() => decrementHandler(1)}>Decrement</Button>
          <Button onClick={() => decrementHandler(5)}>Decrement by 5</Button>
        </>
      ) : ('')}

      <Button onClick={() => toggleHandler()}>Toggle Handler</Button>
    </div>
  )
}

export default App;
