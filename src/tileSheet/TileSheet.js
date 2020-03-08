import React, {useState, useContext} from 'react'
import Tooltip from '../components/Tooltip';
import {SelectionContext} from '../context/selectionContext'

const orientSelection = (colStart, colEnd, rowStart, rowEnd) => {
    return {
        colStart: Math.min(colStart, colEnd),
        rowStart: Math.min(rowStart, rowEnd),
        colEnd: Math.max(colStart, colEnd),
        rowEnd: Math.max(rowStart, rowEnd)
    }
}

export default function TileSheet(props) {
    const [isMouseDown, setIsMouseDown] = useState(false)
    const [shouldSaveMap, setShouldSaveMap] = useState(false)

    const {holdSelection, setDraggingStage, setSelectionClickPosition, setPageXY} = useContext(SelectionContext)

    const handleMouseDown = (e, j, i, isInSelection, {x, y}) => {
        e.persist()
        if(isInSelection){
            setDraggingStage("dragging")
            setSelectionClickPosition({x, y})
            setPageXY(e.pageX, e.pageY)
        } else {
            setIsMouseDown(true)
            props.handleMouseDown(j, i)
        }
    }

    const handleMouseEnter = (j, i, isInSelection) => {
        if (isMouseDown && !isInSelection) {
            props.handleEndChange({rowEnd: j, colEnd: i})
        }
    }

    const handleMouseUpOrLeave = () => {

        const {colStart, rowStart, colEnd, rowEnd} = orientSelection(
            props.selected.colStart, 
            props.selected.colEnd, 
            props.selected.rowStart, 
            props.selected.rowEnd
        )

        props.handleEndChange({rowEnd, colEnd})
        props.handleStartChange({rowStart, colStart})
        setIsMouseDown(false)
        setShouldSaveMap(true)
    }

    const tileMap = []
    const selectionArray = []
    const {colStart, rowStart, colEnd, rowEnd} = orientSelection(
        props.selected.colStart, 
        props.selected.colEnd, 
        props.selected.rowStart, 
        props.selected.rowEnd
    )

    for(let i = 0; i < 32; i++){
        for(let j = 0; j < 32; j++){
            const style = {
                backgroundPosition: `-${j * 32}px -${i * 32}px`,
            }
            
            let isInSelection = false

            if(j <= rowEnd && j >= rowStart && i <= colEnd && i >= colStart){
                style.border = "solid black 1px"
                style.backgroundColor = "antiquewhite"
                isInSelection = true
            }

            const positionOnSelection = {y: i - colStart, x: j - rowStart}

            const tile = ( 
                <div 
                    key={"i" + i + "j" + j}
                    style={style} 
                    className="tile" 
                    onMouseDown={(e)=>handleMouseDown(e, j, i, isInSelection, positionOnSelection)}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseEnter={()=>handleMouseEnter(j, i, isInSelection)}
                ></div> 
            )
            if(isInSelection){
                selectionArray.push(tile)
            }
            tileMap.push(tile)
        }
    }

    const style = {
        display: "grid",
        gridTemplateColumns: `repeat(${rowEnd - rowStart + 1}, 32px)`,
        gridTemplateRows: `repeat(${colEnd - colStart + 1}, 32px)`
    }

    if(shouldSaveMap){
        holdSelection(<div style={style}>{selectionArray}</div>)
        setShouldSaveMap(false)
    }
    
    return (
        <Tooltip tip="click a tile, or click and drag to make a larger selection. Then drag the selection to the canvas or click in the canvas to place terrain">
            <div onMouseLeave={handleMouseUpOrLeave} className="tileSheet" >
                {tileMap}
            </div>
        </Tooltip>
    )
}

