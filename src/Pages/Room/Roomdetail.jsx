import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Sidemenu from "../../Common/Sidemenu";
import { NavLink ,Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";



function Roomdetail(){
    const {room_id}  = useParams();
    const accessToken = localStorage.getItem("accessToken");
    const [roomDetail, setRoomDetail]=useState([]);
    const [roomamenitiesCheckedItems, setCheckedRoomamenitiesItems] = useState({});


    useEffect(
        ()=>{
            axios.get(`${API_BASE_URL}/room/room-list/${room_id}`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response)=>{
                setRoomDetail(response.data.result);
                if(response.data.result.roomamenities){
                    var roomamenitiescheced = JSON.parse(response.data.result.roomamenities);
                    setCheckedRoomamenitiesItems(roomamenitiescheced);
                }

            });
        },[]
    );



    return(
        <>
        <Header/>
        <Sidemenu/>

        <section className="is-title-bar">
             <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <ul>
                <li>Admin</li>
                <li>Room Detail</li>
                </ul>
             </div>
            </section>

            <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
                 Room Detail Form
            </h1>
            <Link to={`/rooms`}><button className="button blue">Back to Roomlist</button></Link>
        </div>
       </section>
       <div class="container mx-auto px-4">
       <div class="grid grid-cols-3 gap-4">

            <div class="bg-gray-200 p-4"><b>Hotel Name :</b> {roomDetail.hotel_name}</div>
            <div class="bg-gray-200 p-4"><b>Room Name :</b> {roomDetail.room_name}</div>
            <div class="bg-gray-200 p-4"><b>Price :</b> {roomDetail.price}</div>
            <div class="bg-gray-200 p-4"><b>Room Number :</b> {roomDetail.room_number}</div>
            <div class="bg-gray-200 p-4"><b>Number Of Beds :</b> {roomDetail.number_of_beds}</div>
            <div class="bg-gray-200 p-4"><b>Room Size:</b> {roomDetail.room_size}</div>
            <div class="bg-gray-200 p-4"><b>Max Adults :</b> {roomDetail.max_adults}</div>
            <div class="bg-gray-200 p-4"><b>Max Children :</b> {roomDetail.max_children}</div>
            <div class="bg-gray-200 p-4"><b>Status :</b> {roomDetail.status}</div>
            <div class="bg-gray-200 p-4"><b>Room Amenities :</b>
            <ul className="pl-4 sm:pl-6">
                <li> Wake-up call : {roomamenitiesCheckedItems[' wake-up_call']?" Yes " : " No "}</li>
                <li>Car hire: {roomamenitiesCheckedItems['car_hire']?" Yes " : " No "}</li>
                <li>Bicycle hire: {roomamenitiesCheckedItems['bicycle_hire']?" Yes " : " No "}</li>
                <li>Flat tv : {roomamenitiesCheckedItems['flat_tv']?" Yes " : " No "}</li>
                <li>Laundry : {roomamenitiesCheckedItems['laundry_and_dry_cleaning']?" Yes " : " No "}</li>
                <li> Internet – Wifi : {roomamenitiesCheckedItems['internet_Wifi']?" Yes " : " No "}</li>
                <li>Ac Available  : {roomamenitiesCheckedItems['ac']?" Yes " : " No "}</li>
                <li>Non Ac Available  : {roomamenitiesCheckedItems['non_ac']?" Yes " : " No "}</li>
                <li>Swiming Pool Available : {roomamenitiesCheckedItems['swiming_pool']?" Yes " : " No "}</li>
                <li>Gym Available : {roomamenitiesCheckedItems['gym']?" Yes " : " No "}</li>
                <li>Play Area Available : {roomamenitiesCheckedItems['play_area']?" Yes " : " No "}</li>
                <li>Coffee And Tea : {roomamenitiesCheckedItems['coffee_and_tea']?" Yes " : " No "}</li>
            </ul>
            </div>
           
            <div class="bg-gray-200 p-4"><b>Room Photo :</b>  
                <img src={`${API_BASE_URL}/room/${roomDetail.room_photo}`} />
            </div>
            <div class="bg-gray-200 p-4"><b>Gallery :</b> 
                <img src={`${API_BASE_URL}/room/${roomDetail.gallery}`} />
            </div>
       </div>
       </div>

        <Footer/>
        </>
    );
}
export default Roomdetail;