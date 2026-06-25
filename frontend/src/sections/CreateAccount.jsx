import React from 'react'

const CreateAccount = () => {
    return (

        <div className='w-6xl border border-blue-950 bg-[#110f2d] flex gap-8 px-14 py-10 rounded-2xl  justify-between'>
            <div className="left px-4">
                <h1 className='text-4xl text-white py-1'>Ready to build your next Project?</h1>
                <h1 className='text-xl text-slate-400 py-1'>Join thousands of developers using Orbit</h1>
            </div>
            <div className="right ">
                <button
                    className='text-2xl cursor-pointer text-white rounded-lg bg-indigo-600 hover:bg-indigo-700 transition py-5 px-14 text-center font-semibold'
                >
                    Create Account
                </button>
            </div>
        </div>
    )
}

export default CreateAccount
