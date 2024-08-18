import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'

export default function SearchBar() {
  const [text , setText] = useState() ; 
  const [currFocus , setCurrFocus] = useState(0) ; 

  // This has to be implemented
  const handleClick = ()=>{

  }
  return (
    <div className='search-bar' >
      <input type="text" 
        
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder='Search Contacts .....'
        onFocus={()=>setCurrFocus(!currFocus)}
        onBlur={()=> setCurrFocus(!currFocus)}
      />
      <FontAwesomeIcon onClick={handleClick} className='search' icon={faMagnifyingGlass} />

    </div>
  )
}
