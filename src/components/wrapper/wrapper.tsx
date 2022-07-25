import Grid from '../grid/grid';
import React, { useState, useEffect, useCallback } from 'react';
import { remapGridData, rowTemplate } from '../../helpers/gridData';
import { LetterDataType } from '../letter/letter';

const serverUrl = 'https://motus.ew-staging.com';
export const Endpoints = {
  word: `${serverUrl}/word`, // GET - initial data (word length, first letter)
  attempt: `${serverUrl}/attempt`, // POST - check if word is correct 
  checkWord: `${serverUrl}/check-word`, // POST - check if word exists
};

export default function Wrapper() {

  const [currentRow, setCurrentRow] = useState(0);
  const [gridData, setGridData] = useState<LetterDataType[][]>([[]]);
  const [wordLength, setWordLength] = useState(0)
  const [newInputValue, setNewInputValue] = useState('');

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    console.log('handleKeyDown newInputValue ===>', newInputValue);
    console.log('event ===>', event);

    let rawInput = newInputValue;
    /*
      Event : Press key between A to Z
      Action : add character to newInputValue
    */
    if (event.keyCode > 64 && event.keyCode < 91) {
      if (newInputValue.length < wordLength ) {      
        console.log('event.key ===>', event.key);
        rawInput = rawInput + event.key;
        // setNewInputValue((prevInputValue) => prevInputValue += event.key)
      }
    }

    /*
      Event : Press key BACKSPACE
      Action : Supp last character of newInputValue
    */
    if (event.keyCode === 8) {
      rawInput = rawInput.substring(0, rawInput.length-1);
     // setNewInputValue((prevInputValue) => prevInputValue.substring(0, prevInputValue.length-1))
    }

    /*
      Event : Press key between ENTER
      Action : Coparison betwen newInputValue and the word
    */
    if (event.keyCode === 13) {
      rawInput = newInputValue;
      if (rawInput.length === wordLength) {
        setGridData(remapGridData({
          gridData,
          currentRow,
          inputValue: rawInput,
          checkStatus: true
        }));
        setCurrentRow(currentRow => currentRow + 1)
        setNewInputValue('')
      }
    }
    setGridData(remapGridData({
      gridData,
      currentRow,
      inputValue: rawInput,
      checkStatus: false
    }));
    console.log(rawInput);
    setNewInputValue(rawInput);
  }, [newInputValue]);
  
  useEffect(() => {
    
    document.addEventListener('keydown', handleKeyDown);

    fetch(Endpoints.word).then(response => {
      if(response.ok){
        return response.json()
      }
    }).then(json => {
      const rows = Array.from(Array(6).keys());
      const lettersNumber = json.data.cols;
      const newGridData = rows.map((row, index) => rowTemplate({
        rowIndex: index,
        row: Array.from(Array(lettersNumber).keys()),
        currentRow,
        firstLetter: json.data.firstLetter,
      }));
      setGridData(newGridData);
      setWordLength(lettersNumber);
    })
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  

  useEffect(() => {
    console.log('WordLength',wordLength)
    console.log('newInputValue',newInputValue)
  }, [wordLength, newInputValue])
  
  return <div className='wrapper'>
    { wordLength > 0 &&
        <Grid gridData={gridData}/>
    }
    </div>
}