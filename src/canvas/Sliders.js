import React, {useState} from 'react'

export default function Sliders(props) {
    const [rows, setRows] = useState(10)
    const [cols, setCols] = useState(30)

    return (
        <div>
            <form onSubmit={(e)=>props.handleSlidersSubmit(e, rows, cols)}>
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
    )
}
