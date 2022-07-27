import { createContext, useState, useEffect } from "react";
import { useHistory,useNavigate } from "react-router-dom";
import axios from 'axios'
const UserContext = createContext();

export default UserContext;

export const UserProvider =({children})=>{

    
    const [loginstatus,setLoginstatus] = useState(false);
    const [loading,setLoading] = useState(false);
    const [data,setData]=useState([]);
    const [dataloaded,setDataloaded] =useState(false);
    const [addemp,setAddemp]=useState(false)
    let navigate=useNavigate();
   

    const loginUser=(e)=>{
      e.preventDefault();
      setLoading(true)
      let  username=e.target.username.value
      let password=e.target.password.value

      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    };

      const body=JSON.stringify({username,password})

      const loginapi="http://127.0.0.1:8000/api/login/"

      axios.post(loginapi,body,config).then((res)=>{
        localStorage.setItem("user_token",res.data.token)
        setLoading(false)
        setLoginstatus(true)
          navigate("/home")
      })
    
    }

    const logincheck=()=>{
      var token=localStorage.getItem('user_token');
      if(token){
        setLoginstatus(true);
        navigate("/home")
      }

    }

    const logout=()=>{
      localStorage.removeItem('user_token');
      setLoginstatus(false);
      navigate("/");
    }

    const fetchdata=()=>{

      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${localStorage.getItem('user_token')}`,
            'Accept':'application/json'
        }
    };
 

    const fetchdata="http://127.0.0.1:8000/api/userros/"

      axios.get(fetchdata,config).then((res)=>{

        setData(res.data)
        setDataloaded(true)

      }).catch((err)=>{
       
      })
    }
    
    const adminlogin=(e)=>{
      e.preventDefault();
      let username=e.target.username.value;
      let password=e.target.password.value;
      if(username=="admin" && password==123){
        navigate("/addemploye")
      }
  
    }

    const addemploye=(e)=>{
      e.preventDefault();
      let username=e.target.username.value;
      let email=e.target.email.value;
      let password=e.target.password.value;

      const body=JSON.stringify({username,email,password});

      const addempapi="https://smartroapi.herokuapp.com/api/register/"

      const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }
    };

    axios.post(addempapi,body,config).then((res)=>{
        if(res && res.status == 200){
          setAddemp(true)
          e.target.username.value=null
          e.target.email.value=null
          e.target.password.value=null 
        }
    }).catch((error)=>{
      if(error.response.status==404){
        setAddemp(false)
      }
    })

    }


let contextData={

    loginUser:loginUser,
    loading:loading,
    loginstatus:loginstatus,
    logincheck:logincheck,
    logout:logout,
    data:data,
    fetchdata:fetchdata,
    dataloaded:dataloaded,
    adminlogin:adminlogin,
    addemploye:addemploye,
    addemp:addemp

}


return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
);

};