
import React from 'react';
import '../index.css';
import { BrowserRouter, Route,Routes, Navigate  } from 'react-router-dom';
import Dashboard from '../Pages/Dashboard';
import Carlists from '../Pages/Cars/Carlists';
import AddCars from '../Pages/Cars/Addcars';
import Login from '../Pages/Login';
import isAuthenticated from '../Middleware/PrivateRoute';
import Hotellist from '../Pages/Hotels/Hotellist';
import Addhotels from '../Pages/Hotels/Addhotels';
import Operatorlist from '../Pages/Operators/Operatorlist';
import Addoperators from '../Pages/Operators/Addoperators';
import Cardetail from '../Pages/Cars/Cardetail';
import Hoteldetail from '../Pages/Hotels/Hoteldetail';
import Operatordetail from '../Pages/Operators/Operatordetail';
import PrivateRoute from './PrivateRoute';
import Profilelist from '../Pages/Profilelist';
import Addrooms from '../Pages/Room/Addrooms';
import Roomlist from '../Pages/Room/Roomlist';
import Addlocation from '../Pages/Location/Addlocation';
import Locationlist from '../Pages/Location/Locationlist';
import Roomtype from '../Pages/Room/Roomtype';
import Addroomtype from '../Pages/Room/Addroomtype';
import Roomdetail from '../Pages/Room/Roomdetail';



function Webrouting(){
    return(
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={isAuthenticated() ? (<Dashboard />) : (
                            <Navigate to="/login" replace />)}/>
                        
                        <Route path="/dashboard" element={isAuthenticated() ? (<Dashboard />) : (
                            <Navigate to="/login" replace />)}/>

                        <Route path="/cars" element={isAuthenticated() ? (<Carlists />) : (
                            <Navigate to="/login" replace />)}/>

                        <Route path="/add-car" element={isAuthenticated() ? (<AddCars />) : (
                            <Navigate to="/login" replace />)}/>  
                             
                        <Route path="/edit-car/:car_id" element={isAuthenticated() ? (<AddCars />) : (
                            <Navigate to="/login" replace />)}/>       

                        <Route path="/car/:car_id" element={isAuthenticated() ? (<Cardetail />) : (
                            <Navigate to="/login" replace />)}/>  

                        <Route path="/location" element={isAuthenticated() ? (<Locationlist />) : (
                            <Navigate to="/login" replace />)}/>   

                        <Route path="/add-location" element={isAuthenticated() ? (<Addlocation />) : (
                            <Navigate to="/login" replace />)}/> 

                        <Route path="/edit-location/:location_id" element={isAuthenticated() ? (<Addlocation />) : (
                            <Navigate to="/login" replace />)}/>  

                          <Route path="/hotels" element={isAuthenticated() ? (<Hotellist />) : (
                            <Navigate to="/login" replace />)}/>  


                        <Route path="/add-hotels" element={isAuthenticated() ? (<Addhotels />) : (
                            <Navigate to="/login" replace />)}/>  

                        <Route path="/edit-hotel/:hotel_id" element={isAuthenticated() ? (<Addhotels />) : (
                            <Navigate to="/login" replace />)}/>       
                        
                        <Route path="/hotels/:hotel_id" element={isAuthenticated() ? (<Hoteldetail/>) : (
                            <Navigate to="/login" replace />)}/>

                        <Route path="/rooms" element={isAuthenticated() ? (<Roomlist />) : (
                            <Navigate to="/login" replace />)}/>

                        <Route path="/rooms/:room_id" element={isAuthenticated() ? (<Roomdetail/>) : (
                            <Navigate to="/login" replace />)}/>

                        <Route path="/edit-room/:room_id" element={isAuthenticated() ? (<Addrooms />) : (
                            <Navigate to="/login" replace />)}/>

                        <Route path="/add-rooms" element={isAuthenticated() ? (<Addrooms />) : (
                            <Navigate to="/login" replace />)}/>  

                        <Route path="/room-type" element={isAuthenticated() ? (<Roomtype />) : (
                            <Navigate to="/login" replace />)}/>  

                        <Route path="/add-roomtype" element={isAuthenticated() ? (<Addroomtype />) : (
                            <Navigate to="/login" replace />)}/> 

                        <Route path="/edit-roomtype/:room_id" element={isAuthenticated() ? (<Addroomtype />) : (
                            <Navigate to="/login" replace />)}/> 


                        <Route path="/operators" element={isAuthenticated() ? (<Operatorlist />) : (
                            <Navigate to="/login" replace />)}/> 

                        <Route path="/add-operators" element={isAuthenticated() ? (<Addoperators />) : (
                            <Navigate to="/login" replace />)}/>    

                        <Route path="/edit-operator/:operator_id" element={isAuthenticated() ? (<Addoperators />) : (
                            <Navigate to="/login" replace />)}/>    

                        <Route path="/operators/:operator_id" element={isAuthenticated() ? (<Operatordetail />) : (
                            <Navigate to="/login" replace />)}/>   

                        <Route path="/login" exact element= {<Login />}/>

                        <Route path="/profilelist" exact element= {<Profilelist />}/>

        
                    </Routes>
                </BrowserRouter>
            </>
    );
}
export default Webrouting;