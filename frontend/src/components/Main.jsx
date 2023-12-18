import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Form from './Form';
import Login from './Login';
import Home from './Home';
import GetNotes from "./GetNotes";
import UploadFiles from './UploadFiles';
import GetAllFiles from './GetAllFiles';
export default function Main({isLoggedIn,setIsLoggedIn}) {
  return (
    <main>
        <Routes>
          <Route path="/" element={<Form isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/getNotes" element={<GetNotes />} />
          <Route path="/uploadFiles" element={<UploadFiles />} />
          <Route path="/getAllFiles" element={<GetAllFiles />} />
        </Routes>
    </main>
  )
}
