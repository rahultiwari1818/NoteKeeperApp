import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({ isLoggedIn, setIsLoggedIn }) {
    const [userdata, setUserdata] = useState({ email: "", password: "" });
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);
    const [isInvalidPasswd, setIsInvalidPasswd] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    }, [])

    const inputValueChanged = e => {
        const { name, value } = e.target;
        setUserdata(old => ({
            ...old, [name]: value
        }))
    }

    const loginUser = e => {
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userdata),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.result) {
                    let token = data?.token;
                    localStorage.setItem("token", token);
                    // localStorage.setItem("isLoggedIn",true);
                    setIsLoggedIn(true)
                    navigate("/home");
                    setIsInvalidEmail(false);
                    setIsInvalidPasswd(false);
                }
                else {
                    if (data.inValidEmail) {
                        setIsInvalidEmail(true);
                    }
                    if (data.inValidPassword) {
                        setIsInvalidPasswd(true);
                    }
                }
            })
            .catch((err) => {

            })
    }

    return (

        <div className='p-3 flex items-center justify-center h-[80vh] '>
            <div className='md:w-[40%] shadow-xl rounded-xl p-10'>
                <h1 className='text-center bg-red-500 text-white text-2xl  rounded-lg'>Login</h1>
                <form action="" className='mt-5' method="post" onSubmit={loginUser}>
                    <input type="email" name="email" value={userdata.email} onChange={inputValueChanged} className='p-2 rounded shadow w-full my-2 ' placeholder='Enter Email' required /><br />
                    {
                        isInvalidEmail &&
                        <p className='pt-2 text-red-500'>
                            Invalid Email
                        </p>
                    }
                    <input type="password" name="password" value={userdata.password} onChange={inputValueChanged} className='p-2 rounded shadow w-full  my-2' placeholder='Enter Password ' required /><br />
                    {
                        isInvalidPasswd &&
                        <p className='pt-2 text-red-500'>
                            Invalid Password
                        </p>
                    }
                    <div className="flex justify-center items-center">
                        <button type="submit" className='px-5 py-1 rounded shadow bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white my-2'>
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
