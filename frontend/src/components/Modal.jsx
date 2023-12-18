import React, { useEffect, useState } from 'react';
import {ReactComponent as Close} from "../assets/images/CloseIcon.svg";
import { toast } from 'react-toastify';

export default function Modal({open,closeModal,data}) {

    const [note,setNote] = useState({
        title:"",
        description:"",
        tag:"",
        user:""
    })

    useEffect(()=>{
        setNote(data);
    },[data])



    

    
    const noteValueChanged = e =>{
        const {name,value} = e.target;
        setNote(old=>({
            ...old,[name]:value
        }))
    } 

    const updateNote = e =>{

        let token = localStorage.getItem("token");

        e.preventDefault();
        fetch("https://notekeeperapp.onrender.com/api/notes/updateNote",{
            method:"PATCH",
            headers:{
                "auth-token":token,
                "Content-Type":"application/json",
            },
            body:JSON.stringify(note),
            
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data?.result){
                toast.success(data?.message);
                closeModal();
            }
            else{
                toast.error("Check Your Data.!");
            }
        })
        .catch((err)=>{
            console.log(err);
            toast.error("Check Your Data.!");
        })
        
    }

  return (
    open && <div className='h-[100vh] w-[100vw] overflow-hidden absolute top-0 left-0 right-0 flex justify-center items-center bg-gray-50 bg-opacity-40'>
        <div className="bg-white rounded-xl shadow-xl px-5 py-5">
            <div className="flex justify-between items-center text-center bg-red-500 text-white text-lg p-3">
                <p></p>
                <h2 className=" ">Update Note</h2>
                <Close className='cursor-pointer' onClick={closeModal}/>
            </div>
            <form action="" method="post" onSubmit={updateNote}>
            <input type="text" value={note.title} onChange={noteValueChanged} name='title' placeholder='Enter Title'  className='p-3 w-full rounded shadow my-3 ' />
            <textarea name="description" id="" cols="30" rows="10" value={note.description} onChange={noteValueChanged} className='p-3 w-full rounded shadow my-3 ' placeholder='Enter Some Description'></textarea>
            <input type="text" value={note.tag} onChange={noteValueChanged} name='tag' placeholder='Enter Tag'  className='p-3 w-full rounded shadow my-3 ' />
            <input type="submit" value="Upload" className='px-5 py-2 rounded my-3 shadow bg-red-500' />
        </form>
        </div>
    </div>
  )
}
