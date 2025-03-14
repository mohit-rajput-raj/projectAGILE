import React from 'react'
import '../coustomStyles/contacts.css'
import { userPic } from '../components/profileCard'
export const ContactCard =({keys})=>{
  return(
    <div className='cntCard flex  '>
      <div className='w-1/6 '>
        <div className='object-cover fit rounded-full w-10 h-10 overflow-hidden'>
          <img src={userPic} alt="" />
        </div>
      </div>
      <div className='cntCardChild'>
        <span>Name</span>
      </div>
      <div className='cntCardChild'>
        position
      </div>
      <div className='cntCardChild'>
        820384084284
      </div>
      <div className='cntCardChild'>
        email@gmail.com   {keys}
      </div>
    </div>
  )
}
const Contacts = () => {
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className='cntMain flex flex-col '>
            <div className=' ctMainTop rounded-2xl  trdcard  center'>
              Contacts
            </div>
            <div className='trdcard ctMainBottom  '>
              {[...Array(20)].map((_, index) => (
                <div className='min-h-13'>
                  <ContactCard keys={index}/>
                  <hr />
                </div>
                
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Contacts