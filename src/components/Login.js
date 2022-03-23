import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from './Button'
import { authAuctions } from './store/store'

const Login = () => {

    const dispatch = useDispatch()
    const loggedIn = useSelector((state) => state.auth.loggedIn)

    const loginHandler = (event) => {
        event.preventDefault()
        if (loggedIn) dispatch(authAuctions.logout())
        if (!loggedIn) dispatch(authAuctions.login())

    }

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className='login-area'>
            {!loggedIn ? (
                <form>
                    <h2>Email</h2>
                    <input type="text" name="email" onChange={handleEmail} value={email} />
                    <h2>Password</h2>
                    <input type="password" name="password" onChange={handlePassword} value={password} />
                    <div style={{ marginTop: "1rem" }} />
                    <Button type="submit" onClick={loginHandler}>Login</Button>
                </form>
            ) : (
                <>
                <h2>Logged In</h2>
                <Button onClick={loginHandler}>Logout</Button>
                </>
            )}

        </div>
    )
}

export default Login