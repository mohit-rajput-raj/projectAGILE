import React, { useState, useEffect, useCallback } from 'react'
import '../coustomStyles/profile.css';
import '../coustomStyles/container.css'
import banner from '../coustomStyles/images/banner.jpg'
import banner2 from '../coustomStyles/images/banner2.jpg'
import banner3 from '../coustomStyles/images/banner3.jpg'
// import banner4 from '../coustomStyles/banner4.jpg'
import black from './black.tree.jpg'
import { MdOutlineModeEdit } from "react-icons/md";
import Suggestions from './Suggestions';
import '../coustomStyles/person.css';
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineVerified } from "react-icons/md";
const Profile = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [banner, banner2, banner3, banner2];
  const images = banners;
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // useEffect(() => {
  //   const interval = setInterval(nextSlide, 3000); // Auto slide every 3 seconds
  //   return () => clearInterval(interval);
  // }, [nextSlide]);

  return (
    <div className='dashCon'>
      <div className='dashConItem'>
        <div className='item1'>
          <main className='pMain'>
            <div className='pLeft'>
              <div className='banner'>

                <button className='banner-arrow left' onClick={prevSlide}>{`<`}</button>
                <div 
                  className='banner-container' 
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {images.map((img, i) => (
                    <div key={i} className='banner-slide'>
                      <img src={img} alt={`Slide ${i + 1}`} className='object-cover' style={{ width: '100%', height: '100%' }} />
                    </div>
                  ))}
                </div>
                <button className='banner-arrow right' onClick={nextSlide}>{`>`}</button>
                <div className='banner-dots'>
                  {images.map((_, i) => (
                    <div
                      key={i}
                      className={`banner-dot ${i === currentSlide ? 'active' : ''}`}
                      onClick={() => goToSlide(i)}
                    />
                  ))}
                </div>
              </div>
              
              <div className='pInfo'>
                <div className='pPicHolder'>
                  <div className='pPic'>
                    <img src={black} alt="" className='fit' />
                  </div>
                </div>
                <div className='profile-header'>
                  <div className='profile-nameHolder'>
                    <h1 className='profile-name'><h1 className='profile-name center gap-3'><MdOutlineVerified className='color-blue'/>Kunal jhonsons</h1>
                    <div className='stat-item'>
                      <span>verified</span>
                    </div>
                    <div className='stat-item'>
                      <Link to={'/completep'} className='logoutb'>complete profile</Link>
                    </div>
                    </h1>
                    <button className='editButton ' onClick={()=>navigate('/editProfile')}>
                    <MdOutlineModeEdit className='editIcon'/>

                    </button>

                  </div>
                  <div className='profile-title'>Fields</div>
                  <div className='profile-title'>Email</div>
                  <div className='profile-location'>
                    <span>Indore, Madhya Pradesh, India</span>
                    <div className='stat-item'>
                    <span>CONTACTS INFO</span>
                  </div>
                  </div>
                  <div className='profile-stats'>
                  <h1>Companies</h1>
                </div>
                </div>

                <div className='profile-stats'>
                  <div className='stat-item'>
                    <span>113 connections</span>
                  </div>
                  {/* <div className='stat-item'>
                    <span>Alumni Student Club SGSITS Indore</span>
                  </div> */}
                  <div className='stat-item'>
                    <span>1123 Folowers</span>
                  </div>
                  <div className='stat-item'>
                    <span>13 Followring</span>
                  </div>
                  <div className='stat-item'>
                    <span>Colobrations</span>
                  </div>
                  <div className='stat-item'>
                    <span>accounts</span>
                  </div>
                </div>
                

                <div className='profile-buttons'>
                  <button className='profile-btn btn-primary'>Connect</button>
                  <button className='profile-btn btn-secondary'>Follow</button>
                  <button className='profile-btn btn-secondary'>Message</button>
                  <button className='profile-btn btn-secondary'>More</button>
                </div>
              </div>
              <div className='pLBase'>
                  <h1>Achivements</h1>
              </div>
              <div className='pLBase'>
                <div className='analytics-header'>
                  <h2 className='analytics-title'>Analytics</h2>
                  <div className='analytics-private'>
                    <span>Private to you</span>
                  </div>
                </div>
                <div className='analytics-grid'>
                  <div className='analytics-item'>
                    <div className='analytics-value'>30</div>
                    <div className='analytics-label'>
                      Discover who's viewed your profile
                    </div>
                    <div className='analytics-period'>profile views</div>
                  </div>
                  <div className='analytics-item'>
                    <div className='analytics-value'>19</div>
                    <div className='analytics-label'>
                      Check out who's engaging with your posts
                    </div>
                    <div className='analytics-period'>Past 7 days</div>
                  </div>
                  <div className='analytics-item'>
                    <div className='analytics-value'>7</div>
                    <div className='analytics-label'>
                      See how often you appear in search results
                    </div>
                    <div className='analytics-period'>search appearances</div>
                  </div>
                </div>
                <div className='show-all-analytics' onClick={()=>navigate('/dashboard')}>
                  Show all analytics →
                </div>
              </div>
              
              <div className='pLBase'>

              </div>
              <div className='pLBase'>

              </div>
              <div className='pLBase'>

              </div>
              <div className='pLBase'>

              </div>
            </div>
            <div className='pRight flex flex-col items-center '>
              
                <div className='pRightTop flex flex-col items-center'>
                  <h6 className='' style={{marginTop:'10px'}}>My Top Colabroation</h6>
                  <Suggestions />
                </div>
                <div className='pRightTop flex flex-col items-center'>
                  <h6 className='' style={{marginTop:'10px'}}>My Top Makers</h6>
                  <Suggestions />
                </div>
                <div className='pRightTop flex flex-col items-center'>
                  <h6 className='' style={{marginTop:'10px'}}>My Top Orders</h6>
                  <Suggestions />
                </div>
                
              
              
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;