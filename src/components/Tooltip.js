import React, {useState, useContext} from 'react'
import {ToggleContext} from "../context/toggleContext"

export default function Tooltip(props) {
    const [isVisable, setIsVisable] = useState(false)
    const {tooltipOn} = useContext(ToggleContext)

    const containerStyle = {
        position: "relative"
    }

    const tipStyle = {
        position: "absolute",
        backgroundColor: "grey",
        border: "2px solid black",
        [props.position || "top"]: (props.distance || 30) + "px",
        width: props.width || "200px"
    }
    if(tooltipOn){
        return (
            <div onMouseEnter={()=>setIsVisable(true)} 
                onMouseLeave={()=>setIsVisable(false)} 
                style={containerStyle}>
                {isVisable && <div style={tipStyle}>{props.tip}</div>}
                {props.children}
            </div>
        )
    } else {
        return props.children
    }
   
}
