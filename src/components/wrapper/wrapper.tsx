import Grid from '../grid/grid';
import React, { useState, useEffect, useCallback,} from 'react';
import { remapGridData, rowTemplate} from '../../helpers/gridData';
import { LetterDataType } from '../letter/letter';
import { isWordExist } from '../../helpers/testWord';

const serverUrl = 'https://motus.ew-staging.com';
export const Endpoints = {
  word: `${serverUrl}/word`, // GET - initial data (word length, first letter)
  attempt: `${serverUrl}/attempt`, // POST - check if word is correct 
  checkWord: `${serverUrl}/check-word`, // POST - check if word exists
};

export default function Wrapper() {

  const [currentRow, setCurrentRow] = useState(0);
  const [gridData, setGridData] = useState < LetterDataType[][] > ([
    []
  ]);
  const [wordLength, setWordLength] = useState(0);
  const [firstLetter, setFirstLetter] = useState('');
  const [newInputValue, setNewInputValue] = useState('');

  const handleKeyDown = useCallback((event: KeyboardEvent) => {

    let rawInput = newInputValue;
    if (event.keyCode != 13) {
      /*
        Event : Press key between A to Z
        Action : add character to newInputValue
      */
      if (event.keyCode > 64 && event.keyCode < 91) {
        if (newInputValue.length < wordLength) {
          rawInput = rawInput + event.key;
        }
      }

      /*
        Event : Press key BACKSPACE
        Action : Supp last character of newInputValue
      */
      if (event.keyCode === 8) {
        rawInput = rawInput.substring(0, rawInput.length - 1);
      }
      setGridData(remapGridData({
        gridData,
        currentRow,
        inputValue: rawInput,
        checkStatus: false,
        firstLetter,
      }));
    }

    /*
      Event : Press key between ENTER
      Action : Coparison betwen newInputValue and the word
    */
    if (event.keyCode === 13) {
      rawInput = newInputValue;
      if (rawInput.length === wordLength) {
        let exist = isWordExist(newInputValue)
        if(exist) {
          setGridData(remapGridData({
            gridData,
            currentRow,
            inputValue: rawInput,
            checkStatus: true,
            firstLetter,
          }));
          setCurrentRow(currentRow => currentRow + 1);
          setNewInputValue('');
          rawInput = '';
        } else {
          alert('mot introuvable')
        }
      }
    }
    setNewInputValue(rawInput);

  }, [gridData, wordLength, newInputValue, setNewInputValue, setGridData])

  useEffect(() => {

    fetch(Endpoints.word).then(response => {
      if (response.ok) {
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
      setFirstLetter(json.data.firstLetter)
    })

  }, []);

  useEffect(() => {

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }

  }, [newInputValue, gridData, wordLength])

  return <div className='wrapper'> {
    wordLength > 0 &&
    <Grid gridData = { gridData }/>
    } 
  </div>
}