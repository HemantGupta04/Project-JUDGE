import React from 'react';
import './Footer.css'; // Import CSS for Footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
