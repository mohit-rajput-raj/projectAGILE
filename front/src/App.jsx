import React, { useEffect } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/dashboard'
import AdminBoard from './pages/AdminBoard'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthStore } from './Store/AuthStore'
import Sign from './pages/Sigin'
import Home from './pages/Home'
import {NAV,NAVadmin} from './pages/NAV'
import Recover from './pages/Recover'
import Logout from './pages/Logout'
import AdminHome from './pages/AdminHome'
import PageNotFound from './pages/PageN'
import Profile from './pages/Profile'
import Connections from './pages/Connections'
import EditProfile from './pages/EditProfile'
import Messages from './pages/Messages'
import Notification from './pages/Notification'
import CreateOrder from './pages/CreateOrder'
import OrderDetailsPage from './pages/OrderDetailsPage'
import EditOrder from './pages/EditOrder'
import {HeaderLoader,LinkedinFeed} from './skeletons/profileSkeleton'
import Items from './pages/Items'
import Favourites from './pages/Fav'
import History from './pages/History'
import Report from './pages/Report'
import Colabration from './pages/Colabration'
import Issues from './pages/Issues'
import Contacts from './pages/Contacts'
import Cancled from './pages/Cancled'
import Menu from './pages/Menu'
import DashboardHomeMaker from './pages/DashboardHomeMaker'
import Menu2 from './pages/Menu2'
export const companyName="Bake2Biz";
// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currUser } = useAuthStore();
  if (!currUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App = () => {
  const {currUser, getUser, isLogin} = useAuthStore();
  
  useEffect(() => {
    getUser();
  }, [getUser]);

  if(isLogin && !currUser) {
    return <LinkedinFeed/>
  }

  return (
    <Routes>
      <Route path='/login' element={!currUser ? <Login/> : <Navigate to='/'/>}/>
      <Route path='/register' element={!currUser ? <Sign/> : <Navigate to='/'/>}/>
      <Route path='/recover' element={<Recover/>}/>
      <Route path='/logout' element={<Logout/>}/>

      {currUser?.profile?.role === 'admin' ? (
        <Route path='/' element={
          <ProtectedRoute>
            <NAVadmin/>
          </ProtectedRoute>
        }>
          <Route index element={<AdminHome />} />
          <Route path='/adminBoard' element={<AdminBoard />} />
          <Route path='/reports' element={<Report />} />
        </Route>
      ) : (
        <Route path='/' element={
          <ProtectedRoute>
            <NAV/>
          </ProtectedRoute>
        }>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/dashboard/items' element={<Items />} />
          <Route path='/dashboard/colabration' element={<Colabration />} />
          <Route path='/dashboard/contacts' element={<Contacts />} />
          <Route path='/dashboard/issues' element={<Issues />} />
          <Route path='/dashboard/report' element={<Report />} />
          <Route path='/dashboard/history' element={<History />} />
          <Route path='/dashboard/favourites' element={<Favourites />} />
          <Route path='/dashboard/Cancled' element={<Cancled/>} />
          <Route path='/dashboard/menu' element={<Menu/>} />
          <Route path='/profile/:username' element={<Profile/>} />
          <Route path='/profile/:username/menu' element={<Menu2/>} />
          <Route path='/editProfile' element={<EditProfile/>} />
          <Route path='/dashboard' element={currUser?.profile?.role==="homemaker"?<DashboardHomeMaker/>:<Dashboard />} />
          <Route path='/createOrder' element={<CreateOrder/>} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/completep' element={<EditProfile/>} />
          <Route path='/connections' element={<Connections />} />
          <Route path='/orderDetails/:orderId' element={<OrderDetailsPage />} />
          <Route path='/editOrder' element={<EditOrder />} />
          <Route path='/create' element={<CreateOrder />} />
        </Route>
      )}

      <Route path='/*' element={<PageNotFound/>}/>
    </Routes>
  );
}

export default App