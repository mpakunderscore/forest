export const getRatioWidth = (cellSize) => {
    let ratio = (window.innerWidth || document.documentElement.offsetWidth) / cellSize
    ratio = ratio % 1 > 0 ? (Math.floor(ratio) + 1) : ratio
    ratio = ratio % 2 === 1 ? ratio : ratio + 1
    return ratio
}

export const getRatioHeight = (cellSize) => {
    let ratio = (window.innerHeight || document.documentElement.offsetHeight) / cellSize
    ratio = ratio % 1 > 0 ? (Math.floor(ratio) + 1) : ratio
    ratio = ratio % 2 === 1 ? ratio : ratio + 1
    return ratio
}