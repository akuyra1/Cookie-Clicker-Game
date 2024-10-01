'use client';
import React, { useContext, useEffect, useState } from 'react';
import containerStyles from '@/app/styles/Sections.module.css';
import HoverButton from './Button';
import UserContext from '../contexts/GameContext';

export default function Upgrade({ count, setCount, cps, setCps }) {
  const { autoClickers, setAutoClickers } = useContext(UserContext); // Access autoClickers from context
  const [upgrades, setUpgrades] = useState([]); // State to hold the fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

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
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        setError(error); // Set error if there's a problem
        setLoading(false); // Set loading to false
      });
  }, []); // Empty dependency array ensures this runs once when the component mounts

  // Handle loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Handle error state
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Function that deals with the purchases of the upgrades and cps.
  const handlePurchase = (upgrade) => {
    if (count >= upgrade.cost) {
      setCount((prevCount) => prevCount - upgrade.cost);
      setAutoClickers((prevAutoClickers) => ({
        ...prevAutoClickers,
        [upgrade.id]: (prevAutoClickers[upgrade.id] || 0) + 1,
      }));
      setCps((prevCps) => prevCps + upgrade.increase);
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
            <p className={containerStyles.upgradeCost}>
              Cost: <span className={containerStyles.upgradeNumbers}>{upgrade.cost}</span>
            </p>
            <p className={containerStyles.upgradeCps}>
              Cps + <span className={containerStyles.upgradeNumbers}>{upgrade.increase} cps</span>
            </p>
            <h2 className={containerStyles.upgradeQty}>
              Qty Owned: <span className={containerStyles.upgradeNumbers}>{autoClickers[upgrade.id] || 0}</span>
            </h2>
            <HoverButton
              text="Buy"
              onClick={() => handlePurchase(upgrade)}
              className={containerStyles.buyButton}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
