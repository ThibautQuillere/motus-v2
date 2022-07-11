import Row from '../row/row';

export default function Grid() {
  const gridData = [
    [
      {character: 'a', status: 'letter--exists'},
      {character: 'b', status: ''},
      {character: 'c', status: 'letter--valid'},
      {character: 'd', status: 'letter--exists'},
      {character: 'e', status: ''},
    ],
    [
      {character: 'f', status: ''},
      {character: 'g', status: 'letter--exists'},
      {character: 'h', status: 'letter--valid'},
      {character: 'i', status: 'letter--exists'},
      {character: 'j', status: ''},
    ],
    [
      {character: 'k', status: 'letter--exists'},
      {character: 'l', status: 'letter--exists'},
      {character: 'm', status: ''},
      {character: 'n', status: 'letter--valid'},
      {character: 'o', status: 'letter--valid'},
    ],
    [
      {character: 'p', status: 'letter--exists'},
      {character: 'q', status: ''},
      {character: 'r', status: ''},
      {character: 's', status: ''},
      {character: 't', status: 'letter--valid'},
    ],
    [
      {character: 'u', status: 'letter--valid'},
      {character: 'v', status: 'letter--exists'},
      {character: 'w', status: 'letter--valid'},
      {character: 'x', status: 'letter--exists'},
      {character: 'y', status: 'letter--exists'},
    ],
    [
      {character: 'z', status: ''},
      {character: 'aa', status: ''},
      {character: 'ab', status: 'letter--exists'},
      {character: 'ac', status: ''},
      {character: 'ad', status: ''},
    ]
  ]
    
  return <div className='grid'>
      {gridData.map(item => <Row rowData={item}/>)}
    </div>
}
  