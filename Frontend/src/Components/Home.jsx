import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate() ; 
  const handleClick = (e)=>{
    navigate('/login')
  }

  return (
    <div className='home-div' >
        <div className='inner-div' >
            <div className='overlay-cont' ></div>
            <div className='content-cont' >
              <div className="helper">
                
                <h1 className='' >Save all your Contacts in the cloud and access them from anywhere</h1>
                <div className=''>
                  <button onClick={handleClick} >Login</button>
                  <button>Features</button>

                </div>
              </div>
            </div>

        </div>
    </div>
  )
}
