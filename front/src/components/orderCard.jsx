import React from 'react'
import '../coustomStyles/ordercard.css'
import { HiCalendarDateRange } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { GrDeploy } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
const Ordercard = () => {
    const navigate = useNavigate();
  return (
    <div className='oCard'>
        <div className='oCardHead' onClick={() => navigate('/editOrder')}>
            <h2 className=' oCH flex items-center gap-2 justify-between'>Maridge Reception <TbEdit className='h-6 w-6' /> </h2>
            <div className='text-gret-500 flex justify-between'>C1-2432-1232-9219 </div>
            <h3 className='text-grey-300'>hiroshi saitama </h3>
            <h3 className='text-sm flex text-grey-300'> < HiCalendarDateRange />MFG 12/12/2022</h3>
        </div>
        <div className='flex justify-between'>
            <button className='deplayBtn center'><GrDeploy className='h-3 w-3' />deploy</button>
            <button className='deleteBtn center'>< AiTwotoneDelete className='h-6 w-6' /> </button>
        </div>
    </div>
  )
}

export default Ordercard