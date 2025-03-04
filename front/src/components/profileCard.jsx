import React, { useState } from 'react'
import './profileCard.css'
import black from './black.tree.jpg'
import gian from './gian.jpg'

// import '../coustomStyles/profile.css'
const ProfileComponent = () => {
  return (
    

    
    <div className='flex justify-center items-center gap-6 pCard cursor-pointer '>
      <div className='cardPic'>
        <img src={black} alt="User" />
      </div>
      <div className='flex flex-col justify-end'>
          <h5 className='username'>User Name</h5>
          <h3 className='profession'>Position</h3>
      </div>              
    </div>
  )
}
const ProfileComponentMessage = () => {
  const [isonline , setonline] = useState(true);

  return (
    
    <div className='flex justify-center items-center gap-6 pCard'>
      <div className='cardPic'>
        <img src={gian} alt="User" />
        {isonline && (<div className='w-4 h-4 dot absolute'></div> )}
        
      </div>
      <div className='flex flex-col justify-end'>
          <h5 className='username'>User Name</h5>
          <h3 className='profession'>Position</h3>
          {isonline && (<h3 className='profession'>online</h3>)}

      </div>              
    </div>
  )
}
const ProfileComponentMessageHeader = () => {
  const [isonline , setonline] = useState(true);

  return (
    
    <div className='flex justify-center items-center gap-6 pCard'>
      <div className='cardPic'>
        <img src={black} alt="User" />
        
        
      </div>
      <div className='flex flex-col justify-end'>
          <h5 className='username'>User Name</h5>
          
          

      </div>              
    </div>
  )
}

export { ProfileComponent,ProfileComponentMessage, ProfileComponentMessageHeader };