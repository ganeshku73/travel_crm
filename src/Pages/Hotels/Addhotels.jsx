import React, {useEffect, useState } from "react";
import { useNavigate, Link ,useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";

import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";



function Addhotels(){

  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setImage(file);
  };
   
    const accessToken = localStorage.getItem("accessToken");
    const {hotel_id}  = useParams();
    const [Hoteldetail, setHotelDetail]=useState({});
    const [LocationList, setLocationList]=useState([]);
    const [selectedLocationOption, setLocationSelectedOption] = useState('');
    const [budgetCheckedItems, setCheckedBudgetItems] = useState({});
    const [servicesCheckedItems, setCheckedServiceItems] = useState({});
    const [propertyCheckedItems, setCheckedPropertyItems] = useState({});
    const [facilitiesCheckedItems, setCheckedFacilitiesItems] = useState({});
    const [hotelserviceCheckedItems, setCheckedHotelserviceItems] = useState({});
    
    const fetchLocationData = async ()=>{
      {
         await axios.get(`${API_BASE_URL}/location/location-list`,{
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }).then((response)=>{
              if(response != ''){
                if(response.data.status!=0){
                  setLocationList(response.data.result);
                  const location = response.data.result;
                  console.log(response.data);
                }
              }
            }).catch(error => console.log(error));
        }
    }
    
  
    useEffect(
      ()=>{
  
        const getHotelDetail = async () => {
          try {                              
            const response = await axios.get(`${API_BASE_URL}/hotel/hotel-list/${hotel_id}`,{
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            await setHotelDetail(response.data.result);
            setLocationSelectedOption(response.data.result.location);
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
              setCheckedPropertyItems(propertycheced);
            }
            if(response.data.result.facilities){
              var facilitiescheced = JSON.parse(response.data.result.facilities);
              setCheckedFacilitiesItems(facilitiescheced);
          }
          if(response.data.result.hotel_service){
            var hotelservicecheced = JSON.parse(response.data.result.hotel_service);
            setCheckedHotelserviceItems(hotelservicecheced);
        }
       
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

        fetchLocationData();
  
        if (hotel_id != undefined) {
          getHotelDetail();
        }
  
      },[]
    );
  
   
    //console.log(JSON.parse(Hoteldetail.food)['vegeterian']);
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setHotelDetail({
        ...Hoteldetail,
        [name]: value
      });
    };
   console.log(Hoteldetail);

   
   const handleLocationChange = (event) => {
    setLocationSelectedOption(event.target.value); // Update selected option when user selects a different option
  };
  

  const handleBudgetItemChange = (event) => {
    const { name, checked } = event.target;
    setCheckedBudgetItems({ ...budgetCheckedItems, [name]: checked });
  };
  const handleServicesItemChange = (event) => {
    const { name, checked } = event.target;
    setCheckedServiceItems({ ...servicesCheckedItems, [name]: checked });
  };
  const handlePropertyItemChange = (event) => {
    const { name, checked } = event.target;
    setCheckedPropertyItems({ ...propertyCheckedItems, [name]: checked });
  };
  const handleFacilitiesItemChange = (event) => {
    const { name, checked } = event.target;
    setCheckedFacilitiesItems({ ...facilitiesCheckedItems, [name]: checked });
  };
  const handleHotelserviceItemChange = (event) => {
    const { name, checked } = event.target;
    setCheckedHotelserviceItems({ ...hotelserviceCheckedItems, [name]: checked });
  };
 
  
 
   
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    var h_id = hotel_id;
    if(hotel_id == undefined){
      h_id =null;
    }
    

    const datarequest = {
        hotel_id:h_id,
        hotel_name:Hoteldetail.hotel_name,
        content:Hoteldetail.content,
        banner_image:Hoteldetail.banner_image,
        youtube_video:Hoteldetail.youtube_video,
        gallery:Hoteldetail.gallery,
        hotel_rating_standard:Hoteldetail.hotel_rating_standard,
        policy:Hoteldetail.policy,
        
        time_for_check_out:Hoteldetail.time_for_check_out,
        min_day_before_booking:Hoteldetail.min_day_before_booking,
        min_day_stays:Hoteldetail.min_day_stays,
        price:Hoteldetail.price,
        offer_price:Hoteldetail.offer_price,
        location:selectedLocationOption,
        real_address:Hoteldetail.real_address,
        the_geographic_coordinate:Hoteldetail.the_geographic_coordinate,
        search_engines_show_service:Hoteldetail.search_engines_show_service,
        Seo_title:Hoteldetail.Seo_title,
        Seo_discription:Hoteldetail.Seo_discription,
        publish:Hoteldetail.publish,
        hotel_featured:Hoteldetail.hotel_featured,
        property_type:Hoteldetail.property_type,
        facilities:Hoteldetail.facilities,
        hotel_service:Hoteldetail.hotel_service,
        featured_image:Hoteldetail.featured_image,
        phone_number:Hoteldetail.phone_number,
        email_id:Hoteldetail.email_id,
        website:Hoteldetail.website,
        address:Hoteldetail.address,
        hotel_photo:image,
        Total_rooms:Hoteldetail.Total_rooms,
        hotel_packages:Hoteldetail.hotel_packages,
        food:Hoteldetail.food,
        room_type:Hoteldetail.room_type,
        budget:Hoteldetail.budget,
        services:Hoteldetail.services,
        rating:Hoteldetail.rating

      }
      console.log(datarequest);
      try {
          
        const formDataToSend = new FormData();
        formDataToSend.append('hotel_id', datarequest.hotel_id);
        formDataToSend.append('hotel_name', datarequest.hotel_name);
        formDataToSend.append('content', datarequest.content);
        formDataToSend.append('banner_image', datarequest.banner_image);
        formDataToSend.append('youtube_video', datarequest.youtube_video);
        formDataToSend.append('gallery', datarequest.gallery);
        formDataToSend.append('hotel_rating_standard', Hoteldetail.hotel_rating_standard);
        formDataToSend.append('policy', datarequest.policy);
        formDataToSend.append('time_for_check_in', Hoteldetail.time_for_check_in);
        formDataToSend.append('time_for_check_out', Hoteldetail.time_for_check_out);
        formDataToSend.append('min_day_before_booking', Hoteldetail.min_day_before_booking);
        formDataToSend.append('min_day_stays', Hoteldetail.min_day_stays);
        formDataToSend.append('price', datarequest.price);
        formDataToSend.append('offer_price', datarequest.offer_price);
        formDataToSend.append('location', selectedLocationOption);
        formDataToSend.append('real_address', datarequest.real_address);
        formDataToSend.append('the_geographic_coordinate', datarequest.the_geographic_coordinate);
        formDataToSend.append('search_engines_show_service', Hoteldetail.search_engines_show_service);
        formDataToSend.append('Seo_title', Hoteldetail.Seo_title);
        formDataToSend.append('Seo_discription', Hoteldetail.Seo_discription);
        formDataToSend.append('publish', datarequest.publish);
        formDataToSend.append('hotel_featured', Hoteldetail.hotel_featured);
        formDataToSend.append('property_type',  JSON.stringify(propertyCheckedItems));
        formDataToSend.append('facilities',  JSON.stringify(facilitiesCheckedItems));
        formDataToSend.append('hotel_service',  JSON.stringify(hotelserviceCheckedItems));
        formDataToSend.append('featured_image', datarequest.featured_image);
        formDataToSend.append('phone_number', datarequest.phone_number);
        formDataToSend.append('email_id', datarequest.email_id);
        formDataToSend.append('website', datarequest.website);
        formDataToSend.append('address', datarequest.address);
        formDataToSend.append('hotel_photo', datarequest.hotel_photo);
        formDataToSend.append('Total_rooms', datarequest.Total_rooms);
        formDataToSend.append('hotel_packages', datarequest.hotel_packages);
        formDataToSend.append('food', datarequest.food);
        formDataToSend.append('room_type', datarequest.room_type);
        formDataToSend.append('budget', JSON.stringify(budgetCheckedItems));
        formDataToSend.append('services', JSON.stringify(servicesCheckedItems));
        formDataToSend.append('rating', datarequest.rating);
  

         
          const response = await axios.post(`${API_BASE_URL}/hotel/hotel-register`,formDataToSend, 
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
              }
            }
        );
        navigate('/hotels');
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
                  <li>Hotel Detail Forms</li>
                </ul>
            </div>
          </section>
          <section className="is-hero-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <h1 className="title">
                  Detail Form
                </h1>
                <Link to={`/hotels`}>
                <button className="button blue">Back</button></Link>
            </div>
          </section>
          <section className="section main-section">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap">
                  <div className="w-3/4 p-1">
                      
                      <div className="card mb-6">
                        <header className="card-header">
                            <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Hotel Content
                            </p>
                        </header>
                        <div className="card-content">
                            <div className="field">
                              <label className="label">Hotel Name</label>
                              <div className="control">
                                  <input className="input"  name="hotel_name" type="text" placeholder="Enter Hotel Name"
                                    value={Hoteldetail.hotel_name}
                                    onChange={handleInputChange} required />
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Content</label>
                              <div className="control">
                                  <textarea className="textarea "  name="content" type="text"
                                    value={Hoteldetail.content}
                                    onChange={handleInputChange} required />
                              </div>
                            </div>

                            <div className="card-content">
                            <div className=" flex flex-wrap">
                              <div className="w-1/2 pr-1 sm:pr-2">
                                  <div className="field">
                                  <label className="label">Phone Number</label>
                                      <div className="control">
                                        <input className="input"  name="phone_number" type="text" placeholder="Enter Hotel Phone Number"
                                            value={Hoteldetail.phone_number}
                                            onChange={handleInputChange} required />
                                      </div>
                                  </div>

                                  <div className="field">
                                      <label className="label">Email Id</label>
                                      <div className="control">
                                        <input className="input" name="email_id" type="email" placeholder="Enter Email Id"
                                            value={Hoteldetail.email_id}
                                            onChange={handleInputChange} required />
                                      </div>
                                  </div>
                                </div>

                              <div className="w-1/2 pl-2 sm:pl-3">
                                <div className="field">
                                    <label className="label">Website</label>
                                    <div className="control">
                                      <input className="input" name="website" type="text" placeholder="Enter Hotel Website"
                                          value={Hoteldetail.website}
                                          onChange={handleInputChange} required />
                                    </div>
                                </div>

                                <div className="field">
                              <label className="label">Youtube Video</label>
                              <div className="control">
                                  <input className="input"  name="youtube_video" type="text" placeholder="Youtube Link Video"
                                    value={Hoteldetail.youtube_video}
                                    onChange={handleInputChange} required />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>



                          <div className="field">
                              <label className="label">Hotel Photo</label>
                              <div className="control">
                                <input className="input hidden" name="hotel_photo" id="hotel_photo" type="file" 
                                    onChange={handleImageChange}/> 
                                <label for="hotel_photo" className="  bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2  rounded"> <i className="mdi mdi-plus"></i> Upload Image</label>
                            
                              </div>
                              <img src={`${API_BASE_URL}/hotel/${Hoteldetail.hotel_photo}`} className="my-4 sm:my-6" />
                          </div>

                            
                           
                            <div className="field">
                              <label className="label">Gallery</label>
                              <div className="control">
                                  <input type="file" id="gallery" name="gallery" className=" hidden"/>
                                  <label for="gallery" className="  bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded"> 
                                    <i className="mdi mdi-plus"></i> Select Images</label>
                              </div>
                            </div>
                        </div>
                      </div>

                        <div className="card mb-6">
                            <header className="card-header">
                              <p className="card-header-title">
                                  <span className="icon"><i className="mdi mdi-ballot"></i></span>
                                  Hotel Policy
                              </p>
                            </header>
                            <div className="card-content">
                            <div className="w-1/2">
                              <div className="field">
                                  <label className="label">Hotel rating standard</label>
                                  <div className="control">
                                    <input className="input" type="number"  name="hotel_rating_standard" min="1" max="5" placeholder="Eg:5"
                                        value={Hoteldetail.hotel_rating_standard}
                                        onChange={handleInputChange} required />
                                  </div>
                              </div>
                            </div>
                            <div className="field">
                              <label className="label">Policy</label>
                              <div className="control">
                                  <textarea className="textarea"  name="policy" type="text" 
                                    value={Hoteldetail.policy}
                                    onChange={handleInputChange} required />
                              </div>
                            </div>
                        </div>
                      </div>

                        <div className="card mb-6">
                            <header className="card-header">
                              <p className="card-header-title">
                                  <span className="icon"><i className="mdi mdi-ballot"></i></span>
                                  Check in/out time
                              </p>
                            </header>
                            <div className="card-content">
                            <div className=" flex flex-wrap">
                              <div className="w-1/2">
                                  <div className="field">
                                    <label className="label"> Time for check in</label>
                                    <div className="control">
                                        <input className="input"  name="time_for_check_in" type="text" placeholder="Eg: 12:00AM"
                                          value={Hoteldetail.time_for_check_in}
                                          onChange={handleInputChange} required />
                                    </div>
                                  </div>
                                  <div className="field">
                                    <label className="label"> Min day before booking </label>
                                    <div className="control">
                                        <input  className="input" type="number"  name="min_day_before_booking" min="-100" max="100" placeholder="Ex: 2"
                                          value={Hoteldetail.min_day_before_booking}
                                          onChange={handleInputChange}  />
                                    </div>
                                  </div>
                              </div>
                              <div className="w-1/2 pl-1 sm:pl-2">
                                  <div className="field">
                                    <label className="label"> Time for check out</label>
                                    <div className="control">
                                        <input className="input"  name="time_for_check_out" type="text" placeholder="Eg: 11:00AM"
                                          value={Hoteldetail.time_for_check_out}
                                          onChange={handleInputChange} required />
                                    </div>
                                  </div>
                                  <div className="field">
                                    <label className="label"> Min day stays </label>
                                    <div className="control">
                                        <input  className="input" type="number"  name="min_day_stays" min="1" max="100" placeholder="Ex: 2"
                                          value={Hoteldetail.min_day_stays}
                                          onChange={handleInputChange}  />
                                    </div>
                                  </div>
                              </div>
                            </div>
                        </div>
                      </div>

                        <div className="card mb-6">
                            <header className="card-header">
                              <p className="card-header-title">
                                  <span className="icon"><i className="mdi mdi-ballot"></i></span>
                                  Pricing
                              </p>
                            </header>
                            <div className="card-content">
                            <div className="field">
                              <label className="label"> Price </label>
                              <div className="control">
                                  <input  className="input" type="number"  name="price" min="0" max="100000" 
                                    value={Hoteldetail.price}
                                    onChange={handleInputChange}  />
                              </div>  
                            </div>

                            <div className="field">
                              <label className="label">Offer Price </label>
                              <div className="control">
                                  <input  className="input" type="number"  name="offer_price" min="0" max="100000" 
                                    value={Hoteldetail.offer_price}
                                    onChange={handleInputChange}  />
                              </div>
                            </div> 
                        </div>
                        </div>

                        <div className="card mb-6">
                            <header className="card-header">
                              <p className="card-header-title">
                                  <span className="icon"><i className="mdi mdi-ballot"></i></span>
                                  Locations
                              </p>
                            </header>
                            <div className="card-content">
                       
                            <div>
                                <label for="location" className="font-bold">Select Location</label>
                            </div>
                            <select name="location_name" id="location" value={selectedLocationOption} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-#9ca3afe45"
                            
                             onChange={handleLocationChange} required >
                               <option value="">Select Location List</option>
                                {
                                  LocationList.map((value,key) => {
                                    return(
                                      <option value={value._id}>{value.location_name}</option>
                                    )
                                  })
                                 
                                  }
                               
                            </select>


                        <div className="field">
                            <label className="label">Real Address</label>
                            <div className="control">
                              <input className="input"  name="real_address" type="text" placeholder="Real Address"
                                  value={Hoteldetail.real_address}
                                  onChange={handleInputChange} required />
                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label">The geographic coordinate</label>
                            <div className="control">
                              <textarea className="textarea"  name="the_geographic_coordinate" type="text" placeholder="Search by name..."
                                  value={Hoteldetail.the_geographic_coordinate}
                                  onChange={handleInputChange} required />
                            </div>
                        </div>
                   
                    </div>
                    </div>

                    <div className="card mb-6">
                            <header className="card-header">
                              <p className="card-header-title">
                                  <span className="icon"><i className="mdi mdi-ballot"></i></span>
                                  Seo Manager
                              </p>
                            </header>
                            <div className="card-content">
                            <div className="field">
                                <label className="label">Allow search engines to show this service in search results?</label>
                                <div className="control">
                                      <input type="radio" name="search_engines_show_service" className="mx-5"  
                                                value='yes'
                                                onChange={handleInputChange}  checked={Hoteldetail.search_engines_show_service=="yes"?true:false}/>
                                            <label >Yes</label><br/>
                                        <input type="radio" name="search_engines_show_service" className="mx-5" 
                                                value='no'
                                                checked={Hoteldetail.search_engines_show_service=="no"?true:false} onChange={handleInputChange}/>
                                            <label >No</label>
                                </div>
                            </div>

                            <div className="field">
                            <label className="label">Seo Title</label>
                            <div className="control">
                              <input className="input"  name="Seo_title" type="text" placeholder="Leave blank to use service title"
                                  value={Hoteldetail.Seo_title}
                                  onChange={handleInputChange} required />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Seo Discription</label>
                            <div className="control">
                              <textarea className="textarea"  name="Seo_discription" type="text" placeholder="Enter discription"
                                  value={Hoteldetail.Seo_discription}
                                  onChange={handleInputChange} required />
                                  
                            </div>
                        </div>
                     </div>
                   </div>  
                       
                        
            
                        <div className="card mb-6">
                        <div className="card-content">
                            <div className="control">
                              <button type="submit" className="bg-green-700 text-white px-2 sm:px-3  py-1 sm:py-2 rounded">
                              Submit
                              </button>
                            </div> 
                        </div>
                        </div>


                  </div>
                  
                
                  <div className="w-1/4 p-1">

                  <div className="card mb-6">
                    <div className="card-content">
                        <div className="control">
                          <input type="submit" id="save_changes"  className=" hidden"/>
                          <label for="save_changes" className=" bg-green-700 text-white px-2 sm:px-3 py-1 sm:py-2 rounded"> <i className="mdi mdi-ballot"></i> Save Changes</label>
                        </div>
                    </div>
                  </div>
                    <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Publish
                          </p>
                        </header>
                        <div className="card-content">
                              <div className="control">
                                        <input type="radio" className="mx-5" name="publish" 
                                            value='Publish'
                                            checked={Hoteldetail.publish=="Publish"?true:false}
                                            onChange={handleInputChange}/>
                                        <label>publish</label><br/>

                                        <input type="radio" className="mx-5" name="publish" 
                                            value='Draft'
                                            checked={Hoteldetail.publish=="Draft"?true:false}
                                            onChange={handleInputChange}/>
                                        <label>Draft</label><br></br><br></br>

                                       
                              </div>
                        </div>
                    </div>
                   

                    <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Set Availability
                          </p>
                        </header>
                        <div className="card-content">
                        <div className="field">
                            <label className="label">Available Hotel</label>
                            <div className="control">
                              <input type="radio" name="hotel_featured" className="mx-5"  
                                        value='yes'
                                        onChange={handleInputChange}  checked={Hoteldetail.hotel_featured=="yes"?true:false}/>
                                    <label >Yes</label><br/>
                              <input type="radio" name="hotel_featured" className="mx-5" 
                                        value='no'
                                        checked={Hoteldetail.hotel_featured=="no"?true:false} onChange={handleInputChange}/>
                                    <label >No</label>
                               
                            </div>
                        </div>
                      </div>
                  </div>


                  <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Category Food
                          </p>
                        </header>
                        <div className="card-content">
                              <div className="field">
                                  <label className="label">Food</label>
                                  <div className="control">
                                    <input type="radio" className="mx-5" name="food" 
                                        value='Vegitarian'
                                        checked={Hoteldetail.food=="Vegitarian"?true:false}
                                        onChange={handleInputChange}/>
                                    <label>Vegitarian</label><br/>
                                    <input type="radio" className="mx-5" name="food"
                                        value='Non-Vegitarian'
                                        checked={Hoteldetail.food=="Non-Vegitarian"?true:false}
                                        onChange={handleInputChange}/>
                                    <label>Non-Vegitarian</label><br/>
                                    <input type="radio" className="mx-5" name="food"
                                        value='Semi-Vegitarian'
                                        checked={Hoteldetail.food=="Semi-Vegitarian"?true:false}
                                        onChange={handleInputChange}/>
                                    <label>Semi-Vegitarian</label>
                                  </div>
                              </div>
                        </div>



                        </div>

                  <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Attribute: Property type
                          </p>
                        </header>
                        <div className="card-content bg-gray-100 border-2 border-gray-200 m-4 sm:m-6 pl-1 sm:pl-2 rounded">
                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value=' Apartments'
                              name="apartments"
                              checked={propertyCheckedItems['apartments'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Apartments</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Hotels'
                              name="hotels"
                              checked={propertyCheckedItems['hotels'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Hotels</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Homestays'
                              name="homestays"
                              checked={propertyCheckedItems['homestays'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Homestays</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Villas'
                              name="villas"
                              checked={propertyCheckedItems['villas'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Villas</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Boats'
                              name="boats"
                              checked={propertyCheckedItems['boats'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Boats</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Motels'
                              name="motels"
                              checked={propertyCheckedItems['motels'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Motels</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Resorts'
                              name="resorts"
                              checked={propertyCheckedItems['resorts'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm">  Resorts</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Lodges'
                              name="lodges"
                              checked={propertyCheckedItems['lodges'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Lodges</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Holiday homes'
                              name="holiday_homes"
                              checked={propertyCheckedItems['holiday_homes'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm"> Holiday homes</label>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                              <input type="checkbox" className="mx-5"
                              value='Cruises'
                              name="cruises"
                              checked={propertyCheckedItems['cruises'] || false}
                              onChange={handlePropertyItemChange}/>
                               <label className=" text-sm">  Cruises</label>
                            </div>
                        </div>
                      </div>
                  </div>


                  <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Attribute: Facilities
                          </p>
                        </header>
                        <div className="card-content bg-gray-100 border-2 border-gray-200 m-4 sm:m-6 pl-1 sm:pl-2 rounded">
                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Wake-up call'
                                  name="wake-up_call"
                                  checked={facilitiesCheckedItems['wake-up_call'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm">  Wake-up call</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Car hire'
                                  name="car_hire"
                                  checked={facilitiesCheckedItems['car_hire'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm">  Car hire</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Bicycle hire'
                                  name="bicycle_hire"
                                  checked={facilitiesCheckedItems['bicycle_hire'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm">   Bicycle hire</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Flat Tv'
                                  name="flat_tv"
                                  checked={facilitiesCheckedItems['flat_tv'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm">   Flat Tv</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Laundry '
                                  name="laundry_and_dry_cleaning"
                                  checked={facilitiesCheckedItems['laundry_and_dry_cleaning'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm"> Laundry </label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Internet – Wifi'
                                  name="internet_Wifi"
                                  checked={facilitiesCheckedItems['internet_Wifi'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm">  Internet – Wifi</label>
                                </div>
                            </div>

                            <div className="field">
                              <div className="control">
                                <input type="checkbox" className="mx-5" 
                                  value='AC'
                                  name="ac"
                                  checked={facilitiesCheckedItems['ac'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label  className=" text-sm">AC</label>
                              </div>    
                            </div>  


                            <div className="field">
                              <div className="control">  
                                <input type="checkbox" className="mx-5"
                                value='Non-AC'
                                name="non_ac"
                                checked={facilitiesCheckedItems['non_ac'] || false}
                                onChange={handleFacilitiesItemChange}/>
                                <label  className=" text-sm">Non-AC</label>
                              </div>
                            </div>

                            <div className="field">
                              <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Swimming Pool'
                                  name="swiming_pool"
                                  checked={facilitiesCheckedItems['swiming_pool'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label  className=" text-sm">Swimming Pool</label>
                                </div>
                              </div>

                              <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Gym'
                                  name="gym"
                                  checked={facilitiesCheckedItems['gym'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label  className=" text-sm">Gym</label>
                                </div>
                              </div>

                              <div className="field">
                                <div className="control">
                                    <input type="checkbox" className="mx-5"
                                    value='Play Area'
                                    name="play_area"
                                    checked={facilitiesCheckedItems['play_area'] || false}
                                    onChange={handleFacilitiesItemChange}/>
                                    <label  className=" text-sm">Play Area</label>
                                </div>
                              </div>
                            

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Coffee and tea'
                                  name="coffee_and_tea"
                                  checked={facilitiesCheckedItems['coffee_and_tea'] || false}
                                  onChange={handleFacilitiesItemChange}/>
                                  <label className=" text-sm">  Coffee and tea</label>
                                </div>
                            </div>
                        </div>
                  </div>


                  <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Attribute: Hotel Service
                          </p>
                        </header>
                        <div className="card-content bg-gray-100 border-2 border-gray-200 m-4 sm:m-6 pl-1 sm:pl-2 rounded">
                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Havana Lobby bar'
                                      name="havana_lobby_bar"
                                      checked={hotelserviceCheckedItems['havana_lobby_bar'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm">Havana Lobby bar</label>
                                    </div>
                            </div>

                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Fiesta Restaurant'
                                      name="fiesta_restaurant"
                                      checked={hotelserviceCheckedItems['fiesta_restaurant'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm">Fiesta Restaurant</label>
                                    </div>
                            </div>

                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Hotel transport '
                                      name="hotel_transport "
                                      checked={hotelserviceCheckedItems['hotel_transport'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm">Hotel transport</label>
                                    </div>
                            </div>

                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Free luggage'
                                      name="free_luggage"
                                      checked={hotelserviceCheckedItems['free_luggage'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm"> Free luggage</label>
                                    </div>
                            </div>

                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Laundry Services'
                                      name="laundry_services"
                                      checked={hotelserviceCheckedItems['laundry_services'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm">Laundry Services</label>
                                    </div>
                            </div>

                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Pets welcome'
                                      name="pets_welcome"
                                      checked={hotelserviceCheckedItems['pets_welcome'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm">Pets welcome</label>
                                    </div>
                            </div>

                            <div className="field">
                                    <div className="control">
                                      <input type="checkbox" className="mx-5"
                                      value='Tickets'
                                      name="tickets"
                                      checked={hotelserviceCheckedItems['tickets'] || false}
                                      onChange={handleHotelserviceItemChange}/>
                                      <label className=" text-sm"> Tickets</label>
                                    </div>
                            </div>
                        </div>
                  </div>


                  <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Feature Image
                          </p>
                        </header>

                        <div className="card-content">
                        <div className="field">
                              <div className="control">
                                  <input type="file" id="featured_image" name="featured_image" className=" hidden"/>
                                  <label for="featured_image" className="  bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded"> <i className="mdi mdi-plus"></i> Upload Image</label>
                              </div>
                        </div>
                        </div>
                  </div>
                </div>
              </div>
                
            </form>
          </section>

        
    
          <Footer/>

        </>
    );
}
export default Addhotels;