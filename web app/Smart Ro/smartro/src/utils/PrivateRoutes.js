import React,{useContext} from 'react'
import {Outlet,Navigate,useNavigate} from 'react-router-dom'
import UserContext  from '../context/UserContext';

function PrivateRoutes() {
  let navigate=useNavigate();
  let {loginstatus} = useContext(UserContext);
 

  if(loginstatus){
    navigate("/home")
  }
 

  


  return (
    loginstatus ?  <Outlet/> : <Navigate to="/"/>
  )
}

export default PrivateRoutes