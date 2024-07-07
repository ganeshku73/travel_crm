import React, {useEffect, useState } from "react";
import { useNavigate, Link ,useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../Constant";


import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";

function Addrooms(){
  const [image, setImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setImage(file);
  };
  
    const accessToken = localStorage.getItem("accessToken");
    const {room_id}  = useParams();
    const [Roomdetail, setRoomDetail]=useState({});
    const [HotelList, setHoelList]=useState([]);
    const [RoomTypeList, setRoomTypeList]=useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedRoomOption, setRoomSelectedOption] = useState('');
    const [roomamenitiesCheckedItems, setCheckedRoomamenitiesItems] = useState({});

    const fetchHotelsData = async ()=>{
      {
         await axios.get(`${API_BASE_URL}/hotel/hotel-list`,{
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }).then((response)=>{
              if(response != ''){
                if(response.data.status!=0){
                  setHoelList(response.data.result);
                  const hotels = response.data.result;
                  console.log(response.data);
                }
              }
            }).catch(error => console.log(error));
        }
    }

    const fetchRoomtypeData = async ()=>{
      {
         await axios.get(`${API_BASE_URL}/roomtype/roomtype-list`,{
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            }).then((response)=>{
              if(response != ''){
                if(response.data.status!=0){
                  setRoomTypeList(response.data.result);
                  const roomtype = response.data.result;
                  console.log(response.data);
                }
              }
            }).catch(error => console.log(error));
        }
    }


    
    

    useEffect(
      ()=>{
  
        const getRoomDetail = async () => {
          try {                              
            const response = await axios.get(`${API_BASE_URL}/room/room-list/${room_id}`,{
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            await setRoomDetail(response.data.result);
        
            setSelectedOption(response.data.result.hotel_name);
            setRoomSelectedOption(response.data.result.room_name);

            if(response.data.result.room_amenities){
              var roomamenitiescheced = JSON.parse(response.data.result.room_amenities);
              setCheckedRoomamenitiesItems(roomamenitiescheced);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
  
        fetchHotelsData();
        fetchRoomtypeData();
       
        if (room_id != undefined) {
          getRoomDetail();
        }
  
      },[]
    );
    //console.log(HotelList);
    const isHotelEmpty = () => {
      return HotelList.length === 0;
    };
   
    
   

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setRoomDetail({
        ...Roomdetail,
        [name]: value
      });
    };
  
       
  const handleChange = (event) => {
    setSelectedOption(event.target.value); // Update selected option when user selects a different option
  };
  const handleRoomChange = (event) => {
    setRoomSelectedOption(event.target.value); // Update selected option when user selects a different option
  };
  
  //console.log('hotel name '+selectedOption);
  const handleRoomamenitiesItemChange = (event) => {
    const { name, checked } = event.target;
    setCheckedRoomamenitiesItems({ ...roomamenitiesCheckedItems, [name]: checked });
  };


   const navigate = useNavigate();
   const handleSubmit = async (e) => {
     e.preventDefault();
     var r_id = room_id;
     if(room_id == undefined){
       r_id =null;
     }
     const datarequest = {
      room_id:r_id,
      hotel_name:selectedOption,
      room_name:selectedRoomOption,
      price:Roomdetail.price,
      room_number:Roomdetail.room_number,
      number_of_beds:Roomdetail.number_of_beds,
      room_size:Roomdetail.room_size,
      max_adults:Roomdetail.max_adults,
      max_children:Roomdetail.max_children,
      room_amenities:Roomdetail.room_amenities,
      status:Roomdetail.status,
    }
   
    

    try {
        
      const formDataToSend = new FormData();
      formDataToSend.append('room_id', datarequest.room_id);
      formDataToSend.append('hotel_name', selectedOption);
      formDataToSend.append('room_name', selectedRoomOption);
      formDataToSend.append('price', datarequest.price);
      formDataToSend.append('room_number', datarequest.room_number);
      formDataToSend.append('number_of_beds', datarequest.number_of_beds);
      formDataToSend.append('room_size', datarequest.room_size);
      formDataToSend.append('max_adults', datarequest.max_adults);
      formDataToSend.append('max_children', datarequest.max_children);
      formDataToSend.append('room_amenities', datarequest.room_amenities);
      formDataToSend.append('status', datarequest.status);
      

      const response = await axios.post(`${API_BASE_URL}/room/room-register`,formDataToSend, 
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`
          }
        }
    );
    navigate('/rooms');
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
                  <li>Room Detail Forms</li>
                </ul>
            </div>
          </section>

          <section className="is-hero-bar">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <h1 className="title">
                  Detail Form
                </h1>
                <Link to={`/rooms`}>
                <button className="button blue">Back</button></Link>
            </div>
          </section>

          <section className="section main-section">
            <form onSubmit={handleSubmit}>
                <div className="card mb-6">
                        <header className="card-header">
                            <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Room Information
                            </p>
                        </header>

                        <div className="card-content">
                        <div className="field">
                            <div>
                                <label for="hotels" className="font-bold">Select Hotel</label>
                            </div>
                       

                            <select name="hotel_name" id="hotels" value={selectedOption} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-#9ca3afe45"
                            
                             onChange={handleChange} required >
                               <option value="">Select Hotel List</option>
                                {
                                  HotelList.map((value,key) => {
                                    return(
                                      <option value={value._id}>{value.hotel_name}</option>
                                    )
                                  })
                                 
                                  }
                               
                            </select>
                        </div>




                            <div>
                                <label for="roomtypes" className="font-bold">Select Room Type</label>
                            </div>
                            <select name="room_name" id="roomtypes" value={selectedRoomOption} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-#9ca3afe45"
                            
                             onChange={handleRoomChange} required >
                               <option value="">Select Room Type List</option>
                                {
                                  RoomTypeList.map((value,key) => {
                                    return(
                                      <option value={value._id}>{value.room_name}</option>
                                    )
                                  })
                                 
                                  }
                               
                            </select>
                      

                        
                           

                            <div className="field">
                              <label className="label">Room Photo</label>
                              <div className="control">
                                  <input type="file" id="room_photo" name="room_photo" className=" hidden"
                                  onChange={handleImageChange}/>
                                  <label for="room_photo" className="  bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded"> <i className="mdi mdi-plus"></i> Upload Image</label>
                              </div>
                              <img src={`${API_BASE_URL}/room/${Roomdetail.room_photo}`} className="my-4 sm:my-6" />
                            </div>

                           
                            <div className="field">
                              <label className="label">Gallery</label>
                              <div className="control">
                                  <input type="file" id="gallery" name="gallery" className=" hidden"
                                  onChange={handleImageChange} />
                                  <label for="gallery" className="  bg-blue-500 text-white px-2 sm:px-3 py-1 sm:py-2 rounded"> <i className="mdi mdi-plus"></i> Select Images</label>
                              </div>
                              <img src={`${API_BASE_URL}/room/${Roomdetail.room_photo}`} className="my-4 sm:my-6" />
                            </div>

                            <hr></hr>


                        <div className="flex flex-wrap">
                            <div className=" w-1/2">
                                <div className="field">
                                <label className="label">Price</label>
                                    <div className="control">
                                    <input className="input"  name="price" type="text" placeholder="Enter Price"
                                        value={Roomdetail.price}
                                        onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>
                            

                            <div className=" w-1/2 pl-4 sm:pl-6">
                                <div className="field">
                                <label className="label">Room Number</label>
                                    <div className="control">
                                        <input className="input"  name="room_number" type="text" placeholder="Enter Room Number"
                                           value={Roomdetail.room_number}
                                           onChange={handleInputChange} required  />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="flex flex-wrap">
                            <div className=" w-1/2">
                                <div className="field">
                                        <label className="label">Number of beds </label>
                                        <div className="control">
                                            <input  className="input" type="number"  name="number_of_beds" min="0" max="500" placeholder="Ex: 2"
                                            value={Roomdetail.number_of_beds}
                                            onChange={handleInputChange} required  />
                                        </div>
                                </div>

                                <div className="field">
                                        <label className="label">Max Adults </label>
                                        <div className="control">
                                            <input  className="input" type="number"  name="max_adults" min="0" max="300" placeholder="Ex: 2"
                                            value={Roomdetail.max_adults}
                                            onChange={handleInputChange} required  />
                                        </div>
                                </div>
                            </div>

                            <div className=" w-1/2 pl-4 sm:pl-6">
                                    <div className="field">
                                        <label className="label">Room Size </label>
                                        <div className="control">
                                            <input  className="input" type="number"  name="room_size" min="0" max="2000" placeholder="Ex: 200 sqft" 
                                            value={Roomdetail.room_size}
                                            onChange={handleInputChange} required />
                                        </div>
                                    </div>

                                    <div className="field">
                                        <label className="label">Max Children </label>
                                        <div className="control">
                                            <input  className="input" type="number"  name="max_children" min="0" max="600" placeholder="Ex: 2" 
                                            value={Roomdetail.max_children}
                                            onChange={handleInputChange} required />
                                        </div>
                                    </div>
                            </div>
                        </div>

                        <hr></hr>

                        <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Attribute: Room Amenities
                          </p>
                        </header>
                        <div className="card-content bg-gray-100 border-2 border-gray-200 m-4 sm:m-6 pl-1 sm:pl-2 rounded">
                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Wake-up call'
                                  name="wake-up_call"
                                  checked={roomamenitiesCheckedItems['wake-up_call'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label className=" text-sm">Wake-up call</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Car hire'
                                  name="car_hire"
                                  checked={roomamenitiesCheckedItems['car_hire'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label className=" text-sm">  Car hire</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Bicycle hire'
                                  name="bicycle_hire"
                                  checked={roomamenitiesCheckedItems['bicycle_hire'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label className=" text-sm">   Bicycle hire</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Flat Tv'
                                  name="flat_tv"
                                  checked={roomamenitiesCheckedItems['flat_tv'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label className=" text-sm">   Flat Tv</label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Laundry '
                                  name="laundry_and_dry_cleaning"
                                  checked={roomamenitiesCheckedItems['laundry_and_dry_cleaning'] || false}
                                  onChange={handleRoomamenitiesItemChange} />
                                  <label className=" text-sm"> Laundry </label>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Internet – Wifi'
                                  name="internet_Wifi"
                                  checked={roomamenitiesCheckedItems['internet_Wifi'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label className=" text-sm">  Internet – Wifi</label>
                                </div>
                            </div>

                            <div className="field">
                              <div className="control">
                                <input type="checkbox" className="mx-5" 
                                  value='AC'
                                  name="ac"
                                  checked={roomamenitiesCheckedItems['ac'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label  className=" text-sm">AC</label>
                              </div>    
                            </div>  


                            <div className="field">
                              <div className="control">  
                                <input type="checkbox" className="mx-5"
                                value='Non-AC'
                                name="non_ac"
                                checked={roomamenitiesCheckedItems['non_ac'] || false}
                                onChange={handleRoomamenitiesItemChange}/>
                                <label  className=" text-sm">Non-AC</label>
                              </div>
                            </div>

                            <div className="field">
                              <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Swimming Pool'
                                  name="swiming_pool"
                                  checked={roomamenitiesCheckedItems['swiming_pool'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label  className=" text-sm">Swimming Pool</label>
                                </div>
                              </div>

                              <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Gym'
                                  name="gym"
                                  checked={roomamenitiesCheckedItems['gym'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label  className=" text-sm">Gym</label>
                                </div>
                              </div>

                              <div className="field">
                                <div className="control">
                                    <input type="checkbox" className="mx-5"
                                    value='Play Area'
                                    name="play_area"
                                    checked={roomamenitiesCheckedItems['play_area'] || false}
                                    onChange={handleRoomamenitiesItemChange}/>
                                    <label  className=" text-sm">Play Area</label>
                                </div>
                              </div>
                            

                            <div className="field">
                                <div className="control">
                                  <input type="checkbox" className="mx-5"
                                  value='Coffee and tea'
                                  name="coffee_and_tea"
                                  checked={roomamenitiesCheckedItems['coffee_and_tea'] || false}
                                  onChange={handleRoomamenitiesItemChange}/>
                                  <label className=" text-sm">  Coffee and tea</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-6">
                        <header className="card-header">
                          <p className="card-header-title">
                              <span className="icon"><i className="mdi mdi-ballot"></i></span>
                              Status
                          </p>
                        </header>
                            <div className="card-content">
                                <div className="control">
                                    <input type="radio" className="mx-5" name="status" 
                                        value='Publish'
                                        onChange={handleInputChange}  checked={Roomdetail.status=="Publish"?true:false}/>
                                    <label>Publish</label><br/>

                                    <input type="radio" className="mx-5" name="status" 
                                        value='Pending'
                                        onChange={handleInputChange}  checked={Roomdetail.status=="Pending"?true:false}/>
                                    <label>Pending</label><br/>

                                    <input type="radio" className="mx-5" name="status" 
                                        value='Draft'
                                        onChange={handleInputChange}  checked={Roomdetail.status=="Draft"?true:false}/>
                                    <label>Draft</label>

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
                    </div>
                </form>
            </section>


          <Footer/>
        </>
    );
}
export default Addrooms;
