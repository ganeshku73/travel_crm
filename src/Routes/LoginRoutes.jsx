
import React from 'react';
import '../index.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from '../Pages/Login';

function LoginRoutes(){
    return(
            <>
            <Router>
                <Routes>
                    <Route path="/login" exact component={<Login />}/>
                </Routes>
            </Router>
                
            </>
        );
}
export default LoginRoutes;