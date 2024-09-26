import React from 'react';
import aboutImage from '../assets/about.jpg';
import { ABOUT_TEXT } from '../constants';
import { motion } from "framer-motion"
const points = [
  "Full stack developer with expertise in React, React Native, and Node.js.",
  "4+ years of freelance experience delivering high-quality web and mobile applications.",
  "eCommerce expert with a focus on optimizing online store performance.",
  "Dropshipping store specialist, skilled in setting up and managing successful stores.",
  "Level 1 seller on Fiverr and 100% success rate on Upwork."
];

const Aboutus = () => {
  return (
    <div className='border-b border-neutral-900 pb-4'>
      <h1 className='my-20 text-center text-4xl'>About
        <span className='text-neutral-500'> Me</span>
      </h1>
      <div className='flex flex-wrap'>
        <motion.div whileInView={{opacity:1, x:0}} initial={{opacity:0,x:-100}} transition={{duration:0.5}} className='w-full lg:w-1/2 lg:p-8'>
          <div className='flex items-center justify-center'>
          <img src={aboutImage} alt="About" className='rounded-2xl filter grayscale-[0.5]' />

          </div>
        </motion.div>
        <motion.div whileInView={{opacity:1, x: 0}} initial={{opacity:0,x:100}} transition={{duration:0.5}} className='w-full lg:w-1/2'>
          <div className='flex justify-center lg:justify-start'>
            <p className='my-2 max-w-xl py-6'>{ABOUT_TEXT}</p>
          </div>
          <ul className='my-4 list-disc list-inside'>
            {points.map((point, index) => (
              <li key={index} className='my-2'>{point}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export default Aboutus;
