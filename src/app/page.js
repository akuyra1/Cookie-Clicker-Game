'use client'
import React, { useState, useEffect, useContext, useMemo, useCallback } from 'react';
import Image from 'next/image';
import buttons from '@/app/styles/Buttons.module.css';
import Upgrade from './components/Upgrade';
import counterStyles from '@/app/styles/Sections.module.css';
import GameContext from './contexts/GameContext'; // Consistent naming

// Helper function to format numbers
const formatNumber = (num) => {
  if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'; // Billions
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'; // Millions
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'; // Thousands
  return num.toString(); // Less than 1000, show as is
};

export default function Home() {
  const { count, setCount, cps, setCps, resetGame } = useContext(GameContext);
  const [isScaled, setIsScaled] = useState(false);

  // Memoized formatted count and cps
  const formattedCount = useMemo(() => formatNumber(count), [count]);
  const formattedCps = useMemo(() => formatNumber(cps), [cps]);

  // Click handler to increment count
  const incrementCount = useCallback(() => {
    setCount(prev => prev + 10);
  }, [setCount]);

  // Image click handler
  const handleImageClick = () => {
    setIsScaled(true);
    setTimeout(() => setIsScaled(false), 100); // Optional, CSS transition could be better
  };

  return (
    <main className={counterStyles.mainContainer}>
      <Upgrade count={count} setCount={setCount} cps={cps} setCps={setCps} className='upgradesContainer' />

      <h1 className={counterStyles.counterTitle}>
        Cookies <br></br><span className={counterStyles.counterSpan}>{formattedCount}</span>
      </h1>
      <h2 className={counterStyles.counterCps}>
        Your Cookies per second is: <span className={counterStyles.counterSpan}>{formattedCps}</span>
      </h2>

      <button onClick={incrementCount} className={buttons.cookie}>
        <Image
          src='/images/cookie.jpg'
          alt="Image of a cookie"
          width={200}
          height={200}
          className={isScaled ? buttons.cookieScaled : ""}
          onClick={handleImageClick}
        />
      </button>

      {/* <button onClick={resetGame} className={buttons.resetButton}>Reset Game</button> */}
    </main>
  );
}
