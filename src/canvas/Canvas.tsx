import React, {useRef, useEffect, useContext} from 'react'
import {MapContext} from "../context/MapContext";
import {getRatioHeight, getRatioWidth} from "../components/grid/cells/helpers/getRatio";

const Canvas = props => {

    const user = props.user

    const { ...rest } = props
    const canvasRef = useRef(null)

    const {currentPositionX, currentPositionY, cellSize} = useContext(MapContext)

    const draw = (ctx, frameCount) => {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        if (user.userItems) {
            for (let i = 0; i < user.userItems.length; i++) {

                let item = user.userItems[i]
                const nextItem = user.userItems[i + 1]

                if (nextItem) {

                    const startLineX = (item.x - currentPositionX + .5) * cellSize
                    const startLineY = (item.y - currentPositionY + .5) * cellSize

                    const endLineX = (nextItem.x - currentPositionX + .5) * cellSize
                    const endLineY = (nextItem.y - currentPositionY + .5) * cellSize

                    ctx.beginPath()
                    ctx.moveTo(startLineX, startLineY)
                    ctx.lineTo(endLineX, endLineY)
                    ctx.strokeStyle = '#ffffff'
                    ctx.stroke()
                }
            }
        }
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(render)
        }
        render()

        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    }, [draw])

    return <canvas width={getRatioWidth(cellSize) * cellSize}
                   height={getRatioHeight(cellSize) * cellSize}
                   ref={canvasRef}
                   {...rest}/>
}

export default Canvas