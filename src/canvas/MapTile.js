import React, {useState, useEffect} from 'react'

export default function MapTile(props) {
    const [isSet, setIsSet] = useState(false)

    useEffect(()=>{
        if(!isSet && props.position.row && !props.eraserOn){
            setIsSet(true)
        }
    }, [props.position.row, props.j, isSet, props.eraserOn])

    const handleClick = () => {
        props.handleTileClick({row: props.j, col: props.i})
    }

    const handleMouseOver = () => {
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
