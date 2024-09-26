import React from 'react'
import { CONTACT } from '../constants'
import {motion} from 'framer-motion'
const Contact = () => {
  return (
    <div className='border-b border-neutral-900 pb-20'>
        <motion.h2 className='my-10 text-center text-4xl'
        whileInView={{opacity:1, y:0}}
        initial={{opacity:0, y:-100}}
        transition={{duration:0.5}}
        >Get in Touch</motion.h2>
        <div className='text-center tracking-tighter'>
        <motion.p 
        whileInView={{opacity:1 , x:0}}
        initial={{opacity:0 , x:-100}}
        transition={{duration:1}}
        className='my-4'>{CONTACT.address}</motion.p>
        <a href="https://wa.link/jpdpkd" target='_blank'><motion.p className='my-4'         whileInView={{opacity:1 , x:0}}
        initial={{opacity:0 , x:100}}
        transition={{duration:1}}>{CONTACT.phoneNo}</motion.p></a>
        <a href={`mailto:${CONTACT.email}`}  className='border-b'>{CONTACT.email}</a>
        </div>
    </div>
  )
}

export default Contact
