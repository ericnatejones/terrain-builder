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
        if(props.tutorialNumber === 2){
            alert(`That's it! You're done with the tutorial.

toggle the tool tips to learn how the Eraser works
and for tips on how to use the other tools`)
            
            localStorage.tutorialNumber = 3
            props.setTutorialNumber(10)
        }

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
            return
        } else {
            props.handlePlacement({row: 33, col: 33})
        }

        if(props.tutorialNumber === 0){
            const response = prompt(`Welcome to React Terrain Builder! 
            
Either click a tile from the image below or,  
drag your mouse over part of the image to select a range of tiles. 

At any time during the tutorial, you can enter "skip" in the prompt`)
    
            if(response.toLowerCase() === "skip"){
                props.setTutorialNumber(10)
            }
            props.setTutorialNumber(1)
            localStorage.tutorialNumber = 1
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
