import React from 'react';
import RoomItem from '../components/RoomItem';

const RoomShower = ({ setshowModalJ }) => {
  const roomid1 = "fzey34br";
  const roomid2 = "het2uj2f";
  const roomname1 = "Test room 1";
  const roomname2 = "Test room 2";

  return (
    <div>
      <h1 className='ml-4 md:ml-12 text-white text-4xl font-bold'>Codinates</h1>
      <div id='view-rooms' className="mx-4 md:mx-12 mt-4 md:mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7 bg-black rounded-lg shadow-xl py-4 md:py-7">
        {/* Use responsive margin and grid classes */}

        {/* Use .map when the backend is completed */}
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <RoomItem
            key={index}
            roomid={index % 2 === 0 ? roomid1 : roomid2}
            roomname={index % 2 === 0 ? roomname1 : roomname2}
            setshowModal={setshowModalJ}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomShower;