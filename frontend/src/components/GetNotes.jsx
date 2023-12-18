import React, { useEffect, useState } from 'react';
import Modal from './Modal';
import DeleteModal from './DeleteModal';
import Notes from './Notes';

export default function GetNotes() {

    const [notes,setNotes] = useState([]);
    const [tags,setTags] = useState([]);
    const [search,setSearch] = useState({    tag:"ALL",title:"" });
    const [open,setOpen] = useState(false);
    const [delOpen,setDelOpen] = useState(false);
    const [updateData,setUpdateData] = useState({});
    const [delId,setDelId] = useState(0);

    


    useEffect(()=>{

        let token = localStorage.getItem("token");

        fetch(`https://notekeeperapp.onrender.com/api/notes/getAllNotes`,{
            method:"GET",
            headers:{
                "auth-token":token,
            }
        })
        .then(res=>res.json())
        .then(data=>{
            if(data?.result){
                data = data?.data;
                console.log(data)
                setNotes(data);
            }
            
        })
        .catch((err)=>{
            console.log(err);
        })

        fetch(`https://notekeeperapp.onrender.com/api/notes/getTags`,{
            method:"GET",
            headers:{
                "auth-token":token,
            }
        })
        .then((res)=>res.json())
        .then((data)=>{
            setTags(data?.data)
        })
        .catch((err)=>{
            console.log(err);
        })


    },[delOpen,open])

    const filterNotes = e =>{
        let token = localStorage.getItem("token");
        const {name} = e.target;
        let tag = e.target.value;
        setSearch(old=>
            ({...old,[name]:tag})
        )
        fetch(`https://notekeeperapp.onrender.com/api/notes/getNotes/${tag}/${search.title}`,{
            method:"GET",
            headers:{
                "auth-token":token,
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            setNotes(data?.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    const searchChanged = e =>{
        let title = e.target.value;
        let token = localStorage.getItem("token");
        const {name} = e.target;

        setSearch(old=>
            ({...old,[name]:title})
        );
        fetch(`https://notekeeperapp.onrender.com/api/notes/getNotes/${search.tag}/${title}`,{
            method:"GET",
            headers:{
                "auth-token":token,
            }
        })
        .then(res=>res.json())
        .then((data)=>{
            setNotes(data?.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const openModal = (note) =>{
        setUpdateData(note);
        setOpen(true);
    }

    const closeModal = () =>{
        setOpen(false);
    }

    const openDelModal = (id) =>{
        setDelId(id);
        setDelOpen(true);
    }

    const closeDelModal = () =>{
        setDelOpen(false);
    }



  return (
    <div className='p-5'>
        <h2 className='p-5 text-center bg-red-500 text-white text-lg'>Notes</h2>

       <div className="md:flex justify-between items-center">
       <p className='p-5 text-base'>Filter Notes Based on tag :  <select name="tag" id="" onChange={filterNotes} className='shadow rounded px-5 py-2 '>
            <option value="ALL">--- ALL ---</option>
            {
                tags?.map((tag,idx)=>{
                    return <option value={tag}>{tag}</option>
                })
            }
            </select> 
            
            
              </p>

              <div>
                    <p className="p-5 text-base">
                        Search Record Based on Title : 
                        <input type="search" name="title" id="" placeholder='Title' className='mx-5 py-2 px-3 shadow rounded-lg' value={search.title} onChange={searchChanged}/>
                    </p>
              </div>

        </div>  
        
        


        <div className="md:grid lg:grid-cols-3 pt-5 md:grid-cols-2 sm:block">
            {
                 notes?.map((note,idx)=>(
                    <Notes openDelModal={openDelModal} openModal={openModal} note={note}/>
                 ))
            }
        </div>
        <Modal open={open} data={updateData} closeModal={closeModal}/>
        <DeleteModal open={delOpen} closeModal={closeDelModal} id={delId}/>
    </div>
  )
}
