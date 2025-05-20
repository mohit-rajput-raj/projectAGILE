import React, { useEffect } from 'react'
import {useAdminStore} from '../Store/AdminStore.js';
import {UserReportCard} from '../components/profileCard.jsx'
import '../coustomStyles/report.css'
import { div } from 'three/tsl';
const Report = () => {
  const {reports,getReports,reportsLoading} = useAdminStore();
  useEffect(()=>{
    getReports();
  },[getReports]);
  if(reportsLoading)return <div>loading</div>
  return (
    <div className="dashCon">
      <div className="dashConItem">
        <div className="item1">
          <main className='repMain'>
            <aside className='repLeft flex flex-col gap-2 '>
              <header className='w-full center'>
                <div className='center w-full'><h3 className='text-3xl text-red-600'>All recents report</h3></div>
              </header>
              <div className='h-full w-full overflow-y-scroll'>

                {reports?.length===0?(<div className='w-full h-full bg-blue-200 opacity-30 rounded-3xl center'><h1>no reports</h1></div>):(
                    reports?.map((user,i)=>(
                      <UserReportCard key={i} user={user}/>
                    ))
                )}
              </div>
            </aside><div></div>
            <aside className='repRight'>

            </aside>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Report