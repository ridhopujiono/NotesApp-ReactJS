import {React, useState} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Endpoint from "../config/EndPoint";
import axios from "axios";

const Login = () => {
    const loginURL = Endpoint.login;
    const userURL = Endpoint.user;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    function changeEmail(val){
        setEmail(val)
    }

    function changePassword(val){
        setPassword(val)
    }

    function storeToken(val){
        localStorage.setItem('_token_user_dicoding', val);
    }
    function submitHandler(e){
        e.preventDefault();

        axios.post(loginURL, {
            email: email,
            password: password,
          })
          .then((response) => {
            if(response.data.status == 'success'){
                alert(response.data.message);
                storeToken(response.data.data.accessToken);
                window.location.href = '/notes'
            }else{
                alert('Something is wrong !');
            }
          }, (error) => {
              if(error.code == 'ERR_BAD_REQUEST'){
                let alert = document.querySelector('.alert');
                let message = error.response.data.message;

                if(alert.classList.contains('d-none')){
                    alert.innerHTML = message;
                    alert.classList.remove('d-none')
                }else{
                    alert.classList.add('d-none')
                }
            }
        });
    }
    return (
        <div className="login-page">
            <div className="form">
                <div className="alert alert-danger d-none"></div>
                <form method="POST" onSubmit={((e) => submitHandler(e))} className="login-form">
                <input required type="email" onChange={((e) => {changeEmail(e.target.value)})} name="email" placeholder="email"/>
                <input required type="password" onChange={((e) => {changePassword(e.target.value)})} name="password" placeholder="password"/>
                <button>Login</button>
                <div className="message">
                    Doesnt have account? <NavLink to='/register'>Register</NavLink>
                </div>
                </form>
            </div>
            </div>
    );
}

export default Login;