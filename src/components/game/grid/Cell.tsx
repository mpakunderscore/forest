import {Entity} from "../../../types";
import {FC} from "react";
import {getSizeByLevel} from "./cells/helpers/getSizeByLevel";
import {getEntityImage, getGrassImage} from "./cells/helpers/getEntityImage";


interface CellProps {
    entity: Entity
    clickTile: (x, y) => void
    x: number
    y: number,
    selected: boolean
    isCoordinates: boolean
}

export const Cell: FC<CellProps> = ({entity, x, y, clickTile, selected, isCoordinates}) => {
    let classes = ['cell']
    if (entity) {
        // let randomValue = Math.random() * 10
        let randomValue = 1

        classes.push(entity.type + '-' + 1)

        // entity.type ?
        //     randomValue < 9.99 ? classes.push(entity.type + '-' + 1) : classes.push(entity.type + '-' + (Math.floor(Math.random() * 5 + 1)))
        //     : null

        entity.user ? classes.push(entity.user) : null
        selected ? classes.push('selected') : null
    }

    return <div
        className={classes.join(' ')}
        onClick={() => {
            entity ? clickTile(x, y) : () => {
            }
        }}>

        {entity && !isCoordinates &&
            <img className={`${getSizeByLevel(entity.level, entity.type)} ${entity.type}`}
                 src={getEntityImage(entity)}/>}

        {/*{!isCoordinates && <img className={`grass`} src={getGrassImage((x % 4 + 1))}/>}*/}

    </div>
}