// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

import axios from 'axios'



// ✅ Global axios config

axios.defaults.baseURL = "http://192.168.0.113:5000";

axios.defaults.withCredentials = true;



createRoot(document.getElementById('root')).render(

  <StrictMode>

    <App />

  </StrictMode>,

)