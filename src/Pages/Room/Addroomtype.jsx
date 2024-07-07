import React, {useEffect, useState } from "react";
import { useNavigate, Link ,useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";


import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

function Addroomtype(){
  const accessToken = localStorage.getItem("accessToken");
  const {room_id}  = useParams();
  const [Roomtypedetail, setroomtypeDetail]=useState({});

  useEffect(
    ()=>{

      const getRoomtypeDetail = async () => {
        try {                              
          const response = await axios.get(`${API_BASE_URL}/roomtype/roomtype-list/${room_id}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          await setroomtypeDetail(response.data.result);
          

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      if (room_id != undefined) {
        getRoomtypeDetail();
      }

    },[]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setroomtypeDetail({
      ...Roomtypedetail,
      [name]: value
    });
  };
 console.log(Roomtypedetail);

 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   var r_id = room_id;
   if(room_id == undefined){
     r_id =null;
   }
  
   const datarequest = {
    room_id:r_id,
    room_name:Roomtypedetail.room_name,
    
  }
  console.log(datarequest);
  try {
      
    const response = await axios.post(`${API_BASE_URL}/roomtype/roomtype-register`,datarequest, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
  );
  navigate('/room-type');
}catch (error) {
if (error.response) {
  // The request was made and the server responded with a status code
  console.error("Server responded with error status:", error.response.status);
  console.error("Error data:", error.response.data);
} else if (error.request) {
  // The request was made but no response was received
  console.error("No response received from server");
} else {
  // Something else happened while setting up the request
  console.error("Error:", error.message);
}
}

 }
    return(
        <>
          <Sidemenu/>
          <Header/>

          <section className="is-title-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <ul>
                  <li>Admin</li>
                  <li>Room Type Forms</li>
                </ul>
            </div>
          </section>

          <section className="is-hero-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <h1 className="title">
                   Form
                </h1>
                <Link to={`/room-type`}>
                <button className="button blue">Back</button></Link>
            </div>
          </section>

          <section className="section main-section">
            <form  onSubmit={handleSubmit}>
                <div className="card mb-6">
                        <header className="card-header">
                            <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Room Type Information
                            </p>
                        </header>

                        <div className="card-content">

                           

                            <div className="field">
                                <label className="label">Room Name</label>
                                <div className="control">
                                    <input className="input"  name="room_name" type="text" placeholder="Enter Room Name"
                                        value={Roomtypedetail.room_name}
                                        onChange={handleInputChange} required/>
                                </div>
                            </div>
                        </div>

                        <div className="card-content">
                            <div className="control">
                              <button type="submit" className="bg-green-700 text-white px-2 sm:px-3  py-1 sm:py-2 rounded">
                              Submit
                              </button>
                            </div> 
                        </div>

                </div>
            </form>
        </section>


        <Footer/>

        </>
    );
}
export default Addroomtype;

                        