import React from 'react'
import '@/app/styles/statsPage.css'


export default function page() {
  return (
    <div className='container'>
      <header>
        <h1>Game Stats</h1>
      </header>

      <section>
        <h2>Progress Overview</h2>
        <p><strong>Total Cookies Baked:</strong> 1,000,000</p>
        <p><strong>Cookies Per Second (CPS):</strong> 250 CPS</p>
        <p><strong>Total Manual Clicks:</strong> 5,200</p>
        <p><strong>Highest CPS Achieved:</strong> 500 CPS</p>
      </section>

      <section>
        <h2>Upgrades & Automation</h2>
        <p><strong>Upgrades Purchased:</strong> 12</p>
        <p><strong>Total Auto Bakers:</strong> 15</p>
        <p><strong>Cookies Baked Per Hand Click:</strong> 5</p>
      </section>

      <section>
        <h2>Milestones Reached</h2>
        <ul>
          <li>10,000 cookies</li>
          <li>100,000 cookies</li>
          <li>1,000,000 cookies</li>
        </ul>
        <div>
          <p><strong>Next Milestone:</strong> 5,000,000 cookies</p>
          <progress value="1000000" max="5000000"></progress>
        </div>
      </section>

      <section>
        <h2>Achievements</h2>
        <p><strong>Achievements Unlocked:</strong> 5 / 20</p>
        <ul>
          <li>First Click: Unlock at 1 manual click</li>
          <li>Cookie Master: Unlock at 1,000,000 cookies baked</li>
          {/* Add more as necessary */}
        </ul>
      </section>

      <section>
        <h2>Special Stats</h2>
        <p><strong>Golden Cookies Clicked:</strong> 3</p>
        <p><strong>Total Cookies Spent:</strong> 750,000</p>
        <p><strong>Total Time Played:</strong> 3 hours, 25 minutes</p>
      </section>

      <footer>
        <p>Keep baking to unlock more stats and achievements!</p>
      </footer>
    </div>
  )
}
