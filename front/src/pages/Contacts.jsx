import React, { useEffect } from 'react'
import '../coustomStyles/contacts.css'
import { userPic } from '../components/profileCard'
import { useHomeStore } from '../Store/homeStore'
export const ContactCard =({keys,contact})=>{
  if(!contact)return;
  return(
    <div className='cntCard flex   '>
      <div className='w-1/6 '>
        <div className='object-cover fit rounded-full w-10 h-10 overflow-hidden'>
          <img src={contact.profile.pic ||userPic} alt="" />
        </div>
      </div>
      <div className='cntCardChild'>
        <span></span>
      </div>
      <div className='cntCardChild'>
        {contact.profile.role}
      </div>
      <div className='cntCardChild'>
        {contact.phone}
      </div>
      <div className='cntCardChild'>
        {contact.email}
      </div>
      <div>
        <button className='rounded-3xl deleteBtn'>remove</button>
      </div>
      
    </div>
  )
}
const Contacts = () => {
  const {getContacts,allContacts} = useHomeStore();
  useEffect(()=>{
    getContacts();
  },[getContacts])
  return (
    <div className="dashCon">
      <div className="dashCon">
        <div className="item1">
          <main className='cntMain flex flex-col '>
            <div className=' ctMainTop rounded-2xl  trdcard  center'>
              Contacts
            </div>
            <div className='trdcard ctMainBottom  '>
              {allContacts?.map((contact, index) => (
                <div className='min-h-13 overflow-x-scroll min-w-max'>
                  <ContactCard keys={index} contact={contact}/>
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