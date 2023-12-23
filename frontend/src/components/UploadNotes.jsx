import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner'


export default function UploadNotes({ user }) {

    const [note, setNote] = useState({
        title: "",
        description: "",
        tag: "",
        user: ""
    })

    const [isLoading, setIsLoading] = useState(false);






    const noteValueChanged = e => {
        const { name, value } = e.target;
        setNote(old => ({
            ...old, [name]: value
        }))
    }

    const uploadNote = e => {
        setNote(old => ({ ...old, user: user }))

        setIsLoading(true);

        let token = localStorage.getItem("token");
        e.preventDefault();
        fetch("http://localhost:5000/api/notes/addNote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify(note),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data?.result) {
                    toast.success(data?.message);
                    setNote({
                        user: "",
                        title: "",
                        description: "",
                        tag: "",
                    })
                }
                else {
                    toast.error("Check Your Data.!");
                }
                console.log(data);
            })
            .catch((err) => {
                toast.error("Check Your Data.!");
                console.log(err);
            })
            .finally(()=>{
                setIsLoading(false);
            })
    }
    return (

        <>
            {
                isLoading &&
                <section className=' flex justify-center items-center top-0 right-0 left-0 bottom-0 h-screen w-screen fixed bg-opacity-80  bg-gray-100'>
                    <Bars
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </section>

            }
            <div className='md:flex justify-center items-center p-10 rounded-2xl shadow-lg bg-blue-500 my-5'>
                <form action="" method="post" onSubmit={uploadNote}>
                    <input type="text" value={note.title} onChange={noteValueChanged} name='title' placeholder='Enter Title' className='p-3 w-full rounded shadow my-3 ' />
                    <textarea name="description" id="" cols="30" rows="5" value={note.description} onChange={noteValueChanged} className='p-3 w-full rounded shadow my-3 resize-none' placeholder='Enter Some Description'></textarea>
                    <input type="text" value={note.tag} onChange={noteValueChanged} name='tag' placeholder='Enter Tag' className='p-3 w-full rounded shadow my-3 ' />
                    <button type="submit" className='px-5 py-2 rounded my-3 shadow border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white'>
                        Upload
                    </button>
                </form>
            </div>
        </>


    )
}
