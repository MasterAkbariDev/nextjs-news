import React, { useEffect, useState } from 'react'
import Nav from '@/components/header/Nav/Nav'
import NavItems from '@/data/NavItems'

const Header = () => {

  const [showHeader, setShowHeader] = useState(true)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [isSidebarOpen, setSidebar] = useState(false)


  useEffect(() => {
    if (!isSidebarOpen) {
      const scrollHandler = () => {
        const currentScroll = window.scrollY
        if (currentScroll > prevScrollY) {
          setShowHeader(false)
        } else {
          setShowHeader(true)
        }
        setPrevScrollY(currentScroll)
      }

      window.addEventListener('scroll', scrollHandler)
      return () => {
        window.removeEventListener('scroll', scrollHandler)
      }
    }
  }, [prevScrollY , isSidebarOpen])

  return (
    <div className={`w-full sticky top-0 z-50 transition duration-200 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <Nav setSidebar={setSidebar} data={NavItems} />
    </div>
  )
}

export default Header