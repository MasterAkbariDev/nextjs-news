import React from 'react'

const Container = ({children}) => {
  return (
    <div className='lg:mx-16 md:mx-8 mx-4 flex justify-center md:block  my-8 h-[1500px]'>{children}</div>
  )
}

export default Container