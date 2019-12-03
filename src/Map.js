import React, {Fragment, useState} from 'react'
import MapTile from './MapTile'

export default function Map(props) {

    const [clicked, setClicked] = useState({row: 0, col: 0})
    const [isInit, setIsInit] = useState(false)

    const styles = {
        display: "grid",
        gridTemplateColumns: `repeat(${props.grid[0].length}, 32px)`,
        gridTemplateRows: `repeat(${props.grid.length}, 32px)`
    }


    const map = props.grid.map((row, i) => {
        return (
            <Fragment key={i}>
                {row.map((tile, j) => {
                    return (
                        <MapTile 
                            key={`${i}${j}`} 
                            i={i} 
                            j={j} 
                            selected={props.selected}
                            hasSquareBeenSelected={isInit}
                            handleTileClick={setClicked}
                            clickedTile={clicked}
                            />
                    )
                })}
            </Fragment>
        )
    })

    return (
        <div style={styles} onClick={()=>setIsInit(true)}>
            {map}
        </div>
    )
}
