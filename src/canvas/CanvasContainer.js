import React, {useState} from 'react'
import Sliders from "./Sliders"
import Map from "./Map"

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
    const [map, setMap] = useState(makeMatrix(10, 30))

    const handleSubmit = (e, rows, cols) => {
        e.preventDefault()
        setMap(makeMatrix(cols, rows))
    }
    
    return (
        <div>
        <div className="form-layout">
                <Sliders handleSlidersSubmit={handleSubmit}/>
            </div>
            <div className="map-container">
                <Map grid={map} selected={props.selected}/> 
            </div>
        </div>
    )
}
