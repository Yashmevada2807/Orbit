import React from 'react'

const Info = () => {
  return (
    <div className='text-white  w-full px-6 pt-18 flex '>
      <div className='  px-6 py-1 w-1/2  '>
        <p className='rounded-md border-2 border-blue-950 w-fit px-4 py-1 text-lg font-bold text-blue-800 font-sans'>Build For Developers, By Developers</p>
        <div className='text-8xl tracking-tight leading-none py-6'>
          <h1 className="">Build Together</h1>
          <h1 className="text-blue-800">Ship Faster</h1>
        </div>
        <p
          className=' text-3xl leading-9 tracking-tight text-slate-400 my-3'
        >Orbit is the developer collaboration platform
          <br />
          that helps teams build, manage and ship
          <br />
          amazing software projects
        </p>
        <div className="btns flex gap-5 mt-8 ">
          <button
            className="px-8 py-4 rounded-lg bg-indigo-600 text-white text-md cursor-pointer font-medium  hover:bg-indigo-500 transition"

          >
            Get Started
          </button>
          <button
            className="px-8 py-4 rounded-lg border border-slate-700 text-slate-300 text-md cursor-pointer font-medium hover:bg-slate-800 transition "
          >
            Explore Workspace
          </button>
        </div>
      </div>
      <div className=' px-5 py-2 w-1/2 flex justify-center items-center '>
        <h1>This is Right Side</h1>
      </div>
    </div>
  )
}

export default Info
