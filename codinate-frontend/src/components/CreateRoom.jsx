import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const CreateRoom = (props) => {
  const [formData, setFormData] = useState({
    userName: "",
    roomName: "",
    password: ""
  });

  const navigateTo = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    // try{
    //   await axios.post("http://localhost:8080/api/room", {
    //     formData
    //   })
    // }

    fetch("https://codinate-backend.vercel.app/api/room", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Form submitted successfully:", data.room.members[data.room.members.length-1].name);
      // history.push("/code", { roomData: data });
      props.setshowModal(false);
      navigateTo(`/code/${data.room.roomId}`,{state:{roomId: data.room.roomId, password: data.room.password, senderName:data.room.members[data.room.members.length-1].name}})
      // Redirect to the code editor page
      //window.location.href = '/code'; // Replace '/code' with your actual code editor URL
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });

    
    // catch(e){
    //   console.log(e);
    // }
  };

  return (
<>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h1 className='text-center text-4xl font-bold text-white'>Cod<span className=' text-cyan-300 '>inate</span></h1>
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
    Create a Room
  </h2>
</div>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
            UserName
          </label>
          <div className="mt-2">
            <input
              id="username"
              name="userName"
              type="text"
              autoComplete="username"
              required
              value={formData.userName}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
            />
          </div>
        </div>
        <div>
          <label htmlFor="roomname" className="block text-sm font-medium leading-6 text-white">
            Roomname
          </label>
          <div className="mt-2">
            <input
              id="roomname"
              name="roomName"
              type="text"
              required
              value={formData.roomName}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-gray-500 px-3 py-1.5 text-sm font-bold leading-6 text-black shadow-sm hover:bg-gray-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create
          </button>
        </div>
      </form>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not having an account?{' '}
        <a href="#" className="font-semibold text-slate-300 hover:text-gray-400">
          Signup
        </a>
      </p>
    </div>
    </>
  );
};

export default CreateRoom;
