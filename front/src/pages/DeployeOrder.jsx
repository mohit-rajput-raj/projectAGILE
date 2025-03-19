import React, { useState } from 'react'
import { useDashBoardStore } from '../Store/dashBoardStore';

import { ProfileComponent } from "../components/profileCard";
const DeployeOrder = ({deployOrder,setDeployOrder}) => {

    const {getConnections,connections} =useDashBoardStore();
    const [selected,setSelected] = useState(null);
    const handelGetConnections=async()=>{
        try {
            await getConnections();
            console.log(connections);
            console.log(connections.length===0);
            
            

        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <div className='itemOverMain'>
        
        <div className='depContainer flex items-center w-full h-full gap-10'>
            <div className='w-40'><button className='close' onClick={()=>setDeployOrder(!deployOrder)}>close</button></div>
            <aside className='flex flex-col gap-3 justify-center w-1/5 h-full'>
                <button className='btn ' onClick={handelGetConnections}>select from  connection</button>
                {selected && <button className='btn'>add</button>}
            </aside>
            <aside className='flex flex-col gap-3 justify-center w-4/5 h-full'>
                <div className='flex flex-col items-center gap-1 h-full w-full'>
                    {connections?.length===0? <div className='center h-full flex flex-col justify-center'><h1 className='text-black'>no connections</h1></div>:(connections?.map((item,i)=>(
                        <div key={index} onClick={()=>setSelected(item._id)} className="flex items-center p-2 text-gray-900 hover:bg-blue-100 cursor-pointer">
                        <ProfileComponent user={item} />
                        <hr />
                      </div>
                    )))}
                    
                </div>
            </aside>
        </div>
    </div>
  )
}

export default DeployeOrder