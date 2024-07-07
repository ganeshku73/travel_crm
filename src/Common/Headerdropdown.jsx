import { useState } from "react";
import { NavLink ,Link, useParams, useNavigate } from "react-router-dom";


function Headerdropdown(){

    const navigate = useNavigate();
    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      navigate('/login');
    };


    const[isOpen, setIsOpen] = useState(false); 
    return(
        <>
            
            <div onClick={() => setIsOpen((prev) => !prev)} className={ !isOpen ? "navbar-item dropdown has-divider has-user-avatar "  : "navbar-item dropdown has-divider has-user-avatar active"  }>
                <a className="navbar-link">
                <div className="user-avatar">
                 <img src="https://avatars.dicebear.com/v2/initials/john-doe.svg" alt="John Doe" className="rounded-full"/>
                 </div>
                <div className="is-user-name"><span>John Doe</span></div>
                <span className="icon">
                    <i className={ !isOpen ? "mdi mdi-chevron-down"  : "mdi mdi-chevron-up"  }></i>
                </span>
                </a>
                <div className="navbar-dropdown">
                     <Link to={`/Profilelist`}>
                <a href="profile.html" className="navbar-item">
                    <span className="icon"><i className="mdi mdi-account"></i></span>
                    <span>My Profile</span>
                </a>
                </Link>
               
                <hr className="navbar-divider"/>
                <a onClick={handleLogout} className="navbar-item">
                    <span className="icon"><i className="mdi mdi-logout"></i></span>
                    <span>Log Out</span>
                </a>
                </div>
            </div>   
           
        </>
    );
}
export default Headerdropdown;


