import React, {useContext} from "react";
import {MapContext} from "../MapContext";

const debugBorder = '1px solid red'

const Cell = (props) => {

    const { cellSize, CELL_SIZE_DEFAULT, isCoordinates, setCSS, setGridCSS } = useContext(MapContext)

    const getImage = (key) => {
        // console.log(key)
        return itemImage[key]
    }

    const getStyle = (width) => {
        width = width * (cellSize / CELL_SIZE_DEFAULT)
        return {width: width + 'px', height: width + 'px'}
    }

    const itemImage = {
        tree1: {src: './images/forest/items/trees/pine/50.png', style: getStyle(50)},
        tree2: {src: './images/forest/items/trees/pine/70.png', style: getStyle(100)},
        deer1: {src: './images/forest/units/deer.png', style: getStyle(50)},
        raccoon1: {src: './images/forest/units/raccoon.png', style: getStyle(30)},
    }

    const image = getImage(props.item.type + props.item.level)

    console.log(props.item)

    console.log(image)

    return <img src={image.src}
                style={{...image.style, border: isCoordinates ? debugBorder : ''}}
    />
}

export default Cell