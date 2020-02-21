import React, {useState, useContext} from 'react'
import Sliders from "./Sliders"
import Map from "./Map"
import {ToggleContext} from "../context/toggleContext"

function makeMatrix(cols, rows){
    const matrix = []
    for(let i = 0; i < cols; i++){
        matrix.push([])
        for(let j = 0; j < rows; j++){
            matrix[i].push([])
        }
    }
    return matrix
}

export default function CanvasContainer(props) {
    const {tooltipOn, toggleTooltip} = useContext(ToggleContext)

    const [map, setMap] = useState(makeMatrix(10, 30))
    

    const handleSubmit = (e, rows, cols) => {
        e.preventDefault()
        setMap(makeMatrix(cols, rows))
    }
    
    return (
        <div>
            <div className="form-layout">
                <Sliders areToolTipsOn={props.areToolTipsOn} handleSlidersSubmit={handleSubmit}/>
            </div>
            <div className="map-container">
                <button onClick={toggleTooltip}>
                    {!tooltipOn && "Turn"} Tool Tips {!tooltipOn && "On"}
                </button>
                <Map grid={map} 
                    setReady={props.setReady}
                    selected={props.selected} 
                    ready={props.ready} 
                    areToolTipsOn={props.areToolTipsOn}/> 
            </div>
        </div>
    )
}
