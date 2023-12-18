import React from 'react'
import {ReactComponent as HeartIcon} from "../assets/images/HeartIcon.svg";
export default function Footer() {
  return (
      <footer className="bg-blue-500 text-white bottom-0  p-[1vh] fixed w-screen  ">
        <section className="flex justify-center items-center">
            <p className="font-serif antialiased font-black lg:text-xl text-base	"></p>
                Developed With <HeartIcon className='h-5 w-5 mx-2'/> 
             By  Lucky
        </section>
    </footer>
  )
}
