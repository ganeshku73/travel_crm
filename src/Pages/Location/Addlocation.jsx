import React, {useEffect, useState } from "react";
import { useNavigate, Link ,useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";



import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

function Addlocation(){
  const accessToken = localStorage.getItem("accessToken");
  const {location_id}  = useParams();
  const [Locationdetail, setLocationDetail]=useState({});

  useEffect(
    ()=>{

      const getLocationDetail = async () => {
        try {                              
          const response = await axios.get(`${API_BASE_URL}/location/location-list/${location_id}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          await setLocationDetail(response.data.result);
          

        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      if (location_id != undefined) {
        getLocationDetail();
      }

    },[]
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocationDetail({
      ...Locationdetail,
      [name]: value
    });
  };
 console.log(Locationdetail);

 const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();
   var l_id = location_id;
   if(location_id == undefined){
     l_id =null;
   }
  
   const datarequest = {
    location_id:l_id,
    location_name:Locationdetail.location_name,
    description:Locationdetail.description
  }
  console.log(datarequest);
  try {
      
    const response = await axios.post(`${API_BASE_URL}/location/location-register`,datarequest, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
  );
  navigate('/location');
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
                  <li>Location Detail Forms</li>
                </ul>
            </div>
          </section>

          <section className="is-hero-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <h1 className="title">
                  Detail Form
                </h1>
                <Link to={`/location`}>
                <button className="button blue">Back</button></Link>
            </div>
          </section>

          <section className="section main-section">
            <form onSubmit={handleSubmit}>
                <div className="card mb-6">
                        <header className="card-header">
                            <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Add Location
                            </p>
                        </header>

                        <div className="card-content">
                            <div className="field">
                              <label className="label">Location Name</label>
                              <div className="control">
                                  <input className="input"  name="location_name" type="text" placeholder="Enter Location Name"
                                     value={Locationdetail.location_name}
                                     onChange={handleInputChange} required />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Description</label>
                              <div className="control">
                                  <textarea className="textarea "  name="description" type="text"
                                    value={Locationdetail.description}
                                    onChange={handleInputChange} required  />
                              </div>
                            </div>

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
export default Addlocation;
