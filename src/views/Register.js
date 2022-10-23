import React, { useState } from "react";
import Endpoint from "../config/EndPoint";
import axios from "axios";

const Register = () => {
    const register_URL = Endpoint.register;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');

    function changeName(val){
        setName(val)
    }
    function changeEmail(val){
        setEmail(val)
    }
    function changePassword(val){
        let alert = document.querySelector('.alert');
        if(val.length < 0 ){
            if(alert.classList.contains('d-none')){
                alert.classList.add('d-none')
            }
        }else{
            if(alert.classList.contains('d-none')){
                alert.classList.add('d-none')
            }
        }
        setPassword(val)
    }
    function storeToken(val){
        setToken(val)
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
                alert(response.data.message)
            }else{
                alert('Something is wrong !');
            }
          }, (error) => {
            console.log(error);
        });
    }
    return (
        <div className="login-page">

            <div className="form">
                <h3>Register</h3>

                <div className="alert alert-danger d-none">Password minimal 6 karakter</div>
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