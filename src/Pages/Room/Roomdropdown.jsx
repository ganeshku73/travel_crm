import { useState } from "react";
import { Link } from "react-router-dom";


function Roomdropdown(){
    const[isOpen, setIsOpen] = useState(false); 
    return(
        <>
            <li className={ !isOpen ? ""  : "active"  }>
                <a className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
                    <span className="icon"><i className="mdi mdi-home"></i></span>
                    <span className="menu-item-label">Rooms</span>
                    <span className="icon"><i className={ !isOpen ? "mdi mdi-plus"  : "mdi mdi-minus"  }></i></span>
                    </a>
                    <ul>
                        <li>
                            <a href={`/room-type`}>
                            <span>Room Type</span>
                            </a>
                        </li>
                        <li>
                        <a href={`/add-rooms`}>
                        <span>Add Rooms</span>
                        </a>
                        </li>
                        <li>
                        <a href={`/rooms`}>
                          <span>Room Listing</span>
                        </a>
                    </li>
                    
                   
                    </ul>
                </li>
        
        </>
    );
}
export default Roomdropdown;


