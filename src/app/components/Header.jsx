'use client';
import React, { useContext } from 'react';
import headerContainerStyles from '@/app/styles/Header.module.css';
import HoverButton from './Button';
import buttonStyles from '@/app/styles/Buttons.module.css';
import UserContext from '../contexts/GameContext';

export default function Header() {
  const { resetGame } = useContext(UserContext); // Access context

  return (
    <div className={headerContainerStyles.navContainer}>
      <div className={headerContainerStyles.navItemsContainer}>
        <button className={headerContainerStyles.gameName}>
          <a href='/'>Crumb Raider <span className={headerContainerStyles.headerSpan}>:</span> Cookie Edition</a>
        </button>
        <ul className={headerContainerStyles.navItemsList}>
          <li className={headerContainerStyles.navItems}><a href='/'>Stats</a></li>
          <li className={headerContainerStyles.navItems}><a href='/'>Game Info</a></li>
          <li className={headerContainerStyles.navItems}><a href='/'>About</a></li>
          <HoverButton onClick={resetGame} className={buttonStyles.resetButton} text='Reset Game' />
        </ul>
      </div>
    </div>
  );
}
