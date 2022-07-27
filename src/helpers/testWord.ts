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
    return exist;
  }

  let oui = checkWord();
  console.log(oui)
  return exist
}