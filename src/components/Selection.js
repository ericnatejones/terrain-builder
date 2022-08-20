import React, {useContext} from 'react'
import {SelectionContext} from "../context/selectionContext"
import Div from './Div'

export default function Selection() {
    const {pageX, pageY, selection, selectionClickPosition, setDraggingStage} = useContext(SelectionContext)

    const handleMouseUp = () => {
        setDraggingStage("ready to place")
    }

    const style = { 
        container: {
            position: "absolute",
            left: pageX - (selectionClickPosition.x * 32) - 15 + "px",
            top: pageY - (selectionClickPosition.y * 32) - 15 + "px"
        },
        selection: {
            display: "grid",
            gridTemplateColumns: `repeat(${selection.rowEnd - selection.rowStart + 1}, 32px)`,
            gridTemplateRows: `repeat(${selection.colEnd - selection.colStart + 1}, 32px)`
        }
    }

    const tiles = selection.tiles.map((tile) => {
        return(
            <Div {...tile} key={tile.key}/>
        )
    })

    return (
        <div style={style.container} onMouseUp={handleMouseUp}>
           <div style={style.selection}>{tiles}</div>
        </div>
    )
}
