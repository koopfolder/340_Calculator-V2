import React from 'react';

export default function VzeroCalculator() {
    return (
        <div className="bg-white px-6 pt-10 pb-8 w-96 shadow-xl ring-1 ring-gray-900/5 rounded-lg">
            <div className="bg-[#EBB3C2] flex items-center justify-end pr-4 shadow-xl h-10 m-1 rounded-lg">
                <p className='text-white'>Display screen result</p>
            </div>
            <div className='sqBtn'>
                <p className='bg-[#D9F8FF] flex flex-col justify-center shadow-xl w-10 h-10 m-1 rounded-lg'>AC</p>
                <p className='bg-[#D9F8FF] flex flex-col justify-center shadow-xl w-10 h-10 m-1 rounded-lg'>AC</p>
            </div>
        </div>
    )
}
