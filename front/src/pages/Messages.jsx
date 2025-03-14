import React, { useEffect } from 'react';
import '../coustomStyles/container.css';
import '../coustomStyles/messages.css';
import { ProfileComponentMessage, ProfileComponentMessageHeader } from '../components/profileCard';
import { FaPhone } from 'react-icons/fa';
import { useMessagesStore } from '../Store/messagesStore.js';
import SnapchatThread from '../skeletons/ProfileCardSkeleton.jsx';

const Messages = () => {
  const { getSideBarUsers, sideBarUsers, sideBarUsersLoding, error } = useMessagesStore();
  // console.log(sideBarUsers);
  
  useEffect(() => {
    getSideBarUsers();
  }, [getSideBarUsers]);

  if (error) {
    return <div>Error loading sidebar users.</div>;
  }

  return (
    <div className='dashCon'>
      <div className='dashConItem'>
        <div className='item1'>
          <main className='mBox'>
            <div className='mLeft'>
              <div className='mll flex flex-col gap-2'>
                <div className='mllHead'>
                  <h1>Profiles</h1>
                </div>
                <div className='mllBase'>
                  {sideBarUsersLoding ? (
                    [...Array(5)].map((_, i) => (
                      <div className='p-0' key={i}>
                        <button className='proBtn focus:ring-0'>
                          <SnapchatThread />
                        </button>
                      </div>
                    ))
                  ) : (
                    sideBarUsers? sideBarUsers.map((sideUser, i) => (
                      <div className='p-0' key={i}>
                        <button className='proBtn focus:ring-0'>
                          <ProfileComponentMessage sideUser={sideUser} />
                        </button>
                      </div>
                    )):(<div className='w-full h-2/3 center'> No chats yet</div>)
                  )}
                </div>
              </div>
              <div className='mlr flex flex-col gap-2'>
                <div className='mlrHead flex justify-between items-center'>
                  <ProfileComponentMessageHeader />
                  <FaPhone className='h-6 w-6' />
                </div>
                <div className='mlrBase'>
                  {[...Array(40)].map((_, i) => (
                    <div className='' key={i}>
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda ex unde dicta.</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='mRight'></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Messages;
