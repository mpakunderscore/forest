export type EntityTypes = 'tree' | 'deer' | 'raccoon'

export interface Entity {
    id: number,
    x: number,
    y: number,
    type: EntityTypes,
    level: number,
    items: Array<string>,
    user: string,
}

