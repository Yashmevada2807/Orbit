import React from 'react'
import orbitLogo from "../assets/Orbit-LogoOnly.png"


const li = ["Features", "How It Works", "Explore", "About"]

const Header = () => {
    return (
        <nav className='bg-none w-full flex justify-between border-b-2 border-gray-900 items-center px-3 '>
            <div className="logo text-white flex items-center justify-center  px-2 ">
                <img
                    src={orbitLogo}
                    alt="Orbit-Logo"
                    className='size-15 object-contain  '
                />
                <h1 className='font-sans text-2xl font-semibold'>Orbit</h1>
            </div>
            <div className="content text-white  flex justify-center items-center">
                <ul className='flex gap-18 px-4 py-2 text-xl '>
                    {
                        li.map((cont, id) => (
                            <li key={id} className='cursor-pointer'>
                                {cont}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="button text-white flex gap-4 justify-center items-center">
                <button className='px-4 py-2  cursor-pointer rounded-md border-gray-600 border-2'>Login</button>
                <button className='px-4 py-2  cursor-pointer rounded-md border-blue-900 border-2 bg-blue-800'>Get Started</button>
            </div>
        </nav>
    )
}

export default Header
