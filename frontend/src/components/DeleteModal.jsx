import React from 'react'
import { toast } from 'react-toastify';

export default function DeleteModal({open,closeModal,id}) {
    const   BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const deleteNote = e =>{

        const token = localStorage.getItem("token");

        fetch(`${BASE_URL}/api/notes/delete/${id}`,{
            headers:{
                "auth-token":token,
            },
            method:"DELETE"

        })
        .then(res=>res.json())
        .then((data)=>{
            if(data?.result){
                toast.success(data?.message);
            }
        })
        .catch((err)=>{
            console.log(err);
            toast.error("Check Your Data.!");
        })
        closeModal()
    }

  return (
    open &&
    <div className='h-screen w-screen fixed top-0 left-0 right-0 bg-opacity-40 bg-gray-50 flex justify-center items-center '>
            <div className="bg-white p-10 shadow-xl rounded-xl">
                <p className='text-xl text-center'>Are You Sure To Delete This Note Permanently?<br/>
                This Step Can't be Revert Back.!

                </p>
                <div className="flex justify-center gap-16 items-center mt-10">
                    <button className='px-5 py-3 rounded-xl shadow-2xl  border-2 bg-white text-black hover:bg-blue-500 hover:text-white' onClick={closeModal}>Cancel</button>
                    <button className='px-5 py-3 rounded-xl shadow-2xl bg-white border-red-500 border text-red-500 hover:bg-red-500 hover:text-white' onClick={deleteNote}>Delete</button>
                </div>
            </div>
    </div>
  )
}
