import React, {useState} from 'react'

export default function MapTile(props) {
    const [tileSprite, setTileSprite] = useState({class: "none"})
    const [menuToggle, setMenuToggle] = useState(false)


     
    const jSelecetedDiff = Math.abs(props.selected.rowStart - props.selected.rowEnd) 
    const iSelecetedDiff = Math.abs(props.selected.colStart - props.selected.colEnd) 
    const jClickedDiff = props.j - props.clickedTile.row
    const iClickedDiff = props.i - props.clickedTile.col
    
    const style = {}

    if(jClickedDiff >= 0 && jClickedDiff <= jSelecetedDiff && iClickedDiff >= 0 && iClickedDiff <= iSelecetedDiff){ 
        style.class = "tile"
        style.backgroundPosition = `-${(jSelecetedDiff + jClickedDiff) * 32}px -${(iSelecetedDiff + iClickedDiff ) * 32}px`
    }

    return (
        <div 
            className={`game-tile ${tileSprite.class} ${style.class ? "tile" : ""}`}
            style={tileSprite}
            onDoubleClick={()=>setMenuToggle(true)}
            onClick={()=>props.handleTileClick({row: props.j, col: props.i})}>
            {menuToggle && <div onClick={()=>setTileSprite({class: "none"})}>remove tile</div>}
        </div>
    )
}
