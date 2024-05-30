import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-1 bg-[#A67C52] text-white">
      <h1 className="text-2xl font-bold">HOTELIER</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="text-white">HOME</a></li>
          <li><a href="#about" className="text-white">ABOUT</a></li>
          <li><a href="#services" className="text-white">SERVICES</a></li>
          <li><a href="#rooms" className="text-white">ROOMS</a></li>
          <li><a href="#contact" className="text-white">CONTACT</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
