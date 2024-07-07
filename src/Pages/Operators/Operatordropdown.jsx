import { useState } from "react";
import { Link } from "react-router-dom";

function Operatordropdown(){
    const[isOpen, setIsOpen] = useState(false); 
    return(
        <>
            <li className={ !isOpen ? ""  : "active"  }>
                <a className="dropdown" onClick={() => setIsOpen((prev) => !prev)}>
                    <span className="icon"><i className="mdi mdi-account-circle"></i></span>
                    <span className="menu-item-label">Operators</span>
                    <span className="icon"><i className={ !isOpen ? "mdi mdi-plus"  : "mdi mdi-minus"  }></i></span>
                    </a>
                    <ul>
                        <li>
                        <a href={`/operators`}>
                            <span>Operator Listing</span>
                        </a>
                    </li>
                    <li>
                        <a href={`/add-operators`}>
                        <span>Add Operators</span>
                        </a>
                    </li>
                    </ul>
                </li>
        </>
    );
}
export default Operatordropdown;


