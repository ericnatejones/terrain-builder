import React, {useState} from 'react'
import Map from "./Map"
import TileSheet from "./TileSheet"

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

export default function MapMaker() {

    const [map, setMap] = useState(makeMatrix(10, 30))
    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(30)
    const [selected, setSelected] = useState({rowStart: 0, colStart: 0})
    const [selectedEnd, setSelectedEnd] = useState({ rowEnd: 0, colEnd: 0})

    const handleSubmit = (e) => {
        e.preventDefault()
        setMap(makeMatrix(cols, rows))
    }

    const handleMouseDown = (i, j) => {
        setSelected({rowStart: i, colStart: j})
        setSelectedEnd({rowEnd: i, colEnd: j})
    }

    return (
        <div className="container">
            <div className="form-layout">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <input 
                        min="1"
                        max="32"
                        name="width" 
                        onChange={(e)=>setRows(e.target.value)}
                        value={rows}
                        type="range"/>
                    <input 
                        min="1"
                        max="32"
                        name="height" 
                        onChange={(e)=>setCols(e.target.value)}
                        value={cols}
                        type="range"
                        />
                    <hr/>
                    <button>Update Grid</button>
                </form>
            </div>
            <div className="map-container">
                <Map grid={map} selected={{...selected, ...selectedEnd}}/>
                <TileSheet  selected={{...selected, ...selectedEnd}} 
                            handleEndChange={setSelectedEnd} 
                            handleMouseDown={handleMouseDown}/>
            </div>
        </div>
    )
}
