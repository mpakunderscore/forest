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
}

export const Cell: FC<CellProps> = ({entity, x, y, clickTile, selected}) => {
    return <div className={`cell 
    ${entity ? 'tree' : ''} 
    ${entity && entity.user ? 'user' : ''}
    ${selected ? 'selected' : ''}
    `}

                onClick={() => {entity ? clickTile(x, y) : () => {}}}>
        {entity && <img className={`${getSizeByLevel(entity.level)} ${entity.type}`} src={getEntityImage(entity)} />}
    </div>
}