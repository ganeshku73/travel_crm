import Footer from "../../Common/Footer";
import Header from "../../Common/Header";
import Sidemenu from "../../Common/Sidemenu";
import { NavLink ,Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";


function Hoteldetail(){
    const {hotel_id}  = useParams();
    // const params={
    //     id:hotel_id
    //    };

    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const [hotelDetail, setHotelDetail]=useState([]);
    const [budgetCheckedItems, setCheckedBudgetItems] = useState({});
    const [servicesCheckedItems, setCheckedServiceItems] = useState({});
    const [propertyCheckedItems, setPropertyCheckedItems] = useState({});
    const [facilitiesCheckedItems, setFacilitiesCheckedItems] = useState({});
    const [hotelserviceCheckedItems, setHotelserviceCheckedItems] = useState({});

    useEffect(
        ()=>{
            axios.get(`${API_BASE_URL}/hotel/hotel-list/${hotel_id}`,{
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
              }).then((response)=>{
                setHotelDetail(response.data.result);
                if(response.data.result.budget){
                    var budgetcheced = JSON.parse(response.data.result.budget);
                    setCheckedBudgetItems(budgetcheced);
                }
                if(response.data.result.services){
                    var servicescheced = JSON.parse(response.data.result.services);
                    setCheckedServiceItems(servicescheced);
                }
                if(response.data.result.property_type){
                    var propertycheced = JSON.parse(response.data.result.property_type);
                    
                    setPropertyCheckedItems(propertycheced);
                }
                if(response.data.result.facilities){
                    var facilitiescheced = JSON.parse(response.data.result.facilities);
                    setFacilitiesCheckedItems(facilitiescheced);
                }
                if(response.data.result.hotel_service){
                    var hotelservicecheced = JSON.parse(response.data.result.hotel_service);
                    setHotelserviceCheckedItems(hotelservicecheced);
                }

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
                <li>Hotel Detail</li>
                </ul>
             </div>
            </section>

            <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
                 Hotel Detail Form
            </h1>
            <Link to={`/hotels`}><button className="button blue">Back to Hotellist</button></Link>
        </div>
       </section>

       <div class="container mx-auto px-4">
            <div class="grid grid-cols-3 gap-4">
            
                <div class="bg-gray-200 p-4"><b>Hotel Name :</b> {hotelDetail.hotel_name}</div>
                <div class="bg-gray-200 p-4"><b>Hotel rating standard:</b> {hotelDetail.hotel_rating_standard}</div>
                <div class="bg-gray-200 p-4"><b> Time for check in :</b> {hotelDetail.time_for_check_in}</div>
                <div class="bg-gray-200 p-4"><b> Time for check out :</b> {hotelDetail.time_for_check_out}</div>
                <div class="bg-gray-200 p-4"><b>Min day before booking:</b> {hotelDetail.min_day_before_booking}</div>
                <div class="bg-gray-200 p-4"><b>Min day stays:</b> {hotelDetail.min_day_stays}</div>
                <div class="bg-gray-200 p-4"><b>Price:</b> {hotelDetail.price}</div>
                <div class="bg-gray-200 p-4"><b>Offer Price :</b> {hotelDetail.offer_price}</div>
                <div class="bg-gray-200 p-4"><b>Phone Number :</b> {hotelDetail.phone_number}</div>
                <div class="bg-gray-200 p-4"><b>Email Id :</b> {hotelDetail.email_id}</div>
                <div class="bg-gray-200 p-4"><b>Website :</b> {hotelDetail.website}</div>
                <div class="bg-gray-200 p-4"><b>Food :</b> {hotelDetail.food}</div>
                <div class="bg-gray-200 p-4"><b>Publish :</b> {hotelDetail.publish}</div>
                <div class="bg-gray-200 p-4"><b>Available Hotel :</b> {hotelDetail.hotel_featured}</div>
                <div class="bg-gray-200 p-4"><b>Seo Title:</b> {hotelDetail.Seo_title}</div>
            </div>
            
           
            <div class="grid grid-cols-3 gap-4 mt-3 sm:mt-5">
                <div class="bg-gray-200 p-4"><b>Location :</b> {hotelDetail.location}</div>
                <div class="bg-gray-200 p-4"><b>Real Address :</b> {hotelDetail.real_address}</div>
                <div class="bg-gray-200 p-4"><b>Map Latitude :</b> {hotelDetail.map_latitude}</div>
                <div class="bg-gray-200 p-4"><b>Map Longitude :</b> {hotelDetail.map_longitude}</div>
                <div class="bg-gray-200 p-4"><b>Map Zoom :</b> {hotelDetail.map_zoom}</div>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-3 sm:mt-5">
                <div class="bg-gray-200 p-4"><b>Allow search engines to show this service in search results? :</b> {hotelDetail.search_engines_show_service}</div>
                <div class="bg-gray-200 p-4"><b>Youtube Video :</b> {hotelDetail.youtube_video}</div>
            </div>

            <div class="grid grid-cols-3 gap-4 mt-3 sm:mt-5"> 
                <div class="bg-gray-200 p-4"><b>Attribute: Property type :</b> 
                <ul className="pl-4 sm:pl-6">
                    <li>Apartments : {propertyCheckedItems['apartments']?" Yes " : " No "}</li>
                    <li>Hotels: {propertyCheckedItems['hotels']?" Yes " : " No "}</li>
                    <li>homestays: {propertyCheckedItems['homestays']?" Yes " : " No "}</li>
                    <li>Villas : {propertyCheckedItems['villas']?" Yes " : " No "}</li>
                    <li>Boats : {propertyCheckedItems['boats']?" Yes " : " No "}</li>
                    <li>Motels : {propertyCheckedItems['motels']?" Yes " : " No "}</li>
                    <li>Resorts : {propertyCheckedItems['resorts']?" Yes " : " No "}</li>
                    <li>Lodges: {propertyCheckedItems['lodges']?" Yes " : " No "}</li>
                    <li>Holiday homes : {propertyCheckedItems['holiday_homes']?" Yes " : " No "}</li>
                    <li>Cruises : {propertyCheckedItems['cruises']?" Yes " : " No "}</li>
                </ul>
                 </div>
                
                
                <div class="bg-gray-200 p-4"><b>Attribute: Facilities :</b> 
                <ul className="pl-4 sm:pl-6">
                    <li> Wake-up call : {facilitiesCheckedItems[' wake-up_call']?" Yes " : " No "}</li>
                    <li>Car hire: {facilitiesCheckedItems['car_hire']?" Yes " : " No "}</li>
                    <li>Bicycle hire: {facilitiesCheckedItems['bicycle_hire']?" Yes " : " No "}</li>
                    <li>Flat tv : {facilitiesCheckedItems['flat_tv']?" Yes " : " No "}</li>
                    <li>Laundry : {facilitiesCheckedItems['laundry_and_dry_cleaning']?" Yes " : " No "}</li>
                    <li> Internet – Wifi : {facilitiesCheckedItems['internet_Wifi']?" Yes " : " No "}</li>
                    <li>Ac Available  : {facilitiesCheckedItems['ac']?" Yes " : " No "}</li>
                    <li>Non Ac Available  : {facilitiesCheckedItems['non_ac']?" Yes " : " No "}</li>
                    <li>Swiming Pool Available : {facilitiesCheckedItems['swiming_pool']?" Yes " : " No "}</li>
                    <li>Gym Available : {facilitiesCheckedItems['gym']?" Yes " : " No "}</li>
                    <li>Play Area Available : {facilitiesCheckedItems['play_area']?" Yes " : " No "}</li>
                    <li>Coffee And Tea : {facilitiesCheckedItems['coffee_and_tea']?" Yes " : " No "}</li>
                </ul>
                 </div>
                
                
                <div class="bg-gray-200 p-4"><b>Attribute: Hotel Service :</b> 
                <ul className="pl-4 sm:pl-6">
                    <li>Havana Lobby bar : {hotelserviceCheckedItems['havana_lobby_bar']?" Yes " : " No "}</li>
                    <li>Fiesta Restaurant: {hotelserviceCheckedItems['fiesta_restaurant']?" Yes " : " No "}</li>
                    <li>Hotel transport: {hotelserviceCheckedItems['hotel_transport']?" Yes " : " No "}</li>
                    <li>Free luggage : {hotelserviceCheckedItems['free_luggage_deposit']?" Yes " : " No "}</li>
                    <li>Laundry Services : {hotelserviceCheckedItems['laundry_services']?" Yes " : " No "}</li>
                    <li>Pets welcome : {hotelserviceCheckedItems['pets_welcome']?" Yes " : " No "}</li>
                    <li>Tickets : {hotelserviceCheckedItems['tickets']?" Yes " : " No "}</li>   
                </ul>
                 </div>
                
            </div>
            <div class="grid grid-cols-2 gap-4 mt-3 sm:mt-5">

                <div class="bg-gray-200 p-4"><b>Hotel Photo :</b>
                    <img src={`${API_BASE_URL}/hotel/${hotelDetail.hotel_photo}`} />
                </div>
                
                <div class="bg-gray-200 p-4"><b>Feature Image :</b> 
                <img src={`${API_BASE_URL}/hotel/${hotelDetail.featured_image}`} />
                </div>
            </div>
            
            <div class="grid grid-cols-1 gap-4 mt-3 sm:mt-5">
                <div class="bg-gray-200 p-4"><b>The geographic coordinate:</b> {hotelDetail.the_geographic_coordinate}</div>
                <div class="bg-gray-200 p-4"><b>Content :</b> {hotelDetail.content}</div>
                <div class="bg-gray-200 p-4"><b>Policy :</b> {hotelDetail.policy}</div>
                <div class="bg-gray-200 p-4"><b>Seo Discription:</b> {hotelDetail.Seo_discription}</div>
            </div>
           

            <div class="grid grid-cols-1 gap-4 mt-3 sm:mt-5">
                <div class="bg-gray-200 p-4"><b>Gallery:</b> 
                <img src={`${API_BASE_URL}/hotel/${hotelDetail.gallery}`} />
                </div>
                
                
            </div>

          
        
            
        </div>
                
        
        <Footer/>
        </>
    );
}
export default Hoteldetail;