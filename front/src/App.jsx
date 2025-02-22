import React, { useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/dashboard'
// import Login from './pages/login'
import { Route,Routes } from 'react-router-dom'
import { useAuthStore } from './Store/AuthStore'
import Sign from './pages/Sigin'
import { Navigate } from 'react-router-dom'
import Home from './pages/Home'
import PROFILE from './pages/PROFILE'
import Recover from './pages/Recover'
import Logout from './pages/Logout'
// import PhoneNumberInput from './pages/num'
import PageNotFound from './pages/PageN'
// import Tpp from './pages/num'
import Num from './pages/num'
const App = () => {
  const {currUser,getUser} = useAuthStore();
  
  useEffect(()=>{
    getUser()
  },[getUser]);
  


  return (
     
    <Routes>
      <Route path='/' element={currUser?<PROFILE/>:<Navigate to={'/login'}/>}>
        <Route index element={<Dashboard />} />
        <Route path='/profile' element={<Home />} />
        <Route path='/profile2' element={<Dashboard />} />
        <Route path='/notif' element={<Home />} />
        <Route path='/chats' element={<Home />} />
        <Route path='/contact' element={<Home />} />
      </Route>
        
      <Route path='/login' element={!currUser?<Login/>:<Navigate to={'/'}/>}/>
      <Route path='/recover' element={<Recover/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/register' element={!currUser?<Sign/>:<Navigate to={'/'}/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
    
  )
}

export default App