import React from 'react'
import Button from './Button';

const RoomItem = ({roomname,roomid,setshowModal}) => {
  return (
      <div className="flex flex-col w-[90%] m-auto bg-[#404040] gap-10 text-white shadow-md shadow-cyan-300 text-[20px] justify-between p-7 items-center">
        <span className="flex font-semibold text-xl">
          {roomname}
        </span>
        <span className=" font-thin text-md">
          {roomid}
        </span>
        <button className='bg-white text-black rounded-full w-[100px] h-12 text-sm' onClick={() => setshowModal(true)} > Join Now</button>
      </div>
  )
}

export default RoomItem;