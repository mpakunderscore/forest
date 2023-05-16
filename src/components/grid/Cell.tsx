import {Entity} from "../../types";
import {FC} from "react";
import {getSizeByLevel} from "./cells/helpers/getSizeByLevel";
import {getEntityImage} from "./cells/helpers/getEntityImage";


interface CellProps {
    entity: Entity
    clickTile: (x, y) => void
    x: number
    y: number,
    selected: boolean
    isCoordinates: boolean
}

export const Cell: FC<CellProps> = ({entity, x, y, clickTile, selected, isCoordinates}) => {
    return <div
        className={`cell ${entity && entity.type ? entity.type : ''} ${entity && entity.user ? 'user' : ''} ${selected ? 'selected' : ''}`}
        onClick={() => {
            entity ? clickTile(x, y) : () => {
            }
        }}>

        {entity && !isCoordinates &&
            <img className={`${getSizeByLevel(entity.level, entity.type)} ${entity.type}`}
                 src={getEntityImage(entity)}/>}

    </div>
}