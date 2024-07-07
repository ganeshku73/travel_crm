import { Link } from "react-router-dom";
import Cardropdown from "../Pages/Cars/Cardropdown";
import Hoteldropdown from "../Pages/Hotels/Hoteldropdown";
import Operatordropdown from "../Pages/Operators/Operatordropdown";
import Roomdropdown from "../Pages/Room/Roomdropdown";
import Locationdropdown from "../Pages/Location/Locationdropdown";

function Sidemenu(){

    return(
        <>
          
        <aside className="aside is-placed-left is-expanded">
         <div className="aside-tools">
          <div className="">
             Admin <b className="font-black">Travel CRM</b>
          </div>
         </div>
  <div className="menu is-menu-main">
   
    <ul className="menu-list">
      <li className="active">
        <a href={`/`}>
          <span className="icon"><i className="mdi mdi-desktop-mac"></i></span>
          <span className="menu-item-label">Dashboard</span>
        </a>
      </li>
    </ul>
    <p className="menu-label">travel packages</p>
    <ul className="menu-list">
      <Cardropdown/>
      <Locationdropdown/>
      <Hoteldropdown/>
      <Roomdropdown/>
      <Operatordropdown/>
      
    </ul>
   
      
  </div>
</aside>
        
        
        
        </>
    );
}
export default Sidemenu;
