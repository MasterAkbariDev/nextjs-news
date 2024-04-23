import React, { useEffect, useState } from 'react'
import Input from '../Input/Input'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Topbar = ({ className, setFilter }) => {

  const Radios = ['Latest', 'Hottest']
  const router = useRouter()
  const [currentFilter, setCurrentFilter] = useState('')

  useEffect(() => {
    setCurrentFilter('')
    const urlParams = new URLSearchParams(window.location.hash.substring(1))
    const filter = urlParams.get('filter')
    if (filter) {
      setCurrentFilter(filter)
      setFilter(filter)
    }
  }, [router.asPath , router.query])

  return (
    <div className={`flex flex-col ${className}`}>
      <div className='shadow-xl rounded-lg flex flex-col md:flex-row items-center overflow-hidden px-4 md:p-0 md:justify-between'>
        <div className='w-full hidden md:flex h-full md:w-1/2 items-center'>
          {Radios.map((item, index) => {
            return (
              <Link key={index} href={`${router.query.category ? router.query.category : '/'}#filter=${item}`} className={`cursor-pointer py-3 px-4 transition-all duration-150 ${currentFilter === item ? 'bg-gray-700 text-white' : ''}`}>
                <label className='cursor-pointer'>
                  <input className='hidden' type='radio' value={item} name='Topbar-radio' />
                  <span className='font-JosefinSans font-bold'>{item}</span>
                </label>
              </Link>
            )
          })}
        </div>
        <div className='w-full md:w-1/4 flex justify-end mr-3 py-2'>
          <Input className={'w-full'} />
        </div>
      </div>
      <div className='w-full w-max self-center mt-10 md:hidden h-full md:w-1/2 flex items-center shadow-xl rounded-lg overflow-hidden'>
        {Radios.map((item, index) => {
          return (
            <Link key={index} href={`${router.query.category ? router.query.category : '/'}#filter=${item}`} className={`cursor-pointer py-3 px-4 transition-all duration-150 ${currentFilter === item ? 'bg-gray-700 text-white' : ''}`}>
              <label className='cursor-pointer'>
                <input className='hidden' type='radio' value={item} name='Topbar-radio' />
                <span className='font-JosefinSans font-bold'>{item}</span>
              </label>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Topbar