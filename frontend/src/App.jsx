import { Outlet } from 'react-router-dom'
import React from 'react'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify';



//styles 
import "./App.css"
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default App
