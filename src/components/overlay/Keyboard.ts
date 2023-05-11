import {useCallback, useContext, useEffect} from "react";
import {MapContext} from "../../context/MapContext";

export const useChangePosition = () => {

    let {changePosition} = useContext(MapContext)

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

    useEffect(() => {
        document.addEventListener('keydown', updatePosition)
        return () => {
            document.removeEventListener('keydown', updatePosition)
        }
    }, [])
}