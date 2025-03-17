import React, { useEffect } from 'react'
import Login from './pages/Login'
// import Login1 from './pages/Login1'
import Dashboard from './pages/dashboard'
// import Login from './pages/login'
import { Route,Routes } from 'react-router-dom'
import { useAuthStore } from './Store/AuthStore'
import Sign from './pages/Sigin'
import { Navigate } from 'react-router-dom'
import Home from './pages/Home'
import NAV from './pages/NAV'
import Recover from './pages/Recover'
import Logout from './pages/Logout'
// import PhoneNumberInput from './pages/num'
import PageNotFound from './pages/PageN'
// import Tpp from './pages/num'
import {Profile} from './pages/Profile'
// import PeoplesProfile from './pages/Profile'
// import Num from './pages/num'
import Connections from './pages/Connections'
import EditProfile from './pages/EditProfile'
import Messages from './pages/Messages'
import Notification from './pages/Notification'
import CompleteProfile from './pages/CompleteProfile'
import CreateOrder from './pages/CreateOrder'
import OrderDetailsPage from './pages/OrderDetailsPage'
import EditOrder from './pages/EditOrder'
import HeaderLoader from './skeletons/profileSkeleton';


import Items from './pages/Items'
import Deleted from './pages/Deleted'
import History from './pages/History'
import Report from './pages/Report'
import Colabration from './pages/Colabration'
import Issues from './pages/Issues'
import Contacts from './pages/Contacts'
import Cancled from './pages/Cancled'
import Menu from './pages/Menu'
import DashboardHomeMaker from './pages/DashboardHomeMaker'
import Menu2 from './pages/Menu2'
import { nanoid } from "nanoid";
// import CreateOrder from './pages/CreateOrder'
const App = () => {
  const {currUser,getUser,isLogin} = useAuthStore();
  



  
  useEffect(()=>{
    getUser()
  },[getUser]);

  if(isLogin && !currUser){
    return <HeaderLoader/>
  }
  
  

  return (
     
    <Routes>
      <Route path='/' element={currUser?<NAV/>:<Navigate to={'/login'}/>}>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/items' element={<Items />} />
        <Route path='/dashboard/colabration' element={<Colabration />} />
        <Route path='/dashboard/contacts' element={<Contacts />} />
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/dashboard/issues' element={<Issues />} />
        <Route path='/dashboard/report' element={<Report />} />
        <Route path='/dashboard/history' element={<History />} />
        <Route path='/dashboard/deleted' element={<Deleted />} />
        <Route path='/dashboard/Cancled' element={<Cancled/>} />
        <Route path='/dashboard/menu' element={<Menu/>} />
        

        <Route path='/profile/:username' element={<Profile/>} />
        <Route path='/profile/:username/menu' element={<Menu2/>} />
        {/* <Route path='/profile/:id' element={<Profile/>} /> */}
        <Route path='/editProfile' element={<EditProfile/>} />
        <Route path='/dashboard' element={currUser?.profile?.role==="homemaker"?<DashboardHomeMaker/>:<Dashboard />} />
        <Route path='/createOrder' element={<CreateOrder/>} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/home' element={<Home />} />
        <Route path='/completep' element={<CompleteProfile/>} />
        <Route path='/connections' element={<Connections />} />
        <Route path='/orderDetails' element={<OrderDetailsPage />} />
        <Route path='/editOrder' element={<EditOrder />} />
        <Route path='/create' element={<CreateOrder />} />
      </Route>
        
      <Route path='/login' element={!currUser?<Login/>:<Navigate to={'/'}/>}/>
      <Route path='/recover' element={<Recover/>}/>
      <Route path='/dash' element={<Dashboard/>}/>
      <Route path='/register' element={!currUser?<Sign/>:<Navigate to={'/'}/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path='/*' element={<PageNotFound/>}/>
      {/* <Route path='/test' element={<Num/>}/> */}
    </Routes>
    
  )
}

export default App