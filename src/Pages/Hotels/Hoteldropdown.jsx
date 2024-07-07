import { useState } from "react";
import { Link } from "react-router-dom";


function Hoteldropdown(){
    const[isOpen, setIsOpen] = useState(false); 
    return(
        <>
            <li className={ !isOpen ? ""  : "active"  }>
                <a className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
                    <span className="icon"><i className="mdi mdi-hotel"></i></span>
                    <span className="menu-item-label">Hotels</span>
                    <span className="icon"><i className={ !isOpen ? "mdi mdi-plus"  : "mdi mdi-minus"  }></i></span>
                    </a>
                    <ul>
                        <li>
                        <a href={`/hotels`}>
                            <span>Hotel Listing</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/add-hotels`}>
                        <span>Add Hotels</span>
                        </a>
                    </li>
                    </ul>
                </li>
        </>
    );
}
export default Hoteldropdown;


