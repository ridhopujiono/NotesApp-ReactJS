import React, { useState } from "react";
import Endpoint from "../config/EndPoint";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const register_URL = Endpoint.register;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function changeName(val){
        setName(val)
    }
    function changeEmail(val){
        setEmail(val)
    }
    function changePassword(val){
        let alert = document.querySelector('.alert');
        if(val.length < 6 ){
            if(alert.classList.contains('d-none')){
                alert.innerHTML = 'Password minimal 6 karakter';
                alert.classList.remove('d-none')
            }
        }else{
            if(!alert.classList.contains('d-none')){
                alert.classList.add('d-none')
            }
            setPassword(val)
        }
    }
    function submitHandler(e){
        e.preventDefault();

        axios.post(register_URL, {
            name: name,
            email: email,
            password: password,
          })
          .then((response) => {
            if(response.data.status == 'success'){
                alert(response.data.message);
                navigate('/');
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
                <h3>Register</h3>

                <div className="alert alert-danger d-none"></div>
                <form method="POST" onSubmit={((e) => submitHandler(e))} className="login-form">
                <input required type="text" onChange={((e) => {changeName(e.target.value)})} name="name" placeholder="name"/>
                <input required type="email" onChange={((e) => {changeEmail(e.target.value)})} name="email" placeholder="email"/>
                <input required type="password" onChange={((e) => {changePassword(e.target.value)})} name="password" placeholder="password"/>
                <button>Register Now!</button>
                </form>
            </div>
            </div>
    );
}

export default Register;