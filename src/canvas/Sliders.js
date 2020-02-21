import React, {useState} from 'react'
import Tooltip from '../components/Tooltip';


export default function Sliders(props) {
    const [rows, setRows] = useState(30)
    const [cols, setCols] = useState(10)

    return (
        <div>
            <Tooltip 
                position="top"
                distance="30"
                tip="use sliders to submit how many rows and columns your map will have. Use arrow keys to adjust slider">
            <form onSubmit={(e)=>props.handleSlidersSubmit(e, rows, cols)}>
                Rows: {rows}<input 
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
                    />{cols} :Columns
                <hr/>
                <button>Update Grid</button>
            </form>
            </Tooltip>
        </div>
    )
}
