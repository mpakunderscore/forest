import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "../../context/MapContext"
import welcome from "./Welcome";

export const useChangePosition = (props) => {

    let {cellSize, changePosition} = useContext(MapContext)

    const updatePosition = useCallback((event) => {
        if (event.which === 39) {
            changePosition(1, 0)
        }
        if (event.which === 37) {
            changePosition(-1, 0)
        }
        if (event.which === 40) {
            changePosition(0, 1)
        }
        if (event.which === 38) {
            changePosition(0, -1)
        }
        if (event.which === 27) {
            props.setWelcome()
        }
    }, [changePosition])

    const [currentTouchX, setCurrentTouchX] = useState(0)
    const [currentTouchY, setCurrentTouchY] = useState(0)

    const updateTouchMove = useCallback((event) => {

        const touch = event.touches[0] || event.changedTouches[0]
        const realTarget = document.elementFromPoint(touch.clientX, touch.clientY)
        let moveX = Math.trunc(touch.clientX / cellSize)
        let moveY = Math.trunc(touch.clientY / cellSize)

        setCurrentTouchX((currentTouchX) => {
            if (currentTouchX !== 0) {
                if (currentTouchX !== moveX) {
                    changePosition(currentTouchX - moveX, 0)
                    return moveX
                }
                return currentTouchX
            }
            return moveX
        })

        setCurrentTouchY((currentTouchY) => {
            if (currentTouchY !== 0) {
                if (currentTouchY !== moveY) {
                    changePosition(0, currentTouchY - moveY)
                    return moveY
                }
                return currentTouchY
            }
            return moveY
        })

    }, [setCurrentTouchX, setCurrentTouchY])

    const updateTouchEnd = useCallback((event) => {
        setCurrentTouchX(0)
        setCurrentTouchY(0)
    }, [])

    const [mouseDown, setMouseDown] = useState(null)

    const updateMouseDown = useCallback((event) => {
        // console.log('down')
        // console.log(event.x + ':' + event.y)
        setMouseDown({x: event.x, y: event.y})
    }, [mouseDown, setMouseDown])

    const updateMouseUp = useCallback((event) => {
        // console.log('up')
        if (mouseDown) {
            const xChange = Math.trunc((mouseDown.x - event.x) / cellSize)
            const yChange = Math.trunc((mouseDown.y - event.y) / cellSize)
            changePosition(xChange, yChange)
        }
        setMouseDown(null)
    }, [mouseDown, setMouseDown])

    let xChangeGlobal = 0
    let yChangeGlobal = 0

    const updateMouseMove = useCallback((event) => {
        if (mouseDown) {
            // console.log('mouseDown.x:' + mouseDown.x + ' ' + event.x)
            const xChange = Math.trunc((mouseDown.x - event.x) / cellSize)
            const yChange = Math.trunc((mouseDown.y - event.y) / cellSize)

            if (xChangeGlobal !== xChange) {
                setMouseDown({x: event.x, y: mouseDown.y})
                changePosition(xChange, 0)
                xChangeGlobal = 0
                // yChangeGlobal = 0
            }
            if (yChangeGlobal !== yChange) {
                setMouseDown({x: mouseDown.x, y: event.y})
                changePosition(0, yChange)
                // xChangeGlobal = 0
                yChangeGlobal = 0
            }
        }
    }, [mouseDown, setMouseDown])

    const onScroll = useCallback((event) => {
        console.log(event)
    }, [])

    useEffect(() => {
        document.addEventListener('keydown', updatePosition)

        document.addEventListener('touchmove', updateTouchMove)
        document.addEventListener('touchend', updateTouchEnd)

        document.addEventListener('mousedown', updateMouseDown)
        document.addEventListener('mouseup', updateMouseUp)
        document.addEventListener('mousemove', updateMouseMove)

        // document.addEventListener('onwheel', onScroll)

        window.onscroll = (event) => {
            console.log('scroll')
        }


        return () => {
            document.removeEventListener('keydown', updatePosition)

            document.removeEventListener('touchmove', updateTouchMove)
            document.removeEventListener('touchend', updateTouchEnd)

            document.removeEventListener('mousedown', updateMouseDown)
            document.removeEventListener('mouseup', updateMouseUp)
            document.removeEventListener('mousemove', updateMouseMove)

            // document.removeEventListener('onwheel', onScroll)
        }
    }, [updatePosition, updateTouchMove, updateTouchEnd, updateMouseDown, updateMouseUp, updateMouseMove])
}