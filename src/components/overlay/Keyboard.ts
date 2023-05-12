import {useCallback, useContext, useEffect, useState} from "react"
import {MapContext} from "../../context/MapContext"

export const useChangePosition = () => {

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
    }, [changePosition])

    const [currentTouchX, setCurrentTouchX] = useState(0)
    const [currentTouchY, setCurrentTouchY] = useState(0)

    const updateTouchMove = useCallback((event) => {

        const touch = event.touches[0] || event.changedTouches[0]
        const realTarget = document.elementFromPoint(touch.clientX, touch.clientY)
        let moveX = Math.floor(touch.clientX / cellSize)
        let moveY = Math.floor(touch.clientY / cellSize)

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

    useEffect(() => {
        document.addEventListener('keydown', updatePosition)
        document.addEventListener('touchmove', updateTouchMove)
        document.addEventListener('touchend', updateTouchEnd)
        return () => {
            document.removeEventListener('keydown', updatePosition)
            document.removeEventListener('touchmove', updateTouchMove)
            document.removeEventListener('touchend', updateTouchEnd)
        }
    }, [updatePosition, updateTouchMove, updateTouchEnd])
}