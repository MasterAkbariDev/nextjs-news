import Card from '@/components/Card/Card'
import Container from '@/components/Container/Container'
import MainLayout from '@/components/MainLayout'
import Sidebar from '@/components/Sidebar/Sidebar'
import Posts from '@/data/Posts'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import Link from 'next/link'

const Post = () => {


    const router = useRouter()
    const [post, setPost] = useState({})
    const [newestPosts, setNewestPosts] = useState([])
    const [mostVisitedPosts, setMostVisitedPosts] = useState([])

    useEffect(() => {
        setNewestPosts(Posts.slice().sort((a, b) => {
            const dateA = new Date(a.time)
            const dateB = new Date(b.time)
            if (dateA > dateB) {
                return -1
            } else if (dateA < dateB) {
                return 1
            } else {
                return 0
            }
        }).slice(0, 5))
        setMostVisitedPosts(Posts.slice().sort((a, b) => {
            const PostA = a.visits
            const PostB = b.visits
            if (PostA > PostB) {
                return -1
            } else if (PostA < PostB) {
                return 1
            } else {
                return 0
            }
        }).slice(0, 5))

    }, [])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1))
        const id = urlParams.get('id')

        const FindPost = Posts.find(item => {
            return item.id == id
        })
        setPost(FindPost)
    }, [router.asPath])


    return (
        <MainLayout>
            <Container>
                <div>
                    <div className='flex flex-col lg:flex-row mt-2'>
                        <Sidebar className='lg:w-1/4 w-full h-max pb-16 shadow-xl py-3 px-2 my-4 rounded-lg'>
                            <h1 className='font-JosefinSans text-2xl border-b mb-4'>Latest News</h1>
                            {newestPosts.map((item, index) => {
                                return <Card small key={index} className='mb-3' categoryLink={`/${item.mainCategory}`} link={`/Post/${item.title}#id=${item.id}`} img={`../${item.img}`} title={item.title} category={item.mainCategory} time={item.time} >{item.previewDescription}</Card>
                            })}
                        </Sidebar>
                        <div className='lg:w-2/4 h-max w-full lg:mx-5 shadow-xl rounded-lg px-3 py-5'>
                            <div className='relative w-full h-full overflow-hidden'>
                                <img className='w-full h-full object-cover object-center transition-all duration-800 hover:scale-110' src={`../${post.img}`} />
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex my-2'>
                                    <Link className='text-sky-700' href={`/${post.mainCategory}`}>{post.mainCategory}</Link>
                                    <span className='mx-3 cursor-default'>/</span>
                                    <span className='cursor-default'>{post.time}</span>
                                </div>
                                <h1 className='text-3xl '>
                                    {post.title}
                                </h1>
                                <div className='text-gray-600 text-md mt-3'>
                                    <p>{post.description}...</p>
                                </div>
                                <div className='mt-5'>
                                    {post.categories?.map((item , index) => {
                                        return <Link className='mr-4 text-sky-700' key={index} href={`/${item}`}>#{item}</Link>
                                    })}
                                </div>
                            </div>
                        </div>
                        <Sidebar className='lg:w-1/4 w-full h-max pb-16 shadow-xl py-3 px-2 my-4 hidden lg:block rounded-lg'>
                            <h1 className='font-JosefinSans text-2xl border-b mb-4'>Most Visited</h1>
                            {mostVisitedPosts.map((item, index) => {
                                return <Card small key={index} className='mb-3' categoryLink={`/${item.mainCategory}`} link={`/Post/${item.title}#id=${item.id}`} img={`../${item.img}`} title={item.title} category={item.mainCategory} time={item.time} >{item.previewDescription}</Card>
                            })}
                        </Sidebar>
                    </div>
                </div>
            </Container>
        </MainLayout>
    )
}

export default Post