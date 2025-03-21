import React, { useEffect } from 'react'
import '../coustomStyles/ordercard.css'
import { HiCalendarDateRange } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { GrDeploy } from "react-icons/gr";
import { AiTwotoneDelete } from "react-icons/ai";
import { ImBoxAdd } from "react-icons/im";
import { VscSyncIgnored } from "react-icons/vsc";
import { useDashBoardStore } from '../Store/dashBoardStore';
const Ordercard = ({order,deployOrder,setDeployOrder,setDeployOrderId}) => {
   if(!order) return;
  const navigate = useNavigate();
  const {deleteFromCreation,deleteAskLoading,getUndeployedOrders,getWaitingOrders} = useDashBoardStore();
  useEffect(() => {
    getWaitingOrders();
    getUndeployedOrders();
  }, [deleteFromCreation,deleteAskLoading]);
  return (
    <div className='oCard'>
        <div className='oCardHead' onClick={() => navigate('/editOrder')}>
            <h2 className=' oCH flex items-center gap-2 justify-between'>{order.caption} <TbEdit className='h-6 w-6' /> </h2>
            <div className='text-gret-500 flex justify-between'>{order.orderId} </div>
            <h3 className='text-grey-300'>hiroshi saitama </h3>
            <h3 className='text-sm flex text-grey-300'> < HiCalendarDateRange />{order.deadLine}</h3>
        </div>
        <div className='flex justify-between'>
          <button className='deplayBtn center' onClick={() => {setDeployOrder(true);setDeployOrderId(order._id)}}><GrDeploy className='h-3 w-3' />deploy</button>
            <button className='deleteBtn center' onClick={() => {deleteFromCreation(order._id)}}>< AiTwotoneDelete className='h-6 w-6' /> </button>
        </div>
    </div>
  )
}
const WaitingOrdercard = ({order,deployOrder,setDeployOrder,setDeployOrderId}) => {
  if(!order) return;
  const navigate = useNavigate();
  const {deleteAsk,getWaitingOrders,getUndeployedOrders,deleteAskLoading} = useDashBoardStore();

  useEffect(() => {
    getWaitingOrders();
    getUndeployedOrders();
  }, [deleteAsk,deleteAskLoading]);
  const handelDelete = () => {
    console.log("fgfg");
    
    deleteAsk(order._id);
  }
 return (
   <div className='oCard'>
       <div className='oCardHead' >
           <h2 className=' oCH flex items-center gap-2 justify-between'>{order.caption} <TbEdit className='h-6 w-6' /> </h2>
           <div className='text-gret-500 flex justify-between'>{order.orderBuilder.username} </div>
           <h3 className='text-grey-300'>{order.orderBuilder.email} </h3>
           <h3 className='text-sm flex text-grey-300'> < HiCalendarDateRange />{order.deadLine}</h3>
       </div>
       <div className='flex justify-between'>
         <button className='deplayBtn center' onClick={handelDelete}><GrDeploy className='h-3 w-3' />delete ask</button>
         
       </div>
   </div>
 )
}
import { CgDetailsMore } from "react-icons/cg";
const TODOOrdercard = ({order}) => {
  if(!order)return;
  const navigate = useNavigate();
return (
  <div className='oCard'>
      <div className='oCardHead' onClick={() => navigate('/orderDetails')}>
          <h2 className=' oCH flex items-center gap-2 justify-between'>{order.caption} <CgDetailsMore className='h-6 w-6' /></h2>
          <div className='text-gret-500 flex justify-between'>{order.orderId} </div>
          <h3 className='text-grey-300'>hiroshi saitama </h3>
          <div className='flex gap-10'>
          <h3 className='text-sm flex text-grey-300'> < HiCalendarDateRange />{order.deadLine}</h3>
          <h3 className='text-sm flex text-grey-300'> < HiCalendarDateRange />{order.expiryDate}</h3>
          </div>
      </div>
      <div className='flex justify-between'>
          <button className='deplayBtn center'><ImBoxAdd className='h-3 w-3' />Add todo</button>
          <button className='deleteBtn center'>< VscSyncIgnored className='h-6 w-6' /> reject</button>
      </div>
  </div>
)
}

export { Ordercard  ,TODOOrdercard,WaitingOrdercard}