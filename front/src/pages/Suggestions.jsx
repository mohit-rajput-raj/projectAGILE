import React from 'react';
import { FaBirthdayCake } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillStar } from "react-icons/ai";
import '../coustomStyles/person.css';

const BakerCard = ({ name, specialty, rating, location }) => {
  return (
    <div className='baker-card'>
      <div className='baker-avatar'>
        <FaBirthdayCake />
      </div>
      <div className='baker-info'>
        <div className='baker-name'>{name}</div>
        <div className='baker-details'>
          <span>{specialty}</span>
          <span>•</span>
          <div className='baker-rating'>
            <span>{rating}</span>
            <AiFillStar className='rating-star' />
          </div>
        </div>
        <div className='baker-location'>
          <IoLocationOutline className='location-icon' />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

const Suggestions = () => {
  const bakers = [
    {
      name: 'Sarah Johnson',
      specialty: 'Custom Cakes',
      rating: '4.8',
      location: 'Downtown'
    },
    {
      name: 'Mike Brown',
      specialty: 'Pastries & Cookies',
      rating: '4.5',
      location: 'Westside'
    },
    {
      name: 'Emma Davis',
      specialty: 'Wedding Cakes',
      rating: '4.9',
      location: 'Uptown'
    }
  ];

  return (
    <div className='baker-container'>
      {bakers.map((baker, index) => (
        <BakerCard
          key={index}
          name={baker.name}
          specialty={baker.specialty}
          rating={baker.rating}
          location={baker.location}
        />
      ))}
    </div>
  );
};

export default Suggestions;