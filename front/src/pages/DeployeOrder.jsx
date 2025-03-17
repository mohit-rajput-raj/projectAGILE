import React, { useState } from 'react'
import { useDashBoardStore } from '../Store/dashBoardStore';
import { connection } from 'mongoose';
const DeployeOrder = ({deployOrder,setDeployOrder}) => {
    const {getConnections,connections} =useDashBoardStore();
    const [selected,setSelected] = useState(null);
    const handelGetConnections=async()=>{
        try {
            await getConnections();
            console.log(connections);
            

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
                <div className='flex flex-col items-center gap-1'>
                    {connection?.length===0? <div className='center'>no connections</div>:(connections?.map((item,i)=>(
                        <div>{item.username}</div>
                    )))}
                    
                </div>
            </aside>
        </div>
    </div>
  )
}

export default DeployeOrder