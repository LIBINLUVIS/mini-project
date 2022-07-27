import React,{useEffect,useState,useContext} from 'react'
import './Login.css'
import CircularProgress from '@mui/material/CircularProgress'
import UserContext from  "../../context/UserContext";

function Login() {

  let { loginUser,loading,logincheck} = useContext(UserContext);

  useEffect(()=>{
    logincheck();
  },[]);

  return (
    <main>
    <div className="container-login mt-5 mb-4" >
      <div className="app-wrapper">
      <h1 className="title">Sign In</h1>
      <p>Sign into your Account</p>
      <form  className="form-wrapper" onSubmit={loginUser}>
        <div className="form-group">
          <input
            className="input"
            type="text"
            placeholder="Username"
            name="username"
            required
          />
        </div>

        <div className="form-group">
          <input
            className="input"
            type="password"
            placeholder="Password"
            name="password"
            minLength="3"
            required
          />
        </div>
        <button className="btn" type="submit" >
          {loading?<CircularProgress size="1.5rem" />:<>Login</>}
        </button>
      </form>
      {/* {alert ? (
        <>
          <div className={classes.root} style={{marginTop:"20px"}}>
            <Alert severity="error">
                 {alert}— check it out!
            </Alert>
          </div>
        </>
      ) : null} */}
      </div>
    </div>
    </main>
   
  )
}

export default Login