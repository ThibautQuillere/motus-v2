import { LetterDataType } from "../components/letter/letter";

export type GridDataMapperType = {
    gridData: LetterDataType[][];
    currentRow: number;
    word: string;
    inputValue: string;
    checkStatus?: boolean;
}

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
  return newGridData;
}