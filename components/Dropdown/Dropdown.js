import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { ChevronDown } from 'react-bootstrap-icons'

const Dropdown = ({ className, children, bigScreen, buttonClassname, nav, buttonText, currentDropdown, setCurrentDropdown }) => {

    const [active, setActive] = useState(false)
    const [smActive, setSmActive] = useState(false)

    const router = useRouter()

    useEffect(() => {
      setActive(false)
      setSmActive(false)
    } , [router.asPath])

    useEffect(() => {
        if (active) {
            setCurrentDropdown(buttonText)
        }
    }, [active])

    useEffect(() => {
        if (active && currentDropdown !== buttonText) {
            setActive(false)
        }
    }, [currentDropdown])

    return (
        nav ? (
            bigScreen ? (
                <div className={`${className}`} >
                    <button className={`pointer ${active ? 'before:h-[10px]' : 'before:h-[5px]'} before:transition-all before:duration-300 before:w-[2px] before:bg-gray-700 before:absolute before:left-1/2 before:top-[90%] before:content-[''] relative ${buttonClassname}`} onMouseEnter={() => setActive(true)} >{buttonText}</button>
                    <div className={`absolute top-[110%] left-0 right-0 mx-auto block w-[90%] h-[400px] overflow-hidden bg-white shadow-lg transition duration-300 -translate-y-5 rounded p-3 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none'}`} onMouseLeave={() => setActive(false)} >
                        {children}
                    </div>
                </div>
            ) : (
                <div className={`flex flex-col overflow-hidden ${className}`} >
                    <button className={`pointer flex items-center ${buttonClassname}`} onClick={() => setSmActive(!smActive)} >{buttonText} <span className={`px-3 transition-all duration-300 ${smActive ? 'rotate-180' : 'rotate-0'}`}><ChevronDown size={12} /></span></button>
                    <div className={`block pb-3 ${smActive ? 'block' : 'hidden'}`} >
                        {children}
                    </div>
                </div>
            )
        ) : ''
    )
}

export default Dropdown