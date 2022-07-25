import { LetterDataType } from "../components/letter/letter";

export type GridDataMapperType = {
    gridData: LetterDataType[][];
    currentRow: number;
    inputValue: string;
    checkStatus?: boolean;
}

export type RowTemplateType = {
    rowIndex: number;
    row: number[];
    currentRow: number;
    firstLetter: string
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
      status: ''}
  });

export function remapGridData ({
  currentRow, 
  gridData,
  inputValue, 
  checkStatus = false,
}:GridDataMapperType):LetterDataType[][] {
  const newRowData = gridData[currentRow].map((letterObject, index) => {
    let character = '.';
    let status = '';

 /* if(checkStatus) {
    
      fetch(Endpoints.checkWord,
        {
          method: 'POST',
          headers : {
            'Accept' : 'application/json',
            'Content-Type' : 'application/json'
          },
            body: JSON.stringify({
            word: 'string'
          })
      });

      fetch(Endpoints.attempt,
          {
            method: 'POST',
            headers : {
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
            },
              body: JSON.stringify({
              attempt: 'string'
            })
       }).then(res => console.log(res));
       
    }*/
    

    if(index === 0 && typeof inputValue[index] === 'undefined') {
      //character = firstLetter;
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
    //victoire / defaite
  }
  if(checkStatus && currentRow ===5) {
    alert('NUL')
  }
  
  return newGridData;
}