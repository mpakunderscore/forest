import {Entity} from "../../types";
import {FC} from "react";
import {getSizeByLevel} from "./cells/helpers/getSizeByLevel";
import {getEntityImage} from "./cells/helpers/getEntityImage";


interface CellProps {
    entity: Entity
}

export const Cell: FC<CellProps> = ({entity}) => {
    return <div className={'cell'}>
        {entity && <img className={`${getSizeByLevel(entity.level)} ${entity.type}`} src={getEntityImage(entity)} />}
    </div>
}