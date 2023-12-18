import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Form({ isLoggedIn, setIsLoggedIn }) {
    const [userdata, setUserdata] = useState({ name: "", email: "", password: "" })

    const inputValueChanged = e => {
        const { name, value } = e.target;
        setUserdata(old => ({ ...old, [name]: value }))
    }

    useEffect(() => {
        // localStorage.setItem("isLoggedIn", false);
        setIsLoggedIn(false);
        localStorage.clear();
    }, [])

    const signUp = e => {
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userdata),
        })
            .then(res => res.json())
            .then(data => {
                toast.success(data.message);
                // alert(data.message);
                setUserdata({
                    name: "", email: "", password: ""
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='p-3 flex items-center justify-center h-[80vh] '>
            <div className='md:w-[40%] shadow-xl rounded-xl p-10'>

                <h1 className='text-center bg-red-500 text-white text-2xl  rounded-lg'>SignUp</h1>
                <form action="" className='mt-5' method="post" onSubmit={signUp}>
                    <input type="text" name="name" value={userdata.name} onChange={inputValueChanged} className='p-2 rounded shadow w-full  my-2' placeholder='Enter Full Name' /><br />
                    <input type="email" name="email" value={userdata.email} onChange={inputValueChanged} className='p-2 rounded shadow w-full  my-2' placeholder='Enter Email' /><br />
                    <input type="password" name="password" value={userdata.password} onChange={inputValueChanged} className='p-2 rounded shadow w-full  my-2' placeholder='Enter Password ' /><br />
                    <div className="flex justify-center items-center">

                        <button type="submit" className='px-5 py-1 rounded shadow bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white my-2'>
                            SignUp
                        </button>                    </div>
                </form>
            </div>
        </div>


    )
}
