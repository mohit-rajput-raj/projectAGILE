import React, { useState } from 'react';
import './conn.css';
import black from './black.tree.jpg';
import {ProfileComponent} from '../components/profileCard';
const Connections = () => {
  const [overlay , setOverlay] =useState(false);
  const handelOver=()=>{
    setOverlay(!overlay);
  }
  return (
    <div className='dashCon'>
      <div className='dashConItem'>
        <div className='item1'>

        <div className='ConnMain'>
        <main className='flex justify-center items-center w-screen main'>
          <div className='ConnBox'>
            <h5 className='ConnHead'>More suggestions for you</h5>
            <ul className='ConnUl'>
              <li className='lis'>
                <a className='active' href="#home">People</a>
              </li>
              <li className='lis'>
                <a className='active' href="#profile">Groups</a>
              </li>
              <li className='lis'>
                <a className='active' href="#contact">Pages</a>
              </li>
              <li className='lis'>
                <a className='active' href="#type">Hashtags</a>
              </li>
            </ul>

            <div className='CardsWrap  '>
              {[...Array(15)].map((_, index) => (
                <div key={index} className='ConnCard  '>
                  <ProfileComponent />
                  <hr />
                  <div className='flex justify-center items-center'>
                    <div className='flex justify-center items-center mutual'>
                      {[...Array(4)].map((_, i) => (
                        <img  key={i} src="./black.tree.jpg" alt="" className='bg-white mutualImg'/>
                      ))}
                    </div>
                    <span>4 mutual connections</span>
                  </div>
                  <hr />
                  <div className='flex justify-evenly '>
                    <button className='ConnectBg ' >Connect</button>
                    <button className='ConnectBg'>Follow</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <aside className='aside'>
          <div className='asideBox'>
            <h6 className='h-12 flex justify-center items-center'>Manage my network</h6>
            <ul>
              {["Connections", "Contacts", "People I Follow", "Groups", "Pages", "Hashtags"].map((item, index) => (
                <div key={index}>
                <li className='asideUlLI'>
                  <span className='h-6 flex   items-center w-1/2'>{item}</span>
                  <span className='flex justify-center items-center w-1/3 '>{Math.floor(Math.random() * 100)}</span>
                </li>
                <hr className='HR' />
                </div>
              ))}
            </ul>
          </div>
          <div className='career'>
            <div className='imgBox'>
              <div className='pfps'>
              <img src={black} alt="" className='pfpsImg' />
              <img src={black} alt="" className='pfpsImg' />
              </div>
            </div>
            <h6 className='flex items-center justify-center careerText'>Grow your career by following Askbootstrap</h6>
            <p className='flex items-center justify-center'>Stay up-to-date with industry trends!</p>
            <hr />
            <div className='flex justify-center items-center'>
            <button className='ConnectBg' onClick={handelOver}>FOLLOW</button>
            </div>
          </div>
        </aside>
        </div>
        </div>
      </div>
      
    </div>
  );
};
export default Connections;
