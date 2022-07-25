import { Endpoints } from "../components/wrapper/wrapper"

export function isWordExist(inputValue:string):boolean{
    let exist = false
    fetch(Endpoints.checkWord, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            inputValue
        })
    }).then(response => {
        console.log(response.json())
        return response.json()
    })

    return exist
}