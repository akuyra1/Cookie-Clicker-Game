'use client';
import React, { createContext, useState, useEffect, useRef } from 'react';

// Create context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [count, setCount] = useState(null); // Initially set to null
  const [cps, setCps] = useState(null); // Initially set to null
  const [autoClickers, setAutoClickers] = useState(null); // Initially set to null
  const [hydrated, setHydrated] = useState(false); // Track if the component is hydrated

  // On component mount (client-side), initialize from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('count');
      const savedCps = localStorage.getItem('cps');
      const savedAutoClickers = localStorage.getItem('autoClickers');
      
      setCount(savedCount && !isNaN(Number(savedCount)) ? Number(savedCount) : 0);
      setCps(savedCps && !isNaN(Number(savedCps)) ? Number(savedCps) : 0);
      setAutoClickers(savedAutoClickers ? JSON.parse(savedAutoClickers) : {});
      setHydrated(true); // Mark as hydrated once the client has loaded the data
    }
  }, []);

  // Save count, cps, and autoClickers to localStorage when they change
  useEffect(() => {
    if (hydrated) { // Ensure this runs only after the component is hydrated
      localStorage.setItem('count', count.toFixed(1));
      localStorage.setItem('cps', cps.toFixed(1));
      localStorage.setItem('autoClickers', JSON.stringify(autoClickers));
    }
  }, [count, cps, autoClickers, hydrated]);

  const intervalRef = useRef(null);

  // Effect to handle incrementing based on cps
  useEffect(() => {
    // Clear any existing interval
    clearInterval(intervalRef.current);
  
    if (cps > 0) {
      const intervalTime = 50; // Update every 50ms (20 times per second)
      const incrementPerInterval = cps / (1000 / intervalTime); // Increment for each interval
  
      intervalRef.current = setInterval(() => {
        setCount((prevCount) => {
          const newCount = prevCount + incrementPerInterval;
          return parseFloat(newCount.toFixed(1)); // Round to 1 decimal place
        });
      }, intervalTime);
    }
  
    // Clean up the interval when cps changes or component unmounts
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [cps, setCount]);
  
  

  // Reset game function
  const resetGame = () => {
    const confirmed = window.confirm('Are you sure you want to reset the game? This action cannot be undone.');
    if (confirmed) {
      // Reset state values
      setCount(0);
      setCps(0);
      setAutoClickers({}); // Reset autoClickers

      // Clear localStorage values
      if (typeof window !== 'undefined') {
        localStorage.removeItem('count');
        localStorage.removeItem('cps');
        localStorage.removeItem('autoClickers');
      }
    }
  };

  // If the app is not hydrated yet, return nothing or a loading indicator
  if (!hydrated) {
    return null; // Alternatively, return a loading spinner or placeholder
  }

  return (
    <UserContext.Provider value={{ count, setCount, cps, setCps, autoClickers, setAutoClickers, resetGame }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
