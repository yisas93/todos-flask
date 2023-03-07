import React, {useState, useContext} from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login=()=>{
    const {actions, store}=useContext(Context)
    const navigate = useNavigate()
    const [user, setUser] = useState({
        email: '',
        password: '',
      });
    
      function handleChange(event) {
        setUser({
          ...user,
          [event.target.name]: event.target.value,
          
        });
      }
    const handleLogin=async(event)=>{
      event.preventDefault();
       let result = await actions.login(user)
       console.log(result)
    }
    return(
        <div className="container-fluid">
            <div className="login">
            <h1>Login</h1>
            <form type="submit" onSubmit={handleLogin}>
            <div className="inputs d-grid">
            <input name="email" value={user.email} onChange={handleChange} type="text" placeholder="Username" className="inputlogin"/>
            <input name="password" value={user.password} onChange={handleChange} type="password" placeholder="Password" className="inputlogin"/>
            </div>
            <button type="submit">Login</button>
            </form>
            <Link to="/signup"><button>SignUp</button></Link>
            </div>
        </div>
    )
}