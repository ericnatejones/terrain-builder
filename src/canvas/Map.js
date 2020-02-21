import React, {Fragment, useState, useEffect} from 'react'
import MapTile from './MapTile'
import Tooltip from '../components/Tooltip';

export default function Map(props) {

    const [clicked, setClicked] = useState({row: 0, col: 0})
    const [eraserOn, setEraserOn] = useState(false)

    const handleEraserToggle = () => {
        setEraserOn(prevEraser => !prevEraser)
        setClicked({row: 33, col: 33})
    }

    useEffect(()=>{
        console.log("eefect")
        window.addEventListener("keydown", (e)=>{
            console.log(e.repeat)
            if(e.key === "e" && !e.repeat){
                setEraserOn(true)
            }
        })
        window.addEventListener("keyup", (e)=>{
            console.log(e.repeat)
            if(e.key === "e" && !e.repeat){
                setEraserOn(false)
            }
        })
    }, [])

    const styles = {
        display: "grid",
        gridTemplateColumns: `repeat(${props.grid[0].length}, 32px)`,
        gridTemplateRows: `repeat(${props.grid.length}, 32px)`
    }

    const {colStart, rowStart, colEnd, rowEnd} = props.selected

    const rowDiff = Math.abs(rowEnd - rowStart)
    const colDiff = Math.abs(colEnd - colStart)

    const map = props.grid.map((row, i) => {
        return (
            <Fragment key={i}>
                {row.map((tile, j) => {

                    const position = {}

                    const jDiff = j - clicked.row
                    const iDiff = i - clicked.col
                    
                    if (j >= clicked.row && 
                        j <= clicked.row + rowDiff && 
                        i >= clicked.col &&
                        i <= clicked.col + colDiff &&
                        props.ready
                    ){
                        position.row = rowStart + jDiff
                        position.col = colStart + iDiff
                    } 

                    return (
                        <MapTile 
                            key={`${i}${j}`} 
                            i={i}
                            j={j}
                            position={position}
                            handleTileClick={setClicked}
                            setEraserOn={setEraserOn}
                            eraserOn={eraserOn}
                        />
                    )
                })}
            </Fragment>
        )
    })

    return (
        <>  
            <Tooltip tip="toggle eraser with the e key. when on, hovering will reset map tile">
                <button onClick={handleEraserToggle}>
                    {!eraserOn && "Turn"} Eraser {!eraserOn ? "On" : "Off"}
                </button>
            </Tooltip>
            
            <div onClick={()=>props.setReady(true)} style={styles}>
                {map}
            </div>
        </>
    )
}
