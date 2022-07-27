import React,{useContext} from 'react'
import UserContext from  "../../context/UserContext";
import Alert from '@mui/material/Alert';

function AddEmploye() {
  let {addemploye,addemp} = useContext(UserContext);

  return (
    <main>
    <div className="container-login mt-5 mb-4" >
      <div className="app-wrapper">
      <h1 className="title">Add Employe</h1>
    
      <form  className="form-wrapper" onSubmit={addemploye} style={{marginBottom:"10px"}}>
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
            type="text"
            placeholder="Email"
            name="email"
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
      {addemp?<>
              <Alert severity="success">Employe Added!</Alert>
              </>:null}
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

export default AddEmploye