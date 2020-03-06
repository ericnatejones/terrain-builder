import React, {useState, useEffect, useContext} from 'react'
import {selectionContext} from '../context/selectionContext'

export default function MapTile(props) {
    const [isSet, setIsSet] = useState(false)
    const {selectionClickPosition} = useContext(SelectionContext)

    useEffect(()=>{
        const {row} = props.position
        if(!isSet && (row === 0 || row) && !props.eraserOn){
            setIsSet(true)
        }
    }, [props.position.row, props.j, isSet, props.eraserOn, props.position])

    const handleClick = () => {
        props.handleTileClick({row: props.j, col: props.i})
    }

    const handleMouseOver = () => {
        console.log("over")
        if(props.eraserOn){
            setIsSet(false)    
        }
    }
    
    const style = {}

    if(isSet){
        style.backgroundPosition = `-${props.position.row * 32}px -${props.position.col * 32}px`
    } else {
        style.background = "none"
    }

    return (
        <div
            style={style} 
            className={`game-tile ${isSet ? "tile" : null}`}
            onClick={handleClick}
            onMouseOver={handleMouseOver}>
        </div>
    )
}
