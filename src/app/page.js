'use client'
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import buttons from '@/app/styles/Buttons.module.css';
import Upgrade from './components/Upgrade';




export default function Home() {
  // Initialize count from localStorage, ensure it's a number, fallback to 0 if invalid
  const [count, setCount] = useState(() => {
    const savedCount = localStorage.getItem('count');
    // Make sure savedCount is a number, or fallback to 0
    return savedCount && !isNaN(Number(savedCount)) ? Number(savedCount) : 0;
  });

  const [isScaled, setIsScaled] = useState(false);
  // Initialize count from localStorage, ensure it's a number, fallback to 0 if invalid
  const [cps, setCps] = useState(() => {
    const savedCps = localStorage.getItem('cps');
    // Make sure savedCount is a number, or fallback to 0
    return savedCps && !isNaN(Number(savedCps)) ? Number(savedCps) : 0;
  });
  // Load saved count and cps from localStorage on component mount
  useEffect(() => {
    const savedCount = localStorage.getItem('count');
    const savedCps = localStorage.getItem('cps');

    // Ensure savedCount and savedCps are valid numbers, fallback to 0 if not
    if (savedCount !== null && !isNaN(Number(savedCount))) {
      setCount(Number(savedCount));
    }

    if (savedCps !== null && !isNaN(Number(savedCps))) {
      setCps(Number(savedCps));
    }
  }, []); // Empty dependency array to run only once on mount

  // Handle image click and toggle scale
  const handleImageClick = () => {
    setIsScaled(true);
    // Set a timeout to reset the scale after 100ms
    setTimeout(() => {
      setIsScaled(false);
    }, 100);
  };

  // Save count and cps to localStorage when they change
  useEffect(() => {
    localStorage.setItem('count', count);
    localStorage.setItem('cps', cps);
  }, [count, cps]);

  return (
    <>
      <Upgrade count={count} setCount={setCount} cps={cps} setCps={setCps} className='upgradesContainer'/>

      <main className='mainContainer'>
        <h1>Cookies: {count}</h1>
        <h2>Your Cookies per second is: {cps}</h2>
        
        {/* Button to add cookies */}
        <button onClick={() => setCount(count + 10000)} className={buttons.cookie}>
          <Image
            src='/images/cookie.jpg'
            alt="Image of a cookie"
            width={200}
            height={200}
            className={isScaled ? buttons.cookieScaled : ""}
            onClick={handleImageClick} // Trigger scale effect on click
          />
        </button>

        {/* Upgrade component to handle cookie upgrades */}
      </main>
    </>
    );
}
