import React from 'react'
import orbitLogo from "../assets/Orbit-LogoOnly.png"


const li = ["Features", "How It Works", "Explore", "About"]

const Header = () => {
    return (
        <nav className='w-full flex justify-between border-b-2 border-gray-900 items-center px-7 py-3'>
            <div className="logo text-white flex items-center justify-center px-2 ">
                <img
                    src={orbitLogo}
                    alt="Orbit-Logo"
                    className='size-15 object-contain  '
                />
                <h1 className='font-sans text-3xl font-semibold'>Orbit</h1>
            </div>
            <div className="content text-white  flex justify-center items-center">
                <ul className='flex gap-18 px-4 py-2 text-xl '>
                    {
                        li.map((cont, id) => (
                            <li key={id} className='cursor-pointer  transition duration-700 hover:underline underline-offset-3 '>
                                {cont}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="button pr-8 text-white flex gap-4 justify-center items-center">
                <button className='px-4 py-2  cursor-pointer rounded-md border-slate-700 border hover:bg-slate-800 transition'>Login</button>
                <button className='px-4 py-2  cursor-pointer rounded-md  bg-indigo-600 hover:bg-indigo-500 transition'>Get Started</button>
            </div>
        </nav>
    )
}

export default Header
