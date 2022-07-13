import Grid, {wordLength} from '../grid/grid';
import React, { useState } from 'react';

export default function Wrapper() {
  const [input, setWord] = useState('')

  const handleChange = (event:any):void => {
    setWord(event.target.value)
    
  }

  const handleSubmit = (event:any):void => {
    event.preventDefault();
    console.log(input)
  }

  return <div className='wrapper'>
    <Grid input={input} />
    <form onSubmit={handleSubmit} >
      <input type="text" id="name" name="name" onChange={handleChange} maxLength={wordLength} minLength={wordLength}/>
    </form>
  </div>
}