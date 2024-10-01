import React from 'react'
import FooterStyles from '@/app/styles/Footer.module.css'
import Icons from '@/app/components/Icons.jsx'

export default function Footer() {

  
  return (
    <>
     <div className={FooterStyles.container}>
        <footer className={FooterStyles.footerContainer}>
          <Icons/>
          <p className={FooterStyles.footerP}>&copy; 2024 Crumb Raider : Cookie Edition. All rights reserved.</p>
        </footer>
      </div> 
    </>
  )
}
