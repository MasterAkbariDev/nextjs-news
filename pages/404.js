'use client';
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='w-full h-screen flex justify-center items-center text-center'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    )
}