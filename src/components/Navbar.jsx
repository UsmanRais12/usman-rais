import React from 'react';
import logo from '../assets/kevinRushLogo.png';
import { FaLinkedin } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaWhatsapp } from 'react-icons/fa6';
import { FaInstagram } from 'react-icons/fa';

const NavBar = () => {
  return (
    <nav className='mb-20 flex items-center justify-between py-6'>
      <div className='flex flex-shrink-0 items-center'>
        <img src={logo} alt="logo" className='w-30 h-10' />
      </div>
      <div className='m-8 flex items-center justify-center gap-4 text-2xl'>
        <a href="https://www.linkedin.com/in/usman-raees/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a href="https://github.com/UsmanRais12" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        <a href="https://wa.link/jpdpkd" target="_blank" rel="noopener noreferrer">
          <FaWhatsapp />
        </a>
        <a href="https://www.instagram.com/usman_raez/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>
    </nav>
  );
}

export default NavBar;
