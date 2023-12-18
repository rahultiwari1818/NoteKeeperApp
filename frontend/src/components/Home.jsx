import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UploadNotes from './UploadNotes';

export default function Home() {

  const navigate = useNavigate();

  const [userdata,setUserdata] = useState({_id:"",email:"",data:"",name:""});

    useEffect(()=>{

      let token = localStorage.getItem("token");

      fetch("https://notekeeperapp.onrender.com/api/auth/getUser",{
        method:"GET",
        headers:{
          "Content-Type":"applicatin/json",
          "auth-token": token,
        }
      }).then((res)=>res.json())
      .then((data)=>{
        if(!data?.result){
          navigate("/login");
        }
        data = data?.data;
        setUserdata(data);
        localStorage.setItem("user",data?._id);
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      })
    },[])
    
  return (
    <div className="p-5">
      <h1 className='text-xl p-4 rounded bg-red-500 text-black text-left'>Jay Hind.! {userdata?.name}</h1>
      <div className="md:flex justify-center items-center">
        <UploadNotes user={userdata._id}/>
      </div>
    </div>
  )
}
