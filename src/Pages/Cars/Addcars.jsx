import React, {useEffect, useState } from "react";
import { useNavigate, Link ,useParams} from "react-router-dom";
import axios from "axios";
import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { API_BASE_URL } from "../../Constant";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Addcars(){

  const [image, setImage] = useState(null);
 const [selectedDate, setSelectedDate] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setImage(file);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const accessToken = localStorage.getItem("accessToken");
  const {car_id}  = useParams();
  const [Cardetail, setCarDetail]=useState({});
  //var carData = [];
  useEffect(
    ()=>{

      const getCartDetail = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/car/car-list/${car_id}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setCarDetail(response.data.result);
          setSelectedDate(response.data.result.registration_date);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      if (car_id != undefined) {
        getCartDetail();
      }

    },[]
  );

  
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarDetail({
      ...Cardetail,
      [name]: value
    });
  };

  console.log(Cardetail)
  const [is_ac, setIs_ac] = useState("");
  const [is_bluetooth, setIs_bluetooth] = useState("");
  
  

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
const handleSubmit = async (e) => {
    e.preventDefault();
    var c_id = car_id;
    if(car_id === undefined){
      c_id =null;
    }
    

    
   
    const datarequest = {
      car_id:c_id,
      car_name:Cardetail.car_name,
      car_number:Cardetail.car_number,
      car_model:Cardetail.car_model,
      registration_date:selectedDate,
      car_color:Cardetail.car_color,
      photo:image,
      is_ac:Cardetail.is_ac,
      is_bluetooth:Cardetail.is_bluetooth,
      number_of_seats:Cardetail.number_of_seats
    }
    console.log(datarequest);
    try {
        
      const formDataToSend = new FormData();
      formDataToSend.append('car_id', datarequest.car_id);
      formDataToSend.append('car_name', datarequest.car_name);
      formDataToSend.append('car_number', datarequest.car_number);
      formDataToSend.append('car_model', datarequest.car_model);
      formDataToSend.append('registration_date', selectedDate);
      formDataToSend.append('car_color', datarequest.car_color);
      formDataToSend.append('photo', datarequest.photo);
      formDataToSend.append('is_ac', datarequest.is_ac);
      formDataToSend.append('is_bluetooth', datarequest.is_bluetooth);
      formDataToSend.append('number_of_seats', datarequest.number_of_seats);

      const response = await axios.post(`${API_BASE_URL}/car/car-register`,formDataToSend, 
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${accessToken}`
            }
          }
      );
      navigate('/cars');
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
                <li>Forms</li>
              </ul>
            
            </div>
          </section>

<section className="is-hero-bar">
  <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
    <h1 className="title">
      Forms
    </h1>
    <Link to={`/cars`}><button className="button blue">Back</button></Link>
  </div>
</section>

  <section className="section main-section">
    <div className="card mb-6">
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon"><i className="mdi mdi-ballot"></i></span>
          Forms
        </p>
      </header>
    
      <div className="card-content">
        <form onSubmit={handleSubmit}>    
   
          <div className="field">
            <label className="label">Car Name</label>
            <div className="control">
              <input className="input" name="car_name" type="text" placeholder="Enter Car Name" 
                    value={Cardetail.car_name}
                    onChange={handleInputChange} required />
            </div>
          </div>

          <div className="field">
            <label className="label">Car Number</label>
            <div className="control">
              <input className="input" name="car_number" type="text" placeholder="Enter Car Number"
                    value={Cardetail.car_number}
                    onChange={handleInputChange} required/>
            </div>
          </div>

          <div className="field">
            <label className="label">Car Model</label>
            <div className="control">
              <input className="input" name="car_model" type="text" placeholder="Enter Car Model"
                    value={Cardetail.car_model}
                    onChange={handleInputChange} />
            </div>
          </div>


          <div className="field">
            <label className="label">Car Registration Date</label>
            <div className="control">
            <DatePicker
              name="registration_date"
              className="input"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd" // Example of setting the date format
              placeholderText="Select a date"
            />
              
            </div>
          </div>


          <div className="field">
            <label className="label">Car Colour</label>
            <div className="control">
              <input className="input" name="car_color" type="text" placeholder="Enter Car Colour"
                    value={Cardetail.car_color}
                    onChange={handleInputChange}/>
            </div>
          </div>


          <div className="field">
            <label className="label">Car Photo</label>
            <div className="control">
              <input className="input" name="photo" type="file"
                  onChange={handleImageChange}/>
            </div>
            <img src={`${API_BASE_URL}/car/${Cardetail.photo}`} />
          </div>


          <div className="field">
            <label className="label">Is AC Car?</label>
            <div className="control">
              <input type="radio" name="is_ac" className="mx-5"  
                      value='yes'
                      onChange={handleInputChange} checked={Cardetail.is_ac=="yes"?true:false}/>
                  <label >Yes</label><br/>
              <input type="radio" name="is_ac" className="mx-5" 
                      value='no'
                      onChange={handleInputChange} checked={Cardetail.is_ac=="no"?true:false} />
                  <label >No</label>
            </div>
          </div>


          <div className="field">
            <label className="label">Is Bluetooth Available In Car?</label>
            <div className="control">
                  <input type="radio" name="is_bluetooth" className="mx-5"  
                            value='yes'
                            onChange={handleInputChange}  checked={Cardetail.is_bluetooth=="yes"?true:false}/>
                        <label >Yes</label><br/>
                    <input type="radio" name="is_bluetooth" className="mx-5" 
                            value='no'
                            checked={Cardetail.is_bluetooth=="no"?true:false} onChange={handleInputChange}/>
                        <label >No</label>
            </div>
          </div>


          <div className="field">
            <label className="label">Number Of Seats IN Car?</label>
            <div className="control">
              <input className="input" name="number_of_seats" type="text" placeholder="Enter Number Of Seats"
                    value={Cardetail.number_of_seats}
                    onChange={handleInputChange}/>
            </div>
          </div>

            <div className="field grouped">
            <div className="control">
                   {error && <p>{error}</p>}
              <button type="submit" className="button green">
                Submit
              </button>
            </div>
            <div className="control">
              <button type="reset" className="button red">
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </section>

    <Footer/>
        
        </>
    );
}
export default Addcars;