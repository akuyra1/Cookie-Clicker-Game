import React from 'react'
import '@/app/styles/aboutPage.css'


export default function About() {


  return (
    <div className='container'>
      <h1 className='about-page-title'>About Cookie Clicker Game</h1>

      <p className='about-welcome'>Welcome to the Crumb Raider : Cookie Edition! 🎉🍪</p>

      <h2>How to Play:</h2>
      <ul className='game-rules'>
        <li><strong><span>Click the Cookie</span></strong>: Tap or click on the giant cookie to bake cookies manually.</li>
        <li><strong><span>Unlock Upgrades</span></strong>: Spend your cookies on upgrades to bake more cookies per click or per second.</li>
        <li><strong><span>Hire Bakers</span></strong>: Hire bakers and other fun characters to automate your baking!</li>
        <li><strong><span>Reach Milestones</span></strong>: Bake millions, billions, and even trillions of cookies!</li>
      </ul>

      <h2>Game Features:</h2>
      <ul className='game-rules'>
        <li><strong><span>Incremental Gameplay</span></strong>: The more you bake, the faster you can bake!</li>
        <li><strong><span>Smooth Progression</span></strong>: Watch as your cookie count grows exponentially.</li>
        <li><strong><span>Upgrades & Power-ups</span></strong>: Customize your gameplay with cool upgrades.</li>
        <li><strong><span>Casual & Addictive</span></strong>: Perfect for quick breaks or long sessions.</li>
      </ul>

      <p>Are you ready to become the world’s greatest cookie maker? Start clicking and build your cookie empire today!</p>

    </div>
  )
}
