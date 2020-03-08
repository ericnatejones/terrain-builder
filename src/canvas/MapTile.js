import React, {useState, useEffect, useContext} from 'react'
import {SelectionContext} from '../context/selectionContext'

export default function MapTile(props) {
    const [isSet, setIsSet] = useState(false)
    const {selectionClickPosition, setSelectionClickPosition,
           draggingStage, setDraggingStage} = useContext(SelectionContext)

    useEffect(()=>{
        const {row} = props.position
        if(!isSet && (row === 0 || row) && !props.eraserOn){
            setIsSet(true)
        }
    }, [props.position.row, props.j, isSet, props.eraserOn, props.position])

    useEffect(()=>{
        setIsSet(false)
    }, [props.isReset])

    const handlePlace = () => {
        props.handlePlacement({
            row: props.j - selectionClickPosition.x, 
            col: props.i - selectionClickPosition.y
        })
    }

    const handleMouseOver = () => {
        if(props.eraserOn){
            setIsSet(false)    
        }
        if(draggingStage === "ready to place"){
            handlePlace()
            setDraggingStage("pre") 
            setSelectionClickPosition({x:0,y:0})
        } else {
            props.handlePlacement({row: 33, col: 33})
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
            onMouseOver={handleMouseOver}
            onClick={handlePlace}>
        </div>
    )
}
