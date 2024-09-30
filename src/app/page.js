'use client'
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import buttons from '@/app/styles/Buttons.module.css';
import Upgrade from './components/Upgrade';
import HoverButton from './components/Button';
import counterStyles from '@/app/styles/Sections.module.css'



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


  // Reference to the interval to allow for cleanup when necessary
  const intervalRef = useRef(null);

  // Effect to handle smooth incrementing
  useEffect(() => {
    // Function to smoothly increment count every 100ms
    const incrementPerInterval = (cps / 10); // Increment by cps/10 every 100ms to get smooth increments over 1 second

    intervalRef.current = setInterval(() => {
      setCount(prevCount => prevCount + incrementPerInterval);
    }, 100); // Run the interval every 100ms (0.1 seconds)

    return () => clearInterval(intervalRef.current); // Clear the interval when component unmounts
    }, [cps]);

  // Helper function to format numbers
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'; // Billions
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // Millions
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'; // Thousands
    } else {
      return num.toString(); // Less than 1000, show as is
    }
  };


    return (
    <>
      <Upgrade count={count} setCount={setCount} cps={cps} setCps={setCps} className='upgradesContainer'/>
      {/* <HoverButton/> */}
      <main className={counterStyles.mainContainer}>
        <h1 className={counterStyles.counterTitle}>Cookies: <span className={counterStyles.counterSpan}>{formatNumber(count)}</span></h1>
        <h2 className={counterStyles.counterCps}>Your Cookies per second is: <span className={counterStyles.counterSpan}>{formatNumber(cps)}</span></h2>
        
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

      </main>
    </>
    );
}
