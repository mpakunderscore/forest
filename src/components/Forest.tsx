import React, {useState, useEffect, useReducer, useRef} from "react";
import '../css/grid.css'
import {log} from '../utils/log';
import {createGesture} from "@ionic/react";

let CELL_SIZE_DEFAULT = 30
// let CELL_SIZE = 30;

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

        log('RENDER', 'render')

        log(currentPositionX, 'render')
        log(currentPositionY, 'render')

        log((window.innerWidth || document.documentElement.offsetWidth) + ':' + (window.innerHeight || document.documentElement.offsetHeight), 'render')

        // let size = cellSize;

        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / cellSize)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / cellSize)

        log(ratioWidth + ':' + ratioHeight, 'render')

        let grid = []

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                const x = i + currentPositionX
                const y = j + currentPositionY

                let cell = {
                    x,
                    y,
                    img: props.map && props.map[x] && props.map[x][y] ? getImage(props.map[x][y]) : false
                };

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

    return (
        <div>
            <div className={'controls'}>
                <div onClick={() => {}}>{props.time}</div>
                <div onClick={() => {
                    setCellSize(cellSize - 1)

                }}>-</div>
                <div onClick={() => {}}>{cellSize}</div>
                <div onClick={() => {
                    setCellSize(cellSize + 1)

                }}>+</div>
                <div onClick={() => {
                    toggleFullScreen()
                }}>FS</div>
            </div>
            <div id={'grid'}>
                {grid.map((item, i) => {
                    return <div key={i} className={'cell'}>

                        {item.img && <img src={item.img.src} style={item.img.style}/>}

                        <div className={'coordinates'}>{item.x}</div>
                        :
                        <div className={'coordinates'}>{item.y}</div>

                        {/*<img src={getGround().src} style={getGround().style}/>*/}

                    </div>
                })}
            </div>
        </div>
    )
}

export default Forest;