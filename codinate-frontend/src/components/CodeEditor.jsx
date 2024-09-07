/////////////////////////////////////////
///////////////////////////////////////
//////////////////////////////////
/////////////////////////////////////
///////////////////////////////


import React, { useState, useEffect, useRef } from "react";
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
  const [previousLine, setPreviousLine] = useState(undefined);
  const [lockedLines, setLockedLines] = useState({});
  const [displayWarning, setDisplayWarning] = useState(false);
  const [conflictLine, setConflictLine] = useState(1);
  const editorRef = useRef(null);

  useEffect(() => {
    const newSocket = io("https://codinate.onrender.com", {
      transports: ['websocket', 'polling'],
      withCredentials: true
    });
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

    socket.on("lineLocked", ({ line, userId }) => {
      setLockedLines((prev) => ({ ...prev, [line]: userId }));
      console.log("Locking.........");
      console.log(lockedLines);
    });

    socket.on("lineUnlocked", ({ line }) => {
      setLockedLines((prev) => {
        const newLockedLines = { ...prev };
        delete newLockedLines[line];
        console.log("Unlocking.........");
        console.log(lockedLines);
        return newLockedLines;
      });
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


    fetch("https://codinate.onrender.com", {
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


  const lockLine = (lineNumber) => {
    if (socket) {
      socket.emit("lockLine", { roomId: roomData.roomId, line: lineNumber });
    }
  };

  const unlockLine = (lineNumber) => {
    if (socket) {
      socket.emit("unlockLine", { roomId: roomData.roomId, line: lineNumber });
    }
  };

  const handleCursorChange = (selection) => {
    if (editorRef.current) {
      const editor = editorRef.current.editor;
      const line = editor.getCursorPosition().row;

      if (lockedLines[line] && lockedLines[line] !== socket.id) {
        console.log(`Line ${line + 1} is being edited by another user. ${roomData.senderName}`);
        setConflictLine(line+1)
        setDisplayWarning(true)

        setTimeout(() => {
          setDisplayWarning(false)
        }, 3000);

      }

      if (previousLine !== undefined && previousLine !== line) {
        unlockLine(previousLine);
        console.log(`Unlocked Line : ${previousLine+1}`)
      }

      lockLine(line);
      console.log(`Locking Line : ${line+1}`)
      setPreviousLine(line);
    }
  };

  return (
    <div className="overflow-x-hidden lg:overflow-y-hidden">
      <div className="flex gap-5 py-7 flex-col-reverse lg:flex-row">
        <div className="flex flex-col lg:flex-row sm:justify-around sm:align-center sm:ml-8">
        <div className="w-[30vw] lg:w-[10vw]">
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
        <div className="w-[40vw] mx-2 lg:w-[13vw]">
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
        <div className="w-[30vw] mx-1 flex flex-col lg:w-[10vw]">
          <label className="text-white text-lg ml-1">Font Size:</label>
          <input
            type="number"
            id="font-size-select"
            className="rounded-lg px-3 h-10 w-14 ml-2"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
          />
        </div>
        </div>
        <button onClick={runCode} className="bg-cyan-300 px-4 text-center rounded  hover:bg-cyan-500 text-gray-700 font-semibold ml-4 mr-4 py-4 lg:ml-[14vw]">Run Code</button>
        <button onClick={copyRoomInfo} className="bg-cyan-300 px-4 text-center rounded  hover:bg-cyan-500 text-gray-700 font-semibold ml-4 mr-4 py-4 lg:ml-[13.5vw]">Copy Room Info</button>
      </div>

      {displayWarning && <div className="bg-red-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center mx-auto max-w-lg absolute top-[2vh] right-[2vw]">
        <svg viewBox="0 0 24 24" className="text-red-600 w-5 h-5 sm:w-5 sm:h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>
        <span className="text-red-800"> Line {conflictLine} is being edited by other user.</span>
    </div>}
        

      <div className="flex gap-7 mx-4 flex-col lg:flex-row lg:h-[80vh] w-60vw ace-container" style={{marginTop:"10px"}}>
        <div className="w-[92vw] lg:w-[60vw] lg:h-[76vh] overflow-y-hidden">
        <AceEditor
          className=""
          // style={{width:"60vw"}}
          ref={editorRef}
          mode={language}
          theme={theme}
          fontSize={fontSize}
          value={code}
          onChange={handleCodeChange}
          width="100%"
          height="80vh"
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
          }}
          // onFocus={handleFocus}
          // onBlur={handleBlur}
          onCursorChange={handleCursorChange}
        />
        </div>

        <div className="flex flex-row lg:flex-col w-96 lg:w-[12vw] gap-7" style={{margin:"-22px 0"}}>
          <div>
            <label htmlFor="input-textarea" className="text-white text-lg">Input:</label>
<br />
            <textarea name="input" id="input" cols="30" rows="8" value={input} className="bg-gray-300 rounded-lg p-4 w-[42vw] h-[32vh] lg:w-[12vw]" onChange={(e)=>{setInput(e.target.value)}}></textarea>

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
            <textarea name="output" id="output" cols="30" className="bg-gray-300 rounded-lg p-4 w-[42vw] h-[32vh] lg:w-[12vw]" rows="12" value={output}></textarea>


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
