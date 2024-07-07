import { useState } from "react";
import { Link } from "react-router-dom";


function Cardropdown(){
    const[isOpen, setIsOpen] = useState(false); 
    return(
        <>
            <li className={ !isOpen ? ""  : "active"  }>
                <a className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
                    <span className="icon"><i className="mdi mdi-car"></i></span>
                    <span className="menu-item-label">Cars</span>
                    <span className="icon"><i className={ !isOpen ? "mdi mdi-plus"  : "mdi mdi-minus"  }></i></span>
                    </a>
                    <ul>
                        <li>
                        <a href={`/cars`}>
                          <span>Car Listing</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/add-car`}>
                        <span>Add Cars</span>
                        </a>
                    </li>
                    </ul>
                </li>

                    



        
        
        
        </>
    );
}
export default Cardropdown;


