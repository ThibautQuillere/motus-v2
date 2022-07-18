import Grid from '../grid/grid';
import React, { useState, useEffect } from 'react';
import { remapGridData } from '../../helpers/gridData';


export default function Wrapper() {
  const word = "maman";
  const wordLength = word.length;
  const [inputValue, setInputValue] = useState('')
  const [currentRow, setCurrentRow] = useState(0);
  // const [inputData, setInputData] = useState(Array.from(inputValue).map((item:string) => ({character: item , status: ''})));
  const [rows, setRows] = useState(Array.from(Array(6).keys()));
  const [wordData, setWordData] = useState(Array.from(Array(wordLength).keys()));
  const rowTemplate = wordData.map((item, index) => ({character: index === 0 ? word[0] : '.', status: ''}));
  const [gridData, setGridData] = useState(rows.map(() => rowTemplate))

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
  }

  return <div className='wrapper'>
    <Grid gridData={gridData} />
    <form onSubmit={handleSubmit} >
      <input type="text" id="name" name="name" onChange={handleChange} maxLength={wordLength} minLength={wordLength}/>
    </form>
  </div>
}