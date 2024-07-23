import React from 'react'

const Button = ({label,iconURL,setshowModal}) => {
  return (
    <button className={`
    flex justify-center w-60 bg-white hover:bg-cyan-300 items-center hover:shadow-cyan-300 shadow-md hover:font-semibold gap-2 px-7 py-4 border font-montserrat text-lg leading-none
     rounded-full`} onClick={()=>setshowModal(true)}>
      {label}
      {iconURL && <img src={iconURL} alt="arrow right icon" className='ml-2 text-[#404040] rounded-full w-5 h-5' />}
    </button>
  )
}

export default Button
