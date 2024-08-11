import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleEnlargeImage = (src) => {
    setEnlargedImage(enlargedImage === src ? null : src);
  };

  return (
    <div className="container">
      <div className="sidebar left-sidebar">
        <button onClick={toggleDropdown} className="dropdown-button">
          Menu
        </button>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/" onClick={toggleDropdown}>Home</Link>
            <Link to="/ProductList" onClick={toggleDropdown}>Products</Link>
            <Link to="/cart" onClick={toggleDropdown}>Shopping Cart</Link>
            <Link to="/checkout" onClick={toggleDropdown}>Checkout</Link>
          </div>
        )}
        <div className="video-container">
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/0Mq5uuA4Dpk"
            title="YouTube Music Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <iframe
            width="100%"
            height="200"
            src="https://www.youtube.com/embed/xnEHLUw8S4U"
            title="YouTube Music Video 2"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      
      <div className="content">
        {children}
      </div>
      
      <div className="sidebar right-sidebar">
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="hours">
          <p>
            Open Monday-Friday <br />
            8:30AM-5:30PM
          </p>
        </div>
        <div className="image-container">
          <img 
            src="/NewfieStockMap.jpeg" 
            alt="Location"
            onClick={() => toggleEnlargeImage("/NewfieStockMap.jpeg")}
            className={enlargedImage === "/NewfieStockMap.jpeg" ? 'enlarged-image' : ''}
          />
        </div>
        <div className="contact">
          <p>
            123 Water St., <br />
            St. John's, NL <br />
            A1C 1A5 <br />
          </p>
          <p>
            709-687-5309 <br />
            newfiestock@outlook.com
          </p>
        </div>
        <div className="image-container">
          <img 
            src="/harbouratnight.jpg"
            alt="" 
            onClick={() => toggleEnlargeImage("/harbouratnight.jpg")}
            className={enlargedImage === "/harbouratnight.jpg" ? 'enlarged-image' : ''}
          />
          <p>&copy; 2024 Newfie Stock. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Layout;

