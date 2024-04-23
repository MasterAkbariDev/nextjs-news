import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Search } from 'react-bootstrap-icons'

const Input = ({ className, submit }) => {

    const [input, setInput] = useState('')
    const [isTyping, setIsTyping] = useState('')
    const router = useRouter()
    const searchInputRef = useRef(null);

    useEffect(() => {
        searchInputRef.current.blur()
    } , [router.asPath])

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          router.push(`/#search=${input}`)
        }
      };

    return (
        <div className={`flex relative border-b border-black ${className}`}>
            <label className={`absolute transition-all left-0 pl-1 duration-150 pointer-events-none ${isTyping || input ? 'top-[-10px] text-sm text-gray-600' : 'top-[5px]'}`}>Search</label>
            <input ref={searchInputRef} className='outline-none w-full px-1 py-1' value={input} onChange={(e) => setInput(e.target.value)} onFocus={() => setIsTyping(true)} onBlur={() => setIsTyping(false)} type='text' onKeyUp={handleKeyPress} />
            <Link href={`/#search=${input}`} className=''><Search size={18} /></Link>
        </div>
    )
}

export default Input