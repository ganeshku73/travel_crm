import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Sidemenu from "../../Common/Sidemenu";
import { NavLink ,Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";

function Operatordetail(){
    const {operator_id}  = useParams();
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const [Operatordetail, setOperatorDetail]=useState([]);

    useEffect(
        ()=>{
            axios.get(`${API_BASE_URL}/operator/operator-list/`+operator_id,{
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response)=>{
                setOperatorDetail(response.data.result);
              
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
                <li>Operator Detail</li>
                </ul>
             </div>
            </section>

            <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
                Operator Detail Form
            </h1>
            <Link to={`/operators`}><button className="button blue">Back to Operatorlist</button></Link>
        </div>
       </section>

       <div class="container mx-auto px-4">
            <div class="grid grid-cols-3 gap-4">
                <div class="bg-gray-200 p-4"><b>Operator Name :</b> {Operatordetail.operator_name}</div>
                <div class="bg-gray-200 p-4"><b>Operator Phone Number :</b> {Operatordetail.operator_phone_number}</div>
                <div class="bg-gray-200 p-4"><b>Number Of Cars :</b> {Operatordetail.number_of_cars}</div>
                <div class="bg-gray-200 p-4"><b>Operator's Rating :</b> {Operatordetail.operator_rating}</div>
                <div class="bg-gray-200 p-4"><b>Operator Country Name :</b> {Operatordetail.operator_country_name}</div>
                <div class="bg-gray-200 p-4"><b>Operator State Name :</b> {Operatordetail.operator_state_name}</div>
                <div class="bg-gray-200 p-4"><b>Operator City Name :</b> {Operatordetail.operator_city_name}</div>
                <div class="bg-gray-200 p-4"><b>Landmark :</b> {Operatordetail.landmark}</div>
                <div class="bg-gray-200 p-4"><b>Zipcode :</b> {Operatordetail.zipcode}</div>
                <div class="bg-gray-200 p-4"><b>Operator Email Id :</b> {Operatordetail.operator_email_id}</div>
                <div class="bg-gray-200 p-4"><b>Operator Photo :</b> 
                <img src={`${API_BASE_URL}/operator/`+Operatordetail.operator_photo} />
                </div>
                
            </div>
        </div>
                
        
        <Footer/>
        </>
    );
}
export default Operatordetail;