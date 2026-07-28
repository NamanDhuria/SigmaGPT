import './App.css'
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { MyContext } from './MyContext.jsx';
import { useState, useEffect } from 'react';
import { v1 as uuidv1 } from "uuid";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";

function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [newChat, setNewChat] = useState(true);
  const [prevChats, setPrevChats] = useState([]);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [allThreads, setAllThreads] = useState([]);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const providerContext = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads,
    user, setUser,
    authLoading, setAuthLoading
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
          credentials: "include"
        });
        const res = await response.json();
        if (response.ok) {
          setUser(res.user);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setAuthLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (authLoading) return <div>Loading...</div>;

  return (
    <MyContext.Provider value={providerContext}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            user ? (
              <div className="app">
                <Sidebar />
                <ChatWindow />
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </MyContext.Provider>
  )
}

export default App;