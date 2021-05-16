import React from "react";

function Login() {
    return (
        <form className="loginForm">
            <label><b>Email</b></label>
            <input type="text" placeholder="Enter Email" name="name" id="username" />
            <label><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" id="password" />
            <button type="submit" id="loginBtn">Login</button>
        </form>
    );
}

export default Login;