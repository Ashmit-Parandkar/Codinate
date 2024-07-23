import React, { Children } from 'react'

const Modal = ({id,isVisible,setshowModal,children}) => {
  if(!isVisible) return null;

  const handleClose=(e)=>{
    if(e.target.id==="wrapper") setshowModal(false)
  }

  return (
    <section id={id}>
      <div className='flex justify-center items-center fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' id="wrapper" onClick={handleClose}>
    <div className='w-[600px] flex flex-col'>
    <button className='text-white text-xl place-self-end' onClick={()=>setshowModal(false)}>X</button>
    <div className='bg-[#404040] p-2 rounded'>{children}</div>

    </div>
      
    </div>
    </section>
  )
}

export default Modal
