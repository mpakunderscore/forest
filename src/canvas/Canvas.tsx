import React, {useRef, useEffect, useContext} from 'react'
import {MapContext} from "../context/MapContext";
import {getRatioHeight, getRatioWidth} from "../components/game/grid/cells/helpers/getRatio";

const Canvas = props => {

    const user = props.user

    const { ...rest } = props
    const canvasRef = useRef(null)

    const {currentPositionX, currentPositionY, cellSize} = useContext(MapContext)

    const draw = (canvas, ctx) => {

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        if (user.userItems) {
            for (let i = 0; i < user.userItems.length; i++) {

                let item = user.userItems[i]
                const nextItem = user.userItems[i + 1]

                if (nextItem) {

                    let width = getRatioWidth(cellSize)

                    const startLineX = (item.x - currentPositionX + .5) * cellSize
                    const startLineY = (item.y - currentPositionY + .5) * cellSize

                    drawCircle(canvas, ctx, startLineX, startLineY)

                    const endLineX = (nextItem.x - currentPositionX + .5) * cellSize
                    const endLineY = (nextItem.y - currentPositionY + .5) * cellSize

                    drawCircle(canvas, ctx, endLineX, endLineY)

                    ctx.beginPath()
                    ctx.moveTo(startLineX, startLineY)
                    ctx.lineTo(endLineX, endLineY)
                    ctx.lineWidth = 1
                    ctx.strokeStyle = '#ffffff'
                    ctx.stroke()
                }
            }
        }
    }

    function drawCircle(canvas, context, x, y, ) {
        const rect = canvas.getBoundingClientRect();
        const positionX = x - rect.left;
        const positionY = y - rect.top;

        context.fillStyle = "#ffffff";
        context.beginPath();
        context.arc(positionX, positionY, 2.5, 0, 2 * Math.PI);
        context.fill();
    }

    useEffect(() => {

        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId

        const render = () => {
            frameCount++
            draw(canvas, context)
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