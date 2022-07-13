import Letter,{LetterDataType} from '../letter/letter';

export type RowPropsType= {
  rowData: LetterDataType[];
}

export default function Row(props:RowPropsType) {
  return <ul className='row'>
    {props.rowData.map(item => <Letter data={item}/>)}
  </ul>
}