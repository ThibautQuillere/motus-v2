import Grid from '../grid/grid';
import React, { useState, useEffect, useRef } from 'react';
import { remapGridData, rowTemplate } from '../../helpers/gridData';

export default function Wrapper() {
  const word = "maman";
  const wordLength = word.length;
  const [inputValue, setInputValue] = useState('')
  const [currentRow, setCurrentRow] = useState(0);
  const [rows, setRows] = useState(Array.from(Array(6).keys()));
  const [wordData, setWordData] = useState(Array.from(Array(wordLength).keys()));
  const input = useRef<HTMLInputElement>(null)
  const [gridData, setGridData] = useState(rows.map((row, index) => rowTemplate({
    rowIndex: index,
    wordData,
    currentRow,
    word
  })))
  
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>):void => {
    const newInputValue = event.currentTarget.value;
    setInputValue(newInputValue);
    setGridData(remapGridData({
      gridData,
      currentRow,
      word,
      inputValue: newInputValue,
    }));
  }

  const handleSubmit = (event:React.SyntheticEvent):void => {
    event.preventDefault();
    setGridData(remapGridData({
      gridData, 
      currentRow,
      word, 
      inputValue, 
      checkStatus: true
    }));
    setCurrentRow(currentRow => currentRow + 1)
    if(input.current){ 
      input.current.value = ''
    }
    
  }

  return <div className='wrapper'>
    <Grid gridData={gridData} />
    <form onSubmit={handleSubmit} >
      <input type="text" id="name" name="name" ref={input} onChange={handleChange} maxLength={wordLength} minLength={wordLength}/>
    </form>
  </div>
}