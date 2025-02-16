import React, { useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/dashboard'
// import Login from './pages/login'
import { Route,Routes } from 'react-router-dom'
import { useAuthStore } from './Store/AuthStore'
import Sign from './pages/Sigin'
import { Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Recover from './pages/Recover'
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
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/register' element={!currUser?<Sign/>:<Navigate to={'/'}/>}/>
    </Routes>
    
  )
}

export default App