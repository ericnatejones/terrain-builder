import React, {Fragment, useState, useEffect, useContext} from 'react'
import MapTile from './MapTile'
import {SelectionContext} from '../context/selectionContext'
import Tooltip from '../components/Tooltip';

export default function Map(props) {
    const {setDraggingStage} = useContext(SelectionContext)
    
    const [dropped, setDropped] = useState({row: 33, col: 33})
    const [eraserOn, setEraserOn] = useState(false)
    const [isReset, setIsReset] = useState(false)

    const handleEraserToggle = () => {
        setEraserOn(prevEraser => !prevEraser)
        setDraggingStage("pre") 
        setDropped({row: 33, col: 33})
    }

    const handleReset = () => {
        setIsReset(true)
    }

    useEffect(()=>{
        console.log('reset')
        setIsReset(false)
    }, [isReset])

    useEffect(()=>{
        window.addEventListener("keydown", (e)=>{
            if(e.key === "e" && !e.repeat){
                setEraserOn(true)
            }
        })
        window.addEventListener("keyup", (e)=>{
            if(e.key === "e" && !e.repeat){
                setEraserOn(false)
            }
        })
    }, [])

    const styles = {
        display: "grid",
        gridTemplateColumns: `repeat(${props.grid.cols}, 32px)`,
        gridTemplateRows: `repeat(${props.grid.rows}, 32px)`
    }

    const {colStart, rowStart, colEnd, rowEnd} = props.selected

    const rowDiff = Math.abs(rowEnd - rowStart)
    const colDiff = Math.abs(colEnd - colStart)

    const map = []

    for(let i = 0; i < props.grid.rows; i++){
        const rows = []
        for(let j = 0; j < props.grid.cols; j++){
            const position = {}

            const jDiff = j - dropped.row
            const iDiff = i - dropped.col
            
            if (j >= dropped.row && 
                j <= dropped.row + rowDiff && 
                i >= dropped.col &&
                i <= dropped.col + colDiff 
            ){
                position.row = rowStart + jDiff
                position.col = colStart + iDiff
            } 
            rows.push(
                <MapTile 
                    key={`${i}${j}`} 
                    i={i}
                    j={j}
                    position={position}
                    handlePlacement={setDropped}
                    setEraserOn={setEraserOn}
                    eraserOn={eraserOn}
                    isReset={isReset}
                />
            )
        }
        map.push(<Fragment key={i}>{rows}</Fragment>)
    }

    return (
        <>  <button onClick={handleReset}>Reset</button>
            <Tooltip tip="Eraser is on while holding down the e key, or using the Eraser On button to toggle it. When on, hovering will reset map tile">
                <button onClick={handleEraserToggle}>
                    {!eraserOn && "Turn"} Eraser {!eraserOn ? "On" : "Off"}
                </button>
            </Tooltip>
            
            <div style={styles} onMouseLeave={()=>setDropped({row: 33, col: 33})}>
                {map}
            </div>
        </>
    )
}
