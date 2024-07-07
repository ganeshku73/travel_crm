import React from 'react';
import ReactDOM from 'react-dom/client';

import reportWebVitals from './reportWebVitals';
import Webrouting from './Routes/Webrouting';

//import { Store } from './Redux/Store';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <>
   
      <Webrouting/>
   
  </> 
 
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();



