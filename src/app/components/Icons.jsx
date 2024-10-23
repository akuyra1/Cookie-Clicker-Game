import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import IconStyles from '@/app/styles/Icons.module.css'


export default function SocialMediaIcons() {
  return (
    <div style={{ display: 'flex', gap: '20px', fontSize: '24px' }}>
      <a href="mailto:your-email@example.com" aria-label="Email">
        <MdEmail className={IconStyles.icons}/>
      </a>
      <a href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
        <FaFacebook className={IconStyles.icons}/>
      </a>
      <a href="https://www.twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
        <FaTwitter className={IconStyles.icons}/>
      </a>
      <a href="https://www.instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
        <FaInstagram className={IconStyles.icons}/>
      </a>
      <a href="https://www.linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
        <FaLinkedin className={IconStyles.icons}/>
      </a>
      <a href="https://github.com/akuyra1" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
        <FaGithub className={IconStyles.icons}/>
      </a>
    </div>
  );
}
