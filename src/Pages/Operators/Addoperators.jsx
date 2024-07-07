import React, {useEffect, useState } from "react";
import { useNavigate, Link ,useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../Common/Header";
import Sidemenu from "../../Common/Sidemenu";
import Footer from "../../Common/Footer";
import { API_BASE_URL } from "../../Constant";
function Addoperators(){

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the input
    setImage(file);
  };
   
  const accessToken = localStorage.getItem("accessToken");
  const {operator_id}  = useParams();
  const [Operatordetail, setOperatorDetail]=useState({});
  //var carData = [];

  useEffect(
    ()=>{

      const getOperatorDetail = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/operator/operator-list/${operator_id}`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          setOperatorDetail(response.data.result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      if (operator_id != undefined) {
        getOperatorDetail();
      }

    },[]
  );

  
  const [isEditing, setIsEditing] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOperatorDetail({
      ...Operatordetail,
      [name]: value
    });
  };

  const [operator_rating, setOperator_rating] = useState("");
  
  
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    var o_id = operator_id;
    if(operator_id == undefined){
      o_id =null;
    }
    const datarequest = {
        operator_id:o_id,
        operator_name:Operatordetail.operator_name,
        operator_phone_number:parseInt(Operatordetail.operator_phone_number),
        operator_email_id:Operatordetail.operator_email_id,
        operator_country_name:Operatordetail.operator_country_name,
        operator_state_name:Operatordetail.operator_state_name,
        operator_city_name:Operatordetail.operator_city_name,
        landmark:Operatordetail.landmark,
        zipcode:Operatordetail.zipcode,
        operator_photo:image,
        number_of_cars:Operatordetail.number_of_cars,
        operator_rating:Operatordetail.operator_rating

      }
      console.log(datarequest);
      try {
          
        const formDataToSend = new FormData();
        formDataToSend.append('operator_id', datarequest.operator_id);
        formDataToSend.append('operator_name', datarequest.operator_name);
        formDataToSend.append('operator_phone_number', datarequest.operator_phone_number);
        formDataToSend.append('operator_email_id', datarequest.operator_email_id);
        formDataToSend.append('operator_country_name', datarequest.operator_country_name);
        formDataToSend.append('operator_state_name', datarequest.operator_state_name);
        formDataToSend.append('operator_city_name', datarequest.operator_city_name);
        formDataToSend.append('landmark', datarequest.landmark);
        formDataToSend.append('zipcode', datarequest.zipcode);
        formDataToSend.append('operator_photo', datarequest.operator_photo);
        formDataToSend.append('number_of_cars', datarequest.number_of_cars);
        formDataToSend.append('operator_rating', datarequest.operator_rating);
      

    
          const response = await axios.post(`${API_BASE_URL}/operator/operator-register`,formDataToSend, 
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${accessToken}`
              }
            }
        );
        navigate('/operators');
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
                <li> Forms</li>
                </ul>
             </div>
         </section>

         <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
             Operators Form
            </h1>
            <Link to={`/operators`}><button className="button blue">Back</button></Link>
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
                <form  onSubmit={handleSubmit}>    
                     <div className="field">
                        <label className="label">Operator Name</label>
                        <div className="control">
                        <input className="input" name="operator_name" type="text" placeholder="Enter Operator Name"
                                  value={Operatordetail.operator_name}
                                  onChange={handleInputChange} required />
                                
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Operator Phone Number</label>
                        <div className="control">
                        <input className="input" type="text" name="operator_phone_number" placeholder="Enter Operator Phone Number"
                                  value={Operatordetail.operator_phone_number}
                                  onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Operator Email Id</label>
                        <div className="control">
                        <input className="input" name="operator_email_id" type="email" placeholder="Enter Operator Email Id"
                                  value={Operatordetail.operator_email_id}
                                  onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Operator Country Name</label>
                        <div className="control">
                        <input className="input" name="operator_country_name" type="text" placeholder="Enter Operator Country Name"
                                 value={Operatordetail.operator_country_name}
                                 onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Operator State Name </label>
                        <div className="control">
                        <input className="input" name="operator_state_name" type="text" placeholder="Enter Operator State Name"
                                  value={Operatordetail.operator_state_name}
                                  onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Operator City Name </label>   
                        <div className="control">
                        <input className="input" name="operator_city_name" type="text" placeholder="Enter Operator City Name "
                                value={Operatordetail.operator_city_name}
                                onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Landmark</label>
                        <div className="control">
                        <input className="input" name="landmark" type="text" placeholder="Enter Near By Landmark"
                                 value={Operatordetail.landmark}
                                 onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Zipcode</label>
                        <div className="control">
                        <input className="input" name="zipcode" type="text" placeholder="Enter Zipcode"
                               value={Operatordetail.zipcode}
                               onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Operator Photo</label>
                        <div className="control">
                        <input className="input" name="operator_photo" type="file"
                                 onChange={handleImageChange}/> 
                        </div>
                        <img src={`${API_BASE_URL}/operator/`+Operatordetail.operator_photo} />
                    </div>

                    <div className="field">
                        <label className="label">Number Of Cars</label>
                        <div className="control">
                        <input className="input" name="number_of_cars" type="text" placeholder="Enter Number Of Cars"
                                 value={Operatordetail.number_of_cars}
                                 onChange={handleInputChange} required />
                        </div>
                    </div>


                    <div className="field">
                        <label className="label">Rating</label>
                        <div className="control">
                            <input type="radio" className="mx-5" 
                                value='1 Star'
                                name="operator_rating"
                                checked={Operatordetail.operator_rating=="1 Star"?true:false}
                                onChange={handleInputChange}/>
                               <label>1 Star</label><br/>
                            <input type="radio" className="mx-5"
                                value='2 Star'
                                name="operator_rating"
                                checked={Operatordetail.operator_rating=="2 Star"?true:false}
                                onChange={handleInputChange}/>
                                <label>2 Star</label><br/>
                            <input type="radio" className="mx-5"
                                value='3 Star'
                                name="operator_rating"
                                checked={Operatordetail.operator_rating=="3 Star"?true:false}
                                onChange={handleInputChange}/>
                                <label>3 Star</label><br/>
                            <input type="radio" className="mx-5"
                                value='4 Star'
                                name="operator_rating"
                                checked={Operatordetail.operator_rating=="4 Star"?true:false}
                                onChange={handleInputChange}/>
                                <label>4 Star</label><br/>
                            <input type="radio" className="mx-5"
                                value='5 Star'
                                name="operator_rating"
                                checked={Operatordetail.operator_rating=="5 Star"?true:false}
                                onChange={handleInputChange}/>
                                <label>5 Star</label>
                        </div>
                    </div>


        <div className="field grouped">
            <div className="control">
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
export default Addoperators;