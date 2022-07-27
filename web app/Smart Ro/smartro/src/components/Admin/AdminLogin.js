import React,{useContext} from 'react'
import UserContext from  "../../context/UserContext";

function AdminLogin() { 
  let {adminlogin} = useContext(UserContext);
  
  return (  
    <main>
    <div className="container-login mt-5 mb-4" >
      <div className="app-wrapper">
      <h1 className="title">Admin Sign In</h1>
    
      <form  className="form-wrapper" onSubmit={adminlogin}>
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
          <span>Add</span>
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

export default AdminLogin