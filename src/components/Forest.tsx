import React, {useState, useEffect, useReducer, useRef} from "react";
import '../css/grid.css'
import {log} from '../utils/log';
import {createGesture} from "@ionic/react";


let CELL_SIZE = 30;
document.documentElement.style.setProperty('--cell-width', CELL_SIZE + 'px');
// let timeStep = 100;

let timeStep = 100;


let time = new Date().getMilliseconds();

let currentPositionX = 0
let currentPositionY = 0

const Forest = (props) => {

    // let [map, setMap] = useState(props.map);

    // let [currentPositionX, setCurrentPositionX] = useState(0);
    // let [currentPositionY, setCurrentPositionY] = useState(0);

    let [destinationX, setDestinationX] = useState(0);
    let [destinationY, setDestinationY] = useState(0);

    let [grid, setGrid] = useState([])

    let [startCount, setStartCount] = useState(0)

    let renderGrid = () => {

        log('RENDER')

        log(currentPositionX)
        log(currentPositionY)

        log((window.innerWidth || document.documentElement.offsetWidth) + ':' + (window.innerHeight || document.documentElement.offsetHeight))

        let size = CELL_SIZE;

        let ratioWidth = Math.floor((window.innerWidth || document.documentElement.offsetWidth) / size)
        let ratioHeight = Math.floor((window.innerHeight || document.documentElement.offsetHeight) / size)

        // log(ratioW % 2 === 0);

        // if (ratioWidth % 2 === 0) {
        //     ratioWidth = ratioWidth + 1;
        // }
        //
        // if (ratioHeight % 2 === 0) {
        //     ratioHeight = ratioHeight + 1;
        // }

        log(ratioWidth + ':' + ratioHeight)

        let centerX = ratioWidth/2;
        let centerY = ratioHeight/2;

        // log('ratioW: ' + ratioW)
        // log('ratioW: ' + ratioH)

        let grid = []

        for (let j = 0; j < ratioHeight; j++) {

            for (let i = 0; i < ratioWidth; i++) {

                const x = i + currentPositionX
                const y = j + currentPositionY

                let cell = {
                    x,
                    y,
                    img: props.map && props.map[x] && props.map[x][y] ? getImage(props.map[x][y]) : false};

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
            timer = setTimeout(func,30, event)
        }
    }

    let defaultWidth = 32
    let getStyle = (width) => {
        return {width: width + 'px', height: width + 'px'}
    }

    let images = {
        A: {src: './images/forest/10.png', style: getStyle(33)},
        B: {src: './images/forest/30.png', style: getStyle(60)},
        C: {src: './images/forest/50.png', style: getStyle(100)},
        X: {src: './images/forest/100.png', style: getStyle(150)},
        Y: {src: './images/forest/100f.png', style: getStyle(150)},
        Z: {src: './images/forest/100r.png', style: getStyle(150)},

    }

    const getImage = (key) => {
        return images[key]
    }

    const getGround = () => {
        return {src: './images/forest/texture.png', style: getStyle(CELL_SIZE)}
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
    }, [])

    useEffect(() => {
        renderGrid()
        return () => {}
    }, [props.map, currentPositionX, currentPositionY])

    return (
        <div id={'grid'}>
            {grid.map((item, i) => {
                return <div key={i} className={'cell'}>

                    {item.img && <img src={item.img.src} style={item.img.style}/>}

                    <div className={'coordinates'}>{item.x}</div>:
                    <div className={'coordinates'}>{item.y}</div>

                    {/*<img src={getGround().src} style={getGround().style}/>*/}

                </div>
            })}
        </div>
    )
}

export default Forest;