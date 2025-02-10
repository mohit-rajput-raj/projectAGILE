import React, { useEffect } from 'react'
import Login from './pages/login/Login'
import { Route,Routes } from 'react-router-dom'
import { useAuthStore } from './Store/AuthStore'
import Sign from './pages/register/Sigin'
import { Navigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Recover from './pages/forgetPAss/Recover'
const App = () => {
  const {currUser,getUser} = useAuthStore();
  
  useEffect(()=>{
    getUser()
  },[getUser]);
  


  return (
     
    <Routes>
      <Route path='/' element={currUser?<Home/>:<Navigate to={'/login'}/>}/>
        
      <Route path='/login' element={!currUser?<Login/>:<Navigate to={'/'}/>}/>
      <Route path='/recover' element={<Recover/>}/>
      <Route path='/register' element={!currUser?<Sign/>:<Navigate to={'/'}/>}/>
    </Routes>
    
  )
}

export default App