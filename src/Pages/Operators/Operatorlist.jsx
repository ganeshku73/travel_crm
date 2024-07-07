import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Sidemenu from "../../Common/Sidemenu";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import { API_BASE_URL } from "../../Constant";

function Operatorlist(){
  const accessToken = localStorage.getItem("accessToken");
  
  const [CollectOperators, RealData] = useState([]);
  const [deleted, setDeleted] = useState(false);
        
          useEffect(()=>{
          fetchOperatorsData()
      },[]);


  const isDataEmpty = () => {
    return CollectOperators.length === 0;
  };

  const navigate = useNavigate();
  const handleDelete = async (id) => {
   
    try {

  

      const response = await axios.delete(`${API_BASE_URL}/operator//operator-delete/${id}`,{
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });


      fetchOperatorsData();
      console.log('Deleted:', response.data.result);
      setDeleted(true); // Optionally, update state or perform any other action after successful deletion
      navigate('/operators');
    } catch (error) {
      console.error('Error deleting:', error);
      // Handle error, show a message, etc.
    } 
  };
      

  const fetchOperatorsData = async ()=>{
    {
       await axios.get(`${API_BASE_URL}/operator/operator-list`,{
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then((response)=>{
            if(response != ''){
              if(response.data.status!=0){
                RealData(response.data.result);
                const operators = response.data.result;
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
        

             <section class="is-title-bar">
                <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
                <ul>
                    <li><a href={`/`}>Admin</a></li>
                    <li>Operator Listing</li>
                </ul>
                </div>
            </section>


            <section className="is-hero-bar">
         <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
             <h1 className="title">
                Operator List
            </h1>
            <Link to={`/add-operators`}><button className="button blue">Add Operators</button></Link>
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
          <b>Operators</b>
        </div>
        <button type="button" className="button small textual --jb-notification-dismiss">Dismiss</button>
      </div>
    </div>
      )}
    <div className="card has-table">
    {deleted && <p>Document deleted successfully!</p>}
      <header className="card-header">
        <p className="card-header-title">
          <span className="icon"><i className="mdi mdi-account-multiple"></i></span>
          Operators
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
            <th>Phone</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Rating</th>
            <th></th>
          </tr>
          </thead>
          <tbody>

          {
          CollectOperators.map((value,key) => {
            return(

              <tr>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"/>
                <span className="check"></span>
              </label>
            </td>
            <td className="image-cell">
              <div className="image">
                <img src="https://avatars.dicebear.com/v2/initials/rebecca-bauch.svg" className="rounded-full"/>
              </div>
            </td>
            <td data-label="Operator Name">{value.operator_name}</td>
            <td data-label="Operator Phone Number">{value.operator_phone_number}</td>
            <td data-label="Operator Country">{value.operator_country_name}</td>
            <td data-label="State">{value.operator_state_name}</td>
            <td data-label="City">{value.operator_city_name}</td>
            <td data-label="City">{value.operator_rating}</td>
           
            <td></td>
            <td className="actions-cell">
              <div className="buttons right nowrap">
                <a href={`./operators/${value._id}`}>
                <button className="button small green --jb-modal"  data-target="sample-modal-2" type="button">
                  <span className="icon"><i className="mdi mdi-eye"></i></span>
                </button>
                </a>
                <a href={`./edit-operator/${value._id}`}>
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
export default Operatorlist;