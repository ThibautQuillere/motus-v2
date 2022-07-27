import { Endpoints } from "../helpers/endpoints";

export function isWordExist(word: string) {

  let exist = false;

  async function checkWord() {

    let response = await fetch(Endpoints.checkWord, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        word
      })
    });

    let json = await response.json();
    exist = json.exists;
    if(exist){
      fetch(Endpoints.attempt, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          attempt: word
        })
      }).then(response => {
        return response.json()
      }).then(json => {
        /*
        setGridData(remapStatus({
          gridData,
          currentRowIndex,
          statusInput: json,
        }));

        export function remapStatus ({
          gridData,
          currentRowIndex,
          currentRowDta,
        }) {
          const newGridData = [...gridData];
          newGridData[currentRowIndex] = currentRow;
          return newGridData
        }

        export type StatusMapperType {
          gridData: LetterDataType[][];
          currentRowIndex: number;
          currentRow: rowPropsType
        }
        */
      })
    }
  }

  let oui = checkWord();
  console.log(oui)
  return exist
}