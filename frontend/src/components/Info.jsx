import React from 'react'

const Info = () => {
  return (
    <div className='text-white border w-full px-6 pt-18 flex '>
      <div className=' px-5 py-2 w-1/2 border'>
        <p className='rounded-md border-2 border-blue-950 w-fit px-4 py-1 text-lg font-bold text-blue-800 font-sans'>Build For Developers, By Developers</p>
        <h1 className = "text-8xl ">Build Together</h1>
        <h1 className = "text-8xl ">Ship Faster</h1>

      </div>
      <div className=' px-5 py-2 w-1/2 flex justify-center items-center border'>
        <h1>This is Right Side</h1>
      </div>
    </div>
  )
}

export default Info
