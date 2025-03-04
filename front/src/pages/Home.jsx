import React from 'react';
import '../coustomStyles/home.css';
import  '../coustomStyles/compo.css';
import {ProfileComponent} from '../components/profileCard';
import { useNavigate} from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate();
  const jobItems = [
    {
      title: 'UI/UX designer',
      company: 'Envato',
      location: 'India, Punjab',
      connections: 18,
      image: 'img/l1.png',
      profiles: ['img/p1.png', 'img/p2.png', 'img/p3.png', 'img/p4.png', 'img/p5.png'],
    },
    {
      title: '.NET Developer',
      company: 'Invision',
      location: 'London, UK',
      connections: 18,
      image: 'img/l4.png',
      profiles: ['img/p13.png', 'img/p1.png', 'img/p2.png', 'img/p3.png'],
    },
    {
      title: 'Channel Sales Director',
      company: 'Slack Inc.',
      location: 'London, UK',
      connections: 18,
      image: 'img/l7.png',
      profiles: ['img/p12.png', 'img/p13.png', 'img/p2.png'],
    },
  ];

  const peopleList = [
    { name: 'Sophia Lee', title: 'Student at Harvard', image: 'img/p8.png' },
    { name: 'John Doe', title: 'Traveler', image: 'img/p9.png' },
    { name: 'Julia Cox', title: 'Art Designer', image: 'img/p10.png' },
    { name: 'Robert Cook', title: 'Photographer at Photography', image: 'img/p11.png' },
    { name: 'Richard Bell', title: 'Graphic Designer at Envato', image: 'img/p12.png' },
  ];

  return (
    <div className='dashCon'>
      <div className='dashConItem'>
        <div className='item1'>
          <div className='item1Con CosCard min-h-screen w-screen'>
            <aside className='dashAside1 CosCard'>
              <div className='suggestedBar'>
                <h6 className='text-3xl'>suggested shops</h6>
              </div>
              <div className='suggestedPf'>
                {[...Array(4)].map((_, i) => (
                  <div key={i} className='p-2 hover:bg-blue-100 cursor-pointer hover:text-black' onClick={()=>navigate ('/profile')}>
                     <ProfileComponent/>
                     <hr />
                  </div>
                ))}
              </div>
              
              
             
            </aside>
            <main className='dashMain CosCard w-full'>
              
                
             
            </main>
            
            <aside className='dashAside2 CosCard'>
              <div>
                <div className='cursor-pointer' onClick={()=>navigate ('/connections')}>
                  <h6 className='dashRec' >People you might know</h6>
                </div>
                <div>
                  {peopleList.map((person, index) => (
                    <div key={index} className='p-2 text-gray-600 hover:bg-blue-100 cursor-pointer hover:text-black  ' onClick={()=>navigate ('/profile')}>
                    <ProfileComponent/>
                    <hr />
                 </div>
                  ))}
                </div>
              </div>
              
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
