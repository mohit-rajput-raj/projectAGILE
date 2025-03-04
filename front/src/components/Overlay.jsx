import React from 'react'
import './overlay.css';
const Overlay = () => {
  return (
    <div className='w-screen  testBack '>
            <div className='testCard'>
              <button className='ConnectBg' onClick={handelOver}> close</button>
            </div>
    </div>
  )
}

export default Overlay