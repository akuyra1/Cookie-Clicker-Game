'use client'
import React, { useState, useEffect } from 'react';
import containerStyles from '@/app/styles/Sections.module.css';
import HoverButton from './Button';

export default function Upgrade({count, setCount, cps, setCps, text}) {
  const [upgrades, setUpgrades] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  const [autoClickers, setAutoClickers] = useState(() => {
    const savedAutoClickers = localStorage.getItem('autoClickers');
    return savedAutoClickers ? JSON.parse(savedAutoClickers) : {};
  });
   
  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetch('https://cookie-upgrade-api.vercel.app/api/upgrades')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON from the response
      })
      .then((data) => {
        setUpgrades(data); // Update the state with the fetched data
        // console.log(data)
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error); // Set error if there's a problem
        setLoading(false); // Set loading to false
      });

  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('count', count);
    localStorage.setItem('cps', cps);
  }, [count, cps]);

  useEffect(() => {
    localStorage.setItem('autoClickers', JSON.stringify(autoClickers));
  }, [autoClickers]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount + cps);
    }, 1000);

    return () => clearInterval(interval);
  }, [cps, setCount]);


  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }
  
  // Handle error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

    // Function that deals with the purchases of the upgrades and cps.
    const handlePurchase = (upgrades) => {
    if (count >= upgrades.cost) {
      setCount(count - upgrades.cost);
      setAutoClickers((prevAutoClickers) => ({
        ...prevAutoClickers,
        [upgrades.id] : (prevAutoClickers[upgrades.id] || 0) + 1,
      }));
      setCps((cps) + upgrades.increase) 
     } else {
      alert('Not enough cookies to purchase this upgrade!');
    }
  };



  return (
    <div className={containerStyles.containers}>      
      <ul className={containerStyles.upgrades}>
      <h1 className={containerStyles.upgradesTitle}>Cookie Manufacturers</h1>
        {upgrades.map((upgrade) => (
          <li key={upgrade.id} className={containerStyles.upgradeList}>
            <h2 className={containerStyles.upgradeName}>{upgrade.name}</h2>
            <p className={containerStyles.upgradeCost}>Cost: <span className={containerStyles.upgradeNumbers}>{upgrade.cost}</span></p>
            <p className={containerStyles.upgradeCps}>Cps + <span className={containerStyles.upgradeNumbers}>{upgrade.increase} cps</span></p>
            <h2 className={containerStyles.upgradeQty}>Qty Owned: <span className={containerStyles.upgradeNumbers}>{autoClickers[upgrade.id] || 0}</span></h2>
            <HoverButton text="Buy" onClick={() => handlePurchase(upgrade)} className={containerStyles.buyButton}/>
          </li>
        ))}
      </ul>
    </div>
  );
}
