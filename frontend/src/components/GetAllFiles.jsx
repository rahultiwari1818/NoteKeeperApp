import React, { useEffect, useState } from 'react'
import  PdfIcon from "../assets/images/pdfIcon.png";
export default function GetAllFiles() {

    const [data,setData] = useState([]);

    useEffect(()=>{
        let token = localStorage.getItem("token");

        fetch("http://localhost:5000/api/files/getAllFiles",{
            method:"GET",
            headers:{
                "auth-token":token,
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            console.log(data)
         setData(data.data);
        })
        
    },[]);

    const openFile = (ele) =>{
        window.open(`http://localhost:5000/${ele.filePath}`,"_blank");
    }

  return (
      <div className="p-10 grid grid-cols-4">
        {
         data &&  data?.map((ele)=>{
        return( <div className='cursor-pointer'>

                <img src={PdfIcon} alt="" onClick={()=>openFile(ele)} srcset=""  className='h-[10vh] w-[10vw]'/>
                <p className='text-xl p-1'>{ele?.OriginalFileName}</p>
            </div>)
            
          })
        }
      </div>
  )
}
