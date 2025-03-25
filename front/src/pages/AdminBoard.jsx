import React, { useEffect } from 'react'
import {useAdminStore} from '../Store/AdminStore.js';
import {UserReportCard,UserProfile} from '../components/profileCard.jsx'
import '../coustomStyles/report.css'
// import { div } from 'three/tsl';
const AdminBoard = () => {
  const {getAllUses,usersLoading,users} = useAdminStore();
  useEffect(()=>{
    getAllUses();
  },[getAllUses]);
  if(usersLoading)return <div>loading</div>
  console.log(users);
  // if(reports.length === 0) return <div>No reports found</div>;
  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className='repMain'>
            <aside className='repLeft flex flex-col gap-2 '>
              <header className='w-full center'>
                <div className='center w-full'><h3 className='text-3xl'>All Profiles</h3></div>
              </header>
              <div className='h-full w-full overflow-y-scroll flex flex-col gap-4'>

                {users?.length===0?(<div className='w-full h-full bg-blue-200 opacity-30 rounded-3xl center'><h1>no reports</h1></div>):(
                    users?.map((user,i)=>(
                      <UserProfile key={i} user={user}/>
                    ))
                )}
              </div>
            </aside><div></div>
            <aside className='repMid'></aside>
            <aside className='repRight'>

            </aside>
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminBoard