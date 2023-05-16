export const getRatioWidth = (cellSize) => {
    return Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize) + 1
}

export const getRatioHeight = (cellSize) => {
    return Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize) + 1
}