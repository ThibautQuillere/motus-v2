import Letter,{LetterDataType} from '../letter/letter';

type RowPropsType= {
  rowData: LetterDataType[];
}

export default function Row(props:RowPropsType) {
  return <ul className='row'>
    {props.rowData.map(item => <Letter data={item}/>)}
  </ul>
}