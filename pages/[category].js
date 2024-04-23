import Card from '@/components/Card/Card'
import MainLayout from '@/components/MainLayout'
import Sidebar from '@/components/Sidebar/Sidebar'
import Topbar from '@/components/Topbar/Topbar'
import Posts from '@/data/Posts'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import '@/app/globals.css'
import Container from '@/components/Container/Container'

const category = () => {


    const router = useRouter()
    const [allPosts, setAllPosts] = useState(Posts)
    const [filterBy, setFilterBy] = useState(Posts)
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

        const filteredPosts = Posts.filter(post => post.mainCategory.includes(router.query.category) || post.categories.includes(router.query.category));
        setAllPosts(filteredPosts)

    }, [router.query])

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.hash.substring(1))
        const filter = urlParams.get('filter')
        if (filter) {
            if (filter === 'Latest') {
                setAllPosts(allPosts.slice().sort((a, b) => {
                    const dateA = new Date(a.time)
                    const dateB = new Date(b.time)
                    if (dateA > dateB) {
                        return -1
                    } else if (dateA < dateB) {
                        return 1
                    } else {
                        return 0
                    }
                }))
            }
            if (filter === 'Hottest') {
                setAllPosts(allPosts.slice().sort((a, b) => {
                    const PostA = a.visits
                    const PostB = b.visits
                    if (PostA > PostB) {
                        return -1
                    } else if (PostA < PostB) {
                        return 1
                    } else {
                        return 0
                    }
                }))
            }
        }
    }, [router.asPath])


    return (
        <MainLayout>
            <Container>
                <div>
                    <Topbar setFilter={setFilterBy} className='w-full' />
                    <div className='flex flex-col lg:flex-row mt-2'>
                        <Sidebar className='lg:w-1/4 w-full h-max pb-16 shadow-xl py-3 px-2 my-4 rounded-lg'>
                            <h1 className='font-JosefinSans text-2xl border-b mb-4'>Latest News</h1>
                            {newestPosts.map((item, index) => {
                                return <Card small key={index} className='mb-3' categoryLink={`/${item.mainCategory}`} link={`/Post/${item.title}#id=${item.id}`} img={item.img} title={item.title} category={item.mainCategory} time={item.time} >{item.previewDescription}</Card>
                            })}
                        </Sidebar>
                        <div className='lg:w-2/4 w-full lg:mx-5 shadow-xl rounded-lg px-3 py-5'>
                            {allPosts.length > 0 ? (
                                allPosts.map((item, index) => {
                                    return <Card key={index} className='mb-5' categoryLink={`/${item.mainCategory}`} link={`/Post/${item.title}#id=${item.id}`} img={item.img} title={item.title} category={item.mainCategory} time={item.time} >{item.previewDescription}</Card>
                                })
                            ) :
                                (
                                    <div className='text-center w-full mt-5'><h1 className='text-4xl'>There is no News here...</h1></div>
                                )}
                        </div>
                        <Sidebar className='lg:w-1/4 w-full h-max pb-16 shadow-xl py-3 px-2 my-4 hidden lg:block rounded-lg'>
                            <h1 className='font-JosefinSans text-2xl border-b mb-4'>Most Visited</h1>
                            {mostVisitedPosts.map((item, index) => {
                                return <Card small key={index} className='mb-3' categoryLink={`/${item.mainCategory}`} link={`/Post/${item.title}#id=${item.id}`} img={item.img} title={item.title} category={item.mainCategory} time={item.time} >{item.previewDescription}</Card>
                            })}
                        </Sidebar>
                    </div>
                </div>
            </Container>
        </MainLayout>
    )
}

export default category