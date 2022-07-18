export type LetterDataType = {
  character: string;
  status: string;
}

type LetterProps = {
  data: LetterDataType
}

export default function Letter({data}:LetterProps) {
  // console.log(data);
  return <li className={`letter letter--${data.status ? data.status:'default'}`}>{data.character}</li>
}




