export const getSizeByLevel = (level: number) => {
    if (level < 4) {
        return 'small'
    } else if (level < 7) {
        return 'medium'
    }
    return 'big'
}