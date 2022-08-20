import React from 'react'

export default function Div(props) {
  return (
    <div 
    className={props.className}
    style={props.style}
    onMouseDown={props.onMouseDown}
    onMouseUp={props.onMouseUp}
    onMouseEnter={props.onMouseEnter}>
    </div>
)
}
