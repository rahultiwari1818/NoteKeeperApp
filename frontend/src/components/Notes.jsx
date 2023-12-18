import React from 'react'
import {ReactComponent as EditIcon} from "../assets/images/EditIcon.svg";
import {ReactComponent as DeleteIcon} from "../assets/images/DeleteIcon.svg";
import DescriptionBox from './DescriptionBox';
export default function Notes({note,openModal,openDelModal}) {
    return (
        <div className='p-5 bg-black  shadow-xl  border rounded-2xl '>
            <div className="flex justify-between items-center border-b p-2 bg-blue-500 text-white">
                <h2 className=''>{note.title}</h2><EditIcon className='cursor-pointer' onClick={() => openModal(note)} />
            </div>
            <DescriptionBox description={note?.description}/>
            <div className="flex justify-between items-center  p-2 text-white">
                <p className='p-2 text-white'>{note?.tag}</p>
                <DeleteIcon className='h-5 w-5 cursor-pointer' onClick={() => openDelModal(note?._id)} />
            </div>
        </div>
    )
}
