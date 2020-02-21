import React, {useState} from 'react'
import Tooltip from './components/Tooltip';

export default function TileSheet(props) {
    const [isMouseDown, setIsMouseDown] = useState(false)

    const handleMouseDown = (j, i) => {
        props.setIsReadyToPlace(false)
        setIsMouseDown(true)
        props.handleMouseDown(j, i)
    }

    const handleMouseEnter = (j, i) => {
        if (isMouseDown) {
            props.handleEndChange({rowEnd: j, colEnd: i})
        }
    }

    const handleMouseUp = () => {
        const colStart = Math.min(props.selected.colStart, props.selected.colEnd)
        const rowStart = Math.min(props.selected.rowStart, props.selected.rowEnd)
        const colEnd = Math.max(props.selected.colStart, props.selected.colEnd)
        const rowEnd = Math.max(props.selected.rowStart, props.selected.rowEnd)
        props.handleEndChange({rowEnd, colEnd})
        props.handleStartChange({rowStart, colStart})
        setIsMouseDown(false)
    }

    const tileMap = []

    for(let i = 0; i < 32; i++){
        for(let j = 0; j < 32; j++){
            const style = {
                backgroundPosition: `-${j * 32}px -${i * 32}px`,
            }

            const minRow = Math.min(props.selected.rowStart, props.selected.rowEnd)
            const maxRow = Math.max(props.selected.rowStart, props.selected.rowEnd)
            const minCol = Math.min(props.selected.colStart, props.selected.colEnd)
            const maxCol = Math.max(props.selected.colStart, props.selected.colEnd)
         
            if(j <= maxRow && j >= minRow && i <= maxCol && i >= minCol){
                style.border = "solid black 1px"
            }

            const tile = {
                data: {}, 
                jsx: <div 
                        key={"i" + i + "j" + j}
                        style={style} 
                        className="tile" 
                        onMouseDown={()=>handleMouseDown(j, i)}
                        onMouseUp={handleMouseUp}
                        onMouseEnter={()=>handleMouseEnter(j, i)}
                    ></div>
            }
            
            tileMap.push(tile)
        }
    }

    return (
        <Tooltip tip="click a tile, or click and drag to selected a rectangle. Then click in the canvas to place terrain">
            <div onMouseLeave={()=>{setIsMouseDown(false)}} className="tileSheet" >
                {tileMap.map(tile=>tile.jsx)}
            </div>
        </Tooltip>
    )
}

