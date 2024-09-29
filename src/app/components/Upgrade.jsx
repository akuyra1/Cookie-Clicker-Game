'use client'
import React, { useState, useEffect } from 'react';
import containerStyles from '@/app/styles/Sections.module.css';


export default function Upgrade({count, setCount, cps, setCps}) {
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
      <h1 className={containerStyles.upgradesTitle}>Cookie Upgrades</h1>
      <ul className={containerStyles.upgrades}>
        {upgrades.map((upgrade) => (
          <li key={upgrade.id} className={containerStyles.upgradeList}>
            <h2>{upgrade.name}</h2>
            <p>Cost: {upgrade.cost}</p>
            <p>Cps + {upgrade.increase} cps</p>
            <h2>Qty Owned: {autoClickers[upgrade.id] || 0}</h2>
            <button onClick={() => handlePurchase(upgrade)}>Buy</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
