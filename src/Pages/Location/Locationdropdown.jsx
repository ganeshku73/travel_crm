import { useState } from "react";
import { Link } from "react-router-dom";


function Locationdropdown(){
    const[isOpen, setIsOpen] = useState(false); 
    return(
        <>
            <li className={ !isOpen ? ""  : "active"  }>
                <a className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
                    <span className="icon"><i className="mdi mdi-map-marker"></i></span>
                    <span className="menu-item-label">Location</span>
                    <span className="icon"><i className={ !isOpen ? "mdi mdi-plus"  : "mdi mdi-minus"  }></i></span>
                    </a>
                    <ul>
                        <li>
                        <a href={`/location`}>
                          <span>Location Listing</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/add-location`}>
                        <span>Add Location</span>
                        </a>
                    </li>
                    </ul>
                </li>
        
        </>
    );
}
export default Locationdropdown;


