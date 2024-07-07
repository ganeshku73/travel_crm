import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Sidemenu from "../../Common/Sidemenu";
import { NavLink ,Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
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

function Cardetail(){
    const {car_id}  = useParams();
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const [Cardetail, setCarDetail]=useState([]);
    
    useEffect(
        ()=>{
            axios.get(`${API_BASE_URL}/car/car-list/${car_id}`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response)=>{
                setCarDetail(response.data.result);
              
            });
        },[]
    );



    return(
        <>
            <Sidemenu/>
            <Header/>

            <section className="is-title-bar">
             <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <ul>
                <li>Admin</li>
                <li>Car Detail</li>
                </ul>
             </div>
            </section>

            <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
                 Car Detail Form
            </h1>
            <Link to={`/cars`}><button className="button blue">Back to Carlist</button></Link>
        </div>
       </section>

       <div class="container mx-auto px-4">
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-gray-200 p-4"><b>Car Name :</b> {Cardetail.car_name}</div>
                <div class="bg-gray-200 p-4"><b>Car Number :</b> {Cardetail.car_number}</div>
                <div class="bg-gray-200 p-4"><b>Car Model :</b> {Cardetail.car_model}</div>
                <div class="bg-gray-200 p-4"><b>Car Registration Date :</b> {formatDate(Cardetail.registration_date)}</div>
                <div class="bg-gray-200 p-4"><b>Car Colour :</b> {Cardetail.car_color}</div>
                <div class="bg-gray-200 p-4"><b>Car Photo :</b> {Cardetail.photo}</div>
                <div class="bg-gray-200 p-4"><b>Is AC Car :</b> {Cardetail.is_ac}</div>
                <div class="bg-gray-200 p-4"><b>Is Bluetooth Car :</b> {Cardetail.is_bluetooth}</div>
                <div class="bg-gray-200 p-4"><b>Number Of Seats In Car :</b> {Cardetail.number_of_seats}</div>
                <div class="bg-gray-200 p-4"><b>Photo :</b> 
                <img src={`${API_BASE_URL}/car/${Cardetail.photo}`} />
                </div>
            </div>
        </div>
                
        
        <Footer/>
        </>
    );
}
export default Cardetail;