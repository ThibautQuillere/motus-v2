export type LetterDataType = {
  character: string;
  status: string;
}

type LetterProps = {
  data: LetterDataType
}

export default function Letter({data}:LetterProps) {
  return <li className={'letter ' + data.status}>{data.character}</li>
}




