import React from 'react'

export default function CodePracticePage() {
  return (
    <div>
        <h2>Upgrades</h2>
        <ul>
            {upgrades.map((upgrade) => (
                <li key={upgrade.id}>
                    <h2>{upgrade.name}</h2>
                    <p>Cost: {upgrade.cost}</p>
                    <p>CPS: {upgrade.increase}</p>
                    <p>Qty Owned: {autoClicker[upgrade.id] || 0}</p>
                    <button>Buy</button>
                </li>
            ))}
        </ul>
    </div>
  )
}
