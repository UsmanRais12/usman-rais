import React from 'react';
import { CERTIFICATES } from '../constants';
import { motion } from 'framer-motion';

const Certificates = () => {
  return (
    <div className='border-b border-neutral-900 pb-4'>
      <motion.h1
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className='my-20 text-center text-4xl'
      >
        Certificates
      </motion.h1>

      <div>
        {CERTIFICATES.map((certificate, index) => (
          <motion.div
            key={index}
            className='mb-8 flex flex-wrap lg:justify-center'
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
          >
            <div className='w-full lg:w-1/4'>
              <a href={certificate.link} target='_blank'>
                <img
                  src={certificate.image}
                  width={150}
                  height={150}
                  alt={certificate.title}
                  className='mb-6 rounded'
                />
              </a>
            </div>

    
            <motion.div
              className='w-full max-w-xl lg:w-3/4'
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
            >
              <a href={certificate.link} target='_blank'>
                <h6 className='mb-2 font-semibold'>{certificate.title}</h6>
              </a>
              <p className='mb-4 text-neutral-400'>{certificate.description}</p>

              {certificate.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className='mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-900'
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
