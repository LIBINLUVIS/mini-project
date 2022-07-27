import React from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Adminlogin from './components/Admin/AdminLogin'
import AddEmploye from './components/Admin/AddEmploye'
import Userlogin from './components/user/Login'
import Home from './components/user/Home'
import Header from './components/Header'
import Fotter from './components/Fotter'
import PrivateRoutes from './utils/PrivateRoutes'
import { UserProvider } from './context/UserContext.js';


function App() {
  return (
    <div>
      <Router>
        <UserProvider>
        <Header/>
        <Routes>
        <Route element={<PrivateRoutes/>} >
        <Route  element={<Home/>} path="/home"/>   
        </Route>
        <Route  element={<Userlogin/>} path="/" exact />
        <Route element={<AddEmploye/>} path="/addemploye" />
        <Route element={<Adminlogin/>} path="/admin" />
        </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
