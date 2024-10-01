import { useEffect, useRef } from 'react';
import buttonStyles from '@/app/styles/Buttons.module.css';

export default function HoverButton({ text, onClick, className }) {
  const hoverSoundRef = useRef(null);

  // Initialize the audio object once using useRef
  useEffect(() => {
    hoverSoundRef.current = new Audio('/sounds/buttonHover.ogg');
    hoverSoundRef.current.volume = 0.5;
    hoverSoundRef.current.load(); // Preload the sound to avoid delays
  }, []);

  // Function to play the sound
  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.pause(); // Stop any current playback
      hoverSoundRef.current.currentTime = 0; // Reset to start
      hoverSoundRef.current.play(); // Play the sound
    }
  };

  return (
    <button
      onMouseOver={playHoverSound} // Trigger sound on hover
      onClick={onClick} // Pass the onClick prop to the button
      className={`${buttonStyles.allButtons} ${className || ''}`} // Merge the passed className with default styles
    >
      {text}
    </button>
  );
}
