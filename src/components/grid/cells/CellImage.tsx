import React, {useContext, useEffect, useState} from "react";
import {MapContext} from "../../../context/MapContext";

const debugBorder = '1px solid rgba(255, 0, 0, 0.5)'

const CellImage = (props) => {

    const {selectedItem, setSelectedItem} = useContext(UserContext)
    const {cellSize, CELL_SIZE_DEFAULT, isCoordinates, currentPositionX, currentPositionY} = useContext(MapContext)

    const getStyle = (width, transform = false) => {
        width = width * (cellSize / CELL_SIZE_DEFAULT)
        let style = {width: width + 'px', height: width + 'px', transform: transform ? 'scaleX(-1)' : ''}
        return style
    }

    const unitsImages = (type, transform) => {
        return {
            deer: {src: './images/forest/units/deer.png', style: getStyle(50, transform)},
            raccoon: {src: './images/forest/units/raccoon.png', style: getStyle(30)},
        }[type]
    }

    const getImage = (type, level, id) => {
        // console.log(id)

        if (type === 'tree') {

            let typeIndex = (id % 12) // 0..9
            let treeHeight = 50 + level * 20

            let treeImage = {
                src: './images/forest/trees/' + typeIndex + '.png',
                style: getStyle(treeHeight, level % 2 === 1),
            }

            return treeImage
        } else
            return unitsImages(type, false)

    }

    const [image, setImage] = useState(getImage(props.item.type, props.item.level, props.item.id))

    useEffect(() => {
        setImage(getImage(props.item.type, props.item.level, props.item.id))
    }, [props.item])

    return <img src={image.src}
                style={{...image.style, border: isCoordinates ? debugBorder : ''}}
    />
}

export default CellImage