
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Sidemenu from "../../Common/Sidemenu";
import { API_BASE_URL } from "../../Constant";

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  
  // Extract date components
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so add 1
  const day = ('0' + date.getDate()).slice(-2);
  
  // Construct formatted date string in desired format (e.g., YYYY-MM-DD)
  const formattedDate = `${year}-${month}-${day}`;
  
  return formattedDate;
};

 function Carlist(){
  const accessToken = localStorage.getItem("accessToken");
  
  const [CollectCars, RealData] = useState([]);
  const [deleted, setDeleted] = useState(false);

    useEffect(()=>{
      fetchCarsData()
  },[]);

  
   
    const isDataEmpty = () => {
      return CollectCars.length === 0;
    };
    const navigate = useNavigate();
    const handleDelete = async (id) => {
        try {
                                                  
          const response = await axios.delete(`${API_BASE_URL}/car/car-delete/${id}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });

          fetchCarsData();
          console.log('Deleted:', response.data.result);
          setDeleted(true); // Optionally, update state or perform any other action after successful deletion
          navigate('/cars');
      } catch (error) {
      console.error('Error deleting:', error);
      // Handle error, show a message, etc.
    } 
  };




 const fetchCarsData = async ()=>{
  {
     await axios.get(`${API_BASE_URL}/car/car-list`,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response)=>{
          if(response != ''){
            if(response.data.status!=0){
              RealData(response.data.result);
              const cars = response.data.result;
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
        

        <section className="is-title-bar">
  <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
    <ul>
        
      <li><a href={`/`}>Admin</a></li>
      <li>Car Listing</li>
    </ul>
    
  </div>
</section>
        
        <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
                Car List
            </h1>
            <Link to={`/add-car`}><button className="button blue">Add cars</button></Link>
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
          <b>Cars</b>
        </div>
        <button type="button" className="button small textual --jb-notification-dismiss">Dismiss</button>
      </div>
    </div>
       )}
    <div className="card has-table">
       {deleted && <p>Document deleted successfully!</p>}
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon"><i className="mdi mdi-car"></i></span>
          Cars
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
            <th>Name</th>
            <th>Car Number</th>
            <th>Car Model</th>
            <th>Register Date</th>
            <th>No. Of Seats</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {
          CollectCars.map((value,key) => {
            return(
              <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <span className="check"></span>
              </label>
            </td>
            <td>
            <span className="icon widget-icon text-red-500">
              <i className="mdi mdi-car mdi-48px"></i>
            </span>
            </td>
            <td data-label="Name">{value.car_name}</td>
            <td data-label="Car Number">{value.car_number}</td>
            <td data-label="Car Model">{value.car_model} </td>
            <td data-label="Register Date">
              <small className="text-gray-500">{value.registration_date?formatDate(value.registration_date):''} </small>
            </td>
            <td data-label="Number Of Seats">{value.number_of_seats} </td>
            <td className="actions-cell">
              <div className="buttons right nowrap">
                <a href={`./car/${value._id}`}>
                <button className="button small green --jb-modal"  data-target="sample-modal-2" type="button">
                  <span className="icon"><i className="mdi mdi-eye"></i></span>
                </button>
                </a>
                <a href={`./edit-car/${value._id}`}>
                <button className="button small blue --jb-modal"  data-target="sample-modal-2" type="button">
                  <span className="icon"><i className="mdi mdi-pencil"></i></span>
                </button>
                </a>
                <button className="button small red --jb-modal" data-target="sample-modal" type="button" onClick={() => handleDelete(value._id)}>
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

   

    <div className="card empty">
      <div className="card-content">
        <div>
          <span className="icon large"><i className="mdi mdi-emoticon-sad mdi-48px"></i></span>
        </div>
        <p>Nothing's here…</p>
      </div>
    </div>
  </section>

 <Footer/>

<div id="sample-modal" className="modal">
  <div className="modal-background --jb-modal-close"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Sample modal</p>
    </header>
    <section className="modal-card-body">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button --jb-modal-close">Cancel</button>
      <button className="button red --jb-modal-close">Confirm</button>
    </footer>
  </div>
</div>

<div id="sample-modal-2" className="modal">
  <div className="modal-background --jb-modal-close"></div>
  <div className="modal-card">
    <header className="modal-card-head">
      <p className="modal-card-title">Sample modal</p>
    </header>
    <section className="modal-card-body">
      <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
      <p>This is sample modal</p>
    </section>
    <footer className="modal-card-foot">
      <button className="button --jb-modal-close">Cancel</button>
      <button className="button blue --jb-modal-close">Confirm</button>
    </footer>
  </div>
</div>



    
</>  
);
}
export default Carlist;       
        

