import Link from 'next/link'
import React from 'react'

const Card = ({ className, children, title, img, link, time, category, categoryLink, small }) => {
    return (
        small ? (
            <div className={`flex relative w-full h-max overflow-hidden ${className} `}>
                <div className='relative w-1/2 h-full overflow-hidden'>
                    <img className='w-full h-full object-cover object-center transition-all duration-800 hover:scale-110' src={img} />
                </div>
                <div className='flex flex-col w-full ml-3'>
                    <div className='flex mb-2'>
                        <Link className='text-sky-700' href={categoryLink}>{category}</Link>
                        <span className='mx-3 cursor-default'>/</span>
                        <span className='cursor-default'>{time}</span>
                    </div>
                    <Link className='text-3xl transition-all duration-300 hover:text-sky-700' href={link}>
                        {title}
                    </Link>
                </div>
            </div>
        ) : (
            <div className={`flex flex-col relative w-full h-max overflow-hidden ${className}`}>
                <div className='relative w-full h-full overflow-hidden'>
                    <img className='w-full h-full object-cover object-center transition-all duration-800 hover:scale-110' src={img} />
                </div>
                <div className='flex flex-col'>
                    <div className='flex my-2'>
                        <Link className='text-sky-700' href={categoryLink}>{category}</Link>
                        <span className='mx-3 cursor-default'>/</span>
                        <span className='cursor-default'>{time}</span>
                    </div>
                    <Link className='text-3xl transition-all duration-300 hover:text-sky-700' href={link}>
                        {title}
                    </Link>
                    <div className='text-gray-600 text-md mt-3'>
                        <p>{children}...</p>
                    </div>
                </div>
            </div>
        )
    )
}

export default Card