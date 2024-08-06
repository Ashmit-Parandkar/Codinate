// Hero component
import React from 'react';
import { motion } from 'framer-motion';
import { arrowRight } from '../assets/icons';
import Button from '../components/Button';
import { FaCode } from "react-icons/fa6";


const Hero = ({ setshowModalC, setshowModalJ }) => {
  const fadeInAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.section
      id='home'
      className='w-full flex flex-col md:flex-row justify-evenly items-center m-auto h-[600px] mt-[8vh] lg:mt-0'
      variants={fadeInAnimation}
      initial="hidden"
      animate="visible"
    >
      <motion.div initial={{opacity:0,y:-100}}
      animate={{opacity:1,y:0}}
      transition={{duration:1,ease:'easeOut',delay:0.2}}  className='flex flex-col gap-9 justify-center items-center mb-8 md:mb-0 lg:ml-[10vw]'>
        <Button label="Create Room" setshowModal={setshowModalC}></Button>
        <Button label="Join Room" setshowModal={setshowModalJ}></Button>
        <Button label="View the Codinates"></Button>
      </motion.div>
      <motion.div initial={{opacity:0,y:100}}
      animate={{opacity:1,y:0}}
      transition={{duration:1,ease:'easeOut',delay:0.2}} className='text-white flex flex-col justify-center items-center w-[80vw] lg:w-[100vw]'>
        <div>
        <motion.div
      initial={{ scale: 1 }} // Initial scale
      animate={{ scale: 1.5 }} // Target scale after animation
      transition={{ delay: 2, duration: 0.5 }} // Delay before starting animation and duration of the animation
    >
      <FaCode className='text-black bg-white rounded-full w-12 h-12 p-3 shadow-cyan-300 shadow-md'></FaCode>
    </motion.div>
          <div>
        <h1 className='text-4xl md:text-8xl text-center md:text-left'>
          Code <span className='text-cyan-300'>together</span>
        </h1>
        </div>
        </div>
        <p className='mt-4 md:mt-7 w-full md:w-[700px] text-slate-300 text-base md:text-lg text-center md:text-left'>
          Now, you no longer have to share your screen with fellow coders or rely on Zoom. Instead, use{' '}
          <span className='text-cyan-300 font-bold text-lg md:text-xl'>Codinate</span>, a platform where coders collaborate, communicate effortlessly through text or voice chat and build projects together in the same code editor.
        </p>
        <motion.div
      initial={{ scale: 1 }} // Initial scale
      animate={{ scale: 1.5 }} // Target scale after animation
      transition={{ delay: 2, duration: 0.5 }} // Delay before starting animation and duration of the animation
    >
      <FaCode className='text-black bg-white rounded-full w-12 h-12 p-3 shadow-cyan-500 ml-[34rem] mt-4 shadow-cyan-300 shadow-md hidden lg:block'></FaCode>
    </motion.div>


      </motion.div>
      


    </motion.section>
  );
};

export default Hero;