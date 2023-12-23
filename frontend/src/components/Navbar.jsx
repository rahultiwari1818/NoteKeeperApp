import React, {  useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from "../assets/images/Logo.jpg";
export default function Navbar({isLoggedIn}) {

    const [showSideBar, setShowSideBar] = useState(false);

    // useEffect(() => {
    //     setIsloggedIn(localStorage.getItem("isLoggedIn"));
    //     console.log("render");
    // },[])

    const closeSideBar = () =>{
        setShowSideBar(false);
    }


    return (
        <nav className='py-5 px-3 bg-blue-500  shadow-lg top-0 sticky '>
            <section className='lg:flex justify-between items-center'>

                <section>
                    <img src={Logo} alt=''  className='lg:h-[10vh] lg:w-[15vw] md:h-[10vh] md:w-[15vw] h-[8vh] w-[14vw] ' />
                </section>
                <section>
                    <section className='lg:block hidden'>
                        <section className='flex justify-between items-center'>
                            {
                                !isLoggedIn
                                &&
                                <>
                                    <Link to="login" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg mx-3' onClick={()=>closeSideBar()}> Login </Link>
                                    <Link to="/" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg mx-3' onClick={()=>closeSideBar()}> Signup </Link>
                                </>

                            }
                            {
                                isLoggedIn
                                &&
                                <>
                                    <Link to="Home" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg mx-3'  onClick={()=>closeSideBar()}> Home </Link>
                                    <Link to="getNotes" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg mx-3' onClick={()=>closeSideBar()}> Notes </Link>
                                    <Link to="uploadFiles" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg mx-3' onClick={()=>closeSideBar()}> Upload Files </Link>
                                    <Link to="getAllFiles" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg mx-3' onClick={()=>closeSideBar()}> Files </Link>
                                    <Link to="login" className='py-3 px-4 bg-green-500 text-red-500 hover:bg-red-500 hover:text-white rounded-lg shadow-lg mx-3' onClick={()=>closeSideBar()}>Logout</Link>
                                </>
                            }

                        </section>
                    </section>
                    <section className='lg:hidden block'>

                        <section className='cursor-pointer top-7 right-4 absolute p-3 bg-white rounded-lg' onClick={() => {
                            setShowSideBar(!showSideBar)
                        }}>
                            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 448 512'>
                                <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' fill='#000000' />
                            </svg>
                        </section>

                        {
                            showSideBar &&
                            <section className=' '>
                                <section className='cursor-pointer top-7 right-4 absolute p-3 bg-white rounded-lg' onClick={() => {
                                    setShowSideBar(!showSideBar)
                                }} >
                                    <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                        <path d='M1.40002 13.6534L0.346191 12.5995L5.94619 6.99953L0.346191 1.39953L1.40002 0.345703L7.00002 5.9457L12.6 0.345703L13.6538 1.39953L8.05384 6.99953L13.6538 12.5995L12.6 13.6534L7.00002 8.05335L1.40002 13.6534Z' fill='#000000' />
                                    </svg>

                                </section>
                                {
                                    !isLoggedIn
                                    &&
                                    <>
                                        <Link to="login" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg m-3 block' onClick={()=>closeSideBar()}> Login </Link>
                                        <Link to="/" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg m-3 block' onClick={()=>closeSideBar()}> Signup </Link>
                                    </>

                                }
                                {
                                    isLoggedIn
                                    &&
                                    <>
                                        <Link to="Home" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg m-3 block' onClick={()=>closeSideBar()}> Home </Link>
                                        <Link to="getNotes" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg m-3 block' onClick={()=>closeSideBar()}> Notes </Link>
                                        <Link to="uploadFiles" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg m-3 block' onClick={()=>closeSideBar()}> Upload Files </Link>
                                        <Link to="getAllFiles" className='py-3 px-4 bg-green-500  text-white shadow-lg rounded-lg m-3'  onClick={()=>closeSideBar()}> Files </Link>
                                        <Link to="login" className='py-3 px-4 bg-white text-red-500 hover:bg-red-500 hover:text-white rounded-lg shadow-lg m-3 block' onClick={()=>closeSideBar()}>Logout</Link>
                                    </>
                                }

                            </section>
                        }


                    </section>
                </section>
            </section>



        </nav>
    )
}



