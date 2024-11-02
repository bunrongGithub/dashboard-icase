import Link from 'next/link'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='w-full h-[80px] bg-slate-100 py-[20px]'>
      <div className='w-[1400px] m-auto text-gray-900 h-full flex items-center justify-between px-[30px]'>
        <div className='flex items-center'>
          <h1 className='font-heading text-[50px]'>Icase</h1>
          <ul className='flex items-center justify-between'>
            <Link href={'/'} className='px-[20px] mx-3'>Home</Link>
            <li className='px-[20px] mx-3 rounded-[2px]'>Sales</li>
            <li className='px-[20px] mx-3 rounded-[2px]'>Buy</li>
            <li className='px-[20px] mx-3 rounded-[2px]'>About Us</li>
          </ul>
        </div>
        <div className='flex items-center bg-white rounded-md w-[400px] border'>
          <input
            className='bg-transparent rounded-l-md px-4 outline-none w-full'
            type="text"
            placeholder='Search...'
          />
          <button className='bg-[#FB2E86] text-white px-4 py-3 rounded-r-md'>
            <FaSearch />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar