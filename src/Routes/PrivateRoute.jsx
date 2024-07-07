import React from "react";
import { Outlet,Navigate } from "react-router-dom";

const PrivateRoute = ()=>{
    let isLoggedIn = false;
    if(isLoggedIn){
        return <Outlet/>
    }else{
        return <Navigate to={"/login"} />
    }

}

export default PrivateRoute;