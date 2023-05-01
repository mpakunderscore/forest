export const log = (text) => {

    const type = (new Error()).stack.split('\n')[2].trim().split(' ')[1]

    if (type === 'renderGrid') {
        console.log('RENDER: ' + text)
    } else {
        console.log(text)
    }
}