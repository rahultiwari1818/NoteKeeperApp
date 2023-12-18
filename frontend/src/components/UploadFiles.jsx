import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify';

export default function UploadFiles() {
    const [data,setData] = useState({
        file:null,
        description:"",
    });

    const fileInput = useRef(null);

    const valueChanged  = e =>{
        const {name,value} = e.target;

        if(name == "file"){
            const file = e.target.files[0];
            setData(old=>({...old,[name]:file}))
        }
        else{

            setData(old=>({...old,[name]:value}))
        }
    }


    const uploadFile = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("document",data.file);
        formData.append("description",data.description);


        let token = localStorage.getItem("token");
        fetch("http://localhost:5000/api/files/uploadDoc",{
            method:"POST",
            headers:{
                "auth-token":token,
            },
            body:formData,
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data?.result){
                toast.success(data?.message);
                setData({
                    file:null,
                    description:"",
                })
                if (fileInput.current) {
                    fileInput.current.value = ''; // Reset the value of the file input
                  }
            }
            else{
                toast.error("Check Your Data.!");
            }
            console.log(data);
        })
        .catch((err)=>{
            toast.error("Check Your Data.!");
            console.log(err);
        })
    }

  return (
    <div className='flex justify-center items-center p-10 rounded-2xl shadow-lg bg-blue-500 my-5'>
    <form action="" method="post" onSubmit={uploadFile} encType='multipart/form-data'>
        <input type="file" name="file" id="" onChange={valueChanged} ref={fileInput} className='p-3 bg-white w-full rounded shadow my-3 resize-none'/>
        <textarea name="description" id="" cols="30" rows="5" value={data.description} onChange={valueChanged} className='p-3 w-full rounded shadow my-3 resize-none' placeholder='Enter Some Description'></textarea>
        <input type="submit" value="Upload" className='px-5 py-2 rounded my-3 shadow border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white' />
    </form>
</div>
  )
}
