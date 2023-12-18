import React, { useState } from 'react'

export default function DescriptionBox({description}) {

    const [isTruncated, setIsTruncated] = useState(true);
    const resultString = isTruncated ? description.slice(0, 250) + '...' : description;
    return (
        <p className=' border-b p-2 text-white'>{resultString}<button onClick={() => setIsTruncated(!isTruncated)} className="mx-2 text-base text-red-500 cursor-pointer">
          {isTruncated ? 'View More' : 'View Less'}
        </button></p>
        
    );
}
