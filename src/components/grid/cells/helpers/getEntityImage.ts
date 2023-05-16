import {Entity} from "../../../../types";

export const getEntityImage = (entity: Entity) => {
    switch (entity.type) {
        case "tree":
            return `./images/forest/trees/${entity.id % 12}.png`
        case 'deer':
            return './images/forest/units/deer.png'
        case 'raccoon':
            return './images/forest/units/raccoon.png'
    }
}