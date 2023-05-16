export type EntityTypes =
    'tree' | 'shrubs' | 'grass' |
    'stone' | 'head' |
    'deer' | 'raccoon'

export interface Entity {
    id: number,
    x: number,
    y: number,
    type: EntityTypes,
    level: number,
    items: Array<string>,
    user: string,
}

