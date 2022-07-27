import React,{useEffect,useContext} from 'react'
import UserContext  from '../../context/UserContext';
import Card from '@mui/material/Card'; 
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress'
import '../user/home.css'; 


function Home() {
  
  let {logout,fetchdata,data,dataloaded} = useContext(UserContext);


  useEffect(()=>{
    fetchdata();  
  },[]);


  return (
    <>
    <div className='logout'>

      <button style={{backgroundColor:"#91B2FF",color:"red",border:"none",fontSize:"20px"}}  onClick={logout}>Logout</button>

    </div>

    <div className='cards'>
      {!dataloaded?
      <CircularProgress size="2rem" style={{color:"white"}}/> 
      :
     <>
      {data.map((value)=>(
           <Card className='card'>
           <CardContent>
             <Typography variant="h5" component="div">
               Ro plant at {value.location}
             </Typography>
             <hr/>
             <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Current TDS Value is - {value.tds}
             </Typography>
             <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Current PH Value is - {value.Ph}
               <br />
             
             </Typography>
             <Typography sx={{ mb: 1.5 }} color="text.secondary">
               Date and Time is - {value.time}
             </Typography>

             {value.ph>=6.5<8.5 && value.tds>=50<150 ? <>
             <Typography sx={{ mb: 1.5 }} color="green">
              Quality - Good.
             </Typography>
             </>:<>
             <Typography sx={{ mb: 1.5 }} color="red">
             Quality - Bad.
             </Typography>
             </>}
           </CardContent>
         </Card>
         
      ))}

      </>
      
      }
    </div>
    </>
  ) 
}

export default Home