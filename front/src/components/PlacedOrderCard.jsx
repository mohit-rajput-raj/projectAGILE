import React from 'react'
import '../coustomStyles/ordercard.css'
import { HiCalendarDateRange } from "react-icons/hi2";
import { TbListDetails } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import { TbEdit } from "react-icons/tb";
import { RiMessageFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { HiOutlineCake } from "react-icons/hi";
import { CgDetailsMore } from "react-icons/cg";
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
const Ordercard = ({rating,order}) => {
    if(!order) return;
    const navigate = useNavigate();
    const [isBookmarked, setIsBookmarked] = React.useState(false);
  return (
    <div className='oCard'>
        <hr />
        <div className='flex'>
            <div className='oCardHead'  onClick={() => navigate('/orderDetails')}>
                <h2 className='text-2X oCH flex items-center gap-2'><div className='center rounded bg-gray-300 w-10 h-10'><HiOutlineCake className='h-6 w-6' /></div>{order.caption}</h2>
                <div className='text-gret-800 flex justify-between'>{order.orderId} <CgDetailsMore /> </div>
                <h3 className='text-grey-500 flex gap-10'>Hold By : {order.orderHoldedBy.username} <p className='text-sm center'><MdEmail />{order.orderHoldedBy.email} {rating &&(<Rating name="size-small" defaultValue={0} size="small" readOnly />)}</p></h3>
                <h3 className='text-grey-500 flex gap-10'>Deployed By : {order.orderBuilder.username} <p className='text-sm center'><MdEmail /> {order.orderBuilder.email}</p></h3>
                
                <div className='flex justify-between'>
                    <h3 className='text-sm flex'> < HiCalendarDateRange />{new Date(order.orderBuildDate).toLocaleString()} </h3>
                    <h3 className='text-sm flex'> < HiCalendarDateRange />{new Date(order.deadLine).toLocaleString()} </h3>

                </div>
            </div>
            <div className='w-1/10 rounded bg-gray-200 pb-3 flex flex-col items-center justify-evenly gap-4'>
                {/* <TbListDetails /> */}
                <IoCheckmarkDone />
                <button className='center bookBtn'  onClick={() => setIsBookmarked(!isBookmarked)}>{isBookmarked ? <FaBookmark className='h-6 w-6' /> : <FaRegBookmark className='h-6 w-6' />}</button>
            </div>
        </div>
        {order.orderStatus !== "delivered" && <div className='flex justify-between'>
            <button className='deplayBtn center'> <RiMessageFill />Messages</button>
            <button className='deleteBtn'>cancel</button>
        </div>}
        <hr />
    </div>
  )
}

export default Ordercard