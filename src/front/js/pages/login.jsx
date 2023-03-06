import React from "react";
import "../../styles/home.css";



export const Login=()=>{

    return(
        <div className="container-fluid">
            <div className="login">
            <h1>Login</h1>
            <div className="inputs d-grid">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            </div>
            </div>
        </div>
    )
}