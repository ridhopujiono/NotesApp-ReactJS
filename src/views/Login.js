import React from "react";
import { NavLink } from "react-router-dom";
import Endpoint from "../config/EndPoint";
const Login = () => {
    return (
        <div className="login-page">
            <div className="form">
                <form className="register-form">
                <input type="text" placeholder="name"/>
                <input type="password" placeholder="password"/>
                <input type="text" placeholder="email address"/>
                <button>create</button>
                </form>
                <form className="login-form">
                <input type="text" placeholder="username"/>
                <input type="password" placeholder="password"/>
                <button>login</button>
                <p className="message">Not registered? <NavLink to='/register' >Create account</NavLink></p>

                </form>
            </div>
            </div>
    );
}

export default Login;