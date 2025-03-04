import React from 'react';
import './democard.module.css';
const DemoCard = () => {
  return (
    <>
      <div className="card-container">
        <a href="/" className="hero-image-container">
          <img
            className="hero-image"
            src="https://i.postimg.cc/NfR2yhNs/image-equilibrium.jpg"
            alt="Spinning glass cube"
          />
        </a>
        <main className="main-content">
          <h1>
            <a href="#">Equilibrium #3429</a>
          </h1>
          <p>Our Equilibrium collection promotes balance and calm.</p>
          <div className="flex-row">
            <div className="coin-base">
              <img
                src="https://i.postimg.cc/T1F1K0bW/Ethereum.png"
                alt="Ethereum"
                className="small-image"
              />
              <h2>0.041 ETH</h2>
            </div>
            <div className="time-left">
              <img
                src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png"
                alt="clock"
                className="small-image"
              />
              <p>3 days left</p>
            </div>
          </div>
        </main>
        <div className="card-attribute">
          <img
            src="https://i.postimg.cc/SQBzNQf1/image-avatar.png"
            alt="avatar"
            className="small-avatar"
          />
          <p>
            Creation of <span><a href="#">Jules Wyvern</a></span>
          </p>
        </div>
      </div>
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel="noreferrer">Frontend Mentor</a>.
        Coded by <a href="#">Lauro235</a>.
      </div>
    </>
  );
};

export default DemoCard;
