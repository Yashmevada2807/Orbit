import React from 'react'

const Card = ({ title, description }) => {
    return (
        <div className='max-w-90 h-75 border border-slate-800 bg-[#0d131f] rounded-xl shadow px-6 py-8 my-2 '>
            <div className="section mx-2">
                <div className='w-15 bg-blue-950 border border-blue-900 h-15  my-2 rounded-xl'>
                </div>
                <h1 className='text-gray-300 text-2xl font-semibold font-mono py-4 '>{title}</h1>
                <p className='max-w-md text-xl text-slate-500'>
                    {description}
                </p>
            </div>
        </div>
    )
}

export default Card
