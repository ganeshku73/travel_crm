import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { API_BASE_URL } from "../../Constant";


function Roomlist(){
    const accessToken = localStorage.getItem("accessToken");
  
    const [CollectRooms, RealData] = useState([]);
    const [deleted, setDeleted] = useState(false);

    useEffect(()=>{
        fetchRoomsData()
    },[]);
    
      const isDataEmpty = () => {
        return CollectRooms.length === 0;
      };
      const navigate = useNavigate();
      const handleDelete = async (id) => {
       
        try {
                                              
          const response = await axios.delete(`${API_BASE_URL}/room/room-delete/${id}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
    
          fetchRoomsData();
          console.log('Deleted:', response.data.result);
          setDeleted(true); // Optionally, update state or perform any other action after successful deletion
          navigate('/rooms');
        } catch (error) {
          console.error('Error deleting:', error);
          // Handle error, show a message, etc.
        } 
      };

      const fetchRoomsData = async ()=>{
        {
           await axios.get(`${API_BASE_URL}/room/room-list`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response)=>{
                if(response != ''){
                  if(response.data.status!=0){
                    RealData(response.data.result);
                    const rooms = response.data.result;
                    console.log(response.data);
                  }
                }
              }).catch(error => console.log(error));
          }
      }
      
      
        
    return(
        <>
            <Sidemenu/>
            <Header/>
                <section class="is-title-bar">
                    <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <ul>
                        <li><a href={`/`}>Admin</a></li>
                        <li>Room Listing</li>
                    </ul>
                    </div>
                </section>

                <section className="is-hero-bar">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                    <h1 className="title">
                        Room List
                    </h1>
                    <Link to={`/add-rooms`}><button className="button blue">Add Rooms</button></Link>
                </div>
                </section>


                <section className="section main-section">
                {isDataEmpty() ? (
            <div className="notification red">
              {deleted && <p>Document deleted successfully!</p>}
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
              <div>
                <span className="icon"><i className="mdi mdi-buffer"></i></span>
                <b>Empty table.</b>
              </div>
              <button type="button" className="button small textual --jb-notification-dismiss">Dismiss</button>
            </div>
            </div>
        ):(
                <div className="notification blue">
                {deleted && <p>Document deleted successfully!</p>}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                    <div>
                    <span className="icon"><i className="mdi mdi-buffer"></i></span>
                    <b>Room</b>
                    </div>
                    <button type="button" className="button small textual --jb-notification-dismiss">Dismiss</button>
                </div>
                </div>
                )}

                <div className="card has-table">
                    <header className="card-header">
                        <p className="card-header-title">
                        <span className="icon"><i className="mdi mdi-home"></i></span>
                        Rooms
                        </p>
                        
                        <a href="#" className="card-header-icon">
                        <span className="icon"><i className="mdi mdi-reload"></i></span>
                        </a>
                    
                    </header>
                    <div className="card-content">
                        
                        <table>
                        <thead>
                        <tr>
                            <th className="checkbox-cell">
                            <label className="checkbox">
                                <input type="checkbox"/>
                                <span className="check"></span>
                            </label>
                            </th>
                            <th className="image-cell"></th>
                            <th>Hotel Name</th>
                            <th>Room Name</th>
                            <th>Room Number</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            CollectRooms.map((value,key) => {
                                return(
                        <tr>
                            <td className="checkbox-cell">
                                <label className="checkbox">
                                <input type="checkbox"/>
                                <span className="check"></span>
                                </label>
                            </td>
                            <td className="image-cell">
                            <span className="icon widget-icon text-blue-500"><i className="mdi mdi-home mdi-48px"></i></span>
                            </td>
                            <td data-label="Hotel Name">{value.hotel_name}</td>
                            <td data-label="Room Name">{value.room_name}</td>
                            <td data-label="Room Number">{value.room_number}</td>
                            <td data-label="Price">{value.price}</td>
                            <td></td>
                            <td className="actions-cell">
                                <div className="buttons right nowrap">

                                    <a href={`./rooms/${value._id}`}>
                                        <button className="button small green --jb-modal"  data-target="sample-modal-2" type="button">
                                            <span className="icon"><i className="mdi mdi-eye"></i></span>
                                        </button>
                                    </a>

                                    <a href={`./edit-room/${value._id}`}>
                                        <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button">
                                            <span className="icon"><i className="mdi mdi-pencil"></i></span>
                                        </button>
                                    </a>
                                        <button className="button small red --jb-modal" data-target="sample-modal" type="button"onClick={() => handleDelete(value._id)}  >
                                            <span className="icon"><i className="mdi mdi-trash-can"></i></span>
                                        </button>
                                </div>
                            </td>
                        </tr>
                         )

                        })
              
                        }
                        </tbody>
                        </table>

                        <div className="table-pagination">
                        <div className="flex items-center justify-between">
                            <div className="buttons">
                            <button type="button" className="button active">1</button>
                            <button type="button" className="button">2</button>
                            <button type="button" className="button">3</button>
                            </div>
                            <small>Page 1 of 3</small>
                        </div>
                        </div>

                    </div>
                    </div>
                </section>
        



            <Footer/>
        
        </>
    );
}
export default Roomlist;