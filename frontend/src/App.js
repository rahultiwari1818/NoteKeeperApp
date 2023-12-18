
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>

        <Navbar isLoggedIn={isLoggedIn} />
        <Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Footer/>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

       </BrowserRouter>
  );
}

export default App;
