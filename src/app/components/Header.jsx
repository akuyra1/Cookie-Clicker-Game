import React from 'react'
import headerContainerStyles from '@/app/styles/Header.module.css'

export default function Header() {

  return (
    <>
      <div className={headerContainerStyles.navContainer}>
        <div className={headerContainerStyles.navItemsContainer}>
          <button className={headerContainerStyles.gameName}>
            <a href='/'>Crumb Raider <span className={headerContainerStyles.headerSpan}>:</span> Cookie Edition</a>
          </button>
          <ul className={headerContainerStyles.navItemsList}>
            <li className={headerContainerStyles.navItems}><a href='/'>Stats</a></li>
            <li className={headerContainerStyles.navItems}><a href='/'>Game Info</a></li>
            <li className={headerContainerStyles.navItems}><a href='/'>About</a></li>
          </ul>
        </div>
      </div>
    </>
  )
}
