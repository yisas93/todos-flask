import React, {useState, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Signup=()=>{
    const {actions, store}=useContext(Context)
    const [user, setUser]=useState({
        email: "",
        password: ""
    })
    const handleChange=(event)=>{
        setUser({
            ...user,
            [event.target.name]: event.target.value,
            
          });
    }
    const handleSignup=async(event)=>{
        event.preventDefault();
        let result = await actions.SignUp(user)
       
    }
    return(
        <div className="container-fluid">
            <div className="signup">
                <form onSubmit={handleSignup}>
                    <div className="inputsign d-grid">
                        <input name="email" onChange={handleChange} type="text" className="input-sign" placeholder="email"/>
                        <input name="password"  onChange={handleChange} type="password" className="input-sign" placeholder="password"/>
                        <input type="password" className="input-sign" placeholder="confirm password"/>
                    </div>
                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}