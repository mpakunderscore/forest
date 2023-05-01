import React, {useState, useEffect, useReducer, useRef} from "react";
import '../css/grid.css'
import '../css/ui.css'
import {log} from '../utils/log';
import {createGesture} from "@ionic/react";
import {socketAPI} from "../utils/socket";

let CELL_SIZE_DEFAULT = 30

let secCSS = (size) => {
    document.documentElement.style.setProperty('--cell-width', size + 'px');
}

secCSS(CELL_SIZE_DEFAULT)

let currentPositionX = 0
let currentPositionY = 0

const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
        document.exitFullscreen();
    }
}

const Forest = (props) => {

    let [grid, setGrid] = useState([])
    let [cellSize, setCellSize] = useState(CELL_SIZE_DEFAULT)



    let renderGrid = () => {

        log('RENDER')

        log(currentPositionX)
        log(currentPositionY)

        log((window.innerWidth || document.documentElement.offsetWidth) + ':' + (window.innerHeight || document.documentElement.offsetHeight))

        // let size = cellSize;

        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)

        log(ratioWidth + ':' + ratioHeight)

        let grid = []

        // if (ratioWidth % 2 === 0) {
        //     ratioWidth--
        // }
        // if (ratioHeight % 2 === 0) {
        //     ratioHeight--
        // }

        let centerX = Math.floor(ratioWidth/2)
        let centerY = Math.floor(ratioHeight/2)

        log(centerX + ' ' + centerY)

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                const x = i + currentPositionX
                const y = j + currentPositionY

                let center = false
                if (i === centerX && j === centerY)
                    center = true

                let cell = {
                    x,
                    y,
                    img: props.map && props.map[x] && props.map[x][y] ? getImage(props.map[x][y]) : false,
                    center
                }

                grid.push(cell);
            }
        }

        setGrid(grid)
    }

    React.useEffect(() => {
        window.addEventListener('resize', debounce(() => renderGrid()))
    })

    let debounce = (func) => {

        let timer;
        return (event) => {
            if (timer)
                clearTimeout(timer)
            timer = setTimeout(func, 30, event)
        }
    }

    let defaultWidth = 32
    let getStyle = (width) => {
        width = width * (cellSize / CELL_SIZE_DEFAULT)
        return {width: width + 'px', height: width + 'px'}
    }

    let images = {
        A: {src: './images/forest/10.png', style: getStyle(33)},
        B: {src: './images/forest/30.png', style: getStyle(60)},
        C: {src: './images/forest/50.png', style: getStyle(100)},
        D: {src: './images/forest/deer.png', style: getStyle(50)},
        R: {src: './images/forest/raccoon.png', style: getStyle(30)},
        X: {src: './images/forest/100.png', style: getStyle(150)},
        Y: {src: './images/forest/100f.png', style: getStyle(180)},
        Z: {src: './images/forest/100r.png', style: getStyle(100)},

    }

    const getImage = (key) => {
        return images[key]
    }

    // const getGround = () => {
    //     return {src: './images/forest/texture.png', style: getStyle(cellSize)}
    // }

    const initKeyboard = () => {
        document.addEventListener("keydown", function (event) {
            if (event.which === 39) {
                currentPositionX += 1
                renderGrid();
            }
            if (event.which === 37) {
                currentPositionX -= 1
                renderGrid();
            }
            if (event.which === 40) {
                currentPositionY += 1
                renderGrid();
            }
            if (event.which === 38) {
                currentPositionY -= 1
                renderGrid();
            }
        })
    }

    const initGestures = () => {

        const gesture = createGesture({
            el: document.getElementById('app'),
            threshold: 15,
            gestureName: 'my-gesture',
            onMove: ev => onMove(ev),
        });

        gesture.enable();

        const onMove = (detail) => {
            const type = detail.type;
            // console.log(type)
            const currentX = detail.currentX;
            const deltaX = detail.deltaX;
            const velocityX = detail.velocityX;
            const velocityY = detail.velocityY;

            // console.log(velocityX + ':' + velocityY)

            if (velocityX > .5) {
                currentPositionX--
                renderGrid()
            }

            if (velocityX < -.5) {
                currentPositionX++
                renderGrid()
            }

            if (velocityY > .5) {
                currentPositionY--
                renderGrid()
            }

            if (velocityY < -.5) {
                currentPositionY++
                renderGrid()
            }
        }
    }

    useEffect(() => {
        // generateMap()
        initGestures()
        initKeyboard()
    }, [])

    useEffect(() => {
        secCSS(cellSize)
        renderGrid()
        return () => {
        }
    }, [props.map, currentPositionX, currentPositionY, cellSize])

    let [inventory, setInventory] = useState(['seed', ''])
    let [selectedItem, setSelectedItem] = useState(-1)

    let [selectedCell, setSelectedCell] = useState('')

    let [isCoordinates, showCoordinates] = useState(false)

    const clickTile = (x, y) => {
        log(x + ':' + y)
        setSelectedCell(x + ':' + y)
        socketAPI.sendSeed({x, y})
    }

    return (
        <div>
            <div className={'ui'}>
                <div className={'inventory'}>
                    {inventory.map((item, i) => {
                        return <div key={i} className={selectedItem === i ? 'selected' : ''} onClick={() => setSelectedItem(i)}>{item}</div>
                    })}
                    {/*<div className={'title'}>{'inventory'.toUpperCase()}</div>*/}

                </div>
                {selectedCell && <div className={'item'}>
                    <div className={'title'}>{'Pine tree'.toUpperCase() + ' ' + selectedCell}</div>
                    <div className={'text'}>Pine trees have adapted to thrive in harsh environments, with some species even growing on rocky cliffs. They release a delightful, calming scent that has become synonymous with the holidays. Many pine tree species are also crucial to the survival of wildlife, providing food and shelter for countless species.</div>
                    <div></div>
                </div>}
                {/*<div className={'description'}>*/}
                {/*    <div className={'title'}>{'description'.toUpperCase()}</div>*/}
                {/*</div>*/}
                <div className={'controls'}>
                    <div onClick={() => {}}>{props.time}</div>
                    <div onClick={() => {
                        if (cellSize > 10)
                            setCellSize(cellSize - 10)

                    }}>-</div>
                    <div onClick={() => {}}>{cellSize}</div>
                    <div onClick={() => {
                        if (cellSize < 60)
                            setCellSize(cellSize + 10)

                    }}>+</div>
                    <div onClick={() => {
                        toggleFullScreen()
                    }}>FS</div>
                    <div onClick={() => {
                        showCoordinates(!isCoordinates)
                    }}>C</div>
                </div>
            </div>
            <div id={'grid'}>
                {grid.map((item, i) => {
                    return <div key={i}
                                className={
                                    'cell' +
                                    // (item.center ? ' center' : '') +
                                    ((item.x + ':' + item.y) === selectedCell ? ' selected' : '')
                                }
                                onClick={() => clickTile(item.x, item.y)}>

                        {item.img && <img src={item.img.src} style={item.img.style}/>}

                        {isCoordinates && <div className={'coordinates'}>
                            <div>{item.x}</div>:
                            <div>{item.y}</div>
                        </div>}

                        {/*<img src={getGround().src} style={getGround().style}/>*/}

                    </div>
                })}
            </div>
        </div>
    )
}

export default Forest;