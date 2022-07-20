import { LetterDataType } from "../components/letter/letter";

export type GridDataMapperType = {
    gridData: LetterDataType[][];
    currentRow: number;
    word: string;
    inputValue: string;
    checkStatus?: boolean;
}

export type RowTemplateType = {
    rowIndex: number;
    wordData: number[];
    currentRow: number;
    word: string
}

export const rowTemplate = ({
    rowIndex,
    wordData,
    currentRow,
    word,
}:RowTemplateType):LetterDataType[] => wordData.map((item, index) => {
    let character = '';
    if(rowIndex === currentRow) {
      character = '.';
      if(index === 0) {
        character = word[0];
      }
    }
    return {
      character,
      status: ''}
  });

export function remapGridData ({
  currentRow, 
  gridData,
  word, 
  inputValue, 
  checkStatus = false,
}:GridDataMapperType):LetterDataType[][] {

  const newRowData = gridData[currentRow].map((letterObject, index) => {
    const letterExists = word.indexOf(inputValue[index]) > -1;
    const letterValid = inputValue[index] === word[index];
    let character = '.';
    let status = '';

    if(checkStatus) {
      if(letterExists) {
        status = 'exists';
      }
      if(letterValid) {
        status = 'valid';
      }
    }

    if(index === 0 && typeof inputValue[index] === 'undefined') {
      character = word[0];
    }

    if(inputValue[index]) {
      character = inputValue[index];
    }
    
    return {
      character,
      status,
    }
  }); 
  
  const newGridData = [...gridData];
  newGridData[currentRow] = newRowData;
  if(checkStatus && currentRow < 5) {
    if(word === inputValue) {
        alert('KELAWIN')
    } else {
        newGridData[currentRow+1] = rowTemplate({
        rowIndex: currentRow,
        word,
        wordData: Array.from(Array(word.length).keys()),
        currentRow,
        });
    }
    
  }
  if(checkStatus && currentRow ===5) {
    alert('NUL')
  }
  
  return newGridData;
}