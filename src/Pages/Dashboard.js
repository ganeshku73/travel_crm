
import './../App.css';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidemenu from '../Common/Sidemenu';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { API_BASE_URL } from "../Constant";

function Dashboard() {
  const accessToken = localStorage.getItem("accessToken");
  const [CollectCars, RealData] = useState([]);
  const [CollectHotel, RealHotelData] = useState([]);
  const [OperatorsData, RealOperatorData] = useState([]);
  useEffect(
    ()=>{
        axios.get(`${API_BASE_URL}/car/car-list`,{
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response)=>{
          RealData(response.data.result);
      });
    },[]
);
useEffect(async ()=>{
  await axios.get(`${API_BASE_URL}/hotel/hotel-list`,{
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response)=>{
    if(response != ''){
      if(response.data.status!=0){
        RealHotelData(response.data.result);
        const hotels = response.data.result;
        console.log(response.data);
      }
    }
  }).catch(error => console.log(error));
  },[]
)

useEffect(async ()=>{

  await axios.get(`${API_BASE_URL}/operator/operator-list`,{
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then((response)=>{
    RealOperatorData(response.data.result);

})
},[])




  return (
    <>
      <Sidemenu/>
      <Header/>

              <section className="is-title-bar">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                        <ul>
                        <li>Admin</li>
                        <li>Dashboard</li>
                        </ul>
                       
                    </div>
            </section>

      <section className="is-hero-bar">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <h1 className="title">
            Dashboard
          </h1>
        
        </div>
      </section>

          <section className="section main-section">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
            <a href={`/cars`}>
            <div className="card">
                <div className="card-content">
                  <div className="flex items-center justify-between">
                    <div className="widget-label">
                      
                      <h3>
                        Cars
                      </h3>
                      <h1>
                        {CollectCars.length}
                      </h1>
                      
                    </div>
                    <span className="icon widget-icon text-red-500"><i className="mdi mdi-car mdi-48px"></i></span>
                  </div>
                </div>
              </div>
              </a>


              <a href={`/hotels`}>
              <div className="card">
                <div className="card-content">
                  <div className="flex items-center justify-between">
                    <div className="widget-label">
                      <h3>
                        Hotels
                      </h3>
                      <h1>
                        {CollectHotel.length}
                      </h1>
                    </div>
                    <span className="icon widget-icon text-blue-500"><i className="mdi mdi-hotel mdi-48px"></i></span>
                  </div>
                </div>
              </div>
              </a>

            <a href={`/operators`}>
              <div className="card">
                <div className="card-content">
                  <div className="flex items-center justify-between">
                    <div className="widget-label">
                      <h3>
                        Operators
                      </h3>
                      <h1>
                        {OperatorsData.length}
                      </h1>
                    </div>
                    <span className="icon widget-icon text-green-500"><i className="mdi mdi-account-circle mdi-48px"></i></span>
                  </div>
                </div>
               </div> 
              </a>
            </div>
           

           </section>

        <Footer/>

       

    </>
    
  );
}

export default Dashboard;


