import { LetterDataType } from '../letter/letter';
import Row, { RowPropsType } from '../row/row';

export type gridPropsType = {
  gridData : LetterDataType[][]
 }

 export default function Grid({gridData}:gridPropsType){

  return <div className='grid'>
    {gridData.map((item, index) => <Row rowData={item} key={index}/>)}
  </div>
}
  