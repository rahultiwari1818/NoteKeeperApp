
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import Main from './components/Main';
import { BrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from "../src/assets/images/Logo.jpg"

function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    setIsLoading(false);
  },[])

  return (

    <BrowserRouter >
    {
      isLoading ?
      <section className='flex justify-center items-center bg-white fixed h-screen w-screen top-0 bottom-0 right-0 left-0'>
        <section>
          <section>
            <img src={Logo} className=' h-[50vh] w-[80vh]' alt=" Logo "/>
          </section>

          <section>
            <p className=' text-center text-3xl text-blue-500'>
              Note Keeping App
            </p>
          </section>
          

        </section>
        </section>
        :
          <>
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
          </>
    }

       </BrowserRouter>
  );
}

export default App;
