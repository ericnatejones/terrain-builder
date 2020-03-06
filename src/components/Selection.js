import React, {useContext} from 'react'
import {SelectionContext} from "../context/selectionContext"

export default function Selection() {
    const {pageX, pageY, selection, selectionClickPosition} = useContext(SelectionContext)

    const style = {
        position: "absolute",
        left: pageX - (selectionClickPosition.x * 32) - 15 + "px",
        top: pageY - (selectionClickPosition.y * 32) - 15 + "px"
    }

    return (
        <div style={style}>
            {selection}
        </div>
    )
}
