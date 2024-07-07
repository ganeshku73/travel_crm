//import logincss from '../Css/Login.css';
//import styled from 'styled-components'
import React, {useEffect, useState } from "react";
import { useNavigate,Navigate } from "react-router-dom";
import axios from "axios";


function Login(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    
    const [error, setError] = useState(null);
    
    const accessToken = localStorage.getItem("accessToken");
    var isLoggedIn = false;

    if(accessToken !==null){
      navigate('/');
    }
    
   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axios.post("http://api.tripmydeal.com/auth/login", {
          username:username,
          password:password
      });
      // Handle successful login, such as storing authentication token
      console.log("Login successful:", response.data);
      await localStorage.setItem("accessToken", response.data.access_token);

      if(response.data.access_token != null){
        isLoggedIn = true;
      }

      if(isLoggedIn){
        navigate('/');
      }

      }catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with error status:", error.response.status);
          console.error("Error data:", error.response.data);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received from server");
        } else {
          // Something else happened while setting up the request
          console.error("Error:", error.message);
        }
    }

    }
    
    
    return(
        <>
        <div className="form-screen">

            <div width="100%">
            <section class="section main-section">
                <div class="card">
                   <header class="card-header">
                     <p class="card-header-title">
                     <span class="icon"><i class="mdi mdi-lock"></i></span>
                       Login
                     </p>
                   </header>
                <div class="card-content">
                    <form onSubmit={handleSubmit}>

                     <div class="field spaced">
                        <label class="label">Login</label>
                        <div class="control icons-left">
                          <input class="input" type="text"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}/>
                          <span class="icon is-small left"><i class="mdi mdi-account"></i></span>
                        </div>
                      <p class="help">
                         Please enter your login
                      </p>
                    </div>

          <div class="field spaced">
            <label class="label">Password</label>
            <p class="control icons-left">
              <input class="input"  type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}/>
              <span class="icon is-small left"><i class="mdi mdi-asterisk"></i></span>
            </p>
            <p class="help">
              Please enter your password
            </p>
          </div>
         <hr/>

          <div class="field grouped">
            <div class="control">
                 {error && <p>{error}</p>}
              <button type="submit" class="button blue">
                Login
              </button>
            </div>
            <div class="control">
              <a href="index.html" class="button">
                Back
              </a>
            </div>
          </div>

        </form>
      </div>
    </div>

  </section>
  </div>   
  </div>
        
        </>
    );
}
export default Login;