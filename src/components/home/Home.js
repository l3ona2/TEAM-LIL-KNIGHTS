import React from 'react'
import Ncar from './carousel';
import Footer from '../footer/Footer';
import './home.css'
function Home() {
  return (
  <div className='tan w-100'>   
      <div>
        <Ncar/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home;