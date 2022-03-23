import React, { useState } from 'react'
import Button from './Button'

const Login = () => {
    const loginHandler = (event) => {
        event.preventDefault()
        console.log("Log in")
    }

    const [email, setEmail] = useState ("")
    const [password, setPassword] = useState ("")

    const handleEmail = (e) => {
        setEmail(e.target.value)
    } 

    const handlePassword = (e) => {
        setPassword (e.target.value)
    }

    return (
        <div className='login-area'>
            <form>
                <h2>Email</h2>
                <label>
                    <input type="text" name="email" onChange={handleEmail} value={email}/>
                </label>
                <h2>Password</h2>
                <label>
                    <input type="password" name="password" onChange={handlePassword} value={password}/>
                </label>
                <div style={{ marginTop: "1rem" }} />
                <Button type="submit" onClick={loginHandler}>Login</Button>
            </form>

        </div>
    )
}

export default Login