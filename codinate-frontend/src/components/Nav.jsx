import React from 'react'
import { navLinks } from '../constants'
import Button from './Button'
import Forms from '../sections/Forms'

const Nav = ({setshowModalLogin}) => {
  return (
    <header className='px-8 bg-[#212121] border-b-2 rounded-b-3xl border-cyan-300 shadow-cyan-500 shadow-xl py-8 w-full'>
      <nav className=' flex justify-between item-center max-container'>
      <a href="/"><h1 className='text-center text-4xl font-bold text-white'>Cod<span className=' text-cyan-400'>inate</span></h1></a>
        <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
        {navLinks.map((items)=>{
          return(
          <li key={items.label}>
            <a href={items.href} className='font-montserrat leading-normal text-white text-lg hover:text-slate-300'>{items.label}</a>
          </li>)
        })} 
        </ul>

        <Button className='bg-[#F5F7F8] w-24 rounded-lg hover:bg-slate-300 text' label="Signin" setshowModal={setshowModalLogin}></Button>
      </nav>
    </header>
  )
}

export default Nav
