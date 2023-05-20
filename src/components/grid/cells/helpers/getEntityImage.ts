import {Entity} from "../../../../types";

export const getEntityImage = (entity: Entity) => {
    switch (entity.type) {
        case 'tree':
            return `./images/forest/entity/trees/${entity.id % 12}.png`
        case 'deer':
            return './images/forest/entity/deer.png'
        case 'raccoon':
            return './images/forest/entity/raccoon.png'
        case 'head':
            return './images/forest/entity/head.png'
    }
}

export const getGrassImage = (id) => {
    return './images/forest/grass/grass' + id + '.png'
}