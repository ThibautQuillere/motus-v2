import Letter,{LetterDataType} from '../letter/letter';

export type RowPropsType = {
  rowData: LetterDataType[];
}

export default function Row({rowData}:RowPropsType) {
  return <ul className='row'>
    { 
      rowData.length > 0 &&
      rowData.map( (item, index) => <Letter key={index} data={item} />) 
    }</ul>
    }