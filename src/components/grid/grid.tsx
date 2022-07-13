import Row from '../row/row';

type InputPropsType= {
  input: string
}

export const wordLength = 5

export default function Grid({input}:InputPropsType){
  let currentRow = 0
  
  const inputData = Array.from(input).map((item:string) => ({character: item , status: ''}));
  const rows = Array.from(Array(6).keys());
  const wordData = Array.from(Array(wordLength).keys());
  const gridData = rows.map(() => wordData.map(() => ({character: '', status: ''})));
  
  for(let i = 0; i < wordLength; i++) {
    gridData[currentRow][i].character = '.'
    if(input[i] != null) {
      gridData[currentRow][i] = inputData[i]
    }
  }

  return <div className='grid'>
    {gridData.map(item => <Row rowData={item}/>)}
  </div>
}
  