import React from 'react'
import '../coustomStyles/colabration.css'
import { userPic } from '../components/profileCard'

import Suggestions from './Suggestions'
const ColabCard = ({keyv}) => {
  return (
    <div className=' h-30 min-h-30 w-full roun  flex items-center   colabcard'>
      <div className=' flex items-center usersPisc'>
        {[...Array(Math.round(Math.random() * 4+1))].map((_, index) => (
          <div className='picHolder'> <img src={userPic} alt="userPic" className='fit rounded-full w-20 h-20' /></div>
        ))}
      </div>
      <div className='flex flex-col gap-1 w-1/2 items-center '>
        <h6>colab NAMr</h6>
        <h4>Colab description {keyv}</h4>

      </div>
    </div>
  )
}
const Colabration = () => {
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className='colMain'>
            <div className='colLeft  '>
              <div className='colLeftTop min-h-10 rounded trdcard bg-white backdrop-blur-sm flex flex-col items-center'>
              <h2 className='text-2xl text-gray-600 '>your colabration</h2>
              </div>
              <div className='colLeftMid trdcard  min-h-10 rounded bg-white backdrop-blur-sm'></div>
              <div className='colLeftBottom trdcard  backdrop-blur-sm '>
                {/* <h2 className='text-2xl text-gray-600 '>your colabration</h2> */}
                {[...Array(2)].map((_, index) => (
                  <ColabCard keyv={index} />
                ))}
              </div>
            </div>
            <div className='colRight '>
              <div className='colRightTop card trdcard h-100 '>
              <h2 className='text-2xl text-gray-600 flex flex-col items-center'>Suggextions</h2>
              <Suggestions />
              </div>
              <div className='colRightBottom trdcard h-100 '>
              <h2 className='text-2xl text-gray-600 flex flex-col items-center '>few more </h2>
              <Suggestions />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Colabration