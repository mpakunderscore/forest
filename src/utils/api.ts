// declare let DEBUG: boolean;

let serverUrl = 'https://enomenu.herokuapp.com'
// if (DEBUG) {
//     serverUrl = 'https://fainodev.herokuapp.com'
// }

// let serverUrl = 'http://localhost:7000'

export let sendData = (url, data) => {

    fetch(serverUrl + url, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
        })
}

export let getData = (url) => {

    return fetch(serverUrl + url)
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            return data
        })
}

export default {sendData, getData}