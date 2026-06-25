import React from 'react'
import Header from '../sections/Header'
import Info from '../sections/Info'
import Overview from '../sections/Overview'
import HowItWorks from '../sections/HowItWorks'
import CreateAccount from '../sections/CreateAccount'

const Landing = () => {
  return (
    <div className='flex flex-col  justify-center'>
      <Header/>
      <Info/>
      <Overview/>
      <HowItWorks/>
      <div className='py-10 mt-12 px-7 flex justify-center items-center'>
      <CreateAccount/>
      </div>
    </div>
  )
}

export default Landing
