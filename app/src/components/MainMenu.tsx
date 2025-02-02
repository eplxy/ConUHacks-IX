import { useState } from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import Donflamingo from '../assets/Donflamingo.png';
import '../style/MainMenu.css';

export default function MainMenu() {
  const [showCredits, setShowCredits] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const navigate = useNavigate();

  const handlePlay = () => {
    console.log("Starting the game...");
    navigate('/game'); 
  };

  return (
    <Box className="main-menu-container">
      {/* Right Column: Game Logo */}
      <Box className="flex items-center justify-center w-full h-full">
        <img
          src={Donflamingo}
          alt="Game Logo"
          className="main-menu-logo"
        />
      </Box>

      {/* Left Column: Menu Items */}
      <Box className="menu-items">
        <Button
          onClick={handlePlay}
          variant="contained"
          className="menu-button"
        >
          Play
        </Button>
        <Button
          onClick={() => setShowCredits(!showCredits)}
          variant="contained"
          className="menu-button"
        >
          Credits
        </Button>
        <Button
          onClick={() => setShowGallery(!showGallery)}
          variant="contained"
          className="menu-button"
        >
          Gallery
        </Button>
      </Box>

      {/* Credits Popup */}
      {showCredits && (
        <Box className="popup-overlay">
          <Box className="popup-content">
            <h2 className="text-2xl font-bold">Developed by:</h2>
            <p className="mt-2">...</p>
            <h2 className="text-2xl font-bold">Dialogue by:</h2>
            <p className="mt-2">...</p>
            <h2 className="text-2xl font-bold">Art by:</h2>
            <p className="mt-2">...</p>
            <Button
              onClick={() => setShowCredits(false)}
              className="menu-button"
            >
              Close
            </Button>
          </Box>
        </Box>
      )}

      {/* Gallery Popup */}
      {showGallery && (
        <Box className="popup-overlay">
          <Box className="popup-content max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Gallery</h2>
            <Box className="gallery-grid">
              <img src={Donflamingo} alt="Gallery Image 1" className="gallery-image" />
              <img src={Donflamingo} alt="Gallery Image 2" className="gallery-image" />
              <img src={Donflamingo} alt="Gallery Image 3" className="gallery-image" />
            </Box>
            <Button
              onClick={() => setShowGallery(false)}
              className="menu-button"
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
