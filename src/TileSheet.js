import React, {useState} from 'react'

export default function TileSheet(props) {
    const [isMouseDown, setIsMouseDown] = useState(false)

    const handleMouseDown = (j, i) => {
        setIsMouseDown(true)
        props.handleMouseDown(j, i)

    }

    const handleMouseEnter = (j, i) => {
        if (isMouseDown) {
            props.handleEndChange({rowEnd: j, colEnd: i})
        }
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
                        onMouseUp={()=>setIsMouseDown(false)}
                        onMouseEnter={()=>handleMouseEnter(j, i)}
                    ></div>
            }
            
            tileMap.push(tile)
        }
    }

    return (
        <div className="tileSheet">
            {tileMap.map(tile=>tile.jsx)}
        </div>
    )
}
