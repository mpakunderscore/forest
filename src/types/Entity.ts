export type EntityTypes =
    'tree' | 'shrubs' | 'grass' |
    'stone' | 'water'|
    'deer' | 'raccoon' |
    'head'

export interface Entity {
    id: number,
    x: number,
    y: number,
    type: EntityTypes,
    name: string,
    level: number,
    items: Array<string>,
    user: string,
}

