export const log = (text) => {

    // console.log((new Error()).stack)
    const type = (new Error()).stack.split('\n')[2].trim().split(' ')[1].replace('Object.', '')

    if (type === 'renderGrid') {
        // console.log('renderGrid' + ' >> ' + text)
    } else {
        console.log(type + ' > ' + text)
    }
}