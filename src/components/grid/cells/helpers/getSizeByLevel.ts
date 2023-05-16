export const getSizeByLevel = (level: number, type: string) => {

    if (type === 'tree') {

        if (level < 4) {
            return 'small'
        } else if (level < 7) {
            return 'medium'
        }
        return 'big'

    } return 'unit'

}