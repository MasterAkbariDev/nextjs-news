import Dropdown from '@/components/Dropdown/Dropdown'
import Slidebar from '@/components/Slidebar/Slidebar'
import Link from 'next/link'
import React, { useState } from 'react'

const Nav = ({ data , setSidebar }) => {

  const [dropdown, setDropdown] = useState('')

  return (
    <nav className='flex justify-between border-gray-400 border-b bg-white shadow-lg px-3 z-40'>
      <div className='flex'>
      <div className='lg:hidden'>
        <Slidebar setSidebar={setSidebar} >
          <ul className='flex flex-col px-5'>
            {data?.map((item, index) => {
              return item.dropdown ? (
                <Dropdown key={index} currentDropdown={dropdown} setCurrentDropdown={setDropdown} buttonText={item.name} nav buttonClassname={`font-ProtestStrike text-lg py-3 relative`}>
                  <ul className='w-full h-full flex flex-col flex-wrap'>
                    {item.dropdown.map((item2, index2) => {
                      return <li className='h-fit w-fit' key={index2}><Link className='font-ProtestStrike text-lg block w-full h-full px-3 py-3' href={item2.link}>{item2.name}</Link></li>
                    })}
                  </ul>
                </Dropdown>
              ) : <li key={index}><Link className={`hover:opacity-60 font-ProtestStrike transition-all duration-300 relative block text-lg py-3`} href={item.link}>{item.name}</Link></li>
            })}
          </ul>
        </Slidebar>
      </div>
        <Link href='/' className='font-ProtestStrike text-2xl flex items-center'>My News</Link>
        <ul className='hidden lg:flex lg:ml-5'>
          {data?.map((item, index) => {
            return item.dropdown ? (
              <Dropdown key={index} currentDropdown={dropdown} setCurrentDropdown={setDropdown} buttonText={item.name} nav bigScreen buttonClassname={`font-ProtestStrike text-lg px-5 py-3`}>
                <ul className='w-full h-full flex flex-col flex-wrap'>
                  {item.dropdown.map((item2, index2) => {
                    return <li className='h-fit w-fit' key={index2}><Link className='hover:opacity-60 font-ProtestStrike transition-all duration-300 text-lg block w-full h-full px-3 py-3' href={item2.link}>{item2.name}</Link></li>
                  })}
                </ul>
              </Dropdown>
            ) : <li key={index}><Link className={`hover:opacity-60 font-ProtestStrike transition-all duration-300 relative block text-lg px-5 py-3`} href={item.link}>{item.name}</Link></li>
          })}
        </ul>
      </div>
    </nav>
  )
}

export default Nav