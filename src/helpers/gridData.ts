import { LetterDataType } from "../components/letter/letter";

export type StatusMapperType = {
  gridData: LetterDataType[][];
  currentRowIndex: number;
  currentRowData: LetterDataType[]
}

export type GridDataMapperType = {
  gridData: LetterDataType[][];
  currentRow: number;
  inputValue: string;
  checkStatus?: boolean;
  firstLetter: string;
}

export type RowTemplateType = {
  rowIndex: number;
  row: number[];
  currentRow: number;
  firstLetter: string;
}

export function remapStatus ({
  gridData,
  currentRowIndex,
  currentRowData,
}:StatusMapperType):LetterDataType[][] {
  const newGridData = [...gridData];
  newGridData[currentRowIndex] = currentRowData;
  return newGridData
}

export const rowTemplate = ({
  rowIndex,
  row,
  currentRow,
  firstLetter,
}:RowTemplateType):LetterDataType[] => row.map((item, index) => {
  let character = '';
  if(rowIndex === currentRow) {
    character = '.';
    if(index === 0) {
      character = firstLetter;
    }
  }
  return {
    character,
    status: ''
  }
});



export function remapGridData ({
  currentRow, 
  gridData,
  inputValue, 
  checkStatus = false,
  firstLetter,
}:GridDataMapperType):LetterDataType[][] {
  const nextRowData =gridData[currentRow].map((letterObject, index) => {
    let character = '.';
    let status = '';

    if(index === 0) {
      character = firstLetter;
    }
    
    return {
      character,
      status,
    }
  });

  const newRowData = gridData[currentRow].map((letterObject, index) => {
    let character = '.';
    let status = '';

    if(index === 0 && typeof inputValue[index] === 'undefined') {
      character = firstLetter;
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
  if(checkStatus) {
    if(currentRow < 5){
      newGridData[currentRow + 1] = nextRowData
    }
  }

  newGridData[currentRow] = newRowData;

  if(checkStatus && currentRow < 5) {
    //victoire
  }

  if(checkStatus && currentRow === 5) {
    alert('NUL');
  }
  
  return newGridData;
}