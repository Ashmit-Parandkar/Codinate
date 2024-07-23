import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AceEditor from "react-ace";
import { io } from "socket.io-client"; // Importing socket.io-client
import Chat from "./Chat";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/theme-solarized_light";
import "ace-builds/src-noconflict/theme-tomorrow_night";
import "ace-builds/src-noconflict/theme-twilight";
import "ace-builds/src-noconflict/theme-dracula";

const CodeEditor = () => {
  const location = useLocation();
  const [roomData, setRoomData] = useState(null);
  const [code, setCode] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("monokai");
  const [fontSize, setFontSize] = useState(18);
  const [socket, setSocket] = useState(null); // State for socket

  useEffect(() => {
    const newSocket = io("http://localhost:8080"); // Establishing socket connection
    setSocket(newSocket);

    return () => {
      if (socket) {
        socket.disconnect(); // Disconnecting socket on unmount
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log("Socket.io client connected");
    });
    socket.emit("addProjectRoom",roomData.roomId)
    socket.on("currentCode", (newCode) => {
      console.log("Hello", newCode);
      console.log("Received current code from server:", newCode);
      setCode(newCode);
    });

    if (socket) { 
    socket.emit("message",{roomId:roomData.roomId, newCode:""})
    }

    return () => {
      console.log("Socket.io client disconnected");
    };
  }, [socket]);

  useEffect(() => {
    console.log("location.state : ",location.state)
    if (location.state) {
      setRoomData({
        roomId: location.state.roomId,
        password: location.state.password,
        senderName: location.state.senderName
      });
      console.log(roomData);
    }
  }, [location]);

  const handleCodeChange = (newCode) => {
    console.log("Helllll")
    setCode(newCode);
    if (socket) { 
      console.log("roomId", roomData);
      socket.emit("message", {roomId: roomData.roomId, newCode: newCode}); // Emitting code change to server
    }
  };

  const runCode = () => {

    console.log("This is code : ",code)


    let currLang = language

    if(currLang == 'javascript'){
      currLang = 'js';
    }
    if(currLang == 'c_cpp'){
      currLang = 'cpp';
    }
    if(currLang == 'python'){
      currLang = 'py';
    }
    if(currLang == 'java'){
      currLang = 'java';
    }
    // if (socket) {
    //   socket.emit("message", code); // Emitting code run request to server
    // }
    
    // For simplicity, let's just set the output as the input for now
    // setOutput(input);

    console.log(currLang)


    fetch("http://localhost:8080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({code:code, language: currLang, input:input})
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Code Data : ", data);

      setOutput(data.output)
      // Optionally, reset the form fields after successful submission
      // setFormData({ username: '', roomId: '', password: '' });
      // Redirect or perform any other action upon successful submission
      // window.location.href = `/code/${data.RoomId}`;
      // props.setshowModal(false);
      // navigateTo(`/code/${data.RoomId}`,{state:{roomId: data.RoomId, password: data.password, senderName: data.UserName}})  
    })
    .catch((error) => {
      console.error("Error submitting form:", error);
    });


    
  };

  const copyRoomInfo = () => {
    console.log("Copied room info, ", roomData)
    if (!roomData) return;
    console.log("Copied room info2")
    const roomInfo = `Room ID: ${roomData.roomId} | Password: ${roomData.password}`;
    navigator.clipboard.writeText(roomInfo)
      .then(() => {
        console.log("Room info copied to clipboard:", roomInfo);
      })
      .catch((error) => {
        console.error("Error copying room info:", error);
      });
  };

  return (
    <div>
      <div className="flex gap-5 py-7">
        <div>
          <label htmlFor="language-select" className="text-white text-lg pl-5">Language:</label>
          <select
            id="language-select"
            value={language}
            className="rounded-lg px-3 h-10 w-30 ml-3"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="c_cpp">C++</option>
          </select>
        </div>
        <div>
          <label htmlFor="theme-select" className="text-white text-lg ml-1">Theme:</label>
          <select
            id="theme-select"
            value={theme}
            className="rounded-lg px-3 h-10 w-30 ml-3"
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="monokai">Monokai</option>
            <option value="github">GitHub</option>
            <option value="solarized_dark">Solarized Dark</option>
            <option value="solarized_light">Solarized Light</option>
            <option value="tomorrow_night">Tomorrow Night</option>
            <option value="twilight">Twilight</option>
            <option value="dracula">Dracula</option>
          </select>
        </div>
        <div>
          <label className="text-white text-lg ml-1">Font Size:</label>
          <input
            type="number"
            id="font-size-select"
            className="rounded-lg px-3 h-10 w-14 ml-2"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </div>

        <button onClick={runCode} className="bg-cyan-300 px-4 text-center rounded  hover:bg-cyan-500 text-gray-700 font-semibold" style={{marginLeft:"11vw"}}>Run Code</button>
        <button onClick={copyRoomInfo} className="bg-cyan-300 px-4 text-center rounded  hover:bg-cyan-500 text-gray-700 font-semibold" style={{marginLeft:"13.5vw"}}>Copy Room Info</button>
      </div>

      <div className="flex gap-7 mx-4" style={{marginTop:"10px"}}>
        <AceEditor
          mode={language}
          theme={theme}
          fontSize={fontSize}
          value={code}
          onChange={handleCodeChange}
          width="60%"
          height="82vh"
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />

        <div className="flex flex-col w-96 gap-7" style={{margin:"-22px 0"}}>
          <div>
            <label htmlFor="input-textarea" className="text-white text-lg">Input:</label>
<br />
            <textarea name="input" id="input" cols="30" rows="10" value={input} className="bg-gray-300 rounded-lg p-4" onChange={(e)=>{setInput(e.target.value)}}></textarea>

            {/* <AceEditor
              mode={language}
              theme={theme}
              fontSize={fontSize}
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              width="100%"
              height="36.6vh"
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            /> */}
          </div>
          <div>
            <label htmlFor="output-textarea" className="text-white text-lg">Output:</label>
<br />
            <textarea name="output" id="output" cols="30" className="bg-gray-300 rounded-lg p-4" rows="10" value={output}></textarea>


            {/* <AceEditor
              mode={language}
              theme={theme}
              fontSize={fontSize}
              value={output}
              width="100%"
              height="36.6vh"
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              setOptions={{
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                enableSnippets: false,
                showLineNumbers: true,
                tabSize: 2,
              }}
            /> */}
          </div>
        </div>
        {roomData && <Chat roomData={roomData} />}
      </div>
    </div>
  );
};

export default CodeEditor;
