/*import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/

import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [content, setContent] = useState("");

  useEffect(() => {
    socket.on("receive-changes", (data) => {
      setContent(data);
    });
  }, []);

  const handleChange = (e) => {
    setContent(e.target.value);
    socket.emit("send-changes", e.target.value);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Real-Time Collaborative Editor</h1>
      <textarea
        style={{ width: "100%", height: "400px", fontSize: "1.1rem" }}
        value={content}
        onChange={handleChange}
        placeholder="Start typing here..."
      />
    </div>
  );
}

export default App;
