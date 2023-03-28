import React from 'react'
import {Outlet} from 'react-router-dom'
import Nav from './navbar/Nav'


function RootLayout() {
  return (
    <div>
        <div className='web-container'>
            <div>
                <Nav/>
            </div>
            <div>
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default RootLayout