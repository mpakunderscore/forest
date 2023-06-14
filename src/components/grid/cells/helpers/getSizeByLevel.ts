export const getSizeByLevel = (level: number, type: string) => {

    if (type === 'tree') {

        if (level < 3) {
            return 'small'
        } else if (level < 6) {
            return 'medium'
        }
        return 'big'
    }

    return 'unit'
}