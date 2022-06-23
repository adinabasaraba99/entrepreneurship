import React from 'react'
import image from '../../assets/img/bottomrightimage.svg'
import Center from './Center'
import Sidebar from './Sidebar'

function Home() {
  return (
    <div>
      <img src={image} alt='img' className={'bg-img'}/>
      
      <main className='d-flex'>
        <div className='col-2'>
          <Sidebar />
        </div>
        <div className='col-10 float-right'>
          <Center />
        </div>
      </main>
  </div>
  )
}

export default Home