import React from 'react'

const Header = () => {

  return (
    <>
        <div className='h-[100px] w-full bg-amber-100 flex justify-center items-center gap-7'>
            <button className='px-1 border text-2xl bg-amber-50'>Home</button>
            <button className='px-1 border text-2xl  bg-amber-50'>Wishlist</button>
        </div>
    </>
  )
}

export default Header